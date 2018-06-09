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
        this.bState = new BehaviorSubject<LoginState>(new LoginState(AUTH_WAITING, null, null));//pusty state jako wartosc startowa - niezalogowany

        this.fire.auth().onAuthStateChanged((user) => {
            //this.currentUserFirebase = user;
            if(user){
                this.users.getUserByUid(user.uid).subscribe(val => {
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
                            this.bState.next(new LoginState(AUTH_ONLY_VALID, val, user));//niepotwierdzony user
                        } else {
                            this.bState.next(new LoginState(AUTH_LOGIN_OK, val, user));
                        }
                    }
                });
            } else {
                this.bState.next(new LoginState(AUTH_INVALID,null,null));         
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

    public loginWithGoogle():void{
        let provider = this.fire.getGoogleAuthProvider();
        this.fire.auth().signInWithPopup(provider).then((result) => {
            let token = result.credential.accessToken; // This gives you a Google Access Token. You can use it to access the Google API.
            let user = result.user; // The signed-in user info.
            
            if(user.displayName) this.creatingImieNazw = user.displayName; //jako imie i nazwisko uzywamy danych z konta google
            else this.creatingImieNazw = '';
            
        }).catch(function(error) { console.log(error); });
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
            this.bState.next(new LoginState(AUTH_LOGGEDOUT, null, null));
        }).catch(function(error) { console.log(error); });
    }

    //TODO dodanie jakiegoś observable (lub czegoś), aby asynchronicznie wyciągnąć informacje o przebiegu logowania
    /*public waitForLogin(): Observable<any>{ //TODO: to jest tylko testowe rozwiazanie, trzeba wymyslic cos innego!
        let ret = new Observable(observer => {
            let probyIsValid = 0;
            let interval = setInterval( () => {
                if(this.isValid()){
                    if(this.isLogged()){
                        observer.next(AUTH_LOGIN_OK);
                        observer.complete();
                        clearInterval(interval);
                    } else {
                        if(probyIsValid>1) {//2 proby, bo moze zdarzyc sie, ze jednak nie zdazymy wykonac pobrania info z bazy firebase
                            observer.next(AUTH_ONLY_VALID);
                            observer.complete();
                            clearInterval(interval)
                        } else probyIsValid++;
                    }
                }//isValid?
            }, 200);
        });
        return ret;
    }*/

    public getLoginState(): BehaviorSubject<LoginState>{
        return this.bState;
    }

    public getLastLoginState(): LoginState{
        return this.bState.getValue();
    }

}

export class LoginState{
    public state: number; //AUTH_ONLY_VALID lub AUTH_LOGIN_OK
    public dbUser: User;
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

export const AUTH_WAITING: number = 0; //oczekiwanie - brak danych dot logowania
export const AUTH_INVALID: number = 1; //nie zalogowano
export const AUTH_ONLY_VALID: number = 2;//email i haslo sie zgadza, jednak uzytkownik nie jest potwierdzony
export const AUTH_LOGIN_OK: number = 3;//zalogowano poprawnie
export const AUTH_NEWUSER: number = 4;//stworzony nowy uzytkownik
export const AUTH_LOGGEDOUT: number = 5;//wylogowano usera

