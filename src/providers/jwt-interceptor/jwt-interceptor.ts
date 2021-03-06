import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse/*, HttpErrorResponse*/ } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';

/**
  * JwtInterceptor
  *
  * //Przechwytuje wszystkie requesty i jeżeli response ma kod 401 to znaczy
  * //że wygasł token i przekierowuje na logowanie
  * Logika przeniesiona do PwaErrorHandlera, więc ostatecznie jedyne co robi ten interceptor to 5 prób połączenia
  * TODO chyba: przenieść to do authInterceptora i ten wywalić
*/
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // póbuje 5 połączeń, zanim rzuci wyjątkiem
    return next.handle(req).retry(5).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }
    // obsługa wyjątku w PWA Error Handler
    /*, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // TODO
          // redirect to the login route
          // or show a modal
          alert("401; token umar");
        }

        if (err.status === 400) {
          // TODO
          // bad request
          alert("400; zue dane? serwer nie przetrawił");
        }

        if (err.status === 404) {
          // TODO
          alert("404; a imię jego czterysta i cztery");
        }
      }
    }*/
    );
  }

}
