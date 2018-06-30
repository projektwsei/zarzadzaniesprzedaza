import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-aktywacja-rejestracji',
  templateUrl: './aktywacja-rejestracji.component.html',
  styleUrls: ['./aktywacja-rejestracji.component.css']
})
export class AktywacjaRejestracjiComponent implements OnInit {

  users: User[] = [];

  constructor(private us: UsersService) { }

  ngOnInit() {
    this.us.getUserList(true).subscribe(data => {
      this.users = data;
      console.log(data);
    });
  }

  potwierdz(index){
    this.us.potwierdzUser(this.users[index]);
  }

  usun(index) {
    this.us.deleteUser(this.users[index]);
    this.users.splice(index, 1);
  }

}
