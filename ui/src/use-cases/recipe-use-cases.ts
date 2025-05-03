import { RecipeCard } from "../components/RecipeCardGrid/RecipeCardGrid.tsx";
import { FilterItem } from "../components/Filter/Filter.tsx";
import { mapRecipeToRecipeCard } from "./mappers/mapRecipeToRecipeCard.ts";
import { mapCategoryToFilterItem } from "./mappers/mapCategoryToFilterItem.ts";
import { getCheckedFilterItemIds } from "./mappers/getCheckedFilterItemIds.ts";
import { RecipeRepository } from "../repositories/recipe-repository.ts";

export class RecipeUseCases {
  constructor(private readonly repository: RecipeRepository) {}

  public getRecipeCards(
    searchTerm: string,
    categoryFilters: FilterItem[],
  ): RecipeCard[] {
    const checkedCategories: string[] =
      getCheckedFilterItemIds(categoryFilters);
    const ingredientSearchIsActive: boolean = searchTerm.length >= 3;
    return this.repository
      .getRecipesBySearchTermAndCategories(
        searchTerm,
        checkedCategories,
        ingredientSearchIsActive,
      )
      .map((recipe) =>
        mapRecipeToRecipeCard(
          recipe,
          ingredientSearchIsActive ? searchTerm : undefined,
        ),
      );
  }

  public getCategoryFilterItems(): FilterItem[] {
    return this.repository.getCategories().map(mapCategoryToFilterItem);
  }
}
