import { call, put, takeLatest } from 'redux-saga/effects'
import {
  FETCH_DOMAINS_REQUEST,
  FETCH_DOMAIN_REQUEST,
  fetchDomainsSuccess,
  fetchDomainsFailure,
  fetchDomainFailure,
  fetchDomainSuccess,
  FetchDomainsRequestAction,
  FetchDomainRequestAction
} from 'modules/domain/actions'
import { api } from 'lib/api'

export function* domainSaga() {
  yield takeLatest(FETCH_DOMAINS_REQUEST, handleDomainsRequest)
  yield takeLatest(FETCH_DOMAIN_REQUEST, handleDomainRequest)
}

function* handleDomainsRequest(action: FetchDomainsRequestAction) {
  try {
    const domains = yield call(() => api.fetchDomains())
    yield put(fetchDomainsSuccess(domains))
  } catch (error) {
    yield put(fetchDomainsFailure(error.message))
  }
}

function* handleDomainRequest(action: FetchDomainRequestAction) {
  const id = action.payload.id
  try {
    const domain = yield call(() => api.fetchDomain(id))
    if (!domain) throw new Error(`Couldn't find domain ${id}`)

    yield put(fetchDomainSuccess(domain))
  } catch (error) {
    yield put(fetchDomainFailure(error.message))
  }
}
