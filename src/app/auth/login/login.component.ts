import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    private observer;

    private formLogin: string = '';
    private formPass: string = '';

    constructor(private auth: AuthService, private router: Router) {

    }

    ngOnInit() {
        this.auth.logout(); //wyloguj, przy wlaczeniu strony logowania

        this.observer = this.auth.getLoginState().subscribe(v => {
            console.log(v);
            if (v.state === 3) {
                this.router.navigate(['/home']);
            }
        });
    }

    ngOnDestroy(){
        if(this.observer) this.observer.unsubscribe();
    }

    private zaloguj(): void{
        this.auth.login(this.formLogin, this.formPass);
    }

    private loginGoogle():void{
        this.auth.loginWithGoogle();
    }

}

