import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Kontrahent, KONTRAHENT_TYPE } from '../../model/kontrahent';
import { KontrahenciService } from '../../services/kontrahenci.service';

@Component({
  selector: 'app-klienci-dodaj',
  templateUrl: './klienci-dodaj.component.html',
  styleUrls: ['./klienci-dodaj.component.css']
})
export class KlienciDodajComponent implements OnInit {

    //obiekty
    kontrahent: Kontrahent;

    //zmienne dla widoku
    isFirma: boolean = true;
    
    //zmienne pomocnicze
    isEdit: boolean = false;

    clientAddForm: FormGroup;

    constructor(private fbc: FormBuilder, private kontr: KontrahenciService) {
        
    }

    ngOnInit() {
        this.clientAddForm = this.fbc.group({
            'typKontr': KONTRAHENT_TYPE[0],
            'nazwaFirmy': '',
            'nip': '',
            'adres': '',
            'kodPocztowy': '',
            'miasto': ''
        });

        this.kontrahent = new Kontrahent();
        //todo jesli isEdit==true to odczytaj dane kontrahenta z bazy i ustaw je w formularzu
    }

    private getKontrahentTypes():string[]{
        return KONTRAHENT_TYPE;
    }
    
    private onChangeKontrahentType(event):void{
        if(event.target.value==KONTRAHENT_TYPE[0]){//firma
            this.isFirma = true;
        } else {//osoba prywatna
            this.isFirma = false;
        }
    }

    private onSubmitAdd(v):void{
        let k = this.kontrahent;
        
        //k.id ustawiane automatycznie podczas dodawania, lub jest juz ustawione podczas edycji
        if(v.typKontr==KONTRAHENT_TYPE[0]){
            k.firma = true;
            k.nip = v.nip;
        } else {
            k.firma = false;
            k.nip = '';
        }

        k.nazwaFirmy = v.nazwaFirmy;
        k.adres = v.adres;
        k.kodPocztowy = v.kodPocztowy;
        k.miasto = v.miasto;

        if(!this.isEdit){
          this.kontr.addKontrahent(k);
        } else {
          this.kontr.updateKontrahent(k);
        }

        //TODO przekierowanie do listy kontrahentow
    }

}
