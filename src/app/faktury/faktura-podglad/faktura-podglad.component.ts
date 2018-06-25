import { Component, OnInit } from '@angular/core';
import { Faktura, FAKTURA_TYPE } from '../../model/faktura';
import { Kontrahent } from '../../model/kontrahent';
import { DaneFirmy } from '../../model/danefirmy';
import { DaneFirmyService } from '../../services/danefirmy.service';
import { KontrahenciService } from '../../services/kontrahenci.service';
import { Przedmiot, JEDNOSTKI, VAT_VALUES } from '../../model/przedmiot';
import { MagazynService } from '../../services/magazyn.service';
import { FakturyService } from '../../services/faktury.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-faktura-podglad',
  templateUrl: './faktura-podglad.component.html',
  styleUrls: ['./faktura-podglad.component.css']
})
export class FakturaPodgladComponent implements OnInit {

   //zmienne do widoku
  sprzedawcaNapis: string = 'Sprzedawca';
  nabywcaNapis: string = 'Nabywca';
  czyStrata: boolean = false;

  //obiekty przechowujace dane
  przedmioty: Przedmiot[] = [];
  kontrahenci: Kontrahent[] = [];
  daneFirmy: DaneFirmy;
  faktura: Faktura;


  constructor(private df: DaneFirmyService, private magazyn: MagazynService,
              private kontr: KontrahenciService, private fakt: FakturyService, private users: UsersService) {
              this.faktura = new Faktura();
               }

   private getFakturaTypes():string[]{
    return FAKTURA_TYPE;
  }
  
  ngOnInit() {
  }

}
