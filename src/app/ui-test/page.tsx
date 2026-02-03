"use client";

import { Button, Container, Input, Text } from "@Bitforge-LLC/ui";

const UITestPage = () => {
  return (
    <Container className="container mx-auto gap-6 p-8">
      <Text size="xl" className="font-bold">
        UI Package Test
      </Text>

      <Container className="hug max-w-md items-start gap-4 p-4">
        <Text size="lg" className="font-semibold">
          Testing @Bitforge-LLC/ui
        </Text>
        <Text>
          This page tests that components from @Bitforge-LLC/ui (Hero UI
          proxy) work correctly.
        </Text>

        <Input label="Test Input" placeholder="Enter some text..." />

        <Container className="hug flex-row gap-2">
          <Button color="primary">Primary Button</Button>
          <Button color="secondary">Secondary Button</Button>
          <Button variant="bordered">Bordered Button</Button>
        </Container>

        <Text size="sm" className="text-gray-600">
          ✓ If you can see this page with styled components, @Bitforge-LLC/ui
          is working!
        </Text>
      </Container>
    </Container>
  );
};

export default UITestPage;
