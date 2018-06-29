import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    canShowMenu: boolean = false;

    constructor(private auth: AuthService) {
        this.canShowMenu = false;
        this.auth.getLoginState().subscribe(data => {
            if (data.state === 2) {
                this.canShowMenu = true;
            } else {
                this.canShowMenu = false;
            }
        });
    }

    // public setCanShowMenu(b: boolean) {
    //     this.canShowMenu = b;
    // }
}

