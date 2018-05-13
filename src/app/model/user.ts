export class User{
    public id: number;
    public login: string;
    private password: string; //TODO szyfrowanie sha1 / sha256 / md5 / lub inne + salt
    public email: string;
    public imieNazw: string;
    public isPotw: boolean;

    public setPassword(p: string):void{
        this.password = this.encrypt(p);
    }

    public checkPass(p: string):boolean{
        if(this.encrypt(p) == this.password) return true;
        else return false;
    }

    private encrypt(p: string):string{
        //TODO encrypt
        return p;
    }
}

