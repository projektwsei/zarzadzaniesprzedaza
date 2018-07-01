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
  straty = 0;
  koszta = 0;

  przychod = 0;
  przychodBezStrat = 0;



  constructor(private df: DaneFirmyService, private u: UsersService, private f: FakturyService, private k: KontrahenciService, private mag: MagazynService) {

  }

  ngOnInit() {
    this.f.getFakturyList().then(
      data => {
        this.faktury = data;

        this.faktury.forEach(faktura => {
          if (faktura.czyKoszt === true) {
            this.koszta += faktura.getSumNetto();
          } else if (faktura.czyStrata === true) {
            this.straty += faktura.getSumNetto();
          } else {
            this.przychod += faktura.getSumNetto();
          }

        });
        this.przychodBezStrat = this.przychod - this.koszta - this.straty;
      }
    );

  }

}
