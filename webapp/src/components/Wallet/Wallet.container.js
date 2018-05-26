"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const actions_1 = require("modules/wallet/actions");
const Wallet_1 = require("./Wallet");
const mapState = (_, ownProps) => ownProps;
const mapDispatch = (dispatch) => ({
    onConnect: () => dispatch(actions_1.connectWalletRequest())
});
exports.default = react_redux_1.connect(mapState, mapDispatch)(Wallet_1.default);
//# sourceMappingURL=Wallet.container.js.map