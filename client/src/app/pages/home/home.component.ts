import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { HelpersService } from './../../services/helpers.service';
import { User } from './../../services/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser: User;

  constructor(
    private helper: HelpersService,
    private auth: AuthService,
    private router: Router
  ) {
    this.currentUser = this.helper.currentUser();
  }

  ngOnInit() {
    if (localStorage.getItem('reload')) {
      window.location.reload();
      localStorage.removeItem('reload');
    }
    if (this.currentUser.roleId.nama !== 'developer' && this.currentUser.roleId !== null) {
      this.router.navigate(['/backend/dashboard']);
    }
  }

}
