"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toDomainObject(domains) {
    return domains.reduce((map, domain) => {
        map[domain.id] = domain;
        return map;
    }, {});
}
exports.toDomainObject = toDomainObject;
//# sourceMappingURL=utils.js.map