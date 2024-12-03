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
  process.env.NEXT_PUBLIC_NEXTAUTH_API !== undefined
    ? process.env.NEXT_PUBLIC_NEXTAUTH_API
    : "";

export const ApiKeyServer: string =
  process.env.NEXTAUTH_API_SERVER !== undefined
    ? process.env.NEXTAUTH_API_SERVER
    : "";

export const ApiURL: string =
  process.env.NEXTAPI_URL !== undefined ? process.env.NEXTAPI_URL : "";
