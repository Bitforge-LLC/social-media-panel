"use client";

import { Container, Text } from "@Bitforge-LLC/ui";

type User = { email: string; id: number; name: string };

type UserListProps = {
  users: User[];
};

const UserList = ({ users }: UserListProps) => {
  return (
    <Container className="hug items-start gap-2 p-4">
      <Text size="lg" className="font-semibold">
        User List (Array)
      </Text>
      <Container className="items-start gap-2">
        {users.map((user) => (
          <Container key={user.id} className="w-full flex-row justify-between">
            <Text className="font-medium">{user.name}</Text>
            <Text className="text-default-400" size="sm">
              {user.email}
            </Text>
          </Container>
        ))}
      </Container>
      <Text size="sm" className="text-default-400 mt-4">
        Component expects User[] - TypeScript knows it&apos;s an array!
      </Text>
    </Container>
  );
};

export { UserList };
export type { User };
