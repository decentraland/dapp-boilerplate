"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("modules/wallet/types");
const selectors_1 = require("modules/loading/selectors");
// TODO: Type state here
exports.getState = state => state.wallet;
exports.getWallet = state => exports.getState(state).data;
exports.getLoading = state => exports.getState(state).loading;
exports.getError = state => exports.getState(state).error;
exports.getNetwork = state => exports.getWallet(state).network;
exports.getAddress = state => exports.getWallet(state).address;
exports.getLocale = state => exports.getWallet(state).locale;
exports.isConnected = state => !!exports.getWallet(state).address;
exports.isConnecting = state => selectors_1.isLoadingType(exports.getLoading(state), types_1.CONNECT_WALLET_REQUEST);
//# sourceMappingURL=selectors.js.map