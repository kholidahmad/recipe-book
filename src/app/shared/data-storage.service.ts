import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operator/map";
import { Recipe } from "./../recipes/recipe.model";
import { RecipeService } from "./../recipes/recipe.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeSrvc: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeSrvc.getRecipes();
    this.http
      .put(
        "https://bukurezep-default-rtdb.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(
        "https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json"
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        })
      )
      .subscribe((recipes) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
