import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DaneFirmyService } from '../services/danefirmy.service';
import { DaneFirmy } from '../model/danefirmy';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-ustawienia',
  templateUrl: './ustawienia.component.html',
  styleUrls: ['./ustawienia.component.css']
})
export class UstawieniaComponent implements OnInit {

   daneFirmy: DaneFirmy;

   firmForm: FormGroup;

  constructor( private fbf: FormBuilder, private fir: DaneFirmyService ) { }

  ngOnInit() {

    this.firmForm = this.fbf.group({
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

}
