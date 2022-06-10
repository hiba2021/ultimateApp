import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Component, OnInit, Output ,OnDestroy} from "@angular/core";
import { Meal, MealsService } from "src/health/shared/services/meals/meals.service";
import 'rxjs/add/operator/switchMap';
import { switchMap } from 'rxjs/operators';

@Component({
    selector:'meal',
    styleUrls:['meal.component.scss'],
    template:`
    <div class="meal">

        <div class="meal__title">
            <h1>
                <img src="assets/img/food.svg">
                <span *ngIf="meal$ |async as meal;else title;">{{meal.name?'Edit':'Create'}} meal</span>
                <ng-template #title> Loading....</ng-template>
            </h1>
        </div>

        <div *ngIf="meal$ |async as meal;else loading;">
            <meal-form 
            [meal]="meal"
            (create)="addtheMeal($event)"
            (update)="updateTheMeal($event)" 
            (remove)="removeTheMeal($event)"                 
             >                                      
            </meal-form>
        </div>

        <ng-template #loading>
            <div class="message">
                <img src="assets/img/loading.svg">
                Fetching meal
            </div>
        </ng-template>

    </div>
    `
})
export class MealComponent implements OnInit, OnDestroy{

    meal$!: Observable<Meal>;
    subscription!: Subscription;

//    @Output()
//    incomingnew=new EventEmitter<any>();

    constructor(
        private mealService:MealsService, 
        private router:Router,
        private route:ActivatedRoute //using this to dynamically fetch property on the routeParam
        
    ){}

    ngOnInit(){
this.subscription=this.mealService.meals$.subscribe();
this.meal$ = this.route.params.pipe(
switchMap(param => this.mealService.getMeal(param.id)));
    }


    ngOnDestroy(){
this.subscription.unsubscribe();
    }
       async addtheMeal(item:Meal){//event of type Meal
        // event.$key= this.mealService.addMeal(event).key;
        // console.log(event.$key,'in mealcomponent');
        // // this.item=event;
        //  console.log(event);//the meal with name, ingredient and key
        // this.backToMeals();//redirect
     await this.mealService.addMeal(item);
     this.backToMeals();
    }

   
    async updateTheMeal(event:Meal){
      const key=this.route.snapshot.params.id;
      console.log(key);
      await this.mealService.updateMeal(key,event);
      this.backToMeals();
    } 
 
   async removeTheMeal(event:Meal){
        const key=this.route.snapshot.params.id;
        await this.mealService.removeMeal(event.$key);
        this.backToMeals();    }

    backToMeals(){
      
        //this.router.navigate(['meals'],{queryParams:{data:this.item.$key}});
        this.router.navigate(['/meals']);
    }
}