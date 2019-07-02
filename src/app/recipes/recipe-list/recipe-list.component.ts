import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromRecipes from "../store/recipes.reducers";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeRecieve = new EventEmitter<Recipe>();
  recipes: Recipe[] = [];
  recipesState: Observable<{recipes: Recipe[]}>;
  constructor(private recipeService:RecipeService,
    private store:Store<fromRecipes.FeatureState>) { }

  ngOnInit() {
    this.recipesState = this.store.select("recipes");
    // this.recipes = this.recipeService.getRecipes();
    
    // this.recipeService.recipesChanged.subscribe((recipes: Recipe[])=>{
    //   this.recipes = recipes;
    // });
  }

  recipeRecieved(recipe){
    console.log("Recipe List : "+recipe.name);
    this.recipeRecieve.emit(recipe);
  }
}
