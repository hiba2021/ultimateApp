// here meals , scedule and workout are dependent on each other
//i.e we need to preload the data when we access either components
//so we need a shared module
// we include a shared module in the feature module:health
//no routing here
import { NgModule,ModuleWithProviders } from "@angular/core";

import { CommonModule } from "@angular/common"; // to use some directives
import { RouterModule } from "@angular/router";

//third-party modules
import { AngularFireDatabaseModule } from "angularfire2/database";//to make use of seome srvices

//components-we need a component reusable for meals and workouts
import { ListItemComponent } from "./components/list-item/list-item.component";

//services
import { MealsService } from "./services/meals/meals.service";
import { WorkoutsService } from "./services/workout/workout.service";
import { ScheduleService } from "./services/schedule/schedule.service";

//pipes
import { JoinPipe } from "./pipes/join.pipe";
import { WorkoutPipe } from "./pipes/workout.pipe";

@NgModule({ // we are not going to have providers as we will use that from shared module
    declarations:[    
        ListItemComponent,
        JoinPipe,
        WorkoutPipe 
    ],
    imports:[
        CommonModule,
        RouterModule,
        AngularFireDatabaseModule

       
    ],
    exports:[
        ListItemComponent,
        JoinPipe,
        WorkoutPipe
    ]
})

export class SharedModule{
    static forRoot(): ModuleWithProviders<any>{//forRoot() has the type modulewithproviders
        return{ 
            ngModule: SharedModule,
            providers:[
            MealsService,
            WorkoutsService,
            ScheduleService
            ]
        }
    } 
    }




