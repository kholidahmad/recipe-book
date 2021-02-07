import { AuthService } from "./../auth/auth.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { exhaustMap, map, take, tap } from "rxjs/operators";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeSrvc: RecipeService,
    private authSrvc: AuthService
  ) {}

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

  // take(1) berfungsi untuk mengambil 1 value dari observable kemudia otomatis unsubscribe
  //  tidak bisa return didalam subscribe
  // exhaustMap menunggu Observable pertama sampai selesai mendapatkan value
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        "https://bukurezep-default-rtdb.firebaseio.com/recipes.json"
      )
      .pipe(
        map((recipes) => {
          // dan map disini javascript array method
          return recipes.map((recipe) => {
            // ... artinya copy semua data
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeSrvc.setRecipes(recipes);
        })
      );
  }
}
