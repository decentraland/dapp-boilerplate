import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RootState } from 'types'
import { DomainActions } from 'modules/domain/types'
import { fetchDomainRequest } from 'modules/domain/actions'
import { getData, isLoading } from 'modules/domain/selectors'
import { DomainDetailPageProps } from 'components/DomainDetailPage/types'

import DomainDetailPage from './DomainDetailPage'

const mapState = (
  state: RootState,
  ownProps: DomainDetailPageProps
): DomainDetailPageProps => {
  const domains = getData(state)
  const domainId = ownProps.match.params.id

  return {
    ...ownProps,
    domain: domains[domainId],
    isLoading: isLoading(state)
  }
}

const mapDispatch = (dispatch: Dispatch<DomainActions>) => ({
  onFetchDomain: (id: string) => dispatch(fetchDomainRequest(id))
})

export default connect<DomainDetailPageProps>(mapState, mapDispatch)(
  DomainDetailPage
)
