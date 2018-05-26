"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Type this
exports.getState = state => state.translation;
exports.getData = state => exports.getState(state).data;
exports.getLoading = state => exports.getState(state).loading;
exports.isLoading = state => exports.getLoading(state).length > 0;
//# sourceMappingURL=selectors.js.map