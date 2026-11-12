import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import type { FilterItem } from "../../components/Filter/Filter";
import type { RecipeCard } from "../../components/RecipeCardGrid/RecipeCardGrid";
import type { RecipeUseCases } from "../../use-cases/recipe-use-cases";
import { RecipeSearchPage } from "./RecipeSearchPage";

function makeRecipeUseCases(
  recipeCards: RecipeCard[] = [],
  filterItems: FilterItem[] = [],
): RecipeUseCases {
  return {
    getCategoryFilterItems: vi.fn().mockReturnValue(filterItems),
    getRecipeCards: vi.fn().mockReturnValue(recipeCards),
  } as unknown as RecipeUseCases;
}

describe("RecipeSearchPage", () => {
  it("renders the Recipes heading", () => {
    render(
      <MemoryRouter>
        <RecipeSearchPage recipeUseCases={makeRecipeUseCases()} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Recipes")).toBeDefined();
  });

  it("renders recipe cards returned by use cases", () => {
    const recipeCards: RecipeCard[] = [
      {
        recipeId: 1,
        recipeLink: "/recipes/1",
        recipeName: "Chocolate Cake",
        relevantIngredients: [],
      },
    ];
    render(
      <MemoryRouter>
        <RecipeSearchPage recipeUseCases={makeRecipeUseCases(recipeCards)} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Chocolate Cake")).toBeDefined();
  });

  it("calls getRecipeCards with an empty initial search string", () => {
    const recipeUseCases = makeRecipeUseCases();
    render(
      <MemoryRouter>
        <RecipeSearchPage recipeUseCases={recipeUseCases} />
      </MemoryRouter>,
    );
    expect(recipeUseCases.getRecipeCards).toHaveBeenCalledWith(
      "",
      expect.anything(),
    );
  });

  it("calls getRecipeCards with the updated search string when search input changes", () => {
    const recipeUseCases = makeRecipeUseCases();
    render(
      <MemoryRouter>
        <RecipeSearchPage recipeUseCases={recipeUseCases} />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByLabelText("Recipes Search Bar"), {
      target: { value: "chicken" },
    });
    expect(recipeUseCases.getRecipeCards).toHaveBeenCalledWith(
      "chicken",
      expect.anything(),
    );
  });

  it("calls getRecipeCards with updated filters when a category filter changes", () => {
    const filterItems: FilterItem[] = [
      { id: "Dessert", name: "Dessert", checked: false },
    ];
    const recipeUseCases = makeRecipeUseCases([], filterItems);
    render(
      <MemoryRouter>
        <RecipeSearchPage recipeUseCases={recipeUseCases} />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByLabelText("Show Filter Area"));
    fireEvent.click(screen.getByLabelText("Dessert"));
    expect(recipeUseCases.getRecipeCards).toHaveBeenCalledWith(
      expect.anything(),
      [{ id: "Dessert", name: "Dessert", checked: true }],
    );
  });
});
