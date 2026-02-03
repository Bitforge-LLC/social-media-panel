/**
 * Prisma Client Factory Functions
 *
 * This module provides factory functions for creating Prisma clients with
 * different database adapters. It supports edge runtimes and connection pooling.
 *
 * ## Why Adapters?
 *
 * Different deployment environments have different database connection requirements:
 *
 * - **Neon**: Serverless PostgreSQL with WebSocket connections for edge runtimes
 * - **PlanetScale**: MySQL with edge-compatible connections
 * - **Default**: Standard PostgreSQL driver (for traditional Node.js environments)
 *
 * ## Edge Runtime Compatibility
 *
 * Edge runtimes (Vercel Edge Functions, Cloudflare Workers) don't support
 * traditional TCP connections. Adapters like Neon use WebSocket-based protocols
 * that work in these constrained environments.
 *
 * ## Singleton Pattern
 *
 * The singleton pattern prevents multiple Prisma client instances in development
 * with hot reload. Without this, each hot reload would create a new connection
 * pool, eventually exhausting database connections.
 *
 * @see {@link https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections}
 * @see {@link https://neon.tech/docs/guides/prisma}
 */

import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

import { env } from "@/env";

/**
 * Supported Database Adapters
 *
 * - **neon**: Neon serverless PostgreSQL (recommended for edge runtimes)
 * - **default**: Standard PostgreSQL driver (traditional Node.js)
 *
 * Add more adapters as needed (e.g., "planetscale" for MySQL).
 */
export type DatabaseAdapter = "neon" | "default";

/**
 * Prisma Client Configuration
 *
 * Configuration options for creating a Prisma client instance.
 */
export type CreatePrismaClientConfig = {
  /**
   * Database adapter to use
   *
   * Choose based on your deployment environment:
   * - `"neon"`: For Vercel Edge Functions, Cloudflare Workers, or Neon database
   * - `"default"`: For traditional Node.js servers
   *
   * @default "neon"
   */
  adapter?: DatabaseAdapter;

  /**
   * Database connection string
   *
   * Format depends on the adapter:
   * - PostgreSQL: `postgresql://user:password@host:port/database`
   * - Neon: `postgresql://user:password@host/database?sslmode=require`
   *
   * Store this in environment variables (DATABASE_URL).
   */
  connectionString: string;

  /**
   * Additional Prisma client options
   *
   * Pass any valid Prisma client constructor options:
   * - `log`: Enable query logging (e.g., ['query', 'error'])
   * - `errorFormat`: Control error output format
   * - Custom datasources, middleware, etc.
   *
   * @see {@link https://www.prisma.io/docs/orm/reference/prisma-client-reference#prismaclient}
   *
   * @example
   * ```typescript
   * {
   *   prismaOptions: {
   *     log: ['query', 'error'],
   *     errorFormat: 'minimal'
   *   }
   * }
   * ```
   */
  prismaOptions?: ConstructorParameters<typeof PrismaClient>[0];
};

/**
 * Create a Prisma Client Instance
 *
 * Creates a new Prisma client with the specified adapter configuration.
 *
 * **When to use:**
 * - When you need a fresh client instance
 * - In serverless functions (each invocation gets a new instance)
 * - For testing (each test can have isolated client)
 *
 * **When NOT to use:**
 * - In Next.js app with hot reload (use createSingletonPrismaClient instead)
 * - When you need connection pooling across requests
 *
 * ## Adapter Configuration
 *
 * ### Neon Adapter (Edge Runtime)
 *
 * The Neon adapter enables Prisma to work in edge runtimes by using
 * WebSocket connections instead of traditional TCP. It automatically
 * configures the WebSocket constructor for Node.js environments.
 *
 * ```typescript
 * const client = createPrismaClient({
 *   connectionString: env.DATABASE_URL,
 *   adapter: 'neon',
 * });
 * ```
 *
 * ### Default Adapter (Node.js)
 *
 * Uses the standard Prisma driver. Best for traditional Node.js servers
 * where edge compatibility isn't required.
 *
 * ```typescript
 * const client = createPrismaClient({
 *   connectionString: env.DATABASE_URL,
 *   adapter: 'default',
 * });
 * ```
 *
 * @param config - Client configuration options
 * @returns Configured Prisma client instance
 *
 * @example
 * ```typescript
 * import { createPrismaClient } from '@/lib/db/client';
 * import { env } from '@/env';
 *
 * export const db = createPrismaClient({
 *   connectionString: env.DATABASE_URL,
 *   adapter: 'neon',
 *   prismaOptions: {
 *     log: process.env.NODE_ENV === 'development' ? ['query'] : [],
 *   },
 * });
 * ```
 *
 * @see {@link https://www.prisma.io/docs/orm/overview/databases/neon}
 */
