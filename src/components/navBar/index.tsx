"use client";

import {
  Avatar,
  Badge,
  Button,
  Section,
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
import { useSmoothScroll } from "@Bitforge-LLC/ui";
import { CiBellOn } from "@Bitforge-LLC/ui/icons/ci";
import { motion, useMotionValueEvent } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { type FC, useCallback, useState } from "react";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/themeToggle";

type NavBarProps = {
  subpages?: string[];
};

export const NavBar: FC<NavBarProps> = ({ subpages }) => {
  const { data: session } = useSession();
  const { targetY } = useSmoothScroll();
  const [hidden, setHidden] = useState(false);

  const handleLogout = useCallback(() => {
    void signOut();
  }, []);

  useMotionValueEvent(targetY, "change", (latest) => {
    const previous = targetY.getPrevious() ?? 0;

    if (latest < 10) {
      setHidden(false);
    } else if (latest < previous) {
      setHidden(false);
    } else if (latest > previous && latest > 100) {
      setHidden(true);
    }
  });

  return (
    <Section
      as={motion.nav}
      className="hug fixed top-0 right-0 left-0 z-20 backdrop-blur-lg"
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
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
            <Section className="hug flex-row gap-4">
              <Dropdown>
                <Badge content="5" color="primary">
                  <DropdownTrigger>
                    <Button isIconOnly className="rounded-full">
                      <CiBellOn size={30} />
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
                      <Section className="hug items-start">
                        <Text className="font-semibold">
                          {session.user?.name}
                        </Text>
                        <Text className="text-default-500" size="sm">
                          {session.user?.email}
                        </Text>
                      </Section>
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
                      <Section className="hug flex-row items-center justify-between gap-2">
                        <Text>Theme</Text>
                        <ThemeToggle />
                      </Section>
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
            </Section>
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
      <Section
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
      </Section>
    </Section>
  );
};
