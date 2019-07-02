import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
import * as RecipesActions from "../store/recipes.actions";
import * as fromApp from "../../store/app.reducers";
import * as fromRecipeFeature from "../store/recipes.reducers";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id: number;
  constructor(private recipeService: RecipeService, 
    private route: ActivatedRoute, 
    private router:Router,
    private store:Store<fromApp.AppState>,
    private recipeStore: Store<fromRecipeFeature.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.id = +params['id'];
      // this.recipe = this.recipeService.getRecipe(this.id);
      this.recipeStore.select("recipes").subscribe((data)=>{
        console.log(data.recipes[this.id]);
        this.recipe = data.recipes[this.id];
        // console.log("Inside recipeStore: "+this.recipe)
      });
    });
  }

  onAddToShoppingList(){
    // this.recipeService.sendIngredients(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDelete(){
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

  
}
