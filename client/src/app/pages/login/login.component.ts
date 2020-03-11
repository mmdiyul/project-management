import { HelpersService } from './../../services/helpers.service';
import { FormStateMatcher } from './../../services/form-state-matcher';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/services/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private helper: HelpersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.currentUser = this.helper.currentUser();
    if (this.currentUser !== null) {
      if (this.currentUser.roleId.nama === 'superadmin' || this.currentUser.roleId.nama === 'admin') {
        this.router.navigate(['/backend/dashboard']);
      } else if (this.currentUser.roleId.nama === 'developer') {
        this.router.navigate(['/home']);
      }
    }
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  currentUser: User;
  loginForm: FormGroup;
  fm = new FormStateMatcher();
  private unsubs = new Subject();

  ngOnInit() {
    if (localStorage.getItem('reload')) {
      window.location.reload();
      localStorage.removeItem('reload');
    }
  }

  ngOnDestroy(): void {
    this.unsubs.next();
    this.unsubs.complete();
  }

  onSubmit() {
    this.auth.login(this.loginForm.get('username').value, this.loginForm.get('password').value).pipe(takeUntil(this.unsubs))
    .subscribe(res => {
      localStorage.setItem(this.auth.localUser, JSON.stringify(res.user));
      localStorage.setItem(this.auth.localToken, res.token);
      localStorage.setItem('reload', 'yes');
      this.activatedRoute.queryParams.pipe(takeUntil(this.unsubs))
      .subscribe(params => {
        const routeAdmin = params.returnUrl ? params.returnUrl : '/backend/dashboard';
        const routeDeveloper = params.returnUrl ? params.returnUrl : '/home';
        setTimeout(() => {
          const role = JSON.parse(localStorage.getItem(this.auth.localUser)).roleId.nama;
          if (role === 'developer') {
            this.router.navigate([routeDeveloper]);
          } else {
            this.router.navigate([routeAdmin]);
          }
        }, 500);
      });
    }, err => {
      this.helper.sbError(err.message, 'Login gagal');
    });
  }

}
