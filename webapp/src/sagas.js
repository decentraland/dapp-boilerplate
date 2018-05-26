"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const sagas_1 = require("modules/domain/sagas");
const sagas_2 = require("modules/transaction/sagas");
const sagas_3 = require("modules/translation/sagas");
const sagas_4 = require("modules/wallet/sagas");
function* rootSaga() {
    yield effects_1.all([sagas_1.domainSaga(), sagas_2.transactionSaga(), sagas_3.translationSaga(), sagas_4.walletSaga()]);
}
exports.rootSaga = rootSaga;
//# sourceMappingURL=sagas.js.map