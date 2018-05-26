"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typesafe_actions_1 = require("typesafe-actions");
const types_1 = require("modules/transaction/types");
exports.fetchTransactionRequest = (address, hash, actionObject) => typesafe_actions_1.action(types_1.FETCH_TRANSACTION_REQUEST, {
    address,
    hash,
    action: actionObject
});
exports.fetchTransactionSuccess = (transaction) => typesafe_actions_1.action(types_1.FETCH_TRANSACTION_SUCCESS, { transaction });
exports.fetchTransactionFailure = (transaction, error) => typesafe_actions_1.action(types_1.FETCH_TRANSACTION_FAILURE, {
    transaction,
    error
});
exports.watchLoadingTransactions = () => typesafe_actions_1.action(types_1.WATCH_LOADING_TRANSACTIONS);
//# sourceMappingURL=actions.js.map