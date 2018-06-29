import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ToastService } from '../toast-service/toast-service';

/*
  Generated class for the PwaErrorHandler provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PwaErrorHandler implements ErrorHandler {

  constructor(private toastService: ToastService) {}

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server error happened
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
    } else {
      // Client Error Happend
      // Send the error to the server and then
      // redirect the user to the page with all the info
      // TODO:
      /*errorsService
        .log(error)
        .subscribe(errorWithContextInfo => {
          router.navigate(['/error'], { queryParams: errorWithContextInfo });
        });
      */
     // nie można miec NavControlera w Service, wątek:
     // https://forum.ionicframework.com/t/why-cant-i-import-navcontroller-and-viewcontroller-into-service-or-app/40999/49

     // póki co:
      console.error("PwaErrorHandler", error);
      return this.toastService.presentToast(`${error.message}`);
    }
  }

  // TODO:
  // łapanie wyjątków ionic routera (NavControllera)

}
