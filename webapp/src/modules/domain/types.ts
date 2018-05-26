import { ActionType } from 'typesafe-actions'
import { LoadingState } from 'modules/loading/types'
import * as actions from 'modules/domain/actions'

export const FETCH_DOMAINS_REQUEST = '[Request] Fetch Domains'
export const FETCH_DOMAINS_SUCCESS = '[Success] Fetch Domains'
export const FETCH_DOMAINS_FAILURE = '[Failure] Fetch Domains'

// Interface and type definitions

export type FetchDomainsRequest = ReturnType<typeof actions.fetchDomainsRequest>

export interface Domain {
  id: string
  param: string
}

export type DomainActions = ActionType<typeof actions>

export type DomainState = {
  data: { [id: string]: Domain }
  loading: LoadingState
  error: string | null
}
