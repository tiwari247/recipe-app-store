import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as RecipesActions from "./recipes.actions";

export interface FeatureState{
    recipes: State
}

export interface State{
    recipes: Recipe[]
}

const initialState = {
    recipes: [
        new Recipe("Pasta", "Pasta was first perfected by CPT", "https://ohsheglows.com/wp-content/uploads/2017/02/10minuteveganpasta-6481.jpg", [new Ingredient("Chat Masala", 3), new Ingredient("Meetha Masala", 2)]),
        new Recipe("Maggie", "Maggie is indian food originated in Uttrakhand by a person named CPT", "https://craftlog.com/m/i/3805446=s1280=h960", [new Ingredient("Chat Masala", 1), new Ingredient("Khatta Masala", 1)]),
    ]
};  

export function recipeReducer(state=initialState, action:RecipesActions.RecipeActions){
    switch(action.type){
        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipesActions.UPDATE_RECIPE:
            const recipes = [...state.recipes];
            const newRecipe = {...action.payload.recipe};
            recipes[action.payload.index] = newRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case RecipesActions.DELETE_RECIPE:
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            };
        case RecipesActions.ADD_RECIPES:
            // console.log("Reducer: "+action.payload);
            return {
                ...state,
                recipes: action.payload
            };
        default:
            return state;
    }
}