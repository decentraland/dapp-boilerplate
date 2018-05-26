"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Wallet extends React.PureComponent {
    componentWillMount() {
        const { onConnect } = this.props;
        onConnect();
    }
    render() {
        const { children } = this.props;
        return children;
    }
}
Wallet.defaultProps = {
    children: null
};
exports.default = Wallet;
//# sourceMappingURL=Wallet.js.map