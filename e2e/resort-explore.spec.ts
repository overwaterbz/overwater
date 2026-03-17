import { test, expect } from "@playwright/test";

test.describe("Resort Explore Flow", () => {
  test("homepage loads with resort content", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test("main content area renders", async ({ page }) => {
    await page.goto("/");
    const body = await page.textContent("body");
    expect(body?.length).toBeGreaterThan(100);
  });

  test("navigation is present", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();
  });

  test("footer with ecosystem links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});
