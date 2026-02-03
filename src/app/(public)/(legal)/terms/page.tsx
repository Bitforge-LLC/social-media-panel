import { Container, Text } from "@Bitforge-LLC/ui";
import { type FC } from "react";

const Page: FC = () => {
  // Shared variables for dynamic substitution
  const policyVariables = {
    companyName: "Bitforge",
    contactEmail: "cutter@bitforge.studio",
    effectiveDate: "2024-04-21",
  };

  // Terms of Service
  const termsOfService = [
    {
      content: policyVariables.effectiveDate,
      header: "Effective Date",
    },
    {
      content:
        "Our platform helps you track project progress, request new features, process payments, and host infrastructure. Each project or engagement is based on a separate agreement we'll make with you.",
      header: "Our Service",
    },
    {
      content:
        "We operate on a per-client basis. Pricing, billing terms, and deliverables are determined by individual contract. Some services may be one-off; others ongoing. Either way, the contract terms take precedence over anything here.",
      header: "Payment & Contracts",
    },
    {
      content:
        "You're responsible for the security of your account and access credentials. Don't share logins or use the platform in ways that break the law or disrupt others.",
      header: "Account Rules",
    },
    {
      content:
        "We reserve the right to suspend or terminate your access if you break the rules, abuse the system, or violate our Acceptable Use Policy. We may also suspend accounts if payment isn't made according to agreed terms.",
      header: "Termination",
    },
    {
      content:
        "Unless otherwise agreed, we retain rights to the platform, including its code, structure, and design. You retain ownership over your content and any custom assets we create for you.",
      header: "Ownership",
    },
    {
      content:
        "We provide the service as-is. We do our best to keep it online and safe, but we can't promise it'll always be perfect. We're not liable for any indirect damages, losses, or service interruptions.",
      header: "Liability",
    },
    {
      content:
        "We may update these terms as the product or laws change. We'll notify you if the changes are significant.",
      header: "Changes",
    },
  ];

  return (
    <Container className="h-full w-full gap-4 self-center">
      <Text size="xl" className="font-bold">
        Terms of Service
      </Text>
      {termsOfService.map((item, index) => (
        <Container key={index} className="px-0!">
          <Text size="lg" className="font-bold">
            {item.header}
          </Text>
          <Text size="sm">{item.content}</Text>
        </Container>
      ))}
    </Container>
  );
};

export default Page;
