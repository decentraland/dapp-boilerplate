import {
  FETCH_DOMAIN_FAILURE,
  FETCH_DOMAIN_REQUEST,
  FETCH_DOMAIN_SUCCESS,
  DomainActions,
  DomainState
} from 'modules/domain/types'
// import { toDomainObject } from 'modules/domain/utils'
import { loadingReducer } from 'modules/loading/reducer'

const INITIAL_STATE: DomainState = {
  data: {},
  loading: [],
  error: null
}

export function domainReducer(state = INITIAL_STATE, action: DomainActions) {
  switch (action.type) {
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
