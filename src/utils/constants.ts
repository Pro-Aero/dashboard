export const TenantId: string =
  process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID !== undefined
    ? process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID
    : "";

export const ClientSecret: string =
  process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET !== undefined
    ? process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET
    : "";

export const ClientId: string =
  process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID !== undefined
    ? process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID
    : "";

export const ApiKey: string =
  process.env.NEXTAUTH_API_KEY !== undefined
    ? process.env.NEXTAUTH_API_KEY
    : "";

export const URL_NEXT: string =
  process.env.NEXT_PUBLIC_URL !== undefined ? process.env.NEXT_PUBLIC_URL : "";

export const RedirectURI: string =
  process.env.NEXT_PUBLIC_REDIRECT_URI !== undefined
    ? process.env.NEXT_PUBLIC_REDIRECT_URI
    : "";
