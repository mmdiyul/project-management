import { RolesService } from './../../../services/roles.service';
import { Component, OnInit } from '@angular/core';

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
    private services: RolesService
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
