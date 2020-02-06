import { HelpersService } from './helpers.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization, OrganizationAPI } from './organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(
    private http: HttpClient,
    private helper: HelpersService
  ) { }
  endpoint = '/api/organization';
  getAll(search= '', sort= null, order= null, offset= 0, limit= 10) {
    const url = this.endpoint;
    let params = this.helper.getLimitParams(limit, offset);
    params = params.set('sort', sort).set('direction', order);
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<OrganizationAPI>(url);
  }
  insert(data: Organization) {
    const url = this.endpoint;
    return this.http.post<Organization>(url, data);
  }
  updateById(id: string, data: Organization) {
    const url = `${this.endpoint}/${id}`;
    return this.http.put<Organization>(url, data);
  }
  removeById(id: string) {
    const url = `${this.endpoint}/${id}`;
    return this.http.delete<Organization>(url);
  }
}
