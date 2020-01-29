import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  fitur: string;
  kesulitan: number;
  harga: number;
  user: string;
}

const data: PeriodicElement[] = [
  {
    fitur: 'Daftar dengan Google',
    kesulitan: 7,
    harga: 100000,
    user: 'Test User'
  },
  {
    fitur: 'Daftar dengan Google',
    kesulitan: 7,
    harga: 100000,
    user: 'Test User'
  },
  {
    fitur: 'Daftar dengan Google',
    kesulitan: 7,
    harga: 100000,
    user: 'Test User'
  },
];

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteBackendComponent implements OnInit {

  displayedColumns: string[] = ['index', 'fitur', 'kesulitan', 'harga', 'user', 'actions'];
  dataSource = data;

  constructor() { }

  ngOnInit() {
  }

}
