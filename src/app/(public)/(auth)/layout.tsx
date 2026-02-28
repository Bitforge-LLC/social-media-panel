import { Section } from "@Bitforge-LLC/ui";
import { type FC, type ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Section className="h-screen w-screen px-0!">
      <Section className="h-full w-full flex-row px-0!">
        <Section className="bg-default-200 h-full w-full max-w-[800px] items-center justify-center">
          {children}
        </Section>
        <Section className="w-full" />
      </Section>
    </Section>
  );
};

export default Layout;
