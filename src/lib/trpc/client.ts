"use client";

/**
 * TRPC Client Configuration
 *
 * Sets up TanStack Query + TRPC integration with:
 * - Global error handling via toast notifications
 * - Singleton QueryClient for React Query
 * - Base URL detection (Vercel/localhost/server-side)
 *
 * @see https://trpc.io/docs/client/react
 */

import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "@Bitforge-LLC/ui";
import { TRPCClientError } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

import { env } from "@/env";
import type { AppRouter } from "@/server";

/**
 * Creates a new QueryClient instance with configured error handling.
 * - 60s stale time for queries (prevents refetch on every render)
 * - Global error handler shows toast on mutation/query errors
 */

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
    mutationCache: new MutationCache({
      onError: (error) => {
        handleError(error);
      },
    }),
    queryCache: new QueryCache({
      onError: (error) => {
        handleError(error);
      },
    }),
  });
};

/** Displays TRPC errors as toast notifications */
const handleError = (error: unknown) => {
  if (error instanceof TRPCClientError) {
    toast.error(error.message, "Error");
  }
};

let browserQueryClient: QueryClient | undefined = undefined;
/**
 * Singleton QueryClient for browser, new instance per request on server.
 * Prevents state sharing between server requests.
 */

const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
};

/**
 * Determines base URL for API calls:
 * - Browser: empty string (relative to current origin)
 * - Vercel deployment: https://{VERCEL_URL}
 * - Local server: http://localhost:{PORT}
 */

export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`;
  }
  return `http://localhost:${env.PORT ?? "3000"}`;
};
export const api = createTRPCReact<AppRouter>();

// Re-export with explicit typing to help IDE inference
export type TRPCClient = typeof api;
export const { Provider: TRPCProvider } = api;
// Hook to access the tRPC client
export const useServer = () => api;
export { getQueryClient };
