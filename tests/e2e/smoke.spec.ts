import { expect, test } from "@playwright/test";

test("app loads and shows the Dashboard page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});
