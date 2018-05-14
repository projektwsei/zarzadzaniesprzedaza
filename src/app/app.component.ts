import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    private canShowMenu: boolean;

    constructor(){
        this.canShowMenu = false;
        //TODO pokazywanie menu tylko w przypadku, gdy jesteśmy zalogowani
    }
}
