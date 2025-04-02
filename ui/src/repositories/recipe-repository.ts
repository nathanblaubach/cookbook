import {RecipeReader} from './recipe-reader.ts';
import {Recipe} from './recipe.ts';

export class RecipeRepository implements RecipeRepository {
    constructor(private readonly recipeReader: RecipeReader) {
    }

    public getRecipesBySearchTermAndCategories(searchTerm: string, categories: string[], includeIngredientMatches: boolean): Recipe[] {
        return this.recipeReader.readRecipes().filter(recipe => {
            const recipeNameMatched = this.includesCaseInsensitive(recipe.name, searchTerm);

            const recipeIngredientMatched = includeIngredientMatches && recipe.ingredients
                .some((ingredient: string) => this.includesCaseInsensitive(ingredient, searchTerm));

            const categoryMatched = categories.length === 0 || categories.includes(recipe.category);

            return (recipeNameMatched || recipeIngredientMatched) && categoryMatched;
        });
    }

    public getRecipeById(id: number): Recipe | undefined {
        return this.recipeReader.readRecipes().find(recipe => recipe.id === id);
    }

    public getCategories(): string[] {
        const categories: string[] = [];
        this.recipeReader.readRecipes().forEach(recipe => {
            if (!categories.includes(recipe.category)) {
                categories.push(recipe.category);
            }
        });
        return categories;
    }

    private includesCaseInsensitive(checkString: string, searchString: string): boolean {
        return checkString.toLocaleLowerCase().includes(searchString.toLocaleLowerCase());
    }
}
