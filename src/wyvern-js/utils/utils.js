"use strict";
/* Sourced from 0x.js */
exports.__esModule = true;
exports.utils = void 0;
// import { BigNumber } from '@0xproject/utils'
var bignumber_js_1 = require("bignumber.js");
var bn_js_1 = require("bn.js");
// import * as ethABI from 'ethereumjs-abi'
// import * as ethUtil from 'ethereumjs-util'
var _ = require("lodash");
exports.utils = {
    /**
     * Converts BigNumber instance to BN
     * The only reason we convert to BN is to remain compatible with `ethABI. soliditySHA3` that
     * expects values of Solidity type `uint` to be passed as type `BN`.
     * We do not use BN anywhere else in the codebase.
     */
    bigNumberToBN: function (value) {
        return new bn_js_1["default"](value.toString(), 10);
    },
    consoleLog: function (message) {
        // tslint:disable-next-line: no-console
        console.log(message);
    },
    isParityNode: function (nodeVersion) {
        return _.includes(nodeVersion, 'Parity');
    },
    isTestRpc: function (nodeVersion) {
        return _.includes(nodeVersion, 'TestRPC');
    },
    spawnSwitchErr: function (name, value) {
        return new Error("Unexpected switch value: ".concat(value, " encountered for ").concat(name));
    },
    getAssetHashHex: function (assetHash, schema) {
        //   const concat = schema + ':' + assetHash
        //   const hashBuf = ethABI.soliditySHA3(['string'], [concat])
        return "ethUtil.bufferToHex(hashBuf)";
    },
    getOrderHashHex: function (order) {
        // const orderParts = [
        //     { value: order.exchange, type: SolidityTypes.Address },
        //     { value: order.maker, type: SolidityTypes.Address },
        //     { value: order.taker, type: SolidityTypes.Address },
        //     { value: utils.bigNumberToBN(order.makerRelayerFee), type: SolidityTypes.Uint256 },
        //     { value: utils.bigNumberToBN(order.takerRelayerFee), type: SolidityTypes.Uint256 },
        //     { value: utils.bigNumberToBN(order.makerProtocolFee), type: SolidityTypes.Uint256 },
        //     { value: utils.bigNumberToBN(order.takerProtocolFee), type: SolidityTypes.Uint256 },
        //     { value: order.feeRecipient, type: SolidityTypes.Address },
        //     { value: order.feeMethod, type: SolidityTypes.Uint8 },
        //     { value: order.side, type: SolidityTypes.Uint8 },
        //     { value: order.saleKind, type: SolidityTypes.Uint8 },
        //     { value: order.target, type: SolidityTypes.Address },
        //     { value: order.howToCall, type: SolidityTypes.Uint8 },
        //     { value: new Buffer(order.calldata.slice(2), 'hex'), type: SolidityTypes.Bytes },
        //     { value: new Buffer(order.replacementPattern.slice(2), 'hex'), type: SolidityTypes.Bytes },
        //     { value: order.staticTarget, type: SolidityTypes.Address },
        //     { value: new Buffer(order.staticExtradata.slice(2), 'hex'), type: SolidityTypes.Bytes },
        //     { value: order.paymentToken, type: SolidityTypes.Address },
        //     { value: utils.bigNumberToBN(order.basePrice), type: SolidityTypes.Uint256 },
        //     { value: utils.bigNumberToBN(order.extra), type: SolidityTypes.Uint256 },
        //     { value: utils.bigNumberToBN(order.listingTime), type: SolidityTypes.Uint256 },
        //     { value: utils.bigNumberToBN(order.expirationTime), type: SolidityTypes.Uint256 },
        //     { value: utils.bigNumberToBN(order.salt), type: SolidityTypes.Uint256 },
        // ]
        // const types = _.map(orderParts, o => o.type)
        // const values = _.map(orderParts, o => o.value)
        // const hash = ethABI.soliditySHA3(types, values)
        return "ethUtil.bufferToHex(hash)";
    },
    getCurrentUnixTimestampSec: function () {
        return new bignumber_js_1["default"](new bignumber_js_1["default"](Date.now() / 1000).toFixed());
    },
    getCurrentUnixTimestampMs: function () {
        return new bignumber_js_1["default"](Date.now());
    }
};
