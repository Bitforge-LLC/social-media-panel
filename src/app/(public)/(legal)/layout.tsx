import { Section } from "@Bitforge-LLC/ui";
import { type ReactNode } from "react";

type LegalLayoutProps = {
  children: ReactNode;
};

const LegalLayout = ({ children }: LegalLayoutProps) => {
  return (
    <Section className="h-screen w-screen justify-center bg-white p-10 text-black">
      <Section className="max-w-[min(90vw,1280px)] items-center">
        {children}
      </Section>
    </Section>
  );
};

export default LegalLayout;
