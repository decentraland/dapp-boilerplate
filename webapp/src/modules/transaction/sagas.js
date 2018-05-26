"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decentraland_eth_1 = require("decentraland-eth");
const effects_1 = require("redux-saga/effects");
const types_1 = require("modules/transaction/types");
const actions_1 = require("modules/transaction/actions");
const selectors_1 = require("modules/transaction/selectors");
function* transactionSaga() {
    yield effects_1.takeEvery(types_1.FETCH_TRANSACTION_REQUEST, handleTransactionRequest);
    yield effects_1.takeEvery(types_1.WATCH_LOADING_TRANSACTIONS, handleWatchLoadingTransactions);
}
exports.transactionSaga = transactionSaga;
const watchIndex = {
// hash: true
};
function* handleTransactionRequest(action) {
    const hash = action.payload.hash;
    const transactions = yield effects_1.select(selectors_1.getData);
    const transaction = transactions.find(tx => tx.hash === hash);
    if (!transaction)
        return undefined;
    try {
        watchIndex[hash] = true;
        yield effects_1.call(() => decentraland_eth_1.txUtils.getConfirmedTransaction(hash, transaction.events));
        delete watchIndex[hash];
        const newTransaction = Object.assign({}, transaction, { status: types_1.TransactionStatus.Confirmed });
        yield effects_1.put(actions_1.fetchTransactionSuccess(newTransaction));
    }
    catch (error) {
        yield effects_1.put(actions_1.fetchTransactionFailure(Object.assign({}, transaction, { status: types_1.TransactionStatus.Failed }), error.message));
    }
}
function* handleWatchLoadingTransactions() {
    const transactionRequests = yield effects_1.select(selectors_1.getLoading);
    const transactions = yield effects_1.select(selectors_1.getData);
    const pendingTransactions = transactions.filter(transaction => transaction.status === types_1.TransactionStatus.Pending);
    const allTransactions = transactionRequests.concat(pendingTransactions);
    for (const tx of allTransactions) {
        if (!watchIndex[tx.hash]) {
            const action = {
                type: types_1.FETCH_TRANSACTION_REQUEST,
                payload: { hash: tx.hash, address: tx.from, action: { type: null } }
            };
            yield handleTransactionRequest(action);
        }
    }
}
//# sourceMappingURL=sagas.js.map