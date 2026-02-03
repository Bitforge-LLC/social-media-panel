/**
 * NFT TRPC router for fetching wallet NFTs via Helius DAS API.
 */
import { getNFTsByOwner } from "@Bitforge-LLC/crypto/server";
import { z } from "zod";

import { publicProcedure, router } from "@/lib/trpc/trpc";

export const nftRouter = router({
  /**
   * Get all NFTs owned by a wallet address.
   *
   * Uses Helius DAS API with automatic spam filtering:
   * - Filters out fungible tokens
   * - Filters out zero balance assets
   * - Filters out unverified collections
   * - Filters out burnt tokens
   */
  getByOwner: publicProcedure
    .input(
      z.object({
        ownerAddress: z.string().min(32).max(44), // Solana address length
        page: z.number().min(1).optional(),
      })
    )
    .query(async ({ input }) => {
      return getNFTsByOwner({
        ownerAddress: input.ownerAddress,
        page: input.page,
      });
    }),
});
