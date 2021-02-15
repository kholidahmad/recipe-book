import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

// loadChildren adalah fitur untuk LAZYLOADING
// - path pada tiap modul harus kosong sehingga hanya ditulis di app-routing.module ini
// - import module terkait di auth.module juga harus dihapus
// - dan tambahkan preloadingStrategy: PreloadAllModules

export const routes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    loadChildren: "./recipes/recipes.module#RecipesModule",
  },
  {
    path: "shopping-list",
    loadChildren: "./shopping-list/shopping-list.module#ShoppingListModule",
  },
  {
    path: "auth",
    loadChildren: "./auth/auth.module#AuthModule",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
