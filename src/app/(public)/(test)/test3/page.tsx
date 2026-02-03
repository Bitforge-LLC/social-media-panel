"use client";

import { Button, Container, Text } from "@Bitforge-LLC/ui";
import type { FC } from "react";

// In general, we don't need an auto calculated gap, because of the way the padding is calculated
// If we need a gap, we should use a container.

// For the most part we should control spacing with the padding like p-0!
// Reserve full bleed for when we don't have direct access to parent container but need to take up the full area

const Test3Page: FC = () => {
  return (
    <Container className="gap-8">
      <Text size="xl" className="font-bold">
        Container Layout System Demo
      </Text>
      <Text className="text-gray-500">
        The red dashed line shows the parent Container edge. Watch how
        backgrounds and text align.
      </Text>

      {/* 1. Default Container */}
      <Container className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          1. Default Container
        </Text>
        <Text size="sm" className="mb-2 text-gray-500">
          Has 5% padding gutters. Content is indented.
        </Text>
        <Container className="border-2 border-dashed border-red-500">
          <Container className="bg-blue-500/30 py-4">
            <Container className="hug bg-blue-500/50 p-2">
              Text is indented from edges
            </Container>
          </Container>
        </Container>
      </Container>

      {/* 2. No Gutters (px-0!) */}
      <Container className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          2. No Gutters (px-0!)
        </Text>
        <Text size="sm" className="mb-2 text-gray-500">
          Override padding with px-0!. Content goes edge-to-edge.
        </Text>
        <Container className="border-2 border-dashed border-red-500">
          <Container className="bg-green-500/30 px-0! py-4">
            <Container className="hug bg-green-500/50 p-2">
              Text touches the edges
            </Container>
          </Container>
        </Container>
      </Container>

      {/* 3. Full-Bleed Container */}
      <Container className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          3. Full-Bleed Container
        </Text>
        <Text size="sm" className="mb-2 text-gray-500">
          Breaks OUT of parent gutters. Background edge-to-edge, but content
          still has gutters.
        </Text>
        <Container className="border-2 border-dashed border-red-500">
          <Container className="full-bleed bg-purple-500/30 py-4">
            <Container className="hug bg-purple-500/50 p-2">
              Background breaks out, text still indented
            </Container>
          </Container>
        </Container>
      </Container>

      {/* 4. Full-Bleed + px-0! */}
      <Container className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          4. Full-Bleed + px-0!
        </Text>
        <Text size="sm" className="mb-2 text-gray-500">
          Breaks out AND no gutters. Everything edge-to-edge.
        </Text>
        <Container className="border-2 border-dashed border-red-500">
          <Container className="full-bleed bg-orange-500/30 px-0! py-4">
            <Container className="hug bg-orange-500/50 p-2">
              Background AND text both edge-to-edge
            </Container>
          </Container>
        </Container>
      </Container>

      {/* 5. Flex Row */}
      <Container className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          5. Flex Row Layout
        </Text>
        <Text size="sm" className="mb-2 text-gray-500">
          Side-by-side children with flex-row class.
        </Text>
        <Container className="flex-row">
          <Container className="bg-pink-500/30 p-4 px-0!">
            <Container className="hug">Left Column</Container>
          </Container>
          <Container className="bg-cyan-500/30 p-4 px-0!">
            <Container className="hug">Right Column</Container>
          </Container>
        </Container>
      </Container>

      {/* 6. Nested Example */}
      <Container className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          6. Nested Containers
        </Text>
        <Text size="sm" className="mb-2 text-gray-500">
          Containers can nest. Each level can have its own gutters.
        </Text>
        <Container className="bg-gray-500/20 py-4">
          <Container className="hug mb-2">
            Outer Container (has gutters)
          </Container>
          <Container className="bg-blue-500/20 py-4">
            <Container className="hug mb-2">
              Inner Container (also has gutters)
            </Container>
            <Container className="bg-green-500/20 px-0! py-4">
              <Container className="hug">
                Innermost Container with px-0! (no gutters)
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>

      {/* 7. No Space Modifiers - shows natural padding stacking */}
      <Container className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          7. No Space Modifiers
        </Text>
        <Text size="sm" className="mb-2 text-gray-500">
          Shows how padding naturally stacks with nested Sections.
        </Text>

        <Container className="bg-red-600">
          <Container className="bg-amber-300">one</Container>
          <Container className="bg-accent">two</Container>
        </Container>
      </Container>

      {/* 8. Flex Row - No Space Modifiers */}
      <Container className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          8. Flex Row (No Modifiers)
        </Text>
        <Container className="flex-row bg-red-600">
          <Container className="bg-amber-300">one</Container>
          <Container className="bg-accent">two</Container>
        </Container>
      </Container>

      {/* 9. Flex Row with Nested Children */}
      <Container className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          9. Flex Row with Nested Children
        </Text>
        <Container className="flex-row bg-red-600">
          <Container className="bg-amber-300">
            <Container className="bg-amber-800">test</Container>
            <Container className="bg-amber-500">test</Container>
          </Container>
          <Container className="bg-accent">two</Container>
        </Container>
      </Container>

      {/* 10. Padding Modifiers */}
      <Container className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          10. Padding Modifiers
        </Text>
        <Container className="full-bleed-x bg-red-600">
          <Container className="bg-amber-300 px-0!">one</Container>
          <Container className="bg-accent">two</Container>
        </Container>
      </Container>

      {/* 11. Text Component */}
      <Container className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          11. Text Component
        </Text>
        <Container className="bg-gray-800">
          <Text size="xl">XL - This is an h1 (2rem)</Text>
          <Text size="lg">LG - This is an h2 (1.25rem)</Text>
          <Text size="base">Base - This is a p (1rem) - default</Text>
          <Text>No size prop - defaults to p (1rem)</Text>
          <Text size="sm">SM - This is a small (0.875rem)</Text>
        </Container>
      </Container>

      <Container className="bg-default-600/50 !w-[500px] flex-row">
        <Container>
          {" "}
          <Button>1</Button>
        </Container>

        <Container>
          {" "}
          <Button>1</Button>
        </Container>
        <Container>
          {" "}
          <Button>1</Button>
        </Container>
      </Container>
    </Container>
  );
};

export default Test3Page;
