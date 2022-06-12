"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.OpenSeaPort = void 0;
var api_1 = require("@polkadot/api");
// import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util'
var util_1 = require("@polkadot/util");
// import { decodeAddress } from "@polkadot/util-crypto";
//   const publicKey = decodeAddress(address);
//   const hexPublicKey = u8aToHex(publicKey);
// const replaceAddress="5CaRw9VCzZxtnaTjJzWw6NNwi4D9h3yur7akGybuG4wWXaJW";
// const replacePublicKey = decodeAddress(replaceAddress);
// const replaceHexPublicKey = u8aToHex(replacePublicKey);
// import { createType } from '@polkadot/types';
// import * as definitions from '../interfaces/definitions';
require("../interfaces/augment-api");
require("../interfaces/augment-types");
var api_contract_1 = require("@polkadot/api-contract");
var testing_1 = require("@polkadot/keyring/testing");
var keyring = (0, testing_1.createTestKeyring)({ type: "sr25519" });
var bn_js_1 = require("bn.js");
var definitions = require("../interfaces/definitions");
var create_1 = require("@polkadot/types/create");
var registry = new create_1.TypeRegistry();
// import types from './config/types.json'
// import rpcs from './config/rpcs.json'
// const rpc = { ...rpcs }
// import { makeOrderArrayEx, makeOrderEx, makeOrder, orderFromJSON } from '../orders/order'
var wyvernProtocol_1 = require("../wyvern-js/wyvernProtocol");
var WyvernSchemas = require("../wyvern-schemas/index");
// import { Schema } from 'wyvern-schemas/types'
var _ = require("lodash");
var api_2 = require("./api");
var contracts_1 = require("./contracts");
var types_1 = require("./types");
var utils_1 = require("./utils/utils");
var schema_1 = require("./utils/schema");
var debugging_1 = require("./debugging");
var bignumber_js_1 = require("bignumber.js");
// import { EventEmitter } from 'eventemitter3'
// import { isValidAddress } from 'ethereumjs-util'
function isValidAddress(address) { return true; }
var constants_1 = require("./constants");
// let buy: any = ""
var OpenSeaPort = /** @class */ (function () {
    // private _emitter: EventEmitter
    //   private _wrappedNFTFactoryAddress: string
    //   private _wrappedNFTLiquidationProxyAddress: string
    //   private _uniswapFactoryAddress: string
    /**
     * Your very own seaport.
     * Create a new instance of OpenSeaJS.
     * @param provider ApiPromise Provider to use for transactions. For example:
     *  `const provider = new ApiPromise.providers.HttpProvider('https://mainnet.infura.io')`
     * @param apiConfig configuration options, including `networkName`
     * @param logger logger, optional, a function that will be called with debugging
     *  information
     */
    function OpenSeaPort(provider, apiConfig, logger) {
        if (apiConfig === void 0) { apiConfig = {}; }
        this.accounts = "";
        // ApiPromise instance to use
        this.papi = ""; //new ApiPromise({})
        this.apiPro = ""; //new ApiPromise({})
        this.apiProReadOnly = ""; // new ApiPromise({})
        // Extra gwei to add to the mean gas price when making transactions
        this.gasPriceAddition = new bignumber_js_1.BigNumber(3);
        this.gasPrice = new bignumber_js_1.BigNumber(3);
        // Multiply gas estimate by this factor when making transactions
        this.gasIncreaseFactor = constants_1.DEFAULT_GAS_INCREASE_FACTOR;
        // API config
        apiConfig.networkName = apiConfig.networkName || types_1.Network.Main;
        apiConfig.gasPrice = apiConfig.gasPrice || (0, utils_1.makeBigNumber)(300000);
        this.api = new api_2.OpenSeaAPI(apiConfig);
        this.gasPrice = apiConfig.gasPrice;
        this._networkName = apiConfig.networkName;
        this.provider = provider;
        this.readonlyProvider = provider;
        //   const provider = new WsProvider('wss://kusama-rpc.polkadot.io');
        // const provider = new WsProvider('wss://westend-rpc.polkadot.io/');
        //   const provider = new WsProvider('ws://127.0.0.1:9944/');
        //   (async function () { this.apiPro = await this.apiProro()
        //  })
        // const readonlyProvider = provider// this._networkName == Network.Main ? MAINNET_PROVIDER_URL : DEV_PROVIDER_URL)
        // ApiPromise Config
        // this.apiPro = api;
        // this.apiProReadOnly = api;
        // this.apiPro = new ApiPromise({ provider })
        // this.apiProReadOnly = new ApiPromise({ provider: readonlyProvider })
        // this.api.apip = this.apiPro
        // // WyvernJS config
        // this._wyvernProtocol = this.apiPro.tx;
        // // WyvernJS config for readonly
        // this._wyvernProtocolReadOnly = this.apiProReadOnly.rpc;
        // WyvernJS config
        // this._wyvernProtocol = new WyvernProtocol(provider, api, {
        //     network: this._networkName,
        //     gasPrice: apiConfig.gasPrice,
        // })
        // // WyvernJS config for readonly (optimization for infura calls)
        // this._wyvernProtocolReadOnly = new WyvernProtocol(this.readonlyProvider, api, {
        //     network: this._networkName,
        //     gasPrice: apiConfig.gasPrice,
        //     rpc: "readOnly"
        // })
        // // WrappedNFTLiquidationProxy Config
        // this._wrappedNFTFactoryAddress = this._networkName == Network.Main ? WRAPPED_NFT_FACTORY_ADDRESS_MAINNET : WRAPPED_NFT_FACTORY_ADDRESS_DEV
        // this._wrappedNFTLiquidationProxyAddress = this._networkName == Network.Main ? WRAPPED_NFT_LIQUIDATION_PROXY_ADDRESS_MAINNET : WRAPPED_NFT_LIQUIDATION_PROXY_ADDRESS_DEV
        // this._uniswapFactoryAddress = this._networkName == Network.Main ? UNISWAP_FACTORY_ADDRESS_MAINNET : UNISWAP_FACTORY_ADDRESS_DEV
        // Emit events
        // //this._emitter = new EventEmitter()
        // Debugging: default to nothing
        this.logger = logger || (function (arg) { return arg; });
        // (async function () { 
        // await this.apiProro()
        //  })
    }
    OpenSeaPort.prototype.init = function (provider) {
        return __awaiter(this, void 0, void 0, function () {
            var papi, api;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createApiAndTestAccounts(provider)];
                    case 1:
                        papi = _a.sent();
                        api = papi.api;
                        return [4 /*yield*/, provider.connect()];
                    case 2:
                        _a.sent();
                        this.apiPro = api;
                        this.apiProReadOnly = api;
                        this._wyvernProtocol = new wyvernProtocol_1.WyvernProtocol(provider, api, {
                            network: this._networkName,
                            gasPrice: this.gasPrice
                        });
                        // WyvernJS config for readonly (optimization for infura calls)
                        this._wyvernProtocolReadOnly = new wyvernProtocol_1.WyvernProtocol(this.readonlyProvider, api, {
                            network: this._networkName,
                            gasPrice: this.gasPrice,
                            rpc: "readOnly"
                        });
                        return [2 /*return*/, { api: api }];
                }
            });
        });
    };
    OpenSeaPort.prototype.createApiAndTestAccounts = function (provider) {
        return __awaiter(this, void 0, void 0, function () {
            var rpcData, genesisHash, _a, _b, _c, specVersion, rawmetadata, key, types, api;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (provider == undefined) {
                            provider = new api_1.WsProvider('ws://127.0.0.1:9944/');
                        }
                        return [4 /*yield*/, provider.send('state_getMetadata', [])];
                    case 1:
                        rpcData = _d.sent();
                        _b = (_a = registry).createType;
                        _c = ['Hash'];
                        return [4 /*yield*/, provider.send('chain_getBlockHash', [])];
                    case 2:
                        genesisHash = _b.apply(_a, _c.concat([_d.sent()])).toHex();
                        specVersion = 0;
                        rawmetadata = {};
                        key = "".concat(genesisHash, "-").concat(specVersion);
                        rawmetadata[key] = rpcData;
                        types = Object.values(definitions).reduce(function (res, _a) {
                            var types = _a.types;
                            return (__assign(__assign({}, res), types));
                        }, {});
                        return [4 /*yield*/, api_1.ApiPromise.create({
                                provider: provider,
                                rawmetadata: rawmetadata,
                                registry: registry,
                                types: __assign(__assign({}, types), { Keys: 'SessionKeys4' })
                            })];
                    case 3:
                        api = _d.sent();
                        return [2 /*return*/, { api: api }];
                }
            });
        });
    };
    OpenSeaPort.prototype.closeProvider = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.provider.disconnect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OpenSeaPort.prototype.initParameters = function (self, accountAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var accountPair, nonces, nonce;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accountPair = keyring.getPair(accountAddress);
                        return [4 /*yield*/, this.apiPro.rpc.system.accountNextIndex(accountPair.address)];
                    case 1:
                        nonces = _a.sent();
                        nonce = nonces.toString();
                        return [4 /*yield*/, this.apiPro.tx.wyvernExchangeCore.changeOwner(accountAddress).signAndSend(accountPair, { nonce: nonce })];
                    case 2:
                        _a.sent();
                        nonce = (Number(nonces.toString()) + Number(1)).toString();
                        return [4 /*yield*/, this.apiPro.tx.wyvernExchangeCore.setContractSelf(self).signAndSend(accountPair, { nonce: nonce })];
                    case 3:
                        _a.sent();
                        nonce = (Number(nonces.toString()) + Number(2)).toString();
                        return [4 /*yield*/, this.apiPro.tx.wyvernExchangeCore.changeMinimumMakerProtocolFee(1).signAndSend(accountPair, { nonce: nonce })];
                    case 4:
                        _a.sent();
                        nonce = (Number(nonces.toString()) + Number(3)).toString();
                        return [4 /*yield*/, this.apiPro.tx.wyvernExchangeCore.changeMinimumTakerProtocolFee(1).signAndSend(accountPair, { nonce: nonce })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OpenSeaPort.prototype.apipro = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Add a listener to a marketplace event
     * @param event An event to listen for
     * @param listener A callback that will accept an object with event data
     * @param once Whether the listener should only be called once
     */
    OpenSeaPort.prototype.addListener = function (event, listener, once) {
        if (once === void 0) { once = false; }
        // const subscription = once
        //     ? //this._emitter.once(event, listener)
        //     : //this._emitter.addListener(event, listener)
        // return subscription
    };
    // /**
    //  * Remove an event listener, included here for completeness.
    //  * Simply calls `.remove()` on a subscription
    //  * @param subscription The event subscription returned from `addListener`
    //  */
    // public removeListener(subscription: EventSubscription) {
    //     subscription.remove()
    // }
    /**
     * Remove all event listeners. Good idea to call this when you're unmounting
     * a component that listens to events to make UI updates
     * @param event Optional EventType to remove listeners for
     */
    OpenSeaPort.prototype.removeAllListeners = function (event) {
        //this._emitter.removeAllListeners(event)
    };
    //   /**
    //    * Wraps an arbirary group of NFTs into their corresponding WrappedNFT ERC20 tokens.
    //    * Emits the `WrapAssets` event when the transaction is prompted.
    //    * @param param0 __namedParameters Object
    //    * @param assets An array of objects with the tokenId and tokenAddress of each of the assets to bundle together.
    //    * @param accountAddress Address of the user's wallet
    //    */
    //   public async wrapAssets(
    //       { assets, accountAddress }:
    //       { assets: Asset[];
    //         accountAddress: string; }
    //     ) {
    //     const schema = this._getSchema(WyvernSchemaName.ERC721)
    //     const wyAssets = assets.map(a => getWyvernAsset(schema, a))
    //     // Separate assets out into two arrays of tokenIds and tokenAddresses
    //     const tokenIds = wyAssets.map(a => a.id)
    //     const tokenAddresses = wyAssets.map(a => a.address)
    //     // Check if all tokenAddresses match. If not, then we have a mixedBatch of
    //     // NFTs from different NFT core contracts
    //     const isMixedBatchOfAssets: boolean = !tokenAddresses.every( (val, i, arr) => val === arr[0] )
    //     this._dispatch(EventType.WrapAssets, { assets: wyAssets, accountAddress })
    //     const gasPrice = await this._computeGasPrice()
    //     const txHash = await sendRawTransaction(this.apiPro, {
    //       from: accountAddress,
    //       to: this._wrappedNFTLiquidationProxyAddress,
    //       value: 0,
    //       data: encodeCall(getMethod(WrappedNFTLiquidationProxy, 'wrapNFTs'),
    //         [tokenIds, tokenAddresses, isMixedBatchOfAssets]),
    //       gasPrice
    //     }, error => {
    //       this._dispatch(EventType.TransactionDenied, { error, accountAddress })
    //     })
    //     await this._confirmTransaction(txHash, EventType.WrapAssets, "Wrapping Assets")
    //   }
    //   /**
    //    * Unwraps an arbirary group of NFTs from their corresponding WrappedNFT ERC20 tokens back into ERC721 tokens.
    //    * Emits the `UnwrapAssets` event when the transaction is prompted.
    //    * @param param0 __namedParameters Object
    //    * @param assets An array of objects with the tokenId and tokenAddress of each of the assets to bundle together.
    //    * @param destinationAddresses Addresses that each resulting ERC721 token will be sent to. Must be the same length as `tokenIds`. Each address corresponds with its respective token ID in the `tokenIds` array.
    //    * @param accountAddress Address of the user's wallet
    //    */
    //   public async unwrapAssets(
    //       { assets, destinationAddresses, accountAddress }:
    //       { assets: Asset[];
    //         destinationAddresses: string[];
    //         accountAddress: string; }
    //     ) {
    //     if (!assets || !destinationAddresses || assets.length != destinationAddresses.length) {
    //       throw new Error("The 'assets' and 'destinationAddresses' arrays must exist and have the same length.")
    //     }
    //     const schema = this._getSchema(WyvernSchemaName.ERC721)
    //     const wyAssets = assets.map(a => getWyvernAsset(schema, a))
    //     // Separate assets out into two arrays of tokenIds and tokenAddresses
    //     const tokenIds = wyAssets.map(a => a.id)
    //     const tokenAddresses = wyAssets.map(a => a.address)
    //     // Check if all tokenAddresses match. If not, then we have a mixedBatch of
    //     // NFTs from different NFT core contracts
    //     const isMixedBatchOfAssets: boolean = !tokenAddresses.every( (val, i, arr) => val === arr[0] )
    //     this._dispatch(EventType.UnwrapAssets, { assets: wyAssets, accountAddress })
    //     const gasPrice = await this._computeGasPrice()
    //     const txHash = await sendRawTransaction(this.apiPro, {
    //       from: accountAddress,
    //       to: this._wrappedNFTLiquidationProxyAddress,
    //       value: 0,
    //       data: encodeCall(getMethod(WrappedNFTLiquidationProxy, 'unwrapNFTs'),
    //         [tokenIds, tokenAddresses, destinationAddresses, isMixedBatchOfAssets]),
    //       gasPrice
    //     }, error => {
    //       this._dispatch(EventType.TransactionDenied, { error, accountAddress })
    //     })
    //     await this._confirmTransaction(txHash, EventType.UnwrapAssets, "Unwrapping Assets")
    //   }
    //   /**
    //    * Liquidates an arbirary group of NFTs by atomically wrapping them into their
    //    * corresponding WrappedNFT ERC20 tokens, and then immediately selling those
    //    * ERC20 tokens on their corresponding Uniswap exchange.
    //    * Emits the `LiquidateAssets` event when the transaction is prompted.
    //    * @param param0 __namedParameters Object
    //    * @param assets An array of objects with the tokenId and tokenAddress of each of the assets to bundle together.
    //    * @param accountAddress Address of the user's wallet
    //    * @param uniswapSlippageAllowedInBasisPoints The amount of slippage that a user will tolerate in their Uniswap trade; if Uniswap cannot fulfill the order without more slippage, the whole function will revert.
    //    */
    //   public async liquidateAssets(
    //       { assets, accountAddress, uniswapSlippageAllowedInBasisPoints }:
    //       { assets: Asset[];
    //         accountAddress: string;
    //         uniswapSlippageAllowedInBasisPoints: number; }
    //     ) {
    //     // If no slippage parameter is provided, use a sane default value
    //     const uniswapSlippage = uniswapSlippageAllowedInBasisPoints === 0 ? DEFAULT_WRAPPED_NFT_LIQUIDATION_UNISWAP_SLIPPAGE_IN_BASIS_POINTS : uniswapSlippageAllowedInBasisPoints
    //     const schema = this._getSchema(WyvernSchemaName.ERC721)
    //     const wyAssets = assets.map(a => getWyvernAsset(schema, a))
    //     // Separate assets out into two arrays of tokenIds and tokenAddresses
    //     const tokenIds = wyAssets.map(a => a.id)
    //     const tokenAddresses = wyAssets.map(a => a.address)
    //     // Check if all tokenAddresses match. If not, then we have a mixedBatch of
    //     // NFTs from different NFT core contracts
    //     const isMixedBatchOfAssets: boolean = !tokenAddresses.every( (val, i, arr) => val === arr[0] )
    //     this._dispatch(EventType.LiquidateAssets, { assets: wyAssets, accountAddress })
    //     const gasPrice = await this._computeGasPrice()
    //     const txHash = await sendRawTransaction(this.apiPro, {
    //       from: accountAddress,
    //       to: this._wrappedNFTLiquidationProxyAddress,
    //       value: 0,
    //       data: encodeCall(getMethod(WrappedNFTLiquidationProxy, 'liquidateNFTs'),
    //         [tokenIds, tokenAddresses, isMixedBatchOfAssets, uniswapSlippage]),
    //       gasPrice
    //     }, error => {
    //       this._dispatch(EventType.TransactionDenied, { error, accountAddress })
    //     })
    //     await this._confirmTransaction(txHash, EventType.LiquidateAssets, "Liquidating Assets")
    //   }
    //   /**
    //    * Purchases a bundle of WrappedNFT tokens from Uniswap and then unwraps them into ERC721 tokens.
    //    * Emits the `PurchaseAssets` event when the transaction is prompted.
    //    * @param param0 __namedParameters Object
    //    * @param numTokensToBuy The number of WrappedNFT tokens to purchase and unwrap
    //    * @param amount The estimated cost in wei for tokens (probably some ratio above the minimum amount to avoid the transaction failing due to frontrunning, minimum amount is found by calling UniswapExchange(uniswapAddress).getEthToTokenOutputPrice(numTokensToBuy.mul(10**18));
    //    * @param contractAddress Address of the corresponding NFT core contract for these NFTs.
    //    * @param accountAddress Address of the user's wallet
    //    */
    //   public async purchaseAssets(
    //       { numTokensToBuy, amount, contractAddress, accountAddress }:
    //       { numTokensToBuy: number;
    //         amount: BigNumber;
    //         contractAddress: string;
    //         accountAddress: string; }
    //     ) {
    //     const token = WyvernSchemas.tokens[this._networkName].canonicalWrappedEther
    //     this._dispatch(EventType.PurchaseAssets, { amount, contractAddress, accountAddress })
    //     const gasPrice = await this._computeGasPrice()
    //     const txHash = await sendRawTransaction(this.apiPro, {
    //       from: accountAddress,
    //       to: this._wrappedNFTLiquidationProxyAddress,
    //       value: amount,
    //       data: encodeCall(getMethod(WrappedNFTLiquidationProxy, 'purchaseNFTs'),
    //         [numTokensToBuy, contractAddress]),
    //       gasPrice
    //     }, error => {
    //       this._dispatch(EventType.TransactionDenied, { error, accountAddress })
    //     })
    //     await this._confirmTransaction(txHash, EventType.PurchaseAssets, "Purchasing Assets")
    //   }
    //   /**
    //    * Gets the estimated cost or payout of either buying or selling NFTs to Uniswap using either purchaseAssts() or liquidateAssets()
    //    * @param param0 __namedParameters Object
    //    * @param numTokens The number of WrappedNFT tokens to either purchase or sell
    //    * @param isBuying A bool for whether the user is buying or selling
    //    * @param contractAddress Address of the corresponding NFT core contract for these NFTs.
    //    */
    //   public async getQuoteFromUniswap(
    //       { numTokens, isBuying, contractAddress }:
    //       { numTokens: number;
    //         isBuying: boolean;
    //         contractAddress: string; }
    //     ) {
    //     // Get UniswapExchange for WrappedNFTContract for contractAddress
    //     const wrappedNFTFactoryContract = this.apiPro.eth.contract(WrappedNFTFactory as any[])
    //     const wrappedNFTFactory = await wrappedNFTFactoryContract.at(this._wrappedNFTFactoryAddress)
    //     const wrappedNFTAddress = await wrappedNFTFactory.nftContractToWrapperContract(contractAddress)
    //     const wrappedNFTContract = this.apiPro.eth.contract(WrappedNFT as any[])
    //     const wrappedNFT = await wrappedNFTContract.at(wrappedNFTAddress)
    //     const uniswapFactoryContract = this.apiPro.eth.contract(UniswapFactory as any[])
    //     const uniswapFactory = await uniswapFactoryContract.at(this._uniswapFactoryAddress)
    //     const uniswapExchangeAddress = await uniswapFactory.getExchange(wrappedNFTAddress)
    //     const uniswapExchangeContract = this.apiPro.eth.contract(UniswapExchange as any[])
    //     const uniswapExchange = await uniswapExchangeContract.at(uniswapExchangeAddress)
    //     // Convert desired WNFT to wei
    //     const amount = new BigNumber(makeBigNumber(numTokens), wrappedNFT.decimals())
    //     // Return quote from Uniswap
    //     if (isBuying) {
    //       return parseInt(await uniswapExchange.getEthToTokenOutputPrice(amount))
    //     } else {
    //       return parseInt(await uniswapExchange.getTokenToEthInputPrice(amount))
    //     }
    //   }
    // /**
    //  * Wrap ETH into W-ETH.
    //  * W-ETH is needed for placing buy orders (making offers).
    //  * Emits the `WrapEth` event when the transaction is prompted.
    //  * @param param0 __namedParameters Object
    //  * @param amountInEth How much ether to wrap
    //  * @param accountAddress Address of the user's wallet containing the ether
    //  */
    // public async wrapEth(
    //     { amountInEth, accountAddress }:
    //         { amountInEth: number; accountAddress: string }
    // ) {
    //     const token = WyvernSchemas.tokens[this._networkName].canonicalWrappedEther
    //     const amount = new BigNumber(makeBigNumber(amountInEth), token.decimals)
    //     this._dispatch(EventType.WrapEth, { accountAddress, amount })
    //     const gasPrice = await this._computeGasPrice()
    //     const txHash = await sendRawTransaction(this.apiPro, {
    //         from: accountAddress,
    //         to: token.address,
    //         value: amount,
    //         data: encodeCall(getMethod(CanonicalWETH, 'deposit'), []),
    //         gasPrice
    //     }, error => {
    //         this._dispatch(EventType.TransactionDenied, { error, accountAddress })
    //     })
    //     await this._confirmTransaction(txHash, EventType.WrapEth, "Wrapping ETH")
    // }
    // /**
    //  * Unwrap W-ETH into ETH.
    //  * Emits the `UnwrapWeth` event when the transaction is prompted.
    //  * @param param0 __namedParameters Object
    //  * @param amountInEth How much W-ETH to unwrap
    //  * @param accountAddress Address of the user's wallet containing the W-ETH
    //  */
    // public async unwrapWeth(
    //     { amountInEth, accountAddress }:
    //         { amountInEth: number; accountAddress: string }
    // ) {
    //     const token = WyvernSchemas.tokens[this._networkName].canonicalWrappedEther
    //     const amount = new BigNumber(makeBigNumber(amountInEth), token.decimals)
    //     this._dispatch(EventType.UnwrapWeth, { accountAddress, amount })
    //     const gasPrice = await this._computeGasPrice()
    //     const txHash = await sendRawTransaction(this.apiPro, {
    //         from: accountAddress,
    //         to: token.address,
    //         value: 0,
    //         data: encodeCall(getMethod(CanonicalWETH, 'withdraw'), [amount.toString()]),
    //         gasPrice
    //     }, error => {
    //         this._dispatch(EventType.TransactionDenied, { error, accountAddress })
    //     })
    //     await this._confirmTransaction(txHash, EventType.UnwrapWeth, "Unwrapping W-ETH")
    // }
    /**
     * Create a buy order to make an offer on a bundle or group of assets.
     * Will throw an 'Insufficient balance' error if the maker doesn't have enough W-ETH to make the offer.
     * If the user hasn't approved W-ETH access yet, this will emit `ApproveCurrency` before asking for approval.
     * @param param0 __namedParameters Object
     * @param assets Array of Asset objects to bid on
     * @param collection Optional collection for computing fees, required only if all assets belong to the same collection
     * @param quantities The quantity of each asset to sell. Defaults to 1 for each.
     * @param accountAddress Address of the maker's wallet
     * @param startAmount Value of the offer, in units of the payment token (or wrapped ETH if no payment token address specified)
     * @param expirationTime Expiration time for the order, in seconds. An expiration time of 0 means "never expire"
     * @param paymentTokenAddress Optional address for using an ERC-20 token in the order. If unspecified, defaults to W-ETH
     * @param sellOrder Optional sell order (like an English auction) to ensure fee and schema compatibility
     * @param referrerAddress The optional address that referred the order
     */
    ///NEEDED
    OpenSeaPort.prototype.createBundleBuyOrder = function (_a) {
        var assets = _a.assets, collection = _a.collection, quantities = _a.quantities, accountAddress = _a.accountAddress, startAmount = _a.startAmount, _b = _a.expirationTime, expirationTime = _b === void 0 ? 0 : _b, paymentTokenAddress = _a.paymentTokenAddress, sellOrder = _a.sellOrder, referrerAddress = _a.referrerAddress;
        return __awaiter(this, void 0, void 0, function () {
            var order, hashedOrder, signature, error_1, orderWithSignature;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        // Default to 1 of each asset
                        quantities = quantities || assets.map(function (a) { return 1; });
                        paymentTokenAddress = paymentTokenAddress || ""; // WyvernSchemas.tokens[this._networkName].canonicalWrappedEther.address
                        return [4 /*yield*/, this._makeBundleBuyOrder({
                                assets: assets,
                                collection: collection,
                                quantities: quantities,
                                accountAddress: accountAddress,
                                startAmount: startAmount,
                                expirationTime: expirationTime,
                                paymentTokenAddress: paymentTokenAddress,
                                extraBountyBasisPoints: 0,
                                sellOrder: sellOrder,
                                referrerAddress: referrerAddress
                            })
                            // NOTE not in Wyvern exchange code:
                            // frontend checks to make sure
                            // token is approved and sufficiently available
                        ];
                    case 1:
                        order = _c.sent();
                        // NOTE not in Wyvern exchange code:
                        // frontend checks to make sure
                        // token is approved and sufficiently available
                        return [4 /*yield*/, this._buyOrderValidationAndApprovals({ order: order, accountAddress: accountAddress })];
                    case 2:
                        // NOTE not in Wyvern exchange code:
                        // frontend checks to make sure
                        // token is approved and sufficiently available
                        _c.sent();
                        hashedOrder = __assign(__assign({}, order), { hash: (0, utils_1.getOrderHash)(order) });
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this._authorizeOrder(hashedOrder)];
                    case 4:
                        signature = _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _c.sent();
                        console.error(error_1);
                        throw new Error("You declined to authorize your offer");
                    case 6:
                        orderWithSignature = __assign(__assign({}, hashedOrder), signature);
                        return [2 /*return*/, this.validateAndPostOrder(orderWithSignature)];
                }
            });
        });
    };
    /**
     * Create a buy order to make an offer on an asset.
     * Will throw an 'Insufficient balance' error if the maker doesn't have enough W-ETH to make the offer.
     * If the user hasn't approved W-ETH access yet, this will emit `ApproveCurrency` before asking for approval.
     * @param param0 __namedParameters Object
     * @param asset The asset to trade
     * @param accountAddress Address of the maker's wallet
     * @param startAmount Value of the offer, in units of the payment token (or wrapped ETH if no payment token address specified)
     * @param quantity The number of assets to bid for (if fungible or semi-fungible). Defaults to 1. In units, not base units, e.g. not wei.
     * @param expirationTime Expiration time for the order, in seconds. An expiration time of 0 means "never expire"
     * @param paymentTokenAddress Optional address for using an ERC-20 token in the order. If unspecified, defaults to W-ETH
     * @param sellOrder Optional sell order (like an English auction) to ensure fee and schema compatibility
     * @param referrerAddress The optional address that referred the order
     */
    ///NEEDED
    OpenSeaPort.prototype.createBuyOrder = function (_a) {
        var asset = _a.asset, accountAddress = _a.accountAddress, startAmount = _a.startAmount, _b = _a.quantity, quantity = _b === void 0 ? 1 : _b, _c = _a.expirationTime, expirationTime = _c === void 0 ? 0 : _c, paymentTokenAddress = _a.paymentTokenAddress, sellOrder = _a.sellOrder, referrerAddress = _a.referrerAddress;
        return __awaiter(this, void 0, void 0, function () {
            var order, hashedOrder, signature, error_2, orderWithSignature;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        paymentTokenAddress = paymentTokenAddress || ""; // WyvernSchemas.tokens[this._networkName].canonicalWrappedEther.address
                        return [4 /*yield*/, this._makeBuyOrder({
                                asset: asset,
                                quantity: quantity,
                                accountAddress: accountAddress,
                                startAmount: startAmount,
                                expirationTime: expirationTime,
                                paymentTokenAddress: paymentTokenAddress,
                                extraBountyBasisPoints: 0,
                                sellOrder: sellOrder,
                                referrerAddress: referrerAddress
                            })
                            // NOTE not in Wyvern exchange code:
                            // frontend checks to make sure
                            // token is approved and sufficiently available
                        ];
                    case 1:
                        order = _d.sent();
                        // NOTE not in Wyvern exchange code:
                        // frontend checks to make sure
                        // token is approved and sufficiently available
                        return [4 /*yield*/, this._buyOrderValidationAndApprovals({ order: order, accountAddress: accountAddress })];
                    case 2:
                        // NOTE not in Wyvern exchange code:
                        // frontend checks to make sure
                        // token is approved and sufficiently available
                        _d.sent();
                        hashedOrder = __assign(__assign({}, order), { hash: (0, utils_1.getOrderHash)(order) });
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this._authorizeOrder(hashedOrder)];
                    case 4:
                        signature = _d.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _d.sent();
                        console.error(error_2);
                        throw new Error("You declined to authorize your offer");
                    case 6:
                        orderWithSignature = __assign(__assign({}, hashedOrder), signature);
                        return [2 /*return*/, this.validateAndPostOrder(orderWithSignature)];
                }
            });
        });
    };
    /**
     * Create a sell order to auction an asset.
     * Will throw a 'You do not own enough of this asset' error if the maker doesn't have the asset or not enough of it to sell the specific `quantity`.
     * If the user hasn't approved access to the token yet, this will emit `ApproveAllAssets` (or `ApproveAsset` if the contract doesn't support approve-all) before asking for approval.
     * @param param0 __namedParameters Object
     * @param tokenId DEPRECATED: Token ID. Use `asset` instead.
     * @param tokenAddress DEPRECATED: Address of the token's contract. Use `asset` instead.
     * @param asset The asset to trade
     * @param accountAddress Address of the maker's wallet
     * @param startAmount Price of the asset at the start of the auction. Units are in the amount of a token above the token's decimal places (integer part). For example, for ether, expected units are in ETH, not wei.
     * @param endAmount Optional price of the asset at the end of its expiration time. Units are in the amount of a token above the token's decimal places (integer part). For example, for ether, expected units are in ETH, not wei.
     * @param quantity The number of assets to sell (if fungible or semi-fungible). Defaults to 1. In units, not base units, e.g. not wei.
     * @param listingTime Optional time when the order will become fulfillable, in UTC seconds. Undefined means it will start now.
     * @param expirationTime Expiration time for the order, in UTC seconds. An expiration time of 0 means "never expire."
     * @param waitForHighestBid If set to true, this becomes an English auction that increases in price for every bid. The highest bid wins when the auction expires, as long as it's at least `startAmount`. `expirationTime` must be > 0.
     * @param englishAuctionReservePrice Optional price level, below which orders may be placed but will not be matched.  Orders below the reserve can be manually accepted but will not be automatically matched.
     * @param paymentTokenAddress Address of the ERC-20 token to accept in return. If undefined or null, uses Ether.
     * @param extraBountyBasisPoints Optional basis points (1/100th of a percent) to reward someone for referring the fulfillment of this order
     * @param buyerAddress Optional address that's allowed to purchase this item. If specified, no other address will be able to take the order, unless its value is the null address.
     * @param buyerEmail Optional email of the user that's allowed to purchase this item. If specified, a user will have to verify this email before being able to take the order.
     */
    ///NEEDED
    OpenSeaPort.prototype.createSellOrder = function (_a) {
        var asset = _a.asset, accountAddress = _a.accountAddress, startAmount = _a.startAmount, endAmount = _a.endAmount, _b = _a.quantity, quantity = _b === void 0 ? 1 : _b, listingTime = _a.listingTime, _c = _a.expirationTime, expirationTime = _c === void 0 ? 0 : _c, _d = _a.waitForHighestBid, waitForHighestBid = _d === void 0 ? false : _d, englishAuctionReservePrice = _a.englishAuctionReservePrice, paymentTokenAddress = _a.paymentTokenAddress, _e = _a.extraBountyBasisPoints, extraBountyBasisPoints = _e === void 0 ? 0 : _e, buyerAddress = _a.buyerAddress, buyerEmail = _a.buyerEmail;
        return __awaiter(this, void 0, void 0, function () {
            var order, hashedOrder, signature, error_3, orderWithSignature;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this._makeSellOrder({
                            asset: asset,
                            quantity: quantity,
                            accountAddress: accountAddress,
                            startAmount: startAmount,
                            endAmount: endAmount,
                            listingTime: listingTime,
                            expirationTime: expirationTime,
                            waitForHighestBid: waitForHighestBid,
                            englishAuctionReservePrice: englishAuctionReservePrice,
                            paymentTokenAddress: paymentTokenAddress || constants_1.NULL_ADDRESS,
                            extraBountyBasisPoints: extraBountyBasisPoints,
                            buyerAddress: buyerAddress || constants_1.NULL_ADDRESS
                        })];
                    case 1:
                        order = _f.sent();
                        return [4 /*yield*/, this._sellOrderValidationAndApprovals({ order: order, accountAddress: accountAddress })];
                    case 2:
                        _f.sent();
                        if (!buyerEmail) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._createEmailWhitelistEntry({ order: order, buyerEmail: buyerEmail })];
                    case 3:
                        _f.sent();
                        _f.label = 4;
                    case 4:
                        hashedOrder = __assign(__assign({}, order), { hash: (0, utils_1.getOrderHash)(order) });
                        _f.label = 5;
                    case 5:
                        _f.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this._authorizeOrder(hashedOrder)];
                    case 6:
                        signature = _f.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_3 = _f.sent();
                        console.error(error_3);
                        throw new Error("You declined to authorize your auction");
                    case 8:
                        orderWithSignature = __assign(__assign({}, hashedOrder), signature);
                        return [2 /*return*/, this.validateAndPostOrder(orderWithSignature)];
                }
            });
        });
    };
    /**
     * Create multiple sell orders in bulk to auction assets out of an asset factory.
     * Will throw a 'You do not own this asset' error if the maker doesn't own the factory.
     * Items will mint to users' wallets only when they buy them. See https://docs.opensea.io/docs/opensea-initial-item-sale-tutorial for more info.
     * If the user hasn't approved access to the token yet, this will emit `ApproveAllAssets` (or `ApproveAsset` if the contract doesn't support approve-all) before asking for approval.
     * @param param0 __namedParameters Object
     * @param assets Which assets you want to post orders for. Use the tokenAddress of your factory contract
     * @param accountAddress Address of the factory owner's wallet
     * @param startAmount Price of the asset at the start of the auction, or minimum acceptable bid if it's an English auction. Units are in the amount of a token above the token's decimal places (integer part). For example, for ether, expected units are in ETH, not wei.
     * @param endAmount Optional price of the asset at the end of its expiration time. If not specified, will be set to `startAmount`. Units are in the amount of a token above the token's decimal places (integer part). For example, for ether, expected units are in ETH, not wei.
     * @param quantity The number of assets to sell at one time (if fungible or semi-fungible). Defaults to 1. In units, not base units, e.g. not wei.
     * @param listingTime Optional time when the order will become fulfillable, in UTC seconds. Undefined means it will start now.
     * @param expirationTime Expiration time for the order, in seconds. An expiration time of 0 means "never expire."
     * @param waitForHighestBid If set to true, this becomes an English auction that increases in price for every bid. The highest bid wins when the auction expires, as long as it's at least `startAmount`. `expirationTime` must be > 0.
     * @param paymentTokenAddress Address of the ERC-20 token to accept in return. If undefined or null, uses Ether.
     * @param extraBountyBasisPoints Optional basis points (1/100th of a percent) to reward someone for referring the fulfillment of each order
     * @param buyerAddress Optional address that's allowed to purchase each item. If specified, no other address will be able to take each order.
     * @param buyerEmail Optional email of the user that's allowed to purchase each item. If specified, a user will have to verify this email before being able to take each order.
     * @param numberOfOrders Number of times to repeat creating the same order for each asset. If greater than 5, creates them in batches of 5. Requires an `apiKey` to be set during seaport initialization in order to not be throttled by the API.
     * @returns The number of orders created in total
     */
    ///NEEDED
    OpenSeaPort.prototype.createFactorySellOrders = function (_a) {
        var assets = _a.assets, accountAddress = _a.accountAddress, startAmount = _a.startAmount, endAmount = _a.endAmount, _b = _a.quantity, quantity = _b === void 0 ? 1 : _b, listingTime = _a.listingTime, _c = _a.expirationTime, expirationTime = _c === void 0 ? 0 : _c, _d = _a.waitForHighestBid, waitForHighestBid = _d === void 0 ? false : _d, paymentTokenAddress = _a.paymentTokenAddress, _e = _a.extraBountyBasisPoints, extraBountyBasisPoints = _e === void 0 ? 0 : _e, buyerAddress = _a.buyerAddress, buyerEmail = _a.buyerEmail, _f = _a.numberOfOrders, numberOfOrders = _f === void 0 ? 1 : _f;
        return __awaiter(this, void 0, void 0, function () {
            var dummyOrder, _makeAndPostOneSellOrder, range, batches, numOrdersCreated, _i, batches_1, subRange, batchOrdersCreated;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (numberOfOrders < 1) {
                            throw new Error('Need to make at least one sell order');
                        }
                        if (!assets || !assets.length) {
                            throw new Error('Need at least one asset to create orders for');
                        }
                        if (_.uniqBy(assets, function (a) { return a.tokenAddress; }).length !== 1) {
                            throw new Error('All assets must be on the same factory contract address');
                        }
                        return [4 /*yield*/, this._makeSellOrder({
                                asset: assets[0],
                                quantity: quantity,
                                accountAddress: accountAddress,
                                startAmount: startAmount,
                                endAmount: endAmount,
                                listingTime: listingTime,
                                expirationTime: expirationTime,
                                waitForHighestBid: waitForHighestBid,
                                paymentTokenAddress: paymentTokenAddress || constants_1.NULL_ADDRESS,
                                extraBountyBasisPoints: extraBountyBasisPoints,
                                buyerAddress: buyerAddress || constants_1.NULL_ADDRESS
                            })];
                    case 1:
                        dummyOrder = _g.sent();
                        return [4 /*yield*/, this._sellOrderValidationAndApprovals({ order: dummyOrder, accountAddress: accountAddress })];
                    case 2:
                        _g.sent();
                        _makeAndPostOneSellOrder = function (asset) { return __awaiter(_this, void 0, void 0, function () {
                            var order, hashedOrder, signature, error_4, orderWithSignature;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this._makeSellOrder({
                                            asset: asset,
                                            quantity: quantity,
                                            accountAddress: accountAddress,
                                            startAmount: startAmount,
                                            endAmount: endAmount,
                                            listingTime: listingTime,
                                            expirationTime: expirationTime,
                                            waitForHighestBid: waitForHighestBid,
                                            paymentTokenAddress: paymentTokenAddress || constants_1.NULL_ADDRESS,
                                            extraBountyBasisPoints: extraBountyBasisPoints,
                                            buyerAddress: buyerAddress || constants_1.NULL_ADDRESS
                                        })];
                                    case 1:
                                        order = _a.sent();
                                        if (!buyerEmail) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this._createEmailWhitelistEntry({ order: order, buyerEmail: buyerEmail })];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        hashedOrder = __assign(__assign({}, order), { hash: (0, utils_1.getOrderHash)(order) });
                                        _a.label = 4;
                                    case 4:
                                        _a.trys.push([4, 6, , 7]);
                                        return [4 /*yield*/, this._authorizeOrder(hashedOrder)];
                                    case 5:
                                        signature = _a.sent();
                                        return [3 /*break*/, 7];
                                    case 6:
                                        error_4 = _a.sent();
                                        console.error(error_4);
                                        throw new Error("You declined to authorize your auction, or your apip provider can't sign using personal_sign. Try 'apip-provider-engine' and make sure a mnemonic is set. Just a reminder: there's no gas needed anymore to mint tokens!");
                                    case 7:
                                        orderWithSignature = __assign(__assign({}, hashedOrder), signature);
                                        return [2 /*return*/, this.validateAndPostOrder(orderWithSignature)];
                                }
                            });
                        }); };
                        range = _.range(numberOfOrders * assets.length);
                        batches = _.chunk(range, constants_1.SELL_ORDER_BATCH_SIZE);
                        numOrdersCreated = 0;
                        _i = 0, batches_1 = batches;
                        _g.label = 3;
                    case 3:
                        if (!(_i < batches_1.length)) return [3 /*break*/, 7];
                        subRange = batches_1[_i];
                        return [4 /*yield*/, Promise.all(subRange.map(function (assetOrderIndex) { return __awaiter(_this, void 0, void 0, function () {
                                var assetIndex;
                                return __generator(this, function (_a) {
                                    assetIndex = Math.floor(assetOrderIndex / numberOfOrders);
                                    return [2 /*return*/, _makeAndPostOneSellOrder(assets[assetIndex])];
                                });
                            }); }))];
                    case 4:
                        batchOrdersCreated = _g.sent();
                        this.logger("Created and posted a batch of ".concat(batchOrdersCreated.length, " orders in parallel."));
                        numOrdersCreated += batchOrdersCreated.length;
                        // Don't overwhelm router
                        return [4 /*yield*/, (0, utils_1.delay)(500)];
                    case 5:
                        // Don't overwhelm router
                        _g.sent();
                        _g.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 3];
                    case 7: return [2 /*return*/, numOrdersCreated];
                }
            });
        });
    };
    /**
     * Create a sell order to auction a bundle of assets.
     * Will throw a 'You do not own this asset' error if the maker doesn't have one of the assets.
     * If the user hasn't approved access to any of the assets yet, this will emit `ApproveAllAssets` (or `ApproveAsset` if the contract doesn't support approve-all) before asking for approval for each asset.
     * @param param0 __namedParameters Object
     * @param bundleName Name of the bundle
     * @param bundleDescription Optional description of the bundle. Markdown is allowed.
     * @param bundleExternalLink Optional link to a page that adds context to the bundle.
     * @param assets An array of objects with the tokenId and tokenAddress of each of the assets to bundle together.
     * @param collection Optional collection for computing fees, required only if all assets belong to the same collection
     * @param quantities The quantity of each asset to sell. Defaults to 1 for each.
     * @param accountAddress The address of the maker of the bundle and the owner of all the assets.
     * @param startAmount Price of the asset at the start of the auction, or minimum acceptable bid if it's an English auction.
     * @param endAmount Optional price of the asset at the end of its expiration time. If not specified, will be set to `startAmount`.
     * @param listingTime Optional time when the order will become fulfillable, in UTC seconds. Undefined means it will start now.
     * @param expirationTime Expiration time for the order, in seconds. An expiration time of 0 means "never expire."
     * @param waitForHighestBid If set to true, this becomes an English auction that increases in price for every bid. The highest bid wins when the auction expires, as long as it's at least `startAmount`. `expirationTime` must be > 0.
     * @param englishAuctionReservePrice Optional price level, below which orders may be placed but will not be matched.  Orders below the reserve can be manually accepted but will not be automatically matched.
     * @param paymentTokenAddress Address of the ERC-20 token to accept in return. If undefined or null, uses Ether.
     * @param extraBountyBasisPoints Optional basis points (1/100th of a percent) to reward someone for referring the fulfillment of this order
     * @param buyerAddress Optional address that's allowed to purchase this bundle. If specified, no other address will be able to take the order, unless it's the null address.
     */
    ///NEEDED
    OpenSeaPort.prototype.createBundleSellOrder = function (_a) {
        var bundleName = _a.bundleName, bundleDescription = _a.bundleDescription, bundleExternalLink = _a.bundleExternalLink, assets = _a.assets, collection = _a.collection, quantities = _a.quantities, accountAddress = _a.accountAddress, startAmount = _a.startAmount, endAmount = _a.endAmount, _b = _a.expirationTime, expirationTime = _b === void 0 ? 0 : _b, listingTime = _a.listingTime, _c = _a.waitForHighestBid, waitForHighestBid = _c === void 0 ? false : _c, englishAuctionReservePrice = _a.englishAuctionReservePrice, paymentTokenAddress = _a.paymentTokenAddress, _d = _a.extraBountyBasisPoints, extraBountyBasisPoints = _d === void 0 ? 0 : _d, buyerAddress = _a.buyerAddress;
        return __awaiter(this, void 0, void 0, function () {
            var order, hashedOrder, signature, error_5, orderWithSignature;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        // Default to one of each asset
                        quantities = quantities || assets.map(function (a) { return 1; });
                        return [4 /*yield*/, this._makeBundleSellOrder({
                                bundleName: bundleName,
                                bundleDescription: bundleDescription,
                                bundleExternalLink: bundleExternalLink,
                                assets: assets,
                                collection: collection,
                                quantities: quantities,
                                accountAddress: accountAddress,
                                startAmount: startAmount,
                                endAmount: endAmount,
                                listingTime: listingTime,
                                expirationTime: expirationTime,
                                waitForHighestBid: waitForHighestBid,
                                englishAuctionReservePrice: englishAuctionReservePrice,
                                paymentTokenAddress: paymentTokenAddress || constants_1.NULL_ADDRESS,
                                extraBountyBasisPoints: extraBountyBasisPoints,
                                buyerAddress: buyerAddress || constants_1.NULL_ADDRESS
                            })];
                    case 1:
                        order = _e.sent();
                        return [4 /*yield*/, this._sellOrderValidationAndApprovals({ order: order, accountAddress: accountAddress })];
                    case 2:
                        _e.sent();
                        hashedOrder = __assign(__assign({}, order), { hash: (0, utils_1.getOrderHash)(order) });
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this._authorizeOrder(hashedOrder)];
                    case 4:
                        signature = _e.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_5 = _e.sent();
                        console.error(error_5);
                        throw new Error("You declined to authorize your auction");
                    case 6:
                        orderWithSignature = __assign(__assign({}, hashedOrder), signature);
                        return [2 /*return*/, this.validateAndPostOrder(orderWithSignature)];
                }
            });
        });
    };
    /**
     * Fullfill or "take" an order for an asset, either a buy or sell order
     * @param param0 __namedParamaters Object
     * @param order The order to fulfill, a.k.a. "take"
     * @param accountAddress The taker's wallet address
     * @param recipientAddress The optional address to receive the order's item(s) or curriencies. If not specified, defaults to accountAddress.
     * @param referrerAddress The optional address that referred the order
     * @returns Transaction hash for fulfilling the order
     */
    ///NEEDED
    OpenSeaPort.prototype.fulfillOrder = function (_a) {
        var order = _a.order, accountAddress = _a.accountAddress, recipientAddress = _a.recipientAddress, referrerAddress = _a.referrerAddress;
        return __awaiter(this, void 0, void 0, function () {
            var matchingOrder, _b, buy, sell, metadata, transactionHash;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("====fulfillOrder==d=====");
                        matchingOrder = this._makeMatchingOrder({
                            order: order,
                            accountAddress: accountAddress,
                            recipientAddress: recipientAddress || accountAddress
                        });
                        _b = (0, utils_1.assignOrdersToSides)(order, matchingOrder), buy = _b.buy, sell = _b.sell;
                        metadata = this._getMetadata(order, referrerAddress);
                        return [4 /*yield*/, this._atomicMatch({ buy: buy, sell: sell, accountAddress: accountAddress, metadata: metadata })];
                    case 1:
                        transactionHash = _c.sent();
                        console.log("===fulfillOrder===d===2==");
                        return [4 /*yield*/, this._confirmTransaction(transactionHash, types_1.EventType.MatchOrders, "Fulfilling order", function () { return __awaiter(_this, void 0, void 0, function () {
                                var isOpen;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this._validateOrder(order)];
                                        case 1:
                                            isOpen = _a.sent();
                                            return [2 /*return*/, !isOpen];
                                    }
                                });
                            }); })];
                    case 2:
                        _c.sent();
                        return [2 /*return*/, transactionHash];
                }
            });
        });
    };
    /**
     * Cancel an order on-chain, preventing it from ever being fulfilled.
     * @param param0 __namedParameters Object
     * @param order The order to cancel
     * @param accountAddress The order maker's wallet address
     */
    OpenSeaPort.prototype.cancelOrder = function (_a) {
        var order = _a.order, accountAddress = _a.accountAddress;
        return __awaiter(this, void 0, void 0, function () {
            var accountPair, transactionHash;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._dispatch(types_1.EventType.CancelOrder, { order: order, accountAddress: accountAddress });
                        accountPair = keyring.getPair(accountAddress);
                        transactionHash = this._wyvernProtocol.wyvernExchange.cancelOrderEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata, order.v).signAndSend(accountPair);
                        return [4 /*yield*/, this._confirmTransaction(transactionHash.toString(), types_1.EventType.CancelOrder, "Cancelling order", function () { return __awaiter(_this, void 0, void 0, function () {
                                var isOpen;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this._validateOrder(order)];
                                        case 1:
                                            isOpen = _a.sent();
                                            return [2 /*return*/, !isOpen];
                                    }
                                });
                            }); })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Approve a non-fungible token for use in trades.
     * Requires an account to be initialized first.
     * Called internally, but exposed for dev flexibility.
     * Checks to see if already approved, first. Then tries different approval methods from best to worst.
     * @param param0 __namedParamters Object
     * @param tokenId Token id to approve, but only used if approve-all isn't
     *  supported by the token contract
     * @param tokenAddress The contract address of the token being approved
     * @param accountAddress The user's wallet address
     * @param proxyAddress Address of the user's proxy contract. If not provided,
     *  will attempt to fetch it from Wyvern.
     * @param tokenAbi ABI of the token's contract. Defaults to a flexible ERC-721
     *  contract.
     * @param skipApproveAllIfTokenAddressIn an optional list of token addresses that, if a token is approve-all type, will skip approval
     * @param schemaName The Wyvern schema name corresponding to the asset type
     * @returns Transaction hash if a new transaction was created, otherwise null
     */
    OpenSeaPort.prototype.approveSemiOrNonFungibleToken = function (_a) {
        var tokenId = _a.tokenId, tokenAddress = _a.tokenAddress, accountAddress = _a.accountAddress, proxyAddress = _a.proxyAddress, _b = _a.tokenAbi, tokenAbi = _b === void 0 ? contracts_1.ERC721 : _b, _c = _a.skipApproveAllIfTokenAddressIn, skipApproveAllIfTokenAddressIn = _c === void 0 ? new Set() : _c, _d = _a.schemaName, schemaName = _d === void 0 ? types_1.WyvernSchemaName.ERC721 : _d;
        return __awaiter(this, void 0, void 0, function () {
            var schema, accountPair, abi, contract, approvalAllCheck, isApprovedForAll, txHash, gasConsumed, result, error_6, approvalOneCheck, isApprovedForOne, gasConsumed, result, error, txHash, error_7;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        console.log("===============approveSemiOrNonFungibleToken==================");
                        schema = this._getSchema(schemaName);
                        if (!!proxyAddress) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._getProxy(accountAddress)];
                    case 1:
                        proxyAddress = (_e.sent()) || undefined;
                        if (!proxyAddress) {
                            throw new Error('Uninitialized account');
                        }
                        _e.label = 2;
                    case 2:
                        accountPair = keyring.getPair(accountAddress);
                        abi = new api_contract_1.Abi(tokenAbi, this.apiPro.registry.getChainProperties());
                        contract = new api_contract_1.ContractPromise(this.apiPro, abi, tokenAddress);
                        approvalAllCheck = function () { return __awaiter(_this, void 0, void 0, function () {
                            var output;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, contract.query.isApprovedForAll(accountAddress, { value: 0, gasLimit: -1 }, accountAddress, proxyAddress)];
                                    case 1:
                                        output = (_a.sent()).output;
                                        console.log(output != null ? output.toString() : "", "===========output===========", output, output != null ? output.toString() == "false" : 0);
                                        return [2 /*return*/, output != null ? output.toString() == "true" : output];
                                }
                            });
                        }); };
                        return [4 /*yield*/, approvalAllCheck()];
                    case 3:
                        isApprovedForAll = _e.sent();
                        if (isApprovedForAll) {
                            // Supports ApproveAll
                            this.logger('Already approved proxy for all tokens');
                            return [2 /*return*/, null];
                        }
                        if (!!isApprovedForAll) return [3 /*break*/, 8];
                        // Supports ApproveAll
                        //  not approved for all yet
                        if (skipApproveAllIfTokenAddressIn.has(tokenAddress)) {
                            this.logger('Already approving proxy for all tokens in another transaction');
                            return [2 /*return*/, null];
                        }
                        skipApproveAllIfTokenAddressIn.add(tokenAddress);
                        _e.label = 4;
                    case 4:
                        _e.trys.push([4, 7, , 8]);
                        this._dispatch(types_1.EventType.ApproveAllAssets, {
                            accountAddress: accountAddress,
                            proxyAddress: proxyAddress,
                            contractAddress: tokenAddress
                        });
                        txHash = "";
                        return [4 /*yield*/, contract.query.setApprovalForAll(accountAddress, { value: 0, gasLimit: -1 }, proxyAddress, true)];
                    case 5:
                        gasConsumed = (_e.sent()).gasConsumed;
                        return [4 /*yield*/, contract.tx.setApprovalForAll({ value: 0, gasLimit: gasConsumed.toString() }, proxyAddress, true).signAndSend(accountPair)];
                    case 6:
                        result = _e.sent();
                        txHash = result.toString();
                        // await this._confirmTransaction(txHash, EventType.ApproveAllAssets, 'Approving all tokens of this type for trading', async () => {
                        //     const result = await approvalAllCheck()
                        //     return result == 1
                        // })
                        return [2 /*return*/, txHash];
                    case 7:
                        error_6 = _e.sent();
                        console.error(error_6);
                        throw new Error("Couldn't get permission to approve these tokens for trading. Their contract might not be implemented correctly. Please contact the developer!");
                    case 8:
                        // Does not support ApproveAll (ERC721 v1 or v2)
                        this.logger('Contract does not support Approve All');
                        approvalOneCheck = function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a, result, output, approvedAddr, approvedAddru;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, contract.query.getApproved(accountAddress, { value: 0, gasLimit: -1 }, tokenId)];
                                    case 1:
                                        _a = _b.sent(), result = _a.result, output = _a.output;
                                        console.log(output === null || output === void 0 ? void 0 : output.toString(), "======result==========", result.toString());
                                        approvedAddr = output != null && output.toString() != '' ? output.toString() : "null";
                                        if (approvedAddr == proxyAddress) {
                                            this.logger('Already approved proxy for this token');
                                            return [2 /*return*/, true];
                                        }
                                        this.logger("Approve response: ".concat(approvedAddr));
                                        // SPECIAL CASING non-compliant contracts
                                        console.log(approvedAddr, "======approvedAddr==========", tokenId, accountAddress);
                                        if (!!approvedAddr) return [3 /*break*/, 3];
                                        return [4 /*yield*/, (0, utils_1.getNonCompliantApprovalAddress)(contract, tokenId, accountAddress)];
                                    case 2:
                                        approvedAddru = _b.sent();
                                        console.log(approvedAddru, "======approvedAddru==========", tokenId, accountAddress);
                                        if (approvedAddru != undefined) {
                                            approvedAddr = approvedAddru;
                                        }
                                        if (approvedAddr == proxyAddress) {
                                            this.logger('Already approved proxy for this item');
                                            return [2 /*return*/, true];
                                        }
                                        this.logger("Special-case approve response: ".concat(approvedAddr));
                                        _b.label = 3;
                                    case 3: return [2 /*return*/, false];
                                }
                            });
                        }); };
                        return [4 /*yield*/, approvalOneCheck()];
                    case 9:
                        isApprovedForOne = _e.sent();
                        if (isApprovedForOne) {
                            return [2 /*return*/, null];
                        }
                        _e.label = 10;
                    case 10:
                        _e.trys.push([10, 14, , 15]);
                        this._dispatch(types_1.EventType.ApproveAsset, {
                            accountAddress: accountAddress,
                            proxyAddress: proxyAddress,
                            asset: (0, utils_1.getWyvernAsset)(schema, { tokenId: tokenId, tokenAddress: tokenAddress })
                        });
                        return [4 /*yield*/, contract.query.approve(accountAddress, { value: 0, gasLimit: -1 }, proxyAddress, tokenId)];
                    case 11:
                        gasConsumed = (_e.sent()).gasConsumed;
                        console.log("=======approve=======gasConsumed==========", gasConsumed.toString());
                        return [4 /*yield*/, contract.tx.approve({ value: 0, gasLimit: gasConsumed.toString() }, proxyAddress, tokenId).signAndSend(accountPair)];
                    case 12:
                        result = _e.sent();
                        console.log(accountPair.address, proxyAddress, tokenId, "=======approve=======result==========", result.toString());
                        if (!result) {
                            error = new Error(result);
                            this._dispatch(types_1.EventType.TransactionDenied, { error: error, accountAddress: accountAddress });
                        }
                        txHash = result.toString();
                        return [4 /*yield*/, this._confirmTransaction(txHash, types_1.EventType.ApproveAsset, "Approving single token for trading", approvalOneCheck)];
                    case 13:
                        _e.sent();
                        return [2 /*return*/, txHash];
                    case 14:
                        error_7 = _e.sent();
                        console.error(error_7);
                        throw new Error("Couldn't get permission to approve this token for trading. Its contract might not be implemented correctly. Please contact the developer!");
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Approve a fungible token (e.g. W-ETH) for use in trades.
     * Called internally, but exposed for dev flexibility.
     * Checks to see if the minimum amount is already approved, first.
     * @param param0 __namedParamters Object
     * @param accountAddress The user's wallet address
     * @param tokenAddress The contract address of the token being approved
     * @param proxyAddress The user's proxy address. If unspecified, uses the Wyvern token transfer proxy address.
     * @param minimumAmount The minimum amount needed to skip a transaction. Defaults to the max-integer.
     * @returns Transaction hash if a new transaction occurred, otherwise null
     */
    OpenSeaPort.prototype.approveFungibleToken = function (_a) {
        var accountAddress = _a.accountAddress, tokenAddress = _a.tokenAddress, proxyAddress = _a.proxyAddress, nonce = _a.nonce, _b = _a.minimumAmount, minimumAmount = _b === void 0 ? new bignumber_js_1.BigNumber(Number.MAX_VALUE / 1000000000) : _b;
        return __awaiter(this, void 0, void 0, function () {
            var approvedAmount, hasOldApproveMethod, txHash, gas, erc20abi, contract, fromPair, _c, gasConsumed, result, output, nonces, result;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        proxyAddress = proxyAddress || wyvernProtocol_1.WyvernProtocol.getTokenTransferProxyAddress(this._networkName);
                        return [4 /*yield*/, this._getApprovedTokenCount({
                                accountAddress: accountAddress,
                                tokenAddress: tokenAddress,
                                proxyAddress: proxyAddress
                            })];
                    case 1:
                        approvedAmount = _d.sent();
                        if (approvedAmount.isGreaterThanOrEqualTo(minimumAmount)) {
                            this.logger('Already approved enough currency for trading');
                            return [2 /*return*/, null];
                        }
                        this.logger("Not enough token approved for trade: ".concat(approvedAmount, " approved to transfer ").concat(tokenAddress));
                        this._dispatch(types_1.EventType.ApproveCurrency, {
                            accountAddress: accountAddress,
                            contractAddress: tokenAddress,
                            proxyAddress: proxyAddress
                        });
                        hasOldApproveMethod = [constants_1.ENJIN_COIN_ADDRESS, constants_1.MANA_ADDRESS].includes(tokenAddress);
                        if (minimumAmount.isGreaterThan(0) && hasOldApproveMethod) {
                            // Older erc20s require initial approval to be 0
                            // await this.unapproveFungibleToken({ accountAddress, tokenAddress, proxyAddress })
                        }
                        erc20abi = new api_contract_1.Abi(contracts_1.ERC20, this.apiPro.registry.getChainProperties());
                        contract = new api_contract_1.ContractPromise(this.apiPro, erc20abi, tokenAddress);
                        fromPair = keyring.getPair(accountAddress);
                        return [4 /*yield*/, contract.query.approve(accountAddress, { value: 0, gasLimit: -1 }, proxyAddress, wyvernProtocol_1.WyvernProtocol.MAX_UINT_256.toString())];
                    case 2:
                        _c = _d.sent(), gasConsumed = _c.gasConsumed, result = _c.result, output = _c.output;
                        // The actual result from RPC as `ContractExecResult`
                        console.log(result.toHuman());
                        gas = new bn_js_1["default"](gasConsumed.toString());
                        // gas consumed
                        console.log(gasConsumed.toHuman());
                        // check if the call was successful
                        if (result.isOk) {
                            // should output 123 as per our initial set (output here is an i32)
                            console.log(accountAddress, 'transfer Success', output);
                        }
                        else {
                            console.error('balanceOf Error', result.asErr);
                        }
                        if (!(nonce == undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.apiPro.rpc.system.accountNextIndex(fromPair.address)];
                    case 3:
                        nonces = _d.sent();
                        nonce = nonces.toString(); //(Number(nonces.toString()) + Number(1)).toString();
                        _d.label = 4;
                    case 4:
                        console.log(accountAddress, proxyAddress, '===approve fromPair.address=nonce===', nonce, fromPair.address);
                        return [4 /*yield*/, contract.tx.approve({ value: 0, gasLimit: gas }, proxyAddress, wyvernProtocol_1.WyvernProtocol.MAX_UINT_256.toString()).signAndSend(fromPair, { nonce: nonce })];
                    case 5:
                        result = _d.sent();
                        // The actual result from RPC as `ContractExecResult`
                        // console.log(result);
                        txHash = result.toString();
                        // const gasPrice = await this._computeGasPrice()
                        // const txHash = await sendRawTransaction(this.apiPro, {
                        //     from: accountAddress,
                        //     to: tokenAddress,
                        //     data: encodeCall(getMethod(ERC20, 'approve'),
                        //         // Always approve maximum amount, to prevent the need for followup
                        //         // transactions (and because old ERC20s like MANA/ENJ are non-compliant)
                        //         [proxyAddress, Number.MAX_VALUE.toString()]),
                        //     gasPrice
                        // }, error => {
                        //     this._dispatch(EventType.TransactionDenied, { error, accountAddress })
                        // })
                        return [4 /*yield*/, this._confirmTransaction(txHash, types_1.EventType.ApproveCurrency, "Approving currency for trading", function () { return __awaiter(_this, void 0, void 0, function () {
                                var newlyApprovedAmount;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this._getApprovedTokenCount({
                                                accountAddress: accountAddress,
                                                tokenAddress: tokenAddress,
                                                proxyAddress: proxyAddress
                                            })];
                                        case 1:
                                            newlyApprovedAmount = _a.sent();
                                            return [2 /*return*/, newlyApprovedAmount.isGreaterThanOrEqualTo(minimumAmount)];
                                    }
                                });
                            }); })];
                    case 6:
                        // const gasPrice = await this._computeGasPrice()
                        // const txHash = await sendRawTransaction(this.apiPro, {
                        //     from: accountAddress,
                        //     to: tokenAddress,
                        //     data: encodeCall(getMethod(ERC20, 'approve'),
                        //         // Always approve maximum amount, to prevent the need for followup
                        //         // transactions (and because old ERC20s like MANA/ENJ are non-compliant)
                        //         [proxyAddress, Number.MAX_VALUE.toString()]),
                        //     gasPrice
                        // }, error => {
                        //     this._dispatch(EventType.TransactionDenied, { error, accountAddress })
                        // })
                        _d.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    // /**
    //  * Un-approve a fungible token (e.g. W-ETH) for use in trades.
    //  * Called internally, but exposed for dev flexibility.
    //  * Useful for old ERC20s that require a 0 approval count before
    //  * changing the count
    //  * @param param0 __namedParamters Object
    //  * @param accountAddress The user's wallet address
    //  * @param tokenAddress The contract address of the token being approved
    //  * @param proxyAddress The user's proxy address. If unspecified, uses the Wyvern token transfer proxy address.
    //  * @returns Transaction hash
    //  */
    // public async unapproveFungibleToken(
    //     { accountAddress,
    //         tokenAddress,
    //         proxyAddress }:
    //         {
    //             accountAddress: string;
    //             tokenAddress: string;
    //             proxyAddress?: string;
    //         }
    // ): Promise<string> {
    //     proxyAddress = proxyAddress || WyvernProtocol.getTokenTransferProxyAddress(this._networkName)
    //     const gasPrice = await this._computeGasPrice()
    //     const txHash = await sendRawTransaction(this.apiPro, {
    //         from: accountAddress,
    //         to: tokenAddress,
    //         data: encodeCall(getMethod(ERC20, 'approve'), [proxyAddress, 0]),
    //         gasPrice
    //     }, error => {
    //         this._dispatch(EventType.TransactionDenied, { error, accountAddress })
    //     })
    //     await this._confirmTransaction(txHash, EventType.UnapproveCurrency, "Resetting Currency Approval", async () => {
    //         const newlyApprovedAmount = await this._getApprovedTokenCount({
    //             accountAddress,
    //             tokenAddress,
    //             proxyAddress
    //         })
    //         return newlyApprovedAmount.isZero()
    //     })
    //     return txHash
    // }
    /**
     * Gets the price for the order using the contract
     * @param order The order to calculate the price for
     */
    OpenSeaPort.prototype.getCurrentPrice = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var currentPrice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata);
                        return [4 /*yield*/, this._wyvernProtocolReadOnly.wyvernExchange.calculateCurrentPriceEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata)];
                    case 1:
                        currentPrice = _a.sent();
                        return [2 /*return*/, currentPrice];
                }
            });
        });
    };
    /**
     * Returns whether an order is fulfillable.
     * An order may not be fulfillable if a target item's transfer function
     * is locked for some reason, e.g. an item is being rented within a game
     * or trading has been locked for an item type.
     * @param param0 __namedParamters Object
     * @param order Order to check
     * @param accountAddress The account address that will be fulfilling the order
     * @param recipientAddress The optional address to receive the order's item(s) or curriencies. If not specified, defaults to accountAddress.
     * @param referrerAddress The optional address that referred the order
     */
    OpenSeaPort.prototype.isOrderFulfillable = function (_a) {
        var order = _a.order, accountAddress = _a.accountAddress, recipientAddress = _a.recipientAddress, referrerAddress = _a.referrerAddress;
        return __awaiter(this, void 0, void 0, function () {
            var matchingOrder, _b, buy, sell, metadata, gas;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        matchingOrder = this._makeMatchingOrder({
                            order: order,
                            accountAddress: accountAddress,
                            recipientAddress: recipientAddress || accountAddress
                        });
                        _b = (0, utils_1.assignOrdersToSides)(order, matchingOrder), buy = _b.buy, sell = _b.sell;
                        metadata = this._getMetadata(order, referrerAddress);
                        return [4 /*yield*/, this._estimateGasForMatch({ buy: buy, sell: sell, accountAddress: accountAddress, metadata: metadata })];
                    case 1:
                        gas = _c.sent();
                        this.logger("Gas estimate for ".concat(order.side == types_1.OrderSide.Sell ? "sell" : "buy", " order: ").concat(gas));
                        return [2 /*return*/, gas != null && gas > 0];
                }
            });
        });
    };
    /**
     * Returns whether an asset is transferrable.
     * An asset may not be transferrable if its transfer function
     * is locked for some reason, e.g. an item is being rented within a game
     * or trading has been locked for an item type.
     * @param param0 __namedParamters Object
     * @param tokenId DEPRECATED: Token ID. Use `asset` instead.
     * @param tokenAddress DEPRECATED: Address of the token's contract. Use `asset` instead.
     * @param asset The asset to trade
     * @param fromAddress The account address that currently owns the asset
     * @param toAddress The account address that will be acquiring the asset
     * @param quantity The amount of the asset to transfer, if it's fungible (optional). In units (not base units), e.g. not wei.
     * @param useProxy Use the `fromAddress`'s proxy contract only if the `fromAddress` has already approved the asset for sale. Required if checking an ERC-721 v1 asset (like CryptoKitties) that doesn't check if the transferFrom caller is the owner of the asset (only allowing it if it's an approved address).
     * @param retries How many times to retry if false
     */
    OpenSeaPort.prototype.isAssetTransferrable = function (_a, retries) {
        var asset = _a.asset, fromAddress = _a.fromAddress, toAddress = _a.toAddress, quantity = _a.quantity, _b = _a.useProxy, useProxy = _b === void 0 ? false : _b;
        if (retries === void 0) { retries = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var schema, quantityBN, wyAsset, abi, from, proxyAddress, gas, erc20abi, contract, _c, gasConsumed, result, output, error_8;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        schema = this._getSchema(asset.schemaName);
                        quantityBN = quantity
                            ? wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(quantity), asset.decimals || 0)
                            : (0, utils_1.makeBigNumber)(1);
                        wyAsset = (0, utils_1.getWyvernAsset)(schema, asset, quantityBN);
                        if (schema.functions == undefined) {
                            return [2 /*return*/, false];
                        }
                        abi = schema.functions.transfer(wyAsset);
                        from = fromAddress;
                        if (!useProxy) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._getProxy(fromAddress)];
                    case 1:
                        proxyAddress = _d.sent();
                        if (!proxyAddress) {
                            console.error("This asset's owner (".concat(fromAddress, ") does not have a proxy!"));
                            return [2 /*return*/, false];
                        }
                        from = proxyAddress;
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 7]);
                        gas = void 0;
                        erc20abi = new api_contract_1.Abi(contracts_1.ERC20, this.apiPro.registry.getChainProperties());
                        contract = new api_contract_1.ContractPromise(this.apiPro, erc20abi, abi.target);
                        return [4 /*yield*/, contract.query.transfer(fromAddress, { value: 0, gasLimit: -1 }, toAddress, quantity)];
                    case 3:
                        _c = _d.sent(), gasConsumed = _c.gasConsumed, result = _c.result, output = _c.output;
                        // The actual result from RPC as `ContractExecResult`
                        console.log(result.toHuman());
                        gas = new bignumber_js_1.BigNumber(gasConsumed.toString());
                        // gas consumed
                        console.log(gasConsumed.toHuman());
                        // check if the call was successful
                        if (result.isOk) {
                            // should output 123 as per our initial set (output here is an i32)
                            console.log(fromAddress, 'transfer Success', output);
                        }
                        else {
                            console.error('balanceOf Error', result.asErr);
                        }
                        // const gas = await estimateGas(this._getClientsForRead(retries).apip, {
                        // //     from,
                        // //     to: abi.target,
                        // //     data
                        // // })
                        return [2 /*return*/, gas > new bignumber_js_1.BigNumber(0)];
                    case 4:
                        error_8 = _d.sent();
                        if (retries <= 0) {
                            console.error(error_8);
                            console.error(from, abi.target);
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, (0, utils_1.delay)(500)];
                    case 5:
                        _d.sent();
                        return [4 /*yield*/, this.isAssetTransferrable({ asset: asset, fromAddress: fromAddress, toAddress: toAddress, quantity: quantity, useProxy: useProxy }, retries - 1)];
                    case 6: return [2 /*return*/, _d.sent()];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Transfer a fungible or non-fungible asset to another address
     * @param param0 __namedParamaters Object
     * @param fromAddress The owner's wallet address
     * @param toAddress The recipient's wallet address
     * @param asset The fungible or non-fungible asset to transfer
     * @param quantity The amount of the asset to transfer, if it's fungible (optional). In units (not base units), e.g. not wei.
     * @returns Transaction hash
     */
    ///NEEDED
    OpenSeaPort.prototype.transfer = function (_a) {
        var fromAddress = _a.fromAddress, toAddress = _a.toAddress, asset = _a.asset, _b = _a.quantity, quantity = _b === void 0 ? 1 : _b;
        return __awaiter(this, void 0, void 0, function () {
            var schema, quantityBN, wyAsset, isCryptoKitties, isOldNFT, abi, inputValues, erc20abi, contract, fromPair, txHash, gas, _c, gasConsumed, result, output, result;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        schema = this._getSchema(asset.schemaName);
                        quantityBN = wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(quantity), asset.decimals || 0);
                        wyAsset = (0, utils_1.getWyvernAsset)(schema, asset, quantityBN);
                        isCryptoKitties = [constants_1.CK_ADDRESS, constants_1.CK_DEV_ADDRESS].includes(wyAsset.address);
                        isOldNFT = isCryptoKitties || !!asset.version && [
                            types_1.TokenStandardVersion.ERC721v1, types_1.TokenStandardVersion.ERC721v2
                        ].includes(asset.version);
                        if (schema.functions == undefined) {
                            return [2 /*return*/, ""];
                        }
                        abi = asset.schemaName === types_1.WyvernSchemaName.ERC20
                            ? (0, utils_1.annotateERC20TransferABI)(wyAsset)
                            : isOldNFT
                                ? (0, utils_1.annotateERC721TransferABI)(wyAsset)
                                : schema.functions.transfer(wyAsset);
                        this._dispatch(types_1.EventType.TransferOne, { accountAddress: fromAddress, toAddress: toAddress, asset: wyAsset });
                        inputValues = abi.inputs.filter(function (x) { return x.value !== undefined; }).map(function (x) { return x.value; });
                        erc20abi = new api_contract_1.Abi(contracts_1.ERC20, this.apiPro.registry.getChainProperties());
                        contract = new api_contract_1.ContractPromise(this.apiPro, erc20abi, abi.target);
                        fromPair = keyring.getPair(fromAddress);
                        return [4 /*yield*/, (_d = contract.query).transfer.apply(_d, __spreadArray([fromAddress, { value: 0, gasLimit: -1 }, toAddress], inputValues, false))];
                    case 1:
                        _c = _f.sent(), gasConsumed = _c.gasConsumed, result = _c.result, output = _c.output;
                        // The actual result from RPC as `ContractExecResult`
                        console.log(result.toHuman());
                        gas = new bn_js_1["default"](gasConsumed.toString());
                        // gas consumed
                        console.log(gasConsumed.toHuman());
                        // check if the call was successful
                        if (result.isOk) {
                            // should output 123 as per our initial set (output here is an i32)
                            console.log(fromAddress, 'transfer Success', output);
                        }
                        else {
                            console.error('balanceOf Error', result.asErr);
                        }
                        return [4 /*yield*/, (_e = contract.tx).transfer.apply(_e, __spreadArray([{ value: 0, gasLimit: gas }, toAddress], inputValues, false)).signAndSend(fromPair)];
                    case 2:
                        result = _f.sent();
                        // The actual result from RPC as `ContractExecResult`
                        console.log(result.toHuman());
                        txHash = result.toString();
                        return [4 /*yield*/, this._confirmTransaction(txHash, types_1.EventType.TransferOne, "Transferring asset")];
                    case 3:
                        _f.sent();
                        return [2 /*return*/, txHash
                            // return ""
                        ];
                }
            });
        });
    };
    /**
     * Transfer one or more assets to another address.
     * ERC-721 and ERC-1155 assets are supported
     * @param param0 __namedParamaters Object
     * @param assets An array of objects with the tokenId and tokenAddress of each of the assets to transfer.
     * @param fromAddress The owner's wallet address
     * @param toAddress The recipient's wallet address
     * @param schemaName The Wyvern schema name corresponding to the asset type, if not in each Asset definition
     * @returns Transaction hash
     */
    ///NEEDED
    OpenSeaPort.prototype.transferAll = function (_a) {
        var assets = _a.assets, fromAddress = _a.fromAddress, toAddress = _a.toAddress, _b = _a.schemaName, schemaName = _b === void 0 ? types_1.WyvernSchemaName.ERC721 : _b;
        return __awaiter(this, void 0, void 0, function () {
            var wyAssets, selectors, transactions, target, atomicizedCalldata, txHash, fromPair, proxyAddress, gas, _c, gasConsumed, result, output, result;
            var _d, _e;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        toAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, toAddress);
                        wyAssets = assets.map(function (asset) { return (0, utils_1.getWyvernAsset)(_this._getSchema(asset.schemaName), asset); });
                        selectors = ["0x0b396f18", "0x0b396f18"];
                        transactions = wyAssets.map(function (asset, i) {
                            console.log(asset.address, "======asset.address========", fromAddress, toAddress);
                            return {
                                tx: asset.address,
                                value: 7
                            };
                        });
                        target = wyvernProtocol_1.WyvernProtocol.getAtomicizerContractAddress(this._networkName);
                        console.log(this._networkName, "=====_networkName======", target);
                        atomicizedCalldata = [selectors[0], transactions.map(function (t) { return t.tx; }), fromAddress, toAddress, transactions.map(function (t) { return t.value; })
                        ];
                        txHash = "";
                        fromPair = keyring.getPair(fromAddress);
                        console.log.apply(console, __spreadArray(["===================ddddd====================="], atomicizedCalldata, false));
                        return [4 /*yield*/, this._getProxy(fromAddress)];
                    case 1:
                        proxyAddress = _f.sent();
                        if (!!proxyAddress) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._initializeProxy(fromAddress)];
                    case 2:
                        proxyAddress = _f.sent();
                        _f.label = 3;
                    case 3:
                        console.log("===================proxyAddress===s==================", proxyAddress);
                        // await this._approveAll({ schemaNames, wyAssets, accountAddress: fromAddress, proxyAddress })
                        this._dispatch(types_1.EventType.TransferAll, { accountAddress: fromAddress, toAddress: toAddress, assets: wyAssets });
                        return [4 /*yield*/, (_d = this._wyvernProtocol.wyvernAtomicizer.query).atomicTransaction.apply(_d, __spreadArray([fromAddress, { value: 0, gasLimit: -1 }], atomicizedCalldata, false))];
                    case 4:
                        _c = _f.sent(), gasConsumed = _c.gasConsumed, result = _c.result, output = _c.output;
                        console.log(result.toHuman());
                        gas = new bn_js_1["default"](gasConsumed.toString());
                        console.log(gasConsumed.toHuman());
                        if (result.isOk) {
                            console.log(fromAddress, 'transfer Success', output);
                        }
                        else {
                            console.error('balanceOf Error', result.asErr);
                        }
                        return [4 /*yield*/, (_e = this._wyvernProtocol.wyvernAtomicizer.tx).atomicTransaction.apply(_e, __spreadArray([{ value: 0, gasLimit: gas }], atomicizedCalldata, false)).signAndSend(fromPair)];
                    case 5:
                        result = _f.sent();
                        console.log(result.toHuman());
                        txHash = result.toString();
                        // const gasPrice = await this._computeGasPrice()
                        // const txHash = await sendRawTransaction(this.apiPro, {
                        //     from: fromAddress,
                        //     to: proxyAddress,
                        //     data: encodeProxyCall(target, HowToCall.DelegateCall, calldata),
                        //     gasPrice
                        // }, error => {
                        //     this._dispatch(EventType.TransactionDenied, { error, accountAddress: fromAddress })
                        // })
                        // await this._confirmTransaction(txHash, EventType.TransferAll, `Transferring ${assets.length} asset${assets.length == 1 ? '' : 's'}`)
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    OpenSeaPort.prototype.encodeTransferAll = function (_a) {
        var assets = _a.assets, fromAddress = _a.fromAddress, toAddress = _a.toAddress, _b = _a.schemaName, schemaName = _b === void 0 ? types_1.WyvernSchemaName.ERC721 : _b;
        return __awaiter(this, void 0, void 0, function () {
            var wyAssets, fromPair, toPair, selectors, transactions, target, atomicizedCalldata;
            var _c;
            var _this = this;
            return __generator(this, function (_d) {
                toAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, toAddress);
                wyAssets = assets.map(function (asset) { return (0, utils_1.getWyvernAsset)(_this._getSchema(asset.schemaName), asset); });
                fromPair = keyring.getPair(fromAddress);
                console.log(fromPair.publicKey);
                toPair = keyring.getPair(toAddress);
                console.log(toPair.publicKey);
                selectors = ["0x0b396f18", "0x0b396f18"];
                transactions = wyAssets.map(function (asset, i) {
                    console.log(asset.address, "======asset.address========", fromAddress, toAddress);
                    return {
                        tx: asset.address,
                        value: 7
                    };
                });
                target = wyvernProtocol_1.WyvernProtocol.getAtomicizerContractAddress(this._networkName);
                console.log(this._networkName, "=====_networkName======", target);
                atomicizedCalldata = [selectors[0], transactions.map(function (t) { return t.tx; }), fromAddress, toAddress, transactions.map(function (t) { return t.value; })
                ];
                // const erc20abi = new Abi(msigmetadata, this.apiPro.registry.getChainProperties());
                // const contract = new ContractPromise(this.apiPro, erc20abi, target);
                console.log.apply(console, atomicizedCalldata);
                return [2 /*return*/, (_c = this._wyvernProtocol.wyvernAtomicizer.tx).atomicTransaction.apply(_c, __spreadArray([{ value: 0, gasLimit: -1 }], atomicizedCalldata, false)).toHex()];
            });
        });
    };
    /**
     * Get an account's balance of any Asset.
     * @param param0 __namedParameters Object
     * @param accountAddress Account address to check
     * @param asset The Asset to check balance for
     * @param retries How many times to retry if balance is 0
     */
    ///NEEDED
    OpenSeaPort.prototype.getAssetBalance = function (_a, retries) {
        var accountAddress = _a.accountAddress, asset = _a.asset;
        if (retries === void 0) { retries = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var schema, wyAsset, abi, count, erc20abi, contract, _b, gasConsumed, result, output, abi, inputValues, owner, erc721abi, contract, _c, gasConsumed, result, output;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        schema = this._getSchema(asset.schemaName);
                        wyAsset = (0, utils_1.getWyvernAsset)(schema, asset);
                        console.log(wyAsset.address, asset.schemaName, schema.functions);
                        if (!(schema.functions != undefined && schema.functions.countOf)) return [3 /*break*/, 2];
                        abi = schema.functions.countOf(wyAsset);
                        console.log(abi.target, asset.schemaName, schema.functions);
                        count = 0;
                        erc20abi = new api_contract_1.Abi(contracts_1.ERC20, this.apiPro.registry.getChainProperties());
                        contract = new api_contract_1.ContractPromise(this.apiPro, erc20abi, abi.target);
                        return [4 /*yield*/, contract.query.balanceOf(accountAddress, { value: 0, gasLimit: -1 }, accountAddress)];
                    case 1:
                        _b = _e.sent(), gasConsumed = _b.gasConsumed, result = _b.result, output = _b.output;
                        count = output == null ? 0 : Number(output.toString()); //?.toString();
                        // The actual result from RPC as `ContractExecResult`
                        console.log(result.toHuman());
                        // gas consumed
                        console.log(gasConsumed.toHuman());
                        // check if the call was successful
                        if (result.isOk) {
                            // should output 123 as per our initial set (output here is an i32)
                            console.log(accountAddress, 'balanceOf Success', output);
                        }
                        else {
                            console.error('balanceOf Error', result.asErr);
                        }
                        if (count !== undefined) {
                            return [2 /*return*/, new bignumber_js_1.BigNumber(count)];
                        }
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(schema.functions != undefined && schema.functions.ownerOf)) return [3 /*break*/, 4];
                        abi = schema.functions.ownerOf(wyAsset);
                        // const contract = this._getClientsForRead(retries).apip.eth.contract([abi as ApiPromise.FunctionAbi]).at(abi.target)
                        if (abi.inputs.filter(function (x) { return x.value === undefined; })[0]) {
                            throw new Error("Missing an argument for finding the owner of this asset");
                        }
                        inputValues = abi.inputs.map(function (i) { return i.value.toString(); });
                        owner = void 0;
                        erc721abi = new api_contract_1.Abi(contracts_1.ERC721, this.apiPro.registry.getChainProperties());
                        contract = new api_contract_1.ContractPromise(this.apiPro, erc721abi, abi.target);
                        // const address = "5FkmJ5zuMvqSGau2AGrwyz2ensv4ge6VHP2d8KenFpUXEEkJ";
                        console.log.apply(console, __spreadArray([abi.target, "inputValues================="], inputValues, false));
                        return [4 /*yield*/, (_d = contract.query).ownerOf.apply(_d, __spreadArray([accountAddress, { value: 0, gasLimit: -1 }], inputValues, false))];
                    case 3:
                        _c = _e.sent(), gasConsumed = _c.gasConsumed, result = _c.result, output = _c.output;
                        owner = output === null || output === void 0 ? void 0 : output.toString();
                        // The actual result from RPC as `ContractExecResult`
                        console.log(result.toHuman());
                        // gas consumed
                        console.log(gasConsumed.toHuman());
                        // check if the call was successful
                        if (result.isOk) {
                            // should output 123 as per our initial set (output here is an i32)
                            console.log(accountAddress, 'ownerOf Success', output);
                        }
                        else {
                            console.error('ownerOf Error', result.asErr);
                        }
                        if (owner) {
                            return [2 /*return*/, owner == accountAddress
                                    ? new bignumber_js_1.BigNumber(1)
                                    : new bignumber_js_1.BigNumber(0)];
                        }
                        return [3 /*break*/, 5];
                    case 4: 
                    // Missing ownership call - skip check to allow listings
                    // by default
                    throw new Error('Missing ownership schema for this asset type');
                    case 5:
                        if (!(retries <= 0)) return [3 /*break*/, 6];
                        throw new Error('Unable to get current owner from smart contract');
                    case 6: return [4 /*yield*/, (0, utils_1.delay)(500)
                        // Recursively check owner again
                    ];
                    case 7:
                        _e.sent();
                        return [4 /*yield*/, this.getAssetBalance({ accountAddress: accountAddress, asset: asset }, retries - 1)];
                    case 8: 
                    // Recursively check owner again
                    return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    /**
     * Get the balance of a fungible token.
     * Convenience method for getAssetBalance for fungibles
     * @param param0 __namedParameters Object
     * @param accountAddress Account address to check
     * @param tokenAddress The address of the token to check balance for
     * @param schemaName Optional schema name for the fungible token
     * @param retries Number of times to retry if balance is undefined
     */
    OpenSeaPort.prototype.getTokenBalance = function (_a, retries) {
        var accountAddress = _a.accountAddress, tokenAddress = _a.tokenAddress, _b = _a.schemaName, schemaName = _b === void 0 ? types_1.WyvernSchemaName.ERC20 : _b;
        if (retries === void 0) { retries = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var asset;
            return __generator(this, function (_c) {
                asset = {
                    tokenId: null,
                    tokenAddress: tokenAddress,
                    schemaName: schemaName
                };
                return [2 /*return*/, this.getAssetBalance({ accountAddress: accountAddress, asset: asset }, retries)];
            });
        });
    };
    /**
     * Compute the fees for an order
     * @param param0 __namedParameters
     * @param asset Asset to use for fees. May be blank ONLY for multi-collection bundles.
     * @param side The side of the order (buy or sell)
     * @param accountAddress The account to check fees for (useful if fees differ by account, like transfer fees)
     * @param isPrivate Whether the order is private or not (known taker)
     * @param extraBountyBasisPoints The basis points to add for the bounty. Will throw if it exceeds the assets' contract's OpenSea fee.
     */
    OpenSeaPort.prototype.computeFees = function (_a) {
        var asset = _a.asset, side = _a.side, accountAddress = _a.accountAddress, _b = _a.isPrivate, isPrivate = _b === void 0 ? false : _b, _c = _a.extraBountyBasisPoints, extraBountyBasisPoints = _c === void 0 ? 0 : _c;
        return __awaiter(this, void 0, void 0, function () {
            var openseaBuyerFeeBasisPoints, openseaSellerFeeBasisPoints, devBuyerFeeBasisPoints, devSellerFeeBasisPoints, transferFee, transferFeeTokenAddress, maxTotalBountyBPS, sellerBountyBasisPoints, bountyTooLarge, errorMessage;
            return __generator(this, function (_d) {
                openseaBuyerFeeBasisPoints = constants_1.DEFAULT_BUYER_FEE_BASIS_POINTS;
                openseaSellerFeeBasisPoints = constants_1.DEFAULT_SELLER_FEE_BASIS_POINTS;
                devBuyerFeeBasisPoints = 0;
                devSellerFeeBasisPoints = 0;
                transferFee = (0, utils_1.makeBigNumber)(0);
                transferFeeTokenAddress = null;
                maxTotalBountyBPS = constants_1.DEFAULT_MAX_BOUNTY;
                if (asset) {
                    openseaBuyerFeeBasisPoints = +asset.collection.openseaBuyerFeeBasisPoints;
                    openseaSellerFeeBasisPoints = +asset.collection.openseaSellerFeeBasisPoints;
                    devBuyerFeeBasisPoints = +asset.collection.devBuyerFeeBasisPoints;
                    devSellerFeeBasisPoints = +asset.collection.devSellerFeeBasisPoints;
                    maxTotalBountyBPS = openseaSellerFeeBasisPoints;
                }
                // Compute transferFrom fees
                if (side == types_1.OrderSide.Sell && asset) {
                    // Server-side knowledge
                    transferFee = asset.transferFee
                        ? (0, utils_1.makeBigNumber)(asset.transferFee)
                        : transferFee;
                    transferFeeTokenAddress = asset.transferFeePaymentToken
                        ? "asset.transferFeePaymentToken.address"
                        : transferFeeTokenAddress;
                    try {
                        // apip call to update it
                        // const result = await getTransferFeeSettings(this.apiPro, { asset, accountAddress })
                        transferFee = new bignumber_js_1.BigNumber(0); // result.transferFee != null ? result.transferFee : transferFee
                        transferFeeTokenAddress = ""; // result.transferFeeTokenAddress || transferFeeTokenAddress
                    }
                    catch (error) {
                        // Use server defaults
                        console.error(error);
                    }
                }
                sellerBountyBasisPoints = side == types_1.OrderSide.Sell
                    ? extraBountyBasisPoints
                    : 0;
                bountyTooLarge = sellerBountyBasisPoints + constants_1.OPENSEA_SELLER_BOUNTY_BASIS_POINTS > maxTotalBountyBPS;
                if (sellerBountyBasisPoints > 0 && bountyTooLarge) {
                    errorMessage = "Total bounty exceeds the maximum for this asset type (".concat(maxTotalBountyBPS / 100, "%).");
                    if (maxTotalBountyBPS >= constants_1.OPENSEA_SELLER_BOUNTY_BASIS_POINTS) {
                        errorMessage += " Remember that OpenSea will add ".concat(constants_1.OPENSEA_SELLER_BOUNTY_BASIS_POINTS / 100, "% for referrers with OpenSea accounts!");
                    }
                    throw new Error(errorMessage);
                }
                // Remove fees for private orders
                if (isPrivate) {
                    openseaBuyerFeeBasisPoints = 0;
                    openseaSellerFeeBasisPoints = 0;
                    devBuyerFeeBasisPoints = 0;
                    devSellerFeeBasisPoints = 0;
                    sellerBountyBasisPoints = 0;
                }
                return [2 /*return*/, {
                        totalBuyerFeeBasisPoints: openseaBuyerFeeBasisPoints + devBuyerFeeBasisPoints,
                        totalSellerFeeBasisPoints: openseaSellerFeeBasisPoints + devSellerFeeBasisPoints,
                        openseaBuyerFeeBasisPoints: openseaBuyerFeeBasisPoints,
                        openseaSellerFeeBasisPoints: openseaSellerFeeBasisPoints,
                        devBuyerFeeBasisPoints: devBuyerFeeBasisPoints,
                        devSellerFeeBasisPoints: devSellerFeeBasisPoints,
                        sellerBountyBasisPoints: sellerBountyBasisPoints,
                        transferFee: transferFee,
                        transferFeeTokenAddress: transferFeeTokenAddress
                    }];
            });
        });
    };
    /**
     * Validate and post an order to the OpenSea orderbook.
     * @param order The order to post. Can either be signed by the maker or pre-approved on the Wyvern contract using approveOrder. See https://github.com/ProjectWyvern/wyvern-ethereum/blob/master/contracts/exchange/Exchange.sol#L178
     * @returns The order as stored by the orderbook
     */
    OpenSeaPort.prototype.validateAndPostOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, confirmedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._wyvernProtocolReadOnly.wyvernExchange.hashOrderEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata)];
                    case 1:
                        hash = _a.sent();
                        if (hash !== order.hash) {
                            console.error(order);
                            throw new Error("Order couldn't be validated by the exchange due to a hash mismatch. Make sure your wallet is on the right network!");
                        }
                        return [4 /*yield*/, this.api.postOrder((0, utils_1.orderToJSON)(order))];
                    case 2:
                        confirmedOrder = _a.sent();
                        return [2 /*return*/, confirmedOrder];
                }
            });
        });
    };
    /**
     * Compute the gas price for sending a txn, in wei
     * Will be slightly above the mean to make it faster
     */
    OpenSeaPort.prototype._computeGasPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // const meanGas = await getCurrentGasPrice(this.apiPro)
                // const weiToAdd = this.apiPro.toWei(this.gasPriceAddition, 'gwei')
                // return meanGas.plus(weiToAdd)
                return [2 /*return*/, new bignumber_js_1.BigNumber(0)];
            });
        });
    };
    /**
     * Compute the gas amount for sending a txn
     * Will be slightly above the result of estimateGas to make it more reliable
     * @param estimation The result of estimateGas for a transaction
     */
    OpenSeaPort.prototype._correctGasAmount = function (estimation) {
        return Math.ceil(estimation * this.gasIncreaseFactor);
    };
    /**
     * Estimate the gas needed to match two orders. Returns undefined if tx errors
     * @param param0 __namedParamaters Object
     * @param buy The buy order to match
     * @param sell The sell order to match
     * @param accountAddress The taker's wallet address
     * @param metadata Metadata bytes32 to send with the match
     * @param retries Number of times to retry if false
     */
    OpenSeaPort.prototype._estimateGasForMatch = function (_a, retries) {
        var buy = _a.buy, sell = _a.sell, accountAddress = _a.accountAddress, _b = _a.metadata, metadata = _b === void 0 ? constants_1.NULL_BLOCK_HASH : _b;
        if (retries === void 0) { retries = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var accountPair, sell_hash, buy_hash, buyPair, buy_sig, sellPair, sell_sig, args, info, partialFee, error_9;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        accountPair = keyring.getPair(buy.maker);
                        return [4 /*yield*/, this._wyvernProtocolReadOnly.wyvernExchange.hashToSignEx([sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken], [sell.makerRelayerFee.toNumber(), sell.takerRelayerFee.toNumber(), sell.makerProtocolFee.toNumber(), sell.takerProtocolFee.toNumber(), sell.basePrice.toNumber() / Number(1000000000), sell.extra.toNumber(), sell.listingTime.toNumber(), sell.expirationTime.toNumber(), sell.salt.toNumber()], sell.feeMethod, sell.side, sell.saleKind, sell.howToCall, sell.calldata, sell.replacementPattern, sell.staticExtradata)];
                    case 1:
                        sell_hash = _c.sent();
                        return [4 /*yield*/, this._wyvernProtocolReadOnly.wyvernExchange.hashToSignEx([buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken], [buy.makerRelayerFee.toNumber(), buy.takerRelayerFee.toNumber(), buy.makerProtocolFee.toNumber(), buy.takerProtocolFee.toNumber(), buy.basePrice.toNumber() / Number(1000000000), buy.extra.toNumber(), buy.listingTime.toNumber(), buy.expirationTime.toNumber(), buy.salt.toNumber()], buy.feeMethod, buy.side, buy.saleKind, buy.howToCall, buy.calldata, buy.replacementPattern, buy.staticExtradata)];
                    case 2:
                        buy_hash = _c.sent();
                        buyPair = keyring.getPair(buy.maker);
                        buy_sig = buyPair.sign(buy_hash);
                        sellPair = keyring.getPair(sell.maker);
                        sell_sig = sellPair.sign(sell_hash);
                        args = [
                            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target,
                                buy.staticTarget, buy.paymentToken, sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
                            [buy.makerRelayerFee.toNumber(), buy.takerRelayerFee.toNumber(), buy.makerProtocolFee.toNumber(), buy.takerProtocolFee.toNumber(), buy.basePrice.toNumber() / Number(1000000000), buy.extra.toNumber(), buy.listingTime.toNumber(), buy.expirationTime.toNumber(), buy.salt.toNumber(), sell.makerRelayerFee.toNumber(), sell.takerRelayerFee.toNumber(), sell.makerProtocolFee.toNumber(), sell.takerProtocolFee.toNumber(), sell.basePrice.toNumber() / Number(1000000000), sell.extra.toNumber(), sell.listingTime.toNumber(), sell.expirationTime.toNumber(), sell.salt.toNumber()],
                            [buy.feeMethod, buy.side, buy.saleKind, buy.howToCall, sell.feeMethod, sell.side, sell.saleKind, sell.howToCall],
                            buy.calldata,
                            sell.calldata,
                            buy.replacementPattern,
                            sell.replacementPattern,
                            buy.staticExtradata,
                            sell.staticExtradata,
                            (0, util_1.u8aToHex)(buy_sig), (0, util_1.u8aToHex)(sell_sig),
                            '0x0000000000000000000000000000000000000000000000000000000000000000'
                        ];
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 8]);
                        return [4 /*yield*/, this._getClientsForRead(retries).wyvernProtocol.wyvernExchange.atomicMatchEx(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11]).paymentInfo(accountPair)];
                    case 4:
                        info = _c.sent();
                        partialFee = Number("".concat(info.partialFee.toHuman()));
                        return [2 /*return*/, partialFee];
                    case 5:
                        error_9 = _c.sent();
                        if (retries <= 0) {
                            console.error(error_9);
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, (0, utils_1.delay)(200)];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, this._estimateGasForMatch({ buy: buy, sell: sell, accountAddress: accountAddress, metadata: metadata }, retries - 1)];
                    case 7: return [2 /*return*/, _c.sent()];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Estimate the gas needed to transfer assets in bulk
     * Used for tests
     * @param param0 __namedParamaters Object
     * @param assets An array of objects with the tokenId and tokenAddress of each of the assets to transfer.
     * @param fromAddress The owner's wallet address
     * @param toAddress The recipient's wallet address
     * @param schemaName The Wyvern schema name corresponding to the asset type, if not in each asset
     */
    OpenSeaPort.prototype._estimateGasForTransfer = function (_a) {
        var assets = _a.assets, fromAddress = _a.fromAddress, toAddress = _a.toAddress, _b = _a.schemaName, schemaName = _b === void 0 ? types_1.WyvernSchemaName.ERC721 : _b;
        return __awaiter(this, void 0, void 0, function () {
            var schemaNames, wyAssets, proxyAddress;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        schemaNames = assets.map(function (asset) { return asset.schemaName || schemaName; });
                        wyAssets = assets.map(function (asset) { return (0, utils_1.getWyvernAsset)(_this._getSchema(asset.schemaName), asset); });
                        return [4 /*yield*/, this._getProxy(fromAddress)];
                    case 1:
                        proxyAddress = _c.sent();
                        if (!proxyAddress) {
                            throw new Error('Uninitialized proxy address');
                        }
                        return [4 /*yield*/, this._approveAll({ schemaNames: schemaNames, wyAssets: wyAssets, accountAddress: fromAddress, proxyAddress: proxyAddress })
                            // const { calldata, target } = encodeAtomicizedTransfer(schemaNames.map(name => this._getSchema(name)), wyAssets, fromAddress, toAddress, this._wyvernProtocol, this._networkName)
                            // return estimateGas(this.apiPro, {
                            //   from: fromAddress,
                            //   to: proxyAddress,
                            //   data: encodeProxyCall(target, HowToCall.DelegateCall, calldata)
                            // })
                        ];
                    case 2:
                        _c.sent();
                        // const { calldata, target } = encodeAtomicizedTransfer(schemaNames.map(name => this._getSchema(name)), wyAssets, fromAddress, toAddress, this._wyvernProtocol, this._networkName)
                        // return estimateGas(this.apiPro, {
                        //   from: fromAddress,
                        //   to: proxyAddress,
                        //   data: encodeProxyCall(target, HowToCall.DelegateCall, calldata)
                        // })
                        return [2 /*return*/, 0];
                }
            });
        });
    };
    /**
     * Get the proxy address for a user's wallet.
     * Internal method exposed for dev flexibility.
     * @param accountAddress The user's wallet address
     * @param retries Optional number of retries to do
     */
    OpenSeaPort.prototype._getProxy = function (accountAddress, retries) {
        if (retries === void 0) { retries = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var proxyAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        proxyAddress = this._wyvernProtocol.wyvernProxyRegistry.query.getProxy(accountAddress, {});
                        if (proxyAddress == '') {
                            throw new Error("Couldn't retrieve your account from the blockchain - make sure you're on the correct Ethereum network!");
                        }
                        if (!(!proxyAddress || proxyAddress == constants_1.NULL_ADDRESS)) return [3 /*break*/, 4];
                        if (!(retries > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, utils_1.delay)(1000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._getProxy(accountAddress, retries - 1)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        proxyAddress = null;
                        _a.label = 4;
                    case 4: return [2 /*return*/, proxyAddress];
                }
            });
        });
    };
    /**
     * Initialize the proxy for a user's wallet.
     * Proxies are used to make trades on behalf of the order's maker so that
     *  trades can happen when the maker isn't online.
     * Internal method exposed for dev flexibility.
     * @param accountAddress The user's wallet address
     */
    OpenSeaPort.prototype._initializeProxy = function (accountAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var gas, fromAddress, fromPair, registryAddress, _a, gasConsumed, result, output, result, proxyAddress;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._dispatch(types_1.EventType.InitializeAccount, { accountAddress: accountAddress });
                        this.logger("Initializing proxy for account: ".concat(accountAddress));
                        fromAddress = accountAddress;
                        fromPair = keyring.getPair(fromAddress);
                        registryAddress = wyvernProtocol_1.WyvernProtocol.getOwnableDelegateProxyAddress(this._networkName);
                        return [4 /*yield*/, this._wyvernProtocol.wyvernProxyRegistry.query.registerProxy(fromAddress, { value: 0, gasLimit: -1 }, registryAddress)];
                    case 1:
                        _a = _b.sent(), gasConsumed = _a.gasConsumed, result = _a.result, output = _a.output;
                        console.log(result.toHuman());
                        gas = new bn_js_1["default"](gasConsumed.toString());
                        console.log(gasConsumed.toHuman());
                        if (result.isOk) {
                            console.log(fromAddress, 'transfer Success', output);
                        }
                        else {
                            console.error('balanceOf Error', result.asErr);
                        }
                        return [4 /*yield*/, this._wyvernProtocol.wyvernProxyRegistry.tx.registerProxy({ value: 0, gasLimit: gas }, registryAddress).signAndSend(fromPair)];
                    case 2:
                        result = _b.sent();
                        console.log(result.toHuman());
                        return [4 /*yield*/, this._getProxy(accountAddress, 2)];
                    case 3:
                        proxyAddress = _b.sent();
                        if (!proxyAddress) {
                            throw new Error('Failed to initialize your account :( Please restart your wallet/browser and try again!');
                        }
                        return [2 /*return*/, proxyAddress];
                }
            });
        });
    };
    /**
     * For a fungible token to use in trades (like W-ETH), get the amount
     *  approved for use by the Wyvern transfer proxy.
     * Internal method exposed for dev flexibility.
     * @param param0 __namedParamters Object
     * @param accountAddress Address for the user's wallet
     * @param tokenAddress Address for the token's contract
     * @param proxyAddress User's proxy address. If undefined, uses the token transfer proxy address
     */
    OpenSeaPort.prototype._getApprovedTokenCount = function (_a) {
        var accountAddress = _a.accountAddress, tokenAddress = _a.tokenAddress, proxyAddress = _a.proxyAddress;
        return __awaiter(this, void 0, void 0, function () {
            var addressToApprove, erc20abi, contract, _b, result, output, approved;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("========_getApprovedTokenCount=============", tokenAddress);
                        if (!tokenAddress) {
                            tokenAddress = WyvernSchemas.tokens[this._networkName].canonicalWrappedEther.address;
                        }
                        addressToApprove = proxyAddress || wyvernProtocol_1.WyvernProtocol.getTokenTransferProxyAddress(this._networkName);
                        console.log(proxyAddress, "====addressToApprove=====", addressToApprove, "========_getApprovedTokenCount=============", tokenAddress);
                        erc20abi = new api_contract_1.Abi(contracts_1.ERC20, this.apiPro.registry.getChainProperties());
                        contract = new api_contract_1.ContractPromise(this.apiPro, erc20abi, tokenAddress);
                        return [4 /*yield*/, contract.query.allowance(accountAddress, { value: 0, gasLimit: -1 }, accountAddress, addressToApprove)];
                    case 1:
                        _b = _c.sent(), result = _b.result, output = _b.output;
                        console.log("====result=====", result, "========result=============", output);
                        approved = output == null ? 0 : Number(output.toString());
                        // const approved = await rawCall(this.apiPro, {
                        //     from: accountAddress,
                        //     to: tokenAddress,
                        //     data: encodeCall(getMethod(ERC20, 'allowance'),
                        //         [accountAddress, addressToApprove]),
                        // })
                        return [2 /*return*/, (0, utils_1.makeBigNumber)(approved)];
                }
            });
        });
    };
    OpenSeaPort.prototype._makeBuyOrder = function (_a) {
        var asset = _a.asset, quantity = _a.quantity, accountAddress = _a.accountAddress, startAmount = _a.startAmount, _b = _a.expirationTime, expirationTime = _b === void 0 ? 0 : _b, paymentTokenAddress = _a.paymentTokenAddress, _c = _a.extraBountyBasisPoints, extraBountyBasisPoints = _c === void 0 ? 0 : _c, sellOrder = _a.sellOrder, referrerAddress = _a.referrerAddress;
        return __awaiter(this, void 0, void 0, function () {
            var schema, quantityBN, wyAsset, openSeaAsset, taker, _d, totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, _e, makerRelayerFee, takerRelayerFee, makerProtocolFee, takerProtocolFee, makerReferrerFee, feeRecipient, feeMethod, _f, target, calldata, replacementPattern, _g, basePrice, extra, paymentToken, times, _h, staticTarget, staticExtradata;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        accountAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, accountAddress);
                        schema = this._getSchema(asset.schemaName);
                        quantityBN = wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(quantity), asset.decimals || 0);
                        wyAsset = (0, utils_1.getWyvernAsset)(schema, asset, quantityBN);
                        return [4 /*yield*/, this.api.getAsset(asset)];
                    case 1:
                        openSeaAsset = _j.sent();
                        taker = sellOrder
                            ? sellOrder.maker
                            : constants_1.NULL_ADDRESS;
                        return [4 /*yield*/, this.computeFees({ asset: openSeaAsset, extraBountyBasisPoints: extraBountyBasisPoints, side: types_1.OrderSide.Buy })];
                    case 2:
                        _d = _j.sent(), totalBuyerFeeBasisPoints = _d.totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints = _d.totalSellerFeeBasisPoints;
                        _e = this._getBuyFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, sellOrder), makerRelayerFee = _e.makerRelayerFee, takerRelayerFee = _e.takerRelayerFee, makerProtocolFee = _e.makerProtocolFee, takerProtocolFee = _e.takerProtocolFee, makerReferrerFee = _e.makerReferrerFee, feeRecipient = _e.feeRecipient, feeMethod = _e.feeMethod;
                        _f = (0, schema_1.encodeBuy)(schema, wyAsset, accountAddress, this._wyvernProtocol, this._networkName), target = _f.target, calldata = _f.calldata, replacementPattern = _f.replacementPattern;
                        return [4 /*yield*/, this._getPriceParameters(types_1.OrderSide.Buy, paymentTokenAddress, expirationTime, startAmount)];
                    case 3:
                        _g = _j.sent(), basePrice = _g.basePrice, extra = _g.extra, paymentToken = _g.paymentToken;
                        times = this._getTimeParameters(expirationTime);
                        return [4 /*yield*/, this._getStaticCallTargetAndExtraData({ asset: openSeaAsset, useTxnOriginStaticCall: false })];
                    case 4:
                        _h = _j.sent(), staticTarget = _h.staticTarget, staticExtradata = _h.staticExtradata;
                        return [2 /*return*/, {
                                exchange: wyvernProtocol_1.WyvernProtocol.getExchangeContractAddress(this._networkName),
                                maker: accountAddress,
                                taker: taker,
                                quantity: quantityBN,
                                makerRelayerFee: makerRelayerFee,
                                takerRelayerFee: takerRelayerFee,
                                makerProtocolFee: makerProtocolFee,
                                takerProtocolFee: takerProtocolFee,
                                makerReferrerFee: makerReferrerFee,
                                waitingForBestCounterOrder: false,
                                feeMethod: feeMethod,
                                feeRecipient: feeRecipient,
                                side: types_1.OrderSide.Buy,
                                saleKind: types_1.SaleKind.FixedPrice,
                                target: target,
                                howToCall: types_1.HowToCall.Call,
                                calldata: calldata,
                                replacementPattern: replacementPattern,
                                staticTarget: staticTarget,
                                staticExtradata: staticExtradata,
                                paymentToken: paymentToken,
                                basePrice: basePrice,
                                extra: extra,
                                listingTime: times.listingTime,
                                expirationTime: times.expirationTime,
                                salt: wyvernProtocol_1.WyvernProtocol.generatePseudoRandomSalt(),
                                metadata: {
                                    asset: wyAsset,
                                    schema: schema.name,
                                    referrerAddress: referrerAddress
                                }
                            }];
                }
            });
        });
    };
    OpenSeaPort.prototype._makeSellOrder = function (_a) {
        var asset = _a.asset, quantity = _a.quantity, accountAddress = _a.accountAddress, startAmount = _a.startAmount, endAmount = _a.endAmount, listingTime = _a.listingTime, expirationTime = _a.expirationTime, waitForHighestBid = _a.waitForHighestBid, _b = _a.englishAuctionReservePrice, englishAuctionReservePrice = _b === void 0 ? 0 : _b, paymentTokenAddress = _a.paymentTokenAddress, extraBountyBasisPoints = _a.extraBountyBasisPoints, buyerAddress = _a.buyerAddress;
        return __awaiter(this, void 0, void 0, function () {
            var schema, quantityBN, wyAsset, isPrivate, openSeaAsset, _c, totalSellerFeeBasisPoints, totalBuyerFeeBasisPoints, sellerBountyBasisPoints, _d, target, calldata, replacementPattern, orderSaleKind, _e, basePrice, extra, paymentToken, reservePrice, times, _f, makerRelayerFee, takerRelayerFee, makerProtocolFee, takerProtocolFee, makerReferrerFee, feeRecipient, feeMethod, _g, staticTarget, staticExtradata;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        accountAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, accountAddress);
                        schema = this._getSchema(asset.schemaName);
                        quantityBN = wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(quantity), asset.decimals || 0);
                        wyAsset = (0, utils_1.getWyvernAsset)(schema, asset, quantityBN);
                        isPrivate = buyerAddress != constants_1.NULL_ADDRESS;
                        return [4 /*yield*/, this.api.getAsset(asset)];
                    case 1:
                        openSeaAsset = _h.sent();
                        return [4 /*yield*/, this.computeFees({ asset: openSeaAsset, side: types_1.OrderSide.Sell, isPrivate: isPrivate, extraBountyBasisPoints: extraBountyBasisPoints })];
                    case 2:
                        _c = _h.sent(), totalSellerFeeBasisPoints = _c.totalSellerFeeBasisPoints, totalBuyerFeeBasisPoints = _c.totalBuyerFeeBasisPoints, sellerBountyBasisPoints = _c.sellerBountyBasisPoints;
                        _d = (0, schema_1.encodeSell)(schema, wyAsset, accountAddress, this._wyvernProtocol, this._networkName), target = _d.target, calldata = _d.calldata, replacementPattern = _d.replacementPattern;
                        orderSaleKind = endAmount != null && endAmount !== startAmount
                            ? types_1.SaleKind.DutchAuction
                            : types_1.SaleKind.FixedPrice;
                        return [4 /*yield*/, this._getPriceParameters(types_1.OrderSide.Sell, paymentTokenAddress, expirationTime, startAmount, endAmount, waitForHighestBid, englishAuctionReservePrice)];
                    case 3:
                        _e = _h.sent(), basePrice = _e.basePrice, extra = _e.extra, paymentToken = _e.paymentToken, reservePrice = _e.reservePrice;
                        times = this._getTimeParameters(expirationTime, listingTime, waitForHighestBid);
                        _f = this._getSellFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, waitForHighestBid, sellerBountyBasisPoints), makerRelayerFee = _f.makerRelayerFee, takerRelayerFee = _f.takerRelayerFee, makerProtocolFee = _f.makerProtocolFee, takerProtocolFee = _f.takerProtocolFee, makerReferrerFee = _f.makerReferrerFee, feeRecipient = _f.feeRecipient, feeMethod = _f.feeMethod;
                        return [4 /*yield*/, this._getStaticCallTargetAndExtraData({ asset: openSeaAsset, useTxnOriginStaticCall: waitForHighestBid })];
                    case 4:
                        _g = _h.sent(), staticTarget = _g.staticTarget, staticExtradata = _g.staticExtradata;
                        return [2 /*return*/, {
                                exchange: wyvernProtocol_1.WyvernProtocol.getExchangeContractAddress(this._networkName),
                                maker: accountAddress,
                                taker: buyerAddress,
                                quantity: quantityBN,
                                makerRelayerFee: makerRelayerFee,
                                takerRelayerFee: takerRelayerFee,
                                makerProtocolFee: makerProtocolFee,
                                takerProtocolFee: takerProtocolFee,
                                makerReferrerFee: makerReferrerFee,
                                waitingForBestCounterOrder: waitForHighestBid,
                                englishAuctionReservePrice: reservePrice ? (0, utils_1.makeBigNumber)(reservePrice) : undefined,
                                feeMethod: feeMethod,
                                feeRecipient: feeRecipient,
                                side: types_1.OrderSide.Sell,
                                saleKind: orderSaleKind,
                                target: target,
                                howToCall: types_1.HowToCall.Call,
                                calldata: calldata,
                                replacementPattern: replacementPattern,
                                staticTarget: staticTarget,
                                staticExtradata: staticExtradata,
                                paymentToken: paymentToken,
                                basePrice: basePrice,
                                extra: extra,
                                listingTime: times.listingTime,
                                expirationTime: times.expirationTime,
                                salt: wyvernProtocol_1.WyvernProtocol.generatePseudoRandomSalt(),
                                metadata: {
                                    asset: wyAsset,
                                    schema: schema.name
                                }
                            }];
                }
            });
        });
    };
    OpenSeaPort.prototype._getStaticCallTargetAndExtraData = function (_a) {
        var asset = _a.asset, useTxnOriginStaticCall = _a.useTxnOriginStaticCall;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                // const isCheezeWizards = [
                //     CHEEZE_WIZARDS_GUILD_ADDRESS,
                //     CHEEZE_WIZARDS_GUILD_DEV_ADDRESS
                // ].includes(asset.tokenAddress)
                // const isDecentralandEstate = asset.tokenAddress== DECENTRALAND_ESTATE_ADDRESS
                // const isMainnet = this._networkName == Network.Main
                // if (isMainnet && !useTxnOriginStaticCall) {
                //     // While testing, we will use dummy values for mainnet. We will remove this if-statement once we have pushed the PR once and tested on Dev
                //     return {
                //         staticTarget: NULL_ADDRESS,
                //         staticExtradata: '',
                //     }
                // }
                // if (isCheezeWizards) {
                //     const cheezeWizardsBasicTournamentAddress = isMainnet ? CHEEZE_WIZARDS_BASIC_TOURNAMENT_ADDRESS : CHEEZE_WIZARDS_BASIC_TOURNAMENT_DEV_ADDRESS
                //     const cheezeWizardsBasicTournamentABI = this.apiPro.eth.contract(CheezeWizardsBasicTournament as any[])
                //     const cheezeWizardsBasicTournmentInstance = await cheezeWizardsBasicTournamentABI.at(cheezeWizardsBasicTournamentAddress)
                //     const wizardFingerprint = await rawCall(this.apiPro, {
                //         to: cheezeWizardsBasicTournmentInstance.address,
                //         data: cheezeWizardsBasicTournmentInstance.wizardFingerprint.getData(asset.tokenId)
                //     })
                //     return {
                //         staticTarget: isMainnet
                //             ? STATIC_CALL_CHEEZE_WIZARDS_ADDRESS
                //             : STATIC_CALL_CHEEZE_WIZARDS_DEV_ADDRESS,
                //         staticExtradata: encodeCall(
                //             getMethod(
                //                 StaticCheckCheezeWizards,
                //                 'succeedIfCurrentWizardFingerprintMatchesProvidedWizardFingerprint'),
                //             [asset.tokenId, wizardFingerprint, useTxnOriginStaticCall]),
                //     }
                // } else if (isDecentralandEstate && isMainnet) {
                //     // We stated that we will only use Decentraland estates static
                //     // calls on mainnet, since Decentraland uses Ropsten
                //     const decentralandEstateAddress = DECENTRALAND_ESTATE_ADDRESS
                //     const decentralandEstateABI = this.apiPro.eth.contract(DecentralandEstates as any[])
                //     const decentralandEstateInstance = await decentralandEstateABI.at(decentralandEstateAddress)
                //     const estateFingerprint = await rawCall(this.apiPro, {
                //         to: decentralandEstateInstance.address,
                //         data: decentralandEstateInstance.getFingerprint.getData(asset.tokenId)
                //     })
                //     return {
                //         staticTarget: STATIC_CALL_DECENTRALAND_ESTATES_ADDRESS,
                //         staticExtradata: encodeCall(
                //             getMethod(StaticCheckDecentralandEstates,
                //                 'succeedIfCurrentEstateFingerprintMatchesProvidedEstateFingerprint'),
                //             [asset.tokenId, estateFingerprint, useTxnOriginStaticCall]),
                //     }
                // } else if (useTxnOriginStaticCall) {
                //     return {
                //         staticTarget: isMainnet
                //             ? STATIC_CALL_TX_ORIGIN_ADDRESS
                //             : STATIC_CALL_TX_ORIGIN_DEV_ADDRESS,
                //         staticExtradata: encodeCall(
                //             getMethod(StaticCheckTxOrigin, 'succeedIfTxOriginMatchesHardcodedAddress'),
                //             []),
                //     }
                // } else {
                // Noop - no checks
                return [2 /*return*/, {
                        staticTarget: constants_1.NULL_ADDRESS,
                        staticExtradata: ''
                    }
                    // }
                ];
            });
        });
    };
    OpenSeaPort.prototype._makeBundleBuyOrder = function (_a) {
        var assets = _a.assets, collection = _a.collection, quantities = _a.quantities, accountAddress = _a.accountAddress, startAmount = _a.startAmount, _b = _a.expirationTime, expirationTime = _b === void 0 ? 0 : _b, paymentTokenAddress = _a.paymentTokenAddress, _c = _a.extraBountyBasisPoints, extraBountyBasisPoints = _c === void 0 ? 0 : _c, sellOrder = _a.sellOrder, referrerAddress = _a.referrerAddress;
        return __awaiter(this, void 0, void 0, function () {
            var quantityBNs, bundle, orderedSchemas, taker, asset, _d, _e, totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, _f, makerRelayerFee, takerRelayerFee, makerProtocolFee, takerProtocolFee, makerReferrerFee, feeRecipient, feeMethod, _g, calldata, replacementPattern, _h, basePrice, extra, paymentToken, times;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        accountAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, accountAddress);
                        quantityBNs = quantities.map(function (quantity, i) { return wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(quantity), assets[i].decimals || 0); });
                        bundle = (0, utils_1.getWyvernBundle)(assets, assets.map(function (a) { return _this._getSchema(a.schemaName); }), quantityBNs);
                        orderedSchemas = bundle.schemas.map(function (name) { return _this._getSchema(name); });
                        taker = sellOrder
                            ? sellOrder.maker
                            : constants_1.NULL_ADDRESS;
                        if (!collection) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.api.getAsset(assets[0])];
                    case 1:
                        _d = _j.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _d = undefined;
                        _j.label = 3;
                    case 3:
                        asset = _d;
                        return [4 /*yield*/, this.computeFees({ asset: asset, extraBountyBasisPoints: extraBountyBasisPoints, side: types_1.OrderSide.Buy })];
                    case 4:
                        _e = _j.sent(), totalBuyerFeeBasisPoints = _e.totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints = _e.totalSellerFeeBasisPoints;
                        _f = this._getBuyFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, sellOrder), makerRelayerFee = _f.makerRelayerFee, takerRelayerFee = _f.takerRelayerFee, makerProtocolFee = _f.makerProtocolFee, takerProtocolFee = _f.takerProtocolFee, makerReferrerFee = _f.makerReferrerFee, feeRecipient = _f.feeRecipient, feeMethod = _f.feeMethod;
                        _g = (0, schema_1.encodeAtomicizedBuy)(orderedSchemas, bundle.assets, accountAddress, this._wyvernProtocol, this._networkName), calldata = _g.calldata, replacementPattern = _g.replacementPattern;
                        return [4 /*yield*/, this._getPriceParameters(types_1.OrderSide.Buy, paymentTokenAddress, expirationTime, startAmount)];
                    case 5:
                        _h = _j.sent(), basePrice = _h.basePrice, extra = _h.extra, paymentToken = _h.paymentToken;
                        times = this._getTimeParameters(expirationTime);
                        return [2 /*return*/, {
                                exchange: wyvernProtocol_1.WyvernProtocol.getExchangeContractAddress(this._networkName),
                                maker: accountAddress,
                                taker: taker,
                                quantity: (0, utils_1.makeBigNumber)(1),
                                makerRelayerFee: makerRelayerFee,
                                takerRelayerFee: takerRelayerFee,
                                makerProtocolFee: makerProtocolFee,
                                takerProtocolFee: takerProtocolFee,
                                makerReferrerFee: makerReferrerFee,
                                waitingForBestCounterOrder: false,
                                feeMethod: feeMethod,
                                feeRecipient: feeRecipient,
                                side: types_1.OrderSide.Buy,
                                saleKind: types_1.SaleKind.FixedPrice,
                                target: wyvernProtocol_1.WyvernProtocol.getAtomicizerContractAddress(this._networkName),
                                howToCall: types_1.HowToCall.DelegateCall,
                                calldata: calldata,
                                replacementPattern: replacementPattern,
                                staticTarget: constants_1.NULL_ADDRESS,
                                staticExtradata: '',
                                paymentToken: paymentToken,
                                basePrice: basePrice,
                                extra: extra,
                                listingTime: times.listingTime,
                                expirationTime: times.expirationTime,
                                salt: wyvernProtocol_1.WyvernProtocol.generatePseudoRandomSalt(),
                                metadata: {
                                    bundle: bundle,
                                    referrerAddress: referrerAddress
                                }
                            }];
                }
            });
        });
    };
    OpenSeaPort.prototype._makeBundleSellOrder = function (_a) {
        var bundleName = _a.bundleName, bundleDescription = _a.bundleDescription, bundleExternalLink = _a.bundleExternalLink, assets = _a.assets, collection = _a.collection, quantities = _a.quantities, accountAddress = _a.accountAddress, startAmount = _a.startAmount, endAmount = _a.endAmount, listingTime = _a.listingTime, expirationTime = _a.expirationTime, waitForHighestBid = _a.waitForHighestBid, _b = _a.englishAuctionReservePrice, englishAuctionReservePrice = _b === void 0 ? 0 : _b, paymentTokenAddress = _a.paymentTokenAddress, extraBountyBasisPoints = _a.extraBountyBasisPoints, buyerAddress = _a.buyerAddress;
        return __awaiter(this, void 0, void 0, function () {
            var quantityBNs, bundle, orderedSchemas, isPrivate, asset, _c, _d, totalSellerFeeBasisPoints, totalBuyerFeeBasisPoints, sellerBountyBasisPoints, _e, calldata, replacementPattern, _f, basePrice, extra, paymentToken, reservePrice, times, orderSaleKind, _g, makerRelayerFee, takerRelayerFee, makerProtocolFee, takerProtocolFee, makerReferrerFee, feeRecipient;
            var _this = this;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        accountAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, accountAddress);
                        quantityBNs = quantities.map(function (quantity, i) { return wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(quantity), assets[i].decimals || 0); });
                        bundle = (0, utils_1.getWyvernBundle)(assets, assets.map(function (a) { return _this._getSchema(a.schemaName); }), quantityBNs);
                        orderedSchemas = bundle.schemas.map(function (name) { return _this._getSchema(name); });
                        bundle.name = bundleName;
                        bundle.description = bundleDescription;
                        bundle.external_link = bundleExternalLink;
                        isPrivate = buyerAddress != constants_1.NULL_ADDRESS;
                        if (!collection) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.api.getAsset(assets[0])];
                    case 1:
                        _c = _h.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = undefined;
                        _h.label = 3;
                    case 3:
                        asset = _c;
                        return [4 /*yield*/, this.computeFees({ asset: asset, side: types_1.OrderSide.Sell, isPrivate: isPrivate, extraBountyBasisPoints: extraBountyBasisPoints })];
                    case 4:
                        _d = _h.sent(), totalSellerFeeBasisPoints = _d.totalSellerFeeBasisPoints, totalBuyerFeeBasisPoints = _d.totalBuyerFeeBasisPoints, sellerBountyBasisPoints = _d.sellerBountyBasisPoints;
                        _e = (0, schema_1.encodeAtomicizedSell)(orderedSchemas, bundle.assets, accountAddress, this._wyvernProtocol, this._networkName), calldata = _e.calldata, replacementPattern = _e.replacementPattern;
                        return [4 /*yield*/, this._getPriceParameters(types_1.OrderSide.Sell, paymentTokenAddress, expirationTime, startAmount, endAmount, waitForHighestBid, englishAuctionReservePrice)];
                    case 5:
                        _f = _h.sent(), basePrice = _f.basePrice, extra = _f.extra, paymentToken = _f.paymentToken, reservePrice = _f.reservePrice;
                        times = this._getTimeParameters(expirationTime, listingTime, waitForHighestBid);
                        orderSaleKind = endAmount != null && endAmount !== startAmount
                            ? types_1.SaleKind.DutchAuction
                            : types_1.SaleKind.FixedPrice;
                        _g = this._getSellFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, waitForHighestBid, sellerBountyBasisPoints), makerRelayerFee = _g.makerRelayerFee, takerRelayerFee = _g.takerRelayerFee, makerProtocolFee = _g.makerProtocolFee, takerProtocolFee = _g.takerProtocolFee, makerReferrerFee = _g.makerReferrerFee, feeRecipient = _g.feeRecipient;
                        return [2 /*return*/, {
                                exchange: wyvernProtocol_1.WyvernProtocol.getExchangeContractAddress(this._networkName),
                                maker: accountAddress,
                                taker: buyerAddress,
                                quantity: (0, utils_1.makeBigNumber)(1),
                                makerRelayerFee: makerRelayerFee,
                                takerRelayerFee: takerRelayerFee,
                                makerProtocolFee: makerProtocolFee,
                                takerProtocolFee: takerProtocolFee,
                                makerReferrerFee: makerReferrerFee,
                                waitingForBestCounterOrder: waitForHighestBid,
                                englishAuctionReservePrice: reservePrice ? (0, utils_1.makeBigNumber)(reservePrice) : undefined,
                                feeMethod: types_1.FeeMethod.SplitFee,
                                feeRecipient: feeRecipient,
                                side: types_1.OrderSide.Sell,
                                saleKind: orderSaleKind,
                                target: wyvernProtocol_1.WyvernProtocol.getAtomicizerContractAddress(this._networkName),
                                howToCall: types_1.HowToCall.DelegateCall,
                                calldata: calldata,
                                replacementPattern: replacementPattern,
                                staticTarget: constants_1.NULL_ADDRESS,
                                staticExtradata: '',
                                paymentToken: paymentToken,
                                basePrice: basePrice,
                                extra: extra,
                                listingTime: times.listingTime,
                                expirationTime: times.expirationTime,
                                salt: wyvernProtocol_1.WyvernProtocol.generatePseudoRandomSalt(),
                                metadata: {
                                    bundle: bundle
                                }
                            }];
                }
            });
        });
    };
    OpenSeaPort.prototype._makeMatchingOrder = function (_a) {
        var _this = this;
        var order = _a.order, accountAddress = _a.accountAddress, recipientAddress = _a.recipientAddress;
        accountAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, accountAddress);
        recipientAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, recipientAddress);
        console.log(order.side, "========order.side=====recipientAddress=====", recipientAddress);
        var computeOrderParams = function () {
            if ('asset' in order.metadata) {
                var schema = _this._getSchema(order.metadata.schema);
                return order.side == types_1.OrderSide.Buy
                    ? (0, schema_1.encodeSell)(schema, order.metadata.asset, recipientAddress, _this._wyvernProtocol, _this._networkName)
                    : (0, schema_1.encodeBuy)(schema, order.metadata.asset, recipientAddress, _this._wyvernProtocol, _this._networkName);
            }
            else if ('bundle' in order.metadata) {
                // We're matching a bundle order
                var bundle = order.metadata.bundle;
                var orderedSchemas = bundle.schemas
                    ? bundle.schemas.map(function (schemaName) { return _this._getSchema(schemaName); })
                    // Backwards compat:
                    : bundle.assets.map(function () { return _this._getSchema('schema' in order.metadata
                        ? order.metadata.schema
                        : undefined); });
                var atomicized = order.side == types_1.OrderSide.Buy
                    ? (0, schema_1.encodeAtomicizedSell)(orderedSchemas, order.metadata.bundle.assets, recipientAddress, _this._wyvernProtocol, _this._networkName)
                    : (0, schema_1.encodeAtomicizedBuy)(orderedSchemas, order.metadata.bundle.assets, recipientAddress, _this._wyvernProtocol, _this._networkName);
                return {
                    target: wyvernProtocol_1.WyvernProtocol.getAtomicizerContractAddress(_this._networkName),
                    calldata: atomicized.calldata,
                    replacementPattern: atomicized.replacementPattern
                };
            }
            else {
                throw new Error('Invalid order metadata');
            }
        };
        console.log("=====_makeMatchingOrder========1=========");
        var _b = computeOrderParams(), target = _b.target, calldata = _b.calldata, replacementPattern = _b.replacementPattern;
        var times = this._getTimeParameters(0);
        // Compat for matching buy orders that have fee recipient still on them
        var feeRecipient = order.feeRecipient == constants_1.NULL_ADDRESS
            ? constants_1.OPENSEA_FEE_RECIPIENT
            : constants_1.NULL_ADDRESS;
        console.log("=====_makeMatchingOrder========1=========");
        var matchingOrder = {
            exchange: order.exchange,
            maker: accountAddress,
            taker: order.maker,
            quantity: order.quantity,
            makerRelayerFee: order.makerRelayerFee,
            takerRelayerFee: order.takerRelayerFee,
            makerProtocolFee: order.makerProtocolFee,
            takerProtocolFee: order.takerProtocolFee,
            makerReferrerFee: order.makerReferrerFee,
            waitingForBestCounterOrder: false,
            feeMethod: order.feeMethod,
            feeRecipient: feeRecipient,
            side: (order.side + 1) % 2,
            saleKind: types_1.SaleKind.FixedPrice,
            target: target,
            howToCall: order.howToCall,
            calldata: calldata,
            replacementPattern: replacementPattern,
            staticTarget: constants_1.NULL_ADDRESS,
            staticExtradata: '',
            paymentToken: order.paymentToken,
            basePrice: order.basePrice,
            extra: (0, utils_1.makeBigNumber)(0),
            listingTime: times.listingTime,
            expirationTime: times.expirationTime,
            salt: wyvernProtocol_1.WyvernProtocol.generatePseudoRandomSalt(),
            metadata: order.metadata
        };
        console.log("=====_makeMatchingOrder========1=====2====");
        return __assign(__assign({}, matchingOrder), { hash: (0, utils_1.getOrderHash)(matchingOrder) });
    };
    /**
     * Validate against Wyvern that a buy and sell order can match
     * @param param0 __namedParamters Object
     * @param buy The buy order to validate
     * @param sell The sell order to validate
     * @param accountAddress Address for the user's wallet
     * @param shouldValidateBuy Whether to validate the buy order individually.
     * @param shouldValidateSell Whether to validate the sell order individually.
     * @param retries How many times to retry if validation fails
     */
    OpenSeaPort.prototype._validateMatch = function (_a, retries) {
        var buy = _a.buy, sell = _a.sell, accountAddress = _a.accountAddress, _b = _a.shouldValidateBuy, shouldValidateBuy = _b === void 0 ? false : _b, _c = _a.shouldValidateSell, shouldValidateSell = _c === void 0 ? false : _c;
        if (retries === void 0) { retries = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var buyValid, sellValid, canMatch, calldataCanMatch, error_10;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 7, , 10]);
                        if (!shouldValidateBuy) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._validateOrder(buy)];
                    case 1:
                        buyValid = _d.sent();
                        this.logger("Buy order is valid: ".concat(buyValid));
                        if (!buyValid) {
                            throw new Error('Invalid buy order. It may have recently been removed . Please refresh the page and try again!');
                        }
                        _d.label = 2;
                    case 2:
                        if (!shouldValidateSell) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._validateOrder(sell)];
                    case 3:
                        sellValid = _d.sent();
                        this.logger("Sell order is valid: ".concat(sellValid));
                        if (!sellValid) {
                            throw new Error('Invalid sell order. It may have recently been removed. Please refresh the page and try again!');
                        }
                        _d.label = 4;
                    case 4: return [4 /*yield*/, (0, debugging_1.requireOrdersCanMatch)(this._getClientsForRead(retries).wyvernProtocol, { buy: buy, sell: sell, accountAddress: accountAddress })];
                    case 5:
                        canMatch = _d.sent();
                        this.logger("Orders matching: ".concat(canMatch));
                        return [4 /*yield*/, (0, debugging_1.requireOrderCalldataCanMatch)(this._getClientsForRead(retries).wyvernProtocol, { buy: buy, sell: sell })];
                    case 6:
                        calldataCanMatch = _d.sent();
                        this.logger("Order calldata matching: ".concat(calldataCanMatch));
                        return [2 /*return*/, true];
                    case 7:
                        error_10 = _d.sent();
                        if (retries <= 0) {
                            throw new Error("Error matching this listing: ".concat(error_10, ". Please contact the maker or try again later!"));
                        }
                        return [4 /*yield*/, (0, utils_1.delay)(500)];
                    case 8:
                        _d.sent();
                        return [4 /*yield*/, this._validateMatch({ buy: buy, sell: sell, accountAddress: accountAddress, shouldValidateBuy: shouldValidateBuy, shouldValidateSell: shouldValidateSell }, retries - 1)];
                    case 9: return [2 /*return*/, _d.sent()];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    // For creating email whitelists on order takers
    OpenSeaPort.prototype._createEmailWhitelistEntry = function (_a) {
        var order = _a.order, buyerEmail = _a.buyerEmail;
        return __awaiter(this, void 0, void 0, function () {
            var asset;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        asset = 'asset' in order.metadata
                            ? order.metadata.asset
                            : undefined;
                        if (!asset || !asset.id) {
                            throw new Error("Whitelisting only available for non-fungible assets.");
                        }
                        return [4 /*yield*/, this.api.postAssetWhitelist(asset.address, asset.id, buyerEmail)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Throws
    OpenSeaPort.prototype._sellOrderValidationAndApprovals = function (_a) {
        var order = _a.order, accountAddress = _a.accountAddress;
        return __awaiter(this, void 0, void 0, function () {
            var wyAssets, schemaNames, tokenAddress, minimumAmount, sellValid;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        wyAssets = 'bundle' in order.metadata
                            ? order.metadata.bundle.assets
                            : order.metadata.asset
                                ? [order.metadata.asset]
                                : [];
                        schemaNames = 'bundle' in order.metadata && 'schemas' in order.metadata.bundle
                            ? order.metadata.bundle.schemas
                            : 'schema' in order.metadata
                                ? [order.metadata.schema]
                                : [];
                        tokenAddress = order.paymentToken;
                        return [4 /*yield*/, this._approveAll({ schemaNames: schemaNames, wyAssets: wyAssets, accountAddress: accountAddress })
                            // For fulfilling bids,
                            // need to approve access to fungible token because of the way fees are paid
                            // This can be done at a higher level to show UI
                        ];
                    case 1:
                        _b.sent();
                        if (!(tokenAddress != constants_1.NULL_ADDRESS)) return [3 /*break*/, 3];
                        minimumAmount = (0, utils_1.makeBigNumber)(order.basePrice);
                        return [4 /*yield*/, this.approveFungibleToken({ accountAddress: accountAddress, tokenAddress: tokenAddress, minimumAmount: minimumAmount })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this._wyvernProtocolReadOnly.wyvernExchange.validateOrderParametersEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata)];
                    case 4:
                        sellValid = _b.sent();
                        if (!sellValid) {
                            console.error(order);
                            throw new Error("Failed to validate sell order parameters. Make sure you're on the right network!");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Instead of signing an off-chain order, you can approve an order
     * with on on-chain transaction using this method
     * @param order Order to approve
     * @returns Transaction hash of the approval transaction
     */
    OpenSeaPort.prototype._approveOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var accountAddress, includeInOrderBook, accountPair, transactionHash;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accountAddress = order.maker;
                        includeInOrderBook = true;
                        this._dispatch(types_1.EventType.ApproveOrder, { order: order, accountAddress: accountAddress });
                        accountPair = keyring.getPair(accountAddress);
                        transactionHash = this._wyvernProtocol.wyvernExchange.approveOrderEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee, order.takerRelayerFee, order.makerProtocolFee, order.takerProtocolFee, order.basePrice, order.extra, order.listingTime, order.expirationTime, order.salt], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata, includeInOrderBook).signAndSend(accountPair);
                        return [4 /*yield*/, this._confirmTransaction(transactionHash.toString(), types_1.EventType.ApproveOrder, "Approving order", function () { return __awaiter(_this, void 0, void 0, function () {
                                var isApproved;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this._validateOrder(order)];
                                        case 1:
                                            isApproved = _a.sent();
                                            return [2 /*return*/, isApproved];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, transactionHash];
                }
            });
        });
    };
    OpenSeaPort.prototype._validateOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var order_hash, fromPair, order_sig, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("=====order.maker=============", order.maker);
                        return [4 /*yield*/, this._wyvernProtocolReadOnly.wyvernExchange.hashToSignEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata)];
                    case 1:
                        order_hash = _a.sent();
                        fromPair = keyring.getPair(order.maker);
                        order_sig = fromPair.sign(order_hash);
                        return [4 /*yield*/, this._wyvernProtocolReadOnly.wyvernExchange.validateOrderEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata, order_sig)];
                    case 2:
                        isValid = _a.sent();
                        return [2 /*return*/, isValid];
                }
            });
        });
    };
    OpenSeaPort.prototype._approveAll = function (_a) {
        var schemaNames = _a.schemaNames, wyAssets = _a.wyAssets, accountAddress = _a.accountAddress, proxyAddress = _a.proxyAddress;
        return __awaiter(this, void 0, void 0, function () {
            var _b, contractsWithApproveAll, fromPair, nonces;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = proxyAddress;
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._getProxy(accountAddress)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        proxyAddress = _b || undefined;
                        if (!!proxyAddress) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._initializeProxy(accountAddress)];
                    case 3:
                        proxyAddress = _c.sent();
                        _c.label = 4;
                    case 4:
                        contractsWithApproveAll = new Set();
                        fromPair = keyring.getPair(accountAddress);
                        return [4 /*yield*/, this.apiPro.rpc.system.accountNextIndex(fromPair.address)];
                    case 5:
                        nonces = _c.sent();
                        return [2 /*return*/, Promise.all(wyAssets.map(function (wyAsset, i) { return __awaiter(_this, void 0, void 0, function () {
                                var schemaName, isOwner, error_11, minAmount, _a, wyNFTAsset, wyFTAsset, nonce;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            schemaName = schemaNames[i];
                                            _b.label = 1;
                                        case 1:
                                            _b.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, this._ownsAssetOnChain({
                                                    accountAddress: accountAddress,
                                                    proxyAddress: proxyAddress,
                                                    wyAsset: wyAsset,
                                                    schemaName: schemaName
                                                })];
                                        case 2:
                                            isOwner = _b.sent();
                                            return [3 /*break*/, 4];
                                        case 3:
                                            error_11 = _b.sent();
                                            // let it through for assets we don't support yet
                                            isOwner = true;
                                            return [3 /*break*/, 4];
                                        case 4:
                                            if (!isOwner) {
                                                minAmount = 'quantity' in wyAsset
                                                    ? wyAsset.quantity
                                                    : 1;
                                                console.error("Failed on-chain ownership check: ".concat(accountAddress, " on ").concat(schemaName, ":"), wyAsset);
                                                throw new Error("You don't own enough to do that (".concat(minAmount, " base units of ").concat(wyAsset.address).concat(wyAsset.id ? (" token " + wyAsset.id) : '', ")"));
                                            }
                                            _a = schemaName;
                                            switch (_a) {
                                                case types_1.WyvernSchemaName.ERC721: return [3 /*break*/, 5];
                                                case types_1.WyvernSchemaName.ERC1155: return [3 /*break*/, 5];
                                                case types_1.WyvernSchemaName.LegacyEnjin: return [3 /*break*/, 5];
                                                case types_1.WyvernSchemaName.ENSShortNameAuction: return [3 /*break*/, 5];
                                                case types_1.WyvernSchemaName.ERC20: return [3 /*break*/, 7];
                                            }
                                            return [3 /*break*/, 9];
                                        case 5:
                                            wyNFTAsset = wyAsset;
                                            return [4 /*yield*/, this.approveSemiOrNonFungibleToken({
                                                    tokenId: wyNFTAsset.id.toString(),
                                                    tokenAddress: wyNFTAsset.address,
                                                    accountAddress: accountAddress,
                                                    proxyAddress: proxyAddress,
                                                    schemaName: schemaName,
                                                    skipApproveAllIfTokenAddressIn: contractsWithApproveAll
                                                })];
                                        case 6: return [2 /*return*/, _b.sent()];
                                        case 7:
                                            wyFTAsset = wyAsset;
                                            if (contractsWithApproveAll.has(wyFTAsset.address)) {
                                                // Return null to indicate no tx occurred
                                                return [2 /*return*/, null];
                                            }
                                            contractsWithApproveAll.add(wyFTAsset.address);
                                            nonce = (Number(nonces.toString()) + Number(i)).toString();
                                            return [4 /*yield*/, this.approveFungibleToken({
                                                    tokenAddress: wyFTAsset.address,
                                                    accountAddress: accountAddress,
                                                    proxyAddress: proxyAddress,
                                                    nonce: nonce
                                                })
                                                // For other assets, including contracts:
                                                // Send them to the user's proxy
                                                // if (where != WyvernAssetLocation.Proxy) {
                                                //   return this.transferOne({
                                                //     schemaName: schema.name,
                                                //     asset: wyAsset,
                                                //     isWyvernAsset: true,
                                                //     fromAddress: accountAddress,
                                                //     toAddress: proxy
                                                //   })
                                                // }
                                                // return true
                                            ];
                                        case 8: return [2 /*return*/, _b.sent()
                                            // For other assets, including contracts:
                                            // Send them to the user's proxy
                                            // if (where != WyvernAssetLocation.Proxy) {
                                            //   return this.transferOne({
                                            //     schemaName: schema.name,
                                            //     asset: wyAsset,
                                            //     isWyvernAsset: true,
                                            //     fromAddress: accountAddress,
                                            //     toAddress: proxy
                                            //   })
                                            // }
                                            // return true
                                        ];
                                        case 9: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                }
            });
        });
    };
    // Throws
    OpenSeaPort.prototype._buyOrderValidationAndApprovals = function (_a) {
        var order = _a.order, counterOrder = _a.counterOrder, accountAddress = _a.accountAddress;
        return __awaiter(this, void 0, void 0, function () {
            var tokenAddress, balance, minimumAmount, buyValid;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        tokenAddress = order.paymentToken;
                        console.log(tokenAddress, "======================", constants_1.NULL_ADDRESS);
                        if (!(tokenAddress != constants_1.NULL_ADDRESS)) return [3 /*break*/, 5];
                        console.log(tokenAddress, "==============!!!========", constants_1.NULL_ADDRESS);
                        return [4 /*yield*/, this.getTokenBalance({ accountAddress: accountAddress, tokenAddress: tokenAddress })
                            /* NOTE: no buy-side auctions for now, so sell.saleKind === 0 */
                        ];
                    case 1:
                        balance = _b.sent();
                        minimumAmount = (0, utils_1.makeBigNumber)(order.basePrice);
                        if (!counterOrder) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._getRequiredAmountForTakingSellOrder(counterOrder)];
                    case 2:
                        minimumAmount = _b.sent();
                        _b.label = 3;
                    case 3:
                        // console.log(balance.toNumber() , minimumAmount.toNumber())
                        // CheckWDOT balance
                        if (balance.toNumber() < minimumAmount.toNumber()) {
                            if (tokenAddress == "WyvernSchemas.tokens[this._networkName].canonicalWrappedEther.address") {
                                throw new Error('Insufficient balance. You may need to wrap Ether.');
                            }
                            else {
                                throw new Error('Insufficient balance.');
                            }
                        }
                        // Check token approval
                        // This can be done at a higher level to show UI
                        return [4 /*yield*/, this.approveFungibleToken({ accountAddress: accountAddress, tokenAddress: tokenAddress, minimumAmount: minimumAmount })];
                    case 4:
                        // Check token approval
                        // This can be done at a higher level to show UI
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        console.log([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata);
                        return [4 /*yield*/, this._wyvernProtocolReadOnly.wyvernExchange.validateOrderParametersEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata)];
                    case 6:
                        buyValid = _b.sent();
                        if (!buyValid) {
                            console.error(order);
                            throw new Error("Failed to validate buy order parameters. Make sure you're on the right network!");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check if an account, or its proxy, owns an asset on-chain
     * @param accountAddress Account address for the wallet
     * @param proxyAddress Proxy address for the account
     * @param wyAsset asset to check. If fungible, the `quantity` attribute will be the minimum amount to own
     * @param schemaName WyvernSchemaName for the asset
     */
    OpenSeaPort.prototype._ownsAssetOnChain = function (_a) {
        var accountAddress = _a.accountAddress, proxyAddress = _a.proxyAddress, wyAsset = _a.wyAsset, schemaName = _a.schemaName;
        return __awaiter(this, void 0, void 0, function () {
            var asset, minAmount, accountBalance, _b, proxyBalance;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        asset = {
                            tokenId: wyAsset.id || null,
                            tokenAddress: wyAsset.address,
                            schemaName: schemaName
                        };
                        minAmount = new bignumber_js_1.BigNumber('quantity' in wyAsset
                            ? wyAsset.quantity
                            : 1);
                        return [4 /*yield*/, this.getAssetBalance({ accountAddress: accountAddress, asset: asset })];
                    case 1:
                        accountBalance = _c.sent();
                        if (accountBalance.isGreaterThanOrEqualTo(minAmount)) {
                            return [2 /*return*/, true];
                        }
                        _b = proxyAddress;
                        if (_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._getProxy(accountAddress)];
                    case 2:
                        _b = (_c.sent());
                        _c.label = 3;
                    case 3:
                        proxyAddress = _b;
                        if (!proxyAddress) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getAssetBalance({ accountAddress: proxyAddress, asset: asset })];
                    case 4:
                        proxyBalance = _c.sent();
                        if (proxyBalance.isGreaterThanOrEqualTo(minAmount)) {
                            return [2 /*return*/, true];
                        }
                        _c.label = 5;
                    case 5: return [2 /*return*/, false];
                }
            });
        });
    };
    OpenSeaPort.prototype._getBuyFeeParameters = function (totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, sellOrder) {
        this._validateFees(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints);
        var makerRelayerFee;
        var takerRelayerFee;
        if (sellOrder) {
            // Use the sell order's fees to ensure compatiblity and force the order
            // to only be acceptable by the sell order maker.
            // Swap maker/taker depending on whether it's an English auction (taker)
            // TODO add extraBountyBasisPoints when making bidder bounties
            makerRelayerFee = sellOrder.waitingForBestCounterOrder
                ? (0, utils_1.makeBigNumber)(sellOrder.makerRelayerFee)
                : (0, utils_1.makeBigNumber)(sellOrder.takerRelayerFee);
            takerRelayerFee = sellOrder.waitingForBestCounterOrder
                ? (0, utils_1.makeBigNumber)(sellOrder.takerRelayerFee)
                : (0, utils_1.makeBigNumber)(sellOrder.makerRelayerFee);
        }
        else {
            makerRelayerFee = (0, utils_1.makeBigNumber)(totalBuyerFeeBasisPoints);
            takerRelayerFee = (0, utils_1.makeBigNumber)(totalSellerFeeBasisPoints);
        }
        return {
            makerRelayerFee: makerRelayerFee,
            takerRelayerFee: takerRelayerFee,
            makerProtocolFee: (0, utils_1.makeBigNumber)(0),
            takerProtocolFee: (0, utils_1.makeBigNumber)(0),
            makerReferrerFee: (0, utils_1.makeBigNumber)(0),
            feeRecipient: constants_1.OPENSEA_FEE_RECIPIENT,
            feeMethod: types_1.FeeMethod.SplitFee
        };
    };
    OpenSeaPort.prototype._getSellFeeParameters = function (totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, waitForHighestBid, sellerBountyBasisPoints) {
        if (sellerBountyBasisPoints === void 0) { sellerBountyBasisPoints = 0; }
        this._validateFees(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints);
        // Use buyer as the maker when it's an English auction, so Wyvern sets prices correctly
        var feeRecipient = waitForHighestBid
            ? constants_1.NULL_ADDRESS
            : constants_1.OPENSEA_FEE_RECIPIENT;
        // Swap maker/taker fees when it's an English auction,
        // since these sell orders are takers not makers
        var makerRelayerFee = waitForHighestBid
            ? (0, utils_1.makeBigNumber)(totalBuyerFeeBasisPoints)
            : (0, utils_1.makeBigNumber)(totalSellerFeeBasisPoints);
        var takerRelayerFee = waitForHighestBid
            ? (0, utils_1.makeBigNumber)(totalSellerFeeBasisPoints)
            : (0, utils_1.makeBigNumber)(totalBuyerFeeBasisPoints);
        return {
            makerRelayerFee: makerRelayerFee,
            takerRelayerFee: takerRelayerFee,
            makerProtocolFee: (0, utils_1.makeBigNumber)(0),
            takerProtocolFee: (0, utils_1.makeBigNumber)(0),
            makerReferrerFee: (0, utils_1.makeBigNumber)(sellerBountyBasisPoints),
            feeRecipient: feeRecipient,
            feeMethod: types_1.FeeMethod.SplitFee
        };
    };
    /**
     * Validate fee parameters
     * @param totalBuyerFeeBasisPoints Total buyer fees
     * @param totalSellerFeeBasisPoints Total seller fees
     */
    OpenSeaPort.prototype._validateFees = function (totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints) {
        var maxFeePercent = constants_1.INVERSE_BASIS_POINT / 100;
        if (totalBuyerFeeBasisPoints > constants_1.INVERSE_BASIS_POINT
            || totalSellerFeeBasisPoints > constants_1.INVERSE_BASIS_POINT) {
            throw new Error("Invalid buyer/seller fees: must be less than ".concat(maxFeePercent, "%"));
        }
        if (totalBuyerFeeBasisPoints < 0
            || totalSellerFeeBasisPoints < 0) {
            throw new Error("Invalid buyer/seller fees: must be at least 0%");
        }
    };
    /**
     * Get the listing and expiration time paramters for a new order
     * @param expirationTimestamp Timestamp to expire the order (in seconds), or 0 for non-expiring
     * @param listingTimestamp Timestamp to start the order (in seconds), or undefined to start it now
     * @param waitingForBestCounterOrder Whether this order should be hidden until the best match is found
     */
    OpenSeaPort.prototype._getTimeParameters = function (expirationTimestamp, listingTimestamp, waitingForBestCounterOrder) {
        if (waitingForBestCounterOrder === void 0) { waitingForBestCounterOrder = false; }
        // Validation
        var minExpirationTimestamp = Math.round(Date.now() / 1000 + constants_1.MIN_EXPIRATION_SECONDS);
        var minListingTimestamp = Math.round(Date.now() / 1000);
        if (expirationTimestamp != 0 && expirationTimestamp < minExpirationTimestamp) {
            throw new Error("Expiration time must be at least ".concat(constants_1.MIN_EXPIRATION_SECONDS, " seconds from now, or zero (non-expiring)."));
        }
        if (listingTimestamp && listingTimestamp < minListingTimestamp) {
            throw new Error('Listing time cannot be in the past.');
        }
        if (listingTimestamp && expirationTimestamp != 0 && listingTimestamp >= expirationTimestamp) {
            throw new Error('Listing time must be before the expiration time.');
        }
        if (waitingForBestCounterOrder && expirationTimestamp == 0) {
            throw new Error('English auctions must have an expiration time.');
        }
        if (waitingForBestCounterOrder && listingTimestamp) {
            throw new Error("Cannot schedule an English auction for the future.");
        }
        if (parseInt(expirationTimestamp.toString()) != expirationTimestamp) {
            throw new Error("Expiration timestamp must be a whole number of seconds");
        }
        if (waitingForBestCounterOrder) {
            listingTimestamp = expirationTimestamp;
            // Expire one week from now, to ensure server can match it
            // Later, this will expire closer to the listingTime
            expirationTimestamp = expirationTimestamp + constants_1.ORDER_MATCHING_LATENCY_SECONDS;
        }
        else {
            // Small offset to account for latency
            listingTimestamp = listingTimestamp || Math.round(Date.now() / 1000 - 100);
        }
        return {
            listingTime: (0, utils_1.makeBigNumber)(listingTimestamp),
            expirationTime: (0, utils_1.makeBigNumber)(expirationTimestamp)
        };
    };
    /**
     * Compute the `basePrice` and `extra` parameters to be used to price an order.
     * Also validates the expiration time and auction type.
     * @param tokenAddress Address of the ERC-20 token to use for trading.
     * Use the null address for ETH
     * @param expirationTime When the auction expires, or 0 if never.
     * @param startAmount The base value for the order, in the token's main units (e.g. ETH instead of wei)
     * @param endAmount The end value for the order, in the token's main units (e.g. ETH instead of wei). If unspecified, the order's `extra` attribute will be 0
     */
    OpenSeaPort.prototype._getPriceParameters = function (orderSide, tokenAddress, expirationTime, startAmount, endAmount, waitingForBestCounterOrder, englishAuctionReservePrice) {
        if (waitingForBestCounterOrder === void 0) { waitingForBestCounterOrder = false; }
        return __awaiter(this, void 0, void 0, function () {
            var priceDiff, paymentToken, isToken, tokens, token, BN, basePrice, extra, reservePrice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        priceDiff = endAmount != null
                            ? startAmount - endAmount
                            : 0;
                        paymentToken = tokenAddress;
                        isToken = tokenAddress == constants_1.NULL_ADDRESS;
                        return [4 /*yield*/, this.api.getPaymentTokens({ address: paymentToken })];
                    case 1:
                        tokens = (_a.sent()).tokens;
                        token = tokens[0];
                        // Validation
                        if (isNaN(startAmount) || startAmount == null || startAmount < 0) {
                            throw new Error("Starting price must be a number >= 0");
                        }
                        if (!isToken && !token) {
                            throw new Error("No ERC-20 token found for '".concat(paymentToken, "'"));
                        }
                        if (isToken && waitingForBestCounterOrder) {
                            throw new Error("English auctions must use wrapped ETH or an ERC-20 token.");
                        }
                        if (isToken && orderSide === types_1.OrderSide.Buy) {
                            throw new Error("Offers must use wrapped ETH or an ERC-20 token.");
                        }
                        if (priceDiff < 0) {
                            throw new Error('End price must be less than or equal to the start price.');
                        }
                        if (priceDiff > 0 && expirationTime == 0) {
                            throw new Error('Expiration time must be set if order will change in price.');
                        }
                        if (englishAuctionReservePrice && !waitingForBestCounterOrder) {
                            throw new Error('Reserve prices may only be set on English auctions.');
                        }
                        if (englishAuctionReservePrice && (englishAuctionReservePrice < startAmount)) {
                            throw new Error('Reserve price must be greater than or equal to the start amount.');
                        }
                        BN = bignumber_js_1.BigNumber.clone({ DECIMAL_PLACES: token.decimals || 0 });
                        basePrice = isToken
                            ? new BN((0, utils_1.makeBigNumber)((0, utils_1.toWei)(startAmount, token.decimals)).toFixed())
                            : wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(startAmount), token.decimals);
                        extra = isToken
                            ? new BN((0, utils_1.makeBigNumber)((0, utils_1.toWei)(priceDiff, token.decimals)).toFixed())
                            : wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(priceDiff), token.decimals);
                        reservePrice = englishAuctionReservePrice
                            ? isToken
                                ? new BN((0, utils_1.makeBigNumber)((0, utils_1.toWei)(englishAuctionReservePrice, token.decimals)).toFixed())
                                : wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(englishAuctionReservePrice), token.decimals)
                            : undefined;
                        return [2 /*return*/, { basePrice: basePrice, extra: extra, paymentToken: paymentToken, reservePrice: reservePrice }];
                }
            });
        });
    };
    OpenSeaPort.prototype._getMetadata = function (order, referrerAddress) {
        var referrer = referrerAddress || order.metadata.referrerAddress;
        if (referrer && isValidAddress(referrer)) {
            return referrer;
        }
        return undefined;
    };
    OpenSeaPort.prototype._atomicMatch = function (_a) {
        var buy = _a.buy, sell = _a.sell, accountAddress = _a.accountAddress, _b = _a.metadata, metadata = _b === void 0 ? constants_1.NULL_BLOCK_HASH : _b;
        return __awaiter(this, void 0, void 0, function () {
            var shouldValidateBuy, shouldValidateSell, sell_hash, buy_hash, buyPair, buy_sig, sellPair, sell_sig, txHash, args, accPair, nonces, nonce, nonces_1, error_12;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        shouldValidateBuy = true;
                        shouldValidateSell = true;
                        if (!(sell.maker == accountAddress)) return [3 /*break*/, 2];
                        console.log("====_atomicMatch=======s=====");
                        // USER IS THE SELLER, only validate the buy order
                        return [4 /*yield*/, this._sellOrderValidationAndApprovals({ order: sell, accountAddress: accountAddress })];
                    case 1:
                        // USER IS THE SELLER, only validate the buy order
                        _c.sent();
                        shouldValidateSell = false;
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(buy.maker == accountAddress)) return [3 /*break*/, 4];
                        console.log("====_atomicMatch======b======");
                        // USER IS THE BUYER, only validate the sell order
                        return [4 /*yield*/, this._buyOrderValidationAndApprovals({ order: buy, counterOrder: sell, accountAddress: accountAddress })];
                    case 3:
                        // USER IS THE BUYER, only validate the sell order
                        _c.sent();
                        shouldValidateBuy = false;
                        // If using ETH to pay, set the value of the transaction to the current price
                        if (buy.paymentToken == constants_1.NULL_ADDRESS) {
                            // value = await this._getRequiredAmountForTakingSellOrder(sell)
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        // User is neither - matching service
                        console.log("====_atomicMatch============");
                        _c.label = 5;
                    case 5: return [4 /*yield*/, this._validateMatch({ buy: buy, sell: sell, accountAddress: accountAddress, shouldValidateBuy: shouldValidateBuy, shouldValidateSell: shouldValidateSell })];
                    case 6:
                        _c.sent();
                        this._dispatch(types_1.EventType.MatchOrders, { buy: buy, sell: sell, accountAddress: accountAddress, matchMetadata: metadata });
                        return [4 /*yield*/, this._wyvernProtocolReadOnly.wyvernExchange.hashToSignEx([sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken], [sell.makerRelayerFee.toNumber(), sell.takerRelayerFee.toNumber(), sell.makerProtocolFee.toNumber(), sell.takerProtocolFee.toNumber(), sell.basePrice.toNumber() / Number(1000000000), sell.extra.toNumber(), sell.listingTime.toNumber(), sell.expirationTime.toNumber(), sell.salt.toNumber()], sell.feeMethod, sell.side, sell.saleKind, sell.howToCall, sell.calldata, sell.replacementPattern, sell.staticExtradata)];
                    case 7:
                        sell_hash = _c.sent();
                        return [4 /*yield*/, this._wyvernProtocolReadOnly.wyvernExchange.hashToSignEx([buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken], [buy.makerRelayerFee.toNumber(), buy.takerRelayerFee.toNumber(), buy.makerProtocolFee.toNumber(), buy.takerProtocolFee.toNumber(), buy.basePrice.toNumber() / Number(1000000000), buy.extra.toNumber(), buy.listingTime.toNumber(), buy.expirationTime.toNumber(), buy.salt.toNumber()], buy.feeMethod, buy.side, buy.saleKind, buy.howToCall, buy.calldata, buy.replacementPattern, buy.staticExtradata)];
                    case 8:
                        buy_hash = _c.sent();
                        buyPair = keyring.getPair(buy.maker);
                        buy_sig = buyPair.sign(buy_hash);
                        sellPair = keyring.getPair(sell.maker);
                        sell_sig = sellPair.sign(sell_hash);
                        args = [
                            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken, sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
                            [buy.makerRelayerFee.toNumber(), buy.takerRelayerFee.toNumber(), buy.makerProtocolFee.toNumber(), buy.takerProtocolFee.toNumber(), buy.basePrice.toNumber() / Number(1000000000), buy.extra.toNumber(), buy.listingTime.toNumber(), buy.expirationTime.toNumber(), buy.salt.toNumber(), sell.makerRelayerFee.toNumber(), sell.takerRelayerFee.toNumber(), sell.makerProtocolFee.toNumber(), sell.takerProtocolFee.toNumber(), sell.basePrice.toNumber() / Number(1000000000), sell.extra.toNumber(), sell.listingTime.toNumber(), sell.expirationTime.toNumber(), sell.salt.toNumber()],
                            [buy.feeMethod, buy.side, buy.saleKind, buy.howToCall, sell.feeMethod, sell.side, sell.saleKind, sell.howToCall],
                            buy.calldata,
                            sell.calldata,
                            buy.replacementPattern,
                            sell.replacementPattern,
                            buy.staticExtradata,
                            sell.staticExtradata,
                            (0, util_1.u8aToHex)(buy_sig), (0, util_1.u8aToHex)(sell_sig),
                            '0x0000000000000000000000000000000000000000000000000000000000000000'
                        ] //WyvernAtomicMatchParameters
                        ;
                        _c.label = 9;
                    case 9:
                        _c.trys.push([9, 14, , 15]);
                        accPair = buyPair;
                        return [4 /*yield*/, this.apiPro.rpc.system.accountNextIndex(accPair.address)];
                    case 10:
                        nonces = _c.sent();
                        nonce = nonces.toString();
                        if (!shouldValidateSell) return [3 /*break*/, 12];
                        console.log('=================shouldValidateSell==============');
                        accPair = sellPair;
                        return [4 /*yield*/, this.apiPro.rpc.system.accountNextIndex(accPair.address)];
                    case 11:
                        nonces_1 = _c.sent();
                        nonce = (Number(nonces_1.toString()) + Number(4)).toString();
                        _c.label = 12;
                    case 12:
                        console.log(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], "========nonces=========", nonces.toString(), accPair.address);
                        return [4 /*yield*/, this._wyvernProtocol.wyvernExchange.atomicMatchEx(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11]).signAndSend(accPair, { nonce: nonce })];
                    case 13:
                        //    this.logger(`${console.trace()}`)
                        // txHash = submit(this.apiPro, this._wyvernProtocol.wyvernExchange.atomicMatchEx(args[0],
                        //     args[1], args[2], args[3], args[4], args[5],
                        //     args[6], args[7], args[8], args[9], args[10], args[11]), buyPair,nonces)
                        txHash = _c.sent();
                        return [3 /*break*/, 15];
                    case 14:
                        error_12 = _c.sent();
                        console.error(error_12);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/, txHash];
                }
            });
        });
    };
    OpenSeaPort.prototype._getRequiredAmountForTakingSellOrder = function (sell) {
        return __awaiter(this, void 0, void 0, function () {
            var currentPrice, estimatedPrice, maxPrice, feePercentage, fee;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentPrice(sell)];
                    case 1:
                        currentPrice = _a.sent();
                        estimatedPrice = (0, utils_1.estimateCurrentPrice)(sell);
                        maxPrice = bignumber_js_1.BigNumber.max(currentPrice, estimatedPrice);
                        // TODO Why is this not always a big number?
                        sell.takerRelayerFee = (0, utils_1.makeBigNumber)(sell.takerRelayerFee);
                        feePercentage = sell.takerRelayerFee.div(constants_1.INVERSE_BASIS_POINT);
                        fee = feePercentage.times(maxPrice);
                        return [2 /*return*/, fee.plus(maxPrice).integerValue(bignumber_js_1.BigNumber.ROUND_CEIL)];
                }
            });
        });
    };
    OpenSeaPort.prototype._authorizeOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var signerAddress, makerIsSmartContract, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        signerAddress = order.maker;
                        this._dispatch(types_1.EventType.CreateOrder, { order: order, accountAddress: order.maker });
                        return [4 /*yield*/, (0, utils_1.isContractAddress)(this.apiPro, signerAddress)];
                    case 1:
                        makerIsSmartContract = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        if (!makerIsSmartContract) return [3 /*break*/, 4];
                        // The apip provider is probably a smart contract wallet.
                        // Fallback to on-chain approval.
                        return [4 /*yield*/, this._approveOrder(order)];
                    case 3:
                        // The apip provider is probably a smart contract wallet.
                        // Fallback to on-chain approval.
                        _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/, null]; // await personalSignAsync(this.apiPro, message, signerAddress)
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_13 = _a.sent();
                        this._dispatch(types_1.EventType.OrderDenied, { order: order, accountAddress: signerAddress });
                        throw error_13;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    OpenSeaPort.prototype._getSchema = function (schemaName) {
        var schemaName_ = schemaName || types_1.WyvernSchemaName.ERC721;
        var schema = WyvernSchemas.schemas[this._networkName].filter(function (s) { return s.name == schemaName_; })[0];
        if (!schema) {
            throw new Error("Trading for this asset (".concat(schemaName_, ") is not yet supported. Please contact us or check back later!"));
        }
        return schema;
    };
    OpenSeaPort.prototype._dispatch = function (event, data) {
        //this._emitter.emit(event, data)
    };
    /**
     * Get the clients to use for a read call
     * @param retries current retry value
     */
    OpenSeaPort.prototype._getClientsForRead = function (retries) {
        if (retries === void 0) { retries = 1; }
        // if (retries > 0) {
        //     // Use injected provider by default
        //     return {
        //         'apiPro': this.apiPro,
        //         'wyvernProtocol': this._wyvernProtocol
        //     }
        // } else {
        // Use provided provider as fallback
        return {
            'apiPro': this.apiProReadOnly,
            'wyvernProtocol': this._wyvernProtocolReadOnly
        };
        // }
    };
    OpenSeaPort.prototype._confirmTransaction = function (transactionHash, event, description, testForSuccess) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionEventData, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transactionEventData = { transactionHash: transactionHash, event: event };
                        if (!(transactionHash == constants_1.NULL_BLOCK_HASH)) return [3 /*break*/, 4];
                        // This was a smart contract wallet that doesn't know the transaction
                        this._dispatch(types_1.EventType.TransactionCreated, { event: event });
                        if (!!testForSuccess) return [3 /*break*/, 2];
                        // Wait if test not implemented
                        //this.logger(`Unknown action, waiting 1 minute: ${description}`)
                        return [4 /*yield*/, (0, utils_1.delay)(60 * 1000)];
                    case 1:
                        // Wait if test not implemented
                        //this.logger(`Unknown action, waiting 1 minute: ${description}`)
                        _a.sent();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this._pollCallbackForConfirmation(event, description, testForSuccess)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        this._dispatch(types_1.EventType.TransactionCreated, transactionEventData);
                        return [4 /*yield*/, (0, utils_1.confirmTransaction)(this.apiPro, transactionHash)
                            //this.logger(`Transaction succeeded: ${description}`)
                        ];
                    case 5:
                        _a.sent();
                        //this.logger(`Transaction succeeded: ${description}`)
                        this._dispatch(types_1.EventType.TransactionConfirmed, transactionEventData);
                        return [3 /*break*/, 7];
                    case 6:
                        error_14 = _a.sent();
                        //this.logger(`Transaction failed: ${description}`)
                        // this._dispatch(EventType.TransactionFailed, {
                        //     ...transactionEventData, error
                        // })
                        throw error_14;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    OpenSeaPort.prototype._pollCallbackForConfirmation = function (event, description, testForSuccess) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var initialRetries, testResolve;
                        var _this = this;
                        return __generator(this, function (_a) {
                            initialRetries = 60;
                            testResolve = function (retries) { return __awaiter(_this, void 0, void 0, function () {
                                var wasSuccessful;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, testForSuccess()];
                                        case 1:
                                            wasSuccessful = _a.sent();
                                            if (wasSuccessful) {
                                                //this.logger(`Transaction succeeded: ${description}`)
                                                this._dispatch(types_1.EventType.TransactionConfirmed, { event: event });
                                                return [2 /*return*/, resolve()];
                                            }
                                            else if (retries <= 0) {
                                                return [2 /*return*/, reject()];
                                            }
                                            if (retries % 10 == 0) {
                                                //this.logger(`Tested transaction ${initialRetries - retries + 1} times: ${description}`)
                                            }
                                            return [4 /*yield*/, (0, utils_1.delay)(5000)];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/, testResolve(retries - 1)];
                                    }
                                });
                            }); };
                            return [2 /*return*/, testResolve(initialRetries)];
                        });
                    }); })];
            });
        });
    };
    return OpenSeaPort;
}());
exports.OpenSeaPort = OpenSeaPort;
