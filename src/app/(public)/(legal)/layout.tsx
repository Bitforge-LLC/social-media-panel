import { Container } from "@Bitforge-LLC/ui";
import { type ReactNode } from "react";

type LegalLayoutProps = {
  children: ReactNode;
};

const LegalLayout = ({ children }: LegalLayoutProps) => {
  return (
    <Container className="h-screen w-screen justify-center bg-white p-10 text-black">
      <Container className="max-w-[min(90vw,1280px)] items-center">
        {children}
      </Container>
    </Container>
  );
};

export default LegalLayout;
