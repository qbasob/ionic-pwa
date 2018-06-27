import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service/auth-service';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../providers/auth-interceptor/auth-interceptor';
import { JwtInterceptor } from '../providers/jwt-interceptor/jwt-interceptor';
import { fakeBackendProvider } from '../providers/fake-backend-interceptor/fake-backend-interceptor';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    fakeBackendProvider, // provider used to create fake backend; cała ta klamra jak wyżej wewnątrz pliku z interceptorem ("barrel file")
    AuthService
  ]
})
export class AppModule {}
