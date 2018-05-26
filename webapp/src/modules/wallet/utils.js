"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decentraland_eth_1 = require("decentraland-eth");
const decentraland_commons_1 = require("decentraland-commons");
const utils_1 = require("lib/utils");
async function connectEthereumWallet(options, retries = 0) {
    try {
        await decentraland_eth_1.eth.connect({
            provider: decentraland_commons_1.env.get('REACT_APP_PROVIDER_URL'),
            contracts: getContracts(),
            wallets: getWallets(options, retries)
        });
        decentraland_eth_1.eth.wallet.getAccount(); // throws on empty accounts
    }
    catch (error) {
        if (retries >= 6) {
            console.warn(`Error trying to connect to Ethereum for the ${retries}th time`, error);
            throw error;
        }
        await decentraland_commons_1.utils.sleep(250);
        return connectEthereumWallet(options, retries + 1);
    }
}
exports.connectEthereumWallet = connectEthereumWallet;
function getContracts() {
    const { MANAToken, LANDRegistry, Marketplace } = decentraland_eth_1.contracts;
    return [
        new MANAToken(decentraland_commons_1.env.get('REACT_APP_MANA_TOKEN_CONTRACT_ADDRESS')),
        new LANDRegistry(decentraland_commons_1.env.get('REACT_APP_LAND_REGISTRY_CONTRACT_ADDRESS')),
        new Marketplace(decentraland_commons_1.env.get('REACT_APP_MARKETPLACE_CONTRACT_ADDRESS'))
    ];
}
function getWallets(options, retries) {
    const { LedgerWallet, NodeWallet } = decentraland_eth_1.wallets;
    const { address, derivationPath = '' } = options;
    let wallet;
    if (utils_1.isMobile() || retries < 3) {
        wallet = new NodeWallet(address);
    }
    else {
        wallet = new LedgerWallet(address, derivationPath);
    }
    return [wallet];
}
function isLedgerWallet() {
    return decentraland_eth_1.eth.wallet instanceof decentraland_eth_1.wallets.LedgerWallet;
}
exports.isLedgerWallet = isLedgerWallet;
//# sourceMappingURL=utils.js.map