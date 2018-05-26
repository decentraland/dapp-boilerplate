"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_intl_1 = require("react-intl");
// Check the method: getAvailableLocales below to see which locales to add
// Then, you'll need to add it to: addAvailableLocaleData and setCurrentLocale
// This is annoying but better than bundling 200KB of locales
const enIntlData = require("react-intl/locale-data/en");
const esIntlData = require("react-intl/locale-data/es");
const enFnsData = require("date-fns/locale/en");
const esFnsData = require("date-fns/locale/es");
const DEFAULT_LOCALE = 'en';
// cache
let i18n;
let currentLocale;
exports.I18nProvider = react_intl_1.IntlProvider;
function addAvailableLocaleData() {
    react_intl_1.addLocaleData(Array.prototype.concat(enIntlData, esIntlData));
}
exports.addAvailableLocaleData = addAvailableLocaleData;
function getPreferredLocale() {
    const navigator = window.navigator;
    let locale = (navigator.languages && navigator.languages[0]) || navigator.language;
    locale = locale.slice(0, 2);
    if (!getAvailableLocales().includes(locale)) {
        locale = DEFAULT_LOCALE;
    }
    return locale;
}
exports.getPreferredLocale = getPreferredLocale;
function getAvailableLocales() {
    // This is a hardcoded list that replicates the `Translation/locales` folder on the server
    // It saves us a request
    return ['en', 'es'];
}
exports.getAvailableLocales = getAvailableLocales;
function setI18n(intl) {
    i18n = intl;
}
exports.setI18n = setI18n;
function setCurrentLocale(localeName) {
    currentLocale = {
        en: enFnsData,
        es: esFnsData
    }[localeName || DEFAULT_LOCALE];
}
exports.setCurrentLocale = setCurrentLocale;
function getCurrentLocale() {
    return currentLocale;
}
exports.getCurrentLocale = getCurrentLocale;
function t(id, values) {
    return i18n.formatMessage({ id }, values);
}
exports.t = t;
//# sourceMappingURL=utils.js.map