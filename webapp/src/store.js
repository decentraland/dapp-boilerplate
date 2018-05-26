"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decentraland_commons_1 = require("decentraland-commons");
const createBrowserHistory_1 = require("history/createBrowserHistory");
const react_router_redux_1 = require("react-router-redux");
const redux_1 = require("redux");
const redux_logger_1 = require("redux-logger");
const redux_saga_1 = require("redux-saga");
const middleware_1 = require("./modules/transaction/middleware");
const reducer_1 = require("./reducer");
const sagas_1 = require("./sagas");
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
const history = createBrowserHistory_1.default();
exports.history = history;
const historyMiddleware = react_router_redux_1.routerMiddleware(history);
const sagasMiddleware = redux_saga_1.default();
const loggerMiddleware = redux_logger_1.createLogger({
    collapsed: () => true,
    predicate: (_, action) => decentraland_commons_1.env.isDevelopment() || action.type.includes('Failure')
});
const transactionMiddleware = middleware_1.createTransactionMiddleware();
const middleware = redux_1.applyMiddleware(historyMiddleware, sagasMiddleware, loggerMiddleware, transactionMiddleware);
const enhancer = composeEnhancers(middleware);
const store = redux_1.createStore(reducer_1.rootReducer, enhancer);
exports.store = store;
sagasMiddleware.run(sagas_1.rootSaga);
function dispatch(action) {
    if (typeof action === 'string') {
        store.dispatch({ type: action });
    }
    else {
        store.dispatch(action);
    }
}
exports.dispatch = dispatch;
function getState() {
    return store.getState();
}
exports.getState = getState;
if (decentraland_commons_1.env.isDevelopment()) {
    const _window = window;
    _window.getState = store.getState;
}
//# sourceMappingURL=store.js.map