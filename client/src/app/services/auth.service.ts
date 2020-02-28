import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

export interface Login {
  user: any;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  localToken = 'x-management-token';
  localUser = 'x-management-user';
  constructor(
    private http: HttpClient,
    private sb: MatSnackBar,
    private router: Router
    ) {
      this.token = localStorage.getItem(this.localToken);
    }
    token: string;
    isLoggedIn(): boolean {
      return localStorage.getItem(this.localUser) ? true : false;
    }
    login(username: string, password: string) {
      const auth = 'Basic ' + btoa(`${username}:${password}`);
      const headers = new HttpHeaders().append('Authorization', auth);
      const url = '/auth/login';
      return this.http.get<Login>(url, {headers});
    }
    logout() {
      localStorage.removeItem(this.localUser);
      localStorage.removeItem(this.localToken);
      this.http.get('/auth/logout').subscribe(() => {
        this.router.navigate(['login']);
      });
    }
}
