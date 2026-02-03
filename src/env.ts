/**
 * Environment Configuration - Type-safe Environment Variables
 *
 * Uses @t3-oss/env-nextjs for runtime validation and type safety.
 *
 * ## Usage
 * ```typescript
 * import { env } from '@/env';
 *
 * // Type-safe, validated at build time
 * const dbUrl = env.DATABASE_URL; // string
 * const clientId = env.GITHUB_CLIENT_ID; // string | undefined
 * ```
 *
 * ## Skip Validation
 * Set SKIP_ENV_VALIDATION=1 to skip validation during builds
 * (useful for CI/CD where env vars may not be available)
 */

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_PROJECT_NAME: z.string().min(1),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    EMAIL_FROM: process.env.EMAIL_FROM,
    FORWARDEMAIL_KEY: process.env.FORWARDEMAIL_KEY,
    HELIUS_API_KEY: process.env.HELIUS_API_KEY,
    NEXT_PUBLIC_PROJECT_NAME: process.env.NEXT_PUBLIC_PROJECT_NAME,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    VERCEL_URL: process.env.VERCEL_URL,
  },
  server: {
    AUTH_SECRET: z.string().min(1),
    AUTH_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    EMAIL_FROM: z.string().optional(),
    FORWARDEMAIL_KEY: z.string().optional(),
    HELIUS_API_KEY: z.string().optional(),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    PORT: z.string().optional(),
    VERCEL_URL: z.string().optional(),
  },
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
});

export type Env = typeof env;
