import { contracts } from 'decentraland-eth'
import { env } from 'decentraland-commons'

const manaToken = new contracts.MANAToken(
  env.get('REACT_APP_MANA_TOKEN_CONTRACT_ADDRESS')
)

const landRegistry = new contracts.LANDRegistry(
  env.get('REACT_APP_LAND_REGISTRY_CONTRACT_ADDRESS')
)

export { manaToken, landRegistry }
