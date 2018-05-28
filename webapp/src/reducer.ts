import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import { RootState } from 'types'
import { domainReducer as domain } from 'modules/domain/reducer'
import { transactionReducer as transaction } from 'modules/transaction/reducer'
import { translationReducer as translation } from 'modules/translation/reducer'
import { walletReducer as wallet } from 'modules/wallet/reducer'

export const rootReducer = combineReducers<RootState>({
  domain,
  transaction,
  translation,
  router,
  wallet
})
