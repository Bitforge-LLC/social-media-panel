"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchStreamLink } from "@trpc/client";
import { type ReactNode, useState } from "react";
import SuperJSON from "superjson";

import { api, getBaseUrl, getQueryClient } from "@/lib/trpc/client";

export const TRPCProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => getQueryClient());
  const [apiClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchStreamLink({
          transformer: SuperJSON,
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={apiClient} queryClient={queryClient}>
        {children}
      </api.Provider>
    </QueryClientProvider>
  );
};
