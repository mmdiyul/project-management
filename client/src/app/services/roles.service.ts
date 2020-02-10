import { HelpersService } from './helpers.service';
import { Injectable } from '@angular/core';
import { RolesAPI, Roles } from './roles';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private http: HttpClient,
    private helper: HelpersService
  ) { }
  endpoint = '/api/roles';
  getAll(search= '', sort= null, order= null, offset= 0, limit= 5, page = 1) {
    this.endpoint = '/api/roles';
    this.endpoint = this.endpoint + '/page/' + page;
    const url = this.endpoint;
    let params = this.helper.getLimitParams(limit, offset);
    params = params.set('sort', sort).set('direction', order);
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<RolesAPI>(url, {params});
  }
  insert(data: Roles) {
    const url = this.endpoint;
    return this.http.post<Roles>(url, data);
  }
  updateById(id: string, data: Roles) {
    const url = `${this.endpoint}/${id}`;
    return this.http.put<Roles>(url, data);
  }
  removeById(id: string) {
    const url = `${this.endpoint}/${id}`;
    return this.http.delete<Roles>(url);
  }
}
