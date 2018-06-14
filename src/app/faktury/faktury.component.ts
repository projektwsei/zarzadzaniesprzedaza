import { Component, OnInit } from '@angular/core';
import { Faktura } from '../model/faktura';
import { FakturyService } from '../services/faktury.service';

@Component({
  selector: 'app-faktury',
  templateUrl: './faktury.component.html',
  styleUrls: ['./faktury.component.css']
})
export class FakturyComponent implements OnInit {

    private faktury: Faktura[] = [];

    constructor(private fakt: FakturyService) {
    
    }

    ngOnInit() {
        //wczytaj liste faktur
        this.fakt.getFakturyList().then(val => {
            this.faktury = val;
        });
    }

}
