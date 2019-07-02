import { RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../store/app.reducers";
import * as fromAuth from "../auth/store/auth.reducers";
import { map } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate{
   
    constructor(private authService:AuthService,
        private store: Store<fromApp.AppState>){

    }

    canActivate(route:ActivatedRouteSnapshot, 
        state: RouterStateSnapshot,){
        // console.log(this.authService.isAuthenticated());
        // return this.store.select("auth").map((authState: fromAuth.State)=>{
        //     return authState.isAuthenticated;
        // });

        return this.store.select("auth").pipe(
            map((authState: fromAuth.State)=>{
                return authState.isAuthenticated;
            })
        );
    }

   
}