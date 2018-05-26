"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const react_intl_1 = require("react-intl");
const utils_1 = require("modules/translation/utils");
const TranslationSetup_1 = require("./TranslationSetup");
const mapState = (_, ownProps) => ownProps;
const mapDispatch = (dispatch) => ({
    setI18n: (intl) => utils_1.setI18n(intl)
});
exports.default = react_intl_1.injectIntl(react_redux_1.connect(mapState, mapDispatch)(TranslationSetup_1.default));
//# sourceMappingURL=TranslationSetup.container.js.map