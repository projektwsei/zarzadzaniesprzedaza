import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { DatabaseService, TABLE_USERS } from './database.service';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable()
export class UsersService {

    private currentUser: User = null;
    private currentUserFirebase = null;

    constructor(private db: DatabaseService, private fire: FirebaseService) {
        this.currentUser = new User();
    }

    public getUserByUid(uid: string):Observable<User|null>{//tylko zwracamy usera i od razu zakanczamy observer
        let ret = new Observable<User|null>(observer => {
            this.db.readById(TABLE_USERS, uid, true).toPromise().then(val => {
                if(val==null){
                    observer.next(null);
                    observer.complete();
                } else {                
                    let u = Object.assign(new User, val);
                    u.uid = uid;
                    observer.next(u);
                    observer.complete();
                }
            });
        });
        return ret;
    }

    public createUser(u: User):void{
        this.db.addData(TABLE_USERS, u);
    }

    public saveUser(u: User):void{//gdy zmieniamy imie i nazwisko uzywamy tego do zapisu
        this.db.updateData(TABLE_USERS, u.uid, u);
    }

    public deleteUser(u: User){
        u.deleted = true;
        this.saveUser(u);
    }

    public potwierdzUser(u: User):void{
        u.isPotw=true;
        this.saveUser(u);
    }

    public getUserList(isOnce: boolean):Observable<User[]>{//isOnce - czy pobieramy raz liste, czy subskrybujemy
        let ret = new Observable<User[]>(observer => {
            this.db.readList(TABLE_USERS, isOnce).subscribe(val => {
                let tab = [];
    
                if(val) {
                    let entries = Object.entries(val);
                    for(let i=0;i<entries.length;i++){
                        let u = Object.assign(new User, entries[i][1]);
                        u.uid = entries[i][0];
                        if(!u.deleted) tab.push(u);
                    }
                }
                
                observer.next(tab);
                if(isOnce) {
                    observer.complete();
                }
            });
        });
        return ret;
    }

    public zmienHaslo(pass: string):void{
        //this.fire.auth().updateUser(u.uid, { password: pass }); //nie dziala
        this.currentUserFirebase.updatePassword(pass);
    }

    public setCurrentUser(u: User){//aktualnego usera wpisujemy do cache, by byl dostep synchroniczny, a nie przez observable lub promise
        this.currentUser = u;
    }

    public getCurrentUser():User{//aktualny user
        return this.currentUser;
    }

    public setCurrentUserFirebase(uf){
        this.currentUserFirebase = uf;
    }

    public getCurrentUserFirebase(){
        return this.currentUserFirebase;
    }

}
