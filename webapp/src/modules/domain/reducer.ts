import {
  FETCH_DOMAINS_FAILURE,
  FETCH_DOMAINS_REQUEST,
  FETCH_DOMAINS_SUCCESS,
  DomainActions,
  DomainState
} from 'modules/domain/types'
import { toDomainObject } from 'modules/domain/utils'
import { loadingReducer } from 'modules/loading/reducer'

const INITIAL_STATE: DomainState = {
  data: {},
  loading: [],
  error: null
}

export function domainReducer(state = INITIAL_STATE, action: DomainActions) {
  switch (action.type) {
    case FETCH_DOMAINS_REQUEST:
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    case FETCH_DOMAINS_SUCCESS:
      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: toDomainObject(action.payload.domains)
      }
    case FETCH_DOMAINS_FAILURE:
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    default:
      return state
  }
}
