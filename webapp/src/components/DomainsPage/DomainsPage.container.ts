import { Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import { RootState } from 'types'
import { fetchDomainsRequest } from 'modules/domain/actions'
import { getData, isLoading } from 'modules/domain/selectors'
import {
  MapStateProps,
  MapDispatchProps
} from 'components/DomainsPage/DomainsPage.types'

import DomainsPage from './DomainsPage'

const mapState = (state: RootState): MapStateProps => {
  return {
    domains: getData(state),
    isLoading: isLoading(state)
  }
}

const mapDispatch = (dispatch: Dispatch<AnyAction>): MapDispatchProps => ({
  onFetchDomains: () => dispatch(fetchDomainsRequest())
})

export default connect(mapState, mapDispatch)(DomainsPage)
