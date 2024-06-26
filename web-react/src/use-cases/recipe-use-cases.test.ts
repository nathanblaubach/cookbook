import { describe, it, expect } from 'vitest';
import { CookbookRepository } from '../data/cookbook-repository';
import { RecipeUseCases } from './recipe-use-cases';
import { Category, Recipe } from '../types';
import { FilterItem } from '../components/Filter/Filter';

const repositoryCategories: Category[] = [
  { id: 1, name: 'Dessert' },
  { id: 2, name: 'Beverage' },
  { id: 3, name: 'Main Course' }
];

const repositoryRecipes: Recipe[] = [
  {
    id: 1,
    name: 'Chocolate Cake',
    category: { id: 1, name: 'Dessert' },
    ingredients: ['flour', 'sugar', 'chocolate', 'eggs'],
    instructions: []
  },
  {
    id: 2,
    name: 'Chocolate Chip Cookies',
    category: { id: 1, name: 'Dessert' },
    ingredients: ['flour', 'sugar', 'chocolate chips', 'eggs'],
    instructions: []
  },
  {
    id: 3,
    name: 'Hot Chocolate',
    category: { id: 2, name: 'Beverage' },
    ingredients: ['cocoa'],
    instructions: []
  },
  {
    id: 4,
    name: 'Hot Cocoa',
    category: { id: 2, name: 'Beverage' },
    ingredients: ['chocolate'],
    instructions: []
  },
  {
    id: 5,
    name: 'Chicken Alfredo',
    category: { id: 3, name: 'Main Course' },
    ingredients: ['chicken', 'pasta', 'alfredo sauce'],
    instructions: []
  }
];

const testRepository = new CookbookRepository(repositoryCategories, repositoryRecipes);
const recipeUseCases: RecipeUseCases = new RecipeUseCases(testRepository);

