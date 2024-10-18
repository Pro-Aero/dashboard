import type { NextAuthConfig } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { ApiKeyServer } from "./utils/constants";

const adminEmails = [
  "maria.gabriela@proaero.aero",
  "marcelo.araujo@proaero.aero",
  "vladimir.brandi@proaero.aero",
  "joao.priante@proaero.aero",
];

const config: NextAuthConfig = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope: "openid email profile User.Read offline_access ",
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/azure-ad`,
        },
      },
    }),
  ],

  callbacks: {
    signIn({ account, profile }) {
      if (account?.provider === "azure-ad") {
        return true;
      }

      return false;
    },
    jwt: async ({ token, account, user }: any) => {
      if (token) {
        const res = await fetch(
          `http://3.219.224.207:3000/users?mail=${token.email}`,
          {
            method: "GET",
            headers: {
              "x-api-key": `${ApiKeyServer}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        const role = adminEmails.includes(token.email) ? "admin" : "member";
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
  secret: "QUW8Q~l1oqxNw~SDh5bcFys_Egl_P5du",
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export default config;
