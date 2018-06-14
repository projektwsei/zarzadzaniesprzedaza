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
        this.numerFaktury = d.getFullYear() + '/' + this.getFullDateMonthValue(d.getMonth()+1) + '/' + this.getFullDateMonthValue(d.getDate()) + '/';
    }

    public setNrFaktury(id: string):void{//ustaw numer faktury po jakims id czy czyms
        this.defaultNrFaktury();
        this.numerFaktury = this.numerFaktury + id;
    }


    public getSumNetto(): number {
        let sum = 0;

        for(let i=0;i<this.przedmioty.length;i++){
            sum += this.przedmioty[i].cenaNetto * this.przedmioty[i].ilosc;
        }
        
        return sum;
    }

    public getSumBrutto(): number {
        let sum = 0;

        for(let i=0;i<this.przedmioty.length;i++){
            let vat = this.przedmioty[i].cenaNetto * this.przedmioty[i].vat / 100;
            sum += (this.przedmioty[i].cenaNetto + vat) * this.przedmioty[i].ilosc;
        }
        
        return sum;
    }

    public getSumVat(): number {
        let sum = 0;

        for(let i=0;i<this.przedmioty.length;i++){
            let vat = this.przedmioty[i].cenaNetto * this.przedmioty[i].vat / 100;
            sum += vat * this.przedmioty[i].ilosc;
        }
        
        return sum;
    }

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

    public getPrzedmiotyById(id: number):FakturaPrzedmiot[]{
        let ret = [];
        for(let i=0;i<this.przedmioty.length;i++){
            if(this.przedmioty[i].przedmiot_id == id) ret.push(this.przedmioty[i]);
        }
        return ret;
    }

    //funkcje Date to string, do formularzy, zeby zwrocic w formacie yyyy-MM-dd
    public getDataWystawieniaAsString():string{
        this.numberToDate();
        return this.dateToString(this.dataWystawienia);
    }

    public getDataPlatnosciAsString():string{
        this.numberToDate();
        return this.dateToString(this.dataPlatnosci);
    }

    private dateToString(d: any):string{
        return d.getFullYear()+'-'+this.getFullDateMonthValue(d.getMonth()+1)+'-'+this.getFullDateMonthValue(d.getDate());
    }

    private getFullDateMonthValue(n: number):string{
        return ((n>9)? '' : '0')+n;
    }
}

export class FakturaPrzedmiot { //przedmiot na fakturze
    public przedmiot_id: number; //id przedmiotu z magazynie
    public ilosc: number;
    public cenaNetto: number; //cena netto przedmiotu wpisana na fakturze
    public nazwa: string; //nazwa przedmiotu w chwili dodania na fakture
    public jednostka: string;//jednostka w chwili dodania na fakture
    public vat: number; //vat w chwili dodania na fakture

    constructor(){
        this.przedmiot_id = -1;
        this.ilosc = 0;
        this.cenaNetto = 0;
        this.nazwa = '';
        this.vat = 0;
        this.jednostka = '';
    }
}

