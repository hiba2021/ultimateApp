import { Component,ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormArray,FormGroup,FormBuilder,FormControl,Validators } from "@angular/forms";
import { Meal } from "src/health/shared/services/meals/meals.service";


//this is a dumb or presentational component(so changeDetectionstrategy is not that relevent)
@Component({
    selector:'meal-form',
    changeDetection:ChangeDetectionStrategy.OnPush,
    styleUrls:['meal-form.component.scss'],
    template:`
    <div class="meal-form">

        <form [formGroup]="form">
    <!-- Meal Name div -->
            <div class="meal-form__name">
                <label>
                    <h3> Meal Name</h3>
                    <input
                    type="text"
                    placeholder="e.g : English Breakfast"
                    formControlName="name"> 
                    <div class="error" *ngIf="required">
                        Meal name is required 
                    </div>   
                </label>
            </div>
 <!-- Food Div -->
            <div class="meal-form__food">
                
                <div class="meal-form__subtitle">
                    <h3>Ingredients</h3>
                    <button type="button" class="meal-form__add" (click)=" addIngredient()">
                         <img src="assets/img/add-white.svg">
                         Add Ingredients
                    </button>
                </div>

                <div formArrayName="ingredients"><!-- to add the ingredients-->
                    <label *ngFor="let c of ingredients.controls; index as i">
<!-- ingredients.control does not correspond to the formarrayname -->
<!-- go to get ingredients fn -->
                        <input [formControlName]="i" placeholder="Eggs">
                        <span class="meal-form__remove" (click)="removeIngredient(i)"></span>
                    </label>

                </div>

            </div>
<!-- To create meal -->
            <div class="meal-form__submit">
                <div>
                    <button type="button" class="button" *ngIf="!exists" (click)="createMeal()" >
                        Create meal
                    </button>
                    

                    <button type="button" class="button" *ngIf="exists" (click)="updateMeal()" >
                       Save
                    </button>
                    

                    <a class="button button--cancel" 
                       routerLink=".."><!--to navigate to the previous page-->
                        Cancel
                    </a>
                </div>

                <div class="meal-form__delete"  *ngIf="exists"><!--condition:if meal exists-->
                 <!--the below ngIf will work only if above condition ngIf exists, so we need NGONCHANGES Lifecycle hook(add below constructor)-->
                    <div *ngIf="toggled"> <!-- if button clicked for delete i.e toggled=true only if above condition is true-->
            
                            <p>Delete Item</p>

                            <button
                            class="confirm"
                            type="button"
                            (click)="removeMeal()">
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


export class MealFormComponent implements OnChanges{

    toggled=false;
    exists=false;

    @Input()
    meal!: Meal;

    @Output()
    create = new EventEmitter<Meal>();

    @Output()
    update = new EventEmitter<Meal>();

    @Output()
    remove = new EventEmitter<Meal>();

    form=this.fb.group({ // have to give the properties of the Meal Interface
        name:['',Validators.required],//if the name is not filled, we cannot click the createmeal button
        ingredients:this.fb.array([''])//initialize this to a form array
        
    });

    constructor(
        private fb:FormBuilder
    ){}

        ngOnChanges(changes:SimpleChanges){ // takes changes object which is of type SimpleChanges 
            if(this.meal && this.meal.name){//if changes.meal.currentValue has a name ppty the it is an existing meal(changes.meal.currentValue.name)
                    //changed to (this.meal && this.meal.name) for more safety check
                this.exists=true;
                this.emptyIngredients();//to show the ingredients of the formArray

                const value=this.meal;
                this.form.patchValue(value);//patchValue will update a portion of the form(here it is goin to take the meal and update the name portion)
                
                if(value.ingredients){
                    for(const item of value.ingredients){
                        this.ingredients.push(new FormControl(item));//adding the removed items
                    }
                }
               
            }
        }

        emptyIngredients(){
            while(this.ingredients.controls.length){//while we have control of ingredients formArray
                this.ingredients.removeAt(0);//loop will keep iterating, removing items from the index of 0,until loop has finished
            }
        }

        get required(){
            return(
                this.form.get('name')?.hasError('required') &&
                this.form.get('name')?.touched
            );
        }
      get ingredients(){
            return this.form.get('ingredients') as FormArray;
            //the ingredients.controls ppty in template corresponds to this fn name
        }

        addIngredient(){
            this.ingredients.push(new FormControl(''));
        }

        removeIngredient(index:number){
        // this.ingredients means we are accessing the above get
        //.removeAt will work only coz above ingredients is returned as Form Array
          this.ingredients.removeAt(index);
           }

        createMeal(){
            if(this.form.valid){
              this.create.emit(this.form.value);
                                                     }
                                                }

        updateMeal(){
            if(this.form.valid){
                this.update.emit(this.form.value);
            }
        }  
        
        removeMeal(){
            this.remove.emit(this.form.value);
        }

        toggle(){
            this.toggled=!this.toggled;
        }

}