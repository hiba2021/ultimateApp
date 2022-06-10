//no routing here,
//include the reactiveformsmodule
import { NgModule,ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

//components
import { AuthFormComponent } from "./component/auth-form/auth-form.component";

//guards
import { AuthGuard } from "./guards/auth.guard"; 


//services
import { AuthService } from "./services/auth/auth.service";


@NgModule({ // we are not going to have providers as we will use that from shared module
    declarations:[
        AuthFormComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule
    ],
    exports:[
        AuthFormComponent
    ]
})

export class SharedModule{
    static forRoot(): ModuleWithProviders<any>{//forRoot() has the type modulewithproviders
        return{ 
            ngModule: SharedModule,
            providers:[
            AuthService, // registering AuthService as a provider on a static forroot ppty
            AuthGuard
            ]
        }
    } 
    }



