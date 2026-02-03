import { type NextRequest, NextResponse } from "next/server";

import { env } from "@/env";

/**
 * API Route: Get NFTs by Owner
 *
 * Fetches all NFTs owned by a wallet address using Helius DAS API.
 * Includes automatic spam filtering via Helius options.
 *
 * POST /api/nfts/get-by-owner
 * Body: { ownerAddress: string }
 */

type RequestBody = {
  ownerAddress: string;
};

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as RequestBody;
    const { ownerAddress } = body;

    if (!ownerAddress) {
      return NextResponse.json(
        { error: "ownerAddress is required" },
        { status: 400 }
      );
    }

    // Get Helius API key from environment
    const heliusApiKey = env.HELIUS_API_KEY;
    if (!heliusApiKey) {
      console.error("HELIUS_API_KEY not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Call Helius DAS API with spam filtering options
    const url = `https://mainnet.helius-rpc.com/?api-key=${heliusApiKey}`;

    const response = await fetch(url, {
      body: JSON.stringify({
        id: "get-assets-by-owner",
        jsonrpc: "2.0",
        method: "getAssetsByOwner",
        params: {
          displayOptions: {
            // Spam filtering options
            showCollectionMetadata: true, // Include collection info for verified badges
            showFungible: false, // NFTs only, no fungible tokens
            showNativeBalance: false, // No SOL balance
            showUnverifiedCollections: false, // Hide unverified collections (spam)
            showZeroBalance: false, // Hide zero balance assets
          },
          limit: 1000,
          ownerAddress,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Helius API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Return the result
    return NextResponse.json({
      cursor: data.result.cursor,
      items: data.result.items,
      total: data.result.total,
    });
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return NextResponse.json(
      { error: "Failed to fetch NFTs" },
      { status: 500 }
    );
  }
};
