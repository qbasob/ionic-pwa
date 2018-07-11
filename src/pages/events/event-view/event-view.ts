import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PwaEvent } from '../../../shared/event.model';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-view',
  templateUrl: 'event-view.html',
})
export class EventViewPage {
  protected event: PwaEvent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.event = <PwaEvent>this.navParams.get('event');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EventViewPage');
  }

}
