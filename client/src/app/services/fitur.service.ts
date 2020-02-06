import { HelpersService } from './helpers.service';
import { FiturAPI, Fitur } from './fitur';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiturService {

  constructor(
    private http: HttpClient,
    private helper: HelpersService
  ) { }
  endpoint = '/api/fitur';
  getAll(search= '', sort= null, order= null, offset= 0, limit= 10) {
    const url = this.endpoint;
    let params = this.helper.getLimitParams(limit, offset);
    params = params.set('sort', sort).set('direction', order);
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<FiturAPI>(url);
  }
  insert(data: Fitur) {
    const url = this.endpoint;
    return this.http.post<Fitur>(url, data);
  }
  updateById(id: string, data: Fitur) {
    const url = `${this.endpoint}/${id}`;
    return this.http.put<Fitur>(url, data);
  }
  removeById(id: string) {
    const url = `${this.endpoint}/${id}`;
    return this.http.delete<Fitur>(url);
  }
}
