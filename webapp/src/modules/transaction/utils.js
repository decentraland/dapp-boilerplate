"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Special flag used to determine transaction hashes to be monitored
const TRANSACTION_ACTION_FLAG = 'watch_tx';
function isTransactionAction(action) {
    return !!getTransactionFromAction(action);
}
exports.isTransactionAction = isTransactionAction;
function getTransactionFromAction(action) {
    return action[TRANSACTION_ACTION_FLAG];
}
exports.getTransactionFromAction = getTransactionFromAction;
function getTransactionHashFromAction(action) {
    return getTransactionFromAction(action).hash;
}
exports.getTransactionHashFromAction = getTransactionHashFromAction;
function buildTransactionAction(hash, payload = {}, events = []) {
    return {
        [TRANSACTION_ACTION_FLAG]: {
            hash,
            payload,
            events
        }
    };
}
exports.buildTransactionAction = buildTransactionAction;
function isTransactionRejectedError(message) {
    // "Recommended" way to check for rejections
    // https://github.com/MetaMask/faq/issues/6#issuecomment-264900031
    return message.includes('User denied transaction signature');
}
exports.isTransactionRejectedError = isTransactionRejectedError;
function getEtherscanHref(etherscanOptions, network) {
    const { address, txHash, blockNumber } = etherscanOptions;
    const pathname = address
        ? `/address/${address}`
        : blockNumber
            ? `/block/${blockNumber}`
            : `/tx/${txHash}`;
    return `${getEtherscanOrigin(network)}${pathname}`;
}
exports.getEtherscanHref = getEtherscanHref;
function getEtherscanOrigin(network) {
    let origin = 'https://etherscan.io';
    if (network && network !== 'mainnet') {
        origin = `https://${network}.etherscan.io`;
    }
    return origin;
}
exports.getEtherscanOrigin = getEtherscanOrigin;
//# sourceMappingURL=utils.js.map