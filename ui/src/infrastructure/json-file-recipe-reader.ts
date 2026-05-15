import recipes from "../assets/recipes.json";
import { RecipeReader } from "../repositories/recipe-reader";
import { Recipe } from "../repositories/recipe";

export class JsonFileRecipeReader implements RecipeReader {
  readRecipes(): Recipe[] {
    return recipes as Recipe[];
  }
}
