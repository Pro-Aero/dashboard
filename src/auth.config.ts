import type { NextAuthConfig } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

const adminEmails = [
  "maria.gabriela@proaero.aero",
  "marcelo.araujo@proaero.aero",
  "vladimir.brandi@proaero.aero",
  "joao.priante@proaero.aero",
];

const config: NextAuthConfig = {
  providers: [
    AzureADProvider({
      clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID!,

      authorization: {
        params: {
          scope: "openid email profile User.Read",
          redirect_uri: 'https://dashboard2.proaero.aero',
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
    jwt({ token }) {
      if (token && token.email) {
        const role = adminEmails.includes(token.email) ? "admin" : "member";
        return {
          ...token,
          role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  secret: "QUW8Q~l1oqxNw~SDh5bcFys_Egl_P5du",
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export default config;
