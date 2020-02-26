import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActionsComponent } from 'src/app/backend/pages/role/actions/actions.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fitur-actions',
  templateUrl: './fitur-actions.component.html',
  styleUrls: ['./fitur-actions.component.scss']
})
export class FiturActionsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public md: any
  ) {
    this.dialogTitle = 'Tambah Role';
    this.form = this.fb.group({
      nama: ['', Validators.required],
      deskripsi: ['', Validators.required],
      prioritas: [2, Validators.required]
    });
    if (this.md.data) {
      const { nama, deskripsi, prioritas } = this.md.data;
      this.form.setValue({nama, deskripsi, prioritas});
      this.dialogTitle = 'Edit Role (' + nama + ')';
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
