import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PwaEvent } from '../../shared/event.model';
import { EventService } from '../../providers/event-service/event-service';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  protected events: Observable<PwaEvent>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eventService: EventService

  ) {
    this.events = this.eventService.getEvents();
  }

  eventSelected(event: PwaEvent) {
    console.log("eventSelected", event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

}
