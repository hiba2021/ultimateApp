import { OnInit, Output, EventEmitter } from '@angular/core';
import { Workout } from './../../../shared/services/workout/workout.service';
import { Meal } from './../../../shared/services/meals/meals.service';

import { Component, Input } from '@angular/core';


@Component({
  selector: 'schedule-assign',
  styleUrls: ['schedule-assign.component.scss'],
  template: `

    <div class="schedule-assign">

        <div class="schedule-assign__modal">
        <!-- below is a small header-->
                <div class="schedule-assign__title">

                    <h1>
                        <img src="assets/img/{{section.type==='workouts'?'workout':'food'}}.svg">
                        Assign {{section.type}}
                    </h1>

                    <a class="btn__add"
                    [routerLink]="getRoute(section.type)">
                        <img src="assets/img/add-white.svg">
                        New {{section.type}}
                    </a>

                </div>

                <div class="schedule-assign__list">
               
                     <!--span tag will show only if the user has not entered any information such as a new meal or a new workout-->
                    <span 
                        class="schedule-assign__empty"
                        *ngIf="!list?.length">
                            <img src="assets/img/face.svg">
                            Nothing here to assign
                    </span>

                    <!--if we do have something to assign, we use a div to display each individual item-->
                    <div
                        *ngFor="let item of list"
                        [class.active]="exists(item.name)"
                        (click)="toggleItem(item.name)">
                        <!--add a class  active if the item exists-->
                        {{item.name}}
                    </div>

                </div>

                <div class="schedule-assign__submit">

                    <div>

                        <button type="button" class="button" (click)="updateAssign()">
                            Update
                        </button>

                        <button type="button" class="button button--cancel" (click)="cancelAssign()">
                            Cancel
                        </button>

                    </div>

                </div>

        </div>

    </div>

`
})
export class ScheduleAssignComponent implements OnInit{

    //selected is initialised as a string array
    private selected:string[]=[];
    
    @Input()
    section:any;

    @Input()
    list!: Meal[] | Workout[];

    @Output()
    update=new EventEmitter<any>();

    @Output()
    cancel=new EventEmitter<any>();

    ngOnInit(){
this.selected=[...this.section.assigned];

console.log(this.section.type,'list');
    }

    toggleItem(name:string){
        if(this.exists(name)){//if the value already exist, we want to return a new array where that item !=name, removing the existing item
            this.selected=this.selected.filter(item=>item!==name);//similar to using slice
        }
        else{//add it to the array with name
            this.selected=[...this.selected,name];//similar to using push
        }

    }

    getRoute(name:string){
        return [`../${name}/new`];
    }

    exists(name:string){
        console.log(name);
        console.log(!!~this.selected.indexOf(name),'!!!!!!!!!!!!!!!!!!');
        return !!~this.selected.indexOf(name);//here this.selected would be a string array
    }

    updateAssign(){
        //emit a piece of data,create output 'update'
         //we need to dynamically(using [] braces) emit the workouts or meals
         console.log(this.selected,'updateAssign');
         this.update.emit({
            //workout or meal
            [this.section.type]:this.selected//list of meals or workouts that user want to asssign
        
        });
        console.log(  this.section,'updateAssign - 2');
   
    }

    cancelAssign(){
       this.cancel.emit();
    }
}