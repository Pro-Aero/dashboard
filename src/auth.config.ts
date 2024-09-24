import type { NextAuthConfig } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import {
  ApiKey,
  ClientId,
  ClientSecret,
  RedirectUri,
  TenantId,
} from "./utils/constants";

const Admins = [
  "maria.gabriela@proaero.aero",
  "marcelo.araujo@proaero.aero",
  "vladimir.brandi@proaero.aero",
  "joao.priante@proaero.aero",
];

const config: NextAuthConfig = {
  providers: [
    AzureADProvider({
      clientId: ClientId,
      clientSecret: ClientSecret,
      tenantId: TenantId,
      authorization: {
        params: {
          scope: "openid email profile User.Read",
          redirect_uri:
            process.env.NODE_ENV === "production"
              ? "https://dashboard.proaero.aero/api/auth/callback/azure-ad"
              : "http://localhost:3000/api/auth/callback/azure-ad",
        },
      },
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (process.env.NODE_ENV === "development") {
        return baseUrl;
      } else {
        return "https://dashboard.proaero.aero";
      }
    },
    async signIn({ account, profile }) {
      if (account?.provider === "azure-ad") {
        return true;
      }
      return false;
    },
    async jwt({ token, account, user }: any) {
      if (token) {
        try {
          // const res = await fetch(
          //   `http://34.238.193.94:3000/users?mail=${token.email}`,
          //   {
          //     method: "GET",
          //     headers: {
          //       "x-api-key": `${ApiKey}`,
          //       "Content-Type": "application/json",
          //     },
          //   }
          // );

          // if (!res.ok) throw new Error("Failed to fetch user data");

          // const data = await res.json();
          const role = Admins.includes(token.email) ? "admin" : "member";

          // if (data.length > 0) {
          return {
            ...token,
            // id: data[0].id,
            role,
            // };
          };
        } catch (error) {
          console.error("Error fetching user data:", error);
          return token;
        }
      }
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.accessToken = token.accessToken as string;
      return session;
    },
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = Boolean(auth?.user);

    //   const isOnPublicPages = nextUrl.pathname.startsWith("/auth");
    //   const isOnPublicAPIRoutes = nextUrl.pathname.startsWith("/api/auth");
    //   const isOnAPIRoutes = nextUrl.pathname.startsWith("/api");

    //   if (isOnPublicAPIRoutes) {
    //     return true;
    //   }

    //   if (isOnPublicPages && isLoggedIn) {
    //     return Response.redirect(new URL("/", nextUrl));
    //   }

    //   if (isOnAPIRoutes && !isLoggedIn) {
    //     return Response.json({ message: "Unauthorized." }, { status: 401 });
    //   }

    //   return true;
    // },
  },
  secret: "LGv8Q~zNeWxZWUYwvrvFhN08p1FFcDrhbDNrTaO2",
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export default config;
