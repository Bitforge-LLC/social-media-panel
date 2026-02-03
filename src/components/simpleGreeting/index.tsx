"use client";

import { Container, Text } from "@Bitforge-LLC/ui";

type SimpleGreetingProps = {
  message: string;
};

const SimpleGreeting = ({ message }: SimpleGreetingProps) => {
  return (
    <Container className="hug p-4">
      <Text size="lg">{message}</Text>
    </Container>
  );
};

export { SimpleGreeting };
