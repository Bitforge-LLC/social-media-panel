import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    back: vi.fn(),
    pathname: "/",
    prefetch: vi.fn(),
    push: vi.fn(),
    query: {},
    replace: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

// Mock environment variables (set before tests run)
