import { action } from 'typesafe-actions'
import {
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  CONNECT_WALLET_FAILURE,
  Wallet
} from 'modules/wallet/types'

export const connectWalletRequest = () => action(CONNECT_WALLET_REQUEST)

export const connectWalletSuccess = (wallet: Wallet) =>
  action(CONNECT_WALLET_SUCCESS, { wallet })

export const connectWalletFailure = (error: string) =>
  action(CONNECT_WALLET_FAILURE, { error })
