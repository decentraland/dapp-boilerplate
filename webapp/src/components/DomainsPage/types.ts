import { DomainState } from 'modules/domain/reducer'

export interface DomainsPageProps {
  domains: DomainState['data'] | null
  isLoading: boolean
  onFetchDomains: Function
}
