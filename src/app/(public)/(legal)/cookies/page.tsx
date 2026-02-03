import { Container, Text } from "@Bitforge-LLC/ui";
import { type FC } from "react";

const Page: FC = () => {
  // Shared variables for dynamic substitution
  const policyVariables = {
    companyName: "Bitforge",
    contactEmail: "cutter@bitforge.studio",
    effectiveDate: "2024-04-21",
  };
  // Cookie Policy
  const cookiePolicy = [
    {
      content: policyVariables.effectiveDate,
      header: "Effective Date",
    },
    {
      content:
        "- Essential Cookies: Required for login and secure access\n- Analytics Cookies (future): Tools like Google Analytics to help us understand usage",
      header: "Types of Cookies",
    },
    {
      content:
        "You can manage cookies through your browser settings. If you're in the EU or other regulated regions, we'll provide a cookie consent banner.",
      header: "Managing Cookies",
    },
  ];

  return (
    <Container className="h-full w-full gap-4 self-center">
      <Text size="xl" className="font-bold">
        Cookie Policy
      </Text>
      {cookiePolicy.map((item, index) => (
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
