"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typesafe_actions_1 = require("typesafe-actions");
const types_1 = require("modules/domain/types");
exports.fetchDomainsRequest = (param) => typesafe_actions_1.action(types_1.FETCH_DOMAINS_REQUEST, { param });
exports.fetchDomainsSuccess = (domains) => typesafe_actions_1.action(types_1.FETCH_DOMAINS_SUCCESS, { domains });
exports.fetchDomainsFailure = (error) => typesafe_actions_1.action(types_1.FETCH_DOMAINS_FAILURE, { error });
//# sourceMappingURL=actions.js.map