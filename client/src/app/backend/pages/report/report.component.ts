import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  fitur: string;
  pesan: string;
  user: string;
}

const data: PeriodicElement[] = [
  {
    fitur: 'Daftar dengan Google',
    pesan: 'Ada fitur lain yang sama',
    user: 'Test User'
  },
  {
    fitur: 'Daftar dengan Google',
    pesan: 'Ada fitur lain yang sama',
    user: 'Test User'
  },
  {
    fitur: 'Daftar dengan Google',
    pesan: 'Ada fitur lain yang sama',
    user: 'Test User'
  },
];

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportBackendComponent implements OnInit {

  displayedColumns: string[] = ['index', 'fitur', 'pesan', 'user', 'actions'];
  dataSource = data;

  constructor() { }

  ngOnInit() {
  }

}
