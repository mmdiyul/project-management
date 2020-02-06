import { HelpersService } from './../../../services/helpers.service';
import { RemoveDialogComponent } from './../../partials/remove-dialog/remove-dialog.component';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActionsComponent } from './actions/actions.component';
import { RolesService } from './../../../services/roles.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

// export interface PeriodicElement {
//   nama: string;
//   deskripsi: string;
//   prioritas: number;
// }

// const data: PeriodicElement[] = [
//   {
//     nama: 'Super Admin',
//     deskripsi: 'Lorem, ipsum dolor sit amet.',
//     prioritas: 1
//   },
//   {
//     nama: 'Admin',
//     deskripsi: 'Lorem, ipsum dolor sit amet.',
//     prioritas: 2
//   },
//   {
//     nama: 'User',
//     deskripsi: 'Lorem, ipsum dolor sit amet.',
//     prioritas: 3
//   }
// ];

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleBackendComponent implements OnInit {

  displayedColumns: string[] = ['index', 'nama', 'deskripsi', 'prioritas', 'actions'];
  dataSource = [];
  resultsLength = 0;

  constructor(
    private services: RolesService,
    private dialog: MatDialog,
    private helper: HelpersService
  ) { }

  private modalWidth = '800px';
  private unsubs = new Subject();
  private subject = 'nama';
  countDataSearch = 0;
  isLoadingResults = true;
  sortActive = 'prioritas';
  sortDirection = 'asc';
  limit = 5; offset = 0;
  searchForm = new FormGroup({
    search: new FormControl(''),
  });

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
    const dialogRef = this.dialog.open(ActionsComponent, {
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
    const dialogRef = this.dialog.open(ActionsComponent, {
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
