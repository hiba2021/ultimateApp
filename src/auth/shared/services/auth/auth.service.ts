import { Store } from 'src/store';

//share this service btw the login and register modules
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";



import 'rxjs/add/operator/do';

export interface User{
    email:string | null,
    uid:string,
    authenticated:boolean //will be true when the user log in
}

@Injectable()
export class AuthService{
//here we declare an angularfire authstate observable,
//which will get fired everytime the authentication state changes.
//here instead of subscribe, using the "do" operator to set a side effect
//to set this authstate into the store.
//subscribing to the authState to store to auth$
auth$=this.af.authState //we have to initialize AUTH OBSERVABLE IN THE APP.COMPONENT
// the above statement kicks off,if it is login or register
       .do(next=>{ // here next is the firebase user

        if(!next)// no next means user has not logged in yet
        {
            this.store.set('user',null); //setting the user to null
            return;
        }

        const user:User={
            email:next.email,
            uid:next.uid,
            authenticated:true

        };

        this.store.set('user',user);// pass in the user object whatever be it

       })

    constructor(
        private af:AngularFireAuth,
        private store:Store
    ){}

    get authState(){
        return this.af.authState;//here authState is an observable
    }

    get user(){ //accessing the user ppty
        return this.af.auth.currentUser
    }


    /////////// two fns to set up the authentication
createUser(email:string,password:string){
    return this.af.auth.createUserWithEmailAndPassword(email,password);
} // returns a promise not an observable, can use async await feature


loginUser(email:string,password:string){
    return this.af.auth.signInWithEmailAndPassword(email,password);
}

/////////////////////////

logoutUser(){
    return this.af.auth.signOut();
}

}