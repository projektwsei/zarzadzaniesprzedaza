import { UsersService } from './../services/users.service';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';

declare var $: any; //aby uzywac jquery musi to byc

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewChecked {
    nazwaUzytkownika = '';
    constructor(private u: UsersService) { }

    ngOnInit() {
    this.nazwaUzytkownika = this.u.getCurrentUser().imieNazw;
    console.log(this.u.getCurrentUser().imieNazw);
    }

    ngAfterViewChecked(){
        $('.nav a').on('click', (event) => {
            if(event.target.id!="menuUser") $('#navbar').collapse('hide');
        });
    }
}
