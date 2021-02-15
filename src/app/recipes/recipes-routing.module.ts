import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipe-resolver.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";
const routes: Routes = [
  {
    path: "",
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
