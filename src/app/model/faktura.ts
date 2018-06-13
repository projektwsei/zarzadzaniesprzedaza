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
    public wystawiajacy_id; //id usera wystawiajacego fakture
    public wystawiajacyImieNazw;
    public przedmioty: FakturaPrzedmiot[] = [];

    public dataWystawienia: Date | number;
    public miejsceWystawienia: string;
    public dataPlatnosci: Date | number;


    constructor(){
        this.id = -1;
        this.czyKoszt = false;
        this.czyStrata = false;
        this.czyFV = false;
        this.opis = '';
        this.kontrahent = new Kontrahent();
        this.daneFirmy = new DaneFirmy();
        this.wystawiajacy_id = -1;
        this.wystawiajacyImieNazw = '';
        this.dataWystawienia = new Date();
        this.dataPlatnosci = new Date();
        this.miejsceWystawienia = '';

        this.defaultNrFaktury();
    }

    public defaultNrFaktury():void{
        let d = new Date();
        this.numerFaktury = d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate() + '/';
    }

    public setNrFaktury(id: string):void{//ustaw numer faktury po jakims id czy czyms
        this.defaultNrFaktury();
        this.numerFaktury = this.numerFaktury + id;
    }


    public getSumNetto(): number {
        return 0;//TODO
    }

    public getSumBrutto(): number {
        return 0;//TODO
    }

    /*public getPrzedmiotyObjects(): void{
        for(let i=0;i<this.dane.przedmioty.length;i++){
            
        }
    }*/

    //funkcje te wykorzystujemy przy zapisie do bazy danych! w bazie danych ma byc number! po pobraniu ma byc obiekt Date
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
    public cenaNetto: number; //cena netto przedmiotu wpisana na fakturze
    public nazwa: string; //nazwa przedmiotu w chwili dodania na fakture

    constructor(){
        this.przedmiot_id = -1;
        this.ilosc = 0;
        this.cenaNetto = 0;
        this.nazwa = '';
    }
}

