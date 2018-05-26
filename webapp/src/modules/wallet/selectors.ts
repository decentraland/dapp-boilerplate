import { CONNECT_WALLET_REQUEST, WalletState } from 'modules/wallet/types'
import { isLoadingType } from 'modules/loading/selectors'

// TODO: Type state here
export const getState: (state: any) => WalletState = state => state.wallet
export const getWallet: (state: any) => WalletState['data'] = state =>
  getState(state).data
export const getLoading: (state: any) => WalletState['loading'] = state =>
  getState(state).loading
export const getError: (state: any) => WalletState['error'] = state =>
  getState(state).error

export const getNetwork: (
  state: any
) => WalletState['data']['network'] = state => getWallet(state).network

export const getAddress: (
  state: any
) => WalletState['data']['address'] = state => getWallet(state).address

export const getLocale: (state: any) => WalletState['data']['locale'] = state =>
  getWallet(state).locale

export const isConnected: (state: any) => boolean = state =>
  !!getWallet(state).address

export const isConnecting: (state: any) => boolean = state =>
  isLoadingType(getLoading(state), CONNECT_WALLET_REQUEST)
