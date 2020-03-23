import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-organization-action',
  templateUrl: './organization-action.component.html',
  styleUrls: ['./organization-action.component.scss']
})
export class OrganizationActionComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OrganizationActionComponent>,
    @Inject(MAT_DIALOG_DATA) public md: any
  ) {
    this.dialogTitle = 'Tambah Organisasi';
    this.form = this.fb.group({
      nama: ['', Validators.required],
      alamat: ['', Validators.required],
      telepon: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      website: ['']
    });
    if (this.md.data) {
      const { nama, alamat, telepon, email, website } = this.md.data;
      this.form.setValue({ nama, alamat, telepon, email, website });
      this.dialogTitle = 'Edit Organisasi (' + nama + ')';
    }
  }

  form: FormGroup;
  subs = new Subscription();
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
