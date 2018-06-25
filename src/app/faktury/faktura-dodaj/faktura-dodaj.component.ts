import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Faktura, FAKTURA_TYPE } from '../../model/faktura';
import { Kontrahent } from '../../model/kontrahent';
import { DaneFirmy } from '../../model/danefirmy';
import { DaneFirmyService } from '../../services/danefirmy.service';
import { KontrahenciService } from '../../services/kontrahenci.service';
import { Przedmiot, JEDNOSTKI, VAT_VALUES } from '../../model/przedmiot';
import { MagazynService } from '../../services/magazyn.service';
import { FakturyService } from '../../services/faktury.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../model/user';


@Component({
  selector: 'app-faktura-dodaj',
  templateUrl: './faktura-dodaj.component.html',
  styleUrls: ['./faktura-dodaj.component.css']
})
export class FakturaDodajComponent implements OnInit {
  //zmienne do widoku
  sprzedawcaNapis: string = 'Sprzedawca';
  nabywcaNapis: string = 'Nabywca';
  czyStrata: boolean = false;

  //obiekty przechowujace dane
  przedmioty: Przedmiot[] = [];
  kontrahenci: Kontrahent[] = [];
  daneFirmy: DaneFirmy;
  faktura: Faktura;

  //zmienne pomocnicze
  isEdit: boolean = false;
  kontrahentChanged: boolean = false;
  idFaktury: number;

  //jednostka = ['szt', 'godz', 'dni', 'mc', 'km', 'm2', 'kg'];
  //vat = [23, 8, 7, 5, 0];
  fakturaForm: FormGroup;

  constructor(private fb: FormBuilder, private df: DaneFirmyService, private magazyn: MagazynService,
    private kontr: KontrahenciService, private fakt: FakturyService, private users: UsersService, 
    private location: Location, private route: ActivatedRoute) {

  }

  /*getQuantityUnit():string[]{
    return JEDNOSTKI;
  }

  getVatValues():number[]{
    return VAT_VALUES;
  }*/

  private getFakturaTypes(): string[] {
    return FAKTURA_TYPE;
  }

  ngOnInit() {
    this.createForm();

    this.faktura = new Faktura();
    this.idFaktury = +this.route.snapshot.paramMap.get('id');
    if (this.idFaktury === -1){
      this.isEdit = false;
    }


    //TODO pobrać dane faktury (jeśli sciezka w adresie jest liczba a nie napisem 'new'). Jeśli napis 'new' tworzymy nowa instancje faktury
    //jesli edycja: this.isEdit = true;

    this.magazyn.getPrzedmiotyList().then(val => {
      this.przedmioty = val;//tablica
    });

    this.kontr.getKontrahenciList().then(val => {
      this.kontrahenci = val;//tablica
    });

    if (!this.isEdit) {//jesli to NIE JEST edycja to pobieramy aktualne dane firmy z bazdy
      this.df.getDaneFirmy().then(val => {
        this.daneFirmy = val;

        this.fakturaForm.controls.daneFirmy.get('nazwaFirmy').setValue(val.nazwaFirmy);
        this.fakturaForm.controls.daneFirmy.get('nip').setValue(val.nip);
        this.fakturaForm.controls.daneFirmy.get('adres').setValue(val.adres);
        this.fakturaForm.controls.daneFirmy.get('kodPocztowy').setValue(val.kodPocztowy);
        this.fakturaForm.controls.daneFirmy.get('miasto').setValue(val.miasto);
      });
    }//jesli to jest edycja, dane firmy sa juz na fakturze

  }

  private onChangePrzedmiot(event, pos): void {//zmiana przedmioty, event zawiera obiekt Przedmiot
    this.selectPrzedmiot(event.target.value, pos);
  }

