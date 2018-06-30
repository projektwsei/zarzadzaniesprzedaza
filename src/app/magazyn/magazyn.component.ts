import { Component, OnInit } from '@angular/core';
import { Przedmiot } from '../model/przedmiot';
import { MagazynService } from '../services/magazyn.service';

@Component({
  selector: 'app-magazyn',
  templateUrl: './magazyn.component.html',
  styleUrls: ['./magazyn.component.css']
})
export class MagazynComponent implements OnInit {

     przedmioty: Przedmiot[] = [];
     przedmiotyIlosci: number[] = [];

    constructor(private mag: MagazynService) { }

    ngOnInit() {
        //wczytaj liste przdmiotów
        this.mag.getPrzedmiotyList().then(val => {
            this.przedmioty = val;

            for(let i=0;i<this.przedmioty.length;i++){
                if(this.przedmioty[i].czyUsluga){
                    this.przedmiotyIlosci[i] = 1;
                } else {
                    this.mag.getQuantityById(this.przedmioty[i].id).then(val => {
                        this.przedmiotyIlosci[i] = val;
                    });
                }
            }
        });
    }

    usun(id) {
        this.mag.iloscFakturById(id).then(val =>{
            if(val>0){
                alert("Nie można usunąć przedmiotu, jeśli znajduje się on na fakturach!");
            } else if(confirm("Czy napewno usunąć?")){
                this.mag.deletePrzedmiotById(id);
                this.przedmioty.splice(this.findIndexById(id), 1);
            }
        });
    }

    findIndexById(id) {
        for (let i = 0; i < this.przedmioty.length; i++) {
            if (this.przedmioty[i].id === id) { return i; }
        }
        return -1;
    }

}
