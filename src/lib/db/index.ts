/**
 * Database Module
 *
 * Central export point for all database-related functionality.
 *
 * ## Usage Patterns
 *
 * ### 1. Singleton Client (Recommended)
 * Use for most operations - handles connection pooling automatically.
 * ```typescript
 * import { db } from '@/lib/db';
 * const users = await db.user.findMany();
 * ```
 *
 * ### 2. Async Helper
 * Use in contexts where you need async initialization.
 * ```typescript
 * import { getDb } from '@/lib/db';
 * const db = await getDb();
 * const users = await db.user.findMany();
 * ```
 *
 * ### 3. Custom Client
 * Create clients with custom configuration.
 * ```typescript
 * import { createPrismaClient } from '@/lib/db';
 * const customDb = createPrismaClient({
 *   connectionString: customUrl,
 *   adapter: 'default',
 * });
 * ```
 */

// Re-export client factories
export {
  createPrismaClient,
  type CreatePrismaClientConfig,
  createSingletonPrismaClient,
  type DatabaseAdapter,
  type PrismaClientInstance,
} from "./client";

// Export default singleton instance
export { db } from "./instance";

// Export convenience helper for getting client
export { getDb } from "./get-db";
