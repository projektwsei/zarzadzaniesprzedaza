import { Injectable } from '@angular/core';
import { DatabaseService, TABLE_KONTRAHENCI } from './database.service';
import { Kontrahent } from '../model/kontrahent';
import { Observable } from 'rxjs';

@Injectable()
export class KontrahenciService {

    constructor(private db: DatabaseService) {

    }

    public addKontrahent(f: Kontrahent):void{
        this.db.addData(TABLE_KONTRAHENCI, f);
    }

    public updateKontrahent(f: Kontrahent):void{
        this.db.updateData(TABLE_KONTRAHENCI, f.id, f);
    }

    public deleteKontrahent(f: Kontrahent){
        this.db.deleteById(TABLE_KONTRAHENCI, f.id);    
    }

    public deleteKontrahentById(id: number){
        this.db.deleteById(TABLE_KONTRAHENCI, id);
    }

    public getKontrahenciList():Promise<Kontrahent[]>{
        return this.getKontrahenciListObs(true).toPromise();
    }

    public getKontrahenciListObs(isOnce: boolean):Observable<Kontrahent[]>{//isOnce - czy pobieramy raz liste, czy subskrybujemy
        let ret = new Observable<Kontrahent[]>(observer => {
            let sub = this.db.readList(TABLE_KONTRAHENCI, isOnce).subscribe(val => {
                let tab = [];
    
                if(val) {
                    for(let i=0;i<val.length;i++){
                        if(val[i]){
                            let u = Object.assign(new Kontrahent, val[i]);
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
