export class Przedmiot {
    public id: number;
    public nazwa: string;
    public czyUsluga: boolean; //jesli to usluga, to nie interesuje nas ilosc!
    public cenaDomyslna: number;//domyslna cena netto
    public vat: number; //procent vat
    public jednostka: string;
    //ilosci przedmiotu nie dajemy, bedzie ona wyliczana automatycznie :)

    constructor(){
        this.id = -1;
        this.nazwa = '';
        this.czyUsluga = false;
        this.cenaDomyslna = 0;
        this.vat = VAT_VALUES[0];
        this.jednostka = JEDNOSTKI[0];
    }

    public setNettoByBrutto(brutto: number): number{//funkcja ustawia cene netto po cenie brutto, oraz od razu zwraca obliczona kwote
        let kwota = this.calcNettoByBrutto(brutto);
        this.cenaDomyslna = kwota;
        return kwota;
    }

    public calcNettoByBrutto(brutto: number): number{
        let vat = this.vat / 100;
        let kwota = brutto / (1 + vat);
        return kwota;
    }

    public getBruttoDefault(): number{
        return this.getBruttoByKwota(this.cenaDomyslna);
    }

    public getBruttoByKwota(kwota: number):number{//wlasna kwota
        let vat = kwota * this.vat / 100;
        return kwota + vat;
    }

    //aby obliczyc ilosc skorzystajmy z magazyn.service funkcja getQuantity
}

export const JEDNOSTKI: string[] = [
    "szt", "cm^2", "cm^3", "g", "kg", "ml", "l", //jednostki dla przedmiotow
    "Usługa" //jednostka dla usług
];

export const VAT_VALUES: number[] = [23, 8, 5, 0];

