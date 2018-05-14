import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { DatabaseService } from './database.service';
import { UsersService } from './users.service';
//import { Observer } from 'firebase';
//import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private currentUserFirebase;
    private currentUser: User;
    private creatingImieNazw: string;

    constructor(private fire: FirebaseService, private db: DatabaseService, private users: UsersService) {
        fire.auth().languageCode = 'pl';
        this.currentUserFirebase = null;
        this.currentUser = null;

        this.fire.auth().onAuthStateChanged((user) => {
            this.currentUserFirebase = user;
            if(user){
                this.users.getUserByUid(user.uid).subscribe(val => {
                    if(val==null){//jezeli NULL, to nowy uzytkownik, dodaj go do bazy jako niepotwierdzony:
                        let u = new User();
                        u.uid = user.uid;
                        u.imieNazw = this.creatingImieNazw;
                        u.isPotw = false;
                        this.users.createUser(u);
                        this.currentUser = u;

                        console.log("Utworzono nowe konto uzytkownika w bazie danych");
                        console.log(user);
                    } else {
                        this.currentUser = val;  

                        console.log(this.currentUser);
                        console.log(user);  
                    }
                });
            }
        });
    }

    public login(email: string, haslo: string):void{
        this.fire.auth().signInWithEmailAndPassword(email, haslo).catch(function(error){ console.log(error); });
    }

    public createUser(email: string, haslo: string, imieNazw: string):void{
        this.fire.auth().createUserWithEmailAndPassword(email, haslo).catch(function(error){ console.log(error); });
        this.creatingImieNazw = imieNazw;        
    }

    public isLogged(): boolean{
        if(this.currentUser==null) return false;
        return this.currentUser.isPotw; //jezeli user jest potwierdzony, to jest mozliwosc zalogowania sie, inaczej nie ma opcji
    }

    public getCurrentUserUid():string|null{
        if(this.currentUser==null) return null;
        return this.currentUser.uid; //zwroc unikalne UID uzytkownika
    }

    public getImieNazw():string{//pobierz imie i nazwisko aktualnie zalogowanego usera
        return this.currentUserFirebase.displayName;
    }

    public isValid(): boolean{//czy uzytkownik jest poprawny (ale nie musi byc zalogownay, po prostu moze miec niepotwierdzona rejestracje)
        if(this.currentUserFirebase==null) return false;
        else return true;
    }

    public logout(): void{
        this.fire.auth().signOut().then(() => {
            this.currentUser = null;
            this.currentUserFirebase = null;
        }).catch(function(error) { console.log(error); });
    }

}
