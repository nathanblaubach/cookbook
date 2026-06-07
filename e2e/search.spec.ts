import { expect, test } from "@playwright/test";

test.describe("search", () => {
  test("find a recipe with the search and filter bar", async ({ page }) => {
    // Go to the search page
    await page.goto("/");

    // Ensure recipes exist before search
    await expect(
      page.getByRole("link", { name: "Hot Mulled Cider" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Cranberry Tea" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Bar-B-Q Ribs" }),
    ).toBeVisible();

    // Open the filter area and apply a filter
    await page.getByRole("button", { name: "Show Filter Area" }).click();
    await page
      .getByRole("checkbox", { name: "Beverage" })
      .check({ force: true });

    // Confirm that the non beverages are not visible
    await expect(
      page.getByRole("link", { name: "Hot Mulled Cider" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Cranberry Tea" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Bar-B-Q Ribs" }),
    ).not.toBeVisible();

    // Type in the search box
    await page.getByPlaceholder("Search").fill("Hot Mulled Cider");

    // Confirm that the non beverages and non searched recipes are not visible
    await expect(
      page.getByRole("link", { name: "Hot Mulled Cider" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Cranberry Tea" }),
    ).not.toBeVisible();
    await expect(
      page.getByRole("link", { name: "Bar-B-Q Ribs" }),
    ).not.toBeVisible();

    // Click a recipe link
    await page
      .getByRole("link", { name: "Hot Mulled Cider" })
      .click({ force: true });

    // Check that the recipe page loads
    await expect(page.getByRole("heading", { name: "Recipe Name" })).toHaveText(
      "Hot Mulled Cider",
    );
  });
});
