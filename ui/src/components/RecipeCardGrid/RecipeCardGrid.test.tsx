import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RecipeCardGrid, RecipeCard } from "./RecipeCardGrid";

const recipeCards: RecipeCard[] = [
  {
    recipeId: 1,
    recipeLink: "/recipes/1",
    recipeName: "Chocolate Cake",
    relevantIngredients: ["chocolate", "flour"],
  },
  {
    recipeId: 2,
    recipeLink: "/recipes/2",
    recipeName: "Hot Cocoa",
    relevantIngredients: [],
  },
];

describe("RecipeCardGrid", () => {
  it("renders a link for each recipe card", () => {
    render(
      <MemoryRouter>
        <RecipeCardGrid recipeCards={recipeCards} />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole("link").length).toBe(recipeCards.length);
  });

  it("renders each recipe name", () => {
    render(
      <MemoryRouter>
        <RecipeCardGrid recipeCards={recipeCards} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Chocolate Cake")).toBeDefined();
    expect(screen.getByText("Hot Cocoa")).toBeDefined();
  });

  it("renders relevant ingredients for recipe cards that have them", () => {
    render(
      <MemoryRouter>
        <RecipeCardGrid recipeCards={recipeCards} />
      </MemoryRouter>,
    );
    expect(screen.getByText("chocolate")).toBeDefined();
    expect(screen.getByText("flour")).toBeDefined();
  });
});
