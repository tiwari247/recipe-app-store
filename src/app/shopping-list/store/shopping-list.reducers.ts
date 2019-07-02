import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from "./shopping-list.actions";

export interface State{
    ingredients:Ingredient[],
    editableIngredient:Ingredient,
    editableIngredientIndex:number;
}

const initialState = {
    ingredients: [
        new Ingredient("Garam Masala", 1),
        new Ingredient("Hara dhaniya", 2)
    ],
    editableIngredient: null,
    editableIngredientIndex: -1
};
export const ADD_INGREDIENT = 'ADD_INGREDIENT';


export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state, 
                ingredients: [
                    ...state.ingredients,
                    action.payload
                ]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state, 
                ingredients: [
                    ...state.ingredients,
                    ...action.payload
                ]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const ingredients = [...state.ingredients];
            ingredients[action.payload.index] = updatedIngredient; 
            console.log(ingredients);
            return {
                ...state, 
                ingredients: ingredients
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            const oldIngredients = [...state.ingredients];
            oldIngredients.splice(action.payload, 1);
            console.log(oldIngredients);
            return {
                ...state, 
                ingredients: oldIngredients
            };
        case ShoppingListActions.START_EDIT:
            const editableIngredient = {...state.ingredients[action.payload]};
            return {
                ...state, 
                editableIngredient: editableIngredient,
                editableIngredientIndex: action.payload
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state, 
                editableIngredient: null,
                editableIngredientIndex: -1
            };
    }
    return state;
}