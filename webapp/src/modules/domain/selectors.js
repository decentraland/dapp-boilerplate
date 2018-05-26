"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Type state here
exports.getState = state => state.domains;
exports.getDomains = state => exports.getState(state).data;
exports.isLoading = state => exports.getState(state).loading.length > 0;
exports.getError = state => exports.getState(state).error;
//# sourceMappingURL=selectors.js.map