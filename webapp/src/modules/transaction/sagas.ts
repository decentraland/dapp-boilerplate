import { txUtils } from 'decentraland-eth'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import {
  FETCH_TRANSACTION_REQUEST,
  WATCH_LOADING_TRANSACTIONS,
  FetchTransactionRequest,
  Transaction,
  TransactionStatus
} from 'modules/transaction/types'
import {
  fetchTransactionFailure,
  fetchTransactionSuccess
} from 'modules/transaction/actions'
import { getData, getLoading } from 'modules/transaction/selectors'

export function* transactionSaga() {
  yield takeEvery(FETCH_TRANSACTION_REQUEST, handleTransactionRequest)
  yield takeEvery(WATCH_LOADING_TRANSACTIONS, handleWatchLoadingTransactions)
}

const watchIndex = {
  // hash: true
}

function* handleTransactionRequest(action: FetchTransactionRequest) {
  const hash = action.payload.hash
  const transactions: Transaction[] = yield select(getData)
  const transaction = transactions.find(tx => tx.hash === hash)
  if (!transaction) return undefined

  try {
    watchIndex[hash] = true

    yield call(() => txUtils.getConfirmedTransaction(hash, transaction.events))

    delete watchIndex[hash]

    const newTransaction: Transaction = {
      ...transaction,
      status: TransactionStatus.Confirmed
    }
    yield put(fetchTransactionSuccess(newTransaction))
  } catch (error) {
    yield put(
      fetchTransactionFailure(
        {
          ...transaction,
          status: TransactionStatus.Failed
        },
        error.message
      )
    )
  }
}

function* handleWatchLoadingTransactions() {
  const transactionRequests: Transaction[] = yield select(getLoading)

  const transactions: Transaction[] = yield select(getData)
  const pendingTransactions = transactions.filter(
    transaction => transaction.status === TransactionStatus.Pending
  )

  const allTransactions = transactionRequests.concat(pendingTransactions)

  for (const tx of allTransactions) {
    if (!watchIndex[tx.hash]) {
      const action: FetchTransactionRequest = {
        type: FETCH_TRANSACTION_REQUEST,
        payload: { hash: tx.hash, address: tx.from, action: { type: null } }
      }
      yield handleTransactionRequest(action)
    }
  }
}
