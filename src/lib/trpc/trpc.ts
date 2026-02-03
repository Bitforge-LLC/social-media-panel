/**
 * TRPC Server Configuration
 *
 * Defines context, middleware, and procedure types for type-safe API routes.
 *
 * ## Architecture
 *
 * ### Context (per-request)
 * Created for each API call, contains:
 * - `prisma` - Prisma client for database access
 * - `session` - NextAuth session (or null if unauthenticated)
 * - `req` - Original fetch Request object
 *
 * ### Procedure Types (authorization levels)
 *
 * **publicProcedure** - No authentication required
 * - Session may be null
 * - Use for login, public data, etc.
 *
 * **protectedProcedure** - Authenticated users only
 * - Middleware checks session.user exists
 * - Throws UNAUTHORIZED if not logged in
 * - Use for user-specific operations
 *
 * **adminProcedure** - Admin role required
 * - Middleware checks session.user.role === "ADMIN"
 * - Throws UNAUTHORIZED if not logged in
 * - Throws FORBIDDEN if logged in but not admin
 * - Use for privileged operations
 *
 * ## SuperJSON Transformer
 * Enables passing Date, Map, Set, BigInt over the wire.
 * Automatically serializes/deserializes on client + server.
 *
 * ## Usage in Routers
 * ```typescript
 * import { router, publicProcedure, protectedProcedure } from '@/lib/trpc/trpc';
 *
 * export const myRouter = router({
 *   // Anyone can call
 *   publicData: publicProcedure.query(({ ctx }) => { ... }),
 *
 *   // Logged in users only
 *   userData: protectedProcedure.query(({ ctx }) => {
 *     // ctx.session.user is guaranteed to exist
 *     return ctx.prisma.user.findUnique({ where: { id: ctx.session.user.id } });
 *   }),
 *
 *   // Admins only
 *   deleteUser: adminProcedure
 *     .input(z.object({ id: z.string() }))
 *     .mutation(({ ctx, input }) => {
 *       return ctx.prisma.user.delete({ where: { id: input.id } });
 *     }),
 * });
 * ```
 */
import { initTRPC, TRPCError } from "@trpc/server";
import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import SuperJSON from "superjson";

import { env } from "@/env";
import { auth } from "@/lib/auth";
import { createSingletonPrismaClient } from "@/lib/db";

export const createContext = async ({ req }: FetchCreateContextFnOptions) => {
  const session = await auth();
  const prisma = createSingletonPrismaClient({
    adapter: "neon",
    connectionString: env.DATABASE_URL,
  });

  return {
    prisma,
    req,
    session,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  // Keep-alive for streaming queries (httpBatchStreamLink)
  jsonl: {
    pingMs: 4_000,
  },
  transformer: SuperJSON,
});

//basic open routes that can be used by everyone
export const { router } = t;
export const publicProcedure = t.procedure;

// Aliases for compatibility
export const createTRPCRouter = router;
export const procedure = publicProcedure;

//routes that can be used by logged in users
const isLoggedIn = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx,
  });
});

export const protectedProcedure = t.procedure.use(isLoggedIn);

//routes that can be used by admins
const isAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if ((ctx.session.user as { role?: string }).role !== "ADMIN") {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next({
    ctx,
  });
});

export const adminProcedure = t.procedure.use(isAdmin);
