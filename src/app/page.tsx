"use client";

import { Container, Input } from "@Bitforge-LLC/ui";
import { type FC } from "react";

const Page: FC = () => {
  return (
    <Container className="gap-4 p-8">
      <Input
        label="Username"
        placeholder="Enter username"
        maxLength={12}
        showCharacterCount
      />
      <Input label="Email" placeholder="Enter email" type="email" />
    </Container>
  );
};

export default Page;
