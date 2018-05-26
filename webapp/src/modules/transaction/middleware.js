"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("modules/transaction/actions");
const utils_1 = require("modules/transaction/utils");
const selectors_1 = require("modules/wallet/selectors");
// TODO: Store and Middleware typing here
function createTransactionMiddleware() {
    return (store) => (next) => (action) => {
        if (utils_1.isTransactionAction(action)) {
            const address = selectors_1.getAddress(store.getState());
            const hash = utils_1.getTransactionHashFromAction(action);
            if (address) {
                store.dispatch(actions_1.fetchTransactionRequest(address, hash, action));
            }
        }
        return next(action);
    };
}
exports.createTransactionMiddleware = createTransactionMiddleware;
//# sourceMappingURL=middleware.js.map