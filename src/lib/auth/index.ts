import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import ForwardEmail from "next-auth/providers/forwardemail";

import { env } from "@/env";
import { db } from "@/lib/db";

/**
 * NextAuth.js v5 Configuration
 *
 * This file contains the core authentication configuration for the application.
 * It uses NextAuth.js with Prisma adapter for database persistence.
 *
 * ## Adding OAuth Providers
 *
 * To enable additional OAuth providers from @Bitforge-LLC/auth:
 *
 * 1. Add the provider's environment variables to your .env file:
 *    ```
 *    GITHUB_CLIENT_ID=your_client_id
 *    GITHUB_CLIENT_SECRET=your_client_secret
 *    ```
 *
 * 2. Add the provider env schema to your env.ts:
 *    ```typescript
 *    import { githubProviderEnvSchema } from "@Bitforge-LLC/auth";
 *    // Add to your env schema
 *    ...githubProviderEnvSchema.shape
 *    ```
 *
 * 3. Import and use the provider factory in the providers array below:
 *    ```typescript
 *    import { createGitHubProvider } from "@Bitforge-LLC/auth";
 *
 *    providers: [
 *      createGitHubProvider({
 *        clientId: env.GITHUB_CLIENT_ID,
 *        clientSecret: env.GITHUB_CLIENT_SECRET,
 *        redirectUrl: env.AUTH_URL,
 *      }),
 *      // ... other providers
 *    ]
 *    ```
 *
 * Available OAuth provider factories:
 * - createGitHubProvider - GitHub OAuth
 * - createNeonProvider - Neon OAuth
 * - createVercelProvider - Vercel OAuth
 *
 * @see {@link https://authjs.dev/getting-started/authentication/oauth}
 * @see {@link https://authjs.dev/getting-started/adapters/prisma}
 */

