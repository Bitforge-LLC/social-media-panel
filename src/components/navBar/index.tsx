"use client";

import {
  Avatar,
  Badge,
  Button,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Text,
} from "@Bitforge-LLC/ui";
import Ci from "@Bitforge-LLC/ui/icons/ci";
import {
  motion,
  useAnimationControls,
  useMotionValueEvent,
  useScroll,
  useVelocity,
} from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { type FC, useCallback } from "react";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/themeToggle";

type NavBarProps = {
  subpages?: string[];
};

export const NavBar: FC<NavBarProps> = ({ subpages }) => {
  const { data: session } = useSession();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const controls = useAnimationControls();

  const handleLogout = useCallback(() => {
    void signOut();
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const velocity = Math.abs(scrollVelocity.get());

    // Duration inversely proportional to velocity (faster scroll = faster animation)
    // Clamp between 0.1s and 0.5s
    const duration = Math.max(0.1, Math.min(0.5, 300 / velocity));

    // Show navbar when scrolling up or at top
    if (latest < previous || latest < 10) {
      void controls.start({ transition: { duration, ease: "easeOut" }, y: 0 });
    }
    // Hide navbar when scrolling down (and past threshold)
    else if (latest > previous && latest > 100) {
      void controls.start({
        transition: { duration, ease: "easeIn" },
        y: "-100%",
      });
    }
  });

  return (
    <Container
      as={motion.nav}
      className="hug fixed top-0 right-0 left-0 z-20 backdrop-blur-lg"
      initial={{ y: 0 }}
      animate={controls}
    >
      <Navbar
        classNames={{
          base: `bg-default-100/25 ${
            !subpages && " border-b border-default-200"
          }`,
          wrapper: "justify-between w-full back",
        }}
        style={{
          paddingBlock: "1rem",
          paddingInline: "max(5vw, calc((100vw - 1280px) / 2))",
        }}
      >
        <NavbarBrand className="flex max-w-fit flex-row gap-6 transition-all duration-300">
          <Logo />
        </NavbarBrand>

        <NavbarContent justify="end">
          {session ? (
            <Container className="hug flex-row gap-4">
              <Dropdown>
                <Badge content="5" color="primary">
                  <DropdownTrigger>
                    <Button isIconOnly className="rounded-full">
                      <Ci.CiBellOn size={30} />
                    </Button>
                  </DropdownTrigger>
                </Badge>
                <DropdownMenu aria-label="Notifications">
                  <DropdownItem key="notifications">
                    No new notifications
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    src={session.user?.image ?? undefined}
                    name={session.user?.name ?? "User"}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User menu" disabledKeys={["profile"]}>
                  <DropdownSection showDivider>
                    <DropdownItem key="profile">
                      <Container className="hug items-start">
                        <Text className="font-semibold">
                          {session.user?.name}
                        </Text>
                        <Text className="text-default-500" size="sm">
                          {session.user?.email}
                        </Text>
                      </Container>
                    </DropdownItem>
                    <DropdownItem key="dashboard">
                      <Link
                        className="h-full w-full"
                        color="foreground"
                        href="/projects"
                      >
                        Dashboard
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="settings">
                      <Link
                        className="h-full w-full"
                        color="foreground"
                        href="/settings"
                      >
                        Account Settings
                      </Link>
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection showDivider>
                    <DropdownItem
                      closeOnSelect={false}
                      key="theme"
                      className="data-[hover=true]:bg-transparent"
                    >
                      <Container className="hug flex-row items-center justify-between gap-2">
                        <Text>Theme</Text>
                        <ThemeToggle />
                      </Container>
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection>
                    <DropdownItem key="home">
                      <Link
                        className="h-full w-full"
                        color="foreground"
                        href="/home"
                      >
                        Home
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="logout" onPress={handleLogout}>
                      Log Out
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </Container>
          ) : (
            <>
              <NavbarItem>
                <Button as={Link} href="/login" color="primary" variant="flat">
                  Login
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  href="/signup"
                  color="primary"
                  variant="light"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
      <Container
        className={`border-default-200 bg-default-100/25 hug flex-row flex-wrap items-center justify-start gap-16 border-b ${!subpages && "hidden"}`}
        style={{
          paddingBlock: "1rem",
          paddingInline: "max(5vw, calc((100vw - 1280px) / 2))",
        }}
      >
        {(subpages ?? []).map((page) => (
          <button className="$" key={page}>
            {page}
          </button>
        ))}
      </Container>
    </Container>
  );
};
