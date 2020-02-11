import { FormGroup, FormControl } from '@angular/forms';
import { HelpersService } from './../../../services/helpers.service';
import { FiturActionComponent } from './fitur-action/fitur-action.component';
import { RemoveDialogComponent } from './../../partials/remove-dialog/remove-dialog.component';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Subject } from 'rxjs';
import { FiturService } from './../../../services/fitur.service';
import { Component, OnInit, ViewChild } from '@angular/core';

// export interface PeriodicElement {
//   nama: string;
//   deskripsi: string;
//   waktu_pengerjaan: string;
//   kesulitan: number;
//   estimasi_harga: number;
// }

// const data: PeriodicElement[] = [
//   {
//     nama: 'Login',
//     deskripsi: 'Lorem, ipsum dolor sit amet.',
//     waktu_pengerjaan: '14 Hari',
//     kesulitan: 6,
//     estimasi_harga: 250000
//   },
//   {
//     nama: 'Login',
//     deskripsi: 'Lorem, ipsum dolor sit amet.',
//     waktu_pengerjaan: '14 Hari',
//     kesulitan: 6,
//     estimasi_harga: 250000
//   },
//   {
//     nama: 'Login',
//     deskripsi: 'Lorem, ipsum dolor sit amet.',
//     waktu_pengerjaan: '14 Hari',
//     kesulitan: 6,
//     estimasi_harga: 250000
//   },
// ];

@Component({
  selector: 'app-fitur',
  templateUrl: './fitur.component.html',
  styleUrls: ['./fitur.component.scss']
})
export class FiturBackendComponent implements OnInit {

  displayedColumns: string[] = ['index', 'nama', 'deskripsi', 'waktuPengerjaan', 'kesulitan', 'estimasiHarga', 'tipeId', 'actions'];
  dataSource = [];
  resultsLength = 0;

  constructor(
    private services: FiturService,
    private dialog: MatDialog,
    private helper: HelpersService
  ) { }

  private modalWidth = '800px';
  private unsubs = new Subject();
  private subject = 'nama';
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
    const dialogRef = this.dialog.open(FiturActionComponent, {
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
    const dialogRef = this.dialog.open(FiturActionComponent, {
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
