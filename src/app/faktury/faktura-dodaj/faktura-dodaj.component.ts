import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-faktura-dodaj',
  templateUrl: './faktura-dodaj.component.html',
  styleUrls: ['./faktura-dodaj.component.css']
})
export class FakturaDodajComponent implements OnInit {




  attributes_quantity_unit = ['szt', 'godz', 'dni', 'mc', 'km', 'm2', 'kg'];
  attributes_tax = [23, 8, 7, 5, 0];
  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.createForm();
   }

   createForm() {

    this.invoiceForm = this.fb.group({
      invoice_number: '',
      invoice_issue_date: '',
      invoice_place: '',
      invoice_sell_date: '',
    seller: this.fb.group({
      invoice_seller_name: '',
      invoice_seller_tax_no: '',
      invoice_seller_street: '',
      invoice_seller_post_code: '',
      invoice_seller_city: '',
      invoice_seller_bank_account: '',
      invoice_seller_bank: ''
    }),
    buyer: this.fb.group({
      invoice_buyer_name: '',
      invoice_buyer_tax_no: '',
      invoice_buyer_street: '',
      invoice_buyer_post_code: '',
      invoice_buyer_city: ''
    }),
      invoice_positions: this.fb.array([this.InvoicePositions()])
    });

}

  ngOnInit() {

  }


InvoicePositions() {
    return this.fb.group({
        attributes_name: [''],
        attributes_quantity: [''],
        attributes_quantity_unit: ['szt'],
        attributes_price_net: [''],
        attributes_tax_per: ['23'],
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

