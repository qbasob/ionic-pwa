import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ToastService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  DO WYWALENIA, nie powinny być rzeczy od UI w service...
*/
@Injectable()
export class ToastService {

  constructor(public toastCtrl: ToastController) { }

  presentToast(message, type = 'warning') {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      cssClass: `toast-${type}`
    });
    toast.present();
  }
}
