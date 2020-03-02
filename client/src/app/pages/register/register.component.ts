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
    // this.dialogTitle = 'Tambah Pengguna';
    // this.rolesService.getAll().pipe(takeUntil(this.subject)).subscribe(({results}) => {
    //   this.rolesList = results;
    // });
    // this.organizationService.getAll().pipe(takeUntil(this.subject)).subscribe(({results}) => {
    //   this.organizationList = results;
    // });
    // if (this.md.data) {
    //   const { nama, username, email, password, roleId, organizationId } = this.md.data;
    //   this.form.setValue({nama, username, email, password, roleId: roleId._id, organizationId: organizationId ? organizationId._id : null});
    //   this.dialogTitle = 'Edit Pengguna (' + nama + ')';
    // }
  }

  form: FormGroup;
  subject = new Subject();
  subs = new Subscription();
  rolesList = [];
  organizationList = [];
  dialogTitle = '';

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
