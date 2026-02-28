"use client";

import { Section, Link, Text } from "@Bitforge-LLC/ui";
import { IoLogoGithub } from "@Bitforge-LLC/ui/icons/io";
import { IoLogoVercel } from "@Bitforge-LLC/ui/icons/io5";
import { MdCheckBoxOutlineBlank } from "@Bitforge-LLC/ui/icons/md";
import { type FC } from "react";

import { LinkButton } from "@/components/linkButton";

type ProjectCardProps = {
  deploymentUrl: string;
  githubLink: string;
  id: string;
  name: string;
  neonLink: string;
  vercelLink: string;
};

const ProjectCard: FC<ProjectCardProps> = ({
  deploymentUrl,
  githubLink,
  id,
  name,
  neonLink,
  vercelLink,
}) => {
  return (
    <Section
      as={Link}
      className="hug w-full cursor-pointer flex-row gap-4 p-4"
      href={`/projects/${id}`}
    >
      <Section className="hug h-36 w-36 bg-slate-500" />
      <Section className="hug items-start">
        <Text size="lg" className="font-semibold">
          {name}
        </Text>
        <Text>{deploymentUrl}</Text>
        <LinkButton link={githubLink} Icon={IoLogoGithub} />
        <LinkButton link={vercelLink} Icon={IoLogoVercel} />
        <LinkButton link={neonLink} Icon={MdCheckBoxOutlineBlank} />
      </Section>
    </Section>
  );
};

export { ProjectCard };
