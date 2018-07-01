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
  savedPass: boolean;
  savedImieNazw: boolean;

  zmianaHaslaForm: FormGroup;
  haslo: AbstractControl;
  hasloPotwierdz: AbstractControl;
  constructor(private fb: FormBuilder, private u: UsersService) {
    this.savedPass = false;
    this.savedImieNazw = false;
  }

  ngOnInit() {
    // this.u.getCurrentUser().
    this.imieNazwiskoForm = this.fb.group({
      imieNazwisko: [this.u.getCurrentUser().imieNazw, Validators.required]
    });

    this.zmianaHaslaForm = this.fb.group({
      haslo: ['', [Validators.required, Validators.min(6)]],
      hasloPotwierdz: ['', [Validators.required, Validators.min(6)]],
    });

    this.imieNazwisko = this.imieNazwiskoForm.controls['imieNazwisko'];

    this.haslo = this.zmianaHaslaForm.controls['haslo'];
    this.hasloPotwierdz = this.zmianaHaslaForm.controls['hasloPotwierdz'];
  }

  zmienImieNazwisko(form: NgForm) {
    if (form.valid) {
      const user = this.u.getCurrentUser();
      user.imieNazw = this.imieNazwisko.value;
      this.u.saveUser(user);

      this.savedImieNazw = true;
      setTimeout(()=>{
          this.savedImieNazw = false;
      }, 6000);//po 6 sekundach ukryj napis "zapisano"

    } else {
      alert('Pole nie może byc puste');
    }

  }

  zmienHaslo(form: NgForm) {
    if (form.valid && this.haslo.value === this.hasloPotwierdz.value) {
      console.log('zmiana hasla');
      this.u.zmienHaslo(this.haslo.value);

      this.savedPass = true;
      setTimeout(()=>{
          this.savedPass = false;
      }, 6000);//po 6 sekundach ukryj napis "zapisano"

    } else {
      alert( 'Hało musi mieć minimum 6 znaków oraz hasła muszą się zgadzać');
    }
  }

}
