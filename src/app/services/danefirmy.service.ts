import { Injectable } from '@angular/core';
import { DatabaseService, TABLE_DANE_FIRMY } from './database.service';
import { DaneFirmy } from '../model/danefirmy';
import { Observable } from 'rxjs';

@Injectable()
export class DaneFirmyService {

    constructor(private db: DatabaseService) {
        this.db.readList(TABLE_DANE_FIRMY, true).toPromise().then( (val) => {
            if(!val){//jesli nie ma danych firmy, stworz je
                let dane = new DaneFirmy();
                this.saveDaneFirmy(dane);
            }
        });
    }

    public saveDaneFirmy(d: DaneFirmy):void{
        this.db.updateData(TABLE_DANE_FIRMY, 0, d);
    }

    public getDaneFirmy():Promise<DaneFirmy>{
        return new Promise<DaneFirmy>((resolve, reject) => {
            this.db.readList(TABLE_DANE_FIRMY, true).toPromise().then( (val) => {
                if(val) Object.assign(new DaneFirmy, val);
                else val = new DaneFirmy();//jesli nie utworzylismy danych, zwroc puste dane
                resolve(val);
            });
        });
    }

    public getDaneFirmyObs(isOnce: boolean):Observable<DaneFirmy>{//jako observable
        return new Observable<DaneFirmy>(obs => {
            /*let sub = */this.db.readList(TABLE_DANE_FIRMY, isOnce).subscribe(val => {
                if(val) val = Object.assign(new DaneFirmy, val);
                else val = new DaneFirmy();//jesli nie utworzylismy danych, zwroc puste dane
                
                obs.next(val);
                if(isOnce) {
                    obs.complete();
                    //sub.unsubscribe();
                }
            });
        });
    }
}
