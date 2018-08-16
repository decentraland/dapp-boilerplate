import { AnyAction } from 'redux'
import { Store, Dispatch } from 'react-redux'
import { RouterState, RouterAction } from 'react-router-redux'

import { DomainState, DomainReducerAction } from 'modules/domain/reducer'
import {
  TransactionState,
  TransactionReducerAction
} from '@dapps/modules/transaction/reducer'
import {
  TranslationState,
  TranslationReducerAction
} from '@dapps/modules/translation/reducer'
import { WalletState, WalletReducerAction } from '@dapps/modules/wallet/reducer'

export type RootState = {
  router: RouterState
  domain: DomainState
  transaction: TransactionState
  translation: TranslationState
  wallet: WalletState
}

export type RootAction =
  | RouterAction
  | DomainReducerAction
  | TransactionReducerAction
  | TranslationReducerAction
  | WalletReducerAction

export type RootStore = Store<RootState>

export type RootMiddleware = (
  store: RootStore
) => (next: Dispatch<AnyAction>) => (action: AnyAction) => any
