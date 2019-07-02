import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const ADD_RECIPE = "ADD_RECIPE";
export const ADD_RECIPES = "ADD_RECIPES";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";

export class AddRecipe implements Action{
    readonly type = ADD_RECIPE;
    constructor(public payload:Recipe){}
}

export class AddRecipes implements Action{
    readonly type = ADD_RECIPES;
    constructor(public payload:Recipe[]){}
}

export class UpdateRecipe implements Action{
    readonly type = UPDATE_RECIPE;
    constructor(public payload: {index:number, recipe:Recipe}){}
}

export class DeleteRecipe implements Action{
    readonly type = DELETE_RECIPE;
    constructor(public payload: number){}
}

export type RecipeActions = AddRecipe|UpdateRecipe|DeleteRecipe|AddRecipes;