describe('Recipe Card Grid Search and Filter', () => {

  it('should contain all recipes when search term and category ids do not limit them', () => {
    // Arrange
    const searchTerm = '';
    const categoryFilters: FilterItem[] = [
      {
        id: 1,
        name: 'Dessert',
        checked: false
      },
      {
        id: 2,
        name: 'Beverage',
        checked: false
      },
      {
        id: 3,
        name: 'Main Course',
        checked: false
      }
    ];

    // Act
    const recipeCards = recipeUseCases.getRecipeCards(searchTerm, categoryFilters);

    // Assert
    expect(recipeCards.length).toBe(repositoryRecipes.length);
  });

  it('should not display ingredients with search term when search term is less than 3 characters long', () => {
    // Arrange
    const searchTerm = 'ch';
    const categoryFilters: FilterItem[] = [
      {
        id: 1,
        name: 'Dessert',
        checked: false
      },
      {
        id: 2,
        name: 'Beverage',
        checked: false
      },
      {
        id: 3,
        name: 'Main Course',
        checked: false
      }
    ];

    // Act
    const recipeCards = recipeUseCases.getRecipeCards(searchTerm, categoryFilters);

    // Assert
    const idOfRecipeWithChocolateIngredient = 1;
    const recipeCard = recipeCards.find((recipeCard) => recipeCard.id === idOfRecipeWithChocolateIngredient)!;
    expect(recipeCard.contentLines.length).toBe(0);
  });

  it('should display ingredients with search term when search term is 3 or more characters long', () => {
    // Arrange
    const searchTerm = 'cho';
    const categoryFilters: FilterItem[] = [
      {
        id: 1,
        name: 'Dessert',
        checked: false
      },
      {
        id: 2,
        name: 'Beverage',
        checked: false
      },
      {
        id: 3,
        name: 'Main Course',
        checked: false
      }
    ];

    // Act
    const recipeCards = recipeUseCases.getRecipeCards(searchTerm, categoryFilters);

    // Assert
    const idOfRecipeWithChocolateIngredient = 1;
    const recipeCard = recipeCards.find((recipeCard) => recipeCard.id === idOfRecipeWithChocolateIngredient)!;
    expect(recipeCard.contentLines.length).toBe(1);
  });

  it('should display recipes when the search term matches only the recipe name', () => {
    // Arrange
    const searchTerm = 'chocolate';
    const categoryFilters: FilterItem[] = [
      {
        id: 1,
        name: 'Dessert',
        checked: false
      },
      {
        id: 2,
        name: 'Beverage',
        checked: false
      },
      {
        id: 3,
        name: 'Main Course',
        checked: false
      }
    ];

    // Act
    const recipeCards = recipeUseCases.getRecipeCards(searchTerm, categoryFilters);

    // Assert
    expect(recipeCards.map(recipeCard => recipeCard.id)).toContain(3);
  });

  it('should display recipes when the search term matches only the recipe ingredients', () => {
    // Arrange
    const searchTerm = 'chocolate';
    const categoryFilters: FilterItem[] = [
      {
        id: 1,
        name: 'Dessert',
        checked: false
      },
      {
        id: 2,
        name: 'Beverage',
        checked: false
      },
      {
        id: 3,
        name: 'Main Course',
        checked: false
      }
    ];

    // Act
    const recipeCards = recipeUseCases.getRecipeCards(searchTerm, categoryFilters);

    // Assert
    expect(recipeCards.map(recipeCard => recipeCard.id)).toContain(4);
  });

  it('should not display recipes that do not have a name or ingredient that contains the search term', () => {
    // Arrange
    const searchTerm = 'chocolate';
    const categoryFilters: FilterItem[] = [
      {
        id: 1,
        name: 'Dessert',
        checked: false
      },
      {
        id: 2,
        name: 'Beverage',
        checked: false
      },
      {
        id: 3,
        name: 'Main Course',
        checked: false
      }
    ];

    // Act
    const recipeCards = recipeUseCases.getRecipeCards(searchTerm, categoryFilters);

    // Assert
    expect(recipeCards.map(recipeCard => recipeCard.id)).not.toContain(5);
  });

  it('should display recipes with categories in the selected list', () => {
    // Arrange
    const searchTerm = '';
    const categoryFilters: FilterItem[] = [
      {
        id: 1,
        name: 'Dessert',
        checked: true
      },
      {
        id: 2,
        name: 'Beverage',
        checked: false
      },
      {
        id: 3,
        name: 'Main Course',
        checked: true
      }
    ];

    // Act
    const recipeCards = recipeUseCases.getRecipeCards(searchTerm, categoryFilters);

    // Assert
    expect(recipeCards.map(recipeCard => recipeCard.id)).toContain(1);
    expect(recipeCards.map(recipeCard => recipeCard.id)).toContain(2);
    expect(recipeCards.map(recipeCard => recipeCard.id)).toContain(5);
  });

  it('should not display recipes with categories not in the selected list', () => {
    // Arrange
    const searchTerm = '';
    const categoryFilters: FilterItem[] = [
      {
        id: 1,
        name: 'Dessert',
        checked: true
      },
      {
        id: 2,
        name: 'Beverage',
        checked: false
      },
      {
        id: 3,
        name: 'Main Course',
        checked: true
      }
    ];

    // Act
    const recipeCards = recipeUseCases.getRecipeCards(searchTerm, categoryFilters);

    // Assert
    expect(recipeCards.map(recipeCard => recipeCard.id)).not.toContain(3);
    expect(recipeCards.map(recipeCard => recipeCard.id)).not.toContain(4);
  });

});

describe('Get categories as filter items', () => {

  it('should return filter items for all categories', () => {
    // Act
    const filterItems = recipeUseCases.getCategoryFilterItems();

    // Assert
    expect(filterItems.length).toBe(repositoryCategories.length);
  });

  it('should return filter items as unchecked', () => {
    // Act
    const filterItems = recipeUseCases.getCategoryFilterItems();

    // Assert
    filterItems.forEach(item => expect(item.checked).toBe(false));
  });

});

describe('getRecipe', () => {

  it('should find recipe when it exists', () => {
    // Arrange
    const recipeId = 3;

    // Act
    const recipe = recipeUseCases.getRecipe(recipeId);

    // Assert
    expect(recipe).not.toBeUndefined();
  });

  it('should not find recipe when it does not exist', () => {
    // Arrange
    const recipeId = -1;

    // Act
    const recipe = recipeUseCases.getRecipe(recipeId);

    // Assert
    expect(recipe).toBeUndefined();
  });

});

describe('getAllCategories', () => {

  it('should return all categories', () => {
    // Act
    const categories = recipeUseCases.getAllCategories();

    // Assert
    expect(categories.length).toBe(repositoryCategories.length);
  });

});

describe('getCategory', () => {

  it('should find category when it exists', () => {
    // Arrange
    const categoryId = 3;

    // Act
    const category = recipeUseCases.getCategory(categoryId);

    // Assert
    expect(category).not.toBeUndefined();
  });

  it('should not find category when it does not exist', () => {
    // Arrange
    const categoryId = -1;

    // Act
    const category = recipeUseCases.getCategory(categoryId);

    // Assert
    expect(category).toBeUndefined();
  });

});
