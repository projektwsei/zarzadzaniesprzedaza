import { Injectable } from '@angular/core';
import { DatabaseService, TABLE_FAKTURY } from './database.service';
import { Faktura } from '../model/faktura';
import { Observable } from 'rxjs';

@Injectable()
export class FakturyService {

    constructor(private db: DatabaseService) {
        
    }

    public addFaktura(f: Faktura):void{
        f.dateToNumber();
        this.db.addData(TABLE_FAKTURY, f);
    }

    public updateFaktura(f: Faktura):void{
        f.dateToNumber();
        this.db.updateData(TABLE_FAKTURY, f.id, f);
    }

    public deleteFaktura(f: Faktura){
        this.db.deleteById(TABLE_FAKTURY, f.id);    
    }

    public deleteFakturaById(id: number){
        this.db.deleteById(TABLE_FAKTURY, id);
    }

    public getFakturyList():Promise<Faktura[]>{
        return this.getFakturyListObs(true).toPromise();
    }

    public getFakturyListObs(isOnce: boolean):Observable<Faktura[]>{//isOnce - czy pobieramy raz liste, czy subskrybujemy
        let ret = new Observable<Faktura[]>(observer => {
            this.db.readList(TABLE_FAKTURY, isOnce).subscribe(val => {
                let tab = [];
    
                if(val) {
                    for(let i=0;i<val.length;i++){
                        if(val[i]){
                            let u = Object.assign(new Faktura, val[i]);
                            u.id = i;
                            u.numberToDate();
                            tab.push(u);
                        } //else tab.push(null);
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
}
