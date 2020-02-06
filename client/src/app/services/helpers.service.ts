import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(private sb: MatSnackBar, private auth: AuthService, private sanitize: DomSanitizer) { }

  pageTitleObserver = new BehaviorSubject('Halaman Admin');
  sbError(message: string, action= null) {
   this.sb.open(message, action ? action : 'Galat', {duration: 5000});
  }
  sbSuccess(message: string, action= null) {
    this.sb.open(message, action ? action : 'Sukses', {duration: 5000});
  }
  getLimitParams(limit: number, offset: number): HttpParams {
    return new HttpParams()
    .set('limit', limit.toString())
    .set('offset', offset.toString());
  }
  setPageTitle(name: string) {
    this.pageTitleObserver.next(name);
  }
  currentUser() {
    if (localStorage.getItem(this.auth.localUser)) {
      return JSON.parse(localStorage.getItem(this.auth.localUser));
    }
    return null;
  }
  parseWhere(where, params): HttpParams {
    const keys = Object.keys(where);
    if (keys.length) {
      keys.forEach(i => {
        params = params.set(`where[${i}]`, where[i]);
      });
    }
    return params;
  }
}
