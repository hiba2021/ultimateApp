import { SharedModule } from './../shared/shared.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule,Routes } from "@angular/router";
import { LoginComponent } from './container/login/login.component';


export const ROUTES:Routes=[
    { path:'',component:LoginComponent}
]

@NgModule({ // we are not going to have providers as we will use that from shared module
    declarations:[
      LoginComponent  
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(ROUTES),
        SharedModule
        
    ]
})

export class LoginModule{}


