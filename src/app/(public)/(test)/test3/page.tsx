"use client";

import { Button, Section, Text } from "@Bitforge-LLC/ui";
import type { FC } from "react";

// In general, we don't need an auto calculated gap, because of the way the padding is calculated
// If we need a gap, we should use a container.

// For the most part we should control spacing with the padding like p-0!
// Reserve full bleed for when we don't have direct access to parent container but need to take up the full area

const Test3Page: FC = () => {
  return (
    <Section className="gap-8">
      <Text size="xl" className="font-bold">
        Container Layout System Demo
      </Text>
      <Text className="text-gray-500">
        The red dashed line shows the parent Container edge. Watch how
        backgrounds and text align.
      </Text>

      {/* 1. Default Container */}
      <Section className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          1. Default Container
        </Text>
        <Text size="sm" className="mb-2 text-gray-500">
          Has 5% padding gutters. Content is indented.
        </Text>
        <Section className="border-2 border-dashed border-red-500">
          <Section className="bg-blue-500/30 py-4">
            <Section className="hug bg-blue-500/50 p-2">
              Text is indented from edges
            </Section>
          </Section>
        </Section>
      </Section>

      {/* 2. No Gutters (px-0!) */}
      <Section className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          2. No Gutters (px-0!)
        </Text>
        <Text size="sm" className="mb-2 text-gray-500">
          Override padding with px-0!. Content goes edge-to-edge.
        </Text>
        <Section className="border-2 border-dashed border-red-500">
          <Section className="bg-green-500/30 px-0! py-4">
            <Section className="hug bg-green-500/50 p-2">
              Text touches the edges
            </Section>
          </Section>
        </Section>
      </Section>

      {/* 3. Full-Bleed Container */}
      <Section className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          3. Full-Bleed Container
        </Text>
        <Text size="sm" className="mb-2 text-gray-500">
          Breaks OUT of parent gutters. Background edge-to-edge, but content
          still has gutters.
        </Text>
        <Section className="border-2 border-dashed border-red-500">
          <Section className="full-bleed bg-purple-500/30 py-4">
            <Section className="hug bg-purple-500/50 p-2">
              Background breaks out, text still indented
            </Section>
          </Section>
        </Section>
      </Section>

      {/* 4. Full-Bleed + px-0! */}
      <Section className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          4. Full-Bleed + px-0!
        </Text>
        <Text size="sm" className="mb-2 text-gray-500">
          Breaks out AND no gutters. Everything edge-to-edge.
        </Text>
        <Section className="border-2 border-dashed border-red-500">
          <Section className="full-bleed bg-orange-500/30 px-0! py-4">
            <Section className="hug bg-orange-500/50 p-2">
              Background AND text both edge-to-edge
            </Section>
          </Section>
        </Section>
      </Section>

      {/* 5. Flex Row */}
      <Section className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          5. Flex Row Layout
        </Text>
        <Text size="sm" className="mb-2 text-gray-500">
          Side-by-side children with flex-row class.
        </Text>
        <Section className="flex-row">
          <Section className="bg-pink-500/30 p-4 px-0!">
            <Section className="hug">Left Column</Section>
          </Section>
          <Section className="bg-cyan-500/30 p-4 px-0!">
            <Section className="hug">Right Column</Section>
          </Section>
        </Section>
      </Section>

      {/* 6. Nested Example */}
      <Section className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          6. Nested Containers
        </Text>
        <Text size="sm" className="mb-2 text-gray-500">
          Containers can nest. Each level can have its own gutters.
        </Text>
        <Section className="bg-gray-500/20 py-4">
          <Section className="hug mb-2">
            Outer Container (has gutters)
          </Section>
          <Section className="bg-blue-500/20 py-4">
            <Section className="hug mb-2">
              Inner Container (also has gutters)
            </Section>
            <Section className="bg-green-500/20 px-0! py-4">
              <Section className="hug">
                Innermost Container with px-0! (no gutters)
              </Section>
            </Section>
          </Section>
        </Section>
      </Section>

      {/* 7. No Space Modifiers - shows natural padding stacking */}
      <Section className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          7. No Space Modifiers
        </Text>
        <Text size="sm" className="mb-2 text-gray-500">
          Shows how padding naturally stacks with nested Sections.
        </Text>

        <Section className="bg-red-600">
          <Section className="bg-amber-300">one</Section>
          <Section className="bg-accent">two</Section>
        </Section>
      </Section>

      {/* 8. Flex Row - No Space Modifiers */}
      <Section className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          8. Flex Row (No Modifiers)
        </Text>
        <Section className="flex-row bg-red-600">
          <Section className="bg-amber-300">one</Section>
          <Section className="bg-accent">two</Section>
        </Section>
      </Section>

      {/* 9. Flex Row with Nested Children */}
      <Section className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          9. Flex Row with Nested Children
        </Text>
        <Section className="flex-row bg-red-600">
          <Section className="bg-amber-300">
            <Section className="bg-amber-800">test</Section>
            <Section className="bg-amber-500">test</Section>
          </Section>
          <Section className="bg-accent">two</Section>
        </Section>
      </Section>

      {/* 10. Padding Modifiers */}
      <Section className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          10. Padding Modifiers
        </Text>
        <Section className="full-bleed-x bg-red-600">
          <Section className="bg-amber-300 px-0!">one</Section>
          <Section className="bg-accent">two</Section>
        </Section>
      </Section>

      {/* 11. Text Component */}
      <Section className="px-0!">
        <Text size="lg" className="mb-2 font-semibold">
          11. Text Component
        </Text>
        <Section className="bg-gray-800">
          <Text size="xl">XL - This is an h1 (2rem)</Text>
          <Text size="lg">LG - This is an h2 (1.25rem)</Text>
          <Text size="base">Base - This is a p (1rem) - default</Text>
          <Text>No size prop - defaults to p (1rem)</Text>
          <Text size="sm">SM - This is a small (0.875rem)</Text>
        </Section>
      </Section>

      <Section className="bg-default-600/50 !w-[500px] flex-row">
        <Section>
          {" "}
          <Button>1</Button>
        </Section>

        <Section>
          {" "}
          <Button>1</Button>
        </Section>
        <Section>
          {" "}
          <Button>1</Button>
        </Section>
      </Section>
    </Section>
  );
};

export default Test3Page;
