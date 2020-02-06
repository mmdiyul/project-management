import { OrganizationService } from './../../../../services/organization.service';
import { RolesService } from './../../../../services/roles.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private rolesService: RolesService,
    private organizationService: OrganizationService,
    public dialogRef: MatDialogRef<UserActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public md: any
  ) {
    this.form = this.fb.group({
      nama: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      roleId: ['', Validators.required],
      organizationId: [null]
    });
    this.dialogTitle = 'Tambah Pengguna';
    this.rolesService.getAll().pipe(takeUntil(this.subject)).subscribe(({results}) => {
      this.rolesList = results;
    });
    this.organizationService.getAll().pipe(takeUntil(this.subject)).subscribe(({results}) => {
      this.organizationList = results;
    });
    if (this.md.data) {
      const { nama, username, email, password, roleId, organizationId } = this.md.data;
      this.form.setValue({nama, username, email, password, roleId: roleId._id, organizationId: organizationId ? organizationId._id : null});
      this.dialogTitle = 'Edit Pengguna (' + nama + ')';
    }
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

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }

}
