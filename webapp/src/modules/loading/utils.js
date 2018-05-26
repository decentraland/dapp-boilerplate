"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeLast(actions, comparator) {
    // TODO: accomplish the same in one loop
    const last = actions.filter(comparator).pop();
    return actions.filter(action => action !== last);
}
exports.removeLast = removeLast;
exports.getType = (action) => action.type.slice(10);
exports.getStatus = (action) => action.type.slice(1, 8).toUpperCase();
//# sourceMappingURL=utils.js.map