import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let request = req;
    const match = /(\/(api|auth).+)/;
    if (!req.url.endsWith('login') && req.url.match(match) && localStorage.getItem(this.auth.localToken)) {
      request = req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem(this.auth.localToken)}`
        })
      });
    }
    return next.handle(request);
  }

}
