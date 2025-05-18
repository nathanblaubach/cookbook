import { expect, Page, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function expectNoAccessibilityViolation(page: Page) {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
}

test("recipe search page (base url)", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/McClain Family Cookbook/);
  await expect(page.getByRole("heading", { name: "Recipes" })).toBeVisible();
  await expectNoAccessibilityViolation(page);
});

test("recipe search page", async ({ page }) => {
  await page.goto("/recipes");
  await page
    .getByRole("button", { name: "Show Filter Area" })
    .click({ force: true });
  await expect(page.getByRole("heading", { name: "Recipes" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Categories" })).toBeVisible();
  await expectNoAccessibilityViolation(page);
});

test("recipe page: found", async ({ page }) => {
  const recipeId = 0;
  await page.goto(`/recipes/${recipeId}`);
  await expect(
    page.getByRole("heading", { name: "Recipe Name" }),
  ).toBeVisible();
  await expectNoAccessibilityViolation(page);
});

test("recipe page: not found", async ({ page }) => {
  const recipeId = -1;
  await page.goto(`/recipes/${recipeId}`);
  await expect(
    page.getByRole("heading", { name: "Recipe Not Found" }),
  ).toBeVisible();
  await expectNoAccessibilityViolation(page);
});

test("about page", async ({ page }) => {
  await page.goto("/about");
  await expect(
    page.getByRole("heading", { name: "The McClain Family Cookbook" }),
  ).toBeVisible();
  await expectNoAccessibilityViolation(page);
});
