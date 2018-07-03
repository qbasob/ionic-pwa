import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ErrorPage } from '../pages/error/error';

import { AuthService } from '../providers/auth-service/auth-service';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../providers/auth-interceptor/auth-interceptor';
import { JwtInterceptor } from '../providers/jwt-interceptor/jwt-interceptor';
import { fakeBackendProvider } from '../providers/fake-backend-interceptor/fake-backend-interceptor';
import { PwaErrorHandler } from '../providers/pwa-error-handler/pwa-error-handler';
import { ToastService } from '../providers/toast-service/toast-service';
import { rollbarFactory } from '../providers/rollbar-service/rollbar-service';
import Rollbar from 'rollbar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ErrorPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ErrorPage
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
    AuthService,
    {
      provide: ErrorHandler,
      useClass: PwaErrorHandler,
    },
    ToastService,
    {
      provide: Rollbar,
      useFactory: rollbarFactory
    }
  ]
})
export class AppModule {}
