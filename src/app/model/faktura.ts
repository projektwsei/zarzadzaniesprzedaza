import { Kontrahent } from './kontrahent';
import { DaneFirmy } from './danefirmy';
import { Przedmiot, JEDNOSTKI} from './przedmiot';

export class Faktura { //klasa z danymi
    public id: number; //unikalne id
    public czyKoszt: boolean; //czy jest to koszt? (kupilismy towar - dodajemy go do magazynu, lub płacimy za usługę)
    public czyStrata: boolean; //czy jest to strata np na magazynie? (odejmujemy towar z magazynu)
    public numerFaktury: string; //numer faktury w systemie
    public opis: string; //opis wewnetrzny w systemie
    public kontrahent: Kontrahent; //musimy do bazy kopiowac całe dane kontrahenta. Tutaj z tego tez mozemy wyciagnac ID.
    public daneFirmy: DaneFirmy; //dane naszej firmy, je tez kopiujemy na fakture
    public przedmioty: FakturaPrzedmiot[] = [];

    public dataWystawienia: string;
    public miejsceWystawienia: string;
    public dataPlatnosci: string;

    public wystawiajacy_id; //id usera wystawiajacego fakture
    public wystawiajacyImieNazw;

    public lastMod_id; //id usera ostatnio modyfikujacego fakture
    public lastModImieNazw;

    constructor(){
        this.id = -1;
        this.czyKoszt = false;
        this.czyStrata = false;
        this.opis = '';
        this.kontrahent = new Kontrahent();
        this.daneFirmy = new DaneFirmy();
        this.wystawiajacy_id = -1;
        this.wystawiajacyImieNazw = '';
        this.lastMod_id = -1;
        this.lastModImieNazw = '';
        this.dataWystawienia = '';
        this.dataPlatnosci = '';
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

    public getTypeName():string{
        if(this.czyStrata) return FAKTURA_TYPE[2];
        else if(this.czyKoszt) return FAKTURA_TYPE[1];
        else return FAKTURA_TYPE[0];
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

    public addPrzedmiot(id: number, ilosc: number, cena: number, vat: number):void{
        let fp = new FakturaPrzedmiot();
        fp.przedmiot_id = id;
        fp.ilosc = ilosc;
        fp.cenaNetto = cena;
        fp.vat = vat;

        this.przedmioty.push(fp);
    }

    public clearPrzedmioty():void{
        this.przedmioty = [];
    }

    public getPrzedmiotyById(id: number):FakturaPrzedmiot[]{
        let ret = [];
        for(let i=0;i<this.przedmioty.length;i++){
            if(this.przedmioty[i].przedmiot_id == id) ret.push(this.przedmioty[i]);
        }
        return ret;
    }

    private getFullDateMonthValue(n: number):string{//do generowania nr faktury
        return ((n>9)? '' : '0')+n;
    }
}

export class FakturaPrzedmiot { //przedmiot na fakturze
    public przedmiot_id: number; //id przedmiotu w magazynie
    public ilosc: number;
    public cenaNetto: number; //cena netto przedmiotu wpisana na fakturze
    public vat: number; //vat musimy zapisac do ulatwienia obliczen ceny brutto (i przyspieszenia pokazywania np listy faktur)

    constructor(){
        this.przedmiot_id = -1;
        this.ilosc = 0;
        this.cenaNetto = 0;
        this.vat = 0;
    }
}

export const FAKTURA_TYPE: string[] = ['Faktura', 'Koszt', 'Strata']

