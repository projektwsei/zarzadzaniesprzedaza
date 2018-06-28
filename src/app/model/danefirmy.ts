export class DaneFirmy {//dane naszej firmy
    public nazwaFirmy: string;
    public nip: string;
    public adres: string;
    public miasto: string;
    public kodPocztowy: string;

    constructor(){
        this.nazwaFirmy = '';
        this.nip = '';
        this.adres = '';
        this.miasto = '';
        this.kodPocztowy = '';
    }
public getFullName():string{
        if(this.firma) return this.nazwaFirmy;
        else return '(os. fiz.)  '+this.nazwaFirmy;
    }
}

export const FIRMA_TYPE: string[] = ['Firma', 'Osoba fizyczna'];

