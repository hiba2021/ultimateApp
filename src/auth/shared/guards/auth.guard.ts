import { AuthService } from './../services/auth/auth.service';
import { Injectable } from "@angular/core";

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';

@Injectable()//as it is an injectable we need to inject to constructor
export class AuthGuard implements CanActivate{
    constructor(
        private router:Router,
        private authService:AuthService
    ){}
    

    //we need to implement canActivate fn which should return a boolean
   canActivate(){
        return this.authService.authState
        .map((user)=>{ //here user is the firebse.user
            if(!user){//if there is no user,i.e. we get null user
                 this.router.navigate(['/auth/login']);
            }
            return !!user;//double bang user means if there is no user return null
                          //if there is the {user} object return true
        }); 
    }
}

//canActivate helps to add this auth guard in any of the routes in the health module
//canActivate also protect us against loadchildren