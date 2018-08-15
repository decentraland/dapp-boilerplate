import * as React from 'react'
import { DomainDetailPageProps } from 'components/DomainDetailPage/types'
import { t } from '@dapps/modules/translation/utils'

export default class DomainDetailPage extends React.PureComponent<
  DomainDetailPageProps
> {
  static defaultProps = {
    domain: null
  }

  componentWillMount() {
    const { onFetchDomain, match } = this.props
    onFetchDomain(match.params.id)
  }

  render() {
    const { domain, isLoading } = this.props

    return (
      <div className="DomainDetailPage">
        <h1>{t('domain_detail_page.title')}</h1>

        {isLoading ? (
          t('global.loading')
        ) : (
          <React.Fragment>
            {t('global.domain')}:{' '}
            {domain ? domain.param : t('domain_detail_page.no_domain')}
          </React.Fragment>
        )}
      </div>
    )
  }
}
