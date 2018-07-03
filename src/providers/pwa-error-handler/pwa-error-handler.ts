import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ToastService } from '../toast-service/toast-service';
import { Events } from 'ionic-angular';
import Rollbar from 'rollbar';

/*
  Generated class for the PwaErrorHandler provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PwaErrorHandler implements ErrorHandler {

  constructor(private toastService: ToastService, private events: Events, private rollbar: Rollbar) {}

  handleError(error: Error | HttpErrorResponse) {
    // Server error happened
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        // No Internet connection
        return this.toastService.presentToast('No Internet Connection');
      }
      // Send the error to the server
      this.rollbar.error(error);
      // Show notification to the user
      console.error("PwaErrorHandler", error);
      return this.toastService.presentToast(`${error.error}`);
    }
    // Client Error Happend
    else {
      // Send the error to the server and then
      this.rollbar.error(error);
      // and then publish error:
      console.error("PwaErrorHandler", error);
      return this.events.publish("UNHANDLED_ERROR", error);
    }
  }

  // TODO:
  // łapanie wyjątków ionic routera (NavControllera)

}
