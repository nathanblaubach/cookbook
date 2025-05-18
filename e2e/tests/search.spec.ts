import { expect, test } from "@playwright/test";

test("Navigate to recipe", async ({ page }) => {
  // Go to the search page
  await page.goto("/recipes");

  // Click a recipe link
  await page
    .getByRole("link", { name: "Hot Mulled Cider" })
    .click({ force: true });

  // Check that the recipe page loads
  await expect(
    page.getByRole("heading", { name: "Recipe Name" }),
  ).toHaveText("Hot Mulled Cider");
});

test("Search for a recipe", async ({ page }) => {
  // Go to the search page
  await page.goto("/recipes");

  // Ensure recipes exist before search
  await expect(
    page.getByRole("link", { name: "Hot Mulled Cider" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Bar-B-Q Ribs" })).toBeVisible();

  // Type in the search box
  await page.getByPlaceholder("Search").fill("Hot Mulled Cider");

  // Ensure only the searched recipe is visible
  await expect(
    page.getByRole("link", { name: "Hot Mulled Cider" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Bar-B-Q Ribs" }),
  ).not.toBeVisible();
});

test("Filter recipes", async ({ page }) => {
  // Go to the search page
  await page.goto("/recipes");

  // Ensure recipes exist before search
  await expect(
    page.getByRole("link", { name: "Hot Mulled Cider" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Bar-B-Q Ribs" })).toBeVisible();

  // Open the filter area and apply a filter
  await page.getByRole("button", { name: "Show Filter Area" }).click();
  await page.getByRole("checkbox", { name: "Beverage" }).check({ force: true });

  // Ensure only the searched recipe is visible
  await expect(
    page.getByRole("link", { name: "Hot Mulled Cider" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Bar-B-Q Ribs" }),
  ).not.toBeVisible();
});
