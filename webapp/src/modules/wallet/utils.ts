import { eth, contracts, wallets, Contract } from 'decentraland-eth'
import { env, utils } from 'decentraland-commons'
import { isMobile } from 'lib/utils'

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
    await utils.sleep(150)
    return connectEthereumWallet(options, retries + 1)
  }
}

function getContracts(): Contract[] {
  const { LANDRegistry } = contracts

  return [new LANDRegistry(env.get('REACT_APP_LAND_REGISTRY_CONTRACT_ADDRESS'))]
}

function getWallets(
  options: ConnectOptions,
  retries: number
): wallets.NodeWallet[] | wallets.LedgerWallet[] {
  const { LedgerWallet, NodeWallet } = wallets
  const { address, derivationPath = '' } = options

  return isMobile() || retries < 3
    ? [new NodeWallet(address)]
    : [new LedgerWallet(address, derivationPath)]
}

export function isLedgerWallet() {
  return eth.wallet instanceof wallets.LedgerWallet
}
