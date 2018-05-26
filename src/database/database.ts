import { db } from 'decentraland-server'
import { env } from 'decentraland-commons'

const pg = db.clients.postgres

export const database: typeof pg = Object.assign({}, pg, {
  async connect() {
    const CONNECTION_STRING = env.get('CONNECTION_STRING', null)
    this.client = await pg.connect(CONNECTION_STRING)
    return this
  }
})
