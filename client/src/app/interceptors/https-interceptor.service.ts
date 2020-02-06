import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable, isDevMode } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpsInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const match = /(\/(api|auth).+)/;
    const secureReq = req.clone({
      url: isDevMode() ? req.url.replace(match, `${environment.host}:${environment.port}$1`) : req.url.replace(match, `${environment.host}$1`)
    });
    return next.handle(secureReq);
  }
}
