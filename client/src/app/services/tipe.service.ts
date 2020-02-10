import { HelpersService } from './helpers.service';
import { Tipe, TipeAPI } from './tipe';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipeService {

  constructor(
    private http: HttpClient,
    private helper: HelpersService
  ) { }
  endpoint = '/api/tipe';
  getAll(search= '', sort= null, order= null, offset= 0, limit= 5, page = 1) {
    this.endpoint = '/api/tipe';
    this.endpoint = this.endpoint + '/page/' + page;
    const url = this.endpoint;
    let params = this.helper.getLimitParams(limit, offset);
    params = params.set('sort', sort).set('direction', order);
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<TipeAPI>(url);
  }
  insert(data: Tipe) {
    const url = this.endpoint;
    return this.http.post<Tipe>(url, data);
  }
  updateById(id: string, data: Tipe) {
    const url = `${this.endpoint}/${id}`;
    return this.http.put<Tipe>(url, data);
  }
  removeById(id: string) {
    const url = `${this.endpoint}/${id}`;
    return this.http.delete<Tipe>(url);
  }
}
