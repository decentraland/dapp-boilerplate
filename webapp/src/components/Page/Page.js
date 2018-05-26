"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const TranslationProvider_1 = require("components/TranslationProvider");
require("./Page.css");
class Page extends React.PureComponent {
    render() {
        const { children } = this.props;
        return (<TranslationProvider_1.default>
        <div className="Page">{children}</div>
      </TranslationProvider_1.default>);
    }
}
Page.defaultProps = {
    children: null
};
exports.default = Page;
//# sourceMappingURL=Page.js.map