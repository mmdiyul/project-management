import { UserActionsComponent } from './user-actions/user-actions.component';
import { MatDialog } from '@angular/material';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RemoveDialogComponent } from '../../partials/remove-dialog/remove-dialog.component';

// export interface PeriodicElement {
//   nama: string;
//   username: string;
//   email: string;
//   role: string;
//   organisasi: string;
// }

// const data: PeriodicElement[] = [
//   {
//     nama: 'Muhammad Aliyul Murtadlo',
//     username: 'mmdiyul',
//     email: 'muhammadaliyulm@gmail.com',
//     role: 'Super Admin',
//     organisasi: 'Profile Image Studio'
//   },
//   {
//     nama: 'Muhammad Aliyul Murtadlo',
//     username: 'mmdiyul',
//     email: 'muhammadaliyulm@gmail.com',
//     role: 'Super Admin',
//     organisasi: 'Profile Image Studio'
//   },
//   {
//     nama: 'Muhammad Aliyul Murtadlo',
//     username: 'mmdiyul',
//     email: 'muhammadaliyulm@gmail.com',
//     role: 'Super Admin',
//     organisasi: 'Profile Image Studio'
//   },
// ];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserBackendComponent implements OnInit {

  displayedColumns: string[] = ['index', 'nama', 'username', 'email', 'role', 'organisasi', 'actions'];
  dataSource = [];
  resultsLength = 0;

  constructor(
    private services: UserService,
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
    const dialogRef = this.dialog.open(UserActionsComponent, {
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
    const dialogRef = this.dialog.open(UserActionsComponent, {
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
