"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reducer_1 = require("modules/loading/reducer");
const types_1 = require("modules/transaction/types");
const utils_1 = require("modules/transaction/utils");
const INITIAL_STATE = {
    data: [],
    loading: [],
    error: null
};
function transactionReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types_1.FETCH_TRANSACTION_REQUEST: {
            const actionRef = action.payload.action;
            const transaction = utils_1.getTransactionFromAction(actionRef);
            return {
                loading: reducer_1.loadingReducer(state.loading, action),
                error: null,
                data: [
                    ...state.data,
                    Object.assign({}, transaction, { timestamp: Date.now(), from: action.payload.address, actionType: actionRef.type, status: types_1.TransactionStatus.Pending })
                ]
            };
        }
        case types_1.FETCH_TRANSACTION_SUCCESS: {
            const actionTransaction = action.payload.transaction;
            return {
                loading: reducer_1.loadingReducer(state.loading, action),
                error: null,
                data: state.data.map(transaction => 
                // prettier-ignore
                actionTransaction.hash === transaction.hash
                    ? Object.assign({}, transaction, actionTransaction, { status: types_1.TransactionStatus.Confirmed }) : transaction)
            };
        }
        case types_1.FETCH_TRANSACTION_FAILURE: {
            const actionTransaction = action.payload.transaction;
            return {
                loading: reducer_1.loadingReducer(state.loading, action),
                error: action.payload.error,
                data: state.data.map(transaction => 
                // prettier-ignore
                actionTransaction.hash === transaction.hash
                    ? Object.assign({}, transaction, actionTransaction, { status: types_1.TransactionStatus.Failed, error: action.payload.error }) : transaction)
            };
        }
        default:
            return state;
    }
}
exports.transactionReducer = transactionReducer;
//# sourceMappingURL=reducer.js.map