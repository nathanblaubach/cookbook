import React from 'react';
import {useParams} from 'react-router-dom'
import {Page} from '../../components/Page/Page';
import {Notecard, NotecardRow} from '../../components/Notecard/Notecard';
import {Recipe} from '../../features/recipes/recipe';
import {JsonRecipeRepository} from '../../features/recipes/adapters/repository/json-recipe-repository.ts';

type RecipePageProps = {
    recipeRepository: JsonRecipeRepository;
};

export function RecipePage({recipeRepository}: Readonly<RecipePageProps>): React.JSX.Element {

    window.scrollTo(0, 0);

    const recipeId: number = parseInt(useParams().id!, 10);
    const recipe: Recipe | undefined = recipeRepository.getRecipeById(recipeId);

    return recipe === undefined ? (
        <Page>
            <h1>Recipe Not Found</h1>
        </Page>
    ) : (
        <Page>
            <Notecard label={'Recipe Name'} text={recipe.name}>
                <NotecardRow text={'Ingredients:'} isBold={true}/>
                {recipe.ingredients.map(ingredient => <NotecardRow key={ingredient} text={ingredient}/>)}
                <NotecardRow text={'Instructions:'} isBold={true}/>
                {recipe.instructions.map(instruction => <NotecardRow key={instruction} text={instruction}/>)}
            </Notecard>
        </Page>
    );
}
