import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Przedmiot, VAT_VALUES, JEDNOSTKI } from '../../model/przedmiot';
import { MagazynService } from '../../services/magazyn.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-magazyn-dodaj',
  templateUrl: './magazyn-dodaj.component.html',
  styleUrls: ['./magazyn-dodaj.component.css']
})
export class MagazynDodajComponent implements OnInit {

    przedmiot: Przedmiot;

    isEdit = false;
    idPrzedmiot: number; // jeśli -1 to nowy, inny edytuj podany

    przedmiotAddForm: FormGroup;

    constructor(private fbp: FormBuilder, private mag: MagazynService, private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
        this.przedmiotAddForm = this.fbp.group({
            'nazwaPrzedmiotu': '',
            'czyUsluga': false,
            'cenaDomyslna': '',
            'vat': VAT_VALUES[0],
            'jednostka': JEDNOSTKI[1]
        });


        this.idPrzedmiot = +this.route.snapshot.paramMap.get('id');
        this.przedmiot = new Przedmiot();

        if (this.idPrzedmiot === -1) {
            this.isEdit = false;    
        } else {
            this.isEdit = true;

            this.mag.getPrzedmiotById(this.idPrzedmiot).then(v => {
                this.przedmiot = v;
                console.log(v);
                this.przedmiotAddForm.get("nazwaPrzedmiotu").setValue(v.nazwa);
                this.przedmiotAddForm.get("czyUsluga").setValue(v.czyUsluga);
                this.przedmiotAddForm.get("cenaDomyslna").setValue(v.cenaDomyslna);
                this.przedmiotAddForm.get("vat").setValue(v.vat);
                
                if(v.czyUsluga){
                    this.przedmiotAddForm.get("jednostka").setValue(JEDNOSTKI[0]);
                    this.przedmiotAddForm.get("jednostka").disable();
                } else {
                    this.przedmiotAddForm.get("jednostka").setValue(v.jednostka);
                    this.przedmiotAddForm.get("jednostka").enable();
                }
            });

        }
    }

    private onChangeCzyUsluga(event){
        let czyUsluga = event.target.checked;
        
        if(czyUsluga){
            this.przedmiotAddForm.get("jednostka").setValue(JEDNOSTKI[0]);
            this.przedmiotAddForm.get("jednostka").disable();
        } else {
            this.przedmiotAddForm.get("jednostka").setValue(JEDNOSTKI[1]);
            this.przedmiotAddForm.get("jednostka").enable();
        }
    }

    private onChangeJednostka(event){     
        if(event.target.value==JEDNOSTKI[0]){
            this.przedmiotAddForm.get("jednostka").setValue(JEDNOSTKI[1]);
            alert("Ta jednostka jest zarezerwowana tylko dla usług!");
        }
    }

    private getVatTypes(): number[] {
        return VAT_VALUES;
    }

    private getJednostkaTypes(): string[] {
        return JEDNOSTKI;
    }

    private onSubmitAdd(v): void {
        const p = this.przedmiot;

        if(v.czyUsluga){
            p.czyUsluga=true;
            p.jednostka=JEDNOSTKI[0];
        } else {
            p.czyUsluga = false;
            p.jednostka = v.jednostka;
        }

        p.nazwa = v.nazwaPrzedmiotu;
        p.cenaDomyslna = v.cenaDomyslna;
        p.vat = v.vat;

        if (!this.isEdit) {
            this.mag.addPrzedmiot(p);
            this.location.back();
        } else {
            this.mag.updatePrzedmiot(p);
            this.location.back();
        }
    }

}
