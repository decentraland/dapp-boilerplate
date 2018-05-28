import { DomainState } from 'modules/domain/types'

export interface DomainsPageProps {
  domains: DomainState['data'] | null
  isLoading: boolean
  onFetchDomains: Function
}
