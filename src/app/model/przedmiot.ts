export class Przedmiot {
    public id: number;
    public nazwa: string;
    public czyUsluga: boolean; //jezeli to usluga to nie interesuje nas ilosc
    public cenaDomyslna: number;
    public vat: number; //procent vat
    public jednostka: string;
    //ilosci przedmiotu nie dajemy, bedzie ona wyliczana automatycznie :)

    constructor(){
        this.id = -1;
        this.nazwa = '';
        this.czyUsluga = false;
        this.cenaDomyslna = 0;
        this.vat = 23;
        this.jednostka = JEDNOSTKI[0];
    }

    public setNettoByBrutto(brutto: number): number{//funkcja ustawia cene netto po cenie brutto, oraz od razu zwraca obliczona kwote
        let vat = this.vat / 100;
        let kwota = brutto / (1 + vat);
        this.cenaDomyslna = kwota;
        return kwota;
    }

    public getBruttoDefault(): number{
        return this.getBrutto(this.cenaDomyslna);
    }

    public getBrutto(kwota: number){
        let vat = kwota * this.vat / 100;
        return kwota + vat;
    }
}

export const JEDNOSTKI: string[] = [
    "sztuk", "cm^2", "cm^3", "gram", "kilogram", "mililitr", "litr", //jednostki dla przedmiotow
    "godzina", "dzień", "miesiąc", "pojedyncza usługa" //jednostki dla usług
];

