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

  getEvents(filter: string): Observable<Array<PwaEvent>> {
    let urlFilter = '';
    if (filter) {
      urlFilter = `?q=${filter}`;
    }
    return this.http.get<Array<PwaEvent>>(`${ENV.endpoint}/products${urlFilter}`);
  }

  putEvent(event: PwaEvent): Observable<Array<PwaEvent>> {
    const eventId = event.id;
    return this.http.put<Array<PwaEvent>>(`${ENV.endpoint}/products/${eventId}`, event);
  }
}
