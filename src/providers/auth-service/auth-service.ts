import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import { User } from '../../shared/user.model';
import * as moment from 'moment';
import * as jwt_decode from 'jwt-decode';
import { ENV } from '@app/env';

/*
  Generated class for the AuthService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {
  private _endpoint: string;

  constructor(public http: HttpClient) {
    console.log('Hello AuthService Provider');
    this._endpoint = ENV.endpoint;
  }

  // TODO: zrozumieć:
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this._endpoint}/auth/login`, { email, password })
      .do(res => this.setSession(res))
      .shareReplay(); //zrozumieć
      // 'You generally want to use shareReplay when you have side-effects", a powyższe 'do' służy do side-effectsów
      // działa jak share, ale trzyma wartości i przekazuje je do nowego ovservera; więc co to share?
      // share(): Returns a new Observable that multicasts (shares) the original Observable.
      // https://stackoverflow.com/questions/35141722/how-does-the-rxjs-5-share-operator-work
      // Na ten moment rozumiem to tak: share i shareReplay tworzą hot observable, co znaczy mniej więcej tyle że każdy nowy subscribe
      // będzie korzystał z tego observabla który powstał za pierwszym razem. shareReplay powyżej powoduje że każdy nowy subscribe
      // dostaje wartość z 'oryginalnego' observabla. Jako że to jest http.post to wartość przychodzi jeden raz. Kazdy kolejny subscribe dostaje tę wartość.
      // Subscribe jest w metodzie login strony login po kliknięciu na przycisk. Sprawdzić czy dobrze to rozumiem.
      // Chyba jednak nie, bo przecież dane logowania mogą się zmienić w inputach i wtedy musi być nowy http.post...
      // w oryginalnym kodzie tutoriala jest napisane:
      // "We are calling shareReplay to prevent the receiver of this Observable from accidentally triggering multiple POST requests due to multiple subscriptions."
  }

  public refreshToken(): Observable<User> {
    const token = this.getToken();
    return this.http.post<User>(`${this._endpoint}/auth/login`, { token })
      .do(res => this.setSession(res))
      .shareReplay();
  }

  public testGet(): Observable<User> {
    return this.http.get<User>(`${this._endpoint}/users`)
  }

  private setSession(authResult) {
    const decoded = jwt_decode(authResult.access_token);
    const expiresAt = moment.unix(decoded.exp).format('x');
    // console.log(decoded);
    // const expiresAt = moment().add(decoded.exp, 'second');
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('expires_at', expiresAt);
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    //return moment().isBefore(this.getExpiration());
    return localStorage.getItem('access_token') !== null;
  }

  public isTokenExpired(): boolean {
    return !moment().isBefore(this.getExpiration());
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

}
