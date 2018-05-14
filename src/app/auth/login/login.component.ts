import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private auth: AuthService) { }

    ngOnInit() {
        //this.auth.createUser('test5@wp.pl', 'abec1234', 'test usera');
        this.auth.login('test5@wp.pl', 'abec1234');

        //this.test(this.auth);//wyswietli false
        //setInterval(this.test, 1000, this.auth);//wyswietli true
    }

    //test(auth: AuthService){
    //    console.log(auth.isLogged());
    //}

}

