import { AuthService } from './../../services/auth.service';
import { HelpersService } from './../../services/helpers.service';
import { User } from 'src/app/services/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed: true;
  currentUser: User;

  constructor(
    private helper: HelpersService,
    private auth: AuthService
  ) {
    this.currentUser = this.helper.currentUser();
  }

  ngOnInit() {
  }

  logout() {
    setTimeout(() => {
      this.auth.logout();
    }, 500);
  }

}
