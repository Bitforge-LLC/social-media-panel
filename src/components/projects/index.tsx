"use client";

import { Button, Container } from "@Bitforge-LLC/ui";
import { type FC, useCallback } from "react";

import { env } from "@/env";
// import { useServer } from "@/lib/trpc/client";

const Projects: FC = () => {
  // TODO: Re-enable when user.getProjects router is created
  // const api = useServer();
  // const { data: projects } = api.user.getProjects.useQuery();
  const projects = null;

  const handleTestLog = useCallback((): void => {
    // Development-only logging
    if (env.NODE_ENV === "development") {
      console.warn("Projects data:", projects);
    }
  }, [projects]);

  return (
    <Container>
      {/* {projects?.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          githubLink={project.metadata.github.url}
          vercelLink={project.metadata.vercel.projectUrl}
          neonLink={project.metadata.neon.url}
          deploymentUrl={project.metadata.vercel.deploymentUrl}
        />
      ))} */}
      <Button onPress={handleTestLog}>test</Button>
    </Container>
  );
};

export { Projects };
