import { takeUntil } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TipeService } from './../../../../services/tipe.service';
import { FiturService } from './../../../../services/fitur.service';
import { Subject, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private fiturService: FiturService,
    private tipeService: TipeService,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public md: any
  ) {
    this.form = this.fb.group({
      nama: ['', Validators.required],
      deskripsi: ['', Validators.required],
      waktuPengerjaan: ['', Validators.required],
      kesulitan: [0],
      estimasiHarga: [0],
      tipeId: ['', Validators.required],
      parent: [null]
    });
    this.dialogTitle = 'Tambah Fitur';
    this.fiturService.getAll().pipe(takeUntil(this.subject)).subscribe(({results}) => {
      this.fiturList = results;
    });
    this.tipeService.getAll().pipe(takeUntil(this.subject)).subscribe(({results}) => {
      this.tipeList = results;
    });
    if (this.md.data) {
      const { nama, deskripsi, waktuPengerjaan, kesulitan, estimasiHarga, tipeId, parent } = this.md.data;
      this.form.setValue({ nama, deskripsi, waktuPengerjaan, kesulitan, estimasiHarga, tipeId, parent });
      this.dialogTitle = 'Edit Fitur (' + nama + ')';
      this.add = false;
    }
  }

  form: FormGroup;
  subject = new Subject();
  subs = new Subscription();
  dialogTitle = '';
  fiturList = [];
  tipeList = [];
  add = true;

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
