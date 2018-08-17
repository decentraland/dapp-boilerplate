import * as React from 'react'
import { t } from '@dapps/modules/translation/utils'
import { Props } from 'components/DomainsPage/DomainsPage.types'

export default class DomainDetailPage extends React.PureComponent<Props> {
  static defaultProps = {
    domains: null
  }

  componentWillMount() {
    this.props.onFetchDomains()
  }

  areDomainsEmpty() {
    const { domains } = this.props
    return !domains || Object.keys(domains).length <= 0
  }

  renderDomains() {
    const { domains } = this.props
    if (!domains) return null

    return Object.values(domains).map(domain => (
      <div key={domain.id}>
        {t('global.domain')}: "{domain.param}"
      </div>
    ))
  }

  render() {
    const { isLoading } = this.props

    return (
      <div className="DomainDetailPage">
        <h1>{t('domains_page.title')}</h1>

        {isLoading
          ? t('global.loading')
          : this.areDomainsEmpty()
            ? t('domains_page.empty_domains')
            : this.renderDomains()}
      </div>
    )
  }
}
