"use client";

import { Web3Provider } from "@Bitforge-LLC/crypto/components";
import { DevToolsProvider } from "@Bitforge-LLC/devtools";
import { ChadUi } from "@Bitforge-LLC/ui";
import { SessionProvider } from "next-auth/react";
import { type FC, type PropsWithChildren } from "react";

import { TRPCProviderWrapper } from "@/lib/trpc/providers";

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChadUi>
      <SessionProvider
        refetchOnWindowFocus
        refetchInterval={15} // Refresh session every 15 seconds during development (increase for production)
      >
        <TRPCProviderWrapper>
          <Web3Provider>
            <DevToolsProvider>{children}</DevToolsProvider>
          </Web3Provider>
        </TRPCProviderWrapper>
      </SessionProvider>
    </ChadUi>
  );
};
