import { connect } from 'react-redux'
import { RootDispatch } from '@dapps/types'
import { RootState } from 'types'
import { fetchDomainRequest } from 'modules/domain/actions'
import { getData, isLoading } from 'modules/domain/selectors'
import {
  OwnProps,
  MapStateProps,
  MapDispatchProps
} from 'components/DomainDetailPage/DomainDetailPage.types'

import DomainDetailPage from './DomainDetailPage'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  const match = ownProps.match
  const domains = getData(state)
  const domainId = match.params.id

  return {
    domain: domains[domainId],
    isLoading: isLoading(state),
    match
  }
}

const mapDispatch = (dispatch: RootDispatch): MapDispatchProps => ({
  onFetchDomain: (id: string) => dispatch(fetchDomainRequest(id))
})

export default connect(mapState, mapDispatch)(DomainDetailPage)
