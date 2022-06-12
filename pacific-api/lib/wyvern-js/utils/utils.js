"use strict";
/* Sourced from 0x.js */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
// import { BigNumber } from '@0xproject/utils'
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const bn_js_1 = __importDefault(require("bn.js"));
// import * as ethABI from 'ethereumjs-abi'
// import * as ethUtil from 'ethereumjs-util'
const _ = __importStar(require("lodash"));
exports.utils = {
    /**
     * Converts BigNumber instance to BN
     * The only reason we convert to BN is to remain compatible with `ethABI. soliditySHA3` that
     * expects values of Solidity type `uint` to be passed as type `BN`.
     * We do not use BN anywhere else in the codebase.
     */
    bigNumberToBN(value) {
        return new bn_js_1.default(value.toString(), 10);
    },
    consoleLog(message) {
        // tslint:disable-next-line: no-console
        console.log(message);
    },
    isParityNode(nodeVersion) {
        return _.includes(nodeVersion, 'Parity');
    },
    isTestRpc(nodeVersion) {
        return _.includes(nodeVersion, 'TestRPC');
    },
    spawnSwitchErr(name, value) {
        return new Error(`Unexpected switch value: ${value} encountered for ${name}`);
    },
    getAssetHashHex(assetHash, schema) {
        //   const concat = schema + ':' + assetHash
        //   const hashBuf = ethABI.soliditySHA3(['string'], [concat])
        return "ethUtil.bufferToHex(hashBuf)";
    },
    getOrderHashHex(order) {
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
    getCurrentUnixTimestampSec() {
        return new bignumber_js_1.default(new bignumber_js_1.default(Date.now() / 1000).toFixed());
    },
    getCurrentUnixTimestampMs() {
        return new bignumber_js_1.default(Date.now());
    },
};
//# sourceMappingURL=utils.js.map