import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PwaEvent } from '../../shared/event.model';
import { EventService } from '../../providers/event-service/event-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

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
  // z acync w template:
  protected events: Observable<Array<PwaEvent>>;
  protected filter: string;

  // ręcznie subscribe
  // protected events: Array<PwaEvent>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eventService: EventService,
    private loadingCtrl: LoadingController

  ) {
    //this.filter = ""; // nie trzeba ustawiac wartości początkowej, bo ngModel w template
    this.getEvents();
  }

  getEvents() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present()


    // z acync w template:
    this.events = this.eventService.getEvents(this.filter)
      .finally(() => {
        loading.dismiss();
      })

    /*
    // ręcznie subscribe
    this.eventService.getEvents()
      .finally(() => {
        loading.dismiss();
      })
      .subscribe((events: Array<PwaEvent>) => {
        this.events = events;
      })
    */
  }

  filterEvents(event: any) {
    console.log(event);
  }

  viewEvent(event: PwaEvent) {
    this.navCtrl.push('EventViewPage', { event });
  }

  editEvent(event: PwaEvent) {
    this.navCtrl.push('EventEditPage', { event });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

}
