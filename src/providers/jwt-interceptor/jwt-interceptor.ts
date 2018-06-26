import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/**
  * JwtInterceptor
  *
  * Przechwytuje wszystkie requesty i jeżeli response ma kod 401 to znaczy
  * że wygasł token i przekierowuje na logowanie
*/
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // TODO
          // redirect to the login route
          // or show a modal
        }

        if (err.status === 404) {
          // TODO
          alert(" a imię jego czterysta i cztery");
        }
      }
    });
  }

}