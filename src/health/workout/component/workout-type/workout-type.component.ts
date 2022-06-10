import { ChangeDetectionStrategy, Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export const TYPE_CONTROL_ACCESSOR = { //to register the ControlValueAccessor
provide:NG_VALUE_ACCESSOR,
useExisting:forwardRef(()=>WorkoutTypeComponent),
multi:true
};

@Component({
    selector:'workout-type',
    providers:[TYPE_CONTROL_ACCESSOR],
    changeDetection:ChangeDetectionStrategy.OnPush,
    styleUrls:['workout-type.component.scss'],
    template:`  
    <div class="workout-type">
        <div 
         class="workout-type__pane"
         *ngFor="let selector of selectors"
         [class.active]="selector===value"
         (click)="setSelected(selector)"> <!-- to loop over the values of the selector array-->
            <img src="assets/img/{{selector}}.svg">    
            <p>{{selector}}</p>
        </div>

    </div>
    `
})
export class WorkoutTypeComponent implements ControlValueAccessor{
    
    selectors= ['strength', 'endurance']; // we need to select from these 2;need control value accessor
                                            //for this,import forwardRef,ControlValueAccessor and NG_VALUE_ACCESSOR
                                            // using the const TYPE_CONTROL_ACCESSOR

    value!:string; //correspond to either strength or endurance

     onTouch!: Function;
     onModelChange! :Function;

    registerOnTouched(fn:Function){//is a method given to us by the controlValueAccessor and provides us the 'fn' function
        this.onTouch=fn ;//keep the 'fn' locally on onTouch funtion.
    }

    registerOnChange(fn:Function){//is a method given to us by the controlValueAccessor and provides us the 'fn' function
        this.onModelChange=fn ;//keep the 'fn' locally on onModelChange funtion.
    }


    writeValue(value: string) {
        this.value=value;
    }

setSelected(value:string){
    this.value=value;
    this.onModelChange(value);
    this.onTouch();
}

    }                                   
  