import { Platform } from 'react-native';

const config = {
  PRIVACY_URL: 'https://lotomundo.com/politica-de-privacidad/',
  API_ENDPOINT: 'https://loteriasdominicanas.com/mobile-api-new',

  // ADMOB
  ADMOB: {
    REWARDED_MAX: 4,
    SECRETS: Platform.select({
      ios: {
        BANNER: 'ca-app-pub-1196303242456869/6805402848',
        INTERSTITIAL: 'ca-app-pub-1196303242456869/2866157832'
      },
      android: {
        BANNER: 'ca-app-pub-1196303242456869/1689927090',
        INTERSTITIAL: 'ca-app-pub-1196303242456869/9758869242'
      }
    })
  },

  FIELDS: {
    DOMAIN: 'domain'
  },

  SETTINGS: {
    ENCRYPT: true,
    REFRESH_INTERVAL: 18000,
    DIFFERENCE_IN_MILISECONDS: 0
  },

  VARIABLES: {
    app: null
  }
};

export default config;
