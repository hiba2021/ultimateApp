import { Observable, of, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";

import { Meal, MealsService } from "src/health/shared/services/meals/meals.service";
import { Store } from 'src/store';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs-compat/operator/map';

@Component({
    selector:'meals',
    styleUrls:['meals.component.scss'],
    template:`
    <div class="meals">

        <!-- title div -->
        <div class="meals__title">
            <h1>
                <img src="assets/img/food.svg">
                Your meals
            </h1>

            <!--button to create a new meal -->
            <a 
            class="btn__add"  
            [routerLink]="['../meals/new']"> <!--routerlink pointing to a new array -->
            <img src="assets/img/add-white.svg">
            New Meal
            </a>

        </div>

        <!-- div to show the list of meals driven from the meals$ -->
        <div *ngIf="meals$ | async as meals ; else loading;"> <!--if the meals exist-->
             <div class="message" *ngIf="!meals.length"> <!-- If no meal exists-->
                    <img src="assets/img/face.svg">  
                    No meals, add a new meal to start  
             </div>
             <!--Meals when existing : using ngfor-->
             <list-item
             *ngFor="let meal of meals"
             [item]="meal"
             (remove)="removeTheMeal($event)"
            >
            </list-item>
        </div>

        <ng-template #loading> <!-- to connect this ng template to the else statement-->
            <div class="message">
                 <img src="assets/img/loading.svg">
                 Fetching meals.....  
            </div>
        </ng-template>
        
    </div>
    `
})

export class MealsComponent implements OnInit,OnDestroy{

    meals$!: Observable<Meal[]>;
    subscription!: Subscription;

    constructor(
        private store:Store,
private mealsService:MealsService //DI kicks off a base for this component
                                    //to request some meals when we navigate to the meals component.

                                    ) {}
    
ngOnInit(){

 
    this.meals$=this.store.select<Meal[]>('meals');//return a meal array and we ask for thbe meals property.
                                                //accessing meals$ via store
                                              
this.subscription=this.mealsService.meals$.subscribe();//subscribing to the meal$ observavle

}

ngOnDestroy(){
this.subscription.unsubscribe();
}

removeTheMeal(event:Meal){
    this.mealsService.removeMeal(event.$key);
console.log('Remove:',event);
}
}

   