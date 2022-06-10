import { AuthService } from './../../../shared/services/auth/auth.service';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector:'login' ,
    template:`
     <div>
    
    <auth-form (submitted)="loginUser($event)"> 
        <!-- emits an event called submitted , 
        going to ,listen to that event inside of template
        callback fn loginuser -->
        <h1>Login</h1>
        <a routerLink="/auth/register">Not registered?</a>
        <button type="submit">
            Login
        </button>
        <div class="error" *ngIf="error">
            {{error}}
        </div>
    </auth-form>
    </div>
    `
})

export class LoginComponent{

    error!:string;

    constructor(
        private authService:AuthService,
        private router:Router
    ){}

   async loginUser(event:FormGroup){
        //console.log(event.value);
        //this.authService.loginUser(event.value.email,event.value.password);
        const {email,password}=event.value;
        try{
            await this.authService.loginUser(email,password);
            this.router.navigate(['/']);
        }
        catch(err:any){
            this.error=err.message;
        }
    }

}