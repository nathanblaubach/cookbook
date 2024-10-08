import { CardContent } from "../components/CardGrid/CardGrid";
import { FilterItem } from "../components/Filter/Filter";
import { RecipeRepository } from "../data/recipe-repository";

export class RecipeUseCases {

  constructor(private repository: RecipeRepository) {}

  private includesCaseInsensitive(checkString: string, searchString: string): boolean {
    return checkString.toLocaleLowerCase().includes(searchString.toLocaleLowerCase());
  }

  /**
   * Returns recipes that match the given search term and category ids
   * 
   * @remarks
   * This search is case-insensitive.
   * 
   * @param searchTerm - The search term to filter recipes and ingredients by
   * @param categoryFilters - The categories to filter recipes by
   * @returns CardContent array with the recipe details
   */
  public getRecipeCards(searchTerm: string, categoryFilters: FilterItem[]): CardContent[] {
    const ingredientSearchActive: boolean = searchTerm.length >= 3;

    const activeCategories: string[] = categoryFilters.reduce(
      (acc: string[], filter: FilterItem): string[] => {
        if (filter.checked) {
          acc.push(filter.id);
        }
        return acc; 
      },
      []
    );

    return this.repository
      .getRecipesBySearchTermAndCategories(searchTerm, activeCategories)
      .map(recipe => {
        const relevantIngredients = !ingredientSearchActive ? [] : recipe.ingredients
          .filter(ingredient => this.includesCaseInsensitive(ingredient, searchTerm));

        return {
          id: recipe.id,
          link: `/recipes/${recipe.id}`,
          title: recipe.name,
          contentLines: relevantIngredients
        }
      });
  }

  /**
   * Returns filter categories as filter items for the search area
   * @returns FilterItem array with the categories
   */
  public getCategoryFilterItems(): FilterItem[] {
    return this.repository.getCategories().map(category => ({
      id: category,
      name: category,
      checked: false
    }));
  }

  /**
   * Returns all categories
   * @returns List of all categories
   */
  public getAllCategories(): string[] {
    return this.repository.getCategories();
  }

}
