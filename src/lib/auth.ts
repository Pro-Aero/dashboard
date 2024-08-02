import { ClientId, ClientSecret, TenantId } from "@/utils/constants";

// lib/auth.js
// const clientId = "722a0cfe-2fb3-4f33-9c6c-66cdaf7f9984";
// const tenantId = "e3e57fda-3690-4162-8988-1aa74cebfe84";
// const clientSecret = "LGv8Q~zNeWxZWUYwvrvFhN08p1FFcDrhbDNrTaO2";
const redirectUri = "http://localhost:3000/callback";

async function getToken(code: string) {
  const tokenResponse = await fetch(
    `https://login.microsoftonline.com/${TenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: ClientId,
        code,
        redirect_uri: redirectUri,
        scope: "https://graph.microsoft.com/.default",
        client_secret: ClientSecret,
        grant_type: "authorization_code",
      }),
    }
  );

  if (!tokenResponse.ok) {
    throw new Error("Erro ao obter token");
  }

  const tokenData = await tokenResponse.json();
  return tokenData;
}

async function refreshAccessToken(refreshToken: string) {
  const refreshTokenResponse = await fetch(
    `https://login.microsoftonline.com/${TenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: ClientId,
        refresh_token: refreshToken,
        scope: "https://graph.microsoft.com/.default",
        client_secret: ClientSecret,
        grant_type: "refresh_token",
      }),
    }
  );

  if (!refreshTokenResponse.ok) {
    throw new Error("Erro ao atualizar token");
  }

  const refreshData = await refreshTokenResponse.json();
  return refreshData;
}

export async function fetchWithToken(
  url,
  method = "GET",
  body = null,
  code = null,
  currentRefreshToken = null
) {
  let tokenData;

  if (code) {
    tokenData = await getToken(code);
  } else if (currentRefreshToken) {
    tokenData = await refreshAccessToken(currentRefreshToken);
  } else {
    throw new Error("Código de autorização ou refresh token necessários");
  }

  const { access_token, refresh_token } = tokenData;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (response.status === 401) {
    const newTokenData = await refreshAccessToken(refresh_token);
    const newAccessToken = newTokenData.access_token;

    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newAccessToken}`,
      },
      body: body ? JSON.stringify(body) : null,
    });
  }

  if (!response.ok) {
    throw new Error("Erro ao fazer requisição");
  }

  return response.json();
}
