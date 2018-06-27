import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import { User } from '../../shared/user.model';
import * as moment from "moment";

/*
  Generated class for the AuthService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {

  constructor(public http: HttpClient) {
    console.log('Hello AuthService Provider');
  }

  // TODO: zrozumieć:
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/authenticate', { email, password })
      .do(res => this.setSession(res))
      .shareReplay(); //zrozumieć
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout(): void {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
