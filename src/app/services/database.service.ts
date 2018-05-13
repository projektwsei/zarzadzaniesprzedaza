import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
import { MaxIDs } from '../model/maxIDs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    public maxID: MaxIDs;

    constructor(private fire: FirebaseService) {
        this.getMaxIDs();        
    }

    private getMaxIDs(){
        this.fire.db().ref('maxids').once('value', (snapshot)=>{
            if(snapshot.val()==null) this.createMaxIDs();
            else {
                this.maxID = snapshot.val();// as MaxIDs;
                //this.maxID = Object.assign(new MaxIDs, this.maxID); // to dziala do pojedynczego obiektu jak i do tablicy obiektow
                this.maxID = Object.setPrototypeOf(this.maxID, MaxIDs.prototype); //ustawia prototyp, dziala tylko dla jednego obiektu
                console.log(this.maxID);
            }
        });
    }

    private createMaxIDs(){
        this.maxID = new MaxIDs();
        this.maxID.idUser = 0;
        this.maxID.idFaktura = 0;
        this.maxID.idKontrahent = 0;
        this.maxID.idPrzedmiot = 0;
        this.fire.db().ref('maxids').set(this.maxID);
    }

    public writeData(table: string, id: number, data:any):void{
        this.fire.db().ref(table+'/'+id).set( data );
    }

    public readList(table: string, isOnce: boolean):Observable<any>{
        let ret = new Observable(observer => {
            let ref = this.fire.db().ref(table);
            if(!isOnce){            
                ref.on("value", (snapshot) => {
                    observer.next(snapshot.val());
                });
            } else {
                ref.once("value", (snapshot) => {
                    observer.next(snapshot.val());
                });
            }
        });

        return ret;        
    }

    public readById(table: string, id: number, isOnce: boolean):Observable<any>{
        let ret = new Observable(observer => {
            let ref = this.fire.db().ref(table+'/'+id);
            if(!isOnce){            
                ref.on("value", (snapshot) => {
                    observer.next(snapshot.val());
                });
            } else {
                ref.once("value", (snapshot) => {
                    observer.next(snapshot.val());
                });
            }
        });

        return ret;        
    }



}
