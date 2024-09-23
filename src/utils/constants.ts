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
  process.env.NEXT_PUBLIC_NEXTAUTH_API_KEY !== undefined
    ? process.env.NEXT_PUBLIC_NEXTAUTH_API_KEY
    : "";

export const RedirectUri: string =
  process.env.NEXT_PUBLIC_REDIRECT_URI !== undefined
    ? process.env.NEXT_PUBLIC_REDIRECT_URI
    : "";
