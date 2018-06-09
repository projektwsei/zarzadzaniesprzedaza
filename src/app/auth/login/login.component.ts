import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private auth: AuthService) {
        auth.logout(); //wyloguj, przy wlaczeniu strony logowania
    }

    ngOnInit() {
        //this.auth.createUser('test5@wp.pl', 'abec1234', 'test usera');
        this.auth.login('test5@wp.pl', 'abec1234');

        //this.auth.loginWithGoogle();
        this.auth.getLoginState().subscribe(v => {
            console.log(v);
        });

        
    }

}

