import {describe, expect, it} from "vitest";
import {JsonFileRecipeReader} from "./json-file-recipe-reader.ts";
import {Recipe} from "../repositories/recipe.ts";

describe("JsonFileRecipeReader Tests", () => {

    it("should get json recipes out of the file", async (): Promise<void> => {
        // Arrange
        const fileJsonRecipeReader = new JsonFileRecipeReader();

        // Act
        const recipes: Recipe[] = fileJsonRecipeReader.readRecipes();

        // Assert
        expect(recipes.length).greaterThan(0);
        recipes.forEach((recipe: Recipe): void => {
            expect(recipe.id).not.toBeUndefined();
            expect(recipe.name).not.toBeUndefined();
            expect(recipe.category).not.toBeUndefined();
            expect(recipe.ingredients).not.toBeUndefined();
            expect(recipe.instructions).not.toBeUndefined();
        })
    });

});