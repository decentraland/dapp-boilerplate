import { server } from 'decentraland-server'
import { utils } from 'decentraland-commons'
import * as express from 'express'

import { Domain, DomainAttributes } from './Domain.model'
import { Router, blacklist } from '../lib'

export class DomainRouter extends Router {
  mount() {
    /**
     * Returns all domains
     * @return {array<Domain>}
     */
    this.app.get('/api/domains', server.handleRequest(this.getDomains))

    /**
     * Returns the domains for a given param
     * @param  {string} param
     * @return {array<Domain>}
     */
    this.app.get('/api/domains/:id', server.handleRequest(this.getDomain))
  }

  async getDomains(): Promise<DomainAttributes[]> {
    const domains = await Domain.find()
    return utils.mapOmit(domains, blacklist.domain)
  }

  async getDomain(req: express.Request): Promise<DomainAttributes> {
    let id = server.extractFromReq(req, 'id')
    return Domain.findOne(id)
  }
}
