import { Container, Text } from "@Bitforge-LLC/ui";
import { type FC } from "react";

const Page: FC = () => {
  // Shared variables for dynamic substitution
  const policyVariables = {
    companyName: "Bitforge",
    contactEmail: "cutter@bitforge.studio",
    effectiveDate: "2024-04-21",
  };
  // Acceptable Use Policy
  const acceptableUsePolicy = [
    {
      content:
        "You agree not to:\n- Violate any laws using our platform\n- Try to hack, probe, or break into accounts that aren't yours\n- Use the platform to harass, impersonate, or defraud others\n- Upload malware, spam, or harmful code",
      header: "What You Can't Do",
    },
    {
      content:
        "We may suspend or terminate accounts that violate these rules. We prefer giving notice and a chance to fix things, but in extreme cases we reserve the right to act immediately.",
      header: "Enforcement",
    },
    {
      content: `If you have questions or feedback about these policies, please contact us at ${policyVariables.contactEmail}.`,
      header: "Contact",
    },
  ];

  return (
    <Container className="h-full w-full gap-4 self-center">
      <Text size="xl" className="font-bold">
        Acceptable Use Policy
      </Text>
      {acceptableUsePolicy.map((item, index) => (
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
