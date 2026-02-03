"use client";

import { Button, Container, Link } from "@Bitforge-LLC/ui";

const links = [
  { href: "/settings", label: "General" },
  { href: "/settings/authentication", label: "Authentication" },
  { href: "/settings/billing", label: "Billing" },
];

const SettingsNav = () => {
  return (
    <Container className="hug gap-4">
      {links.map((link, i) => (
        <Button key={i} variant="light" href={link.href} as={Link}>
          {link.label}
        </Button>
      ))}
    </Container>
  );
};

export { SettingsNav };
