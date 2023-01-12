import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {resources} from '../../assets/image/locales';

const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: callback => {
    callback('VI');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};
/**
 * Config i18n for app
 */
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'VI',
    resources: resources,
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  })
  .then(r => r);

export default i18n;
