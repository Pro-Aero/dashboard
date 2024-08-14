import type { NextAuthConfig } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { JWT } from "next-auth/jwt";
import { addSeconds, subMinutes } from "date-fns";
import { env } from "./envConfig";

async function refreshAccessToken(token: JWT) {
  try {
    const url = `https://login.microsoftonline.com/${env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: env.AZURE_AD_CLIENT_ID,
        client_secret: env.AZURE_AD_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
        scope: "openid email profile User.Read offline_access",
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expires_in: addSeconds(new Date(), refreshedTokens.expires_in).getTime(),
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      refresh_expires_in: subMinutes(
        addSeconds(new Date(), refreshedTokens.refresh_expires_in),
        2
      ).getTime(),
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const config: NextAuthConfig = {
  providers: [
    AzureADProvider({
      clientId: env.AZURE_AD_CLIENT_ID,
      clientSecret: env.AZURE_AD_CLIENT_SECRET,
      tenantId: env.AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope: "openid email profile User.Read offline_access",
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
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          expires_in: addSeconds(new Date(), account.expires_in).getTime(),
          refreshToken: account.refresh_token,
          refresh_expires_in: subMinutes(
            addSeconds(new Date(), account.refresh_expires_in),
            2
          ).getTime(),
        };
      }

      if (Date.now() < token.expires_in) {
        return token;
      }

      if (Date.now() < token.refresh_expires_in) {
        return await refreshAccessToken(token);
      }

      return {
        ...token,
        error: "RefreshTokenExpiredError",
      };
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.error = token.error;
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
  trustHost: !!env.TRUST_HOST,
};

export default config;
