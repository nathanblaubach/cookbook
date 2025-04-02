import {RecipeReader} from "../repositories/recipe-reader";
import {Recipe} from "../repositories/recipe";

export class FakeRecipeReader implements RecipeReader {
    readRecipes(): Recipe[] {
        return [
            {
                id: 1,
                name: 'Chocolate Cake',
                category: 'Dessert',
                ingredients: ['flour', 'sugar', 'chocolate', 'eggs'],
                instructions: ['Preheat oven to 350 degrees', 'Mix ingredients', 'Bake for 30 minutes']
            },
            {
                id: 2,
                name: 'Chocolate Chip Cookies',
                category: 'Dessert',
                ingredients: ['flour', 'sugar', 'chocolate chips', 'eggs'],
                instructions: ['Preheat oven to 375 degrees', 'Mix ingredients', 'Bake for 10 minutes']
            },
            {
                id: 3,
                name: 'Hot Chocolate',
                category: 'Beverage',
                ingredients: ['cocoa'],
                instructions: ['Heat milk', 'Add cocoa', 'Stir']
            },
            {
                id: 4,
                name: 'Hot Cocoa',
                category: 'Beverage',
                ingredients: ['chocolate'],
                instructions: ['Heat milk', 'Add chocolate', 'Stir']
            },
            {
                id: 5,
                name: 'Chicken Alfredo',
                category: 'Main Course',
                ingredients: ['chicken', 'pasta', 'alfredo sauce'],
                instructions: ['Cook chicken', 'Cook pasta', 'Add sauce']
            }
        ];
    }
}
