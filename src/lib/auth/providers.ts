/**
 * OAuth Provider Configuration (Optional)
 *
 * This file demonstrates how to organize OAuth providers separately from the main
 * NextAuth configuration. This is useful when you have multiple providers and want
 * to keep your auth/index.ts file clean and focused.
 *
 * ## Usage
 *
 * 1. Import the providers array in your auth/index.ts:
 *    ```typescript
 *    import { oauthProviders } from "./providers";
 *
 *    export const { auth, handlers, signIn, signOut } = NextAuth({
 *      providers: [
 *        ...oauthProviders,
 *        // ... other providers
 *      ],
 *    });
 *    ```
 *
 * 2. Configure environment variables for each provider you want to use
 *
 * 3. Update your env.ts with the corresponding provider schemas
 *
 * ## Provider Setup
 *
 * Each provider requires:
 * - Client ID and Secret from the OAuth provider
 * - Redirect URL (usually your AUTH_URL)
 * - Environment schema added to env.ts
 *
 * @see {@link https://authjs.dev/getting-started/authentication/oauth}
 */

// Uncomment the providers you want to use:
// import { createGitHubProvider } from "@Bitforge-LLC/auth";
// import { createNeonProvider } from "@Bitforge-LLC/auth";
// import { createVercelProvider } from "@Bitforge-LLC/auth";

/**
 * OAuth Providers Array
 *
 * Add all OAuth providers you want to enable here.
 * Make sure you've configured the necessary environment variables.
 */
export const oauthProviders = [
  // GitHub OAuth Provider
  // Requires: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
  // Environment schema: githubProviderEnvSchema
  //
  // createGitHubProvider({
  //   clientId: env.GITHUB_CLIENT_ID,
  //   clientSecret: env.GITHUB_CLIENT_SECRET,
  //   redirectUrl: env.AUTH_URL,
  // }),
  // Neon OAuth Provider
  // Requires: NEON_CLIENT_ID, NEON_CLIENT_SECRET
  // Environment schema: neonProviderEnvSchema
  //
  // createNeonProvider({
  //   clientId: env.NEON_CLIENT_ID,
  //   clientSecret: env.NEON_CLIENT_SECRET,
  //   redirectUrl: env.AUTH_URL,
  // }),
  // Vercel OAuth Provider
  // Requires: VERCEL_CLIENT_ID, VERCEL_CLIENT_SECRET
  // Environment schema: vercelProviderEnvSchema
  //
  // createVercelProvider({
  //   clientId: env.VERCEL_CLIENT_ID,
  //   clientSecret: env.VERCEL_CLIENT_SECRET,
  //   redirectUrl: env.AUTH_URL,
  // }),
];

/**
 * Provider Configuration Guide
 *
 * ## GitHub
 * 1. Create OAuth app: https://github.com/settings/developers
 * 2. Set Authorization callback URL to: {AUTH_URL}/api/auth/callback/github
 * 3. Add to .env:
 *    ```
 *    GITHUB_CLIENT_ID=your_client_id
 *    GITHUB_CLIENT_SECRET=your_client_secret
 *    ```
 * 4. Add to env.ts:
 *    ```typescript
 *    import { githubProviderEnvSchema } from "@Bitforge-LLC/auth";
 *    ...githubProviderEnvSchema.shape
 *    ```
 *
 * ## Neon
 * 1. Create OAuth app in Neon console
 * 2. Set callback URL to: {AUTH_URL}/api/auth/callback/neon
 * 3. Add to .env:
 *    ```
 *    NEON_CLIENT_ID=your_client_id
 *    NEON_CLIENT_SECRET=your_client_secret
 *    ```
 * 4. Add to env.ts:
 *    ```typescript
 *    import { neonProviderEnvSchema } from "@Bitforge-LLC/auth";
 *    ...neonProviderEnvSchema.shape
 *    ```
 *
 * ## Vercel
 * 1. Create integration: https://vercel.com/dashboard/integrations/console
 * 2. Set redirect URL to: {AUTH_URL}/api/auth/callback/vercel
 * 3. Add to .env:
 *    ```
 *    VERCEL_CLIENT_ID=your_client_id
 *    VERCEL_CLIENT_SECRET=your_client_secret
 *    ```
 * 4. Add to env.ts:
 *    ```typescript
 *    import { vercelProviderEnvSchema } from "@Bitforge-LLC/auth";
 *    ...vercelProviderEnvSchema.shape
 *    ```
 */
