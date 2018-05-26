import { eth, contracts, wallets, Contract } from 'decentraland-eth'
import { env, utils } from 'decentraland-commons'
import { isMobile } from 'lib/utils'
import { Wallet } from 'decentraland-eth/dist/ethereum/wallets/Wallet'

interface ConnectOptions {
  address: string
  derivationPath?: string
}

export async function connectEthereumWallet(
  options: ConnectOptions,
  retries = 0
): Promise<void> {
  try {
    await eth.connect({
      provider: env.get('REACT_APP_PROVIDER_URL'),
      contracts: getContracts(),
      wallets: getWallets(options, retries)
    })
    eth.wallet.getAccount() // throws on empty accounts
  } catch (error) {
    if (retries >= 6) {
      console.warn(
        `Error trying to connect to Ethereum for the ${retries}th time`,
        error
      )
      throw error
    }
    await utils.sleep(250)
    return connectEthereumWallet(options, retries + 1)
  }
}

function getContracts(): Contract[] {
  const { MANAToken, LANDRegistry, Marketplace } = contracts
  return [
    new MANAToken(env.get('REACT_APP_MANA_TOKEN_CONTRACT_ADDRESS')),
    new LANDRegistry(env.get('REACT_APP_LAND_REGISTRY_CONTRACT_ADDRESS')),
    new Marketplace(env.get('REACT_APP_MARKETPLACE_CONTRACT_ADDRESS'))
  ]
}

function getWallets(options: ConnectOptions, retries: number): Wallet[] {
  const { LedgerWallet, NodeWallet } = wallets
  const { address, derivationPath = '' } = options

  let wallet: Wallet

  if (isMobile() || retries < 3) {
    wallet = new NodeWallet(address)
  } else {
    wallet = new LedgerWallet(address, derivationPath)
  }

  return [wallet]
}

export function isLedgerWallet() {
  return eth.wallet instanceof wallets.LedgerWallet
}
