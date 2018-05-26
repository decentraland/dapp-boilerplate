"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const actions_1 = require("modules/domain/actions");
const types_1 = require("modules/domain/types");
const api_1 = require("lib/api");
function* domainSaga() {
    yield effects_1.takeLatest(types_1.FETCH_DOMAINS_REQUEST, handleDomainRequest);
}
exports.domainSaga = domainSaga;
function* handleDomainRequest(action) {
    try {
        const domains = yield effects_1.call(() => api_1.api.fetchDomains(action.payload.param));
        yield effects_1.put(actions_1.fetchDomainsSuccess(domains));
    }
    catch (error) {
        yield effects_1.put(actions_1.fetchDomainsFailure(error.message));
    }
}
//# sourceMappingURL=sagas.js.map