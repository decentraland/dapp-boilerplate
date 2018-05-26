import * as React from 'react'

import TranslationSetup from './TranslationSetup'
import { I18nProvider, addAvailableLocaleData } from 'modules/translation/utils'
import { TranslationProviderProps } from 'components/TranslationProvider/types'

export default class TranslationProvider extends React.PureComponent<
  TranslationProviderProps
> {
  componentWillMount() {
    addAvailableLocaleData()
  }

  componentWillReceiveProps(nextProps: TranslationProviderProps) {
    const { locale, onFetchTranslations } = nextProps

    if (this.props.locale !== locale) {
      onFetchTranslations(locale)
    }
  }

  renderLoading() {
    return <div>Loading...</div>
  }

  render() {
    const { children, locale, translations } = this.props

    return translations ? (
      <I18nProvider locale={locale} messages={translations}>
        <React.Fragment>
          <TranslationSetup />
          {children}
        </React.Fragment>
      </I18nProvider>
    ) : (
      this.renderLoading()
    )
  }
}
