import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormStateMatcher } from 'src/app/services/form-state-matcher';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private helper: HelpersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      nama: ['', Validators.required],
      email: ['', Validators.email, Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get nama() {
    return this.registerForm.get('nama');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }

  registerForm: FormGroup;
  fm = new FormStateMatcher();
  private unsubs = new Subject();

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubs.next();
    this.unsubs.complete();
  }

  onSubmit() {
    this.auth.login(this.registerForm.get('username').value, this.registerForm.get('password').value).pipe(takeUntil(this.unsubs))
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
