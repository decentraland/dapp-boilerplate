import { connect, Dispatch } from 'react-redux'
import { connectWalletRequest } from 'modules/wallet/actions'
import { WalletActions } from 'modules/wallet/types'
import { WalletProps } from 'components/Wallet/types'
import Wallet from './Wallet'

const mapState = (_: any, ownProps: WalletProps): WalletProps => ownProps

const mapDispatch = (dispatch: Dispatch<WalletActions>) => ({
  onConnect: () => dispatch(connectWalletRequest())
})

export default connect<WalletProps>(mapState, mapDispatch)(Wallet)
