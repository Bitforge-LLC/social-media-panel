import { Container } from "@Bitforge-LLC/ui";
import { type FC, type ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Container className="h-screen w-screen px-0!">
      <Container className="h-full w-full flex-row px-0!">
        <Container className="bg-default-200 h-full w-full max-w-[800px] items-center justify-center">
          {children}
        </Container>
        <Container className="w-full" />
      </Container>
    </Container>
  );
};

export default Layout;