  private onChangeFakturaType(event): void {
    let v = event.target.value;

    if (v == FAKTURA_TYPE[0]) { //zwykla faktura, my jestesmy sprzedajacy
      this.sprzedawcaNapis = 'Sprzedawca';
      this.nabywcaNapis = 'Nabywca';
      this.czyStrata = false;
    } else if (v == FAKTURA_TYPE[1]) {//koszt, my jestesmy kupujacymi (nie ma to wplywu na model danych w fakturze, tylko na napisy w widoku)
      this.sprzedawcaNapis = 'Nabywca';
      this.nabywcaNapis = 'Sprzedawca';
      this.czyStrata = false;
    } else if (v == FAKTURA_TYPE[2]) {//jest to strata towaru w magazynie, ukrywamy pola Sprzedawca i Nabywca
      this.czyStrata = true;
    }
  }

  private createForm(): void {

    this.fakturaForm = this.fb.group({
      numerFaktury: '',
      dataWystawienia: '',
      miejsceWystawienia: '',
      dataPlatnosci: '',
      fakturaType: FAKTURA_TYPE[0],
      opis: '',
      daneFirmy: this.fb.group({
        nazwaFirmy: '',
        nip: '',
        adres: '',
        kodPocztowy: '',
        miasto: '',
      }),
      kontrahent: this.fb.group({
        nazwaFirmy: '',
        nip: '',
        adres: '',
        kodPocztowy: '',
        miasto: ''
      }),
      przedmioty: this.fb.array([this.Przedmioty()])
    });

    this.fakturaForm.controls.kontrahent.get('nazwaFirmy').valueChanges.subscribe(value => {
      this.selectKontrahent(value);
    });
  }


  private Przedmioty() {
    return this.fb.group({
      nazwa: [''],
      ilosc: [''],
      jednostka: [''],
      cenaNetto: [''],
      vat: [''],
      wartoscVat: [''],
      wartoscNetto: [''],
      wartoscBrutto: ['']
    });
  }

  private addPrzedmioty() {
    const control = <FormArray>this.fakturaForm.controls['przedmioty'];
    control.push(this.Przedmioty());
  }

  private delPrzedmioty(index: number) {
    const control = <FormArray>this.fakturaForm.controls['przedmioty'];
    control.removeAt(index);
  }

  private selectKontrahent(val: any = null): void {
    let k = this.kontrahenci.find(el => el.id == val);//tu musi byc '==' a nie '===' bo z formularza pobiera nam stringa, a nie number
    if (k) {
      this.kontrahentChanged = true;

      if (k.firma) this.fakturaForm.controls.kontrahent.get('nip').setValue(k.nip);
      else this.fakturaForm.controls.kontrahent.get('nip').setValue('(osoba fizyczna)');

      this.fakturaForm.controls.kontrahent.get('adres').setValue(k.adres);
      this.fakturaForm.controls.kontrahent.get('kodPocztowy').setValue(k.kodPocztowy);
      this.fakturaForm.controls.kontrahent.get('miasto').setValue(k.miasto);
    }
  }

  private selectPrzedmiot(val: any = null, pos: number): void {
    let p = this.przedmioty.find(el => el.id == val);//tu musi byc '==' a nie '===' bo z formularza pobiera nam stringa, a nie number
    if (p) {
      if (p.czyUsluga == false) {
        this.fakturaForm.get('przedmioty.' + pos).get('jednostka').setValue(p.jednostka);
        this.fakturaForm.get('przedmioty.' + pos).get('ilosc').setValue('0');
        this.fakturaForm.get('przedmioty.' + pos).get('ilosc').enable();
      } else {
        this.fakturaForm.get('przedmioty.' + pos).get('jednostka').setValue(JEDNOSTKI[0]); //JEDNOSTKI[0] = 'Usługa'
        this.fakturaForm.get('przedmioty.' + pos).get('ilosc').setValue('1');
        this.fakturaForm.get('przedmioty.' + pos).get('ilosc').disable();
      }

      this.fakturaForm.get('przedmioty.' + pos).get('cenaNetto').setValue(p.cenaDomyslna);
      this.fakturaForm.get('przedmioty.' + pos).get('vat').setValue(p.vat);
    }
  }

