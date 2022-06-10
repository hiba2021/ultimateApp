import { Workout, WorkoutsService } from './../../../shared/services/workout/workout.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";

import { Store } from 'src/store';


@Component({
    selector:'workouts',
    styleUrls:['workouts.component.scss'],
    template:`
    <div class="workouts">

        <!-- title div -->
        <div class="workouts__title">
            <h1>
                <img src="assets/img/workout.svg">
                Your workouts
            </h1>

            <!--button to create a new workout -->
            <a 
            class="btn__add"  
            [routerLink]="['../workout/new']"> <!--routerlink pointing to a new array -->
            <img src="assets/img/add-white.svg">
            New Workout
            </a>

        </div>

        <!-- div to show the list of workouts driven from the workouts$ -->
        <div *ngIf="workouts$ | async as workouts ; else loading;"> <!--if the workouts exist-->
             <div class="message" *ngIf="!workouts.length"> <!-- If no workout exists-->
                    <img src="assets/img/face.svg">  
                    No workouts, add a new workout to start  
             </div>
             <!--workouts when existing : using ngfor-->
             <list-item
             *ngFor="let workout of workouts"
             [item]="workout"
             (remove)="removeTheWorkout($event)"
            >
            </list-item>
        </div>

        <ng-template #loading> <!-- to connect this ng template to the else statement-->
            <div class="message">
                 <img src="assets/img/loading.svg">
                 Fetching workouts.....  
            </div>
        </ng-template>
        
    </div>
    `
})

export class WorkoutsComponent implements OnInit,OnDestroy{

    workouts$!: Observable<Workout[]>;
    subscription!: Subscription;

    constructor(
        private store:Store,
private workoutsService:WorkoutsService //DI kicks off a base for this component
                                    //to request some meals when we navigate to the meals component.

                                    ) {}
    
ngOnInit(){

 
    this.workouts$=this.store.select<Workout[]>('workouts');//return a meal array and we ask for thbe workouts property.
                                                //accessing workouts$ via store
             console.log('hi');                                 
this.subscription=this.workoutsService.workouts$.subscribe();//subscribing to the meal$ observavle

}

ngOnDestroy(){
this.subscription.unsubscribe();
}

removeTheWorkout(event:Workout){
    this.workoutsService.removeWorkout(event.$key);
console.log('Remove:',event);
}
}

   