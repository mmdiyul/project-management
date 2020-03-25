import { VoteAPI, Vote } from './vote';
import { HelpersService } from './helpers.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private http: HttpClient,
    private helper: HelpersService
  ) { }

  endpoint = '/api/vote';
  firstEndpoint = '/api/vote';
  getAll(search= '', sort= null, order= null, offset= 0, limit= 5, page = 1) {
    this.endpoint = '/api/vote';
    this.endpoint = this.endpoint + '/page/' + page;
    const url = this.endpoint;
    let params = this.helper.getLimitParams(limit, offset);
    params = params.set('sort', sort).set('direction', order);
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<VoteAPI>(url, { params });
  }
  getAllNoLimit() {
    const url = this.firstEndpoint;
    return this.http.get<VoteAPI>(url);
  }
  insert(data: Vote) {
    const url = this.firstEndpoint;
    return this.http.post<Vote>(url, data);
  }
  updateById(id: string, data: Vote) {
    const url = `${this.firstEndpoint}/${id}`;
    return this.http.put<Vote>(url, data);
  }
  removeById(id: string) {
    const url = `${this.firstEndpoint}/${id}`;
    return this.http.delete<Vote>(url);
  }
}
