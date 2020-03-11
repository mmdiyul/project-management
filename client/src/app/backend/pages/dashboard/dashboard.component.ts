import { VoteService } from './../../../services/vote.service';
import { ReportService } from './../../../services/report.service';
import { FiturService } from './../../../services/fitur.service';
import { UserService } from './../../../services/user.service';
import { HelpersService } from './../../../services/helpers.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardBackendComponent implements OnInit {

  constructor(
    private helper: HelpersService,
    private user: UserService,
    private fitur: FiturService,
    private report: ReportService,
    private vote: VoteService
  ) { }

  userLength: number;
  fiturLength: number;
  reportLength: number;
  voteLength: number;

  ngOnInit() {
    this.getCountData();
  }

  getCountData() {
    this.user.getAll()
      .subscribe(({count}) => {
        this.userLength = count;
      });
    this.fitur.getAll()
      .subscribe(({count}) => {
        this.fiturLength = count;
      });
    this.vote.getAll()
      .subscribe(({count}) => {
        this.voteLength = count;
      });
    this.report.getAll()
      .subscribe(({count}) => {
        this.reportLength = count;
      });
  }
}
