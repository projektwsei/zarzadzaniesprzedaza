import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { DatabaseService } from './database.service';
import { UsersService } from './users.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../model/user';

@Injectable()
export class AuthService {
    //private currentUserFirebase;
    //private currentUser: User;
    private creatingImieNazw: string; //przy tworzeniu nowego uzytkownika tutaj jest imie i nazwisko zapisywane w naszej bazie

    private bState: BehaviorSubject<LoginState>;

    constructor(private fire: FirebaseService, private db: DatabaseService, private users: UsersService) {
        fire.auth().languageCode = 'pl';
        //this.currentUserFirebase = null;
        //this.currentUser = null;
        this.creatingImieNazw = '';
        this.bState = new BehaviorSubject<LoginState>(new LoginState(AUTH_NOT_LOGGED, null, null));//wartosc startowa - niezalogowany

        this.fire.auth().onAuthStateChanged((user) => {
            //this.currentUserFirebase = user;
            if(user){
                this.users.getUserByUid(user.uid).toPromise().then(val => {
                    if(val==null){//jezeli NULL, to nowy uzytkownik, dodaj go do bazy jako niepotwierdzony:
                        let u = new User();
                        u.uid = user.uid;
                        u.imieNazw = this.creatingImieNazw;
                        u.isPotw = false;
                        this.users.createUser(u);
                        //this.currentUser = u;

                        console.log("Utworzono nowe konto uzytkownika w bazie danych");
                        
                        this.bState.next(new LoginState(AUTH_NEWUSER, u, user));
                    } else {
                        //this.currentUser = val;  
                        if(val.isPotw){
                            this.bState.next(new LoginState(AUTH_LOGIN_OK, val, user));//niepotwierdzony user
                        } else {
                            this.bState.next(new LoginState(AUTH_ONLY_VALID, val, user));
                        }
                    }
                });
            } else {
                this.bState.next(new LoginState(AUTH_NOT_LOGGED,null,null));  //user null oznacza niezalogowany       
            }
        });
    }

    public login(email: string, haslo: string):void{
        this.fire.auth().signInWithEmailAndPassword(email, haslo).catch((error)=>{ 
            this.bState.next(new LoginState(AUTH_INVALID,null,null));
            console.log(error); 
        });
    }

    public createUser(email: string, haslo: string, imieNazw: string):void{
        this.creatingImieNazw = imieNazw;  
        this.fire.auth().createUserWithEmailAndPassword(email, haslo).catch((error)=>{ 
            this.bState.next(new LoginState(AUTH_INVALID,null,null));
            console.log(error); 
        });
    }

    public loginWithGoogle():void{
        let provider = this.fire.getGoogleAuthProvider();
        this.fire.auth().signInWithPopup(provider).then((result) => {
            let token = result.credential.accessToken; // This gives you a Google Access Token. You can use it to access the Google API.
            let user = result.user; // The signed-in user info.
            
            if(user.displayName) this.creatingImieNazw = user.displayName; //jako imie i nazwisko uzywamy danych z konta google
            else this.creatingImieNazw = '';
            
        }).catch((error)=>{ 
            this.bState.next(new LoginState(AUTH_INVALID,null,null));
            console.log(error); 
        });
    }

    /*public isLogged(): boolean{
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
    }*/

    public logout(): void{
        this.fire.auth().signOut().then(() => {
            this.bState.next(new LoginState(AUTH_NOT_LOGGED, null, null));
        }).catch((error)=>{ console.log(error); });
    }

    public getLoginState(): BehaviorSubject<LoginState>{
        return this.bState;
    }

    public getLastLoginState(): LoginState{
        return this.bState.getValue();
    }

}

export class LoginState{
    public state: number; //to co na dole, te wartosci const
    public dbUser: User; //obiekt user z bazy danych (wyciagamy z niego imie i nazwisko)
    public firebaseUser; //jakbysmy potrzebowali - obiekt firebase

    /*constructor(){
        this.state = AUTH_WAITING;
        this.dbUser = null;
        this.firebaseUser = null;
    }

    constructor(state: number){
        this.state = state;
        this.dbUser = null;
        this.firebaseUser = null;
    }*/

    constructor(state: number, dbUser: User, firebaseUser){
        this.state = state;
        this.dbUser = dbUser;
        this.firebaseUser = firebaseUser;
    }
}

export const AUTH_NOT_LOGGED: number = 0; //niezalogowano
export const AUTH_INVALID: number = 1; //blad logowania
export const AUTH_ONLY_VALID: number = 2;//email i haslo sie zgadza, jednak uzytkownik nie jest potwierdzony
export const AUTH_LOGIN_OK: number = 3;//zalogowano poprawnie
export const AUTH_NEWUSER: number = 4;//stworzony nowy uzytkownik
//export const AUTH_LOGGEDOUT: number = 6;//wylogowano usera

