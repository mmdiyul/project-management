import { RemoveDialogComponent } from './../../partials/remove-dialog/remove-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { OrganizationActionComponent } from './organization-action/organization-action.component';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { OrganizationService } from './../../../services/organization.service';
import { Component, OnInit } from '@angular/core';

// export interface PeriodicElement {
//   nama: string;
//   alamat: string;
//   telepon: string;
//   email: string;
//   website: string;
// }

// const data: PeriodicElement[] = [
//   {
//     nama: 'Profile Image Studio',
//     alamat: 'Jl Akordion G/8',
//     telepon: '082234659383',
//     email: 'profile@profileimage.studio',
//     website: 'https://profileimage.studio'
//   },
//   {
//     nama: 'Profile Image Studio',
//     alamat: 'Jl Akordion G/8',
//     telepon: '082234659383',
//     email: 'profile@profileimage.studio',
//     website: 'https://profileimage.studio'
//   },
//   {
//     nama: 'Profile Image Studio',
//     alamat: 'Jl Akordion G/8',
//     telepon: '082234659383',
//     email: 'profile@profileimage.studio',
//     website: 'https://profileimage.studio'
//   },
// ];

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationBackendComponent implements OnInit {

  displayedColumns: string[] = ['index', 'nama', 'alamat', 'telepon', 'email', 'website', 'actions'];
  dataSource = [];
  resultsLength = 0;

  constructor(
    private services: OrganizationService,
    private dialog: MatDialog
  ) { }

  private modalWidth = '800px';
  private unsubs = new Subject();
  private subject = 'name';

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
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
    const dialogRef = this.dialog.open(OrganizationActionComponent, {
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
    const dialogRef = this.dialog.open(OrganizationActionComponent, {
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
