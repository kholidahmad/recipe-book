import { AuthGuard } from "./auth/auth.guard";
import { AuthComponent } from "./auth/auth/auth.component";
import { RecipeResolverService } from "./recipes/recipe-resolver.service";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

export const routes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: RecipeStartComponent },
      { path: "baru", component: RecipeEditComponent }, //'baru' harus diurutan pertama agar tidak terkena id
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService], // resolve disini berfungsi untuk mengambil data dulu sebelum meload router ini
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: [RecipeResolverService],
      },
    ],
  },
  { path: "shopping-list", component: ShoppingListComponent },
  { path: "auth", component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
