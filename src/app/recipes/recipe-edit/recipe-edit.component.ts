import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/Forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import * as fromRecipeFeature from "../store/recipes.reducers";
import { Store } from '@ngrx/store';
import * as RecipesActions from "../store/recipes.actions";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number; 
  isEdit = false;
  formGroup: FormGroup;

  constructor(private route:ActivatedRoute, 
    private recipeService: RecipeService, 
    private router:Router,
    private store:Store<fromRecipeFeature.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.id = +params["id"];
      this.isEdit = params['id'] !=null;
      console.log("IsEditable: "+this.isEdit);
      console.log(this.isEdit);
      this.initForm();
    });   
  }
  
  private initForm(){
    let recipeName = '';
    let imgPath = '';
    let description = '';
    let recipeIngredient = new FormArray([]);
    // const recipe = this.recipeService.getRecipe(this.id);
    
    this.store.select("recipes").pipe(
      take(1)
    ).subscribe((data)=>{
      const recipe = data.recipes[this.id];
      console.log("recipe-edit: "+recipe);
      if(this.isEdit){
        console.log("Recipe Name: "+recipe.name);
        recipeName = recipe.name;
        imgPath = recipe.imgPath;
        description = recipe.description;
        if(recipe['ingredients']){
          for(let ingredient of recipe.ingredients){
            recipeIngredient.push(new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern('[0-9]*')])
            }));
          }
        }
      }
    });
    

    this.formGroup = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imgPath: new FormControl(imgPath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: recipeIngredient
    });
  }

  onSubmit(){
    let name = this.formGroup.value['name'];
    let imagePath = this.formGroup.value['imgPath'];
    let description = this.formGroup.value['description'];
    let ingredients = this.formGroup.value['ingredients'];
    let rec = new Recipe(name, description, imagePath, ingredients);
    if(this.isEdit){
      console.log(this.formGroup.get('name').value);
      // this.recipeService.updateRecipe(this.id, rec);
      this.store.dispatch(new RecipesActions.UpdateRecipe({index: this.id, recipe: rec}));
    }else{
      // this.recipeService.saveRecipe(rec);
      this.store.dispatch(new RecipesActions.AddRecipe(rec));
    }
    this.router.navigate(['/recipes']);
  }

  onCancel(){
    this.router.navigate(['/recipes']);
  }

  onAddIngredient(){
    (<FormArray>this.formGroup.get('ingredients')).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')])
    }));
  }
}