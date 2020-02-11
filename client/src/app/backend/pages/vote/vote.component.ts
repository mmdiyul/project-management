import { RemoveDialogComponent } from './../../partials/remove-dialog/remove-dialog.component';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { VoteActionComponent } from './vote-action/vote-action.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { VoteService } from './../../../services/vote.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';

// export interface PeriodicElement {
//   fitur: string;
//   kesulitan: number;
//   harga: number;
//   user: string;
// }

// const data: PeriodicElement[] = [
//   {
//     fitur: 'Daftar dengan Google',
//     kesulitan: 7,
//     harga: 100000,
//     user: 'Test User'
//   },
//   {
//     fitur: 'Daftar dengan Google',
//     kesulitan: 7,
//     harga: 100000,
//     user: 'Test User'
//   },
//   {
//     fitur: 'Daftar dengan Google',
//     kesulitan: 7,
//     harga: 100000,
//     user: 'Test User'
//   },
// ];

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteBackendComponent implements OnInit {

  displayedColumns: string[] = ['index', 'fitur', 'kesulitan', 'harga', 'user', 'actions'];
  dataSource = [];
  resultsLength = 0;

  constructor(
    private services: VoteService,
    private dialog: MatDialog,
    private helper: HelpersService
  ) { }

  private modalWidth = '800px';
  private unsubs = new Subject();
  private subject = 'fitur';
  countDataSearch = 0;
  isLoadingResults = true;
  sortActive = 'nama';
  sortDirection = 'asc';
  limit = 5; offset = 0;
  page = 1;
  pageSizeOpts = [5, 10, 25, 100];
  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngOnInit() {
    this.getData();
    this.searchForm.get('search').valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(val => {
      this.isLoadingResults = true;
      this.services.getAll(val, this.sortActive, this.sortDirection, this.offset).subscribe(({count, results}) => {
        this.dataSource = results;
        this.resultsLength = count;
        this.countDataSearch = results.length;
        this.isLoadingResults = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubs.next();
    this.unsubs.complete();
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.offset = this.paginator.pageIndex * this.paginator.pageSize;
      this.limit = this.paginator.pageSize;
      this.page = this.paginator.pageIndex + 1;
      this.getData();
    });
    this.paginator._intl.itemsPerPageLabel = 'Jumlah Baris';
  }

  getData() {
    this.isLoadingResults = true;
    this.services.getAll( this.searchForm.get('search').value, this.sortActive, this.sortDirection, this.offset, this.limit, this.page )
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

  add() {
    const dialogRef = this.dialog.open(VoteActionComponent, {
      data: { action: 'add', data: null },
      width: this.modalWidth
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.services.insert(result)
        .pipe(takeUntil(this.unsubs))
        .subscribe(() => {
          this.getData();
          this.helper.sbSuccess(`${result[this.subject]} ditambahkan`);
          // console.log(`${result[this.subject]} ditambahkan`);
        }, err => {
          this.helper.sbError(err);
          // console.log(err);
        });
      }
    });
  }

  edit(data) {
    const dialogRef = this.dialog.open(VoteActionComponent, {
      data: { action: 'edit', data},
      width: this.modalWidth
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.services.updateById(data._id, result)
        .pipe(takeUntil(this.unsubs))
        .subscribe(() => {
          this.getData();
          this.helper.sbSuccess(`${result[this.subject]} diperbarui`);
          // console.log(`${result[this.subject]} diperbarui`);
        }, err => {
          this.helper.sbError(err);
          // console.log(err);
        });
      }
    });
  }

  remove(data) {
    this.dialog.open(RemoveDialogComponent).afterClosed().subscribe(result => {
      if (result) {
        this.services.removeById(data._id).pipe(takeUntil(this.unsubs)).subscribe(() => {
          this.getData();
          this.helper.sbSuccess(`${data[this.subject]} dihapus`);
          // console.log(`${data[this.subject]} dihapus`);
        }, err => {
          this.helper.sbError(err);
          // console.log(err);
        });
      }
    });
  }

}
