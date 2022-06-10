import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../../../auth/shared/services/auth/auth.service';
import { Injectable } from "@angular/core";
import { Store } from "src/store";
import { AngularFireDatabase, snapshotChanges} from 'angularfire2/database';

import 'rxjs/add/operator/do';
import 'rxjs/add/Observable/of';
import 'rxjs/add/operator/filter';



export interface Meal{
name:string,
ingredients:string[],//will allow us to add or remove particular food items
timestamp:number,
$key:string |null ,//coz of firebase
$exists:()=>boolean //$exists is a fn which returns a boolean.
}


@Injectable(
)

export class MealsService{

    constructor(
        private store:Store,//to store the list of meals in the reactive store.
        private db:AngularFireDatabase,// to interact with the angular fire database.
        private authService:AuthService,
        private route:ActivatedRoute
       
    ){}

    
  key!: string | null;

    meals$:Observable<Meal[]>=this.db.list<Meal>(`meals/${this.uid}`)//string interpolation for uid
      .valueChanges()
      .do((next)=>
    {       
    this.db.list<Meal>(`meals/${this.uid}`).snapshotChanges().subscribe(actions => {
      actions.map(action=> {
        for(let i in next){
              const value = action.payload.val();
              next[i].$key=actions[i].key; //= action.payload.key;      
           }
            }
      )     
      this.store.set('meals',next);             
    }
    );      
});      
    //requesting for list from db.
    //returns an array of meals.
    //meals - firebase endpoint
    //first thing we need to do is to set an observable string on this mealservice
   //when addMeal Fn calls, kicks of the meal$, list updated, rest of store updated 

    get uid(){
        return this.authService.user?.uid;
    }

    getMeal(key:string):Observable<any>{
      if(!key) return Observable.of({} as Meal); //passing an empty object
      return this.store.select<Meal[]>('meals')
     .filter(Boolean)
        .map(meals=>meals.find((meal:Meal)=>meal.$key===key));
    }

  
    //fn to add meal to firebase
    addMeal(meal:Meal){
     return this.db.list(`meals/${this.uid}`).push(meal);
    }  //using the same list as above, access the users id
        //returned to us by the get uid() fn
        // push method:to add anything to a list in firebase;here list is "meal"
        //here addMeal is "Thenable Reference";can use async await in component

    
    //fn to update meal
    updateMeal(key:string,meal:Meal){
      return this.db.list(`meals/${this.uid}`).update(key,meal);
    }
   
    //fn to remove meal
   removeMeal(key:any){
     return this.db.list(`meals/${this.uid}`).remove(key);
   }
  
    }

  




