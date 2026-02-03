import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ThemeToggle } from "@/components/themeToggle";

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({
    setTheme: vi.fn(),
    theme: "light",
  }),
}));

// Mock UI components
vi.mock("@Bitforge-LLC/ui", () => ({
  MoonIcon: () => <span>Moon</span>,
  SunIcon: () => <span>Sun</span>,
  Switch: ({
    isSelected,
    onValueChange,
  }: {
    isSelected: boolean;
    onValueChange: (value: boolean) => void;
  }) => (
    <button
      data-testid="theme-toggle"
      onClick={() => onValueChange(!isSelected)}
    >
      {isSelected ? "Dark" : "Light"}
    </button>
  ),
}));

describe("ThemeToggle Component", () => {
  it("should render without crashing", () => {
    render(<ThemeToggle />);
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });
});
