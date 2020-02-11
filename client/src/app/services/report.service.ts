import { ReportAPI, Report } from './report';
import { HttpClient } from '@angular/common/http';
import { HelpersService } from './helpers.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient,
    private helper: HelpersService
  ) { }

  endpoint = '/api/report';
  getAll(search= '', sort= null, order= null, offset= 0, limit= 5, page = 1) {
    this.endpoint = '/api/report';
    this.endpoint = this.endpoint + '/page/' + page;
    const url = this.endpoint;
    let params = this.helper.getLimitParams(limit, offset);
    params = params.set('sort', sort).set('direction', order);
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<ReportAPI>(url, {params});
  }
  insert(data: Report) {
    const url = this.endpoint;
    return this.http.post<Report>(url, data);
  }
  updateById(id: string, data: Report) {
    const url = `${this.endpoint}/${id}`;
    return this.http.put<Report>(url, data);
  }
  removeById(id: string) {
    const url = `${this.endpoint}/${id}`;
    return this.http.delete<Report>(url);
  }
}
