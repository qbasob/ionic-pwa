import { Component, ViewChild } from '@angular/core';
import { Platform, Events, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LoginPage';
  // nie można DI NavControllera w Root Componencie, oficjalne rozwiązanie z dokumentacji Ionica:
  // https://ionicframework.com/docs/api/navigation/NavController/#navigating-from-the-root-component
  @ViewChild('rootNav') navCtrl: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private events: Events,
    private authService: AuthService,
    private menuCtrl: MenuController

  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.handleErrorEvents();
    });
  }

  handleErrorEvents() {
    this.events.subscribe('UNHANDLED_ERROR', (error: Error) => {
      this.navCtrl.setRoot('ErrorPage', { err: error }); // sprawdzić czy działa ErrorPage jako string - strony są lazy loaded więc nie powinno się do nich odnosić obiektem
    });
  }

  openPage(pageName: string) {
    this.navCtrl.setRoot(pageName);
  }

  logoutClicked() {
    // this.menuCtrl.close()
    this.authService.logout();
    this.navCtrl.setRoot('LoginPage');
  }
}

