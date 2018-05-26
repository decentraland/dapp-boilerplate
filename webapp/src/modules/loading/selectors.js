"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Type state here
exports.isLoading = state => state.length > 0;
exports.isLoadingType = (state, type) => state.some((action) => action.type === type);
//# sourceMappingURL=selectors.js.map