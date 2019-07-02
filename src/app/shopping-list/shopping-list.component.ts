import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppinglist.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducers";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingListStore:Observable<{ingredients: Ingredient[]}>;
  subscription:Subscription;
  constructor(private shoppingListService: ShoppingListService,
    private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.shoppingListStore = this.store.select("shoppingList");
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.shoppingListService.receiveIngredient.subscribe((ingredient:Ingredient)=>{
    //   this.ingredients.push(ingredient);
    // });
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[])=>{
    //   this.ingredients = ingredients;
    // });
  }
//
  onEdit(index: number){
    console.log(index);
    // this.shoppingListService.editIngredient.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  // addIngredient(data: Ingredient){
  //   this.ingredients.push(data);
  // }

}