export const { auth, handlers, signIn, signOut } = NextAuth({
  /**
   * Database Adapter
   *
   * Uses Prisma adapter to persist users, accounts, sessions, and verification tokens.
   * Requires Prisma schema models: User, Account, Session, VerificationToken.
   *
   * @see {@link https://authjs.dev/getting-started/adapters/prisma}
   */
  adapter: PrismaAdapter(db),

  /**
   * Callbacks
   *
   * Callbacks are asynchronous functions you can use to control what happens
   * when an action is performed. They allow you to implement access controls,
   * modify session data, and handle custom logic.
   *
   * @see {@link https://authjs.dev/reference/core#callbacks}
   */
  callbacks: {
    /**
     * JWT Callback
     *
     * This callback is called whenever a JSON Web Token is created or updated.
     * The returned value will be encrypted and stored in a cookie.
     *
     * Use this to:
     * - Add custom data to the token (user ID, role, etc.)
     * - Refresh token data from the database
     * - Handle token expiration and refresh logic
     *
     * @param token - The JWT token object
     * @param user - User object (only available on initial sign-in)
     * @param account - Account object (only available on initial sign-in)
     * @param trigger - What caused the callback ("signIn", "signUp", or "update")
     * @param session - New session data (only when trigger is "update")
     *
     * @see {@link https://authjs.dev/reference/core#jwt}
     */
    async jwt({ account, session, token, trigger, user }) {
      // On initial sign-in, `user` object is available
      // Copy data from user to token for persistence across requests
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
        token.email = user.email;
      }

      // Handle token updates (e.g., when user.update() is called)
      if (trigger === "update" && session) {
        // Update token with new session data
        // token.name = session.name;
      }

      // Example: Refresh user data from database periodically
      // if (Date.now() / 1000 < token.exp - 60 * 60) {
      //   const refreshedUser = await db.user.findUnique({ where: { id: token.id } });
      //   if (refreshedUser) {
      //     token.role = refreshedUser.role;
      //   }
      // }

      return token;
    },

    /**
     * Session Callback
     *
     * This callback is called whenever a session is checked (e.g., getSession(), useSession()).
     * It allows you to customize what data is returned to the client.
     *
     * Use this to:
     * - Add custom user data to the session object
     * - Filter sensitive information from being sent to client
     * - Transform token data into session-friendly format
     *
     * Note: Session data is exposed to the client, so only include non-sensitive data.
     *
     * @param session - The session object
     * @param token - The JWT token (when using JWT strategy)
     * @param user - User object (when using database strategy)
     *
     * @see {@link https://authjs.dev/reference/core#session}
     */
    async session({ session, token, user }) {
      // Attach data from JWT token to session for client access
      if (session?.user) {
        session.user.id = token?.id as string;

        // Only set email if not already present
        if (token?.email && !session.user.email) {
          session.user.email = token.email;
        }

        // Add custom fields (ensure these are defined in next-auth.d.ts)
        (session.user as { role?: string }).role = token?.role as
          | string
          | undefined;
      }

      return session;
    },

    /**
     * Sign In Callback
     *
     * Controls whether a user is allowed to sign in or not.
     * Return `true` to allow sign in, `false` to deny.
     *
     * Use this to:
     * - Implement email verification requirements
     * - Block/allow users based on domain or other criteria
     * - Implement custom authorization logic
     * - Add rate limiting or security checks
     *
     * @param user - User object attempting to sign in
     * @param account - Account object (when signing in with OAuth)
     * @param profile - OAuth profile data
     * @param email - Email verification data
     * @param credentials - Credentials (when using credentials provider)
     *
     * @see {@link https://authjs.dev/reference/core#signin}
     */
    // async signIn({ user, account, profile, email, credentials }) {
    //   // Example: Only allow sign in from specific email domains
    //   // if (user.email && !user.email.endsWith("@yourdomain.com")) {
    //   //   return false;
    //   // }
    //
    //   // Example: Require email verification
    //   // if (account?.provider === "email" && !user.emailVerified) {
    //   //   return false;
    //   // }
    //
    //   return true;
    // },

    /**
     * Redirect Callback
     *
     * Controls where to redirect the user after sign in.
     *
     * Use this to:
     * - Redirect to different pages based on user role
     * - Implement a "return to" URL flow
     * - Prevent open redirect vulnerabilities
     *
     * @param url - URL to redirect to
     * @param baseUrl - Base URL of the site
     *
     * @see {@link https://authjs.dev/reference/core#redirect}
     */
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //
    //   // Allows callback URLs on the same origin
    //   if (new URL(url).origin === baseUrl) return url;
    //
    //   return baseUrl;
    // },
  },

  /**
   * Event Handlers
   *
   * Events are useful for logging and analytics. They don't affect the authentication flow.
   * All events are async functions that don't return anything.
   *
   * Use events to:
   * - Log authentication activities
   * - Send analytics data
   * - Trigger webhooks or notifications
   * - Update external systems
   *
   * @see {@link https://authjs.dev/reference/core#events}
   */
  events: {
    /**
     * Triggered when a new user is created in the database
     *
     * Use cases:
     * - Send welcome email
     * - Create default user settings/preferences
     * - Trigger onboarding workflow
     * - Log user creation for analytics
     */
    async createUser({ user }) {
      console.log("createUser", user);
      // Example: Send welcome email
      // await sendWelcomeEmail(user.email);
    },

    /**
     * Triggered when an OAuth account is linked to a user
     *
     * Use cases:
     * - Log OAuth linking for security audit
     * - Update user profile with OAuth data
     * - Notify user of new linked account
     */
    async linkAccount({ account, user }) {
      console.log("linkAccount", user, account);
    },

    /**
     * Triggered on successful sign in
     *
     * Use cases:
     * - Update last login timestamp
     * - Log sign in for security monitoring
     * - Track user activity analytics
     * - Clear failed login attempts
     */
    async signIn({ account, isNewUser, profile, user }) {
      console.log("signIn", user);
      // Example: Update last login
      // await db.user.update({
      //   where: { id: user.id },
      //   data: { lastLogin: new Date() }
      // });
    },

    /**
     * Triggered on sign out
     *
     * Use cases:
     * - Log sign out for security audit
     * - Clean up user session data
     * - Track session duration
     */
    async signOut(params) {
      console.log("signOut", params);
    },

    /**
     * Triggered when a user is updated
     *
     * Use cases:
     * - Sync changes to external systems
     * - Audit user profile changes
     * - Invalidate caches
     */
    async updateUser({ user }) {
      console.log("updateUser", user);
    },

    /**
     * Triggered when a session is created
     *
     * Use cases:
     * - Track active sessions
     * - Set session expiry in external cache
     */
    // async session({ session, token }) {
    //   console.log("session", session);
    // },
  },

  /**
   * Custom Pages
   *
   * Specify custom pages for authentication flows instead of using NextAuth's default pages.
   *
   * @see {@link https://authjs.dev/reference/core/types#pages}
   */
  pages: {
    // signOut: "/logout",   // Custom sign out page
    error: "/error", // Error page (error codes passed as query params)
    signIn: "/login", // Custom sign in page
    // verifyRequest: "/verify-email", // Email verification page
    // newUser: "/welcome",  // Redirect new users here after first sign in
  },

  /**
   * Authentication Providers
   *
   * Configure which authentication methods are available.
   * Providers can be OAuth, email/passwordless, or credentials-based.
   *
   * Current providers:
   * - ForwardEmail: Email-based authentication using Forward Email service
   *
   * To add OAuth providers, uncomment examples below and configure environment variables.
   *
   * @see {@link https://authjs.dev/getting-started/authentication}
   */
  providers: [
    ForwardEmail({
      apiKey: env.FORWARDEMAIL_KEY ?? "",
      from: env.EMAIL_FROM ?? "", // e.g. "YourApp <noreply@yourdomain.com>"
    }),

    // Uncomment and configure OAuth providers as needed:

    // createGitHubProvider({
    //   clientId: env.GITHUB_CLIENT_ID,
    //   clientSecret: env.GITHUB_CLIENT_SECRET,
    //   redirectUrl: env.AUTH_URL,
    // }),

    // createNeonProvider({
    //   clientId: env.NEON_CLIENT_ID,
    //   clientSecret: env.NEON_CLIENT_SECRET,
    //   redirectUrl: env.AUTH_URL,
    // }),

    // createVercelProvider({
    //   clientId: env.VERCEL_CLIENT_ID,
    //   clientSecret: env.VERCEL_CLIENT_SECRET,
    //   redirectUrl: env.AUTH_URL,
    // }),
  ],

  /**
   * Secret for encrypting tokens and email hashes
   *
   * IMPORTANT: This should be a random string. Generate one using:
   * `openssl rand -base64 32` or use: https://generate-secret.vercel.app/32
   *
   * Keep this secret secure and never commit it to version control.
   *
   * @see {@link https://authjs.dev/reference/core#secret}
   */
  secret: env.AUTH_SECRET,

  /**
   * Session Configuration
   *
   * Configure how sessions are stored and managed.
   *
   * Strategies:
   * - "jwt": Store session data in a JWT (default, recommended for serverless)
   * - "database": Store session in database (required for database adapter features)
   *
   * Note: JWT strategy is more scalable but database strategy offers more control
   * and immediate revocation capabilities.
   *
   * @see {@link https://authjs.dev/reference/core/types#session}
   */
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 days (default)
    // updateAge: 24 * 60 * 60,   // 24 hours (default)
  },

  /**
   * Debug Mode
   *
   * Enable debug messages in the console.
   * Useful for development but should be disabled in production.
   *
   * Set to `true` to enable, or set process.env.NODE_ENV to 'development'
   */
  // debug: process.env.NODE_ENV === "development",
});
