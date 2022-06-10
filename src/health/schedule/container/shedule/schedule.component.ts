import { MealsService } from './../../../shared/services/meals/meals.service';
import { Workout, WorkoutsService } from './../../../shared/services/workout/workout.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from 'src/store';
import { ScheduleService, ScheduleItem } from 'src/health/shared/services/schedule/schedule.service';
import { Meal } from 'src/health/shared/services/meals/meals.service';

@Component({
    selector:'schedule',
    styleUrls:['schedule.component.scss'],
    template:`
    <div class="schedule">
    
    <!-- Bind a "date" to the schedule-calendar which is an Observable in async pipe-->
    <schedule-calendar 
    [date]="date$ |async"
    [items]="schedule$ | async"
    (change)="changeDate($event)"
    (select)="changeSection($event)"><!--when user changes a section, this.open=true will make the below selector work-->
    </schedule-calendar>

    <schedule-assign
    *ngIf="open"
    [section]="selected$ |async"
    [list]="list$ | async"
    (update)="assignItem($event)"
    (cancel)="closeAssign()"><!--if we select workout, we want to show a list of only workout items-->

    </schedule-assign>

    </div>
    `
})

export class ScheduleComponent implements OnInit,OnDestroy{

    open=false; //control to display this component

    //first we need to set up the date observable
    date$!: Observable<Date>;
    selected$!:Observable<any>;
   list$!:Observable<Meal[] | Workout[]>;    
    schedule$!:Observable<ScheduleItem[]>;
    subscriptions:Subscription[]=[];

    constructor(
        private store:Store,
        private scheduleService:ScheduleService,
        private mealsService:MealsService,
        private workoutsService:WorkoutsService
    ){}

    changeDate(date:Date){
        this.scheduleService.updateDate(date);
        console.log(date,'innchangeDate of schedule component');
    }

    changeSection(event:any){
        this.open=true;
this.scheduleService.selectSection(event);
console.log(event,'in console of changeSection');
    }

    ngOnInit() {
        this.date$=this.store.select('date');
        this.schedule$=this.store.select('schedule');
        this.selected$=this.store.select('selected');
        this.list$=this.store.select('list');

        this.subscriptions=[
            this.scheduleService.schedule$.subscribe(),
            this.scheduleService.selected$.subscribe(),
            this.scheduleService.list$.subscribe(),
            this.scheduleService.items$.subscribe(),
            this.mealsService.meals$.subscribe(),
            this.workoutsService.workouts$.subscribe(),
        ];
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub=>sub.unsubscribe());//will iterate our array of subscriptions and completely unsubscribe one by obe
    }

    closeAssign(){
        this.open=false;
    }
    
    assignItem(items:string[]){
        this.scheduleService.updateItems(items);
        console.log(items,'items in assignItem')
        this.closeAssign();

    }

}