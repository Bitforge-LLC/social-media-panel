import { Container, Text } from "@Bitforge-LLC/ui";
import { type FC } from "react";

const Page: FC = () => {
  // Shared variables for dynamic substitution
  const policyVariables = {
    companyName: "Bitforge",
    contactEmail: "cutter@bitforge.studio",
    effectiveDate: "2024-04-21",
  };

  // Security Policy
  const securityPolicy = [
    {
      content:
        "We're serious about security. Here's what we do:\n- Store OAuth tokens securely\n- Use HTTPS across our stack\n- Limit internal access to customer data\n- Log and monitor infrastructure activity for anomalies",
      header: "Security Measures",
    },
    {
      content: `We do not currently have a formal bug bounty or vulnerability disclosure process. If you believe you've found a security issue, please email ${policyVariables.contactEmail}. We appreciate your help.`,
      header: "Vulnerability Reporting",
    },
  ];

  return (
    <Container className="h-full w-full gap-4 self-center">
      <Text size="xl" className="font-bold">
        Security Policy
      </Text>
      {securityPolicy.map((item, index) => (
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
