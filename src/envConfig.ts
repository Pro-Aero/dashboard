import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXTAUTH_SECRET: z.string(),
    TRUST_HOST: z.coerce.boolean(),

    AZURE_AD_CLIENT_ID: z.string(),
    AZURE_AD_CLIENT_SECRET: z.string(),
    AZURE_AD_TENANT_ID: z.string(),
  },
  client: {},
  shared: {
    NEXTAUTH_URL: z.string().url(),
  },
  runtimeEnv: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    AZURE_AD_CLIENT_ID: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
    AZURE_AD_CLIENT_SECRET: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET,
    AZURE_AD_TENANT_ID: process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    TRUST_HOST: process.env.TRUST_HOST,
  },
  emptyStringAsUndefined: true,
});
