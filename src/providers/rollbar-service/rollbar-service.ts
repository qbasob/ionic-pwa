import * as Rollbar from 'rollbar';
import { InjectionToken } from '@angular/core';

const rollbarConfig = {
  accessToken: '8d76b9b0cbc0495e8b57587a78177a8f',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');
