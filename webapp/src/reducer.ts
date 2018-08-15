import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import { RootState } from 'types'
import { domainReducer as domain } from 'modules/domain/reducer'
import { transactionReducer as transaction } from '@dapps/modules/transaction/reducer'
import { translationReducer as translation } from '@dapps/modules/translation/reducer'
import { walletReducer as wallet } from '@dapps/modules/wallet/reducer'
import {
  storageReducer as storage,
  storageReducerWrapper
} from '@dapps/modules/storage/reducer'

export const rootReducer = storageReducerWrapper(
  combineReducers<RootState>({
    domain,
    transaction,
    translation,
    router,
    storage,
    wallet
  })
)
