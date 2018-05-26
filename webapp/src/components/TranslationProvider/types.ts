import { TranslationKeys } from 'modules/translation/types'

export interface TranslationProviderProps {
  locale?: string
  translations?: TranslationKeys
  children?: JSX.Element
  onFetchTranslations: Function
}
