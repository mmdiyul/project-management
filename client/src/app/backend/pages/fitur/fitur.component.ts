import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  nama: string;
  deskripsi: string;
  waktu_pengerjaan: string;
  kesulitan: number;
  estimasi_harga: number;
}

const data: PeriodicElement[] = [
  {
    nama: 'Login',
    deskripsi: 'Lorem, ipsum dolor sit amet.',
    waktu_pengerjaan: '14 Hari',
    kesulitan: 6,
    estimasi_harga: 250000
  },
  {
    nama: 'Login',
    deskripsi: 'Lorem, ipsum dolor sit amet.',
    waktu_pengerjaan: '14 Hari',
    kesulitan: 6,
    estimasi_harga: 250000
  },
  {
    nama: 'Login',
    deskripsi: 'Lorem, ipsum dolor sit amet.',
    waktu_pengerjaan: '14 Hari',
    kesulitan: 6,
    estimasi_harga: 250000
  },
];

@Component({
  selector: 'app-fitur',
  templateUrl: './fitur.component.html',
  styleUrls: ['./fitur.component.scss']
})
export class FiturBackendComponent implements OnInit {

  displayedColumns: string[] = ['index', 'nama', 'deskripsi', 'waktu_pengerjaan', 'kesulitan', 'estimasi_harga', 'actions'];
  dataSource = data;

  constructor() { }

  ngOnInit() {
  }

}
