import { connect, Dispatch } from 'react-redux'
import { RootState } from 'types'
import { connectWalletRequest } from 'modules/wallet/actions'
import { WalletActions } from 'modules/wallet/types'
import { WalletProps } from 'components/Wallet/types'
import Wallet from './Wallet'

const mapState = (_: RootState, ownProps: WalletProps): WalletProps => ownProps

const mapDispatch = (dispatch: Dispatch<WalletActions>) => ({
  onConnect: () => dispatch(connectWalletRequest())
})

export default connect<WalletProps>(mapState, mapDispatch)(Wallet)
