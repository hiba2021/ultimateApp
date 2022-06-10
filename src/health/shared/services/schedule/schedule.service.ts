import { AuthService } from './../../../../auth/shared/services/auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Workout } from './../workout/workout.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Store } from 'src/store';
import { Meal } from '../meals/meals.service';
import 'rxjs/add/operator/withLatestFrom';

export interface ScheduleItem{
meals:Meal[] | null,
workouts:Workout[] |null,
section:string,
timestamp:number,
$key?:string |null
}

export interface ScheduleList{
    morning?:ScheduleItem,
    lunch?:ScheduleItem,
    evening?:ScheduleItem,
    snacks?:ScheduleItem,
    [key:string]:any //inorder to look up for a key
}

@Injectable()
export class ScheduleService{

    private date$= new BehaviorSubject(new Date());//initializing the behaviour subject with a new Date given as its argument
    private section$ = new Subject();
    private itemsList$ = new Subject();


    items$=this.itemsList$.withLatestFrom(this.section$)
            .map(([items,section]:any)=>{
                //we are looking if the section$ has a key ppty
                const id=items.$key;
                
                const defaults:ScheduleItem = {
                    workouts:section.type ,
                    meals:section.type,
                    section:section.section,
                    timestamp:new Date(section.day).getTime(),
                };
                console.log(defaults,'defaults');
                console.log(items,'items');
                console.log(id,'id');
                console.log(defaults.section,'section');


                const payload = {
                    //object spread ; if there is an id we want to use the section.data otherwise we want to use our defaults.
                    ...(id ? section.data:defaults),
                    ...items
                };
                console.log(items,'payload');

                if(id){
                    //we need to return the below to our observable stream
                    console.log('id ulla case')
                    return this.updateSection(id,payload);
                }
                else{
                    console.log('id illatha case');
                    return this.createSection(payload);
                }

            })

    selected$ = this.section$
    .do((next: any) => this.store.set('selected', next));

    list$ = this.section$
    .map((value:any)=>this.store.value[value.type])
    .do((next: any) =>
    {
        this.store.set('list', next);
        console.log(next,'next');
    } );

    // we want access to the date in this schedule$
    //the reason for giving this.date$ foe schedule$ is that it has to be notified whenever there is change in the date$ behaviourSubject

    schedule$: Observable<any>=this.date$
                .do((next:any)=>this.store.set('date',next))

                .map((day:any)=>{

                    //calculate few things for firebase

                    const startAt=(
                        new Date(day.getFullYear(),day.getMonth(),day.getDate())
                    ).getTime(); 
                    // some kind of date logic, any time we update the date$, we want to go to firebase
                    //make a request between a specific timestamp

                    const endAt=(
                        new Date(day.getFullYear(),day.getMonth(),day.getDate()+1)
                    ).getTime()-1; 

                    console.log(startAt,endAt,'helloons');
                    return {startAt,endAt}; // goin to return this object to the next item in the stream
                });

                // //doing object destructuring here in switchMap,asking for startAt and the endAt ppty
                // .switchMap(async ({ startAt, endAt }:any) => this.getSchedule(startAt, endAt))
                
                // .map((data:any)=>{
                //     const mapped:ScheduleList={};//empty value
                    
                //     for (const prop of data){
                //         if(!mapped[prop.section]){//if property not set
                //             mapped[prop.section]=prop;
                //         }
                //     }

                //     return mapped;
                // })
                
                // .do((next:any)=>this.store.set('schedule',next));



    //  schedule$: Observable<any>=this.date$
    //             .do((next:any)=>this.store.set('schedule',next))


constructor(
        private store:Store,
        private db:AngularFireDatabase,
        private authService:AuthService
    ){}

    get uid(){
        return this.authService.user?.uid;
    }

    updateDate(date:Date){
        //we can have new values for the date$ behavioursubject as it is an observable
        this.date$.next(date);//set a new date item in our store
        console.log(this.date$,'updateDate');
    }

    selectSection(event: any) {
        this.section$.next(event);
      }
      
   private getSchedule(startAt:number,endAt:number){
    //need to go to firebase to request that piece of information
    return this.db.list(`schedule/${this.uid}`).query.orderByChild('timestamp').startAt(startAt).endAt(endAt)
    
    }

    updateItems(items:string[]){
        console.log(items,'dhsbsjfcvbzshvzh');

        this.itemsList$.next(items);
        console.log(this.itemsList$,'itemslist');

    }

    createSection(payload:ScheduleItem){
        return this.db.list(`schedule/${this.uid}`).push(payload);  
    }

    updateSection(key:string,payload:ScheduleItem){
        console.log(this.db.object(`schedule/${this.uid}/${key}`).update(payload),'updateSection');
        return this.db.object(`schedule/${this.uid}/${key}`).update(payload);
    }
}