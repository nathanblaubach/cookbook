import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCardGrid.css";

export type RecipeCard = {
  recipeId: number;
  recipeLink: string;
  recipeName: string;
  relevantIngredients: string[];
};

export type RecipeCardGridProps = {
  recipeCards: RecipeCard[];
};

export function RecipeCardGrid({
  recipeCards,
}: Readonly<RecipeCardGridProps>): React.JSX.Element {
  return (
    <div className="cards">
      {recipeCards.map((card) => (
        <Link className="card-link" key={card.recipeId} to={card.recipeLink}>
          <div className="card">
            <h2>{card.recipeName}</h2>
            {card.relevantIngredients.map((line, index) => (
              <p key={`${card.recipeId}-${index}`}>{line}</p>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
