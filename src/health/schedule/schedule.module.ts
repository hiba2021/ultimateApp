import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';

//components
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleSectionComponent } from './components/schedule-section/schedule-section.component';
import { ScheduleAssignComponent } from './components/schedule-assign/schedule-assign.component';

//shared modules
import { SharedModule } from '../shared/shared.module';

//containers
import { ScheduleComponent } from './container/shedule/schedule.component';

export const ROUTES:Routes=[
    {path:'', component:ScheduleComponent}
];


@NgModule({
    declarations:[
        ScheduleComponent,
        ScheduleCalendarComponent,
        ScheduleControlsComponent,
        ScheduleDaysComponent,
        ScheduleSectionComponent,
        ScheduleAssignComponent

    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),//use forchild to configure some routes for it on the object "ROUTES"
        SharedModule
    ],
    exports:[]
})

export class ScheduleModule{

}