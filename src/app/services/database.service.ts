import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MaxIDs } from '../model/maxIDs';

@Injectable()
export class DatabaseService {
    private maxID: MaxIDs;

    private bCanAdd: BehaviorSubject<boolean>;

    constructor(private fire: FirebaseService) {
        this.bCanAdd = new BehaviorSubject<boolean>(false);
        this.getMaxIDs();        
    }

    private getMaxIDs(){
        this.fire.db().ref('maxids').once('value', (snapshot)=>{
            if(snapshot.val()==null) this.createMaxIDs();
            else {
                this.maxID = snapshot.val();
                this.maxID = Object.assign(new MaxIDs, this.maxID); // to dziala do pojedynczego obiektu jak i do tablicy obiektow
                //this.maxID = Object.setPrototypeOf(this.maxID, MaxIDs.prototype); //ustawia prototyp, dziala tylko dla jednego obiektu
                console.log(this.maxID);

                this.bCanAdd.next(true);
                this.bCanAdd.complete();
            }
        });
    }

    private createMaxIDs(){
        this.maxID = new MaxIDs();
        //this.maxID.idUser = 0;
        this.maxID.idFaktura = 0;
        this.maxID.idKontrahent = 0;
        this.maxID.idPrzedmiot = 0;
        this.updateMaxIDs();

        this.bCanAdd.next(true);
        this.bCanAdd.complete();
    }

    private updateMaxIDs(){
        this.fire.db().ref('maxids').set(this.maxID);
    }

    private deleteId(table: string, data: any):number|string{ //usuwamy ID w trakcie zapisywania do bazy danych (id jest kluczem, a nie polem)
        if(table==TABLE_USERS){
            let ret = data.uid;
            delete data.uid;
            return ret;
        } else {
            let ret = data.id;
            delete data.id;
            return ret;
        }
    }
    
    private restoreId(table: string, data: any, id: number|string):void{ //po odczytaniu danych zapisujemy ich ID
        if(table==TABLE_USERS){
            data.uid = id;
        } else {
            data.id = id;
        }
    }

    public updateData(table: string, id: number|string, data:any):void{
        if(table!=TABLE_DANE_FIRMY){
            let lastId = this.deleteId(table, data);
            this.fire.db().ref(table+'/'+id).set(data);
            this.restoreId(table, data, lastId);
        } else {
            this.fire.db().ref(table).set(data);//bez id dla danych firmy
        }
    }
    
    public addData(table: string, data:any):void{
        if(this.bCanAdd.isStopped){
            this.addDataPriv(table, data);
        } else {
            this.bCanAdd.subscribe((canAdd)=>{//oczekuj na mozliwosc dodania (az wczytaja sie maxID)
                if(canAdd){
                    this.addDataPriv(table, data);
                }
            });
        }
    }

    private addDataPriv(table: string, data:any):void{
        let id=0;

        if(table==TABLE_USERS){
            //id = this.maxID.idUser++;
            id = data.uid;
        } else if(table==TABLE_FAKTURY){
            id = this.maxID.idFaktura++;
        } else if(table==TABLE_KONTRAHENCI){
            id = this.maxID.idKontrahent++;
        } else if(table==TABLE_MAGAZYN){
            id = this.maxID.idPrzedmiot++;
        } else if(table==TABLE_DANE_FIRMY){
            id = 0;//nie ma id w dancyh firmy!
        }

        if(table!=TABLE_DANE_FIRMY) this.deleteId(table, data);

        if(table!=TABLE_USERS && table!=TABLE_DANE_FIRMY) {
            this.updateMaxIDs(); //aktualizuj w bazie nowe max id
        }

        let sciezka = table+'/'+id;
        if(table==TABLE_DANE_FIRMY) sciezka = table; //w danych firmy nie ma id!

        this.fire.db().ref(sciezka).set(data);

        if(table!=TABLE_DANE_FIRMY) this.restoreId(table, data, id);
    }
    

    public readList(table: string, isOnce: boolean):Observable<any>{//isOnce - czy pobieramy to jeden raz, czy subskrybujemy?
        let ret = new Observable(observer => {
            let ref = this.fire.db().ref(table);
            if(!isOnce){            
                ref.on("value", (snapshot) => {
                    observer.next(snapshot.val());
                });
            } else {
                ref.once("value", (snapshot) => {
                    observer.next(snapshot.val());
                    observer.complete();
                });
            }
        });

        return ret;        
    }

    public readById(table: string, id: number|string, isOnce: boolean):Observable<any>{//isOnce - czy pobieramy to jeden raz, czy subskrybujemy?
        let ret = new Observable(observer => {
            let ref = this.fire.db().ref(table+'/'+id);
            if(!isOnce){            
                ref.on("value", (snapshot) => {
                    observer.next(snapshot.val());
                });
            } else {
                ref.once("value", (snapshot) => {
                    observer.next(snapshot.val());
                    observer.complete();
                });
            }
        });

        return ret;        
    }

    public deleteById(table: string, id: number|string){
        this.fire.db().ref(table+'/'+id).remove();
    }
}

export const TABLE_USERS: string = 'users';
export const TABLE_FAKTURY: string = 'faktury';
export const TABLE_KONTRAHENCI: string = 'kontrahenci';
export const TABLE_MAGAZYN: string = 'magazyn';
export const TABLE_DANE_FIRMY: string = 'danefirmy';
