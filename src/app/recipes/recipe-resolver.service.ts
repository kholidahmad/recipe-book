import { RecipeService } from "./recipe.service";
import { DataStorageService } from "./../shared/data-storage.service";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root",
})

// Resolver adalah code yg berjalan sebelum Route diload, bisa untuk memastikan kalo data yang dimuat ada atau tidak
// RecipeResolverService ditulis dulu di routing-module
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorage: DataStorageService,
    private recipeServc: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const rcps = this.recipeServc.getRecipes();
    if (rcps.length === 0) {
      return this.dataStorage.fetchRecipes();
    } else {
      return rcps;
    }
  }
}
