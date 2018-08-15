import { all } from 'redux-saga/effects'
import { env } from 'decentraland-commons'
import { eth } from 'decentraland-eth'

import { domainSaga } from 'modules/domain/sagas'
import { transactionSaga } from '@dapps/modules/transaction/sagas'
import { createTranslationSaga } from '@dapps/modules/translation/sagas'
import { createWalletSaga } from '@dapps/modules/wallet/sagas'
import { manaToken, landRegistry } from 'contracts'
import { api } from 'lib/api'

const walletSaga = createWalletSaga({
  provider: env.get('REACT_APP_PROVIDER_URL'),
  contracts: [manaToken, landRegistry],
  eth
})

const translationSaga = createTranslationSaga({
  getTranslation: locale => api.fetchTranslation(locale)
})

export function* rootSaga() {
  yield all([domainSaga(), transactionSaga(), translationSaga(), walletSaga()])
}
