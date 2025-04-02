import recipes from '../assets/recipes.json';
import {RecipeReader} from '../repositories/recipe-reader';
import {Recipe} from '../repositories/recipe';

type JsonFileRecipe = {
    id: number;
    name: string;
    category: string;
    ingredients: string[];
    instructions: string[];
};

export class JsonFileRecipeReader implements RecipeReader {
    readRecipes(): Recipe[] {
        const jsonFileRecipes: JsonFileRecipe[] = recipes;
        return jsonFileRecipes.map(jsonFileRecipe => {
            return {
                id: jsonFileRecipe.id,
                name: jsonFileRecipe.name,
                category: jsonFileRecipe.category,
                ingredients: jsonFileRecipe.ingredients,
                instructions: jsonFileRecipe.instructions,
            };
        });
    }
}
