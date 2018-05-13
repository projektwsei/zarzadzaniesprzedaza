import { Injectable } from '@angular/core';
//import { FirebaseService } from './firebase.service';
import { DatabaseService } from './database.service';
//import { Observer } from 'firebase';
//import { Observable,  of } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    //currentUserFirebase;
    //isLog: boolean;
    //currentUser;
    //private authState: AuthStateObserver = new AuthStateObserver(this);*/

    constructor(private db: DatabaseService) {
        //this.isLog=false;
        //fire.auth().languageCode = 'pl';
    }

    public login(login: string, haslo: string):void{
        //TODO
    }

    public createUser(login: string, haslo: string, email: string, imieNazw: string):void{
        let user = new User();
        user.login = login;
        user.email = email;
        user.imieNazw = imieNazw;
        user.isPotw = false;

        user.setPassword(haslo);

        //TODO set to database
    }

    //public isLogged(): boolean{
    //    return this.isLog;
    //}

}
