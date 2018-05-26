"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typesafe_actions_1 = require("typesafe-actions");
const types_1 = require("modules/wallet/types");
exports.connectWalletRequest = () => typesafe_actions_1.action(types_1.CONNECT_WALLET_REQUEST);
exports.connectWalletSuccess = (wallet) => typesafe_actions_1.action(types_1.CONNECT_WALLET_SUCCESS, { wallet });
exports.connectWalletFailure = (error) => typesafe_actions_1.action(types_1.CONNECT_WALLET_FAILURE, { error });
//# sourceMappingURL=actions.js.map