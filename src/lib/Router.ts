import * as express from 'express'

export class Router {
  protected app: express.Application | express.Router

  constructor(app: express.Application | express.Router) {
    this.app = app
  }

  mount(): void {
    throw new Error('Not implemented')
  }
}
