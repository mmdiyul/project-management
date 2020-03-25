import { User } from './../../services/user';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { FiturService } from 'src/app/services/fitur.service';

@Component({
  selector: 'app-list-fitur',
  templateUrl: './list-fitur.component.html',
  styleUrls: ['./list-fitur.component.scss']
})
export class ListFiturComponent implements OnInit {
  dataSource = [];
  fiturSaya = [];
  resultsLength = 0;

  constructor(
    private services: FiturService,
    private helper: HelpersService
  ) {
    this.currentUser = this.helper.currentUser();
  }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  currentUser: User;
  private unsubs = new Subject();
  private subject = 'nama';
  countDataSearch = 0;
  isLoadingResults = true;
  sortActive = 'createdAt';
  sortDirection = 'desc';
  limit = 5; offset = 0;
  page = 1;
  pageSizeOpts = [5, 10, 25, 100];
  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  ngOnInit() {
    this.getData();
    this.searchForm.get('search').valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(val => {
      this.isLoadingResults = true;
      this.services.getAll(val, this.sortActive, this.sortDirection, this.offset).subscribe(({count, results}) => {
        this.dataSource = results;
        this.resultsLength = count;
        this.countDataSearch = results.length;
        this.isLoadingResults = false;
      });
      this.services.getAllNoLimit()
      .subscribe(({results}) => {
        results.forEach(element => {
          if (element.createdBy._id === this.currentUser._id) {
            this.fiturSaya.push(element);
          }
        });
      }, (err) => {
        this.isLoadingResults = false;
        console.log(err);
      });
    });
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.offset = this.paginator.pageIndex * this.paginator.pageSize;
      this.limit = this.paginator.pageSize;
      this.page = this.paginator.pageIndex + 1;
      this.getData();
    });
    this.paginator._intl.itemsPerPageLabel = 'Jumlah Baris';
  }

  ngOnDestroy(): void {
    this.unsubs.next();
    this.unsubs.complete();
  }

  getData() {
    this.isLoadingResults = true;
    this.services.getAll(this.searchForm.get('search').value, this.sortActive, this.sortDirection, this.offset, this.limit, this.page)
      .subscribe(({count, results}) => {
        this.dataSource = results;
        this.resultsLength = count;
        this.isLoadingResults = false;
        this.countDataSearch = results.length;
      }, (err) => {
        this.isLoadingResults = false;
        console.log(err);
      });
    this.services.getAllNoLimit()
      .subscribe(({results}) => {
        results.forEach(element => {
          if (element.createdBy._id === this.currentUser._id) {
            this.fiturSaya.push(element);
          }
        });
      }, (err) => {
        this.isLoadingResults = false;
        console.log(err);
      });
  }
}

