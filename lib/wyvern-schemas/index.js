"use strict";
// import * as Web3 from 'web3';
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "schemas", { enumerable: true, get: function () { return index_1.schemas; } });
var index_2 = require("./tokens/index");
Object.defineProperty(exports, "tokens", { enumerable: true, get: function () { return index_2.tokens; } });
// export {
//   AbiType,
// } from 'web3';
//# sourceMappingURL=index.js.map