import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventEditPage } from './event-edit';
import { StarComponent } from '../star/star.component';
import { StarFcComponent } from '../star-fc/star-fc.component';

@NgModule({
  declarations: [
    EventEditPage,
    StarComponent,
    StarFcComponent
  ],
  imports: [
    IonicPageModule.forChild(EventEditPage),
  ],
})
export class EventEditPagePageModule {}
