import {
  FETCH_DOMAIN_FAILURE,
  FETCH_DOMAIN_REQUEST,
  FETCH_DOMAIN_SUCCESS,
  DomainActions,
  DomainState,
  FETCH_DOMAINS_REQUEST,
  FETCH_DOMAINS_FAILURE,
  FETCH_DOMAINS_SUCCESS
} from 'modules/domain/types'
import { toDomainObject } from 'modules/domain/utils'
import { loadingReducer } from '@dapps/modules/loading/reducer'
import { Reducer } from 'redux'

const INITIAL_STATE: DomainState = {
  data: {},
  loading: [],
  error: null
}

export const domainReducer: Reducer<DomainState> = (
  state = INITIAL_STATE,
  action: DomainActions
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
