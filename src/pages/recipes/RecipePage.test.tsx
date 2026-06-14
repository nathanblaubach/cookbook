import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { RecipePage } from "./RecipePage";
import { RecipeRepository } from "../../repositories/recipe-repository";
import { Recipe } from "../../repositories/recipe";

beforeEach(() => {
  vi.stubGlobal("scrollTo", vi.fn());
});

function makeRecipeRepository(recipe?: Recipe): RecipeRepository {
  return {
    getRecipeById: vi.fn().mockReturnValue(recipe),
  } as unknown as RecipeRepository;
}

function renderRecipePage(id: number, recipe?: Recipe) {
  render(
    <MemoryRouter initialEntries={[`/recipes/${id}`]}>
      <Routes>
        <Route
          path="/recipes/:id"
          element={
            <RecipePage recipeRepository={makeRecipeRepository(recipe)} />
          }
        />
      </Routes>
    </MemoryRouter>,
  );
}

const chickenAlfredo: Recipe = {
  id: 1,
  name: "Chicken Alfredo",
  category: "Main Course",
  ingredients: ["chicken", "pasta", "alfredo sauce"],
  instructions: ["Cook chicken", "Cook pasta", "Add sauce"],
};

describe("RecipePage", () => {
  it("scrolls to the top of the page on mount", () => {
    renderRecipePage(1, chickenAlfredo);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("renders 'Recipe Not Found' when the recipe does not exist", () => {
    renderRecipePage(999, undefined);
    expect(screen.getByText("Recipe Not Found")).toBeDefined();
  });

  it("renders the recipe name when the recipe exists", () => {
    renderRecipePage(1, chickenAlfredo);
    expect(screen.getByText("Chicken Alfredo")).toBeDefined();
  });

  it("renders a 'Recipe Name' label on the title", () => {
    renderRecipePage(1, chickenAlfredo);
    expect(screen.getByLabelText("Recipe Name")).toBeDefined();
  });

  it("renders a bold 'Ingredients:' label above the ingredients", () => {
    renderRecipePage(1, chickenAlfredo);
    expect(
      (screen.getByText("Ingredients:") as HTMLElement).style.fontWeight,
    ).toBe("bold");
  });

  it("renders each ingredient", () => {
    renderRecipePage(1, chickenAlfredo);
    expect(screen.getByText("chicken")).toBeDefined();
    expect(screen.getByText("pasta")).toBeDefined();
    expect(screen.getByText("alfredo sauce")).toBeDefined();
  });

  it("renders a bold 'Instructions:' label above the instructions", () => {
    renderRecipePage(1, chickenAlfredo);
    expect(
      (screen.getByText("Instructions:") as HTMLElement).style.fontWeight,
    ).toBe("bold");
  });

  it("renders each instruction", () => {
    renderRecipePage(1, chickenAlfredo);
    expect(screen.getByText("Cook chicken")).toBeDefined();
    expect(screen.getByText("Cook pasta")).toBeDefined();
    expect(screen.getByText("Add sauce")).toBeDefined();
  });
});
