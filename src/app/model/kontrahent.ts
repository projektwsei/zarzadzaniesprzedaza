export class Kontrahent {
    public id: number;
    public nazwa: string; //nazwa kontrahenta w naszym systemie (nie nazwa firmy!)
    public firma: boolean; //firma czy osoba prywatna?
    public nazwaFirmy: string; //lub imie i nazwisko, w przypadku osoby prywatnej!
    public adres: string;
    public miasto: string;
    public kodPocztowy: string;
    public nip: string;
    public platnikVat: boolean; //czy jest platnikiem vat (wymagane?)
}
