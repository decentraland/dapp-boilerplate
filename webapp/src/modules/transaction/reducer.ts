import { loadingReducer } from 'modules/loading/reducer'
import {
  TransactionActions,
  FETCH_TRANSACTION_FAILURE,
  FETCH_TRANSACTION_REQUEST,
  FETCH_TRANSACTION_SUCCESS,
  TransactionState,
  TransactionStatus
} from 'modules/transaction/types'
import { getTransactionFromAction } from 'modules/transaction/utils'

const INITIAL_STATE: TransactionState = {
  data: [],
  loading: [],
  error: null
}

export function transactionReducer(
  state = INITIAL_STATE,
  action: TransactionActions
) {
  switch (action.type) {
    case FETCH_TRANSACTION_REQUEST: {
      const actionRef = action.payload.action
      const transaction = getTransactionFromAction(actionRef)
      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: [
          ...state.data,
          {
            ...transaction,
            timestamp: Date.now(),
            from: action.payload.address,
            actionType: actionRef.type,
            status: TransactionStatus.Pending
          }
        ]
      }
    }
    case FETCH_TRANSACTION_SUCCESS: {
      const actionTransaction = action.payload.transaction
      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: state.data.map(
          transaction =>
            // prettier-ignore
            actionTransaction.hash === transaction.hash
              ? {
                ...transaction,
                ...actionTransaction,
                status: TransactionStatus.Confirmed
              }
              : transaction
        )
      }
    }
    case FETCH_TRANSACTION_FAILURE: {
      const actionTransaction = action.payload.transaction
      return {
        loading: loadingReducer(state.loading, action),
        error: action.payload.error,
        data: state.data.map(
          transaction =>
            // prettier-ignore
            actionTransaction.hash === transaction.hash
              ? {
                ...transaction,
                ...actionTransaction,
                status: TransactionStatus.Failed,
                error: action.payload.error
              }
              : transaction
        )
      }
    }
    default:
      return state
  }
}
