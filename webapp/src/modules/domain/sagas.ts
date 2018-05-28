import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchDomainFailure, fetchDomainSuccess } from 'modules/domain/actions'
import { FETCH_DOMAIN_REQUEST, FetchDomainsRequest } from 'modules/domain/types'
import { api } from 'lib/api'

export function* domainSaga() {
  yield takeLatest(FETCH_DOMAIN_REQUEST, handleDomainRequest)
}

function* handleDomainRequest(action: FetchDomainsRequest) {
  const id = action.payload.id
  try {
    const domain = yield call(() => api.fetchDomain(id))
    if (!domain) throw new Error(`Couldn't find domain ${id}`)

    yield put(fetchDomainSuccess(domain))
  } catch (error) {
    yield put(fetchDomainFailure(error.message))
  }
}
