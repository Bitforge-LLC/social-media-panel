// src/components/themeToggle.tsx
"use client";

import { MoonIcon, SunIcon, Switch } from "@Bitforge-LLC/ui";
import { useTheme } from "next-themes";
import { type FC, useCallback } from "react";

const ThemeToggle: FC = () => {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = useCallback((): void => {
    if (theme === "dark") {
      setTheme("light");
      return;
    }

    if (theme === "light") {
      setTheme("dark");
    }
  }, [setTheme, theme]);

  return (
    <Switch
      isSelected={theme === "dark"}
      onValueChange={handleThemeChange}
      size="lg"
      color="secondary"
      endContent={<SunIcon />}
      startContent={<MoonIcon />}
    />
  );
};

export { ThemeToggle };
