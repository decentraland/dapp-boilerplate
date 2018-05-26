"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("modules/wallet/types");
const types_2 = require("modules/translation/types");
const reducer_1 = require("modules/loading/reducer");
const INITIAL_STATE = {
    data: {},
    loading: [],
    error: null
};
function walletReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types_1.CONNECT_WALLET_REQUEST:
            return Object.assign({}, state, { loading: reducer_1.loadingReducer(state.loading, action) });
        case types_1.CONNECT_WALLET_SUCCESS:
            return {
                loading: reducer_1.loadingReducer(state.loading, action),
                error: null,
                data: Object.assign({}, state.data, action.payload.wallet)
            };
        case types_1.CONNECT_WALLET_FAILURE:
            return Object.assign({}, state, { loading: reducer_1.loadingReducer(state.loading, action), error: action.payload.error });
        case types_2.CHANGE_LOCALE:
        case types_2.FETCH_TRANSLATIONS_SUCCESS:
            return Object.assign({}, state, { data: Object.assign({}, state.data, { locale: action.payload.locale }) });
        default:
            return state;
    }
}
exports.walletReducer = walletReducer;
//# sourceMappingURL=reducer.js.map