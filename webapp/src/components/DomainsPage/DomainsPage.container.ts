import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RootState } from 'types'
import { DomainActions } from 'modules/domain/types'
import { fetchDomainsRequest } from 'modules/domain/actions'
import { getData, isLoading } from 'modules/domain/selectors'
import { DomainsPageProps } from 'components/DomainsPage/types'

import DomainsPage from './DomainsPage'

const mapState = (
  state: RootState,
  ownProps: DomainsPageProps
): DomainsPageProps => {
  return {
    ...ownProps,
    domains: getData(state),
    isLoading: isLoading(state)
  }
}

const mapDispatch = (dispatch: Dispatch<DomainActions>) => ({
  onFetchDomains: () => dispatch(fetchDomainsRequest())
})

export default connect<DomainsPageProps>(mapState, mapDispatch)(DomainsPage)
