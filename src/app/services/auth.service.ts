import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service'
//import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private currentUserFirebase;
    private isLog: boolean;

    constructor(private fire: FirebaseService) {
        this.isLog=false;
    }

    public login(email: string, haslo: string):void{
        let x = this.fire.auth().signInWithEmailAndPassword(email, haslo).catch(function(error){ console.log(error); });
        //console.log(x);

        this.fire.auth().onAuthStateChanged(this.authStateChanged);

    }

    public createUser(email: string, haslo: string):void{
        let x = this.fire.auth().createUserWithEmailAndPassword(email, haslo).catch(function(error){ console.log(error); });
        //console.log(x);
    }

    private authStateChanged(user):void{//zmieniono stan autoryzacji
        console.log('auth state changed');
        if(user) {
            console.log(user.email);
            //TODO sprawdzanie
            this.isLog=true;
        }
        this.currentUserFirebase = user;
    }

    public isLogged(): boolean{
        return this.isLog;
    }

}
