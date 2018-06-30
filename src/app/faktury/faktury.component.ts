import { Component, OnInit } from '@angular/core';
import { Faktura } from '../model/faktura';
import { FakturyService } from '../services/faktury.service';

@Component({
    selector: 'app-faktury',
    templateUrl: './faktury.component.html',
    styleUrls: ['./faktury.component.css']
})
export class FakturyComponent implements OnInit {

     faktury: Faktura[] = [];

    constructor(private fakt: FakturyService) {

    }

    ngOnInit() {
        //wczytaj liste faktur
        this.fakt.getFakturyList().then(val => {
            this.faktury = val;
        });
    }

    usun(id) {
        if(confirm("Czy napewno usunąć?")){
            this.fakt.deleteFakturaById(id);
            this.faktury.splice(this.findIndexById(id), 1);
        }
    }

    findIndexById(id) {
        for (let i = 0; i < this.faktury.length; i++) {
            if (this.faktury[i].id === id) { return i; }
        }
        return -1;
    }

}
