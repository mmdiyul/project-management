import { User, UsersAPI } from './user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  endpoint = 'http://localhost:3000/api/user';
  getAll() {
    const url = this.endpoint;
    // let params = this.helper.getLimitParams(limit, offset);
    // params = params.set('sort', sort).set('direction', order);
    // if (search) {
    //   params = params.set('search', search);
    // }
    return this.http.get<UsersAPI>(url);
  }
  insert(data: User) {
    const url = this.endpoint;
    return this.http.post<User>(url, data);
  }
  updateById(id: string, data: User) {
    const url = `${this.endpoint}/${id}`;
    return this.http.put<User>(url, data);
  }
  removeById(id: string) {
    const url = `${this.endpoint}/${id}`;
    return this.http.delete<User>(url);
  }
}
