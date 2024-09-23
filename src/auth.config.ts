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
        // offline_access
        params: {
          scope:
            "openid email profile User.Read api://722a0cfe-2fb3-4f33-9c6c-66cdaf7f9984/read",
          redirect_uri: `${RedirectUri}`,
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

        const data = await res.json();

        const role = Admins.includes(token.email) ? "admin" : "member";
        if (data) {
          return {
            ...token,
            id: data[0].id,
            role,
          };
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
