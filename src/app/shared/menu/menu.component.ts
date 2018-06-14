import { Component, OnInit, AfterViewChecked } from '@angular/core';

declare var $: any; //aby uzywac jquery musi to byc

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewChecked {

    constructor() { }

    ngOnInit() {
    
    } 

    ngAfterViewChecked(){
        $('.nav a').on('click', (event) => {
            if(event.target.id!="menuUser") $('#navbar').collapse('hide');
        });
    }
}
