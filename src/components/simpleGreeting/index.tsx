"use client";

import { Section, Text } from "@Bitforge-LLC/ui";

type SimpleGreetingProps = {
  message: string;
};

const SimpleGreeting = ({ message }: SimpleGreetingProps) => {
  return (
    <Section className="hug p-4">
      <Text size="lg">{message}</Text>
    </Section>
  );
};

export { SimpleGreeting };
