import { getType, getStatus, removeLast } from './utils'
import { LoadingState, LoadingActions } from 'modules/loading/types'

const INITIAL_STATE: LoadingState = []

export function loadingReducer(state = INITIAL_STATE, action: LoadingActions) {
  const type = getType(action) // ie. "Fetch Address Parcels"
  const status = getStatus(action) // REQUEST, SUCCESS, FAILURE

  switch (status) {
    case 'REQUEST': {
      return [...state, action]
    }
    case 'FAILURE':
    case 'SUCCESS': {
      return removeLast(state, actionItem => getType(actionItem) === type)
    }
    default:
      return state
  }
}
