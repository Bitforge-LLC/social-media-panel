import { Container, Divider, Text } from "@Bitforge-LLC/ui";
import { type FC, type ReactNode } from "react";

type SettingsCardProps = {
  Button?: ReactNode;
  children?: ReactNode;
  description: string;
  info?: string;
  title: string;
};

const SettingsCard: FC<SettingsCardProps> = ({
  Button,
  children,
  description,
  info,
  title,
}) => {
  return (
    <Container className="hug items-start gap-4 rounded-md border-1 border-gray-200 p-4">
      <Text size="xl" className="font-bold">
        {title}
      </Text>
      <Text>{description}</Text>
      <Divider />
      {children}
      <Divider />
      <Container className="w-full flex-row justify-between">
        <Text>{info}</Text>
        {Button}
      </Container>
    </Container>
  );
};

export { SettingsCard };
