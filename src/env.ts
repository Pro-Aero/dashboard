import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AZURE_AD_CLIENT_ID: z.string(),
    AZURE_AD_CLIENT_SECRET: z.string(),
    AZURE_AD_TENANT_ID: z.string(),
    NEXTAUTH_API: z.string(),
  },
  shared: {
    NEXTAUTH_URL: z.string().url(),
  },

  runtimeEnv: {
    AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
    AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
    AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,
    NEXTAUTH_API: process.env.NEXTAUTH_API_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  emptyStringAsUndefined: true,
});
