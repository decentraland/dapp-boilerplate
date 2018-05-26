import { all } from 'redux-saga/effects'

import { domainSaga } from 'modules/domain/sagas'
import { transactionSaga } from 'modules/transaction/sagas'
import { translationSaga } from 'modules/translation/sagas'
import { walletSaga } from 'modules/wallet/sagas'

export function* rootSaga() {
  yield all([domainSaga(), transactionSaga(), translationSaga(), walletSaga()])
}
