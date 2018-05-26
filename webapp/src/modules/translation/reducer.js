"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("modules/translation/types");
const reducer_1 = require("modules/loading/reducer");
const INITIAL_STATE = {
    data: {},
    loading: [],
    error: null
};
function translationReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types_1.CHANGE_LOCALE:
            return Object.assign({}, state, { loading: reducer_1.loadingReducer(state.loading, action), data: Object.assign({}, state.data, { [action.payload.locale]: null }) });
        case types_1.FETCH_TRANSLATIONS_REQUEST:
            return Object.assign({}, state, { loading: reducer_1.loadingReducer(state.loading, action) });
        case types_1.FETCH_TRANSLATIONS_SUCCESS:
            return Object.assign({}, state, { loading: reducer_1.loadingReducer(state.loading, action), data: Object.assign({}, state.data, { [action.payload.locale]: Object.assign({}, action.payload.translations) }) });
        case types_1.FETCH_TRANSLATIONS_FAILURE:
            return Object.assign({}, state, { loading: reducer_1.loadingReducer(state.loading, action), error: action.payload.error });
        default:
            return state;
    }
}
exports.translationReducer = translationReducer;
//# sourceMappingURL=reducer.js.map