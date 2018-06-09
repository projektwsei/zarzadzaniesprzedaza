import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { DatabaseService, TABLE_USERS } from './database.service';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {

    constructor(private db: DatabaseService) {
        
    }

    public getUserByUid(uid: string):Observable<any>{
        let ret = new Observable(observer => {
            this.db.readById(TABLE_USERS, uid, true).subscribe(val => {
                if(val==null){
                    observer.next(null);
                    observer.complete();
                } else {                
                    let u = new User();
                    u.uid = uid;
                    u.imieNazw = val.imieNazw;
                    u.isPotw = val.isPotw;
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

    public saveUser(u: User):void{
        this.db.updateData(TABLE_USERS, u.uid, u);
    }

    public potwierdzUser(u: User):void{
        u.isPotw=true;
        this.saveUser(u);
    }


}
