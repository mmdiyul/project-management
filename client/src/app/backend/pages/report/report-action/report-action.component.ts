import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../../../services/user.service';
import { FiturService } from '../../../../services/fitur.service';
import { Subscription, Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-report-action',
  templateUrl: './report-action.component.html',
  styleUrls: ['./report-action.component.scss']
})
export class ReportActionComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private fiturService: FiturService,
    private userService: UserService,
    public dialogRef: MatDialogRef<ReportActionComponent>,
    @Inject(MAT_DIALOG_DATA) public md: any
  ) {
    this.form = this.fb.group({
      pesan: ['', Validators.required],
      userId: ['', Validators.required],
      fiturId: ['', Validators.required]
    });
    this.dialogTitle = 'Tambah Laporan';
    this.fiturService.getAll().pipe(takeUntil(this.subject)).subscribe(({results}) => {
      this.fiturList = results;
    });
    this.userService.getAll().pipe(takeUntil(this.subject)).subscribe(({results}) => {
      this.userList = results;
    });
    if (this.md.data) {
      const { pesan, userId, fiturId } = this.md.data;
      this.form.setValue({pesan, userId: userId._id, fiturId: fiturId._id});
      this.dialogTitle = 'Edit Laporan untuk (' + fiturId.nama + ')';
    }
  }

  form: FormGroup;
  subject = new Subject();
  subs = new Subscription();
  dialogTitle = '';
  fiturList = [];
  userList = [];

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
