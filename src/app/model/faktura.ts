import { Kontrahent } from './kontrahent';
import { DaneFirmy } from './danefirmy';
import { Przedmiot } from './przedmiot';

export class Faktura { //klasa z danymi
    public id: number; //unikalne id
    public czyKoszt: boolean; //czy jest to koszt? (kupilismy towar - dodajemy go do magazynu, lub płacimy za usługę)
    public czyStrata: boolean; //czy jest to strata np na magazynie? (odejmujemy towar z magazynu)
    public numerFaktury: string; //numer faktury w systemie
    public czyFV: boolean; //czy to faktura vat czy zwykly paragon?
    public opis: string; //opis wewnetrzny w systemie
    public kontrahent: Kontrahent; //musimy do bazy kopiowac całe dane kontrahenta. Tutaj z tego tez mozemy wyciagnac ID.
    public daneFirmy: DaneFirmy; //dane naszej firmy, je tez kopiujemy na fakture
    public wystawiajacy_id; //id usera wystawiajacego fakture (czy kopiować też jego imie/nazwisko?)
    public wystawiajacyImieNazw;
    public przedmioty: FakturaPrzedmiot[] = [];

    public dataWystawienia: Date | number;
    public dataPlatnosci: Date | number;

    public getSumNetto(): number {
        return 0;
    }

    public getSumBrutto(): number {
        return 0;
    }

    /*public getPrzedmiotyObjects(): void{
        for(let i=0;i<this.dane.przedmioty.length;i++){
            
        }
    }*/

    public dateToNumber(): void{
        if(this.dataWystawienia instanceof Date){
            this.dataWystawienia = this.dataWystawienia.getTime();
        }

        if(this.dataPlatnosci instanceof Date){
            this.dataPlatnosci = this.dataPlatnosci.getTime();
        }
    }

    public numberToDate(): void{
        if(typeof(this.dataWystawienia) === "number"){
            this.dataWystawienia = new Date(this.dataWystawienia);
        }

        if(typeof(this.dataPlatnosci) === "number"){
            this.dataPlatnosci = new Date(this.dataPlatnosci);
        }
    }
}

export class FakturaPrzedmiot { //przedmiot na fakturze
    public przedmiot_id: number; //id przedmiotu z magazynie
    public ilosc: number;
    public cenaNetto: number; //cena netto przedmiotu
}

