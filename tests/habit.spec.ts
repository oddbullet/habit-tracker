import { test, expect, type Page } from "@playwright/test";

test.describe("Authentication", () => {
  test("should allow me login", async ({ page }) => {
    await page.goto("http://localhost:5173/login");

    const username: any = process.env.TEST_USERNAME;
    const password: any = process.env.TEST_PASSWORD;

    await page.getByLabel("Email").fill(username);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page).toHaveURL("http://localhost:5173/habit");
  });

  test("authentication toast popup", async ({ page }) => {
    await page.goto("http://localhost:5173/login");

    await page.getByLabel("Email").fill("username");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(
      page.getByText("Authentication Error", { exact: true })
    ).toBeVisible();
  });
});

test.describe("Habit", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/login");

    const username: any = process.env.TEST_USERNAME;
    const password: any = process.env.TEST_PASSWORD;

    await page.getByLabel("Email").fill(username);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Sign In" }).click();
  });

  test("should add and edit habit", async ({ page }) => {
    await page.getByRole("button", { name: "New Habit" }).click();
    await page
      .getByRole("textbox", { name: "e.g., Drink some water" })
      .fill("Test 1");

    await page
      .locator("form")
      .getByRole("button")
      .filter({ hasText: /^$/ })
      .nth(1)
      .click();

    await page.getByRole("button", { name: "Submit" }).click();

    await page.getByText("Test 1").dblclick();
    await page.getByRole("button").nth(1).click();
    await page.getByRole("button").nth(1).click();

    await page.goto("http://localhost:5173/habit");

    await expect(page.getByRole("button").nth(6)).not.toHaveCSS(
      "background-color",
      "transparent"
    );
  });

  //   test("Statics Habit", async ({ page }) => {});

  //   test("Delete Habit", async ({ page }) => {});
});
