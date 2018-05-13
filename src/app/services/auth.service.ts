import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { DatabaseService } from './database.service';
import { Observer } from 'firebase';
//import { Observable,  of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    currentUserFirebase;
    isLog: boolean;
    currentUser;
    private authState: AuthStateObserver = new AuthStateObserver(this);

    constructor(private fire: FirebaseService, private db: DatabaseService) {
        this.isLog=false;
        fire.auth().languageCode = 'pl';
    }

    public login(email: string, haslo: string):void{
        let x = this.fire.auth().signInWithEmailAndPassword(email, haslo).catch(function(error){ console.log(error); });
        //console.log(x);

        this.fire.auth().onAuthStateChanged(this.authState);

        this.fire.auth().onIdTokenChanged(function(user) {
          if (user) {
            console.log('token changed');
          }
        });

        //this.db.writeData('users',1,{"a":"b"});
        this.db.readList('users', false).subscribe(v => {
            console.log(v);
        });
    }

    public createUser(email: string, haslo: string):void{
        let x = this.fire.auth().createUserWithEmailAndPassword(email, haslo).catch(function(error){ console.log(error); });
        //console.log(x);
    }

    public isLogged(): boolean{
        return this.isLog;
    }

}

class AuthStateObserver implements Observer<any>{
    private parent: AuthService;

    constructor(parent){
        this.parent = parent;
    }

    public next(user:any){
        console.log('auth state changed');
        if(user){
            //console.log(user.email);
            //console.log(user.displayName);
            //console.log(user.uid);
            //console.log(user);
            //TODO sprawdzanie
            this.parent.isLog=true;
        }
        this.parent.currentUserFirebase = user;
    }

    public error(error){
        console.log('Error AuthStateObserver:');
        console.log(error);
    }

    public complete(){
        console.log('Complete function in AuthStateObserver');
    }
}
