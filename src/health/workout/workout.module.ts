import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

//components
import { WorkoutTypeComponent } from './component/workout-type/workout-type.component';
import { WorkoutFormComponent } from './component/workout-form/workout-form.component';

//containers
import { WorkoutComponent } from './container/workout/workout.component';
import { WorkoutsComponent } from './container/workouts/workouts.component';


export const ROUTES:Routes=[
    {path:'', component:WorkoutsComponent},
    {path:'new',component:WorkoutComponent},
    {path:':id',component:WorkoutComponent}//dynamic route for id based workoutcomponent 
];


@NgModule({
    declarations:[
        WorkoutsComponent,
        WorkoutComponent,
       WorkoutFormComponent,
       WorkoutTypeComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),//use forchild to configure some routes for it on the object "ROUTES"
        SharedModule
    ],
    exports:[]
})

export class WorkoutsModule{

}