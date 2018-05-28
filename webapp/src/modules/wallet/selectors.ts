import { RootState } from 'types'
import { CONNECT_WALLET_REQUEST, WalletState } from 'modules/wallet/types'
import { isLoadingType } from 'modules/loading/selectors'

export const getState: (state: RootState) => WalletState = state => state.wallet
export const getWallet: (state: RootState) => WalletState['data'] = state =>
  getState(state).data
export const getLoading: (state: RootState) => WalletState['loading'] = state =>
  getState(state).loading
export const getError: (state: RootState) => WalletState['error'] = state =>
  getState(state).error

export const getNetwork: (
  state: RootState
) => WalletState['data']['network'] = state => getWallet(state).network

export const getAddress: (
  state: RootState
) => WalletState['data']['address'] = state => getWallet(state).address

export const getLocale: (
  state: RootState
) => WalletState['data']['locale'] = state => getWallet(state).locale

export const isConnected: (state: RootState) => boolean = state =>
  !!getWallet(state).address

export const isConnecting: (state: RootState) => boolean = state =>
  isLoadingType(getLoading(state), CONNECT_WALLET_REQUEST)
