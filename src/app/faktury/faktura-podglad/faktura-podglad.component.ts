import { Component, OnInit } from '@angular/core';
import { Faktura, FAKTURA_TYPE } from '../../model/faktura';
import { Przedmiot, JEDNOSTKI, VAT_VALUES } from '../../model/przedmiot';
import { MagazynService } from '../../services/magazyn.service';
import { FakturyService } from '../../services/faktury.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-faktura-podglad',
  templateUrl: './faktura-podglad.component.html',
  styleUrls: ['./faktura-podglad.component.css']
})
export class FakturaPodgladComponent implements OnInit {

    idFaktury: number;

    //zmienne do widoku
    sprzedawcaNapis: string = 'Sprzedawca';
    nabywcaNapis: string = 'Nabywca';
    czyStrata: boolean = false;

    //obiekty przechowujace dane
    przedmioty: Przedmiot[] = [];
    //kontrahenci: Kontrahent[] = [];
    //daneFirmy: DaneFirmy;
    faktura: Faktura;


    constructor(private magazyn: MagazynService, private fakt: FakturyService, private location: Location, private route: ActivatedRoute) {
        this.faktura = new Faktura();
        this.idFaktury = +this.route.snapshot.paramMap.get('id');
    }

     getFakturaTypes():string[]{
        return FAKTURA_TYPE;
    }

    ngOnInit() {
        this.magazyn.getPrzedmiotyList().then(val => {
            this.przedmioty = val;//tablica
        });

        this.fakt.getFakturaById(this.idFaktury).subscribe(val => {
            this.faktura = val;

            if(val.czyStrata) {
                this.czyStrata = true;
            } else {
                this.czyStrata = false;
            }

            if(val.czyKoszt){
                this.sprzedawcaNapis = 'Nabywca';
                this.nabywcaNapis = 'Sprzedawca';
            } else {
                this.sprzedawcaNapis = 'Sprzedawca';
                this.nabywcaNapis = 'Nabywca';
            }
        });
    }

     getPrzedmiotById(id: number):Przedmiot{
        for(let i = 0;i<this.przedmioty.length;i++){
            if(this.przedmioty[i].id == id) return this.przedmioty[i];
        }
        return null;
    }

}
