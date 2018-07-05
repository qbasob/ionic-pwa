import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private authService: AuthService
  ) {}

  testButtonClick() {
    this.authService.testGet()
      .subscribe(
        data => {
          console.log("testButtonClick _data", data);
        }
    );
  }

  ionViewCanEnter() {
    if (!this.authService.isLoggedIn()) {
      this.navCtrl.setRoot('LoginPage');
    }
    return true;
  }
}
