import { Reducer } from 'redux'
import { Domain } from 'modules/domain/types'
import {
  FETCH_DOMAIN_FAILURE,
  FETCH_DOMAIN_REQUEST,
  FETCH_DOMAIN_SUCCESS,
  FETCH_DOMAINS_REQUEST,
  FETCH_DOMAINS_FAILURE,
  FETCH_DOMAINS_SUCCESS,
  FetchDomainsRequestAction,
  FetchDomainsSuccessAction,
  FetchDomainsFailureAction,
  FetchDomainRequestAction,
  FetchDomainSuccessAction,
  FetchDomainFailureAction
} from 'modules/domain/actions'
import { toDomainObject } from 'modules/domain/utils'
import { loadingReducer, LoadingState } from '@dapps/modules/loading/reducer'
import { ModelById } from '@dapps/lib/types'

export type DomainState = {
  data: ModelById<Domain>
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE: DomainState = {
  data: {},
  loading: [],
  error: null
}

export type DomainReducerAction =
  | FetchDomainsRequestAction
  | FetchDomainsSuccessAction
  | FetchDomainsFailureAction
  | FetchDomainRequestAction
  | FetchDomainSuccessAction
  | FetchDomainFailureAction

export const domainReducer: Reducer<DomainState> = (
  state = INITIAL_STATE,
  action: DomainReducerAction
): DomainState => {
  switch (action.type) {
    case FETCH_DOMAINS_REQUEST:
    case FETCH_DOMAIN_REQUEST:
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    case FETCH_DOMAIN_SUCCESS: {
      const domain = action.payload.domain
      const domainId = domain.id
      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: {
          ...state.data,
          [domainId]: { ...domain }
        }
      }
    }
    case FETCH_DOMAINS_SUCCESS: {
      const domains = action.payload.domains
      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: {
          ...state.data,
          ...toDomainObject(domains)
        }
      }
    }
    case FETCH_DOMAINS_FAILURE:
    case FETCH_DOMAIN_FAILURE:
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    default:
      return state
  }
}
