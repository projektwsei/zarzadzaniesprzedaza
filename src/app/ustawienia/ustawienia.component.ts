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
  saved: boolean;
  firmForm: FormGroup;

  constructor( private fbf: FormBuilder, private fir: DaneFirmyService ) {
    this.saved = false;
  }

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

  onSubmitEdit(v){
    this.daneFirmy.nazwaFirmy = v.nazwaFirmy;
    this.daneFirmy.nip = v.nip;
    this.daneFirmy.adres = v.adres;
    this.daneFirmy.kodPocztowy = v.kodPocztowy;
    this.daneFirmy.miasto = v.miasto;

    this.fir.saveDaneFirmy(this.daneFirmy);

    this.saved = true;
    setTimeout(()=>{
        this.saved = false;
    }, 6000);//po 6 sekundach ukryj napis "zapisano"
  }



}
