import { takeEvery, put, call } from 'redux-saga/effects'
import {
  FETCH_TRANSLATIONS_REQUEST,
  FetchTranslationRequest
} from 'modules/translation/types'
import {
  fetchTranslationsSuccess,
  fetchTranslationsFailure
} from 'modules/translation/actions'
import { setCurrentLocale } from './utils'
import { api } from 'lib/api'

export function* translationSaga() {
  yield takeEvery(FETCH_TRANSLATIONS_REQUEST, handleFetchTranslationsRequest)
}

function* handleFetchTranslationsRequest(action: FetchTranslationRequest) {
  try {
    const { locale } = action.payload
    const translations = yield call(() => api.fetchTranslations(locale))

    setCurrentLocale(locale)

    yield put(fetchTranslationsSuccess(locale, translations))
  } catch (error) {
    yield put(fetchTranslationsFailure(error.message))
  }
}
