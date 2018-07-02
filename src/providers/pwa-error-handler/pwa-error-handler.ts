import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastService } from '../toast-service/toast-service';
import { Events } from 'ionic-angular';
import { RollbarService } from '../rollbar-service/rollbar-service';

/*
  Generated class for the PwaErrorHandler provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PwaErrorHandler implements ErrorHandler {

  constructor(private toastService: ToastService, private events: Events, private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    let rollbar = this.injector.get(RollbarService);
    // Server error happened
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        // No Internet connection
        return this.toastService.presentToast('No Internet Connection');
      }
      // Http Error
      // TODO:
      // Send the error to the server
      /* errorsService
        .log(error)
        .subscribe();*/
      // Show notification to the user
      // return this.toastService.presentToast(`${error.status} - ${error.message}`);
      console.error("PwaErrorHandler", error);
      return this.toastService.presentToast(`${error.error}`);
    }
    // Client Error Happend
    else {
      // Send the error to the server and then
      // TODO
      // and then publish error:
      console.error("PwaErrorHandler", error);
      rollbar.error(error);
      return this.events.publish("UNHANDLED_ERROR", error);
    }
  }

  // TODO:
  // łapanie wyjątków ionic routera (NavControllera)

}
