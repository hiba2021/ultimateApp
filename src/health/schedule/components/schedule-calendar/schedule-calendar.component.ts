

import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleItem, ScheduleList } from 'src/health/shared/services/schedule/schedule.service';

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  template: `
    <div class="calendar">
      
      <schedule-controls
        [selected]="selectedDay"
        (move)="onChange($event)">
      </schedule-controls>

      <schedule-days
        [selected]="selectedDayIndex"
        (select)="selectDay($event)">
      </schedule-days>

      <schedule-section 
      *ngFor="let section of sections" 
      [name]="section.name"
      [section]="getSection(section.key)"
      (select)="selectSection($event,section.key)">
      </schedule-section>

    </div>
  `
})
export class ScheduleCalendarComponent implements OnChanges {

  selectedDayIndex!: number;
  selectedDay!: Date;
  selectedWeek!: Date;

  //to create an aarray to show different sections, sections=[];
  //key will tell us which section they are, and , name will give name of the section
  sections=[
      {key:'morning',name:'Morning'},
      {key:'lunch',name:'Lunch'},
      {key:'evening',name:'Evening'},
      {key:'snacks',name:'Snacks and Drinks'},
  ];


  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
    console.log(this.selectedDay,'this.selectedDay')
  }

  //input for items:the list for schedule

  @Input()
  items!:ScheduleList; // this is the type we need to create here for scehduleItem

  @Output()
  change = new EventEmitter<Date>();

  @Output()
  select=new EventEmitter<any>();//from child to parent,

  constructor() {}

  ngOnChanges() {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

//to get the sections, taking section name as string and we are going to call this interface ScheduleItem secified in sceduleService
getSection(name:string):ScheduleItem{//getting an individual ppty based on the key
return this.items && this.items[name] || {};//we need to create an input for these items
}

//fn name({}) means: destructuring
selectSection({type,assigned,data}:any,section:string){
const day=this.selectedDay;
this.select.emit({
    type, 
    assigned,
    section,
    day,
    data
});
}

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  private getToday(date: Date) {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }
    return today;
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

}
