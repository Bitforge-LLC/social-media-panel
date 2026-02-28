"use client";

import { Section, NavTab, NavTabs } from "@Bitforge-LLC/ui";
import type { ReactNode } from "react";

const TestLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Section className="py-10%">
      <NavTabs color="primary" variant="underlined">
        <NavTab href="/test" title="Test Page" />
        <NavTab href="/test2" title="Test 2 Page" />
      </NavTabs>
      {children}
    </Section>
  );
};

export default TestLayout;
