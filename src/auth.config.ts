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
  // "joao.priante@proaero.aero",
];

const config: NextAuthConfig = {
  providers: [
    AzureADProvider({
      clientId: ClientId,
      clientSecret: ClientSecret,
      tenantId: TenantId,
      authorization: {
        params: {
          scope:
            "openid email profile User.Read https://dashboard.proaero.aero/read",
          // redirect_uri: `${RedirectUri}`,
          redirect_uri:
            "https://dashboard.proaero.aero/api/auth/callback/azure-ad",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "azure-ad" && profile) {
        return true;
      }
      return false;
    },
    jwt: async ({ token, account, user }: any) => {
      if (token) {
        try {
          const res = await fetch(
            `http://34.238.193.94:3000/users?mail=${token.email}`,
            {
              method: "GET",
              headers: {
                "x-api-key": `${ApiKey}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!res.ok) throw new Error("Failed to fetch user data");

          const data = await res.json();
          const role = Admins.includes(token.email) ? "admin" : "member";

          if (data.length > 0) {
            return {
              ...token,
              id: data[0].id,
              role,
            };
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          return token; // Retorna o token original em caso de erro
        }
      }
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret: "LGv8Q~zNeWxZWUYwvrvFhN08p1FFcDrhbDNrTaO2",
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
};

export default config;
