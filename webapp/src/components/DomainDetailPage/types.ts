import { match } from 'react-router'
import { Domain } from 'modules/domain/types'

export interface URLParams {
  id: string
}

export interface DomainDetailPageProps {
  match: match<URLParams>
  domain: Domain | null
  isLoading: boolean
  onFetchDomain: Function
}
