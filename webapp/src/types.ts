import { MiddlewareAPI, AnyAction, Reducer, Store } from 'redux'
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

export interface RootDispatch<A = AnyAction> {
  (action: A): A
}

export type RootMiddleware = (
  store: MiddlewareAPI<any>
) => (next: RootDispatch<AnyAction>) => (action: AnyAction) => any

export type RootReducer = Reducer<RootState>
