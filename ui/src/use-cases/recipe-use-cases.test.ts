import { describe, expect, it } from "vitest";
import { RecipeUseCases } from "./recipe-use-cases.ts";
import { FilterItem } from "../components/Filter/Filter.tsx";
import { FakeRecipeReader } from "../infrastructure/fake-recipe-reader.ts";
import { RecipeRepository } from "../repositories/recipe-repository.ts";

describe("RecipeUseCases", () => {
  const fakeRecipeReader = new FakeRecipeReader();
  const recipeRepository = new RecipeRepository(fakeRecipeReader);
  const recipeUseCases: RecipeUseCases = new RecipeUseCases(recipeRepository);

  const uncheckedCategoryFilters: FilterItem[] = [
    {
      id: "Dessert",
      name: "Dessert",
      checked: false,
    },
    {
      id: "Beverage",
      name: "Beverage",
      checked: false,
    },
    {
      id: "Main Course",
      name: "Main Course",
      checked: false,
    },
  ];

  describe("getRecipeCards", () => {
    it("should contain all recipes when search term and category ids do not limit them", () => {
      // Arrange
      const searchTerm = "";

      // Act
      const recipeCards = recipeUseCases.getRecipeCards(
        searchTerm,
        uncheckedCategoryFilters,
      );

      // Assert
      expect(recipeCards.length).toBe(fakeRecipeReader.readRecipes().length);
    });

    it("should limit recipes by checked categories", () => {
      // Arrange
      const searchTerm = "";
      const categoryFilters: FilterItem[] = [
        {
          id: "Dessert",
          name: "Dessert",
          checked: true,
        },
        {
          id: "Beverage",
          name: "Beverage",
          checked: false,
        },
        {
          id: "Main Course",
          name: "Main Course",
          checked: true,
        },
      ];

      // Act
      const recipeCards = recipeUseCases.getRecipeCards(
        searchTerm,
        categoryFilters,
      );

      // Assert
      expect(recipeCards.map((recipeCard) => recipeCard.recipeId)).toEqual([
        1, 2, 5,
      ]);
    });

    const chocolateIngredientRecipeId = 1;
    const chocolateIngredientNonChocolateNameRecipeId = 4;

    it("should not activate ingredient search when search term is less than 3 characters long", () => {
      // Arrange
      const searchTerm = "ch";

      // Act
      const recipeCards = recipeUseCases.getRecipeCards(
        searchTerm,
        uncheckedCategoryFilters,
      );

      // Assert: Ingredients that match the search term are not displayed
      const chocolateIngredientRecipeCard = recipeCards.find(
        (recipeCard) => recipeCard.recipeId === chocolateIngredientRecipeId,
      );
      expect(chocolateIngredientRecipeCard).not.toBeUndefined();
      expect(chocolateIngredientRecipeCard!.relevantIngredients.length).toBe(0);

      // Assert: Recipes that have ingredient matches without name matches are not displayed
      const chocolateIngredientNonChocolateNameRecipeCard = recipeCards.find(
        (recipeCard) =>
          recipeCard.recipeId === chocolateIngredientNonChocolateNameRecipeId,
      );
      expect(chocolateIngredientNonChocolateNameRecipeCard).toBeUndefined();
    });

    it("should activate ingredient search when search term is 3 or more characters long", () => {
      // Arrange
      const searchTerm = "cho";

      // Act
      const recipeCards = recipeUseCases.getRecipeCards(
        searchTerm,
        uncheckedCategoryFilters,
      );

      // Assert: Ingredients that match the search term are displayed
      const chocolateIngredientRecipeCard = recipeCards.find(
        (recipeCard) => recipeCard.recipeId === chocolateIngredientRecipeId,
      );
      expect(chocolateIngredientRecipeCard).not.toBeUndefined();
      expect(
        chocolateIngredientRecipeCard!.relevantIngredients.length,
      ).greaterThan(0);

      // Assert: Recipes that have ingredient matches without name matches are displayed
      const chocolateIngredientNonChocolateNameRecipeCard = recipeCards.find(
        (recipeCard) =>
          recipeCard.recipeId === chocolateIngredientNonChocolateNameRecipeId,
      );
      expect(chocolateIngredientNonChocolateNameRecipeCard).not.toBeUndefined();
    });
  });

  describe("getCategoryFilterItems", () => {
    it("should return filter items for all categories", () => {
      // Act
      const filterItems = recipeUseCases.getCategoryFilterItems();

      // Assert
      expect(filterItems.length).toBe(recipeRepository.getCategories().length);
    });

    it("should return filter items as unchecked", () => {
      // Act
      const filterItems = recipeUseCases.getCategoryFilterItems();

      // Assert
      filterItems.forEach((item) => expect(item.checked).toBe(false));
    });
  });
});
