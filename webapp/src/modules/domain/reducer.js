"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("modules/domain/types");
const utils_1 = require("modules/domain/utils");
const reducer_1 = require("modules/loading/reducer");
const INITIAL_STATE = {
    data: {},
    loading: [],
    error: null
};
function domainReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types_1.FETCH_DOMAINS_REQUEST:
            return Object.assign({}, state, { loading: reducer_1.loadingReducer(state.loading, action) });
        case types_1.FETCH_DOMAINS_SUCCESS:
            return {
                loading: reducer_1.loadingReducer(state.loading, action),
                error: null,
                data: utils_1.toDomainObject(action.payload.domains)
            };
        case types_1.FETCH_DOMAINS_FAILURE:
            return Object.assign({}, state, { loading: reducer_1.loadingReducer(state.loading, action), error: action.payload.error });
        default:
            return state;
    }
}
exports.domainReducer = domainReducer;
//# sourceMappingURL=reducer.js.map