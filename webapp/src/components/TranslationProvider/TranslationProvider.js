"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const TranslationSetup_1 = require("./TranslationSetup");
const utils_1 = require("modules/translation/utils");
class TranslationProvider extends React.PureComponent {
    componentWillMount() {
        utils_1.addAvailableLocaleData();
    }
    componentWillReceiveProps(nextProps) {
        const { locale, onFetchTranslations } = nextProps;
        if (this.props.locale !== locale) {
            onFetchTranslations(locale);
        }
    }
    renderLoading() {
        return <div>Loading...</div>;
    }
    render() {
        const { children, locale, translations } = this.props;
        return translations ? (<utils_1.I18nProvider locale={locale} messages={translations}>
        <React.Fragment>
          <TranslationSetup_1.default />
          {children}
        </React.Fragment>
      </utils_1.I18nProvider>) : (this.renderLoading());
    }
}
exports.default = TranslationProvider;
//# sourceMappingURL=TranslationProvider.js.map