"use client";

import { Container, Text } from "@Bitforge-LLC/ui";
import { type FC } from "react";

import { env } from "@/env";

const Page: FC = () => {
  return (
    <Container className="h-screen w-full flex-grow items-center justify-center">
      <Text size="xl">{env.NEXT_PUBLIC_PROJECT_NAME} Under construction</Text>
    </Container>
  );
};

export default Page;
