import { SharedModule } from './../shared/shared.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule,Routes } from "@angular/router";
import { RegisterComponent } from "./container/register/register.component";

export const ROUTES:Routes=[
    { path:'',component:RegisterComponent}
]

@NgModule({ // we are not going to have providers as we will use that from shared module
    declarations:[
        RegisterComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(ROUTES),
        SharedModule//which imports the auth service
    ]
})

export class RegisterModule{}


