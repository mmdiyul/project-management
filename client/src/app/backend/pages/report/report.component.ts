import { ReportActionComponent } from './report-action/report-action.component';
import { RemoveDialogComponent } from '../../partials/remove-dialog/remove-dialog.component';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { HelpersService } from '../../../services/helpers.service';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { ReportService } from '../../../services/report.service';
import { Component, OnInit, ViewChild } from '@angular/core';

// export interface PeriodicElement {
//   fitur: string;
//   pesan: string;
//   user: string;
// }

// const data: PeriodicElement[] = [
//   {
//     fitur: 'Daftar dengan Google',
//     pesan: 'Ada fitur lain yang sama',
//     user: 'Test User'
//   },
//   {
//     fitur: 'Daftar dengan Google',
//     pesan: 'Ada fitur lain yang sama',
//     user: 'Test User'
//   },
//   {
//     fitur: 'Daftar dengan Google',
//     pesan: 'Ada fitur lain yang sama',
//     user: 'Test User'
//   },
// ];

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportBackendComponent implements OnInit {

  displayedColumns: string[] = ['index', 'fitur', 'pesan', 'user', 'actions'];
  dataSource = [];
  resultsLength = 0;

  constructor(
    private services: ReportService,
    private dialog: MatDialog,
    private helper: HelpersService
  ) { }

  private modalWidth = '800px';
  private unsubs = new Subject();
  private subject = 'fitur';
  countDataSearch = 0;
  isLoadingResults = true;
  sortActive = 'pesan';
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

  ngOnDestroy() {
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
    this.services.getAll( this.searchForm.value, this.sortActive, this.sortDirection, this.offset, this.limit )
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
    const dialogRef = this.dialog.open(ReportActionComponent, {
      data: { action: 'add', data: null },
      width: this.modalWidth
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.services.insert(result)
        .pipe(takeUntil(this.unsubs))
        .subscribe(() => {
          this.getData();
          this.helper.sbSuccess(`Report berhasil ditambahkan`);
          // console.log(`${result[this.subject]} ditambahkan`);
        }, err => {
          this.helper.sbError(err);
          // console.log(err);
        });
      }
    });
  }

  edit(data) {
    const dialogRef = this.dialog.open(ReportActionComponent, {
      data: { action: 'edit', data},
      width: this.modalWidth
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.services.updateById(data._id, result)
        .pipe(takeUntil(this.unsubs))
        .subscribe(() => {
          this.getData();
          this.helper.sbSuccess(`Report berhasil diperbarui`);
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
          this.helper.sbSuccess(`Report berhasil dihapus`);
          // console.log(`${data[this.subject]} dihapus`);
        }, err => {
          this.helper.sbError(err);
          // console.log(err);
        });
      }
    });
  }

}