export const createPrismaClient = (config: CreatePrismaClientConfig) => {
  const { adapter = "neon", connectionString, prismaOptions } = config;

  // Configure Neon for Node.js environments
  // In edge runtimes, WebSocket is available globally
  // In Node.js, we need to provide the 'ws' library
  if (adapter === "neon" && !globalThis.WebSocket) {
    neonConfig.webSocketConstructor = ws;
  }

  // Build Prisma client options
  const options: ConstructorParameters<typeof PrismaClient>[0] =
    prismaOptions ?? {};

  // Add adapter if specified
  if (adapter === "neon") {
    // Cast to bypass TypeScript's strict checking
    // The adapter option is valid but not in the generated types
    (options as { adapter?: unknown }).adapter = new PrismaNeon({
      connectionString,
    });
  }

  return new PrismaClient(options);
};

/**
 * Create a Singleton Prisma Client
 *
 * Creates or reuses a single Prisma client instance. This prevents
 * exhausting database connections during development with hot reload.
 *
 * **When to use:**
 * - In Next.js applications (recommended)
 * - In long-running Node.js processes
 * - When you need connection pooling
 *
 * **How it works:**
 * - In production: Creates one client and reuses it
 * - In development: Stores client on globalThis to survive hot reload
 *
 * ## Development Hot Reload
 *
 * Without the singleton pattern, each hot reload in Next.js dev mode
 * would create a new Prisma client, leading to:
 * - Too many database connections
 * - Connection pool exhaustion
 * - "Can't reach database server" errors
 *
 * The singleton stores the client on `globalThis`, which persists across
 * hot reloads, preventing these issues.
 *
 * ## Production Behavior
 *
 * In production, there's no hot reload, so we just create a single client
 * and import it wherever needed. The singleton pattern has no overhead.
 *
 * @param config - Client configuration options
 * @returns Singleton Prisma client instance
 *
 * @example
 * ```typescript
 * import { createSingletonPrismaClient } from '@/lib/db/client';
 * import { env } from '@/env';
 *
 * // This will create one instance and reuse it across all imports
 * export const db = createSingletonPrismaClient({
 *   connectionString: env.DATABASE_URL,
 *   adapter: 'neon',
 * });
 * ```
 *
 * @see {@link https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices}
 */
export const createSingletonPrismaClient = (
  config: CreatePrismaClientConfig
) => {
  // Cast globalThis to include our custom prisma property
  const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
  };

  // In development, reuse the client from globalThis
  // In production, create a new client each time (but this only runs once per deployment)
  const prisma = globalForPrisma.prisma ?? createPrismaClient(config);

  // Store on globalThis in development to survive hot reload
  if (env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }

  return prisma;
};

/**
 * Type Helper: Infer Prisma Client Type
 *
 * Use this to create types based on your Prisma client instance.
 * Useful for dependency injection and testing.
 *
 * @example
 * ```typescript
 * import { createSingletonPrismaClient } from '@/lib/db/client';
 *
 * const db = createSingletonPrismaClient({ ... });
 * type DbClient = typeof db;
 *
 * // Use in function signatures
 * async function getUser(userId: string, db: DbClient) {
 *   return db.user.findUnique({ where: { id: userId } });
 * }
 * ```
 */
export type PrismaClientInstance = ReturnType<typeof createPrismaClient>;
