import * as bodyParser from 'body-parser'
import { env } from 'decentraland-commons'
import { contracts, eth } from 'decentraland-eth'
import * as express from 'express'
import { DomainRouter } from './Domain'
import { TranslationRouter } from './Translation'
import { db } from './database'

env.load()

const SERVER_PORT = env.get('SERVER_PORT', 5000)

const app = express()

app.use(bodyParser.urlencoded({ extended: false, limit: '2mb' }))
app.use(bodyParser.json())

if (env.isDevelopment()) {
  app.use(function(_, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Request-Method', '*')
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, DELETE'
    )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    next()
  })
}

const router = express.Router()
app.use('/v1', router)

new DomainRouter(router).mount()
new TranslationRouter(router).mount()

/* Start the server only if run directly */
if (require.main === module) {
  startServer().catch(console.error)
}

async function startServer() {
  console.log('Connecting database')
  await db.connect()

  console.log('Connecting to Ethereum node')
  await eth
    .connect({
      contracts: [
        new contracts.LANDRegistry(env.get('LAND_REGISTRY_CONTRACT_ADDRESS')) // Example use
      ],
      provider: env.get('RPC_URL') // defaults to localhost
    })
    .catch(error =>
      console.error(
        '\nCould not connect to the Ethereum node. Some endpoints may not work correctly.',
        '\nMake sure you have a node running on port 8545.',
        `\nError: "${error.message}"\n`
      )
    )

  return app.listen(SERVER_PORT, () =>
    console.log('Server running on port', SERVER_PORT)
  )
}
