import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-fitur-action',
  templateUrl: './fitur-action.component.html',
  styleUrls: ['./fitur-action.component.scss']
})
export class FiturActionComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FiturActionComponent>,
    @Inject(MAT_DIALOG_DATA) public md: any
  ) {
    this.dialogTitle = 'Tambah Fitur';
    this.form = this.fb.group({
      nama: ['', Validators.required],
      deskripsi: ['', Validators.required],
      waktuPengerjaan: ['', Validators.required],
      kesulitan: ['', Validators.required],
      estimasiHarga: ['', Validators.required],
      tipeId: ['', Validators.required],
      parent: [null]
    });
    if (this.md.data) {
      const { nama, deskripsi, waktuPengerjaan, kesulitan, estimasiHarga, tipeId, parent } = this.md.data;
      this.form.setValue({ nama, deskripsi, waktuPengerjaan, kesulitan, estimasiHarga, tipeId, parent });
      this.dialogTitle = 'Edit Fitur (' + nama + ')';
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
