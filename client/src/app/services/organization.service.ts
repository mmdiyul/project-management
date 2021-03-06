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
  firstEndpoint = '/api/organization';
  getAll(search= '', sort= null, order= null, offset= 0, limit= 5, page = 1) {
    this.endpoint = '/api/organization';
    this.endpoint = this.endpoint + '/page/' + page;
    const url = this.endpoint;
    let params = this.helper.getLimitParams(limit, offset);
    params = params.set('sort', sort).set('direction', order);
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<OrganizationAPI>(url, { params });
  }
  insert(data: Organization) {
    const url = this.firstEndpoint;
    return this.http.post<Organization>(url, data);
  }
  updateById(id: string, data: Organization) {
    const url = `${this.firstEndpoint}/${id}`;
    return this.http.put<Organization>(url, data);
  }
  removeById(id: string) {
    const url = `${this.firstEndpoint}/${id}`;
    return this.http.delete<Organization>(url);
  }
}
