import { HelpersService } from './helpers.service';
import { User, UserAPI } from './user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private helper: HelpersService
  ) { }

  endpoint = '/api/user';
  firstEndpoint = '/api/user';
  getAll(search= '', sort= null, order= null, offset= 0, limit= 5, page = 1) {
    this.endpoint = '/api/user';
    this.endpoint = this.endpoint + '/page/' + page;
    const url = this.endpoint;
    let params = this.helper.getLimitParams(limit, offset);
    params = params.set('sort', sort).set('direction', order);
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<UserAPI>(url, { params });
  }
  insert(data: User) {
    const url = this.firstEndpoint;
    return this.http.post<User>(url, data);
  }
  updateById(id: string, data: User) {
    const url = `${this.firstEndpoint}/${id}`;
    return this.http.put<User>(url, data);
  }
  removeById(id: string) {
    const url = `${this.firstEndpoint}/${id}`;
    return this.http.delete<User>(url);
  }
}
