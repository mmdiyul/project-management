import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

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
    private services: UserService
  ) { }

  ngOnInit() {
    this.getData();
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

}
