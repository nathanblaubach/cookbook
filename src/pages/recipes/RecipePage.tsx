import type React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Page } from "../../components/Page/Page";
import type { Recipe } from "../../repositories/recipe.ts";
import type { RecipeRepository } from "../../repositories/recipe-repository.ts";
import "./RecipePage.css";

type RecipePageProps = {
  recipeRepository: RecipeRepository;
};

export function RecipePage({
  recipeRepository,
}: Readonly<RecipePageProps>): React.JSX.Element {
  useEffect(
    () => {
      window.scrollTo(0, 0);
    },
    /* Stryker disable next-line ArrayDeclaration: any constant array here runs the effect once on mount, same as [] */ [],
  );

  const { id } = useParams();
  const recipe: Recipe | undefined = recipeRepository.getRecipeById(Number(id));

  return recipe === undefined ? (
    <Page>
      <h1>Recipe Not Found</h1>
    </Page>
  ) : (
    <Page>
      <div className="notecard">
        <div className="notecard-row notecard-row-title">
          <h1
            aria-label="Recipe Name"
            className="notecard-text notecard-text-title"
          >
            {recipe.name}
          </h1>
        </div>

        <div className="notecard-row notecard-row-border">
          <p
            className="notecard-text notecard-text-font"
            style={{ fontWeight: "bold" }}
          >
            Ingredients:
          </p>
        </div>

        {recipe.ingredients.map((ingredient) => (
          <div key={ingredient} className="notecard-row notecard-row-border">
            <p className="notecard-text notecard-text-font">{ingredient}</p>
          </div>
        ))}

        <div className="notecard-row notecard-row-border">
          <p
            className="notecard-text notecard-text-font"
            style={{ fontWeight: "bold" }}
          >
            Instructions:
          </p>
        </div>

        {recipe.instructions.map((instruction) => (
          <div key={instruction} className="notecard-row notecard-row-border">
            <p className="notecard-text notecard-text-font">{instruction}</p>
          </div>
        ))}
      </div>
    </Page>
  );
}
