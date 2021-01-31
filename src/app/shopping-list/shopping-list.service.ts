// import { EventEmitter } from '@angular/core';
import {Subject} from 'rxjs'
// perbedaan EventEmitter dengan Subject
// EventEmmiter dengan .emit untuk kirim value
// Subject mengguanakan .next untuk mengirim value

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Papaya', 90),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
  }
  updateIngredient(index: number, newData: Ingredient){
    this.ingredients[index] = newData;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngeredient(index: number){
    // splice untuk menghapus data array
    // slice untuk mencopy array
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
