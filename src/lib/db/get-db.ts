/**
 * Convenience Helper for Getting Database Client
 *
 * This helper returns a database client for use in API routes,
 * Server Actions, and Server Components.
 *
 * ## Usage
 *
 * ### In API Routes
 * ```typescript
 * import { getDb } from '@/lib/db/get-db';
 *
 * export async function GET() {
 *   const db = await getDb();
 *   const posts = await db.post.findMany();
 *   return Response.json(posts);
 * }
 * ```
 *
 * ### In Server Actions
 * ```typescript
 * 'use server';
 *
 * import { getDb } from '@/lib/db/get-db';
 *
 * export async function createPost(data: PostData) {
 *   const db = await getDb();
 *   return db.post.create({ data });
 * }
 * ```
 *
 * ### In Server Components
 * ```typescript
 * import { getDb } from '@/lib/db/get-db';
 *
 * export default async function PostsPage() {
 *   const db = await getDb();
 *   const posts = await db.post.findMany();
 *   return <PostList posts={posts} />;
 * }
 * ```
 */

import { env } from "@/env";

import { createSingletonPrismaClient } from "./client";

/**
 * Get Database Client
 *
 * Returns a Prisma client instance configured with the Neon adapter.
 *
 * @returns Prisma client instance
 *
 * @example
 * ```typescript
 * import { getDb } from '@/lib/db/get-db';
 *
 * export async function GET() {
 *   const db = await getDb();
 *   const posts = await db.post.findMany();
 *   return Response.json(posts);
 * }
 * ```
 */
export const getDb = async () => {
  return createSingletonPrismaClient({
    adapter: "neon",
    connectionString: env.DATABASE_URL,
  });
};
