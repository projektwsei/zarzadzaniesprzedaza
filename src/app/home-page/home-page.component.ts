import { Component, OnInit } from '@angular/core';
import { DaneFirmyService } from '../services/danefirmy.service';
import { UsersService } from '../services/users.service';
import { DaneFirmy } from '../model/danefirmy';
import { Faktura } from '../model/faktura';
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

    constructor(private df: DaneFirmyService, private u: UsersService, private f: FakturyService, private k: KontrahenciService, private mag: MagazynService) {

    }

    ngOnInit() {

    }

}
