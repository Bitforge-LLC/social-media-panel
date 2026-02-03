/**
 * NextAuth.js Type Extensions
 *
 * This file extends the default NextAuth types to include custom user fields.
 * These extensions ensure type safety when accessing custom user data in:
 * - Session objects (client and server)
 * - JWT tokens
 * - User objects from database
 *
 * ## Adding Custom Fields
 *
 * To add additional fields to the user/session:
 *
 * 1. Add the field to your Prisma User model
 * 2. Extend the types below with the new field
 * 3. Update the JWT callback to include the field in the token
 * 4. Update the session callback to include the field in the session
 *
 * Example:
 * ```typescript
 * // Add to User type:
 * type User = {
 *   id: string;
 *   role: Role;
 *   customField: string; // Your new field
 * } & DefaultUser
 *
 * // Update JWT callback:
 * async jwt({ token, user }) {
 *   if (user) {
 *     token.customField = user.customField;
 *   }
 *   return token;
 * }
 *
 * // Update session callback:
 * async session({ session, token }) {
 *   if (session?.user) {
 *     session.user.customField = token.customField;
 *   }
 *   return session;
 * }
 * ```
 *
 * @see {@link https://authjs.dev/getting-started/typescript}
 */

import "next-auth";
import type { Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extended User Type
   *
   * Adds custom fields to the User object returned from the database.
   * This type is available in callbacks when the user object is passed.
   *
   * Custom fields:
   * - id: User's unique identifier
   * - role: User's role (from Prisma Role enum)
   */
  type User = {
    id: string;
    role: Role;
  };

  /**
   * Extended Session Type
   *
   * Adds custom fields to the Session object exposed to the client.
   * This type is returned from `auth()`, `getSession()`, and `useSession()`.
   *
   * IMPORTANT: Only include non-sensitive data here as it's exposed to the client.
   *
   * Custom fields:
   * - user.id: User's unique identifier
   * - user.role: User's role (for authorization checks)
   */
  type Session = {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  };
}

declare module "next-auth/jwt" {
  /**
   * Extended JWT Type
   *
   * Adds custom fields to the JWT token.
   * The token is encrypted and stored in a cookie.
   *
   * Custom fields:
   * - id: User's unique identifier
   * - role: User's role
   *
   * Note: JWT tokens should only contain essential data as they increase cookie size.
   */
  type JWT = {
    id?: string;
    role?: Role;
  };
}
