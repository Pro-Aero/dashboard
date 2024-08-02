import type { Session, User, Account } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { JWT } from "next-auth/jwt";
import { ClientId, ClientSecret, TenantId } from "./utils/constants";

const config = {
  providers: [
    AzureADProvider({
      name: "azure",
      clientId: ClientId,
      clientSecret: ClientSecret,
      tenantId: TenantId,
      authorization: {
        params: {
          scope: "openid email profile User.Read offline_access", // Adicione mais escopos aqui se necessário
        },
      },
    }),
  ],

  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User;
      account?: Account;
    }) {
      // Initial sign-in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: (Date.now() + account.expires_in) * 1000, // Expiration time of access token
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

  secret: "LGv8Q~zNeWxZWUYwvrvFhN08p1FFcDrhbDNrTaO2",
};

export default config;

// Função para renovar o token de acesso usando o refresh token
async function refreshAccessToken(token: JWT) {
  try {
    const url = `https://login.microsoftonline.com/${TenantId}/oauth2/v2.0/token`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: ClientId,
        client_secret: ClientSecret,
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
