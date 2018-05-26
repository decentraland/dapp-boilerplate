import { ActionType } from 'typesafe-actions'
import { LoadingState } from 'modules/loading/types'
import * as actions from 'modules/translation/actions'

export const FETCH_TRANSLATIONS_REQUEST = '[Request] Fetch Translations'
export const FETCH_TRANSLATIONS_SUCCESS = '[Success] Fetch Translations'
export const FETCH_TRANSLATIONS_FAILURE = '[Failure] Fetch Translations'

export const CHANGE_LOCALE = 'Change locale'

// Interface and type definitions

export type FetchTranslationRequest = ReturnType<
  typeof actions.fetchTranslationsRequest
>

export interface Translation {
  [locale: string]: TranslationKeys
}
export interface TranslationKeys {
  [key: string]: string
}

export type TranslationActions = ActionType<typeof actions>

export type TranslationState = {
  data: Translation
  loading: LoadingState
  error: string | null
}
