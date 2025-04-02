import {describe, expect, it} from "vitest";
import {RecipeRepository} from "./recipe-repository.ts";
import {FakeRecipeReader} from "../infrastructure/fake-recipe-reader.ts";

describe('RecipeRepository Tests', () => {

    const fakeRecipeReader = new FakeRecipeReader();
    const recipeRepository = new RecipeRepository(fakeRecipeReader);

    describe('getRecipesBySearchTermAndCategories', () => {

        it.each([true, false])('should get all recipes when searchTerm and categories are empty', (includeCategoryMatches) => {
            // Act
            const recipes = recipeRepository.getRecipesBySearchTermAndCategories('', [], includeCategoryMatches);

            // Assert
            expect(recipes.length).toBe(fakeRecipeReader.readRecipes().length);
        });

        it.each([true, false])('should only return recipes with given categories', (includeCategoryMatches) => {
            // Arrange
            const categories = ['Dessert', 'Main Course'];

            // Act
            const recipes = recipeRepository.getRecipesBySearchTermAndCategories('', categories, includeCategoryMatches);

            // Assert
            recipes.forEach(recipe => expect(categories).toContain(recipe.category));
        });

        it('should only return recipes that match their name or ingredients with the given search term', () => {
            // Arrange
            const searchTerm = 'chocolate';

            // Act
            const recipes = recipeRepository.getRecipesBySearchTermAndCategories(searchTerm, [], true);

            // Assert
            expect(recipes.map(recipe => recipe.id)).toEqual([1, 2, 3, 4])
        });

        it('should only return recipes that match their name with the given search term', () => {
            // Arrange
            const searchTerm = 'chocolate';

            // Act
            const recipes = recipeRepository.getRecipesBySearchTermAndCategories(searchTerm, [], false);

            // Assert
            expect(recipes.map(recipe => recipe.id)).toEqual([1, 2, 3])
        });
    });

    describe('getRecipeById', () => {

        it('should find recipe when it exists', () => {
            // Arrange
            const recipeId = 3;

            // Act
            const recipe = recipeRepository.getRecipeById(recipeId);

            // Assert
            expect(recipe).not.toBeUndefined();
            expect(recipe!.id).toBe(recipeId);
            expect(recipe!.name).toBe('Hot Chocolate');
            expect(recipe!.category).toBe('Beverage');
            expect(recipe!.ingredients).toEqual(['cocoa']);
            expect(recipe!.instructions).toEqual(['Heat milk', 'Add cocoa', 'Stir']);
        });

        it('should not find recipe when it does not exist', () => {
            // Arrange
            const recipeId = -1;

            // Act
            const recipe = recipeRepository.getRecipeById(recipeId);

            // Assert
            expect(recipe).toBeUndefined();
        });

    });

    describe('getCategories', () => {

        it('should get all categories with no duplicates', () => {
            // Act
            const recipes = recipeRepository.getCategories();

            // Assert
            expect(recipes).toEqual(['Dessert', 'Beverage', 'Main Course']);
        });

    });

});
