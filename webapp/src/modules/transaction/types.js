"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Action Types
exports.FETCH_TRANSACTION_REQUEST = '[Request] Fetch Transaction';
exports.FETCH_TRANSACTION_SUCCESS = '[Success] Fetch Transaction';
exports.FETCH_TRANSACTION_FAILURE = '[Failure] Fetch Transaction';
exports.WATCH_LOADING_TRANSACTIONS = 'Watch loading transactions';
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["Pending"] = "pending";
    TransactionStatus["Confirmed"] = "confirmed";
    TransactionStatus["Failed"] = "failed";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
var NetworkName;
(function (NetworkName) {
    NetworkName["mainnet"] = "mainnet";
    NetworkName["ropsten"] = "ropsten";
})(NetworkName = exports.NetworkName || (exports.NetworkName = {}));
//# sourceMappingURL=types.js.map