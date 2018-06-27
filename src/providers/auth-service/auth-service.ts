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
      // "You generally want to use shareReplay when you have side-effects", a powyższe 'do' służy do side-effectsów
      // działa jak share, ale trzyma wartości i przekazuje je do nowego ovservera; więc co to share?
      // share(): Returns a new Observable that multicasts (shares) the original Observable.
      // https://stackoverflow.com/questions/35141722/how-does-the-rxjs-5-share-operator-work
      // Na ten moment rozumiem to tak: share i shareReplay tworzą hot observable, co znaczy mniej więcej tyle że każdy nowy subscribe
      // będzie korzystał z tego observabla który powstał za pierwszym razem. shareReplay powyżej powoduje że każdy nowy subscribe
      // dostaje wartość z 'oryginalnego' observabla. Jako że to jest http.post to wartość przychodzi jeden raz. Kazdy kolejny subscribe dostaje tę wartość.
      // Subscribe jest w metodzie login strony login po kliknięciu na przycisk. Sprawdzić czy dobrze to rozumiem.
      // Chyba jednak nie, bo przecież dane logowania mogą się zmienić w inputach i wtedy musi być nowy http.post...
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
