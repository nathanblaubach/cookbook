import recipes from "../assets/recipes.json";
import type { Recipe } from "../repositories/recipe";
import type { RecipeReader } from "../repositories/recipe-reader";

export class JsonFileRecipeReader implements RecipeReader {
  readRecipes(): Recipe[] {
    return recipes as Recipe[];
  }
}
