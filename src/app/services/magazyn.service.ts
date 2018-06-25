import { Injectable } from '@angular/core';
import { DatabaseService, TABLE_MAGAZYN } from './database.service';
import { Przedmiot } from '../model/przedmiot';
import { Observable } from 'rxjs';
import { FakturyService } from '../services/faktury.service';

@Injectable()
export class MagazynService {

    constructor(private db: DatabaseService, private faktury: FakturyService) {
        
    }

    public addPrzedmiot(f: Przedmiot):void{
        this.db.addData(TABLE_MAGAZYN, f);
    }

    public updatePrzedmiot(f: Przedmiot):void{
        this.db.updateData(TABLE_MAGAZYN, f.id, f);
    }

    public deletePrzedmiot(f: Przedmiot){
        this.db.deleteById(TABLE_MAGAZYN, f.id);    
    }

    public deletePrzedmiotById(id: number){
        this.db.deleteById(TABLE_MAGAZYN, id);
    }

    public getPrzedmiotyList():Promise<Przedmiot[]>{
        return this.getPrzedmiotyListObs(true).toPromise();
    }

    public getPrzedmiotyListObs(isOnce: boolean):Observable<Przedmiot[]>{//isOnce - czy pobieramy raz liste, czy subskrybujemy
        let ret = new Observable<Przedmiot[]>(observer => {
            let sub = this.db.readList(TABLE_MAGAZYN, isOnce).subscribe(val => {
                let tab = [];
    
                if(val) {
                    let entries = Object.entries(val);
                    for(let i=0;i<entries.length;i++){
                        let u = Object.assign(new Przedmiot, entries[i][1]);
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

    public getPrzedmiotById(id: number):Promise<Przedmiot>{
        return this.getPrzedmiotByIdObs(id, true).toPromise();
    }

    public getPrzedmiotByIdObs(id: number, isOnce: boolean):Observable<Przedmiot>{
        let ret = new Observable<Przedmiot>(observer => {
            this.db.readById(TABLE_MAGAZYN, id, isOnce).subscribe(val => {
                let obj = null;
                
                if(val) {
                    Object.assign(new Przedmiot, val);
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

    //inne funkcje zw. z przedmiotami
    
    //ilośc. UWAGA - dla usługi (przedmiot.czyUsluga==true) nie pobieramy ilosci!!!
    public getQuantity(p: Przedmiot):Promise<number>{
        return this.getQuantityObs(p, true).toPromise();
    }

    public getQuantityById(id: number):Promise<number>{
        return this.getQuantityByIdObs(id, true).toPromise();
    }

    public getQuantityObs(p: Przedmiot, isOnce: boolean):Observable<number>{
        return this.getQuantityByIdObs(p.id, isOnce);
    }

    public getQuantityByIdObs(id: number, isOnce: boolean):Observable<number>{
        return new Observable<number>(obs => {
            this.faktury.getFakturyListObs(isOnce).subscribe(val => {
                let ilosc = 0;
            
                for(let i=0;i<val.length;i++){
                    let przedm = val[i].getPrzedmiotyById(id);
                    for(let j=0;j<przedm.length;j++){
                        if(val[i].czyStrata) ilosc -= przedm[j].ilosc; //strata w magazynie
                        else if(val[i].czyKoszt) ilosc += przedm[j].ilosc; //zakup przedmiotu
                        else ilosc -= przedm[j].ilosc; //ilosc 
                    }
                }
                                
                obs.next(ilosc);
                if(isOnce){
                    obs.complete();
                }
            });
        });
    }
}
