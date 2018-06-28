import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';

@Component({
  selector: 'app-aktywacja-rejestracji',
  templateUrl: './aktywacja-rejestracji.component.html',
  styleUrls: ['./aktywacja-rejestracji.component.css']
})
export class AktywacjaRejestracjiComponent implements OnInit {

  users: User[] = [
    { uid: '1',
    imieNazw: 'Jakieś Imie i Nazwisko',
    isPotw: false },
    { uid: '2',
    imieNazw: 'Znowu Jakieś Imie i Nazwisko',
    isPotw: true }
  ];

  private isPotw = false;

  constructor() { }

  ngOnInit() {

  }

}
