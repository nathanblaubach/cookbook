import type { RecipeCard } from "../../components/RecipeCardGrid/RecipeCardGrid.tsx";
import type { Recipe } from "../../repositories/recipe.ts";

export function mapRecipeToRecipeCard(
  recipe: Recipe,
  searchTerm?: string,
): RecipeCard {
  return {
    recipeId: recipe.id,
    recipeLink: `/recipes/${recipe.id}`,
    recipeName: recipe.name,
    relevantIngredients: getIngredientsContainingSearchTerm(
      recipe.ingredients,
      searchTerm,
    ),
  };
}

function getIngredientsContainingSearchTerm(
  ingredients: string[],
  searchTerm?: string,
): string[] {
  if (!searchTerm) {
    return [];
  }
  const lowercaseSearchTerm = searchTerm.toLocaleLowerCase();
  return ingredients.filter((ingredient) => {
    return ingredient.toLocaleLowerCase().includes(lowercaseSearchTerm);
  });
}
