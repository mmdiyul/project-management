import { Component, OnInit } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { FiturService } from 'src/app/services/fitur.service';
import { Fitur } from 'src/app/services/fitur';

@Component({
  selector: 'app-list-fitur',
  templateUrl: './list-fitur.component.html',
  styleUrls: ['./list-fitur.component.scss']
})
export class ListFiturComponent implements OnInit {
  dataSource = [];
  resultsLength = 0;

  constructor(
    private services: FiturService,
    private helper: HelpersService
  ) { }

  private subject = 'nama';
  countDataSearch = 0;
  isLoadingResults = true;
  sortActive = 'prioritas';
  sortDirection = 'asc';
  limit = 5; offset = 0;
  page = 1;
  pageSizeOpts = [5, 10, 25, 100];


  ngOnInit() {
    this.getData();

  }

  getData() {
    this.isLoadingResults = true;
    this.services.getAll()
      .subscribe(({count, results}) => {
        this.dataSource = results;
        this.resultsLength = count;
        this.isLoadingResults = false;
        this.countDataSearch = results.length;
      }, (err) => {
        this.isLoadingResults = false;
        console.log(err);
      });
  }
}

