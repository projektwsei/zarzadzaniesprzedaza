import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-klienci-dodaj',
  templateUrl: './klienci-dodaj.component.html',
  styleUrls: ['./klienci-dodaj.component.css']
})
export class KlienciDodajComponent implements OnInit {

  clientAddForm: FormGroup;
  constructor(
    fbc: FormBuilder) {
      this.clientAddForm = fbc.group({
      'buyer_name': [],
      'buyer_tax_no': [],
      'buyer_street': [],
      'buyer_post_code': [],
      'buyer_city': [],
      'seller_bank_account': [],
      'seller_bank': []
    });
  }

  ngOnInit() {
  }

}
