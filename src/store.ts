import { ScheduleItem } from 'src/health/shared/services/schedule/schedule.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import {distinctUntilChanged, pluck} from 'rxjs/operators';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/distinctUntilChanged';
import { User } from './auth/shared/services/auth/auth.service';

import { Meal } from './health/shared/services/meals/meals.service';
import { Workout } from './health/shared/services/workout/workout.service';

export interface State {
  user?:User,
  meals?:Meal[],
  selected:any,
  list:any,
  workouts?:Workout[],
 schedule?:ScheduleItem[],
  date?:Date,
  [key: string]: any
}

const state: State = {
 user:undefined, // initial state with undefined user
 meals:undefined,
 selected:undefined,
 list:undefined,
 date:undefined,
 workouts:undefined,
 schedule:undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
  //  console.log(this.subject.value,'value in store')
    return this.subject.value;

  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: any, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}