  private onSubmitAdd(v): void {
    //sprawdz czy sa przedmioty:
    let hasPrzedmioty = false;
    for (let i = 0; i < v.przedmioty.length; i++) {
      if (v.przedmioty[i].nazwa != '') {
        hasPrzedmioty = true;
        break;
      }
    }

    if (!hasPrzedmioty) {
      //TODO musi znajdowac sie jeden przedmiot na fakturze!
    }

    //sprawdz czy jest kontrahent (jesli nie strata)
    let k = this.kontrahenci.find(el => el.id == v.kontrahent.nazwaFirmy);//tu trzymane jest ID kontrahenta :)
    if (!k && v.fakturaType != FAKTURA_TYPE[2]) {
      //TODO musi byc kontrahent (jesli nie jest to strata)
    }


    //////ZAPIS FAKTURY:
    const f = this.faktura;//albo nowa faktura, albo edycja istniejacej

    //f.id ustawiane automatycznie podczas dodawania, lub jest juz ustawione podczas edycji
    f.numerFaktury = v.numerFaktury;
    f.dataWystawienia = v.dataWystawienia;
    f.miejsceWystawienia = v.miejsceWystawienia;
    f.dataPlatnosci = v.dataPlatnosci;
    f.opis = v.opis;

    if (v.fakturaType == FAKTURA_TYPE[0]) {//faktura
      f.czyKoszt = false;
      f.czyStrata = false;
    } else if (v.fakturaType == FAKTURA_TYPE[1]) {//koszt
      f.czyKoszt = true;
      f.czyStrata = false;
    } else if (v.fakturaType == FAKTURA_TYPE[2]) {//strata
      f.czyKoszt = false;
      f.czyStrata = true;
    }

    //dane firmy
    f.daneFirmy = this.daneFirmy;

    //kontrahent
    if (v.fakturaType == FAKTURA_TYPE[2]) {//strata, wiec nie musi byc kontrahenta
      f.kontrahent = new Kontrahent();//pusty kontrahent, by zapisac w bazie
    } else {//faktura lub koszt - jest kontrahent
      let canSetKontrahent = true;
      if (this.isEdit && !this.kontrahentChanged) canSetKontrahent = false;//jesli nie zmieniono kontrahenta w trybie edycji, to go nie modyfikuj (zostaw stare dane)

      if (canSetKontrahent) f.kontrahent = k;
    }

    //wystawiajacy/modyfikujacy fakture (aktualny user)
    if (!this.isEdit) {
      f.wystawiajacy_id = this.users.getCurrentUser().uid;
      f.wystawiajacyImieNazw = this.users.getCurrentUser().imieNazw;
    } else {
      f.lastMod_id = this.users.getCurrentUser().uid;
      f.lastModImieNazw = this.users.getCurrentUser().uid;
    }

    //przedmioty
    f.clearPrzedmioty();//najpierw wyczysc stare przedmioty

    for (let i = 0; i < v.przedmioty.length; i++) {
      if (v.przedmioty[i].nazwa != '') { //tutaj w nazwie trzymane jest ID przedmiotu
        let p = this.przedmioty.find(el => el.id == v.przedmioty[i].nazwa);
        if (p) {
          let ilosc;
          if (p.czyUsluga == false) ilosc = v.przedmioty[i].ilosc;
          else ilosc = 1;//ilosc dla uslug

          if (typeof (ilosc) == 'string') {
            ilosc = Number(ilosc.replace(',', '.'));
          }

          let cena = v.przedmioty[i].cenaNetto;
          if (typeof (cena) == 'string') {
            cena = Number(cena.replace(',', '.'));
          }

          f.addPrzedmiot(p.id, ilosc, cena, p.vat);
        }
      }
    }

    if (!this.isEdit) {
      this.fakt.addFaktura(f);
    } else {
      this.fakt.updateFaktura(f);
    }
    // Powrót do poprzedniej strony
    this.location.back();

    
  }

  anuluj(){
    this.location.back();
  }

}

