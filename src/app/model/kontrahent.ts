export class Kontrahent {
    public id: number;
    public firma: boolean; //firma czy osoba prywatna?
    public nazwaFirmy: string; //lub imie i nazwisko, w przypadku osoby prywatnej!
    public adres: string;//ulica i nr domu
    public miasto: string;
    public kodPocztowy: string;
    public nip: string;

    constructor(){
        this.id = -1;
        this.firma = true;
        this.nazwaFirmy = '';
        this.adres = '';
        this.miasto = '';
        this.kodPocztowy = '';
        this.nip = '';
    }

    public getFullName():string{
        if(this.firma) return this.nazwaFirmy;
        else return '(os. fiz.)  '+this.nazwaFirmy;
    }
}

export const KONTRAHENT_TYPE: string[] = ['Firma', 'Osoba fizyczna'];

