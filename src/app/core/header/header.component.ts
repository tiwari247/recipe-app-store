import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../../store/app.reducers";
import * as fromAuth from "../../auth/store/auth.reducers";
import { Observable } from 'rxjs';

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit{
    // @Output() activeLink = new EventEmitter<boolean>();
    authState: Observable<fromAuth.State>;
    constructor(private recipeService: RecipeService, 
        private authService:AuthService,
        private store:Store<fromApp.AppState>){}

    // onLinkClick(value: boolean){
    //     console.log("header comp : "+value);
    //     this.activeLink.emit(value);
    // }

    ngOnInit(){
        this.authState = this.store.select('auth');
        this.authState.subscribe((data)=>{
            console.log(data);
        });
    }

    onSaveData(){
        // this.recipeService.saveToDB().subscribe((response)=>{
        //     console.log(response);
        // });
        this.recipeService.saveToDB();
    }

    onFetchData(){
        // this.recipeService.fetchFromDB().subscribe((response)=>{
        //     console.log(response);
        // });
        this.recipeService.fetchFromDB();
    }

    onLogout(){
        this.authService.logout();
    }

}