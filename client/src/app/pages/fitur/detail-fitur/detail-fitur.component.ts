import { RemoveDialogComponent } from './../../../backend/partials/remove-dialog/remove-dialog.component';
import { MatDialog } from '@angular/material';
import { EditComponent } from './edit/edit.component';
import { HelpersService } from './../../../services/helpers.service';
import { User } from './../../../services/user';
import { VoteService } from './../../../services/vote.service';
import { Fitur } from 'src/app/services/fitur';
import { Vote } from 'src/app/services/vote';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FiturService } from './../../../services/fitur.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail-fitur',
  templateUrl: './detail-fitur.component.html',
  styleUrls: ['./detail-fitur.component.scss']
})
export class DetailFiturComponent implements OnInit {
  dataSource: Fitur;
  voteData: Vote[];

  constructor(
    private fb: FormBuilder,
    private fiturService: FiturService,
    private voteService: VoteService,
    private route: ActivatedRoute,
    private router: Router,
    private helper: HelpersService,
    private dialog: MatDialog
  ) {
    this.currentUser = this.helper.currentUser();
    if (this.currentUser) {
      this.userId = this.currentUser._id;
    }
    this.form = this.fb.group({
      kesulitan: ['', Validators.required],
      harga: ['', Validators.required],
      fiturId: [null]
    });
   }

  currentUser: User;
  userId: string;
  private subs = new Subject();
  id: string;
  form: FormGroup;
  kesulitanList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  checkVote = true;
  mine = false;
  private modalWidth = '800px';
  private unsubs = new Subject();
  private subject = 'nama';

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.subs)).subscribe(params => {
      this.id = params.id;
      this.getData();
    });
  }
  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }
  getData() {
    this.fiturService.getById(this.id)
      .pipe(takeUntil(this.subs))
      .subscribe((fitur) => {
        this.dataSource = fitur;
        if (fitur.createdBy._id === this.userId) {
          this.mine = true;
        }
      });
    this.voteService.getAllNoLimit()
      .subscribe(({results}) => {
        this.voteData = results;
        this.voteData.forEach(element => {
          if (this.currentUser) {
            if (element.fiturId._id === this.id && element.userId._id === this.userId) {
              this.checkVote = false;
            }
          }
        });
      });
  }
  onSubmit() {
    this.form.controls.fiturId.setValue(this.id);
    this.voteService.insert(this.form.value)
    .pipe(takeUntil(this.subs))
      .subscribe(() => {
        this.form.reset();
        const route = '/fitur';
        this.router.navigate([route]);
        this.getData();
        this.helper.sbSuccess(`Vote berhasil ditambahkan`);
      }, err => {
        this.helper.sbError(err);
      });
  }

  edit(data) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: { action: 'edit', data},
      width: this.modalWidth
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fiturService.updateById(data._id, result)
        .pipe(takeUntil(this.unsubs))
        .subscribe(() => {
          this.getData();
          this.helper.sbSuccess(`${result[this.subject]} diperbarui`);
        }, err => {
          this.helper.sbError(err);
        });
      }
    });
  }

  remove(data) {
    this.dialog.open(RemoveDialogComponent).afterClosed().subscribe(result => {
      if (result) {
        this.fiturService.removeById(data._id).pipe(takeUntil(this.unsubs)).subscribe(() => {
          this.getData();
          this.helper.sbSuccess(`${data[this.subject]} dihapus`);
          this.router.navigate(['/fitur']);
        }, err => {
          this.helper.sbError(err);
        });
      }
    });
  }
}
