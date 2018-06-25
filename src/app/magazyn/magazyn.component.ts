import { Component, OnInit } from '@angular/core';
import { Przedmiot } from '../model/przedmiot';
import { MagazynService } from '../services/magazyn.service';

@Component({
  selector: 'app-magazyn',
  templateUrl: './magazyn.component.html',
  styleUrls: ['./magazyn.component.css']
})
export class MagazynComponent implements OnInit {

   private przedmioty: Przedmiot[] = [];

  constructor(private mag: MagazynService) { }

  ngOnInit() {
    //wczytaj liste przdmiotów
        this.mag.getPrzedmiotyList().then(val => {
            this.przedmioty = val;
        });
  }

}
