import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ToastService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
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
