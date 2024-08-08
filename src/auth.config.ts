import type { Session, User, Account, NextAuthConfig } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { JWT } from "next-auth/jwt";

const config: NextAuthConfig = {
  providers: [
    AzureADProvider({
      name: "azure",
      clientId: "722a0cfe-2fb3-4f33-9c6c-66cdaf7f9984",
      clientSecret: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET,
      tenantId: "e3e57fda-3690-4162-8988-1aa74cebfe84",
      authorization: {
        params: {
          scope: "openid email profile User.Read offline_access", // Adicione mais escopos aqui se necessário
        },
      },
    }),
  ],

  callbacks: {
    // signIn config
    async signIn({ account }) {
      if (account?.provider === "azure") {
        return true;
      }

      return false;
    },
    jwt({ token, user, account, trigger }: any) {
      // Initial sign-in
      if (account && user) {
        const expiresIn = account?.expires_in ?? 0; // Usa 0 como valor padrão se expires_in for undefined

        const accessTokenExpires = Date.now() + expiresIn * 1000;
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      // Add token and user details to the session
      session.user.id = token.sub as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      return session;
    },
  },

  secret: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET,
};

export default config;

// Função para renovar o token de acesso usando o refresh token
async function refreshAccessToken(token: JWT) {
  try {
    const url = `https://login.microsoftonline.com/e3e57fda-3690-4162-8988-1aa74cebfe84/oauth2/v2.0/token`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: "722a0cfe-2fb3-4f33-9c6c-66cdaf7f9984",
        client_secret: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET as string,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
        scope: "openid email profile User.Read offline_access",
      }),
    });

    const refreshedTokens = await response.json();

    console.log("Refreshed tokens:", refreshedTokens); // Log refreshed tokens for debugging

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // Update expiration time
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
