import { RolesService } from './../../services/roles.service';
import { UserService } from './../../services/user.service';
import { HelpersService } from './../../services/helpers.service';
import { FormStateMatcher } from './../../services/form-state-matcher';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  loginForm: FormGroup;
  fm = new FormStateMatcher();
  private unsubs = new Subject();

  ngOnInit() {
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
      this.activatedRoute.queryParams.pipe(takeUntil(this.unsubs))
      .subscribe(params => {
        const route = params.returnUrl ? params.returnUrl : '/backend/dashboard';
        setTimeout(() => {
          this.router.navigate([route]);
        }, 500);
      });
    }, err => {
      this.helper.sbError(err.message, 'Login gagal');
    });
  }

}
