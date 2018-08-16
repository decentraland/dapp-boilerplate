import * as React from 'react'

import './Page.css'

export default class Page extends React.PureComponent {
  static defaultProps = {
    children: null
  }

  render() {
    const { children } = this.props

    return <div className="Page">{children}</div>
  }
}
