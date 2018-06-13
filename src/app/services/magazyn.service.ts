import { Injectable } from '@angular/core';
import { DatabaseService, TABLE_MAGAZYN } from './database.service';
import { Przedmiot } from '../model/przedmiot';
import { Observable } from 'rxjs';

@Injectable()
export class MagazynService {

    constructor(private db: DatabaseService) {
        
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
                    for(let i=0;i<val.length;i++){
                        if(val[i]){
                            let u = Object.assign(new Przedmiot, val[i]);
                            u.id = i;
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
