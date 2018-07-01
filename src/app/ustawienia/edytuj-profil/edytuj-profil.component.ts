import { FormBuilder, FormGroup, AbstractControl, Validators, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-edytuj-profil',
  templateUrl: './edytuj-profil.component.html',
  styleUrls: ['./edytuj-profil.component.css']
})
export class EdytujProfilComponent implements OnInit {
  imieNazwiskoForm: FormGroup;
  imieNazwisko: AbstractControl;


  zmianaHaslaForm: FormGroup;
  stareHaslo: AbstractControl;
  haslo: AbstractControl;
  hasloPotwierdz: AbstractControl;
  constructor(private fb: FormBuilder, private u: UsersService) { }

  ngOnInit() {
    // this.u.getCurrentUser().
    this.imieNazwiskoForm = this.fb.group({
      imieNazwisko: [this.u.getCurrentUser().imieNazw, Validators.required]
    });

    this.zmianaHaslaForm = this.fb.group({
      stareHaslo: ['', [Validators.required, Validators.min(6)]],
      haslo: ['', [Validators.required, Validators.min(6)]],
      hasloPotwierdz: ['', [Validators.required, Validators.min(6)]],
    });

    this.imieNazwisko = this.imieNazwiskoForm.controls['imieNazwisko'];

    this.stareHaslo = this.zmianaHaslaForm.controls['stareHaslo'];
    this.haslo = this.zmianaHaslaForm.controls['haslo'];
    this.hasloPotwierdz = this.zmianaHaslaForm.controls['hasloPotwierdz'];
  }

  zmienImieNazwisko(form: NgForm) {
    if (form.valid) {
      const user = this.u.getCurrentUser();
      user.imieNazw = this.imieNazwisko.value;
      this.u.saveUser(user);
    } else {
      alert('Pole nie może byc puste');
    }
  }

  zmienHaslo(form: NgForm) {
    if (form.valid && this.haslo.value === this.hasloPotwierdz.value) {
      console.log('zmiana');
      this.u.zmienHaslo(this.haslo.value);
    } else {
      alert( 'Hało musi mieć minimum 6 znaków oraz hasła muszą się zgadzać');
    }
  }

}
