export const environment = {
  production: true,
  baseUrl: '',
  mocked: false,
  version: '1.0.1',
  keys: {
    settings: 'UC-SETTINGS',
  },
  routes: {
    info: '/info',
    feedback: '/feedback',
    version: '/version',
    upload: '/points/upload',
  },
  sentry: {
    environment: 'production',
    dsn: '',
  },
  constants: {
    maxTripDurationInMinutes: 30,
    getPointInterval: 250,
    savePointsAmount: 240,
  },
};
