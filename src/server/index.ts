/**
 * Root TRPC router - composes all feature routers.
 *
 * ## Router Organization
 * Each router lives in its own folder:
 * - `example/index.ts` - Demo routes showing procedure types (public/protected/admin)
 * - `nft/index.ts` - NFT-related routes
 *
 * ## Type Safety
 * AppRouter type enables end-to-end type safety from server to client.
 * Changes to router automatically propagate to TRPC client hooks.
 *
 * ## Adding New Routers
 * 1. Create a new folder (e.g., `src/server/myFeature/`)
 * 2. Add an index.ts file with your router definition
 * 3. Import and add it to the appRouter below
 * 4. The types will automatically propagate to the client
 */
import { router } from "@/lib/trpc/trpc";

import { exampleRouter } from "./example";
import { nftRouter } from "./nft";

export const appRouter = router({
  example: exampleRouter,
  nft: nftRouter,
});

export type AppRouter = typeof appRouter;
