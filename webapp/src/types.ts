import { AnyAction } from 'redux'
import { Store, Dispatch } from 'react-redux'
import { RouterState, RouterAction } from 'react-router-redux'

import { DomainState, DomainActions } from 'modules/domain/types'
import { TransactionState, TransactionActions } from 'modules/transaction/types'
import { TranslationState, TranslationActions } from 'modules/translation/types'
import { WalletState, WalletActions } from 'modules/wallet/types'

export type RootState = {
  router: RouterState
  domain: DomainState
  transaction: TransactionState
  translation: TranslationState
  wallet: WalletState
}

export type RootAction =
  | RouterAction
  | DomainActions
  | TransactionActions
  | TranslationActions
  | WalletActions

export type RootStore = Store<RootState>

export type RootMiddleware = (
  store: RootStore
) => (next: Dispatch<AnyAction>) => (action: AnyAction) => any
