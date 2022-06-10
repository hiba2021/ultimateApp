import { Component,ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormArray,FormGroup,FormBuilder,FormControl,Validators } from "@angular/forms";
import { Workout } from "src/health/shared/services/workout/workout.service";


//this is a dumb or presentational component(so changeDetectionstrategy is not that relevent)
@Component({
    selector:'workout-form',
    changeDetection:ChangeDetectionStrategy.OnPush,
    styleUrls:['workout-form.component.scss'],
    template:`
    <div class="workout-form">

        <form [formGroup]="form">
    <!-- workout Name div -->
            <div class="workout-form__name">
                <label>
                    <h3> Workout Name</h3>
                    <input
                    type="text"
                    [placeholder]="placeholder"
                    formControlName="name"> 
                    <div class="error" *ngIf="required">
                        Workout name is required 
                    </div>   
                </label>

                <label>
                    <h3> Type </h3>
                    <workout-type formControlName="type">
                    </workout-type>
                </label>
            </div>

            <div class="workout-form__details"> <!--we need to do 2 things here-->
              
                <div *ngIf="form.get('type')?.value==='strength'"><!--container div for strength-->
                     <!-- for strength formgroup to control the reps,sets and weight -->
                    <div 
                      class="workout-form__fields"
                      formGroupName="strength">
                        
                        <label>
                            <h3>Reps</h3>
                            <input type="number" formControlName="reps">
                        </label>

                        <label>
                            <h3>Sets</h3>
                            <input type="number" formControlName="sets">
                        </label>

                        <label>
                            <h3>Weight<span>(kg)</span></h3>
                            <input type="number" formControlName="weight">
                        </label>
                    </div>
                </div>
        
                <!--container div for endurance-->
                <div *ngIf="form.get('type')?.value==='endurance'">
                  <!-- for endurance formgroup to control the distance and duration -->
                     <div 
                        class="workout-form__fields"
                        formGroupName="endurance">
                            
                            <label>
                                <h3>Distance<span>(kms)</span></h3>
                                <input type="number" formControlName="distance">
                            </label>

                            <label>
                                <h3>Duration<span>(minutes)</span></h3>
                                <input type="number" formControlName="duration">
                            </label>

                     </div>
                </div>

            </div>

<!-- To create workout -->
            <div class="workout-form__submit">
                <div>
                    <button type="button" class="button" *ngIf="!exists" (click)="createWorkout()" >
                        Create Workout
                    </button>
                    

                    <button type="button" class="button" *ngIf="exists" (click)="updateWorkout()" >
                       Save
                    </button>
                    

                    <a class="button button--cancel" 
                       routerLink=".."><!--to navigate to the previous page-->
                        Cancel
                    </a>
                </div>

                <div class="workout-form__delete"  *ngIf="exists"><!--condition:if meal exists-->
                 <!--the below ngIf will work only if above condition ngIf exists, so we need NGONCHANGES Lifecycle hook(add below constructor)-->
                    <div *ngIf="toggled"> <!-- if button clicked for delete i.e toggled=true only if above condition is true-->
            
                            <p>Delete Item</p>

                            <button
                            class="confirm"
                            type="button"
                            (click)="removeWorkout()">
                            Yes
                            </button>

                                <button
                                class="cancel"
                                type="button"
                                (click)="toggle()">     <!-- toggle back our selection-->
                                No                  <!--to get rid of the deleteitem message-->
                                </button>

                     </div>

                        <button class="button button--delete" type="button" (click)="toggle()"><!-- button to ask for delete-->
                               Delete
                        </button>
          
                </div>


            </div>

        </form>

    </div>
    `
})


export class WorkoutFormComponent implements OnChanges{

    toggled=false;
    exists=false;

    @Input()
    workout!: Workout;

    @Output()
    create = new EventEmitter<Workout>();

    @Output()
    update = new EventEmitter<Workout>();

    @Output()
    remove = new EventEmitter<Workout>();

    form=this.fb.group({ // have to give the properties of the Meal Interface
        name:['',Validators.required],//if the name is not filled, we cannot click the createmeal button        
        type:'strength',
        strength:this.fb.group({
            reps:0,
            sets:0,
            weight:0
        }),
        endurance:this.fb.group({
            distance:0,
            duration:0
        })
    });

    constructor(
        private fb:FormBuilder
    ){}

    get placeholder(){
        return `e.g. ${this.form.get('type')?.value === 'strength'?'Benchpress':'Treadmill'}`;
    }

        ngOnChanges(changes:SimpleChanges){ // takes changes object which is of type SimpleChanges 
            if(this.workout && this.workout.name){//if changes.workout.currentValue has a name ppty the it is an existing workout(changes.workout.currentValue.name)
                    //changed to (this.workout && this.workout.name) for more safety check
                this.exists=true;
                const value=this.workout;
                this.form.patchValue(value);//patchValue will update a portion of the form(here it is goin to take the workout and update the name portion)             
            }
        }


        get required(){
            return(
                this.form.get('name')?.hasError('required') &&
                this.form.get('name')?.touched
            );
        }

        createWorkout(){
            if(this.form.valid){
              this.create.emit(this.form.value);
                                                     }
                                                }

        updateWorkout(){
            if(this.form.valid){
                this.update.emit(this.form.value);
            }
        }  
        
        removeWorkout(){
            this.remove.emit(this.form.value);
        }

        toggle(){
            this.toggled=!this.toggled;
        }

}