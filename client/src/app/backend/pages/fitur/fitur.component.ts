import { FiturActionComponent } from './fitur-action/fitur-action.component';
import { RemoveDialogComponent } from './../../partials/remove-dialog/remove-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { FiturService } from './../../../services/fitur.service';
import { Component, OnInit } from '@angular/core';

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

  displayedColumns: string[] = ['index', 'nama', 'deskripsi', 'waktuPengerjaan', 'kesulitan', 'estimasiHarga', 'actions'];
  dataSource = [];
  resultsLength = 0;

  constructor(
    private services: FiturService,
    private dialog: MatDialog
  ) { }

  private modalWidth = '800px';
  private unsubs = new Subject();
  private subject = 'name';

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {
    this.unsubs.next();
    this.unsubs.complete();
  }

  getData() {
    this.services.getAll()
      .subscribe(({count, results}) => {
        this.dataSource = results;
        this.resultsLength = count;
      }, (err) => {
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
          // this.helper.sbSuccess(`${result[this.subject]} ditambahkan`);
          // console.log(`${result[this.subject]} ditambahkan`);
        }, err => {
          // this.helper.sbError(err);
          console.log(err);
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
          // this.helper.sbSuccess(`${result[this.subject]} diperbarui`);
          // console.log(`${result[this.subject]} diperbarui`);
        }, err => {
          // this.helper.sbError(err);
          console.log(err);
        });
      }
    });
  }

  remove(data) {
    this.dialog.open(RemoveDialogComponent).afterClosed().subscribe(result => {
      if (result) {
        this.services.removeById(data._id).pipe(takeUntil(this.unsubs)).subscribe(() => {
          this.getData();
          // this.helper.sbSuccess(`${data[this.subject]} dihapus`);
          // console.log(`${data[this.subject]} dihapus`);
        }, err => {
        //  this.helper.sbError(err);
          console.log(err);
        });
      }
    });
  }

}
