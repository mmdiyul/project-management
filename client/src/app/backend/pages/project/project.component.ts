import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  nama: string;
  budget: number;
  total_harga: number;
  fitur: string[];
}

const data: PeriodicElement[] = [
  {
    nama: 'Web Profil',
    budget: 2000000,
    total_harga: 1800000,
    fitur: ['Home', 'Login', 'Komentar']
  },
  {
    nama: 'Web Profil',
    budget: 2000000,
    total_harga: 1800000,
    fitur: ['Home', 'Login', 'Komentar']
  },
  {
    nama: 'Web Profil',
    budget: 2000000,
    total_harga: 1800000,
    fitur: ['Home', 'Login', 'Komentar']
  },
];

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectBackendComponent implements OnInit {

  displayedColumns: string[] = ['index', 'nama', 'budget', 'total_harga', 'fitur', 'actions'];
  dataSource = data;

  constructor() { }

  ngOnInit() {
  }

}
