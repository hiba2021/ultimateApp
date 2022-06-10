import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
// to lazyload the meals module we first created.

import { NgModule } from "@angular/core";

//Authguard
import { AuthGuard } from 'src/auth/shared/guards/auth.guard';

//shared modules
import { SharedModule } from './shared/shared.module';


export const ROUTES:Routes= [//lazyloading the routes
    {
        path:'meals',canActivate:[AuthGuard], loadChildren:()=>import('./meals/meals.module').then(m=>m.MealsModule)
    },
    {
        path:'schedule',canActivate:[AuthGuard],loadChildren:()=>import('./schedule/schedule.module').then(m=>m.ScheduleModule)
    },
    {
        path:'workout',canActivate:[AuthGuard],loadChildren:()=>import('./workout/workout.module').then(m=>m.WorkoutsModule)
    }
//we need to protect these routes from being accessed by unauthorized users.
//for this import the authguard

    
];

@NgModule({
    imports:[
        RouterModule.forChild(ROUTES),
        SharedModule.forRoot()
    ]
})

export class HealthModule{}