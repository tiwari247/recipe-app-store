import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as fromApp from "../store/app.reducers";
import * as fromAuth from "../auth/store/auth.reducers";
import { Store } from '@ngrx/store';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService,
        private store:Store<fromApp.AppState>){}
    
    intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
        console.log("Log Request : "+req);
        // let newObj = req.clone({
        //     params: new HttpParams().set('auth', this.authService.getToken())
        // });
        // return next.handle(newObj);

        return this.store.select("auth").pipe(
            take(1),
            switchMap((authState: fromAuth.State)=>{
                let newObj = req.clone({
                    params: new HttpParams().set('auth', authState.token)
                });
                return next.handle(newObj);
            })
        );

    }
}