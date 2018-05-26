import * as React from 'react'
import { WalletProps } from 'components/Wallet/types'

export default class Wallet extends React.PureComponent<WalletProps> {
  static defaultProps = {
    children: null
  }

  componentWillMount() {
    const { onConnect } = this.props
    onConnect()
  }

  render() {
    const { children } = this.props
    return children
  }
}
