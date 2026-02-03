"use client";

import { truncateAddress } from "@Bitforge-LLC/crypto";
import {
  useWalletModal,
  WalletButton,
  WalletModal,
  WalletMultiButton,
} from "@Bitforge-LLC/crypto/components";
import { useWallet } from "@Bitforge-LLC/crypto/hooks";
import { Button, Chip, Container, Divider, Text } from "@Bitforge-LLC/ui";
import { useCallback } from "react";

const Test2Page = () => {
  const { address, connected, disconnect } = useWallet();

  const handleDisconnect = useCallback(() => {
    void disconnect();
  }, [disconnect]);
  const modal = useWalletModal();

  return (
    <>
      <Text size="xl">Wallet Components</Text>
      <Text size="base">Custom HeroUI-styled Solana wallet integration</Text>

      {/* All-in-one WalletMultiButton */}
      <Container>
        <Text size="lg">WalletMultiButton (All-in-One)</Text>
        <Text size="sm" className="text-default-500">
          Combined button + modal. Click to connect, shows dropdown when
          connected.
        </Text>
        <Container className="hug mt-4 flex-row flex-wrap gap-4">
          <WalletMultiButton color="primary" />
          <WalletMultiButton color="secondary" variant="bordered" />
          <WalletMultiButton color="success" variant="flat" />
        </Container>
      </Container>

      <Divider className="my-6" />

      {/* Separate Button + Modal */}
      <Container>
        <Text size="lg">Separate WalletButton + WalletModal</Text>
        <Text size="sm" className="text-default-500">
          For custom modal control and placement.
        </Text>
        <Container className="hug mt-4 flex-row flex-wrap gap-4">
          <WalletButton
            onSelectWallet={modal.onOpen}
            color="warning"
            variant="shadow"
          />
          <WalletModal
            isOpen={modal.isOpen}
            onClose={modal.onClose}
            title="Choose Your Wallet"
          />
        </Container>
      </Container>

      <Divider className="my-6" />

      {/* Connection Status */}
      <Container>
        <Text size="lg">Connection Status</Text>
        <Container className="hug bg-content1 mt-4 items-start gap-3 rounded-lg p-4">
          <Container className="hug flex-row items-center gap-2">
            <Text size="sm" className="text-default-500">
              Status:
            </Text>
            <Chip
              color={connected ? "success" : "default"}
              variant="flat"
              size="sm"
            >
              {connected ? "Connected" : "Disconnected"}
            </Chip>
          </Container>
          {address && (
            <>
              <Container className="hug flex-row items-center gap-2">
                <Text size="sm" className="text-default-500">
                  Address:
                </Text>
                <Text size="sm" className="font-mono">
                  {truncateAddress(address, 8)}
                </Text>
              </Container>
              <Container className="hug flex-row items-center gap-2">
                <Text size="sm" className="text-default-500">
                  Full:
                </Text>
                <Text size="sm" className="font-mono break-all">
                  {address}
                </Text>
              </Container>
              <Button
                color="danger"
                variant="flat"
                size="sm"
                onPress={handleDisconnect}
                className="w-fit"
              >
                Disconnect
              </Button>
            </>
          )}
        </Container>
      </Container>
    </>
  );
};

export default Test2Page;
