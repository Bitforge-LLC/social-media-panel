import { Container, Text } from "@Bitforge-LLC/ui";
import { type FC } from "react";

const Page: FC = () => {
  return (
    <Container className="min-h-screen items-center justify-center text-center">
      <Text size="xl" className="font-bold">
        404 - Page Not Found
      </Text>
      <Text className="mt-2">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </Text>
    </Container>
  );
};

export default Page;
