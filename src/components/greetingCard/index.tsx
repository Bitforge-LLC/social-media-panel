"use client";

import { Container, Text } from "@Bitforge-LLC/ui";

type GreetingCardProps = {
  message: string;
  title: string;
};

const GreetingCard = ({ message, title }: GreetingCardProps) => {
  return (
    <Container className="hug items-start gap-2 p-4">
      <Text size="lg" className="font-semibold">
        {title}
      </Text>
      <Text className="text-default-700">{message}</Text>
      <Text size="sm" className="text-default-400 mt-2">
        No hooks, just props - testable & reusable
      </Text>
    </Container>
  );
};

export { GreetingCard };
