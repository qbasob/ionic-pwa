import { Component, ViewChild } from '@angular/core';
import { Platform, Events, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ErrorPage } from '../pages/error/error';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  // nie można DI NavControllera w Root Componencie, oficjalne rozwiązanie z dokumentacji Ionica:
  // https://ionicframework.com/docs/api/navigation/NavController/#navigating-from-the-root-component
  @ViewChild('rootNav') navCtrl: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.handleErrorEvents();
    });
  }

  handleErrorEvents() {
    this.events.subscribe("UNHANDLED_ERROR", (error: Error) => {
      this.navCtrl.setRoot(ErrorPage, { err: error });
    });
  }
}

