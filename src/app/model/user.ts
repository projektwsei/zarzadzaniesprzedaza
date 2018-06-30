export class User{
    public uid: string; //uid z firebase
    public imieNazw: string; //imie i nazwisko
    public isPotw: boolean; //czy potwierdzony?
    public email: string;
    public provider: string;

    constructor(){
        this.uid = '';
        this.imieNazw = '';
        this.isPotw = false;
        this.email = '';
        this.provider = '';
    }
}

