"use client";

import { Container, Divider, Text } from "@Bitforge-LLC/ui";
import { type ReactNode } from "react";

import { SettingsNav } from "@/components/settingsNav";

type SettingsLayoutProps = {
  children: ReactNode;
};

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <Container className="px-0!">
      <Divider />
      <Text size="xl" className="p-4 font-bold">
        Account Settings
      </Text>
      <Divider />
      <Container className="flex-row gap-4 p-4">
        <Container className="sticky top-[64px] self-start px-0!">
          <SettingsNav />
        </Container>
        <Container className="flex-1 overflow-y-auto px-0!">
          {children}
        </Container>
      </Container>
    </Container>
  );
};

export default SettingsLayout;
