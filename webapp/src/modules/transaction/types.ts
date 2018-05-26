import { ActionType } from 'typesafe-actions'
import { LoadingState } from 'modules/loading/types'
import * as actions from 'modules/transaction/actions'

// Action Types

export const FETCH_TRANSACTION_REQUEST = '[Request] Fetch Transaction'
export const FETCH_TRANSACTION_SUCCESS = '[Success] Fetch Transaction'
export const FETCH_TRANSACTION_FAILURE = '[Failure] Fetch Transaction'

export const WATCH_LOADING_TRANSACTIONS = 'Watch loading transactions'

// Interface and type definitions

export type FetchTransactionRequest = ReturnType<
  typeof actions.fetchTransactionRequest
>

export enum TransactionStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Failed = 'failed'
}

export interface Transaction {
  events: string[]
  hash: string
  timestamp: number
  from: string
  actionType: string
  status: TransactionStatus
}

export interface TransactionAction {
  [hash: string]: {
    hash: string
    payload: any
    events: string[]
  }
}

export interface EtherscanOptions {
  txHash: string
  address: string
  blockNumber: number
}

export enum NetworkName {
  mainnet = 'mainnet',
  ropsten = 'ropsten'
}

export type TransactionActions = ActionType<typeof actions>

export type TransactionState = {
  data: Transaction[]
  loading: LoadingState
  error: string | null
}
