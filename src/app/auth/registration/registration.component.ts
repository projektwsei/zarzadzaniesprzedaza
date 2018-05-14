import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    constructor(private auth: AuthService) { 
        auth.logout(); //wyloguj, przy wlaczeniu strony rejestracji
    }

    ngOnInit() {
    
    }

}
