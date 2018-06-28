import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DaneFirmyService } from '../services/danefirmy.service';
import { DaneFirmy, FIRMA_TYPE } from '../model/danefirmy';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-ustawienia',
  templateUrl: './ustawienia.component.html',
  styleUrls: ['./ustawienia.component.css']
})
export class UstawieniaComponent implements OnInit {

   daneFirmy: DaneFirmy;

   isFirma = true;

   firmForm: FormGroup;

  constructor( private fbf: FormBuilder, private fir: DaneFirmyService ) { }

  ngOnInit() {

    this.firmForm = this.fbf.group({
                typFirmy: FIRMA_TYPE[0],
                nazwaFirmy: '',
                nip: '',
                adres: '',
                kodPocztowy: '',
                miasto: '',
            });

            this.fir.getDaneFirmy().then(val => {
            this.daneFirmy = val;
            this.firmForm.patchValue(this.daneFirmy);
        });
  }

  private getFirmaTypes(): string[] {
        return FIRMA_TYPE;
    }

    private onChangeFirmaType(event): void {
        if (event.target.value === FIRMA_TYPE[0]) {// firma
            this.isFirma = true;
        } else {// osoba prywatna
            this.isFirma = false;
        }
    }

}
