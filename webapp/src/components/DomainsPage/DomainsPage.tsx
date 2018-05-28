import * as React from 'react'
import { DomainsPageProps } from 'components/DomainsPage/types'
import { t } from 'modules/translation/utils'

export default class DomainDetailPage extends React.PureComponent<
  DomainsPageProps
> {
  static defaultProps = {
    domains: null
  }

  componentWillMount() {
    this.props.onFetchDomains()
  }

  render() {
    const { domains, isLoading } = this.props

    return (
      <div className="DomainDetailPage">
        <h1>{t('domains_page.title')}</h1>

        {isLoading || !domains
          ? 'Loading'
          : Object.values(domains).map(domain => (
              <div key={domain.id}>
                {t('global.domain')}: "{domain.param}"
              </div>
            ))}
      </div>
    )
  }
}
