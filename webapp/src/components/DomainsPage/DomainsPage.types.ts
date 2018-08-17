import { Omit } from '@dapps/lib/types'
import { DomainState } from 'modules/domain/reducer'
import { fetchDomainsRequest } from 'modules/domain/actions'

export type Props = {
  domains: DomainState['data'] | null
  isLoading: boolean
  onFetchDomains: typeof fetchDomainsRequest
}

export type MapStateProps = Omit<Props, 'onFetchDomains'>
export type MapDispatchProps = Pick<Props, 'onFetchDomains'>
