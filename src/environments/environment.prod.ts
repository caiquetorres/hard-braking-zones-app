export const environment = {
  production: true,
  baseUrl: 'https://hard-braking-zones-backend-dev.herokuapp.com/v1',
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
};
