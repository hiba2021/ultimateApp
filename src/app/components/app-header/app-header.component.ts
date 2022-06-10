import { User } from './../../../auth/shared/services/auth/auth.service';
import { Component, Input, Output,EventEmitter, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector:'app-header',
    styleUrls:['app-header.component.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush, //as we are using observables
    template:`
    <div class="app-header">
        <div class="wrapper">

      <img src="assets/img/logo.svg" alt="Angular logo">
      <div 
      class="app-header__user-info"
      *ngIf="user?.authenticated">
          <span (click)="logoutUser()"></span>

      </div>

        </div>
    </div>
    
    `
})

export class AppHeaderComponent{


    @Input()
    user!: User;

@Output()
logout=new EventEmitter<any>();

logoutUser(){
    this.logout.emit();
}

}