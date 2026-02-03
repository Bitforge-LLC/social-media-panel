/**
 * Vitest Unit & Integration Testing Configuration
 *
 * @see https://vitest.dev/config/
 *
 * Key features:
 * - React component testing with jsdom
 * - Global test APIs (no imports needed)
 * - Code coverage reporting
 * - Parallel test execution
 * - Auto-mocking and cleanup
 */

import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  /**
   * Vite plugins
   * @plugin react - Enables React component testing with JSX/TSX
   */
  plugins: [react()],

  /**
   * Module resolution configuration
   */
  resolve: {
    /**
     * Path aliases for cleaner imports
     * @example import { db } from '@/lib/db' instead of '../../../lib/db'
     */
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    /**
     * Auto-clear mock call history between tests
     * Prevents: expect(mockFn).toHaveBeenCalled() from previous test
     */
    clearMocks: true,

    /**
     * Code coverage analysis
     * Run with: bun test:coverage
     */
    coverage: {
      /**
       * Files to exclude from coverage calculation
       * Even if tested, won't count toward coverage %
       */
      exclude: [
        "node_modules/",
        "__tests__/",
        "*.config.{js,ts}",
        "src/types/",
        ".next/",
        "dist/",
        "**/*.d.ts",
        "**/*.spec.ts",
        "**/*.test.ts",
      ],

      /**
       * Files to include in coverage calculation
       * Only these files count toward coverage %
       */
      include: ["src/**/*.{ts,tsx}"],

      /**
       * Coverage collection engine
       *
       * @option 'v8' - Built into Node, fastest, most accurate
       * @option 'istanbul' - Industry standard, more features
       * @option 'c8' - V8-based alternative
       */
      provider: "v8",

      /**
       * Coverage report formats
       * - text: Console output
       * - json: Machine-readable data
       * - html: Interactive web UI at __tests__/coverage/index.html
       * - lcov: Standard format for CI tools (SonarQube, Codecov)
       */
      reporter: ["text", "json", "html", "lcov"],

      /**
       * Where coverage reports are saved
       */
      reportsDirectory: "./__tests__/coverage",

      /**
       * Minimum coverage percentages required to pass
       * Set to 0 to disable enforcement
       *
       * @example { lines: 80, functions: 80, branches: 70, statements: 80 }
       * @tip Start low, gradually increase as you add tests
       */
      thresholds: {
        branches: 0,
        functions: 0,
        lines: 0,
        statements: 0,
      },
    },

    /**
     * Test environment simulates browser/node runtime
     *
     * @option 'node' - Pure Node.js (no DOM, faster)
     * @option 'jsdom' - Browser-like with DOM (React components)
     * @option 'happy-dom' - Lighter alternative to jsdom
     * @option 'edge-runtime' - Edge/serverless environment
     */
    environment: "jsdom",

    exclude: ["node_modules", "dist", ".next", "__tests__/e2e"],
    /**
     * Make test APIs globally available without imports
     * Enables: describe(), it(), expect(), vi(), etc.
     *
     * @note Some prefer explicit imports for better IDE support
     */
    globals: true,

    /**
     * Maximum time for setup/teardown hooks
     * beforeEach, afterEach, beforeAll, afterAll
     */
    hookTimeout: 10000,

    /**
     * Test file patterns
     * Only files matching 'include' and NOT matching 'exclude' are run
     */
    include: ["src/__tests__/**/*.test.{ts,tsx}"],

    /**
     * Run each test file in separate environment
     * @default true - Slower but prevents test interference
     * @tip Set false for faster runs if tests are independent
     */
    isolate: true,

    /**
     * Reset mock implementations to default between tests
     * Clears: mockFn.mockReturnValue() / mockFn.mockImplementation()
     */
    mockReset: true,

    /**
     * Write test results to files
     * Useful for CI/CD integration
     */
    outputFile: {
      json: "./__tests__/test-results/vitest-results.json",
    },

    /**
     * Test result output format
     *
     * @option 'default' - Standard output with colors
     * @option 'verbose' - Detailed output with all test names
     * @option 'dot' - Minimal dots for each test
     * @option 'json' - Machine-readable JSON
     * @option 'html' - Interactive HTML report
     */
    reporters: ["verbose"],

    /**
     * Restore original (non-mocked) implementations
     * Undoes: vi.spyOn() and vi.mock() between tests
     */
    restoreMocks: true,

    /**
     * Retry failed tests to reduce flakiness
     * @default 0 - No retries in local development
     * @ci 2 - Retry twice in CI to handle timing issues
     */
    retry: 0,

    /**
     * Setup files executed before each test file
     * Use for global mocks, test utilities, configuration
     *
     * @see __tests__/setup.ts for implementation
     */
    setupFiles: ["./src/__tests__/setup.ts"],

    /**
     * Maximum time for a single test to complete
     * Prevents infinite loops or hanging tests
     */
    testTimeout: 10000,

    /**
     * Auto re-run tests when files change
     * @default false - Manual runs only
     * @tip Enable during development: vitest --watch
     */
    watch: false,
  },
});
