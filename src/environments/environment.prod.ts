export const environment = {
  production: true,
  baseUrl: '',
  baseWsUrl: '',
  mocked: false,
  version: '1.0.0',
  keys: {
    settings: 'UC-SETTINGS',
  },
  routes: {
    info: '/info',
    feedback: '/feedback',
    version: '/version',
    upload: '/locations/upload',
  },
  sentry: {
    environment: 'production',
    dsn: '',
  },
  constants: {
    getLocationIntervalInSeconds: 2,
  },
};
