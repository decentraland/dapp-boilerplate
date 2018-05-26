"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const selectors_1 = require("modules/wallet/selectors");
const selectors_2 = require("modules/translation/selectors");
const actions_1 = require("modules/translation/actions");
const utils_1 = require("modules/translation/utils");
const TranslationProvider_1 = require("./TranslationProvider");
const mapState = (state, ownProps) => {
    let locale = selectors_1.getLocale(state) || '';
    if (!selectors_1.isConnecting(state)) {
        locale = locale || utils_1.getPreferredLocale();
    }
    const translations = selectors_2.getData(state)[locale];
    return Object.assign({}, ownProps, { locale,
        translations });
};
const mapDispatch = (dispatch) => ({
    onFetchTranslations: (locale) => dispatch(actions_1.fetchTranslationsRequest(locale))
});
exports.default = react_redux_1.connect(mapState, mapDispatch)(TranslationProvider_1.default);
//# sourceMappingURL=TranslationProvider.container.js.map