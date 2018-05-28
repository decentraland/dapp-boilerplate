import { RootMiddleware } from 'types'
import { fetchTransactionRequest } from 'modules/transaction/actions'
import {
  isTransactionAction,
  getTransactionHashFromAction
} from 'modules/transaction/utils'
import { getAddress } from 'modules/wallet/selectors'

export const createTransactionMiddleware = (): any => {
  const middleware: RootMiddleware = store => next => action => {
    if (isTransactionAction(action)) {
      const address = getAddress(store.getState())
      const hash = getTransactionHashFromAction(action)

      if (address) {
        store.dispatch(fetchTransactionRequest(address, hash, action))
      }
    }

    return next(action)
  }

  return middleware
}
