import Rollbar from 'rollbar';

const rollbarConfig = {
  accessToken: '8d76b9b0cbc0495e8b57587a78177a8f',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}
