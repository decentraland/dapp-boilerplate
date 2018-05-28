import { DomainState } from 'modules/domain/types'

// TODO: Type state here
export const getState: (state: any) => DomainState = state => state.domain

export const getData: (state: any) => DomainState['data'] = state =>
  getState(state).data

export const isLoading: (state: any) => boolean = state =>
  getState(state).loading.length > 0

export const getError: (state: any) => DomainState['error'] = state =>
  getState(state).error
