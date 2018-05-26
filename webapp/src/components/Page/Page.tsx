import * as React from 'react'

import TranslationProvider from 'components/TranslationProvider'

import './Page.css'

export default class Page extends React.PureComponent {
  static defaultProps = {
    children: null
  }

  render() {
    const { children } = this.props

    return (
      <TranslationProvider>
        <div className="Page">{children}</div>
      </TranslationProvider>
    )
  }
}
