import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Faktura } from '../../model/faktura';
import { Kontrahent } from '../../model/kontrahent';
import { DaneFirmy } from '../../model/danefirmy';
import { DaneFirmyService } from '../../services/danefirmy.service';
import { KontrahenciService } from '../../services/kontrahenci.service';
import { Przedmiot, JEDNOSTKI, VAT_VALUES } from '../../model/przedmiot';
import { MagazynService } from '../../services/magazyn.service';
import { FakturyService } from '../../services/faktury.service';


@Component({
  selector: 'app-faktura-dodaj',
  templateUrl: './faktura-dodaj.component.html',
  styleUrls: ['./faktura-dodaj.component.css']
})
export class FakturaDodajComponent implements OnInit {

  przedmioty: Przedmiot[] = [];
  kontrahenci: Kontrahent[] = [];
  daneFirmy: DaneFirmy;
  faktura: Faktura;

  //attributes_quantity_unit = ['szt', 'godz', 'dni', 'mc', 'km', 'm2', 'kg'];
  //attributes_tax = [23, 8, 7, 5, 0];
  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder, private df: DaneFirmyService, private magazyn: MagazynService, private kontr: KontrahenciService, private fakt: FakturyService) {
    this.faktura = new Faktura(); //zawsze tworz nowy obiekt, jak edytujemy to w ngOnInit wczytac edytowany obiekt   
  }

  /*getQuantityUnit():string[]{
    return JEDNOSTKI;
  }

  getVatValues():number[]{
    return VAT_VALUES;
  }*/

  ngOnInit() {
    this.magazyn.getPrzedmiotyList().then(val => {
      this.przedmioty = val;
    });

    this.kontr.getKontrahenciList().then(val => {
      this.kontrahenci = val;
    });

    this.df.getDaneFirmy().then(val => {
      this.daneFirmy = val;
    });

    this.createForm();
    //TODO poczekac na odpowiedzi np dane firmy itd, i dopiero wpisac je do formularza, bo niestety nie da sie synchronicznie poczekac na odp dot. danych firmy...
    //tak samo z faktura (jesli wczytujemy oczywiscie nowa fakture) i kontrahentami, oraz przedmiotami (chociaz one dzialaja o dziwo)
  }

  private onChangeKontrahent(event):void{

  }

  private onChangePrzedmiot(event, i):void{//event zmiany przedmiotu
    
  }

  private createForm():void{

    this.invoiceForm = this.fb.group({
      invoice_number: this.faktura.numerFaktury,
      invoice_issue_date: this.faktura.getDataWystawieniaAsString(),
      invoice_place: this.faktura.miejsceWystawienia,
      invoice_sell_date: this.faktura.getDataPlatnosciAsString(),
    seller: this.fb.group({
      invoice_seller_name: '',//nazwa naszej firmy
      invoice_seller_tax_no: '',//nip firmy
      invoice_seller_street: '',
      invoice_seller_post_code: '',
      invoice_seller_city: ''
    }),
    buyer: this.fb.group({
      invoice_buyer_name: '',//nazwa wlasna naszego kontrahenta (nie nazwa firmy!)
      invoice_buyer_typ: '',//typ kontrahenta - osoba prywatna czy firma?
      invoice_buyer_nazwafirmy: '',//nazwa firmy (lub imie i nazwisko)
      invoice_buyer_tax_no: '',
      invoice_buyer_street: '',
      invoice_buyer_post_code: '',
      invoice_buyer_city: ''
    }),
      invoice_positions: this.fb.array([this.InvoicePositions()])
    });

}

  


  private InvoicePositions(){
      return this.fb.group({
          attributes_id_name: [''],
          attributes_quantity: [''],
          attributes_quantity_unit: [''],
          attributes_price_net: [''],
          attributes_tax_per: [''],
          attributes_tax: [''],
          attributes_total_price_net: [''],
          attributes_total_price_gross: ['']
      });
  }

 addInvoicePosition() {
   const control = <FormArray>this.invoiceForm.controls['invoice_positions'];
   control.push(this.InvoicePositions());
 }

  delInvoicePosition(index: number) {
    const control = <FormArray>this.invoiceForm.controls['invoice_positions'];
    control.removeAt(index);
  }

}

