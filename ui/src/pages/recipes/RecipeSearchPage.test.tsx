import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RecipeSearchPage } from "./RecipeSearchPage";
import { RecipeUseCases } from "../../use-cases/recipe-use-cases";
import { FilterItem } from "../../components/Filter/Filter";
import { RecipeCard } from "../../components/RecipeCardGrid/RecipeCardGrid";

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
