import { AuthService } from './../../../shared/services/auth/auth.service';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector:'register' ,
    template:`
     <div>
    <auth-form (submitted)="registerUser($event)">
    <h1>Register</h1>
        <a routerLink="/auth/login">Already have an account?</a>
        <button type="submit">
            Create Account
        </button>
        <div class="error" *ngIf="error">
    {{error}}
        </div>
    </auth-form>
    </div>
    `
})

export class RegisterComponent{
    error!: string;

    //dependency inject authservice to the registercomponent

    constructor(
        private authService :AuthService,
        private router:Router
    ){}

     async registerUser(event:FormGroup){
        //console.log(event.value);
       //we are going to destructure the below code
       // this.authService.createUser(event.value.email,event.value.password);

       // for this use a const and like an import statement add email and password to it

       const {email,password}=event.value;
       try{
        await this.authService.createUser(email,password); // is a promise, can use async await
        this.router.navigate(['/']);
    }
       catch(err:any){
           this.error=err.message;
       }
    }

}