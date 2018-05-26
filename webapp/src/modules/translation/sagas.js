"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const types_1 = require("modules/translation/types");
const actions_1 = require("modules/translation/actions");
const utils_1 = require("./utils");
const api_1 = require("lib/api");
function* translationSaga() {
    yield effects_1.takeEvery(types_1.FETCH_TRANSLATIONS_REQUEST, handleFetchTranslationsRequest);
}
exports.translationSaga = translationSaga;
function* handleFetchTranslationsRequest(action) {
    try {
        const { locale } = action.payload;
        const translations = yield effects_1.call(() => api_1.api.fetchTranslations(locale));
        utils_1.setCurrentLocale(locale);
        yield effects_1.put(actions_1.fetchTranslationsSuccess(locale, translations));
    }
    catch (error) {
        yield effects_1.put(actions_1.fetchTranslationsFailure(error.message));
    }
}
//# sourceMappingURL=sagas.js.map