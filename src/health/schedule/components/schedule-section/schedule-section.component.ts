import { ScheduleItem } from 'src/health/shared/services/schedule/schedule.service';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:'schedule-section',
    changeDetection:ChangeDetectionStrategy.OnPush,
    styleUrls:['schedule-section.component.scss'],
    template:`
    <div class="schedule-section">

      <div class="schedule-section__bar">
          {{name}}
      </div> 

      <!--big container div based on the name passed on-->
      <div>
          <!--section for meals-->
            <div class="schedule-section__item food"
                    *ngIf="section?.meals;else addMeal"
                    (click)="onSelect('meals', section.meals)">
                        <span>{{section.meals | join}}</span>
            </div>

            <ng-template #addMeal>
                <div 
                    class="schedule-section__item"
                    (click)="onSelect('meals')">    
                       
                    Assign Meals
                </div>
            </ng-template>

             <!--section for workouts-->
             <div class="schedule-section__item workout"
                    *ngIf="section.workouts;else addWorkout"
                    (click)="onSelect('workouts', section.workouts)">
                        <span>{{section.workouts | join}}</span>
            </div>

            <ng-template #addWorkout>
                <div 
                    class="schedule-section__item"
                    (click)="onSelect('workouts')">                     
                    Assign Workouts
                </div>
            </ng-template>
      </div>    
       

    </div>
    `
})

export class ScheduleSectionComponent{

    @Input()
    name!: string;

    @Input()
    section!:any;

    @Output()
    select=new EventEmitter<any>();

//there are two arguments for this fn
//the second argument is optional, it returns an array,"=[]"given in case if there is no parameter in called function
    onSelect(type:string,assigned:string[]=[]){
        const data=this.section;
        console.log(this.section.meals,'dataaaaaaaaaaaaaaaaaaaaaaaa');
        this.select.emit({
            type,assigned,data //emit 3 properties
        });
        console.log(type ,'+', assigned, '+', data,'heeeeeeeeeeeeeeeeee');

    }

}