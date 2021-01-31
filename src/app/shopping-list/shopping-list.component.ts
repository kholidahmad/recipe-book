import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // menyimpan subscribtion pada property. 'igChangeSubs'
  private igChangeSubs: Subscription;
  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    // igChangeSubs adalah property subscription
    this.igChangeSubs = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onEditItem(index: number){
    //emmit atau mengirim value
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChangeSubs.unsubscribe();
  }
}
