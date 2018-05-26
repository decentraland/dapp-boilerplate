"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const decentraland_eth_1 = require("decentraland-eth");
const types_1 = require("modules/wallet/types");
const actions_1 = require("modules/wallet/actions");
const selectors_1 = require("modules/wallet/selectors");
const utils_1 = require("modules/wallet/utils");
const actions_2 = require("modules/transaction/actions");
function* walletSaga() {
    yield effects_1.takeEvery(types_1.CONNECT_WALLET_REQUEST, handleConnectWalletRequest);
}
exports.walletSaga = walletSaga;
function* handleConnectWalletRequest(action = {}) {
    console.log('********************************');
    console.log('here');
    console.log('********************************');
    try {
        if (!decentraland_eth_1.eth.isConnected()) {
            const { address, derivationPath } = yield effects_1.select(selectors_1.getWallet);
            yield effects_1.call(() => utils_1.connectEthereumWallet({
                address,
                derivationPath
            }));
        }
        let address = yield effects_1.call(() => decentraland_eth_1.eth.getAddress());
        address = address.toLowerCase();
        const network = yield effects_1.call(decentraland_eth_1.eth.getNetwork);
        const wallet = {
            network: network.name,
            type: decentraland_eth_1.eth.wallet.type,
            derivationPath: decentraland_eth_1.eth.wallet.derivationPath,
            address
        };
        yield handleConnectWalletSuccess();
        yield effects_1.put(actions_1.connectWalletSuccess(wallet));
    }
    catch (error) {
        yield effects_1.put(actions_1.connectWalletFailure(error.message));
    }
}
function* handleConnectWalletSuccess() {
    yield effects_1.put(actions_2.watchLoadingTransactions());
}
//# sourceMappingURL=sagas.js.map