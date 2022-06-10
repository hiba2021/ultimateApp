import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CommonModule } from "@angular/common";
import { NgModule} from "@angular/core";

//third party modules
import {AngularFireModule,FirebaseAppConfig} from 'angularfire2';
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";


//shared modules
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environments/environment';


export const ROUTES : Routes =[
    {
        path:'auth',
        children:[
            { path:'', pathMatch:'full',redirectTo:'login'},
            {path:'login', loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)},
            {path:'register', loadChildren:()=>import('./register/register.module').then(m=>m.RegisterModule)}
        ]
    }
] ;

// export const firebaseConfig:FirebaseAppConfig = {
//     apiKey: "AIzaSyC3tE2dXRNZ_LbVeb2PBjmT9WQliI7rd1Y",
//     authDomain: "fitnessapp-640d8.firebaseapp.com",
//     databaseURL: "https://fitnessapp-640d8-default-rtdb.firebaseio.com",
//     projectId: "fitnessapp-640d8",
//     storageBucket: "fitnessapp-640d8.appspot.com",
//     messagingSenderId: "82333335683",
//     appId: "1:82333335683:web:d1213446e8bff2cf2ddbb6",
//     measurementId: "G-9LBG37YHMC"
//   };


@NgModule({  // this Ngmodule has no providers or decorators
    declarations:[],
    imports:[
        CommonModule,
        RouterModule.forChild(ROUTES),
        AngularFireModule.initializeApp(environment.firebaseConfig),//initialize the app with our firebase configuration
       AngularFireAuthModule,
        AngularFireDatabaseModule,
        SharedModule.forRoot() // to avoid a duplicate instance of our authservice
    ]
})

export class AuthModule{}


