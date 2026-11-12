import type React from "react";
import { useState } from "react";
import { Filter, type FilterItem } from "../../components/Filter/Filter";
import { Page } from "../../components/Page/Page";
import { RecipeCardGrid } from "../../components/RecipeCardGrid/RecipeCardGrid.tsx";
import { SearchArea } from "../../components/SearchArea/SearchArea";
import type { RecipeUseCases } from "../../use-cases/recipe-use-cases";

type RecipeSearchPageProps = {
  recipeUseCases: RecipeUseCases;
};

export function RecipeSearchPage({
  recipeUseCases,
}: Readonly<RecipeSearchPageProps>): React.JSX.Element {
  const [searchString, setSearchString] = useState<string>("");
  const [categoryFilters, setCategoryFilters] = useState<FilterItem[]>(
    recipeUseCases.getCategoryFilterItems(),
  );

  const recipeCards = recipeUseCases.getRecipeCards(
    searchString,
    categoryFilters,
  );

  return (
    <Page>
      <h1>Recipes</h1>
      <SearchArea
        type="Recipes"
        searchString={searchString}
        onSearchStringChange={setSearchString}
      >
        <Filter
          type="Categories"
          items={categoryFilters}
          onItemsUpdate={setCategoryFilters}
        />
      </SearchArea>
      <RecipeCardGrid recipeCards={recipeCards} />
    </Page>
  );
}
