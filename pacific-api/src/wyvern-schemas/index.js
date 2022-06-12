"use strict";
// import * as Web3 from 'web3';
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
exports.__esModule = true;
exports.tokens = exports.schemas = void 0;
// /* HACK */
// // @ts-ignore
// Web3.AbiType = {
//   Function: 'function',
//   Event: 'event',
// };
// export {
//   encodeBuy,
//   encodeSell,
//   encodeAtomicizedBuy,
//   encodeAtomicizedSell,
//   encodeCall,
//   encodeDefaultCall,
//   encodeReplacementPattern,
// } from './schemaFunctions';
var index_1 = require("./schemas/index");
__createBinding(exports, index_1, "schemas");
var index_2 = require("./tokens/index");
__createBinding(exports, index_2, "tokens");
// export {
//   AbiType,
// } from 'web3';
