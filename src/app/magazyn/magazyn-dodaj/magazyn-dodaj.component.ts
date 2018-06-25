import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Przedmiot, VAT_VALUES, JEDNOSTKI } from '../../model/przedmiot';
import { MagazynService } from '../../services/magazyn.service';

@Component({
  selector: 'app-magazyn-dodaj',
  templateUrl: './magazyn-dodaj.component.html',
  styleUrls: ['./magazyn-dodaj.component.css']
})
export class MagazynDodajComponent implements OnInit {

    przedmiot: Przedmiot;

    przedmiotAddForm: FormGroup;

  constructor(private fbp: FormBuilder, private mag: MagazynService) { }

  ngOnInit() {
    this.przedmiotAddForm = this.fbp.group({
            'nazwaPrzedmiotu': '',
            'czyUsluga': false,
            'cenaDomyslna': '',
            'vat': VAT_VALUES[0],
            'jednostka': JEDNOSTKI[1]
        });

        this.przedmiot = new Przedmiot();
  }

  private getVatTypes(): number[] {
        return VAT_VALUES;
    }

  private getJednostkTypes(): string[] {
        return JEDNOSTKI;
    }

}
