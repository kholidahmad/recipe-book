import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Spaghetti Jowo',
      'Perpaduan sepektakular keju dan Mayonaise',
      'assets/img/pizza.png',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'Burger dengan potongan daging kucing yang presisi',
      'assets/img/burger.png',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),
    new Recipe('Al Kebbabs',
      'Arabian Jos',
      'assets/img/kebab.png',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipeByID(index: number){
    console.log(this.recipes[index]);
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
