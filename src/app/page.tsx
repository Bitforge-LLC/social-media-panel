"use client";

import { Section, Input } from "@Bitforge-LLC/ui";
import { type FC } from "react";

const Page: FC = () => {
  return (
    <Section className="gap-4 p-8">
      <Input
        label="Username"
        placeholder="Enter username"
        maxLength={12}
        showCharacterCount
      />
      <Input label="Email" placeholder="Enter email" type="email" />
    </Section>
  );
};

export default Page;
