import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventEditPage } from './event-edit';
import { StarComponent } from '../star/star.component';

@NgModule({
  declarations: [
    EventEditPage,
    StarComponent
  ],
  imports: [
    IonicPageModule.forChild(EventEditPage),
  ],
})
export class EventEditPagePageModule {}
