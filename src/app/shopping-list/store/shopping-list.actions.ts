import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngredient{
    readonly type=ADD_INGREDIENT;
    constructor(public payload:Ingredient){}
}

export class AddIngredients{
    readonly type=ADD_INGREDIENTS;
    constructor(public payload:Ingredient[]){}
}

export class UpdateIngredient{
    readonly type=UPDATE_INGREDIENT;
    constructor(public payload: {index:number, ingredient:Ingredient}){}
}

export class DeleteIngredient{
    readonly type=DELETE_INGREDIENT;
    constructor(public payload:number){}
}

export class StartEdit{
    readonly type=START_EDIT;
    constructor(public payload:number){}
}

export class StopEdit{
    readonly type=STOP_EDIT;
}

export type ShoppingListActions = AddIngredient|
AddIngredients|
UpdateIngredient|
DeleteIngredient|
StartEdit|
StopEdit;