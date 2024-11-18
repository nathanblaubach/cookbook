import {describe, expect, it} from "vitest";
import {mapRecipeToCardContent} from "./mapRecipeToCardContent.ts";
import {Recipe} from "../../recipe.ts";

describe('mapRecipeToCardContent', () => {

    // Arrange
    const recipes: Recipe[] = [
        {
            "id": 0,
            "name": "Hot Mulled Cider",
            "category": "Beverage",
            "ingredients": [
                "1/2 cup brown sugar",
                "1 tsp whole allspice",
                "1 tsp whole cloves",
                "1/4 tsp salt",
                "dash of ground nutmeg",
                "3 inch stick of cinnamon",
                "2 quarts apple cider"
            ],
            "instructions": [
                "Slowly bring to a boil",
                "Cover & simmer for 20 minutes",
                "Remove spices"
            ]
        },
        {
            "id": 1,
            "name": "Cranberry Tea",
            "category": "Beverage",
            "ingredients": [
                "3 quarts water",
                "1 1/2 quart cranberry juice",
                "3 cups sugar",
                "1 cup red hots",
                "12 whole cloves",
                "Juice of 4 oranges",
                "Juice of 4 lemons"
            ],
            "instructions": [
                "Mix 1 quart of water with the sugar, red hots, and cloves",
                "Bring to a boil and cook until sugar and red hots have dissolved",
                "Strain and combine with cranberry juice",
                "When ready to serve, add the rest of water, and the juice from the oranges and lemons",
                "Serve Hot or Cold"
            ]
        }
    ];

    it.each(recipes)('should have the same id as the recipe', (recipe) => {
        // Act
        const cardContent = mapRecipeToCardContent(recipe);

        // Assert
        expect(cardContent.id).toBe(recipe.id);
    });

    it.each(recipes)('should have a link to the recipe', (recipe) => {
        // Act
        const cardContent = mapRecipeToCardContent(recipe);

        // Assert
        expect(cardContent.link).contains('recipes');
        expect(cardContent.link).contains(recipe.id);
    });

    it.each(recipes)('should have a title of the recipe name', (recipe) => {
        // Act
        const cardContent = mapRecipeToCardContent(recipe);

        // Assert
        expect(cardContent.title).toBe(recipe.name);
    });

    it.each(recipes)('should have no contentLines when no search term is provided', (recipe) => {
        // Act
        const cardContent = mapRecipeToCardContent(recipe);

        // Assert
        expect(cardContent.contentLines.length).toBe(0);
    });

    it.each(recipes)('should have contentLines of ingredients filtered by the search term when it exists', (recipe) => {
        // Arrange
        const searchTerm = 'sugAr';

        // Act
        const cardContent = mapRecipeToCardContent(recipe, searchTerm);

        // Assert
        expect(cardContent.contentLines.length).greaterThanOrEqual(1);
        cardContent.contentLines.forEach(contentLine => {
            expect(contentLine.toLocaleLowerCase()).toContain(searchTerm.toLocaleLowerCase());
        });
    })
});
