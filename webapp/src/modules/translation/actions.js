"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typesafe_actions_1 = require("typesafe-actions");
const types_1 = require("modules/translation/types");
// Fetch translations
exports.fetchTranslationsRequest = (locale) => typesafe_actions_1.action(types_1.FETCH_TRANSLATIONS_REQUEST, { locale });
exports.fetchTranslationsSuccess = (locale, translations) => typesafe_actions_1.action(types_1.FETCH_TRANSLATIONS_SUCCESS, { locale, translations });
exports.fetchTranslationsFailure = (error) => typesafe_actions_1.action(types_1.FETCH_TRANSLATIONS_FAILURE, { error });
// Change locale
exports.changeLocale = (locale) => typesafe_actions_1.action(types_1.CHANGE_LOCALE, { locale });
//# sourceMappingURL=actions.js.map