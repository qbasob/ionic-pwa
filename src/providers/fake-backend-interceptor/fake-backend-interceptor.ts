import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

/**
  * FakeBackendInterceptor
  *
  * Udaje serwer,
  * /api/authenticate:
  * zwraca 200 JWT Token jeżeli dane logowania się zgadzają,
  * 400 Bad request kiedy błędne dane
  * /api/users
  * zwraca 200 dane usera jeżeli token porpawny
  * 401 Unauthorized jezeli token się nie zgadza
*/
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let testUser = { id: 1, email: 'test', password: 'test' };

        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
              if (request.body.email === testUser.email && request.body.password === testUser.password) {
                // if login details are valid return 200 OK with a fake jwt token
                return Observable.of(new HttpResponse({ status: 200, body: { idToken: 'fake-jwt-token', expiresIn: 3600 } }));
              } else {
                // else return 400 bad request
                // tak było na gicie:
                // return Observable.throw('Email or password is incorrect');
                // moja wersja - chyba lepiej udaje serwer:
                return Observable.throw(new HttpErrorResponse({ status: 400, statusText: "Bad request", error: "Email or password is incorrect"}));
              }
            }

            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
              // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
              if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                return Observable.of(new HttpResponse({ status: 200, body: [testUser] }));
              } else {
                // return 401 not authorised if token is null or invalid
                // tak było na gicie:
                // return Observable.throw('Unauthorised');
                // moja wersja - chyba lepiej udaje serwer:
                return Observable.throw(new HttpErrorResponse({ status: 401, statusText: "Unauthorised", error: "Unauthorised, token invalid?" }));
              }
            }

            // pass through any requests not handled above
            return next.handle(request);

        })

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .materialize()
        .delay(500)
        .dematerialize();
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
