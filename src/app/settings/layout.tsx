"use client";

import { Section, Divider, Text } from "@Bitforge-LLC/ui";
import { type ReactNode } from "react";

import { SettingsNav } from "@/components/settingsNav";

type SettingsLayoutProps = {
  children: ReactNode;
};

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <Section className="px-0!">
      <Divider />
      <Text size="xl" className="p-4 font-bold">
        Account Settings
      </Text>
      <Divider />
      <Section className="flex-row gap-4 p-4">
        <Section className="sticky top-[64px] self-start px-0!">
          <SettingsNav />
        </Section>
        <Section className="flex-1 overflow-y-auto px-0!">
          {children}
        </Section>
      </Section>
    </Section>
  );
};

export default SettingsLayout;
