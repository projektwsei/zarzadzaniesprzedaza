export class Przedmiot {
    public id: number;
    public nazwa: string;
    public czyUsluga: boolean; //jezeli to usluga to nie interesuje nas ilosc
    public cenaDomyslna: number;
    public vat: number; //procent vat
    public jednostka: string;

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

