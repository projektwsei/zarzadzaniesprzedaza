import { Injectable } from '@angular/core';
import { DatabaseService, TABLE_FAKTURY } from './database.service';
import { Faktura } from '../model/faktura';
import { Observable } from 'rxjs';

@Injectable()
export class FakturyService {

    constructor(private db: DatabaseService) {
        
    }

    public addFaktura(f: Faktura):void{
        this.db.addData(TABLE_FAKTURY, f);
    }

    public updateFaktura(f: Faktura):void{
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
                    let entries = Object.entries(val);
                    for(let i=0;i<entries.length;i++){
                        let u = Object.assign(new Faktura, entries[i][1]);
                        u.id = Number(entries[i][0]);
                        tab.push(u);
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

    public getFakturaById(id: number):Promise<Faktura>{
        return this.getFakturaByIdObs(id, true).toPromise();
    }

    public getFakturaByIdObs(id: number, isOnce: boolean):Observable<Faktura>{
        let ret = new Observable<Faktura>(observer => {
            this.db.readById(TABLE_FAKTURY, id, isOnce).subscribe(val => {
                let obj = null;
                
                if(val) {
                    Object.assign(new Faktura, val);
                    val.id = id;
                }

                observer.next(obj);
                if(isOnce) {
                    observer.complete();
                }
            });
        });
        return ret;
    }
}
