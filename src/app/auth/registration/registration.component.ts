import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
    private observer;

    private formLogin: string = '';
    private formPass: string = '';
    private formImieNazw: string = '';


    constructor(private auth: AuthService, private router: Router) {

    }

    ngOnInit() {
        this.auth.logout(); //wyloguj, przy wlaczeniu strony rejestracji

        this.observer = this.auth.getLoginState().subscribe(v => {
            if (v.state === 4) {
                this.router.navigate(['/login']);
            }
        });
    }

    ngOnDestroy(){
        if(this.observer) this.observer.unsubscribe();
    }

    private zarejestruj(){
        this.auth.createUser(this.formLogin, this.formPass, this.formImieNazw);
    }

}
