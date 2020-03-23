import { HelpersService } from './../../../../services/helpers.service';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from './../../../../services/user.service';
import { FiturService } from './../../../../services/fitur.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-vote-action',
  templateUrl: './vote-action.component.html',
  styleUrls: ['./vote-action.component.scss']
})
export class VoteActionComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private fiturService: FiturService,
    private userService: UserService,
    public dialogRef: MatDialogRef<VoteActionComponent>,
    @Inject(MAT_DIALOG_DATA) public md: any,
    private helper: HelpersService
  ) {
    this.form = this.fb.group({
      kesulitan: ['', Validators.required],
      harga: ['', Validators.required],
      fiturId: ['', Validators.required]
    });
    this.dialogTitle = 'Tambah Vote';
    this.fiturService.getAll().pipe(takeUntil(this.subject)).subscribe(({results}) => {
      this.fiturList = results;
    });
    if (this.md.data) {
      const { kesulitan, harga, fiturId } = this.md.data;
      this.form.setValue({kesulitan, harga, fiturId: fiturId._id});
      this.dialogTitle = 'Edit Vote untuk (' + fiturId.nama + ')';
    }
  }

  form: FormGroup;
  subject = new Subject();
  subs = new Subscription();
  dialogTitle = '';
  fiturList = [];
  kesulitanList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
