/**
 * Example TRPC router demonstrating the three procedure types.
 *
 * ## Procedure Types
 * - **publicProcedure** - No auth required (e.g., getUser, getUsers)
 * - **protectedProcedure** - Requires valid session (e.g., checkUser)
 * - **adminProcedure** - Requires session.user.role === "ADMIN" (e.g., checkAdmin)
 *
 * ## Pattern Examples
 * - **Single item query**: getUser (with input validation, returns single object)
 * - **List query**: getUsers (no input, returns array)
 * - **Mutation**: checkAdmin (state-changing operation)
 * - **Input validation**: helloWorld (Zod schema for type safety)
 *
 * Use this as a reference for creating new routers.
 */
// import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  adminProcedure,
  protectedProcedure,
  publicProcedure,
  router,
} from "@/lib/trpc/trpc";

export const exampleRouter = router({
  checkAdmin: adminProcedure.mutation(async ({ ctx }) => {
    console.log("hello admin");

    return;
  }),
  checkHello: publicProcedure.mutation(async ({ ctx }) => {
    console.log("hello user");
    // throw new TRPCError({
    //   code: "UNAUTHORIZED",
    //   message: "Not authorized",
    // });

    return;
  }),
  checkUser: protectedProcedure.mutation(async ({ ctx }) => {
    console.log("hello user");

    return;
  }),
  // Example: Query returning a SINGLE item
  getUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      const users = [
        { email: "alice@example.com", id: 1, name: "Alice" },
        { email: "bob@example.com", id: 2, name: "Bob" },
        { email: "charlie@example.com", id: 3, name: "Charlie" },
      ];
      return users.find((u) => u.id === input.id) ?? users[0];
    }),
  // Example: Query returning an ARRAY (multiple items)
  getUsers: publicProcedure.query(() => {
    return [
      { email: "alice@example.com", id: 1, name: "Alice" },
      { email: "bob@example.com", id: 2, name: "Bob" },
      { email: "charlie@example.com", id: 3, name: "Charlie" },
    ];
  }),
  helloWorld: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input }) => {
      return {
        message: `Hello ${input.name}`,
      };
    }),

  /**
   * Streaming query example using httpBatchStreamLink.
   *
   * Returns an async generator that yields progress updates.
   * Data accumulates in React Query's cache as an array.
   *
   * @example Client usage
   * ```tsx
   * const { data } = trpc.example.streamingTask.useQuery({ taskName: 'Demo' });
   * // data = [{ message: 'Initializing...' }, { message: 'Processing...' }, ...]
   * const latest = data?.at(-1); // Get latest progress
   * ```
   */
  streamingTask: publicProcedure
    .input(z.object({ taskName: z.string() }))
    .query(async function* (opts) {
      const steps = [
        "Initializing...",
        "Processing...",
        "Finalizing...",
        "Complete!",
      ];

      for (let i = 0; i < steps.length; i++) {
        yield {
          message: steps[i],
          step: i + 1,
          taskName: opts.input.taskName,
          total: steps.length,
        };

        // Simulate work (1 second between steps)
        await new Promise((r) => setTimeout(r, 1000));
      }
    }),
});
