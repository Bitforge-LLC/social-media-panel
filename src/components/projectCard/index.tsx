"use client";

import { Container, Link, Text } from "@Bitforge-LLC/ui";
import Io from "@Bitforge-LLC/ui/icons/io";
import Io5 from "@Bitforge-LLC/ui/icons/io5";
import Md from "@Bitforge-LLC/ui/icons/md";
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
    <Container
      as={Link}
      className="hug w-full cursor-pointer flex-row gap-4 p-4"
      href={`/projects/${id}`}
    >
      <Container className="hug h-36 w-36 bg-slate-500" />
      <Container className="hug items-start">
        <Text size="lg" className="font-semibold">
          {name}
        </Text>
        <Text>{deploymentUrl}</Text>
        <LinkButton link={githubLink} Icon={Io.IoLogoGithub} />
        <LinkButton link={vercelLink} Icon={Io5.IoLogoVercel} />
        <LinkButton link={neonLink} Icon={Md.MdCheckBoxOutlineBlank} />
      </Container>
    </Container>
  );
};

export { ProjectCard };
