
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";


import 'rxjs/add/operator/map';
import { Meal } from "../../services/meals/meals.service";


@Component({
    selector:'list-item',
    changeDetection:ChangeDetectionStrategy.OnPush,//good practice for stateless components
    styleUrls:['list-item.component.scss'],
    template:`
    <div class="list-item">

    
        <a [routerLink]="getRoute(item)">
            <p class="list-item__name">{{item.name}}</p>
            <p class="list-item__ingredients">
                <span *ngIf="item.ingredients;else showWorkout">
                    {{item.ingredients | join}}
                </span> 
            </p>
            <ng-template #showWorkout>
                <span>{{item | workout}}</span>
            </ng-template>    
        </a>

        <div class="list-item__delete" *ngIf="toggled">
            
                <p>Delete Item</p>

                <button
                class="confirm"
                type="button"
                (click)="removeItem()">
                Yes
                </button>

                <button
                class="cancel"
                type="button"
                (click)="toggle()">     <!-- toggle back our selection-->
                No                  <!--to get rid of the deleteitem message-->
                </button>

        </div>

        <button
          class="trash"
          type="button"
         (click)="toggle()">
            <img src="assets/img/remove.svg">
       </button>

    </div>
    `
})

export class ListItemComponent {

    toggled=false; // ppty for toggling in toggle fn.
   
    constructor(  
       private route:ActivatedRoute

    ){}
  
//   ngOnInit(){
//     this.route.queryParams.subscribe((params:any)=>{
//         console.log(params.data,'inqueryparams');
//         this.item.$key=params.data;
//     })
//   }

    @Input()
    item!: any;

    

    //item!: any; //can recieve any type of item, be it meal or workout
  
 @Output()
 remove=new EventEmitter<any>();


getRoute(item:any){//to generate the $key of meal or workout
   return [
       `../${item.ingredients ? 'meals':'workout'}`,
       item.$key];//this key gives the path you set up for the meals component in mealsmodule routing   
}

removeItem(){
    this.remove.emit(this.item);//this remove output goes to the mealcomponent
}

toggle(){
    this.toggled=!this.toggled;//to change tru to fls or fls to tru
    console.log(this.item);

}

}

