import { AnyAction, Store } from 'redux'
import { fetchTransactionRequest } from 'modules/transaction/actions'
import {
  isTransactionAction,
  getTransactionHashFromAction
} from 'modules/transaction/utils'
import { getAddress } from 'modules/wallet/selectors'

// TODO: Store and Middleware typing here
export function createTransactionMiddleware(): any {
  return (store: Store<any>) => (next: (action: AnyAction) => void) => (
    action: AnyAction
  ) => {
    if (isTransactionAction(action)) {
      const address = getAddress(store.getState())
      const hash = getTransactionHashFromAction(action)

      if (address) {
        store.dispatch(fetchTransactionRequest(address, hash, action))
      }
    }

    return next(action)
  }
}
