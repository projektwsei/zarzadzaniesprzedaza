import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Kontrahent, KONTRAHENT_TYPE } from '../../model/kontrahent';
import { KontrahenciService } from '../../services/kontrahenci.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-klienci-dodaj',
    templateUrl: './klienci-dodaj.component.html',
    styleUrls: ['./klienci-dodaj.component.css']
})
export class KlienciDodajComponent implements OnInit {

    // obiekty
    kontrahent: Kontrahent;

    // zmienne dla widoku
    isFirma = true;

    // zmienne pomocnicze
    isEdit = false;
    nrKlienta: number; // jeśli -1 to nowy, inny edytuj podany

    clientAddForm: FormGroup;

    constructor(private fbc: FormBuilder, private kontr: KontrahenciService, private route: ActivatedRoute, private location: Location) {

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
        this.nrKlienta = +this.route.snapshot.paramMap.get('id');
        if (this.nrKlienta === -1) {
            this.isEdit = false;
        } else {
            this.isEdit = true;
            this.kontr.getKontrahentById(this.nrKlienta).subscribe(data => {
                this.kontrahent = data;

                this.clientAddForm.get("nazwaFirmy").setValue(this.kontrahent.nazwaFirmy);
                this.clientAddForm.get("nip").setValue(this.kontrahent.nip);
                this.clientAddForm.get("adres").setValue(this.kontrahent.adres);
                this.clientAddForm.get("kodPocztowy").setValue(this.kontrahent.kodPocztowy);
                this.clientAddForm.get("miasto").setValue(this.kontrahent.miasto);

                this.isFirma = this.kontrahent.firma;

                if(this.kontrahent.firma){
                    this.clientAddForm.get("typKontr").setValue(KONTRAHENT_TYPE[0]);
                } else {
                    this.clientAddForm.get("typKontr").setValue(KONTRAHENT_TYPE[1]);
                }
            });
            

        }
    }




     getKontrahentTypes(): string[] {
        return KONTRAHENT_TYPE;
    }

    onChangeKontrahentType(event): void {
        if (event.target.value === KONTRAHENT_TYPE[0]) {// firma
            this.isFirma = true;
        } else {// osoba prywatna
            this.isFirma = false;
        }
    }

     onSubmitAdd(v): void {
        const k = this.kontrahent;

        // k.id ustawiane automatycznie podczas dodawania, lub jest juz ustawione podczas edycji
        if (v.typKontr === KONTRAHENT_TYPE[0]) {
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

        if (!this.isEdit) {
            this.kontr.addKontrahent(k);
            this.location.back();
        } else {
            this.kontr.updateKontrahent(k);
            this.location.back();
        }
    }

    anuluj(){
        this.location.back();
    }

}
