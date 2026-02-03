/**
 * Playwright E2E Testing Configuration
 *
 * @see https://playwright.dev/docs/test-configuration
 *
 * Key features:
 * - Multi-browser testing (Chromium, Firefox, WebKit)
 * - Mobile device emulation (Pixel 5, iPhone 12)
 * - Video recording on failures
 * - Auto-starts dev server before tests
 * - All artifacts saved to __tests__/ directory
 */

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  /**
   * Fail build if test.only() is committed
   * Prevents accidentally running subset of tests in CI
   */
  forbidOnly: Boolean(process.env.CI),

  /**
   * Run tests in parallel across all spec files
   * @default true - Speeds up test execution
   * @note Set to false if tests have shared state dependencies
   */
  fullyParallel: true,

  /**
   * Where test artifacts are stored (videos, screenshots, traces)
   * Each test gets its own subdirectory: __tests__/test-results/{test-name}/
   */
  outputDir: "./src/__tests__/test-results",

  /**
   * Browser and device configurations to test against
   * Each project runs all tests independently
   *
   * Run specific project: bunx playwright test --project=chromium
   * Run subset: bunx playwright test --project=chromium --project=firefox
   *
   * @note Increases test time linearly (5 projects = 5x longer)
   * @tip Comment out projects you don't need during development
   */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  /**
   * Test result reporters
   * - html: Interactive web UI at __tests__/playwright-report/index.html
   * - json: Machine-readable results for CI/CD integration
   * - list: Real-time console output during test runs
   * @see https://playwright.dev/docs/test-reporters
   */
  reporter: [
    ["html", { outputFolder: "./__tests__/playwright-report" }],
    ["json", { outputFile: "./__tests__/test-results/results.json" }],
    ["list"],
  ],

  /**
   * Retry failed tests to reduce flakiness
   * @ci 2 retries - Network/timing issues are common in CI
   * @local 0 retries - Faster feedback during development
   */
  retries: process.env.CI ? 2 : 0,

  /**
   * Directory containing E2E test files
   * Tests should use .spec.ts extension
   */
  testDir: "./src/__tests__/e2e",

  /**
   * Maximum time one test can run (milliseconds)
   * Prevents hanging tests from blocking the suite
   */
  timeout: 30 * 1000,

  /**
   * Shared settings for all tests
   * Can be overridden per-project
   */
  use: {
    /**
     * Timeout for individual actions (click, fill, etc.)
     * If action takes longer, test fails
     */
    actionTimeout: 10 * 1000,

    /**
     * Base URL for page.goto('/path')
     * Use PLAYWRIGHT_TEST_BASE_URL env var for different environments
     * @example page.goto('/') -> http://localhost:3000/
     */
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",

    /**
     * Ignore HTTPS certificate errors
     * Useful for self-signed certs in development
     */
    ignoreHTTPSErrors: true,

    /**
     * Screenshot capture settings
     * Saved to: __tests__/test-results/{test}/test-{failed|finished}-{n}.png
     *
     * @option 'on' - Every test gets screenshots
     * @option 'off' - No screenshots
     * @option 'only-on-failure' - Only failed tests (recommended)
     */
    screenshot: "only-on-failure",

    /**
     * Execution trace for time-travel debugging
     * Records DOM snapshots, network, console logs
     * View with: bunx playwright show-trace __tests__/test-results/{test}/trace.zip
     *
     * @option 'on' - Always record (slow, large files)
     * @option 'off' - Never record
     * @option 'on-first-retry' - Only on retry attempts
     * @option 'retain-on-failure' - Record all, delete on pass (recommended)
     */
    trace: "retain-on-failure",

    /**
     * Video recording of test execution
     * Saved to: __tests__/test-results/{test}/video.webm
     *
     * @option 'on' - Record all tests (~5MB per test)
     * @option 'off' - No videos
     * @option 'on-first-retry' - Only retried tests
     * @option 'retain-on-failure' - Record all, delete on pass (recommended)
     */
    video: "retain-on-failure",

    /**
     * Browser viewport size
     * Tests run at this resolution (not full screen)
     */
    viewport: { height: 720, width: 1280 },
  },

  /**
   * Auto-start development server before running tests
   * Playwright waits for server to be ready before starting tests
   *
   * @property command - Shell command to start your dev server
   * @property url - URL to poll until server is ready
   * @property reuseExistingServer - Skip starting if server already running
   *   - CI: false (always start fresh)
   *   - Local: true (reuse existing dev server)
   *
   * @tip Set PLAYWRIGHT_TEST_BASE_URL to test against production/staging
   */
  webServer: {
    command: "bun run dev",
    reuseExistingServer: !process.env.CI,
    url: "http://localhost:3000",
  },

  /**
   * Number of parallel worker processes
   * @ci 1 worker - Prevents resource contention
   * @local undefined - Auto-detect CPU cores for optimal speed
   */
  workers: process.env.CI ? 1 : undefined,
});
