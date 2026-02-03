import { Container, Text } from "@Bitforge-LLC/ui";
import { type FC } from "react";

const Page: FC = () => {
  // Shared variables for dynamic substitution
  const policyVariables = {
    companyName: "Bitforge",
    contactEmail: "cutter@bitforge.studio",
    effectiveDate: "2024-04-21",
  };

  // Privacy Policy
  const privacyPolicy = [
    {
      content: policyVariables.effectiveDate,
      header: "Effective Date",
    },
    {
      content:
        "We collect only the minimum information necessary to provide and improve our services:\n- OAuth Tokens: Stored securely to let you access third-party services you've explicitly connected.\n- Account Information: Such as your name, email address, and organization.\n- Technical Info: Your IP address and browser info, mainly for logging, security, and troubleshooting.",
      header: "What We Collect",
    },
    {
      content:
        "We use your data to:\n- Provide access to your account and integrations\n- Deliver project updates and billing info\n- Communicate with you for support, product changes, and updates\n- Understand how the platform is used and improve it over time",
      header: "Why We Collect It",
    },
    {
      content:
        "We work with vendors that help us run our business. These include (or will include) services like Google Analytics, Stripe for payments, and cloud providers like Vercel or AWS. We vet all our third-party processors for good privacy practices.",
      header: "Third-Party Services",
    },
    {
      content:
        "We keep your data only as long as needed to provide our service or comply with the law. When it's no longer needed, we securely delete it.",
      header: "Retention",
    },
    {
      content: `You can access, modify, or delete your personal information at any time. Email us at ${policyVariables.contactEmail} with any request.\n\nWe do not sell your data. Ever.`,
      header: "Your Rights",
    },
  ];

  return (
    <Container className="h-full w-full gap-4 self-center">
      <Text size="xl" className="font-bold">
        Privacy Policy
      </Text>
      {privacyPolicy.map((item, index) => (
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
