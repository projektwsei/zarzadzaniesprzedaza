export class User{
    public uid: string; //uid z firebase
    public imieNazw: string; //imie i nazwisko
    public isPotw: boolean; //czy potwierdzony?
    public email: string;
    public provider: string;
    public deleted: boolean;

    constructor(){
        this.uid = '';
        this.imieNazw = '';
        this.isPotw = false;
        this.email = '';
        this.provider = '';
        this.deleted = false;
    }
}

