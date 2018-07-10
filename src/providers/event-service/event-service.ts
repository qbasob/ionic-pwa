import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PwaEvent } from '../../shared/event.model';
import { ENV } from '@app/env';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the EventService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventService {

  constructor(public http: HttpClient) {
    console.log('Hello EventService Provider');
  }

  getEvents(): Observable<PwaEvent> {
    return this.http.get<PwaEvent>(`${ENV.endpoint}/products`);
  }
}
