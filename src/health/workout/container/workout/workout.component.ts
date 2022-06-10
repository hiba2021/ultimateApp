import { Workout, WorkoutsService } from './../../../shared/services/workout/workout.service';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit ,OnDestroy} from "@angular/core";
import 'rxjs/add/operator/switchMap';
import { switchMap } from 'rxjs/operators';

@Component({
    selector:'workout',
    styleUrls:['workout.component.scss'],
    template:`
    <div class="workout">

        <div class="workout__title">
            <h1>
                <img src="assets/img/food.svg">
                <span *ngIf="workout$ |async as workout;else title;">{{workout.name?'Edit':'Create'}} workout</span>
                <ng-template #title> Loading....</ng-template>
            </h1>
        </div>

        <div *ngIf="workout$ |async as workout;else loading;">
            <workout-form 
            [workout]="workout"
            (create)="addtheWorkout($event)"
            (update)="updateTheWorkout($event)" 
            (remove)="removeTheWorkout($event)"                 
             >                                      
            </workout-form>
        </div>

        <ng-template #loading>
            <div class="message">
                <img src="assets/img/loading.svg">
                Fetching workout
            </div>
        </ng-template>

    </div>
    `
})
export class WorkoutComponent implements OnInit, OnDestroy{

    workout$!: Observable<Workout>;
    subscription!: Subscription;

//    @Output()
//    incomingnew=new EventEmitter<any>();

    constructor(
        private workoutService:WorkoutsService, 
        private router:Router,
        private route:ActivatedRoute //using this to dynamically fetch property on the routeParam
        
    ){}

    ngOnInit(){
        console.log('hello');
this.subscription=this.workoutService.workouts$.subscribe();
this.workout$ = this.route.params.pipe(
switchMap(param => this.workoutService.getWorkout(param.id)));
    }


    ngOnDestroy(){
this.subscription.unsubscribe();
    }
       async addtheWorkout(item:Workout){//event of type Meal
        // event.$key= this.mealService.addMeal(event).key;
        // console.log(event.$key,'in mealcomponent');
        // // this.item=event;
        //  console.log(event);//the meal with name, ingredient and key
        // this.backToMeals();//redirect
     await this.workoutService.addWorkout(item);
     this.backToWorkouts();
    }

   
    async updateTheWorkout(event:Workout){
      const key=this.route.snapshot.params.id;
      console.log(key);
      await this.workoutService.updateWorkout(key,event);
      this.backToWorkouts();
    } 
 
   async removeTheWorkout(event:Workout){
        const key=this.route.snapshot.params.id;
        await this.workoutService.removeWorkout(event.$key);
        this.backToWorkouts();    }

    backToWorkouts(){
      
        //this.router.navigate(['meals'],{queryParams:{data:this.item.$key}});
        this.router.navigate(['/workout']);
    }
}