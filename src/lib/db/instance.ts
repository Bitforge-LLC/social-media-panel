/**
 * Default Database Client Instance
 *
 * This is a pre-configured singleton Prisma client instance that can be
 * imported throughout your application.
 *
 * ## Usage
 *
 * ```typescript
 * import { db } from '@/lib/db';
 *
 * // In API routes
 * export async function GET() {
 *   const posts = await db.post.findMany();
 *   return Response.json(posts);
 * }
 *
 * // In Server Actions
 * 'use server';
 * export async function createPost(data: PostData) {
 *   return db.post.create({ data });
 * }
 *
 * // In Server Components
 * export default async function PostsPage() {
 *   const posts = await db.post.findMany();
 *   return <PostList posts={posts} />;
 * }
 * ```
 *
 * ## Singleton Pattern
 *
 * This client is a singleton to prevent connection pool exhaustion
 * during development with hot module reloading.
 */

import { env } from "@/env";

import { createSingletonPrismaClient } from "./client";

/**
 * Prisma Client Instance
 *
 * Singleton instance configured with Neon adapter for edge compatibility.
 *
 * Configuration:
 * - Connection: DATABASE_URL from environment
 * - Adapter: Neon (edge-compatible)
 * - Singleton: Reused across hot reloads in development
 */
export const db = createSingletonPrismaClient({
  adapter: "neon",
  connectionString: env.DATABASE_URL,
});
