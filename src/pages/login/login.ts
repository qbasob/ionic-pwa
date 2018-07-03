import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ENV } from '@app/env';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public isLoggedIn: boolean;
  private form: FormGroup;
  protected envMode: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.isLoggedIn = this.authService.isLoggedIn();
    this.envMode = ENV.mode;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage', ENV);
  }

  login() {
    const val = this.form.value;

    // poniżesze zakomentowane - pozwala na submit bez wpisanych danych
    //if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(
          _data => {
            alert("Zalogował!");
            //TODO: ionic Nav
          },
          // obsułga wyjątku w PwaErrorHandler
          /*_error => {
              alert("Nie zalogował :(");
          }*/
        );
    //}
  }
}
