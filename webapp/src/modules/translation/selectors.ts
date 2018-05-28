import { RootState } from 'types'
import { TranslationState } from 'modules/translation/types'

export const getState: (state: RootState) => TranslationState = state =>
  state.translation
export const getData: (state: RootState) => TranslationState['data'] = state =>
  getState(state).data
export const getLoading: (
  state: RootState
) => TranslationState['loading'] = state => getState(state).loading
export const isLoading: (state: RootState) => boolean = state =>
  getLoading(state).length > 0
