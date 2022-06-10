import { Router } from '@angular/router';
import { AuthService,User } from './../auth/shared/services/auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from 'src/store';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>

  <app-header
   [user]="user$ |async"
   (logout)="onLogout()"
   >
   <!-- here [user]is the input property in the appheadercomponent -->
    <!-- user$|async is the observable in the appcomponent -->
    <!-- on using th onpush detection the component will make changes only when the input tells it -->
   
    
  </app-header>

  <app-nav *ngIf="(user$|async)?.authenticated"> 
    <!-- i.e app-nav will only display if user is authenticated -->
  </app-nav>

    <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit,OnDestroy {

  //set up our user property, an observable of type User
  user$!: Observable<User>;
  //subscription of type Subscription.
  subscription!: Subscription;// to boot up authservice observable auth$ 


  constructor(
    private store:Store,
    private router:Router,
    private authService:AuthService
  ) {}

ngOnInit(){
//to get auth$ of authservice working,we need to subscribe to it.
this.subscription=this.authService.auth$.subscribe();//will initiate the dataflow for the subscription.
                                                       //will initiate the auth observable.

  this.user$=this.store.select<User>('user');                                                     

}                                                    

ngOnDestroy(){
this.subscription.unsubscribe();
}

async onLogout(){
   await this.authService.logoutUser();
   // we need to redirect, so we need to inject a router
   this.router.navigate(['/auth/login']);
}



}


