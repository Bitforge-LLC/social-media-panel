"use client";

import { Container, Divider, Text } from "@Bitforge-LLC/ui";
import Link from "next/link";
import { type FC } from "react";

import { Logo } from "@/components/logo";
import { policies, socials } from "@/config";

const Footer: FC = () => {
  const copyright = `© ${new Date().getFullYear()}, Bitforge LLC`;

  return (
    <Container as="footer" className="hug mt-auto text-neutral-200">
      <Divider />
      <Container
        className="hug gap-2 md:flex-row"
        style={{
          paddingBlock: "1.5rem",
          paddingInline: "max(5vw, calc((100vw - 1280px) / 2))",
        }}
      >
        <Container className="gap-2">
          <Container className="hug flex-row gap-2">
            <Logo />
            <Text size="lg" className="mt-6">
              Bitforge
            </Text>
          </Container>
        </Container>
        <Container className="flex-row justify-center gap-10">
          <Container className="hug items-start gap-2">
            <Text size="lg" className="font-semibold uppercase">
              socials
            </Text>
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
              </Link>
            ))}
          </Container>
          <Container className="hug items-start gap-2">
            <Text size="lg" className="font-semibold uppercase">
              legal
            </Text>
            {policies.map((legal) => (
              <Link key={legal.name} href={legal.href}>
                {legal.name}
              </Link>
            ))}
          </Container>
        </Container>
      </Container>
      <Text
        size="sm"
        className="text-muted-foreground"
        style={{
          paddingBlock: "2.5rem",
          paddingInline: "max(5vw, calc((100vw - 1280px) / 2))",
        }}
      >
        {copyright}
      </Text>
    </Container>
  );
};

export { Footer };
