import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CredentialsService } from '../auth/credentials.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private credentialsService: CredentialsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.credentialsService.credentials ? 'Bearer ' + this.credentialsService.credentials.token : '';

    if (!!this.credentialsService.credentials) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    console.log(request);

    return next.handle(request);
  }
}
