import { AnyAction } from 'redux'
import {
  Transaction,
  TransactionAction,
  NetworkName,
  EtherscanOptions
} from 'modules/transaction/types'

// Special flag used to determine transaction hashes to be monitored
const TRANSACTION_ACTION_FLAG = 'watch_tx'

export function isTransactionAction(action: AnyAction): boolean {
  return !!getTransactionFromAction(action)
}

export function getTransactionFromAction(action: AnyAction): Transaction {
  return action[TRANSACTION_ACTION_FLAG]
}

export function getTransactionHashFromAction(
  action: AnyAction
): Transaction['hash'] {
  return getTransactionFromAction(action).hash
}

export function buildTransactionAction(
  hash: string,
  payload = {},
  events = []
): TransactionAction {
  return {
    [TRANSACTION_ACTION_FLAG]: {
      hash,
      payload,
      events
    }
  }
}

export function isTransactionRejectedError(message: string): boolean {
  // "Recommended" way to check for rejections
  // https://github.com/MetaMask/faq/issues/6#issuecomment-264900031
  return message.includes('User denied transaction signature')
}

export function getEtherscanHref(
  etherscanOptions: EtherscanOptions,
  network: NetworkName
) {
  const { address, txHash, blockNumber } = etherscanOptions
  const pathname = address
    ? `/address/${address}`
    : blockNumber
      ? `/block/${blockNumber}`
      : `/tx/${txHash}`

  return `${getEtherscanOrigin(network)}${pathname}`
}

export function getEtherscanOrigin(network: NetworkName) {
  let origin = 'https://etherscan.io'
  if (network && network !== 'mainnet') {
    origin = `https://${network}.etherscan.io`
  }
  return origin
}
