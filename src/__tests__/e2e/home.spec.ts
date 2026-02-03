import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load the home page successfully", async ({ page }) => {
    await page.goto("/");

    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Check that we're on the correct page
    await expect(page).toHaveURL("/");

    // Verify page title exists
    await expect(page).toHaveTitle(/.+/);
  });
});
