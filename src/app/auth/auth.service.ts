import * as firebase from "firebase";
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as fromApp from "../store/app.reducers";
import * as AuthActions from "../auth/store/auth.actions";
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService{
    // token:string;

    constructor(private router:Router,
        private store: Store<fromApp.AppState>){}

    signupUser(email:string, password:string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result)=>{
                console.log("User Created "+result);
                this.store.dispatch(new AuthActions.Signup());
            })
            .catch(err=>console.log(err));
    }

    signinUser(email:string, password:string){
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response)=>{
                // firebase.auth().currentUser.getIdToken()
                // .then((token)=>this.token=token); 
                // this.router.navigate(['/']);       
                // console.log(response)

                firebase.auth().currentUser.getIdToken()
                .then((token)=>{
                    this.store.dispatch(new AuthActions.Login());
                    this.store.dispatch(new AuthActions.SetToken(token));
                }); 
                this.router.navigate(['/']);       
                console.log(response)

            })
            .catch(err=>console.log(err));
    }

    // getToken(){
    //     firebase.auth().currentUser.getIdToken()
    //     .then((token)=>this.token=token);

    //     return this.token;
    // }

    // isAuthenticated(){
    //     return this.token!=null;
    // }

    logout(){
        // firebase.auth().signOut();
        // this.token = null;
        this.store.dispatch(new AuthActions.Logout());
    }
}