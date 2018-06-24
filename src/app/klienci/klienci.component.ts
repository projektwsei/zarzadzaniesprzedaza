import { Component, OnInit } from '@angular/core';
import { Kontrahent } from '../model/kontrahent';
import { KontrahenciService } from '../services/kontrahenci.service';

@Component({
    selector: 'app-klienci',
    templateUrl: './klienci.component.html',
    styleUrls: ['./klienci.component.css']
})
export class KlienciComponent implements OnInit {

    private kontrahenci: Kontrahent[] = [];

    constructor(private kon: KontrahenciService) {

    }

    ngOnInit() {
        //wczytaj liste kontrahentow
        this.kon.getKontrahenciList().then(val => {
            this.kontrahenci = val;
        });
    }

    usun(id) {
        this.kon.deleteKontrahentById(id);
        this.kontrahenci.splice(this.findIndexById(id), 1);

    }

    findIndexById(id) {
        for (let i = 0; i < this.kontrahenci.length; i++) {
            if (this.kontrahenci[i].id === id) { return i; }
        }
        return -1;
    }

}
