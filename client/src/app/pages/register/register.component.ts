import { User } from 'src/app/services/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormStateMatcher } from 'src/app/services/form-state-matcher';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private helper: HelpersService
    // public dialogRef: MatDialogRef<UserActionsComponent>,
    // @Inject(MAT_DIALOG_DATA) public md: any
  ) {
    this.form = this.fb.group({
      nama: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
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

  form: FormGroup;
  subject = new Subject();
  subs = new Subscription();
  rolesList = [];
  organizationList = [];
  dialogTitle = '';
  currentUser: User;

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onSubmit() {
    this.userService.insert(this.form.value).pipe(takeUntil(this.subject)).subscribe(results => {
      this.form.reset();
      const route = '/login';
      this.router.navigate([route]);
    }, err => {
      this.helper.sbError(err.message, 'Register Gagal!');
    });
  }

}
