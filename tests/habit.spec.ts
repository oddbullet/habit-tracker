import { test, expect, type Page } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

test.describe("Login", () => {
  test("should allow me login", async ({ page }) => {
    await page.goto("http://localhost:5173/login");

    const username: any = process.env.TEST_USERNAME;
    const password: any = process.env.TEST_PASSWORD;

    await page.getByLabel("Email").fill(username);
    await page.getByLabel("Password").fill(password);

    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page).toHaveURL("http://localhost:5173/habit");
  });
});
