import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../../../auth/shared/services/auth/auth.service';
import { Injectable } from "@angular/core";
import { Store } from "src/store";
import { AngularFireDatabase, snapshotChanges} from 'angularfire2/database';

import 'rxjs/add/operator/do';
import 'rxjs/add/Observable/of';
import 'rxjs/add/operator/filter';



export interface Workout{
name:string,
type:string, // endurance | strength type 
strength:any,
endurance:any,
timestamp:number,
$key:string |null ,//coz of firebase
$exists:()=>boolean //$exists is a fn which returns a boolean.
}


@Injectable(
)

export class WorkoutsService{

    constructor(
        private store:Store,//to store the list of meals in the reactive store.
        private db:AngularFireDatabase,// to interact with the angular fire database.
        private authService:AuthService,
        private route:ActivatedRoute
       
    ){}

    

   workouts$:Observable<Workout[]>=this.db.list<Workout>(`workouts/${this.uid}`)//string interpolation for uid
      .valueChanges()
      .do((next)=>
    {       
    this.db.list<Workout>(`workouts/${this.uid}`).snapshotChanges().subscribe(actions => {
      actions.map(action=> {
        for(let i in next){
              const value = action.payload.val();
              next[i].$key=actions[i].key; //= action.payload.key;      
           }
            }
      )     
      this.store.set('workouts',next);             
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

    getWorkout(key:string):Observable<any>{
      if(!key) return Observable.of({} as Workout); //passing an empty object
      return this.store.select<Workout[]>('workouts')
     .filter(Boolean)
        .map(workouts=>workouts.find((workout:Workout)=>workout.$key===key));
    }

  
    //fn to add workout to firebase
    addWorkout(workout:Workout){
     return this.db.list(`workouts/${this.uid}`).push(workout);
    }  //using the same list as above, access the users id
        //returned to us by the get uid() fn
        // push method:to add anything to a list in firebase;here list is "workout"
        //here addWorkout is "Thenable Reference";can use async await in component

    
    //fn to update workout
    updateWorkout(key:string,workout:Workout){
      return this.db.list(`workouts/${this.uid}`).update(key,workout);
    }
   
    //fn to remove workout
   removeWorkout(key:any){
     return this.db.list(`workouts/${this.uid}`).remove(key);
   }
  
    }

  




