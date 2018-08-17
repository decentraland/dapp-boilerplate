import { Reducer, Store } from 'redux'
import { RouterState } from 'react-router-redux'

import { DomainState } from 'modules/domain/reducer'
import { TransactionState } from '@dapps/modules/transaction/reducer'
import { TranslationState } from '@dapps/modules/translation/reducer'
import { WalletState } from '@dapps/modules/wallet/reducer'

export type RootState = {
  router: RouterState
  domain: DomainState
  transaction: TransactionState
  translation: TranslationState
  wallet: WalletState
}

export type RootStore = Store<RootState>
export type RootReducer = Reducer<RootState>
