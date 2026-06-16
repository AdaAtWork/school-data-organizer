import { expect, test } from "@playwright/test";

test("unauthenticated user visiting /dashboard is redirected to /login", async ({
  page,
}) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL("/login");
});

test("unauthenticated user visiting /events is redirected to /login", async ({
  page,
}) => {
  await page.goto("/events");
  await expect(page).toHaveURL("/login");
});
