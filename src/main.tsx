import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { JsonFileRecipeReader } from "./infrastructure/json-file-recipe-reader.ts";
import { AboutPage } from "./pages/AboutPage.tsx";
import { RecipePage } from "./pages/recipes/RecipePage.tsx";
import { RecipeSearchPage } from "./pages/recipes/RecipeSearchPage.tsx";
import { RecipeRepository } from "./repositories/recipe-repository.ts";
import { RecipeUseCases } from "./use-cases/recipe-use-cases.ts";

const recipeRepository: RecipeRepository = new RecipeRepository(
  new JsonFileRecipeReader(),
);
const recipeUseCases: RecipeUseCases = new RecipeUseCases(recipeRepository);

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <RouterProvider
        router={createBrowserRouter([
          { path: "/", element: <Navigate to="/recipes" replace /> },
          {
            path: "recipes",
            element: <RecipeSearchPage recipeUseCases={recipeUseCases} />,
          },
          {
            path: "recipes/:id",
            element: <RecipePage recipeRepository={recipeRepository} />,
          },
          { path: "about", element: <AboutPage /> },
        ])}
      />
    </React.StrictMode>,
  );
}
