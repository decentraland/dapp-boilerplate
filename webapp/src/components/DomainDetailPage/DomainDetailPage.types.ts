import { Omit } from '@dapps/lib/types'
import { match } from 'react-router'
import { Domain } from 'modules/domain/types'
import { fetchDomainRequest } from 'modules/domain/actions'

export interface URLParams {
  id: string
}

export type Props = {
  match: match<URLParams>
  domain: Domain | null
  isLoading: boolean
  onFetchDomain: typeof fetchDomainRequest
}

// Container
export type MapStateProps = Omit<Props, 'onFetchDomain'>
export type OwnProps = Pick<Props, 'match'>
export type MapDispatchProps = Pick<Props, 'onFetchDomain'>
