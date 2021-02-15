import { SharedModule } from "./../shared/shared.module";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ShoppingListRoutingModule,
    FormsModule,
    SharedModule,
  ],
})
export class ShoppingListModule {}
