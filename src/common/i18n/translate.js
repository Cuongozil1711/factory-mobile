import I18n from './i18n';
/**
 *
 * @param {string} key
 * @param {any} option
 */
export const translate = (key, option = null) => {
  return key ? I18n.t(key, option) : '';
};
