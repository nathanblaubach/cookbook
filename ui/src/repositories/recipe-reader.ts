import { Recipe } from "./recipe.ts";

export interface RecipeReader {
  readRecipes(): Recipe[];
}
