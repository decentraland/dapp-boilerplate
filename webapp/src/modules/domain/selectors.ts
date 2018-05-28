import { RootState } from 'types'
import { DomainState } from 'modules/domain/types'

export const getState: (state: RootState) => DomainState = state => state.domain

export const getData: (state: RootState) => DomainState['data'] = state =>
  getState(state).data

export const isLoading: (state: RootState) => boolean = state =>
  getState(state).loading.length > 0

export const getError: (state: RootState) => DomainState['error'] = state =>
  getState(state).error
