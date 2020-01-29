import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  nama: string;
  alamat: string;
  telepon: string;
  email: string;
  website: string;
}

const data: PeriodicElement[] = [
  {
    nama: 'Profile Image Studio',
    alamat: 'Jl Akordion G/8',
    telepon: '082234659383',
    email: 'profile@profileimage.studio',
    website: 'https://profileimage.studio'
  },
  {
    nama: 'Profile Image Studio',
    alamat: 'Jl Akordion G/8',
    telepon: '082234659383',
    email: 'profile@profileimage.studio',
    website: 'https://profileimage.studio'
  },
  {
    nama: 'Profile Image Studio',
    alamat: 'Jl Akordion G/8',
    telepon: '082234659383',
    email: 'profile@profileimage.studio',
    website: 'https://profileimage.studio'
  },
];

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationBackendComponent implements OnInit {

  displayedColumns: string[] = ['index', 'nama', 'alamat', 'telepon', 'email', 'website', 'actions'];
  dataSource = data;

  constructor() { }

  ngOnInit() {
  }

}
