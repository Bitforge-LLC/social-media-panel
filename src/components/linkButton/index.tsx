"use client";

import { Button, type IconType, Link } from "@Bitforge-LLC/ui";
import { type FC } from "react";

type LinkButtonProps = {
  Icon: IconType;
  link: string;
};

const LinkButton: FC<LinkButtonProps> = ({ Icon, link }) => {
  return (
    <Button
      isIconOnly
      as={Link}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full"
      href={link}
    >
      <Icon size={24} />
    </Button>
  );
};

export { LinkButton };
