"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("modules/transaction/types");
// TODO: Type state here
exports.getState = state => state.transaction;
exports.getData = state => exports.getState(state).data;
exports.getLoading = state => exports.getState(state).loading;
exports.getTransactionsByStatus = (state, address, status) => exports.getData(state).filter(item => item.from === address && item.status === status);
exports.getPendingTransactions = (state, address) => exports.getTransactionsByStatus(state, address, types_1.TransactionStatus.Pending);
exports.getTransactionHistory = (state, address) => exports.getData(state).filter(item => item.from === address && item.status !== types_1.TransactionStatus.Pending);
exports.getTransactionsByType = (state, address, type) => exports.getData(state).filter(item => item.from === address && item.actionType === type);
//# sourceMappingURL=selectors.js.map