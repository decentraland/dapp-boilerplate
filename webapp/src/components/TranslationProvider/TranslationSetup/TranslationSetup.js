"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class TranslationProvider extends React.PureComponent {
    componentWillMount() {
        this.props.setI18n(this.props.intl);
    }
    componentWillReceiveProps(nextProps) {
        const { intl } = nextProps;
        if (intl) {
            this.props.setI18n(intl);
        }
    }
    render() {
        return null;
    }
}
exports.default = TranslationProvider;
//# sourceMappingURL=TranslationSetup.js.map