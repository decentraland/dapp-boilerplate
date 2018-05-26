import { server } from 'decentraland-server'
import * as express from 'express'

import { Domain, DomainAttributes } from './Domain.model'
import { Router } from '../lib'

export class DomainRouter extends Router {
  mount() {
    /**
     * Returns the domains for a given param
     * @param  {string} param
     * @return {array<Domain>}
     */
    this.app.get('/api/domains/:param', server.handleRequest(this.getDomains))
  }

  async getDomains(req: express.Request): Promise<DomainAttributes> {
    let param = server.extractFromReq(req, 'param')
    return Domain.findByParam(param)
  }
}
