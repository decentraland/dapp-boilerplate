import { RootState } from 'types'
import { TransactionState, TransactionStatus } from 'modules/transaction/types'

export const getState: (state: RootState) => TransactionState = state =>
  state.transaction
export const getData: (state: RootState) => TransactionState['data'] = state =>
  getState(state).data
export const getLoading: (
  state: RootState
) => TransactionState['loading'] = state => getState(state).loading

export const getTransactionsByStatus = (
  state: RootState,
  address: string,
  status: TransactionStatus
) =>
  getData(state).filter(item => item.from === address && item.status === status)

export const getPendingTransactions = (state: RootState, address: string) =>
  getTransactionsByStatus(state, address, TransactionStatus.Pending)

export const getTransactionHistory = (state: RootState, address: string) =>
  getData(state).filter(
    item => item.from === address && item.status !== TransactionStatus.Pending
  )

export const getTransactionsByType = (
  state: RootState,
  address: string,
  type: string
) =>
  getData(state).filter(
    item => item.from === address && item.actionType === type
  )
