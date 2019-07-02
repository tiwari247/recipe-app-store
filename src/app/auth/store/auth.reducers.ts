import { Action } from '@ngrx/store';
import * as AuthActions from "./auth.actions";

export interface State{
    token: string,
    isAuthenticated: boolean
}

const initialState: State = {
    token: null,
    isAuthenticated: false
};

export function authReducer(state=initialState, action: AuthActions.AuthActions){
    switch(action.type){
        case AuthActions.SIGNUP:
        case AuthActions.LOGIN:
            return {
                ...state,
                isAuthenticated: true
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false
            };
        case AuthActions.SET_TOKEN:
            const token = action.payload
            return {
                ...state,
                token: token,
                isAuthenticated: true
            }
        default:
            return state;
    }
}