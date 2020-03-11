import { Routes, Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActionsComponent } from 'src/app/backend/pages/role/actions/actions.component';
import { Subscription, Subject } from 'rxjs';
import { FiturService } from 'src/app/services/fitur.service';
import { TipeService } from 'src/app/services/tipe.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-fitur-actions',
  templateUrl: './fitur-actions.component.html',
  styleUrls: ['./fitur-actions.component.scss']
})
export class FiturActionsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private fiturService: FiturService,
    private tipeService: TipeService,
    private router: Router
    // public dialogRef: MatDialogRef<FiturActionsComponent>,
    // @Inject(MAT_DIALOG_DATA) public md: any
  ) {
    this.form = this.fb.group({
      nama: ['', Validators.required],
      deskripsi: ['', Validators.required],
      waktuPengerjaan: ['', Validators.required],
      kesulitan: ['', Validators.required],
      estimasiHarga: ['', Validators.required],
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
    // if (this.md.data) {
    //   const { nama, deskripsi, waktuPengerjaan, kesulitan, estimasiHarga, tipeId, parent } = this.md.data;
    //   this.form.setValue({ nama, deskripsi, waktuPengerjaan, kesulitan, estimasiHarga, tipeId, parent });
    //   this.dialogTitle = 'Edit Fitur (' + nama + ')';
    // }
  }

    dataSource = [];
    countDataSearch = 0;
    isLoadingResults = true;
    resultsLength = 0;
    form: FormGroup;
    subject = new Subject();
    subs = new Subscription();
    dialogTitle = '';
    fiturList = [];
    tipeList = [];

    ngOnInit() {
      this.getData();
    }

    onSubmit() {
      this.fiturService.insert(this.form.value).pipe(takeUntil(this.subject)).subscribe(results => {
        this.form.reset();
        const route = '/fitur';
        this.router.navigate([route]);
      });
      }

      getData() {
        this.isLoadingResults = true;
        this.fiturService.getAll()
          .subscribe(({count, results}) => {
            this.dataSource = results;
            this.resultsLength = count;
            this.isLoadingResults = false;
            this.countDataSearch = results.length;
          }, (err) => {
            this.isLoadingResults = false;
            console.log(err);
          });
        }
}
