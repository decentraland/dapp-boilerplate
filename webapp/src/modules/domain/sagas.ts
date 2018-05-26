import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchDomainsFailure,
  fetchDomainsSuccess
} from 'modules/domain/actions'
import {
  FETCH_DOMAINS_REQUEST,
  FetchDomainsRequest
} from 'modules/domain/types'
import { api } from 'lib/api'

export function* domainSaga() {
  yield takeLatest(FETCH_DOMAINS_REQUEST, handleDomainRequest)
}

function* handleDomainRequest(action: FetchDomainsRequest) {
  try {
    const domains = yield call(() => api.fetchDomains(action.payload.param))
    yield put(fetchDomainsSuccess(domains))
  } catch (error) {
    yield put(fetchDomainsFailure(error.message))
  }
}
