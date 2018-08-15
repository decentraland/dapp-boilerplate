import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { locations } from 'locations'

import Page from 'components/Page'
import HomePage from 'components/HomePage'
import DomainDetailPage from 'components/DomainDetailPage'
import DomainsPage from 'components/DomainsPage'

export default class Routes extends React.Component {
  renderRoutes() {
    return (
      <Switch>
        <Route exact={true} path={locations.root()} component={HomePage} />
        <Route
          exact={true}
          path={locations.domains()}
          component={DomainsPage}
        />
        <Route
          exact={true}
          path={locations.domain()}
          component={DomainDetailPage}
        />
        <Redirect to={locations.root()} />
      </Switch>
    )
  }

  render() {
    return <Page>{this.renderRoutes()}</Page>
  }
}
