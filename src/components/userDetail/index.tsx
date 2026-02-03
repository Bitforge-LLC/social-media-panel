"use client";

import { Container, Text } from "@Bitforge-LLC/ui";

type User = { email: string; id: number; name: string };

const UserDetail = ({ email, id, name }: User) => {
  return (
    <Container className="hug items-start gap-2 p-4">
      <Text size="lg" className="font-semibold">
        User Detail (Single)
      </Text>
      <Container className="items-start gap-2">
        <Text>
          <strong>ID:</strong> {id}
        </Text>
        <Text>
          <strong>Name:</strong> {name}
        </Text>
        <Text>
          <strong>Email:</strong> {email}
        </Text>
      </Container>
      <Text size="sm" className="text-default-400 mt-4">
        Component expects User - TypeScript knows it&apos;s a single object!
      </Text>
    </Container>
  );
};

export { UserDetail };
