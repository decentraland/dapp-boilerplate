"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const react_router_redux_1 = require("react-router-redux");
const reducer_1 = require("modules/domain/reducer");
const reducer_2 = require("modules/transaction/reducer");
const reducer_3 = require("modules/translation/reducer");
const reducer_4 = require("modules/wallet/reducer");
exports.rootReducer = redux_1.combineReducers({
    domain: reducer_1.domainReducer,
    transaction: reducer_2.transactionReducer,
    translation: reducer_3.translationReducer,
    router: react_router_redux_1.routerReducer,
    wallet: reducer_4.walletReducer
});
//# sourceMappingURL=reducer.js.map