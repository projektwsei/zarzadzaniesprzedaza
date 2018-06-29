import { Injectable } from '@angular/core';
import { DatabaseService, TABLE_KONTRAHENCI } from './database.service';
import { Kontrahent } from '../model/kontrahent';
import { Observable } from 'rxjs';
import { FakturyService } from './faktury.service';

@Injectable()
export class KontrahenciService {

    constructor(private db: DatabaseService, private fakt: FakturyService) {

    }

    public addKontrahent(f: Kontrahent): void {
        this.db.addData(TABLE_KONTRAHENCI, f);
    }

    public updateKontrahent(f: Kontrahent): void {
        this.db.updateData(TABLE_KONTRAHENCI, f.id, f);
    }

    public deleteKontrahent(f: Kontrahent) {
        this.db.deleteById(TABLE_KONTRAHENCI, f.id);
    }

    public deleteKontrahentById(id: number) {
        this.db.deleteById(TABLE_KONTRAHENCI, id);
    }

    public getKontrahenciList(): Promise<Kontrahent[]> {
        return this.getKontrahenciListObs(true).toPromise();
    }

    public getKontrahenciListObs(isOnce: boolean): Observable<Kontrahent[]> {// isOnce - czy pobieramy raz liste, czy subskrybujemy
        const ret = new Observable<Kontrahent[]>(observer => {
            const sub = this.db.readList(TABLE_KONTRAHENCI, isOnce).subscribe(val => {
                const tab = [];

                if (val) {
                    const entries = Object.entries(val);
                    for (let i = 0; i < entries.length; i++) {
                        const u = Object.assign(new Kontrahent, entries[i][1]);
                        u.id = Number(entries[i][0]);
                        tab.push(u);
                    }
                }

                observer.next(tab);
                if (isOnce) {
                    observer.complete();
                }
            });
        });
        return ret;
    }

    public getKontrahentById(id: number){//:Promise<Kontrahent>{
        return this.getKontrahentByIdObs(id, true);
    }

    public getKontrahentByIdObs(id: number, isOnce: boolean):Observable<Kontrahent>{
        let ret = new Observable<Kontrahent>(observer => {
            this.db.readById(TABLE_KONTRAHENCI, id, isOnce).subscribe(val => {
                if(val) {
                    val = Object.assign(new Kontrahent, val);
                    val.id = id;
                }

                observer.next(val);
                if(isOnce) {
                    observer.complete();
                }
            });
        });
        return ret;
    }

    // ilosc faktur ktore sa na kontrahenta
    public iloscFaktur(k: Kontrahent): Promise<number> {
        return this.iloscFakturById(k.id);
    }

    public iloscFakturById(id: number): Promise<number> {
        return new Promise((resolve, reject) => {
            let num = 0;

            this.fakt.getFakturyList().then(val => {
                for (let i = 0; i < val.length; i++) {
                    if (val[i].kontrahent.id === id) { num++; }
                }
                resolve(num); // zwroc ilosc faktur
            });
        });
    }
}
