import { Faktura } from './../model/faktura';
import { Component, OnInit } from '@angular/core';
import { DaneFirmyService } from '../services/danefirmy.service';
import { UsersService } from '../services/users.service';
import { DaneFirmy } from '../model/danefirmy';
import { Przedmiot } from '../model/przedmiot';
import { Kontrahent } from '../model/kontrahent';
import { FakturyService } from '../services/faktury.service';
import { KontrahenciService } from '../services/kontrahenci.service';
import { MagazynService } from '../services/magazyn.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  faktury: Faktura[] = [];

  //netto
  straty = 0;
  koszta = 0;
  przychod = 0;
  dochod = 0;

  //brutto
  kosztaBrutto = 0;
  przychodBrutto = 0;
  dochodBrutto = 0;
  dochodBruttoBezStr = 0;

  //vat
  vatKoszta = 0;
  vatPrzychod = 0;
  vatNalezny = 0;


  constructor(private df: DaneFirmyService, private u: UsersService, private f: FakturyService, private k: KontrahenciService, private mag: MagazynService) {

  }

  ngOnInit() {
    this.f.getFakturyList().then(
      data => {
        this.faktury = data;

        this.faktury.forEach(faktura => {
          if (faktura.czyStrata === true) {//straty
            this.straty += faktura.getSumNetto();
          } else if (faktura.czyKoszt === true) {//koszty
            this.koszta += faktura.getSumNetto();
            this.kosztaBrutto += faktura.getSumBrutto();
            this.vatKoszta += faktura.getSumVat();
          } else {//przychod
            this.przychod += faktura.getSumNetto();
            this.przychodBrutto += faktura.getSumBrutto();
            this.vatPrzychod += faktura.getSumVat();
          }

        });
        this.dochod = this.przychod - this.koszta - this.straty;
        this.dochodBrutto = this.przychodBrutto - this.kosztaBrutto - this.straty;
        this.dochodBruttoBezStr = this.przychodBrutto - this.kosztaBrutto;
        this.vatNalezny = this.vatPrzychod - this.vatKoszta;
      }
    );

  }

}
