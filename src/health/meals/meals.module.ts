import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

//components
import { MealFormComponent } from './components/meal-form/meal-form.component';

//containers
import { MealComponent } from './container/mealnew/meal.component';
import { MealsComponent } from './container/meals/meals.component';


export const ROUTES:Routes=[
    {path:'', component:MealsComponent},
    {path:'new',component:MealComponent},
    {path:':id',component:MealComponent}//dynamic route for id based mealcomponent 
];


@NgModule({
    declarations:[
        MealsComponent,
        MealComponent,
        MealFormComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),//use forchild to configure some routes for it on the object "ROUTES"
        SharedModule
    ],
    exports:[]
})

export class MealsModule{

}