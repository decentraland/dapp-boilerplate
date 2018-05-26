"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const INITIAL_STATE = [];
function loadingReducer(state = INITIAL_STATE, action) {
    const type = utils_1.getType(action); // ie. "Fetch Address Parcels"
    const status = utils_1.getStatus(action); // REQUEST, SUCCESS, FAILURE
    switch (status) {
        case 'REQUEST': {
            return [...state, action];
        }
        case 'FAILURE':
        case 'SUCCESS': {
            return utils_1.removeLast(state, actionItem => utils_1.getType(actionItem) === type);
        }
        default:
            return state;
    }
}
exports.loadingReducer = loadingReducer;
//# sourceMappingURL=reducer.js.map