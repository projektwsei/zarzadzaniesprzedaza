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

        this.kontrahent = new Kontrahent();
        this.nrKlienta = +this.route.snapshot.paramMap.get('id');
        if (this.nrKlienta === -1) {
            this.clientAddForm = this.fbc.group({
                'typKontr': KONTRAHENT_TYPE[0],
                'nazwaFirmy': '',
                'nip': '',
                'adres': '',
                'kodPocztowy': '',
                'miasto': ''
            });

        } else {
            console.log("Edycja");
            // this.kontrahent = this.kontr.getKontrahentById(this.nrKlienta);
            this.isEdit = true;
            this.clientAddForm = this.fbc.group({
                'typKontr': KONTRAHENT_TYPE[0],
                'nazwaFirmy': this.kontrahent.nazwaFirmy,
                'nip': this.kontrahent.nip,
                'adres': this.kontrahent.adres,
                'kodPocztowy': this.kontrahent.kodPocztowy,
                'miasto': this.kontrahent.miasto,
            });

        }
    }




    private getKontrahentTypes(): string[] {
        return KONTRAHENT_TYPE;
    }

    private onChangeKontrahentType(event): void {
        if (event.target.value === KONTRAHENT_TYPE[0]) {// firma
            this.isFirma = true;
        } else {// osoba prywatna
            this.isFirma = false;
        }
    }

    private onSubmitAdd(v): void {
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

}
