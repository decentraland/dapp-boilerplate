import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RootState } from 'types'
import { getLocale, isConnecting } from 'modules/wallet/selectors'
import { getData } from 'modules/translation/selectors'
import { fetchTranslationsRequest } from 'modules/translation/actions'
import { getPreferredLocale } from 'modules/translation/utils'
import { TranslationActions } from 'modules/translation/types'
import { TranslationProviderProps } from 'components/TranslationProvider/types'

import TranslationProvider from './TranslationProvider'

const mapState = (
  state: RootState,
  ownProps: TranslationProviderProps
): TranslationProviderProps => {
  let locale = getLocale(state) || ''

  if (!isConnecting(state)) {
    locale = locale || getPreferredLocale()
  }

  const translations = getData(state)[locale]

  return {
    ...ownProps,
    locale,
    translations
  }
}

const mapDispatch = (dispatch: Dispatch<TranslationActions>) => ({
  onFetchTranslations: (locale: string) =>
    dispatch(fetchTranslationsRequest(locale))
})

export default connect<TranslationProviderProps>(mapState, mapDispatch)(
  TranslationProvider
)
