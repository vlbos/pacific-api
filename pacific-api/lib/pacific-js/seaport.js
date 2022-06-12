"use strict";
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
exports.OpenSeaPort = void 0;
const api_1 = require("@polkadot/api");
// import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util'
const util_1 = require("@polkadot/util");
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
const api_contract_1 = require("@polkadot/api-contract");
const testing_1 = require("@polkadot/keyring/testing");
const keyring = (0, testing_1.createTestKeyring)({ type: "sr25519" });
const bn_js_1 = __importDefault(require("bn.js"));
const definitions = __importStar(require("../interfaces/definitions"));
const create_1 = require("@polkadot/types/create");
const registry = new create_1.TypeRegistry();
// import types from './config/types.json'
// import rpcs from './config/rpcs.json'
// const rpc = { ...rpcs }
// import { makeOrderArrayEx, makeOrderEx, makeOrder, orderFromJSON } from '../orders/order'
const wyvernProtocol_1 = require("../wyvern-js/wyvernProtocol");
const WyvernSchemas = __importStar(require("../wyvern-schemas/index"));
// import { Schema } from 'wyvern-schemas/types'
const _ = __importStar(require("lodash"));
const api_2 = require("./api");
const contracts_1 = require("./contracts");
const types_1 = require("./types");
const utils_1 = require("./utils/utils");
const schema_1 = require("./utils/schema");
const debugging_1 = require("./debugging");
const bignumber_js_1 = require("bignumber.js");
// import { EventEmitter } from 'eventemitter3'
// import { isValidAddress } from 'ethereumjs-util'
function isValidAddress(address) { return true; }
const constants_1 = require("./constants");
// let buy: any = ""
class OpenSeaPort {
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
    constructor(provider, apiConfig = {}, logger) {
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
        this.logger = logger || ((arg) => arg);
        // (async function () { 
        // await this.apiProro()
        //  })
    }
    async init(provider) {
        const papi = await this.createApiAndTestAccounts(provider);
        const api = papi.api;
        await provider.connect();
        this.apiPro = api;
        this.apiProReadOnly = api;
        this._wyvernProtocol = new wyvernProtocol_1.WyvernProtocol(provider, api, {
            network: this._networkName,
            gasPrice: this.gasPrice,
        });
        // WyvernJS config for readonly (optimization for infura calls)
        this._wyvernProtocolReadOnly = new wyvernProtocol_1.WyvernProtocol(this.readonlyProvider, api, {
            network: this._networkName,
            gasPrice: this.gasPrice,
            rpc: "readOnly"
        });
        return { api };
    }
    async createApiAndTestAccounts(provider) {
        if (provider == undefined) {
            provider = new api_1.WsProvider('ws://127.0.0.1:9944/');
        }
        const rpcData = await provider.send('state_getMetadata', []);
        const genesisHash = registry.createType('Hash', await provider.send('chain_getBlockHash', [])).toHex();
        const specVersion = 0;
        const rawmetadata = {};
        const key = `${genesisHash}-${specVersion}`;
        rawmetadata[key] = rpcData;
        const types = Object.values(definitions).reduce((res, { types }) => (Object.assign(Object.assign({}, res), types)), {});
        const api = await api_1.ApiPromise.create({
            provider, rawmetadata, registry, types: Object.assign(Object.assign({}, types), { Keys: 'SessionKeys4' })
        });
        return { api };
    }
    async closeProvider() {
        await this.provider.disconnect();
    }
    async initParameters(self, accountAddress) {
        // console.log("=======0000========",keyring.getPair('0x0000000000000000000000000000000000000000000000000000000000000000'))
        const accountPair = keyring.getPair(accountAddress);
        const nonces = await this.apiPro.rpc.system.accountNextIndex(accountPair.address);
        let nonce = nonces.toString();
        await this.apiPro.tx.wyvernExchangeCore.changeOwner(accountAddress).signAndSend(accountPair, { nonce });
        nonce = (Number(nonces.toString()) + Number(1)).toString();
        await this.apiPro.tx.wyvernExchangeCore.setContractSelf(self).signAndSend(accountPair, { nonce });
        nonce = (Number(nonces.toString()) + Number(2)).toString();
        await this.apiPro.tx.wyvernExchangeCore.changeMinimumMakerProtocolFee(1).signAndSend(accountPair, { nonce });
        nonce = (Number(nonces.toString()) + Number(3)).toString();
        await this.apiPro.tx.wyvernExchangeCore.changeMinimumTakerProtocolFee(1).signAndSend(accountPair, { nonce });
    }
    async apipro() {
        // const papi = await init(this.provider);
        // this.accounts = papi.accounts;
        // // this.provider = papi.provider;
        // // buy = makeOrder(users.bob.key.address, true, 0);
        // // [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken] = this.accounts.slice(0, 7);
        // // // console.log(buy)
        // this._wyvernProtocol = papi.api.tx;
        // this._wyvernProtocolReadOnly = papi.api.rpc;
        // this.apiPro = papi.api.tx;
        // this.apiProReadOnly = papi.api.rpc;
        // this.apiPro = papi.api;
        // this.apiPro = await ApiPromise.create({ provider:this.provider })
        // this.apiProReadOnly = await ApiPromise.create({ provider: this.provider })
        // const provider = new WsProvider('ws://127.0.0.1:9944/');
        // const rpc = { ...rpcs };
        // extract all types from definitions - fast and dirty approach, flatted on 'types'
        // const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {});
        // const api = await ApiPromise.create({
        //     types: {
        //         ...types,
        //         // chain-specific overrides
        //         Keys: 'SessionKeys4'
        //     }
        // });
        // console.log(`OrderId bitLength:`, [
        //     api.createType("OrderId").toString(),
        //     api.registry.createType('OrderId').toString(),
        //     createType(api.registry, 'OrderId').toString()
        // ]);
        // this.api.apip = this.apiPro
    }
    /**
     * Add a listener to a marketplace event
     * @param event An event to listen for
     * @param listener A callback that will accept an object with event data
     * @param once Whether the listener should only be called once
     */
    addListener(event, listener, once = false) {
        // const subscription = once
        //     ? //this._emitter.once(event, listener)
        //     : //this._emitter.addListener(event, listener)
        // return subscription
    }
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
    removeAllListeners(event) {
        //this._emitter.removeAllListeners(event)
    }
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
    async createBundleBuyOrder({ assets, collection, quantities, accountAddress, startAmount, expirationTime = 0, paymentTokenAddress, sellOrder, referrerAddress }) {
        // Default to 1 of each asset
        quantities = quantities || assets.map(a => 1);
        paymentTokenAddress = paymentTokenAddress || ""; // WyvernSchemas.tokens[this._networkName].canonicalWrappedEther.address
        const order = await this._makeBundleBuyOrder({
            assets,
            collection,
            quantities,
            accountAddress,
            startAmount,
            expirationTime,
            paymentTokenAddress,
            extraBountyBasisPoints: 0,
            sellOrder,
            referrerAddress
        });
        // NOTE not in Wyvern exchange code:
        // frontend checks to make sure
        // token is approved and sufficiently available
        await this._buyOrderValidationAndApprovals({ order, accountAddress });
        const hashedOrder = Object.assign(Object.assign({}, order), { hash: (0, utils_1.getOrderHash)(order) });
        let signature;
        try {
            signature = await this._authorizeOrder(hashedOrder);
        }
        catch (error) {
            console.error(error);
            throw new Error("You declined to authorize your offer");
        }
        const orderWithSignature = Object.assign(Object.assign({}, hashedOrder), signature);
        return this.validateAndPostOrder(orderWithSignature);
    }
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
    async createBuyOrder({ asset, accountAddress, startAmount, quantity = 1, expirationTime = 0, paymentTokenAddress, sellOrder, referrerAddress }) {
        paymentTokenAddress = paymentTokenAddress || ""; // WyvernSchemas.tokens[this._networkName].canonicalWrappedEther.address
        const order = await this._makeBuyOrder({
            asset,
            quantity,
            accountAddress,
            startAmount,
            expirationTime,
            paymentTokenAddress,
            extraBountyBasisPoints: 0,
            sellOrder,
            referrerAddress
        });
        // NOTE not in Wyvern exchange code:
        // frontend checks to make sure
        // token is approved and sufficiently available
        await this._buyOrderValidationAndApprovals({ order, accountAddress });
        const hashedOrder = Object.assign(Object.assign({}, order), { hash: (0, utils_1.getOrderHash)(order) });
        let signature;
        try {
            signature = await this._authorizeOrder(hashedOrder);
        }
        catch (error) {
            console.error(error);
            throw new Error("You declined to authorize your offer");
        }
        const orderWithSignature = Object.assign(Object.assign({}, hashedOrder), signature);
        return this.validateAndPostOrder(orderWithSignature);
    }
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
    async createSellOrder({ asset, accountAddress, startAmount, endAmount, quantity = 1, listingTime, expirationTime = 0, waitForHighestBid = false, englishAuctionReservePrice, paymentTokenAddress, extraBountyBasisPoints = 0, buyerAddress, buyerEmail }) {
        const order = await this._makeSellOrder({
            asset,
            quantity,
            accountAddress,
            startAmount,
            endAmount,
            listingTime,
            expirationTime,
            waitForHighestBid,
            englishAuctionReservePrice,
            paymentTokenAddress: paymentTokenAddress || constants_1.NULL_ADDRESS,
            extraBountyBasisPoints,
            buyerAddress: buyerAddress || constants_1.NULL_ADDRESS
        });
        await this._sellOrderValidationAndApprovals({ order, accountAddress });
        if (buyerEmail) {
            await this._createEmailWhitelistEntry({ order, buyerEmail });
        }
        const hashedOrder = Object.assign(Object.assign({}, order), { hash: (0, utils_1.getOrderHash)(order) });
        let signature;
        try {
            signature = await this._authorizeOrder(hashedOrder);
        }
        catch (error) {
            console.error(error);
            throw new Error("You declined to authorize your auction");
        }
        const orderWithSignature = Object.assign(Object.assign({}, hashedOrder), signature);
        return this.validateAndPostOrder(orderWithSignature);
    }
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
    async createFactorySellOrders({ assets, accountAddress, startAmount, endAmount, quantity = 1, listingTime, expirationTime = 0, waitForHighestBid = false, paymentTokenAddress, extraBountyBasisPoints = 0, buyerAddress, buyerEmail, numberOfOrders = 1 }) {
        if (numberOfOrders < 1) {
            throw new Error('Need to make at least one sell order');
        }
        if (!assets || !assets.length) {
            throw new Error('Need at least one asset to create orders for');
        }
        if (_.uniqBy(assets, a => a.tokenAddress).length !== 1) {
            throw new Error('All assets must be on the same factory contract address');
        }
        // Validate just a single dummy order but don't post it
        const dummyOrder = await this._makeSellOrder({
            asset: assets[0],
            quantity,
            accountAddress,
            startAmount,
            endAmount,
            listingTime,
            expirationTime,
            waitForHighestBid,
            paymentTokenAddress: paymentTokenAddress || constants_1.NULL_ADDRESS,
            extraBountyBasisPoints,
            buyerAddress: buyerAddress || constants_1.NULL_ADDRESS
        });
        await this._sellOrderValidationAndApprovals({ order: dummyOrder, accountAddress });
        const _makeAndPostOneSellOrder = async (asset) => {
            const order = await this._makeSellOrder({
                asset,
                quantity,
                accountAddress,
                startAmount,
                endAmount,
                listingTime,
                expirationTime,
                waitForHighestBid,
                paymentTokenAddress: paymentTokenAddress || constants_1.NULL_ADDRESS,
                extraBountyBasisPoints,
                buyerAddress: buyerAddress || constants_1.NULL_ADDRESS
            });
            if (buyerEmail) {
                await this._createEmailWhitelistEntry({ order, buyerEmail });
            }
            const hashedOrder = Object.assign(Object.assign({}, order), { hash: (0, utils_1.getOrderHash)(order) });
            let signature;
            try {
                signature = await this._authorizeOrder(hashedOrder);
            }
            catch (error) {
                console.error(error);
                throw new Error("You declined to authorize your auction, or your apip provider can't sign using personal_sign. Try 'apip-provider-engine' and make sure a mnemonic is set. Just a reminder: there's no gas needed anymore to mint tokens!");
            }
            const orderWithSignature = Object.assign(Object.assign({}, hashedOrder), signature);
            return this.validateAndPostOrder(orderWithSignature);
        };
        const range = _.range(numberOfOrders * assets.length);
        const batches = _.chunk(range, constants_1.SELL_ORDER_BATCH_SIZE);
        let numOrdersCreated = 0;
        for (const subRange of batches) {
            // subRange = e.g. [5, 6, 7, 8, 9]
            // batches of assets = e.g. [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, ... 10]
            // Will block until all SELL_ORDER_BATCH_SIZE orders
            // have come back in parallel
            const batchOrdersCreated = await Promise.all(subRange.map(async (assetOrderIndex) => {
                const assetIndex = Math.floor(assetOrderIndex / numberOfOrders);
                return _makeAndPostOneSellOrder(assets[assetIndex]);
            }));
            this.logger(`Created and posted a batch of ${batchOrdersCreated.length} orders in parallel.`);
            numOrdersCreated += batchOrdersCreated.length;
            // Don't overwhelm router
            await (0, utils_1.delay)(500);
        }
        return numOrdersCreated;
    }
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
    async createBundleSellOrder({ bundleName, bundleDescription, bundleExternalLink, assets, collection, quantities, accountAddress, startAmount, endAmount, expirationTime = 0, listingTime, waitForHighestBid = false, englishAuctionReservePrice, paymentTokenAddress, extraBountyBasisPoints = 0, buyerAddress }) {
        // Default to one of each asset
        quantities = quantities || assets.map(a => 1);
        const order = await this._makeBundleSellOrder({
            bundleName,
            bundleDescription,
            bundleExternalLink,
            assets,
            collection,
            quantities,
            accountAddress,
            startAmount,
            endAmount,
            listingTime,
            expirationTime,
            waitForHighestBid,
            englishAuctionReservePrice,
            paymentTokenAddress: paymentTokenAddress || constants_1.NULL_ADDRESS,
            extraBountyBasisPoints,
            buyerAddress: buyerAddress || constants_1.NULL_ADDRESS,
        });
        await this._sellOrderValidationAndApprovals({ order, accountAddress });
        const hashedOrder = Object.assign(Object.assign({}, order), { hash: (0, utils_1.getOrderHash)(order) });
        let signature;
        try {
            signature = await this._authorizeOrder(hashedOrder);
        }
        catch (error) {
            console.error(error);
            throw new Error("You declined to authorize your auction");
        }
        const orderWithSignature = Object.assign(Object.assign({}, hashedOrder), signature);
        return this.validateAndPostOrder(orderWithSignature);
    }
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
    async fulfillOrder({ order, accountAddress, recipientAddress, referrerAddress }) {
        console.log("====fulfillOrder==d=====");
        const matchingOrder = this._makeMatchingOrder({
            order,
            accountAddress,
            recipientAddress: recipientAddress || accountAddress
        });
        // console.log("===fulfillOrder===d==1==matchingOrder=", matchingOrder)
        let { buy, sell } = (0, utils_1.assignOrdersToSides)(order, matchingOrder);
        const metadata = this._getMetadata(order, referrerAddress);
        const transactionHash = await this._atomicMatch({ buy, sell, accountAddress, metadata });
        console.log("===fulfillOrder===d===2==");
        await this._confirmTransaction(transactionHash, types_1.EventType.MatchOrders, "Fulfilling order", async () => {
            const isOpen = await this._validateOrder(order);
            return !isOpen;
        });
        return transactionHash;
    }
    /**
     * Cancel an order on-chain, preventing it from ever being fulfilled.
     * @param param0 __namedParameters Object
     * @param order The order to cancel
     * @param accountAddress The order maker's wallet address
     */
    async cancelOrder({ order, accountAddress }) {
        this._dispatch(types_1.EventType.CancelOrder, { order, accountAddress });
        const accountPair = keyring.getPair(accountAddress);
        // const gasPrice = await this._computeGasPrice()
        const transactionHash = this._wyvernProtocol.wyvernExchange.cancelOrderEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata, order.v).signAndSend(accountPair);
        await this._confirmTransaction(transactionHash.toString(), types_1.EventType.CancelOrder, "Cancelling order", async () => {
            const isOpen = await this._validateOrder(order);
            return !isOpen;
        });
    }
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
    async approveSemiOrNonFungibleToken({ tokenId, tokenAddress, accountAddress, proxyAddress, tokenAbi = contracts_1.ERC721, skipApproveAllIfTokenAddressIn = new Set(), schemaName = types_1.WyvernSchemaName.ERC721 }) {
        console.log("===============approveSemiOrNonFungibleToken==================");
        const schema = this._getSchema(schemaName);
        // const tokenContract = this.apiPro.eth.contract(tokenAbi as any[])
        // const contract = await tokenContract.at(tokenAddress)  
        if (!proxyAddress) {
            proxyAddress = await this._getProxy(accountAddress) || undefined;
            if (!proxyAddress) {
                throw new Error('Uninitialized account');
            }
        }
        const accountPair = keyring.getPair(accountAddress);
        const abi = new api_contract_1.Abi(tokenAbi, this.apiPro.registry.getChainProperties());
        const contract = new api_contract_1.ContractPromise(this.apiPro, abi, tokenAddress);
        const approvalAllCheck = async () => {
            // NOTE:
            // Use this long way of calling so we can check for method existence on a bool-returning method.
            // const isApprovedForAllRaw = await rawCall(this.apiProReadOnly, {
            //     from: accountAddress,
            //     to: contract.address,
            //     data: contract.isApprovedForAll.getData(accountAddress, proxyAddress)
            // })
            const { output } = await contract.query.isApprovedForAll(accountAddress, { value: 0, gasLimit: -1 }, accountAddress, proxyAddress);
            console.log(output != null ? output.toString() : "", "===========output===========", output, output != null ? output.toString() == "false" : 0);
            return output != null ? output.toString() == "true" : output;
        };
        const isApprovedForAll = await approvalAllCheck();
        if (isApprovedForAll) {
            // Supports ApproveAll
            this.logger('Already approved proxy for all tokens');
            return null;
        }
        if (!isApprovedForAll) {
            // Supports ApproveAll
            //  not approved for all yet
            if (skipApproveAllIfTokenAddressIn.has(tokenAddress)) {
                this.logger('Already approving proxy for all tokens in another transaction');
                return null;
            }
            skipApproveAllIfTokenAddressIn.add(tokenAddress);
            try {
                this._dispatch(types_1.EventType.ApproveAllAssets, {
                    accountAddress,
                    proxyAddress,
                    contractAddress: tokenAddress
                });
                // const gasPrice = await this._computeGasPrice()
                // const txHash = await sendRawTransaction(this.apiPro, {
                //     from: accountAddress,
                //     to: contract.address,
                //     data: contract.setApprovalForAll.getData(proxyAddress, true),
                //     gasPrice
                // }, error => {
                //     this._dispatch(EventType.TransactionDenied, { error, accountAddress })
                // })
                let txHash = "";
                {
                    let { gasConsumed } = await contract.query.setApprovalForAll(accountAddress, { value: 0, gasLimit: -1 }, proxyAddress, true);
                    let result = await contract.tx.setApprovalForAll({ value: 0, gasLimit: gasConsumed.toString() }, proxyAddress, true).signAndSend(accountPair);
                    txHash = result.toString();
                }
                // await this._confirmTransaction(txHash, EventType.ApproveAllAssets, 'Approving all tokens of this type for trading', async () => {
                //     const result = await approvalAllCheck()
                //     return result == 1
                // })
                return txHash;
            }
            catch (error) {
                console.error(error);
                throw new Error("Couldn't get permission to approve these tokens for trading. Their contract might not be implemented correctly. Please contact the developer!");
            }
        }
        // Does not support ApproveAll (ERC721 v1 or v2)
        this.logger('Contract does not support Approve All');
        const approvalOneCheck = async () => {
            // Note: approvedAddr will be '' if not supported
            // let approvedAddr = await promisifyCall<string>(c => contract.getApproved.call(tokenId, c))
            let { result, output } = await contract.query.getApproved(accountAddress, { value: 0, gasLimit: -1 }, tokenId);
            console.log(output === null || output === void 0 ? void 0 : output.toString(), "======result==========", result.toString());
            let approvedAddr = output != null && output.toString() != '' ? output.toString() : "null";
            if (approvedAddr == proxyAddress) {
                this.logger('Already approved proxy for this token');
                return true;
            }
            this.logger(`Approve response: ${approvedAddr}`);
            // SPECIAL CASING non-compliant contracts
            console.log(approvedAddr, "======approvedAddr==========", tokenId, accountAddress);
            if (!approvedAddr) {
                let approvedAddru = await (0, utils_1.getNonCompliantApprovalAddress)(contract, tokenId, accountAddress);
                console.log(approvedAddru, "======approvedAddru==========", tokenId, accountAddress);
                if (approvedAddru != undefined) {
                    approvedAddr = approvedAddru;
                }
                if (approvedAddr == proxyAddress) {
                    this.logger('Already approved proxy for this item');
                    return true;
                }
                this.logger(`Special-case approve response: ${approvedAddr}`);
            }
            return false;
        };
        const isApprovedForOne = await approvalOneCheck();
        if (isApprovedForOne) {
            return null;
        }
        // Call `approve`
        try {
            this._dispatch(types_1.EventType.ApproveAsset, {
                accountAddress,
                proxyAddress,
                asset: (0, utils_1.getWyvernAsset)(schema, { tokenId, tokenAddress })
            });
            // const gasPrice = await this._computeGasPrice()
            // const txHash = await sendRawTransaction(this.apiPro, {
            //     from: accountAddress,
            //     to: contract.address,
            //     data: contract.approve.getData(proxyAddress, tokenId),
            //     gasPrice
            // }, error => {
            //     this._dispatch(EventType.TransactionDenied, { error, accountAddress })
            // })
            let { gasConsumed } = await contract.query.approve(accountAddress, { value: 0, gasLimit: -1 }, proxyAddress, tokenId);
            console.log("=======approve=======gasConsumed==========", gasConsumed.toString());
            let result = await contract.tx.approve({ value: 0, gasLimit: gasConsumed.toString() }, proxyAddress, tokenId).signAndSend(accountPair);
            console.log(accountPair.address, proxyAddress, tokenId, "=======approve=======result==========", result.toString());
            if (!result) {
                const error = new Error(result);
                this._dispatch(types_1.EventType.TransactionDenied, { error, accountAddress });
            }
            const txHash = result.toString();
            await this._confirmTransaction(txHash, types_1.EventType.ApproveAsset, "Approving single token for trading", approvalOneCheck);
            return txHash;
        }
        catch (error) {
            console.error(error);
            throw new Error("Couldn't get permission to approve this token for trading. Its contract might not be implemented correctly. Please contact the developer!");
        }
    }
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
    async approveFungibleToken({ accountAddress, tokenAddress, proxyAddress, nonce, minimumAmount = new bignumber_js_1.BigNumber(Number.MAX_VALUE / 1000000000) }) {
        proxyAddress = proxyAddress || wyvernProtocol_1.WyvernProtocol.getTokenTransferProxyAddress(this._networkName);
        let approvedAmount = await this._getApprovedTokenCount({
            accountAddress,
            tokenAddress,
            proxyAddress
        });
        if (approvedAmount.isGreaterThanOrEqualTo(minimumAmount)) {
            this.logger('Already approved enough currency for trading');
            return null;
        }
        this.logger(`Not enough token approved for trade: ${approvedAmount} approved to transfer ${tokenAddress}`);
        this._dispatch(types_1.EventType.ApproveCurrency, {
            accountAddress,
            contractAddress: tokenAddress,
            proxyAddress
        });
        const hasOldApproveMethod = [constants_1.ENJIN_COIN_ADDRESS, constants_1.MANA_ADDRESS].includes(tokenAddress);
        if (minimumAmount.isGreaterThan(0) && hasOldApproveMethod) {
            // Older erc20s require initial approval to be 0
            // await this.unapproveFungibleToken({ accountAddress, tokenAddress, proxyAddress })
        }
        let txHash;
        let gas;
        const erc20abi = new api_contract_1.Abi(contracts_1.ERC20, this.apiPro.registry.getChainProperties());
        const contract = new api_contract_1.ContractPromise(this.apiPro, erc20abi, tokenAddress);
        const fromPair = keyring.getPair(accountAddress);
        {
            let { gasConsumed, result, output } = await contract.query.approve(accountAddress, { value: 0, gasLimit: -1 }, proxyAddress, wyvernProtocol_1.WyvernProtocol.MAX_UINT_256.toString());
            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());
            gas = new bn_js_1.default(gasConsumed.toString());
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
        }
        {
            if (nonce == undefined) {
                const nonces = await this.apiPro.rpc.system.accountNextIndex(fromPair.address);
                nonce = nonces.toString(); //(Number(nonces.toString()) + Number(1)).toString();
            }
            console.log(accountAddress, proxyAddress, '===approve fromPair.address=nonce===', nonce, fromPair.address);
            let result = await contract.tx.approve({ value: 0, gasLimit: gas }, proxyAddress, wyvernProtocol_1.WyvernProtocol.MAX_UINT_256.toString()).signAndSend(fromPair, { nonce });
            // The actual result from RPC as `ContractExecResult`
            // console.log(result);
            txHash = result.toString();
        }
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
        await this._confirmTransaction(txHash, types_1.EventType.ApproveCurrency, "Approving currency for trading", async () => {
            const newlyApprovedAmount = await this._getApprovedTokenCount({
                accountAddress,
                tokenAddress,
                proxyAddress
            });
            return newlyApprovedAmount.isGreaterThanOrEqualTo(minimumAmount);
        });
        return txHash;
    }
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
    async getCurrentPrice(order) {
        console.log([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata);
        const currentPrice = await this._wyvernProtocolReadOnly.wyvernExchange.calculateCurrentPriceEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata);
        return currentPrice;
    }
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
    async isOrderFulfillable({ order, accountAddress, recipientAddress, referrerAddress }) {
        const matchingOrder = this._makeMatchingOrder({
            order,
            accountAddress,
            recipientAddress: recipientAddress || accountAddress
        });
        const { buy, sell } = (0, utils_1.assignOrdersToSides)(order, matchingOrder);
        const metadata = this._getMetadata(order, referrerAddress);
        const gas = await this._estimateGasForMatch({ buy, sell, accountAddress, metadata });
        this.logger(`Gas estimate for ${order.side == types_1.OrderSide.Sell ? "sell" : "buy"} order: ${gas}`);
        return gas != null && gas > 0;
    }
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
    async isAssetTransferrable({ asset, fromAddress, toAddress, quantity, useProxy = false }, retries = 1) {
        const schema = this._getSchema(asset.schemaName);
        const quantityBN = quantity
            ? wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(quantity), asset.decimals || 0)
            : (0, utils_1.makeBigNumber)(1);
        const wyAsset = (0, utils_1.getWyvernAsset)(schema, asset, quantityBN);
        if (schema.functions == undefined) {
            return false;
        }
        const abi = schema.functions.transfer(wyAsset);
        let from = fromAddress;
        if (useProxy) {
            const proxyAddress = await this._getProxy(fromAddress);
            if (!proxyAddress) {
                console.error(`This asset's owner (${fromAddress}) does not have a proxy!`);
                return false;
            }
            from = proxyAddress;
        }
        try {
            let gas;
            {
                // Perform the actual read (no params at the end, for the `get` message)
                // (We perform the send from an account, here using Alice's address)
                const erc20abi = new api_contract_1.Abi(contracts_1.ERC20, this.apiPro.registry.getChainProperties());
                const contract = new api_contract_1.ContractPromise(this.apiPro, erc20abi, abi.target);
                // const address = "5GeW32zNDAPvUzRPKhpNjHR2e6ZvcsHdvFzJy6XcffQEbJbu";
                let { gasConsumed, result, output } = await contract.query.transfer(fromAddress, { value: 0, gasLimit: -1 }, toAddress, quantity);
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
            }
            // const gas = await estimateGas(this._getClientsForRead(retries).apip, {
            // //     from,
            // //     to: abi.target,
            // //     data
            // // })
            return gas > new bignumber_js_1.BigNumber(0);
        }
        catch (error) {
            if (retries <= 0) {
                console.error(error);
                console.error(from, abi.target);
                return false;
            }
            await (0, utils_1.delay)(500);
            return await this.isAssetTransferrable({ asset, fromAddress, toAddress, quantity, useProxy }, retries - 1);
        }
    }
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
    async transfer({ fromAddress, toAddress, asset, quantity = 1 }) {
        const schema = this._getSchema(asset.schemaName);
        const quantityBN = wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(quantity), asset.decimals || 0);
        const wyAsset = (0, utils_1.getWyvernAsset)(schema, asset, quantityBN);
        const isCryptoKitties = [constants_1.CK_ADDRESS, constants_1.CK_DEV_ADDRESS].includes(wyAsset.address);
        // Since CK is common, infer isOldNFT from it in case user
        // didn't pass in `version`
        const isOldNFT = isCryptoKitties || !!asset.version && [
            types_1.TokenStandardVersion.ERC721v1, types_1.TokenStandardVersion.ERC721v2
        ].includes(asset.version);
        if (schema.functions == undefined) {
            return "";
        }
        const abi = asset.schemaName === types_1.WyvernSchemaName.ERC20
            ? (0, utils_1.annotateERC20TransferABI)(wyAsset)
            : isOldNFT
                ? (0, utils_1.annotateERC721TransferABI)(wyAsset)
                : schema.functions.transfer(wyAsset);
        this._dispatch(types_1.EventType.TransferOne, { accountAddress: fromAddress, toAddress, asset: wyAsset });
        // const gasPrice = await this._computeGasPrice()
        // const data = encodeTransferCall(abi, fromAddress, toAddress)
        // const txHash = await sendRawTransaction(this.apiPro, {
        //     from: fromAddress,
        //     to: abi.target,
        //     data,
        //     gasPrice
        // }, error => {
        //     this._dispatch(EventType.TransactionDenied, { error, accountAddress: fromAddress })
        // })
        const inputValues = abi.inputs.filter(x => x.value !== undefined).map(x => x.value);
        const erc20abi = new api_contract_1.Abi(contracts_1.ERC20, this.apiPro.registry.getChainProperties());
        const contract = new api_contract_1.ContractPromise(this.apiPro, erc20abi, abi.target);
        const fromPair = keyring.getPair(fromAddress);
        let txHash;
        let gas;
        {
            let { gasConsumed, result, output } = await contract.query.transfer(fromAddress, { value: 0, gasLimit: -1 }, toAddress, ...inputValues);
            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());
            gas = new bn_js_1.default(gasConsumed.toString());
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
        }
        {
            let result = await contract.tx.transfer({ value: 0, gasLimit: gas }, toAddress, ...inputValues).signAndSend(fromPair);
            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());
            txHash = result.toString();
        }
        await this._confirmTransaction(txHash, types_1.EventType.TransferOne, `Transferring asset`);
        return txHash;
        // return ""
    }
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
    async transferAll({ assets, fromAddress, toAddress, schemaName = types_1.WyvernSchemaName.ERC721 }) {
        toAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, toAddress);
        // const schemaNames = assets.map(asset => asset.schemaName || schemaName)
        const wyAssets = assets.map(asset => (0, utils_1.getWyvernAsset)(this._getSchema(asset.schemaName), asset));
        // const { calldata, target } = encodeAtomicizedTransfer(
        // schemaNames.map(name => this._getSchema(name)), wyAssets, fromAddress, toAddress, this._wyvernProtocol, this._networkName)
        // const schemas = schemaNames.map(name => this._getSchema(name));
        const selectors = ["0x0b396f18", "0x0b396f18"];
        const transactions = wyAssets.map((asset, i) => {
            console.log(asset.address, "======asset.address========", fromAddress, toAddress);
            return {
                tx: asset.address,
                value: 7,
            };
        });
        const target = wyvernProtocol_1.WyvernProtocol.getAtomicizerContractAddress(this._networkName);
        console.log(this._networkName, "=====_networkName======", target);
        const atomicizedCalldata = [selectors[0], transactions.map((t) => t.tx), fromAddress, toAddress, transactions.map((t) => t.value)
        ];
        let txHash = "";
        const fromPair = keyring.getPair(fromAddress);
        console.log("===================ddddd=====================", ...atomicizedCalldata);
        // for (let tx of txes) {
        //     let result = await tx.signAndSend(fromPair);
        //     txHash = result.toString();
        // }
        let proxyAddress = await this._getProxy(fromAddress);
        if (!proxyAddress) {
            proxyAddress = await this._initializeProxy(fromAddress);
        }
        console.log("===================proxyAddress===s==================", proxyAddress);
        // await this._approveAll({ schemaNames, wyAssets, accountAddress: fromAddress, proxyAddress })
        this._dispatch(types_1.EventType.TransferAll, { accountAddress: fromAddress, toAddress, assets: wyAssets });
        let gas;
        // const erc20abi = new Abi(msigmetadata, this.apiPro.registry.getChainProperties());
        // const contract = new ContractPromise(this.apiPro, erc20abi, target);
        {
            let { gasConsumed, result, output } = await this._wyvernProtocol.wyvernAtomicizer.query.atomicTransaction(fromAddress, { value: 0, gasLimit: -1 }, ...atomicizedCalldata);
            console.log(result.toHuman());
            gas = new bn_js_1.default(gasConsumed.toString());
            console.log(gasConsumed.toHuman());
            if (result.isOk) {
                console.log(fromAddress, 'transfer Success', output);
            }
            else {
                console.error('balanceOf Error', result.asErr);
            }
        }
        {
            let result = await this._wyvernProtocol.wyvernAtomicizer.tx.atomicTransaction({ value: 0, gasLimit: gas }, ...atomicizedCalldata).signAndSend(fromPair);
            console.log(result.toHuman());
            txHash = result.toString();
        }
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
        return txHash;
    }
    async encodeTransferAll({ assets, fromAddress, toAddress, schemaName = types_1.WyvernSchemaName.ERC721 }) {
        toAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, toAddress);
        const wyAssets = assets.map(asset => (0, utils_1.getWyvernAsset)(this._getSchema(asset.schemaName), asset));
        const fromPair = keyring.getPair(fromAddress);
        console.log(fromPair.publicKey);
        const toPair = keyring.getPair(toAddress);
        console.log(toPair.publicKey);
        const selectors = ["0x0b396f18", "0x0b396f18"];
        const transactions = wyAssets.map((asset, i) => {
            console.log(asset.address, "======asset.address========", fromAddress, toAddress);
            return {
                tx: asset.address,
                value: 7,
            };
        });
        const target = wyvernProtocol_1.WyvernProtocol.getAtomicizerContractAddress(this._networkName);
        console.log(this._networkName, "=====_networkName======", target);
        const atomicizedCalldata = [selectors[0], transactions.map((t) => t.tx), fromAddress, toAddress, transactions.map((t) => t.value)
        ];
        // const erc20abi = new Abi(msigmetadata, this.apiPro.registry.getChainProperties());
        // const contract = new ContractPromise(this.apiPro, erc20abi, target);
        console.log(...atomicizedCalldata);
        return this._wyvernProtocol.wyvernAtomicizer.tx.atomicTransaction({ value: 0, gasLimit: -1 }, ...atomicizedCalldata).toHex();
    }
    /**
     * Get an account's balance of any Asset.
     * @param param0 __namedParameters Object
     * @param accountAddress Account address to check
     * @param asset The Asset to check balance for
     * @param retries How many times to retry if balance is 0
     */
    ///NEEDED
    async getAssetBalance({ accountAddress, asset }, retries = 1) {
        const schema = this._getSchema(asset.schemaName);
        const wyAsset = (0, utils_1.getWyvernAsset)(schema, asset);
        console.log(wyAsset.address, asset.schemaName, schema.functions);
        if (schema.functions != undefined && schema.functions.countOf) {
            // ERC20 or ERC1155 (non-Enjin)
            const abi = schema.functions.countOf(wyAsset);
            console.log(abi.target, asset.schemaName, schema.functions);
            // const inputValues = abi.inputs.filter(x => x.value !== undefined).map(x => x.value)
            //   const contract = this._getClientsForRead(retries).apip.contract([abi as ApiPromise.FunctionAbi]).at(abi.target)
            //   const count = await promisifyCall<BigNumber>(c => contract[abi.name].call(accountAddress, ...inputValues, c))
            let count = 0;
            {
                // Perform the actual read (no params at the end, for the `get` message)
                // (We perform the send from an account, here using Alice's address)
                const erc20abi = new api_contract_1.Abi(contracts_1.ERC20, this.apiPro.registry.getChainProperties());
                const contract = new api_contract_1.ContractPromise(this.apiPro, erc20abi, abi.target);
                // const address = "5GeW32zNDAPvUzRPKhpNjHR2e6ZvcsHdvFzJy6XcffQEbJbu";
                let { gasConsumed, result, output } = await contract.query.balanceOf(accountAddress, { value: 0, gasLimit: -1 }, accountAddress);
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
            }
            if (count !== undefined) {
                return new bignumber_js_1.BigNumber(count);
            }
        }
        else if (schema.functions != undefined && schema.functions.ownerOf) {
            // ERC721 asset
            const abi = schema.functions.ownerOf(wyAsset);
            // const contract = this._getClientsForRead(retries).apip.eth.contract([abi as ApiPromise.FunctionAbi]).at(abi.target)
            if (abi.inputs.filter(x => x.value === undefined)[0]) {
                throw new Error("Missing an argument for finding the owner of this asset");
            }
            const inputValues = abi.inputs.map(i => i.value.toString());
            // const owner = await promisifyCall<string>(c => contract[abi.name].call(...inputValues, c))
            let owner;
            {
                // Perform the actual read (no params at the end, for the `get` message)
                // (We perform the send from an account, here using Alice's address)
                const erc721abi = new api_contract_1.Abi(contracts_1.ERC721, this.apiPro.registry.getChainProperties());
                const contract = new api_contract_1.ContractPromise(this.apiPro, erc721abi, abi.target);
                // const address = "5FkmJ5zuMvqSGau2AGrwyz2ensv4ge6VHP2d8KenFpUXEEkJ";
                console.log(abi.target, "inputValues=================", ...inputValues);
                // const id = 1;
                let { gasConsumed, result, output } = await contract.query.ownerOf(accountAddress, { value: 0, gasLimit: -1 }, ...inputValues);
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
            }
            if (owner) {
                return owner == accountAddress
                    ? new bignumber_js_1.BigNumber(1)
                    : new bignumber_js_1.BigNumber(0);
            }
        }
        else {
            // Missing ownership call - skip check to allow listings
            // by default
            throw new Error('Missing ownership schema for this asset type');
        }
        if (retries <= 0) {
            throw new Error('Unable to get current owner from smart contract');
        }
        else {
            await (0, utils_1.delay)(500);
            // Recursively check owner again
            return await this.getAssetBalance({ accountAddress, asset }, retries - 1);
        }
    }
    /**
     * Get the balance of a fungible token.
     * Convenience method for getAssetBalance for fungibles
     * @param param0 __namedParameters Object
     * @param accountAddress Account address to check
     * @param tokenAddress The address of the token to check balance for
     * @param schemaName Optional schema name for the fungible token
     * @param retries Number of times to retry if balance is undefined
     */
    async getTokenBalance({ accountAddress, tokenAddress, schemaName = types_1.WyvernSchemaName.ERC20 }, retries = 1) {
        const asset = {
            tokenId: null,
            tokenAddress,
            schemaName
        };
        return this.getAssetBalance({ accountAddress, asset }, retries);
    }
    /**
     * Compute the fees for an order
     * @param param0 __namedParameters
     * @param asset Asset to use for fees. May be blank ONLY for multi-collection bundles.
     * @param side The side of the order (buy or sell)
     * @param accountAddress The account to check fees for (useful if fees differ by account, like transfer fees)
     * @param isPrivate Whether the order is private or not (known taker)
     * @param extraBountyBasisPoints The basis points to add for the bounty. Will throw if it exceeds the assets' contract's OpenSea fee.
     */
    async computeFees({ asset, side, accountAddress, isPrivate = false, extraBountyBasisPoints = 0 }) {
        let openseaBuyerFeeBasisPoints = constants_1.DEFAULT_BUYER_FEE_BASIS_POINTS;
        let openseaSellerFeeBasisPoints = constants_1.DEFAULT_SELLER_FEE_BASIS_POINTS;
        let devBuyerFeeBasisPoints = 0;
        let devSellerFeeBasisPoints = 0;
        let transferFee = (0, utils_1.makeBigNumber)(0);
        let transferFeeTokenAddress = null;
        let maxTotalBountyBPS = constants_1.DEFAULT_MAX_BOUNTY;
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
        // Compute bounty
        let sellerBountyBasisPoints = side == types_1.OrderSide.Sell
            ? extraBountyBasisPoints
            : 0;
        // Check that bounty is in range of the opensea fee
        const bountyTooLarge = sellerBountyBasisPoints + constants_1.OPENSEA_SELLER_BOUNTY_BASIS_POINTS > maxTotalBountyBPS;
        if (sellerBountyBasisPoints > 0 && bountyTooLarge) {
            let errorMessage = `Total bounty exceeds the maximum for this asset type (${maxTotalBountyBPS / 100}%).`;
            if (maxTotalBountyBPS >= constants_1.OPENSEA_SELLER_BOUNTY_BASIS_POINTS) {
                errorMessage += ` Remember that OpenSea will add ${constants_1.OPENSEA_SELLER_BOUNTY_BASIS_POINTS / 100}% for referrers with OpenSea accounts!`;
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
        return {
            totalBuyerFeeBasisPoints: openseaBuyerFeeBasisPoints + devBuyerFeeBasisPoints,
            totalSellerFeeBasisPoints: openseaSellerFeeBasisPoints + devSellerFeeBasisPoints,
            openseaBuyerFeeBasisPoints,
            openseaSellerFeeBasisPoints,
            devBuyerFeeBasisPoints,
            devSellerFeeBasisPoints,
            sellerBountyBasisPoints,
            transferFee,
            transferFeeTokenAddress,
        };
    }
    /**
     * Validate and post an order to the OpenSea orderbook.
     * @param order The order to post. Can either be signed by the maker or pre-approved on the Wyvern contract using approveOrder. See https://github.com/ProjectWyvern/wyvern-ethereum/blob/master/contracts/exchange/Exchange.sol#L178
     * @returns The order as stored by the orderbook
     */
    async validateAndPostOrder(order) {
        const hash = await this._wyvernProtocolReadOnly.wyvernExchange.hashOrderEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata);
        if (hash !== order.hash) {
            console.error(order);
            throw new Error(`Order couldn't be validated by the exchange due to a hash mismatch. Make sure your wallet is on the right network!`);
        }
        //this.logger('Order hashes match')
        // Validation is called server-side
        const confirmedOrder = await this.api.postOrder((0, utils_1.orderToJSON)(order));
        return confirmedOrder;
    }
    /**
     * Compute the gas price for sending a txn, in wei
     * Will be slightly above the mean to make it faster
     */
    async _computeGasPrice() {
        // const meanGas = await getCurrentGasPrice(this.apiPro)
        // const weiToAdd = this.apiPro.toWei(this.gasPriceAddition, 'gwei')
        // return meanGas.plus(weiToAdd)
        return new bignumber_js_1.BigNumber(0);
    }
    /**
     * Compute the gas amount for sending a txn
     * Will be slightly above the result of estimateGas to make it more reliable
     * @param estimation The result of estimateGas for a transaction
     */
    _correctGasAmount(estimation) {
        return Math.ceil(estimation * this.gasIncreaseFactor);
    }
    /**
     * Estimate the gas needed to match two orders. Returns undefined if tx errors
     * @param param0 __namedParamaters Object
     * @param buy The buy order to match
     * @param sell The sell order to match
     * @param accountAddress The taker's wallet address
     * @param metadata Metadata bytes32 to send with the match
     * @param retries Number of times to retry if false
     */
    async _estimateGasForMatch({ buy, sell, accountAddress, metadata = constants_1.NULL_BLOCK_HASH }, retries = 1) {
        // let value
        // if (buy.maker== accountAddress&& buy.paymentToken == NULL_ADDRESS) {
        //     value = await this._getRequiredAmountForTakingSellOrder(sell)
        // }
        // // estimate the fees as RuntimeDispatchInfo, using the signer (either
        // // address or locked/unlocked keypair) (When overrides are applied, e.g
        // //  nonce, the format would be `paymentInfo(sender, { nonce })`)
        // const info = await api.tx.balances
        //   .transfer(recipient, 123)
        //   .paymentInfo(sender);
        // // log relevant info, partialFee is Balance, estimated for current
        // console.log(`
        //   class=${info.class.toString()},
        //   weight=${info.weight.toString()},
        //   partialFee=${info.partialFee.toHuman()}
        // `);
        let accountPair = keyring.getPair(buy.maker);
        const sell_hash = await this._wyvernProtocolReadOnly.wyvernExchange.hashToSignEx([sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken], [sell.makerRelayerFee.toNumber(), sell.takerRelayerFee.toNumber(), sell.makerProtocolFee.toNumber(), sell.takerProtocolFee.toNumber(), sell.basePrice.toNumber() / Number(1000000000), sell.extra.toNumber(), sell.listingTime.toNumber(), sell.expirationTime.toNumber(), sell.salt.toNumber()], sell.feeMethod, sell.side, sell.saleKind, sell.howToCall, sell.calldata, sell.replacementPattern, sell.staticExtradata);
        const buy_hash = await this._wyvernProtocolReadOnly.wyvernExchange.hashToSignEx([buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken], [buy.makerRelayerFee.toNumber(), buy.takerRelayerFee.toNumber(), buy.makerProtocolFee.toNumber(), buy.takerProtocolFee.toNumber(), buy.basePrice.toNumber() / Number(1000000000), buy.extra.toNumber(), buy.listingTime.toNumber(), buy.expirationTime.toNumber(), buy.salt.toNumber()], buy.feeMethod, buy.side, buy.saleKind, buy.howToCall, buy.calldata, buy.replacementPattern, buy.staticExtradata);
        // let buy_sig = users.betty.key.sign(buy_hash, { withType: true });
        // let sell_sig = users.betty.key.sign(sell_hash, { withType: true });
        const buyPair = keyring.getPair(buy.maker);
        const buy_sig = buyPair.sign(buy_hash);
        const sellPair = keyring.getPair(sell.maker);
        const sell_sig = sellPair.sign(sell_hash);
        const args = [
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
        try {
            const info = await this._getClientsForRead(retries).wyvernProtocol.wyvernExchange.atomicMatchEx(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11]).paymentInfo(accountPair);
            const partialFee = Number(`${info.partialFee.toHuman()}`);
            return partialFee;
        }
        catch (error) {
            if (retries <= 0) {
                console.error(error);
                return undefined;
            }
            await (0, utils_1.delay)(200);
            return await this._estimateGasForMatch({ buy, sell, accountAddress, metadata }, retries - 1);
        }
    }
    /**
     * Estimate the gas needed to transfer assets in bulk
     * Used for tests
     * @param param0 __namedParamaters Object
     * @param assets An array of objects with the tokenId and tokenAddress of each of the assets to transfer.
     * @param fromAddress The owner's wallet address
     * @param toAddress The recipient's wallet address
     * @param schemaName The Wyvern schema name corresponding to the asset type, if not in each asset
     */
    async _estimateGasForTransfer({ assets, fromAddress, toAddress, schemaName = types_1.WyvernSchemaName.ERC721 }) {
        const schemaNames = assets.map(asset => asset.schemaName || schemaName);
        const wyAssets = assets.map(asset => (0, utils_1.getWyvernAsset)(this._getSchema(asset.schemaName), asset));
        const proxyAddress = await this._getProxy(fromAddress);
        if (!proxyAddress) {
            throw new Error('Uninitialized proxy address');
        }
        await this._approveAll({ schemaNames, wyAssets, accountAddress: fromAddress, proxyAddress });
        // const { calldata, target } = encodeAtomicizedTransfer(schemaNames.map(name => this._getSchema(name)), wyAssets, fromAddress, toAddress, this._wyvernProtocol, this._networkName)
        // return estimateGas(this.apiPro, {
        //   from: fromAddress,
        //   to: proxyAddress,
        //   data: encodeProxyCall(target, HowToCall.DelegateCall, calldata)
        // })
        return 0;
    }
    /**
     * Get the proxy address for a user's wallet.
     * Internal method exposed for dev flexibility.
     * @param accountAddress The user's wallet address
     * @param retries Optional number of retries to do
     */
    async _getProxy(accountAddress, retries = 0) {
        // console.log(this.apiPro.query)
        let proxyAddress = this._wyvernProtocol.wyvernProxyRegistry.query.getProxy(accountAddress, {}); // = await this.apiPro.query.proxy.proxies(accountAddress)  ///TODO  pallet-proxy
        if (proxyAddress == '') {
            throw new Error("Couldn't retrieve your account from the blockchain - make sure you're on the correct Ethereum network!");
        }
        if (!proxyAddress || proxyAddress == constants_1.NULL_ADDRESS) {
            if (retries > 0) {
                await (0, utils_1.delay)(1000);
                return await this._getProxy(accountAddress, retries - 1);
            }
            proxyAddress = null;
        }
        return proxyAddress;
    }
    /**
     * Initialize the proxy for a user's wallet.
     * Proxies are used to make trades on behalf of the order's maker so that
     *  trades can happen when the maker isn't online.
     * Internal method exposed for dev flexibility.
     * @param accountAddress The user's wallet address
     */
    async _initializeProxy(accountAddress) {
        this._dispatch(types_1.EventType.InitializeAccount, { accountAddress });
        this.logger(`Initializing proxy for account: ${accountAddress}`);
        // const gasPrice = await this._computeGasPrice()
        // const txnData: any = { from: accountAddress }
        // const gasEstimate = await this._wyvernProtocolReadOnly.wyvernProxyRegistry.registerProxy.estimateGasAsync(txnData)
        // const transactionHash = await this._wyvernProtocol.wyvernProxyRegistry.registerProxy.sendTransactionAsync({
        //     ...txnData,
        //     gasPrice,
        //     gas: this._correctGasAmount(gasEstimate)
        // })mn 
        let gas;
        // let txHash = "";
        const fromAddress = accountAddress;
        const fromPair = keyring.getPair(fromAddress);
        const registryAddress = wyvernProtocol_1.WyvernProtocol.getOwnableDelegateProxyAddress(this._networkName);
        // const erc20abi = new Abi(msigmetadata, this.apiPro.registry.getChainProperties());
        // const contract = new ContractPromise(this.apiPro, erc20abi, target);
        {
            let { gasConsumed, result, output } = await this._wyvernProtocol.wyvernProxyRegistry.query.registerProxy(fromAddress, { value: 0, gasLimit: -1 }, registryAddress);
            console.log(result.toHuman());
            gas = new bn_js_1.default(gasConsumed.toString());
            console.log(gasConsumed.toHuman());
            if (result.isOk) {
                console.log(fromAddress, 'transfer Success', output);
            }
            else {
                console.error('balanceOf Error', result.asErr);
            }
        }
        {
            let result = await this._wyvernProtocol.wyvernProxyRegistry.tx.registerProxy({ value: 0, gasLimit: gas }, registryAddress).signAndSend(fromPair);
            console.log(result.toHuman());
            // txHash = result.toString();
        }
        // await this._confirmTransaction(transactionHash, EventType.InitializeAccount, "Initializing proxy for account", async () => {
        //     const polledProxy = await this._getProxy(accountAddress)
        //     return !!polledProxy
        // })
        const proxyAddress = await this._getProxy(accountAddress, 2);
        if (!proxyAddress) {
            throw new Error('Failed to initialize your account :( Please restart your wallet/browser and try again!');
        }
        return proxyAddress;
    }
    /**
     * For a fungible token to use in trades (like W-ETH), get the amount
     *  approved for use by the Wyvern transfer proxy.
     * Internal method exposed for dev flexibility.
     * @param param0 __namedParamters Object
     * @param accountAddress Address for the user's wallet
     * @param tokenAddress Address for the token's contract
     * @param proxyAddress User's proxy address. If undefined, uses the token transfer proxy address
     */
    async _getApprovedTokenCount({ accountAddress, tokenAddress, proxyAddress }) {
        console.log("========_getApprovedTokenCount=============", tokenAddress);
        if (!tokenAddress) {
            tokenAddress = WyvernSchemas.tokens[this._networkName].canonicalWrappedEther.address;
        }
        const addressToApprove = proxyAddress || wyvernProtocol_1.WyvernProtocol.getTokenTransferProxyAddress(this._networkName);
        console.log(proxyAddress, "====addressToApprove=====", addressToApprove, "========_getApprovedTokenCount=============", tokenAddress);
        const erc20abi = new api_contract_1.Abi(contracts_1.ERC20, this.apiPro.registry.getChainProperties());
        const contract = new api_contract_1.ContractPromise(this.apiPro, erc20abi, tokenAddress);
        let { result, output } = await contract.query.allowance(accountAddress, { value: 0, gasLimit: -1 }, accountAddress, addressToApprove);
        console.log("====result=====", result, "========result=============", output);
        // The actual result from RPC as `ContractExecResult`
        const approved = output == null ? 0 : Number(output.toString());
        // const approved = await rawCall(this.apiPro, {
        //     from: accountAddress,
        //     to: tokenAddress,
        //     data: encodeCall(getMethod(ERC20, 'allowance'),
        //         [accountAddress, addressToApprove]),
        // })
        return (0, utils_1.makeBigNumber)(approved);
    }
    async _makeBuyOrder({ asset, quantity, accountAddress, startAmount, expirationTime = 0, paymentTokenAddress, extraBountyBasisPoints = 0, sellOrder, referrerAddress }) {
        accountAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, accountAddress);
        const schema = this._getSchema(asset.schemaName);
        const quantityBN = wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(quantity), asset.decimals || 0);
        const wyAsset = (0, utils_1.getWyvernAsset)(schema, asset, quantityBN);
        const openSeaAsset = await this.api.getAsset(asset);
        const taker = sellOrder
            ? sellOrder.maker
            : constants_1.NULL_ADDRESS;
        const { totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints } = await this.computeFees({ asset: openSeaAsset, extraBountyBasisPoints, side: types_1.OrderSide.Buy });
        const { makerRelayerFee, takerRelayerFee, makerProtocolFee, takerProtocolFee, makerReferrerFee, feeRecipient, feeMethod } = this._getBuyFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, sellOrder);
        const { target, calldata, replacementPattern } = (0, schema_1.encodeBuy)(schema, wyAsset, accountAddress, this._wyvernProtocol, this._networkName);
        const { basePrice, extra, paymentToken } = await this._getPriceParameters(types_1.OrderSide.Buy, paymentTokenAddress, expirationTime, startAmount);
        const times = this._getTimeParameters(expirationTime);
        const { staticTarget, staticExtradata } = await this._getStaticCallTargetAndExtraData({ asset: openSeaAsset, useTxnOriginStaticCall: false });
        return {
            exchange: wyvernProtocol_1.WyvernProtocol.getExchangeContractAddress(this._networkName),
            maker: accountAddress,
            taker,
            quantity: quantityBN,
            makerRelayerFee,
            takerRelayerFee,
            makerProtocolFee,
            takerProtocolFee,
            makerReferrerFee,
            waitingForBestCounterOrder: false,
            feeMethod,
            feeRecipient,
            side: types_1.OrderSide.Buy,
            saleKind: types_1.SaleKind.FixedPrice,
            target,
            howToCall: types_1.HowToCall.Call,
            calldata,
            replacementPattern,
            staticTarget,
            staticExtradata,
            paymentToken,
            basePrice,
            extra,
            listingTime: times.listingTime,
            expirationTime: times.expirationTime,
            salt: wyvernProtocol_1.WyvernProtocol.generatePseudoRandomSalt(),
            metadata: {
                asset: wyAsset,
                schema: schema.name,
                referrerAddress
            }
        };
    }
    async _makeSellOrder({ asset, quantity, accountAddress, startAmount, endAmount, listingTime, expirationTime, waitForHighestBid, englishAuctionReservePrice = 0, paymentTokenAddress, extraBountyBasisPoints, buyerAddress }) {
        accountAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, accountAddress);
        const schema = this._getSchema(asset.schemaName);
        const quantityBN = wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(quantity), asset.decimals || 0);
        const wyAsset = (0, utils_1.getWyvernAsset)(schema, asset, quantityBN);
        const isPrivate = buyerAddress != constants_1.NULL_ADDRESS;
        const openSeaAsset = await this.api.getAsset(asset);
        const { totalSellerFeeBasisPoints, totalBuyerFeeBasisPoints, sellerBountyBasisPoints } = await this.computeFees({ asset: openSeaAsset, side: types_1.OrderSide.Sell, isPrivate, extraBountyBasisPoints });
        const { target, calldata, replacementPattern } = (0, schema_1.encodeSell)(schema, wyAsset, accountAddress, this._wyvernProtocol, this._networkName);
        const orderSaleKind = endAmount != null && endAmount !== startAmount
            ? types_1.SaleKind.DutchAuction
            : types_1.SaleKind.FixedPrice;
        const { basePrice, extra, paymentToken, reservePrice } = await this._getPriceParameters(types_1.OrderSide.Sell, paymentTokenAddress, expirationTime, startAmount, endAmount, waitForHighestBid, englishAuctionReservePrice);
        const times = this._getTimeParameters(expirationTime, listingTime, waitForHighestBid);
        const { makerRelayerFee, takerRelayerFee, makerProtocolFee, takerProtocolFee, makerReferrerFee, feeRecipient, feeMethod } = this._getSellFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, waitForHighestBid, sellerBountyBasisPoints);
        const { staticTarget, staticExtradata } = await this._getStaticCallTargetAndExtraData({ asset: openSeaAsset, useTxnOriginStaticCall: waitForHighestBid });
        return {
            exchange: wyvernProtocol_1.WyvernProtocol.getExchangeContractAddress(this._networkName),
            maker: accountAddress,
            taker: buyerAddress,
            quantity: quantityBN,
            makerRelayerFee,
            takerRelayerFee,
            makerProtocolFee,
            takerProtocolFee,
            makerReferrerFee,
            waitingForBestCounterOrder: waitForHighestBid,
            englishAuctionReservePrice: reservePrice ? (0, utils_1.makeBigNumber)(reservePrice) : undefined,
            feeMethod,
            feeRecipient,
            side: types_1.OrderSide.Sell,
            saleKind: orderSaleKind,
            target,
            howToCall: types_1.HowToCall.Call,
            calldata,
            replacementPattern,
            staticTarget,
            staticExtradata,
            paymentToken,
            basePrice,
            extra,
            listingTime: times.listingTime,
            expirationTime: times.expirationTime,
            salt: wyvernProtocol_1.WyvernProtocol.generatePseudoRandomSalt(),
            metadata: {
                asset: wyAsset,
                schema: schema.name,
            }
        };
    }
    async _getStaticCallTargetAndExtraData({ asset, useTxnOriginStaticCall }) {
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
        return {
            staticTarget: constants_1.NULL_ADDRESS,
            staticExtradata: '',
        };
        // }
    }
    async _makeBundleBuyOrder({ assets, collection, quantities, accountAddress, startAmount, expirationTime = 0, paymentTokenAddress, extraBountyBasisPoints = 0, sellOrder, referrerAddress }) {
        accountAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, accountAddress);
        const quantityBNs = quantities.map((quantity, i) => wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(quantity), assets[i].decimals || 0));
        const bundle = (0, utils_1.getWyvernBundle)(assets, assets.map(a => this._getSchema(a.schemaName)), quantityBNs);
        const orderedSchemas = bundle.schemas.map((name) => this._getSchema(name));
        const taker = sellOrder
            ? sellOrder.maker
            : constants_1.NULL_ADDRESS;
        // If all assets are for the same collection, use its fees
        const asset = collection
            ? await this.api.getAsset(assets[0])
            : undefined;
        const { totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints } = await this.computeFees({ asset, extraBountyBasisPoints, side: types_1.OrderSide.Buy });
        const { makerRelayerFee, takerRelayerFee, makerProtocolFee, takerProtocolFee, makerReferrerFee, feeRecipient, feeMethod } = this._getBuyFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, sellOrder);
        const { calldata, replacementPattern } = (0, schema_1.encodeAtomicizedBuy)(orderedSchemas, bundle.assets, accountAddress, this._wyvernProtocol, this._networkName);
        const { basePrice, extra, paymentToken } = await this._getPriceParameters(types_1.OrderSide.Buy, paymentTokenAddress, expirationTime, startAmount);
        const times = this._getTimeParameters(expirationTime);
        return {
            exchange: wyvernProtocol_1.WyvernProtocol.getExchangeContractAddress(this._networkName),
            maker: accountAddress,
            taker,
            quantity: (0, utils_1.makeBigNumber)(1),
            makerRelayerFee,
            takerRelayerFee,
            makerProtocolFee,
            takerProtocolFee,
            makerReferrerFee,
            waitingForBestCounterOrder: false,
            feeMethod,
            feeRecipient,
            side: types_1.OrderSide.Buy,
            saleKind: types_1.SaleKind.FixedPrice,
            target: wyvernProtocol_1.WyvernProtocol.getAtomicizerContractAddress(this._networkName),
            howToCall: types_1.HowToCall.DelegateCall,
            calldata,
            replacementPattern,
            staticTarget: constants_1.NULL_ADDRESS,
            staticExtradata: '',
            paymentToken,
            basePrice,
            extra,
            listingTime: times.listingTime,
            expirationTime: times.expirationTime,
            salt: wyvernProtocol_1.WyvernProtocol.generatePseudoRandomSalt(),
            metadata: {
                bundle,
                referrerAddress
            }
        };
    }
    async _makeBundleSellOrder({ bundleName, bundleDescription, bundleExternalLink, assets, collection, quantities, accountAddress, startAmount, endAmount, listingTime, expirationTime, waitForHighestBid, englishAuctionReservePrice = 0, paymentTokenAddress, extraBountyBasisPoints, buyerAddress }) {
        accountAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, accountAddress);
        const quantityBNs = quantities.map((quantity, i) => wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(quantity), assets[i].decimals || 0));
        const bundle = (0, utils_1.getWyvernBundle)(assets, assets.map(a => this._getSchema(a.schemaName)), quantityBNs);
        const orderedSchemas = bundle.schemas.map((name) => this._getSchema(name));
        bundle.name = bundleName;
        bundle.description = bundleDescription;
        bundle.external_link = bundleExternalLink;
        const isPrivate = buyerAddress != constants_1.NULL_ADDRESS;
        // If all assets are for the same collection, use its fees
        const asset = collection
            ? await this.api.getAsset(assets[0])
            : undefined;
        const { totalSellerFeeBasisPoints, totalBuyerFeeBasisPoints, sellerBountyBasisPoints } = await this.computeFees({ asset, side: types_1.OrderSide.Sell, isPrivate, extraBountyBasisPoints });
        const { calldata, replacementPattern } = (0, schema_1.encodeAtomicizedSell)(orderedSchemas, bundle.assets, accountAddress, this._wyvernProtocol, this._networkName);
        const { basePrice, extra, paymentToken, reservePrice } = await this._getPriceParameters(types_1.OrderSide.Sell, paymentTokenAddress, expirationTime, startAmount, endAmount, waitForHighestBid, englishAuctionReservePrice);
        const times = this._getTimeParameters(expirationTime, listingTime, waitForHighestBid);
        const orderSaleKind = endAmount != null && endAmount !== startAmount
            ? types_1.SaleKind.DutchAuction
            : types_1.SaleKind.FixedPrice;
        const { makerRelayerFee, takerRelayerFee, makerProtocolFee, takerProtocolFee, makerReferrerFee, feeRecipient } = this._getSellFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, waitForHighestBid, sellerBountyBasisPoints);
        return {
            exchange: wyvernProtocol_1.WyvernProtocol.getExchangeContractAddress(this._networkName),
            maker: accountAddress,
            taker: buyerAddress,
            quantity: (0, utils_1.makeBigNumber)(1),
            makerRelayerFee,
            takerRelayerFee,
            makerProtocolFee,
            takerProtocolFee,
            makerReferrerFee,
            waitingForBestCounterOrder: waitForHighestBid,
            englishAuctionReservePrice: reservePrice ? (0, utils_1.makeBigNumber)(reservePrice) : undefined,
            feeMethod: types_1.FeeMethod.SplitFee,
            feeRecipient,
            side: types_1.OrderSide.Sell,
            saleKind: orderSaleKind,
            target: wyvernProtocol_1.WyvernProtocol.getAtomicizerContractAddress(this._networkName),
            howToCall: types_1.HowToCall.DelegateCall,
            calldata,
            replacementPattern,
            staticTarget: constants_1.NULL_ADDRESS,
            staticExtradata: '',
            paymentToken,
            basePrice,
            extra,
            listingTime: times.listingTime,
            expirationTime: times.expirationTime,
            salt: wyvernProtocol_1.WyvernProtocol.generatePseudoRandomSalt(),
            metadata: {
                bundle
            }
        };
    }
    _makeMatchingOrder({ order, accountAddress, recipientAddress }) {
        accountAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, accountAddress);
        recipientAddress = (0, utils_1.validateAndFormatWalletAddress)(this.apiPro, recipientAddress);
        console.log(order.side, "========order.side=====recipientAddress=====", recipientAddress);
        const computeOrderParams = () => {
            if ('asset' in order.metadata) {
                const schema = this._getSchema(order.metadata.schema);
                return order.side == types_1.OrderSide.Buy
                    ? (0, schema_1.encodeSell)(schema, order.metadata.asset, recipientAddress, this._wyvernProtocol, this._networkName)
                    : (0, schema_1.encodeBuy)(schema, order.metadata.asset, recipientAddress, this._wyvernProtocol, this._networkName);
            }
            else if ('bundle' in order.metadata) {
                // We're matching a bundle order
                const bundle = order.metadata.bundle;
                const orderedSchemas = bundle.schemas
                    ? bundle.schemas.map(schemaName => this._getSchema(schemaName))
                    // Backwards compat:
                    : bundle.assets.map(() => this._getSchema('schema' in order.metadata
                        ? order.metadata.schema
                        : undefined));
                const atomicized = order.side == types_1.OrderSide.Buy
                    ? (0, schema_1.encodeAtomicizedSell)(orderedSchemas, order.metadata.bundle.assets, recipientAddress, this._wyvernProtocol, this._networkName)
                    : (0, schema_1.encodeAtomicizedBuy)(orderedSchemas, order.metadata.bundle.assets, recipientAddress, this._wyvernProtocol, this._networkName);
                return {
                    target: wyvernProtocol_1.WyvernProtocol.getAtomicizerContractAddress(this._networkName),
                    calldata: atomicized.calldata,
                    replacementPattern: atomicized.replacementPattern
                };
            }
            else {
                throw new Error('Invalid order metadata');
            }
        };
        console.log("=====_makeMatchingOrder========1=========");
        const { target, calldata, replacementPattern } = computeOrderParams();
        const times = this._getTimeParameters(0);
        // Compat for matching buy orders that have fee recipient still on them
        const feeRecipient = order.feeRecipient == constants_1.NULL_ADDRESS
            ? constants_1.OPENSEA_FEE_RECIPIENT
            : constants_1.NULL_ADDRESS;
        console.log("=====_makeMatchingOrder========1=========");
        const matchingOrder = {
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
            feeRecipient,
            side: (order.side + 1) % 2,
            saleKind: types_1.SaleKind.FixedPrice,
            target,
            howToCall: order.howToCall,
            calldata,
            replacementPattern,
            staticTarget: constants_1.NULL_ADDRESS,
            staticExtradata: '',
            paymentToken: order.paymentToken,
            basePrice: order.basePrice,
            extra: (0, utils_1.makeBigNumber)(0),
            listingTime: times.listingTime,
            expirationTime: times.expirationTime,
            salt: wyvernProtocol_1.WyvernProtocol.generatePseudoRandomSalt(),
            metadata: order.metadata,
        };
        console.log("=====_makeMatchingOrder========1=====2====");
        return Object.assign(Object.assign({}, matchingOrder), { hash: (0, utils_1.getOrderHash)(matchingOrder) });
    }
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
    async _validateMatch({ buy, sell, accountAddress, shouldValidateBuy = false, shouldValidateSell = false }, retries = 1) {
        try {
            if (shouldValidateBuy) {
                const buyValid = await this._validateOrder(buy);
                this.logger(`Buy order is valid: ${buyValid}`);
                if (!buyValid) {
                    throw new Error('Invalid buy order. It may have recently been removed . Please refresh the page and try again!');
                }
            }
            if (shouldValidateSell) {
                const sellValid = await this._validateOrder(sell);
                this.logger(`Sell order is valid: ${sellValid}`);
                if (!sellValid) {
                    throw new Error('Invalid sell order. It may have recently been removed. Please refresh the page and try again!');
                }
            }
            const canMatch = await (0, debugging_1.requireOrdersCanMatch)(this._getClientsForRead(retries).wyvernProtocol, { buy, sell, accountAddress });
            this.logger(`Orders matching: ${canMatch}`);
            const calldataCanMatch = await (0, debugging_1.requireOrderCalldataCanMatch)(this._getClientsForRead(retries).wyvernProtocol, { buy, sell });
            this.logger(`Order calldata matching: ${calldataCanMatch}`);
            return true;
        }
        catch (error) {
            if (retries <= 0) {
                throw new Error(`Error matching this listing: ${error}. Please contact the maker or try again later!`);
            }
            await (0, utils_1.delay)(500);
            return await this._validateMatch({ buy, sell, accountAddress, shouldValidateBuy, shouldValidateSell }, retries - 1);
        }
    }
    // For creating email whitelists on order takers
    async _createEmailWhitelistEntry({ order, buyerEmail }) {
        const asset = 'asset' in order.metadata
            ? order.metadata.asset
            : undefined;
        if (!asset || !asset.id) {
            throw new Error("Whitelisting only available for non-fungible assets.");
        }
        await this.api.postAssetWhitelist(asset.address, asset.id, buyerEmail);
    }
    // Throws
    async _sellOrderValidationAndApprovals({ order, accountAddress }) {
        const wyAssets = 'bundle' in order.metadata
            ? order.metadata.bundle.assets
            : order.metadata.asset
                ? [order.metadata.asset]
                : [];
        const schemaNames = 'bundle' in order.metadata && 'schemas' in order.metadata.bundle
            ? order.metadata.bundle.schemas
            : 'schema' in order.metadata
                ? [order.metadata.schema]
                : [];
        const tokenAddress = order.paymentToken;
        await this._approveAll({ schemaNames, wyAssets, accountAddress });
        // For fulfilling bids,
        // need to approve access to fungible token because of the way fees are paid
        // This can be done at a higher level to show UI
        if (tokenAddress != constants_1.NULL_ADDRESS) {
            const minimumAmount = (0, utils_1.makeBigNumber)(order.basePrice);
            await this.approveFungibleToken({ accountAddress, tokenAddress, minimumAmount });
        }
        // Check sell parameters
        const sellValid = await this._wyvernProtocolReadOnly.wyvernExchange.validateOrderParametersEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata);
        if (!sellValid) {
            console.error(order);
            throw new Error(`Failed to validate sell order parameters. Make sure you're on the right network!`);
        }
    }
    /**
     * Instead of signing an off-chain order, you can approve an order
     * with on on-chain transaction using this method
     * @param order Order to approve
     * @returns Transaction hash of the approval transaction
     */
    async _approveOrder(order) {
        const accountAddress = order.maker;
        // const gasPrice = await this._computeGasPrice()
        const includeInOrderBook = true;
        this._dispatch(types_1.EventType.ApproveOrder, { order, accountAddress });
        let accountPair = keyring.getPair(accountAddress);
        const transactionHash = this._wyvernProtocol.wyvernExchange.approveOrderEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee, order.takerRelayerFee, order.makerProtocolFee, order.takerProtocolFee, order.basePrice, order.extra, order.listingTime, order.expirationTime, order.salt], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata, includeInOrderBook).signAndSend(accountPair);
        await this._confirmTransaction(transactionHash.toString(), types_1.EventType.ApproveOrder, "Approving order", async () => {
            const isApproved = await this._validateOrder(order);
            return isApproved;
        });
        return transactionHash;
    }
    async _validateOrder(order) {
        console.log("=====order.maker=============", order.maker);
        const order_hash = await this._wyvernProtocolReadOnly.wyvernExchange.hashToSignEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata);
        const fromPair = keyring.getPair(order.maker);
        const order_sig = fromPair.sign(order_hash);
        const isValid = await this._wyvernProtocolReadOnly.wyvernExchange.validateOrderEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata, order_sig);
        return isValid;
    }
    async _approveAll({ schemaNames, wyAssets, accountAddress, proxyAddress }) {
        proxyAddress = proxyAddress || await this._getProxy(accountAddress) || undefined;
        if (!proxyAddress) {
            proxyAddress = await this._initializeProxy(accountAddress);
        }
        const contractsWithApproveAll = new Set();
        const fromPair = keyring.getPair(accountAddress);
        const nonces = await this.apiPro.rpc.system.accountNextIndex(fromPair.address);
        return Promise.all(wyAssets.map(async (wyAsset, i) => {
            const schemaName = schemaNames[i];
            // Verify that the taker owns the asset
            let isOwner;
            try {
                isOwner = await this._ownsAssetOnChain({
                    accountAddress,
                    proxyAddress,
                    wyAsset,
                    schemaName
                });
            }
            catch (error) {
                // let it through for assets we don't support yet
                isOwner = true;
            }
            if (!isOwner) {
                const minAmount = 'quantity' in wyAsset
                    ? wyAsset.quantity
                    : 1;
                console.error(`Failed on-chain ownership check: ${accountAddress} on ${schemaName}:`, wyAsset);
                throw new Error(`You don't own enough to do that (${minAmount} base units of ${wyAsset.address}${wyAsset.id ? (" token " + wyAsset.id) : ''})`);
            }
            switch (schemaName) {
                case types_1.WyvernSchemaName.ERC721:
                case types_1.WyvernSchemaName.ERC1155:
                case types_1.WyvernSchemaName.LegacyEnjin:
                case types_1.WyvernSchemaName.ENSShortNameAuction:
                    // Handle NFTs and SFTs
                    const wyNFTAsset = wyAsset;
                    return await this.approveSemiOrNonFungibleToken({
                        tokenId: wyNFTAsset.id.toString(),
                        tokenAddress: wyNFTAsset.address,
                        accountAddress,
                        proxyAddress,
                        schemaName,
                        skipApproveAllIfTokenAddressIn: contractsWithApproveAll
                    });
                case types_1.WyvernSchemaName.ERC20:
                    // Handle FTs
                    const wyFTAsset = wyAsset;
                    if (contractsWithApproveAll.has(wyFTAsset.address)) {
                        // Return null to indicate no tx occurred
                        return null;
                    }
                    contractsWithApproveAll.add(wyFTAsset.address);
                    const nonce = (Number(nonces.toString()) + Number(i)).toString();
                    return await this.approveFungibleToken({
                        tokenAddress: wyFTAsset.address,
                        accountAddress,
                        proxyAddress,
                        nonce
                    });
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
            }
        }));
    }
    // Throws
    async _buyOrderValidationAndApprovals({ order, counterOrder, accountAddress }) {
        const tokenAddress = order.paymentToken;
        console.log(tokenAddress, "======================", constants_1.NULL_ADDRESS);
        if (tokenAddress != constants_1.NULL_ADDRESS) {
            console.log(tokenAddress, "==============!!!========", constants_1.NULL_ADDRESS);
            const balance = await this.getTokenBalance({ accountAddress, tokenAddress });
            /* NOTE: no buy-side auctions for now, so sell.saleKind === 0 */
            let minimumAmount = (0, utils_1.makeBigNumber)(order.basePrice);
            if (counterOrder) {
                minimumAmount = await this._getRequiredAmountForTakingSellOrder(counterOrder);
            }
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
            await this.approveFungibleToken({ accountAddress, tokenAddress, minimumAmount });
        }
        console.log([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata);
        const buyValid = await this._wyvernProtocolReadOnly.wyvernExchange.validateOrderParametersEx([order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken], [order.makerRelayerFee.toNumber(), order.takerRelayerFee.toNumber(), order.makerProtocolFee.toNumber(), order.takerProtocolFee.toNumber(), order.basePrice.toNumber() / Number(1000000000), order.extra.toNumber(), order.listingTime.toNumber(), order.expirationTime.toNumber(), order.salt.toNumber()], order.feeMethod, order.side, order.saleKind, order.howToCall, order.calldata, order.replacementPattern, order.staticExtradata);
        if (!buyValid) {
            console.error(order);
            throw new Error(`Failed to validate buy order parameters. Make sure you're on the right network!`);
        }
    }
    /**
     * Check if an account, or its proxy, owns an asset on-chain
     * @param accountAddress Account address for the wallet
     * @param proxyAddress Proxy address for the account
     * @param wyAsset asset to check. If fungible, the `quantity` attribute will be the minimum amount to own
     * @param schemaName WyvernSchemaName for the asset
     */
    async _ownsAssetOnChain({ accountAddress, proxyAddress, wyAsset, schemaName }) {
        const asset = {
            tokenId: wyAsset.id || null,
            tokenAddress: wyAsset.address,
            schemaName
        };
        const minAmount = new bignumber_js_1.BigNumber('quantity' in wyAsset
            ? wyAsset.quantity
            : 1);
        const accountBalance = await this.getAssetBalance({ accountAddress, asset });
        if (accountBalance.isGreaterThanOrEqualTo(minAmount)) {
            return true;
        }
        proxyAddress = proxyAddress || await this._getProxy(accountAddress);
        if (proxyAddress) {
            const proxyBalance = await this.getAssetBalance({ accountAddress: proxyAddress, asset });
            if (proxyBalance.isGreaterThanOrEqualTo(minAmount)) {
                return true;
            }
        }
        return false;
    }
    _getBuyFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, sellOrder) {
        this._validateFees(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints);
        let makerRelayerFee;
        let takerRelayerFee;
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
            makerRelayerFee,
            takerRelayerFee,
            makerProtocolFee: (0, utils_1.makeBigNumber)(0),
            takerProtocolFee: (0, utils_1.makeBigNumber)(0),
            makerReferrerFee: (0, utils_1.makeBigNumber)(0),
            feeRecipient: constants_1.OPENSEA_FEE_RECIPIENT,
            feeMethod: types_1.FeeMethod.SplitFee
        };
    }
    _getSellFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, waitForHighestBid, sellerBountyBasisPoints = 0) {
        this._validateFees(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints);
        // Use buyer as the maker when it's an English auction, so Wyvern sets prices correctly
        const feeRecipient = waitForHighestBid
            ? constants_1.NULL_ADDRESS
            : constants_1.OPENSEA_FEE_RECIPIENT;
        // Swap maker/taker fees when it's an English auction,
        // since these sell orders are takers not makers
        const makerRelayerFee = waitForHighestBid
            ? (0, utils_1.makeBigNumber)(totalBuyerFeeBasisPoints)
            : (0, utils_1.makeBigNumber)(totalSellerFeeBasisPoints);
        const takerRelayerFee = waitForHighestBid
            ? (0, utils_1.makeBigNumber)(totalSellerFeeBasisPoints)
            : (0, utils_1.makeBigNumber)(totalBuyerFeeBasisPoints);
        return {
            makerRelayerFee,
            takerRelayerFee,
            makerProtocolFee: (0, utils_1.makeBigNumber)(0),
            takerProtocolFee: (0, utils_1.makeBigNumber)(0),
            makerReferrerFee: (0, utils_1.makeBigNumber)(sellerBountyBasisPoints),
            feeRecipient,
            feeMethod: types_1.FeeMethod.SplitFee
        };
    }
    /**
     * Validate fee parameters
     * @param totalBuyerFeeBasisPoints Total buyer fees
     * @param totalSellerFeeBasisPoints Total seller fees
     */
    _validateFees(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints) {
        const maxFeePercent = constants_1.INVERSE_BASIS_POINT / 100;
        if (totalBuyerFeeBasisPoints > constants_1.INVERSE_BASIS_POINT
            || totalSellerFeeBasisPoints > constants_1.INVERSE_BASIS_POINT) {
            throw new Error(`Invalid buyer/seller fees: must be less than ${maxFeePercent}%`);
        }
        if (totalBuyerFeeBasisPoints < 0
            || totalSellerFeeBasisPoints < 0) {
            throw new Error(`Invalid buyer/seller fees: must be at least 0%`);
        }
    }
    /**
     * Get the listing and expiration time paramters for a new order
     * @param expirationTimestamp Timestamp to expire the order (in seconds), or 0 for non-expiring
     * @param listingTimestamp Timestamp to start the order (in seconds), or undefined to start it now
     * @param waitingForBestCounterOrder Whether this order should be hidden until the best match is found
     */
    _getTimeParameters(expirationTimestamp, listingTimestamp, waitingForBestCounterOrder = false) {
        // Validation
        const minExpirationTimestamp = Math.round(Date.now() / 1000 + constants_1.MIN_EXPIRATION_SECONDS);
        const minListingTimestamp = Math.round(Date.now() / 1000);
        if (expirationTimestamp != 0 && expirationTimestamp < minExpirationTimestamp) {
            throw new Error(`Expiration time must be at least ${constants_1.MIN_EXPIRATION_SECONDS} seconds from now, or zero (non-expiring).`);
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
            throw new Error(`Cannot schedule an English auction for the future.`);
        }
        if (parseInt(expirationTimestamp.toString()) != expirationTimestamp) {
            throw new Error(`Expiration timestamp must be a whole number of seconds`);
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
            expirationTime: (0, utils_1.makeBigNumber)(expirationTimestamp),
        };
    }
    /**
     * Compute the `basePrice` and `extra` parameters to be used to price an order.
     * Also validates the expiration time and auction type.
     * @param tokenAddress Address of the ERC-20 token to use for trading.
     * Use the null address for ETH
     * @param expirationTime When the auction expires, or 0 if never.
     * @param startAmount The base value for the order, in the token's main units (e.g. ETH instead of wei)
     * @param endAmount The end value for the order, in the token's main units (e.g. ETH instead of wei). If unspecified, the order's `extra` attribute will be 0
     */
    async _getPriceParameters(orderSide, tokenAddress, expirationTime, startAmount, endAmount, waitingForBestCounterOrder = false, englishAuctionReservePrice) {
        const priceDiff = endAmount != null
            ? startAmount - endAmount
            : 0;
        const paymentToken = tokenAddress;
        const isToken = tokenAddress == constants_1.NULL_ADDRESS;
        const { tokens } = await this.api.getPaymentTokens({ address: paymentToken });
        const token = tokens[0];
        // Validation
        if (isNaN(startAmount) || startAmount == null || startAmount < 0) {
            throw new Error(`Starting price must be a number >= 0`);
        }
        if (!isToken && !token) {
            throw new Error(`No ERC-20 token found for '${paymentToken}'`);
        }
        if (isToken && waitingForBestCounterOrder) {
            throw new Error(`English auctions must use wrapped ETH or an ERC-20 token.`);
        }
        if (isToken && orderSide === types_1.OrderSide.Buy) {
            throw new Error(`Offers must use wrapped ETH or an ERC-20 token.`);
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
        // const basePrice = isEther
        //   ? makeBigNumber(this.web3.toWei(startAmount, 'ether')).round()
        //   : WyvernProtocol.toBaseUnitAmount(makeBigNumber(startAmount), token.decimals)
        // Note: new BigNumber(makeBigNumber(startAmount), token.decimals)
        // will fail if too many decimal places, so special-case ether
        const BN = bignumber_js_1.BigNumber.clone({ DECIMAL_PLACES: token.decimals || 0 });
        const basePrice = isToken
            ? new BN((0, utils_1.makeBigNumber)((0, utils_1.toWei)(startAmount, token.decimals)).toFixed())
            : wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(startAmount), token.decimals);
        const extra = isToken
            ? new BN((0, utils_1.makeBigNumber)((0, utils_1.toWei)(priceDiff, token.decimals)).toFixed())
            : wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(priceDiff), token.decimals);
        const reservePrice = englishAuctionReservePrice
            ? isToken
                ? new BN((0, utils_1.makeBigNumber)((0, utils_1.toWei)(englishAuctionReservePrice, token.decimals)).toFixed())
                : wyvernProtocol_1.WyvernProtocol.toBaseUnitAmount((0, utils_1.makeBigNumber)(englishAuctionReservePrice), token.decimals)
            : undefined;
        return { basePrice, extra, paymentToken, reservePrice };
    }
    _getMetadata(order, referrerAddress) {
        const referrer = referrerAddress || order.metadata.referrerAddress;
        if (referrer && isValidAddress(referrer)) {
            return referrer;
        }
        return undefined;
    }
    async _atomicMatch({ buy, sell, accountAddress, metadata = constants_1.NULL_BLOCK_HASH }) {
        // let value
        let shouldValidateBuy = true;
        let shouldValidateSell = true;
        if (sell.maker == accountAddress) {
            console.log("====_atomicMatch=======s=====");
            // USER IS THE SELLER, only validate the buy order
            await this._sellOrderValidationAndApprovals({ order: sell, accountAddress });
            shouldValidateSell = false;
        }
        else if (buy.maker == accountAddress) {
            console.log("====_atomicMatch======b======");
            // USER IS THE BUYER, only validate the sell order
            await this._buyOrderValidationAndApprovals({ order: buy, counterOrder: sell, accountAddress });
            shouldValidateBuy = false;
            // If using ETH to pay, set the value of the transaction to the current price
            if (buy.paymentToken == constants_1.NULL_ADDRESS) {
                // value = await this._getRequiredAmountForTakingSellOrder(sell)
            }
        }
        else {
            // User is neither - matching service
            console.log("====_atomicMatch============");
        }
        await this._validateMatch({ buy, sell, accountAddress, shouldValidateBuy, shouldValidateSell });
        this._dispatch(types_1.EventType.MatchOrders, { buy, sell, accountAddress, matchMetadata: metadata });
        const sell_hash = await this._wyvernProtocolReadOnly.wyvernExchange.hashToSignEx([sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken], [sell.makerRelayerFee.toNumber(), sell.takerRelayerFee.toNumber(), sell.makerProtocolFee.toNumber(), sell.takerProtocolFee.toNumber(), sell.basePrice.toNumber() / Number(1000000000), sell.extra.toNumber(), sell.listingTime.toNumber(), sell.expirationTime.toNumber(), sell.salt.toNumber()], sell.feeMethod, sell.side, sell.saleKind, sell.howToCall, sell.calldata, sell.replacementPattern, sell.staticExtradata);
        const buy_hash = await this._wyvernProtocolReadOnly.wyvernExchange.hashToSignEx([buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken], [buy.makerRelayerFee.toNumber(), buy.takerRelayerFee.toNumber(), buy.makerProtocolFee.toNumber(), buy.takerProtocolFee.toNumber(), buy.basePrice.toNumber() / Number(1000000000), buy.extra.toNumber(), buy.listingTime.toNumber(), buy.expirationTime.toNumber(), buy.salt.toNumber()], buy.feeMethod, buy.side, buy.saleKind, buy.howToCall, buy.calldata, buy.replacementPattern, buy.staticExtradata);
        // let buy_sig = users.betty.key.sign(buy_hash, { withType: true });
        // let sell_sig = users.betty.key.sign(sell_hash, { withType: true });
        const buyPair = keyring.getPair(buy.maker);
        const buy_sig = buyPair.sign(buy_hash);
        const sellPair = keyring.getPair(sell.maker);
        const sell_sig = sellPair.sign(sell_hash);
        let txHash;
        // const txnData: any = { from: accountAddress, value }
        const args = [
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
        ]; //WyvernAtomicMatchParameters
        // console.log(args)
        // Estimate gas first
        // try {
        //     // Typescript splat doesn't typecheck
        //     const gasEstimate = await this._wyvernProtocol.wyvernExchange.atomicMatchEx(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7],
        //         args[8], args[9], args[10], args[11]).paymentInfo(buyPair)
        //     const partialFee = Number(`${gasEstimate.partialFee.toHuman()}`)
        //     txnData.gasPrice = await this._computeGasPrice()
        //     txnData.gas = this._correctGasAmount(partialFee)
        // } catch (error) {
        //     console.error(`Failed atomic match with args: `, args, error)
        //     throw new Error(`Oops, the Ethereum network rejected this transaction :( The OpenSea devs have been alerted, but this problem is typically due an item being locked or untransferrable. The exact error was "${error.message.substr(0, MAX_ERROR_LENGTH)}..."`)
        // }
        // Then do the transaction
        try {
            //this.logger(`Fulfilling order with gas set to ${txnData.gas}`)
            //
            let accPair = buyPair;
            let nonces = await this.apiPro.rpc.system.accountNextIndex(accPair.address);
            let nonce = nonces.toString();
            if (shouldValidateSell) {
                console.log('=================shouldValidateSell==============');
                accPair = sellPair;
                let nonces = await this.apiPro.rpc.system.accountNextIndex(accPair.address);
                nonce = (Number(nonces.toString()) + Number(4)).toString();
            }
            console.log(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], "========nonces=========", nonces.toString(), accPair.address);
            //    this.logger(`${console.trace()}`)
            // txHash = submit(this.apiPro, this._wyvernProtocol.wyvernExchange.atomicMatchEx(args[0],
            //     args[1], args[2], args[3], args[4], args[5],
            //     args[6], args[7], args[8], args[9], args[10], args[11]), buyPair,nonces)
            txHash = await this._wyvernProtocol.wyvernExchange.atomicMatchEx(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11]).signAndSend(accPair, { nonce });
        }
        catch (error) {
            console.error(error);
            // this._dispatch(EventType.TransactionDenied, {
            //     error, buy, sell, accountAddress,
            //     matchMetadata: metadata
            // })
            // throw new Error(`Failed to authorize transaction: "${error.message
            //     ? error.message
            //     : 'user denied'
            //     }..."`)
        }
        return txHash;
    }
    async _getRequiredAmountForTakingSellOrder(sell) {
        const currentPrice = await this.getCurrentPrice(sell);
        const estimatedPrice = (0, utils_1.estimateCurrentPrice)(sell);
        const maxPrice = bignumber_js_1.BigNumber.max(currentPrice, estimatedPrice);
        // TODO Why is this not always a big number?
        sell.takerRelayerFee = (0, utils_1.makeBigNumber)(sell.takerRelayerFee);
        const feePercentage = sell.takerRelayerFee.div(constants_1.INVERSE_BASIS_POINT);
        const fee = feePercentage.times(maxPrice);
        return fee.plus(maxPrice).integerValue(bignumber_js_1.BigNumber.ROUND_CEIL);
    }
    async _authorizeOrder(order) {
        // const message = order.hash
        const signerAddress = order.maker;
        this._dispatch(types_1.EventType.CreateOrder, { order, accountAddress: order.maker });
        const makerIsSmartContract = await (0, utils_1.isContractAddress)(this.apiPro, signerAddress);
        try {
            if (makerIsSmartContract) {
                // The apip provider is probably a smart contract wallet.
                // Fallback to on-chain approval.
                await this._approveOrder(order);
                return null;
            }
            else {
                return null; // await personalSignAsync(this.apiPro, message, signerAddress)
            }
        }
        catch (error) {
            this._dispatch(types_1.EventType.OrderDenied, { order, accountAddress: signerAddress });
            throw error;
        }
    }
    _getSchema(schemaName) {
        const schemaName_ = schemaName || types_1.WyvernSchemaName.ERC721;
        const schema = WyvernSchemas.schemas[this._networkName].filter(s => s.name == schemaName_)[0];
        if (!schema) {
            throw new Error(`Trading for this asset (${schemaName_}) is not yet supported. Please contact us or check back later!`);
        }
        return schema;
    }
    _dispatch(event, data) {
        //this._emitter.emit(event, data)
    }
    /**
     * Get the clients to use for a read call
     * @param retries current retry value
     */
    _getClientsForRead(retries = 1) {
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
    }
    async _confirmTransaction(transactionHash, event, description, testForSuccess) {
        const transactionEventData = { transactionHash, event };
        //this.logger(`Transaction started: ${description}`)
        if (transactionHash == constants_1.NULL_BLOCK_HASH) {
            // This was a smart contract wallet that doesn't know the transaction
            this._dispatch(types_1.EventType.TransactionCreated, { event });
            if (!testForSuccess) {
                // Wait if test not implemented
                //this.logger(`Unknown action, waiting 1 minute: ${description}`)
                await (0, utils_1.delay)(60 * 1000);
                return;
            }
            return await this._pollCallbackForConfirmation(event, description, testForSuccess);
        }
        // Normal wallet
        try {
            this._dispatch(types_1.EventType.TransactionCreated, transactionEventData);
            await (0, utils_1.confirmTransaction)(this.apiPro, transactionHash);
            //this.logger(`Transaction succeeded: ${description}`)
            this._dispatch(types_1.EventType.TransactionConfirmed, transactionEventData);
        }
        catch (error) {
            //this.logger(`Transaction failed: ${description}`)
            // this._dispatch(EventType.TransactionFailed, {
            //     ...transactionEventData, error
            // })
            throw error;
        }
    }
    async _pollCallbackForConfirmation(event, description, testForSuccess) {
        return new Promise(async (resolve, reject) => {
            const initialRetries = 60;
            const testResolve = async (retries) => {
                const wasSuccessful = await testForSuccess();
                if (wasSuccessful) {
                    //this.logger(`Transaction succeeded: ${description}`)
                    this._dispatch(types_1.EventType.TransactionConfirmed, { event });
                    return resolve();
                }
                else if (retries <= 0) {
                    return reject();
                }
                if (retries % 10 == 0) {
                    //this.logger(`Tested transaction ${initialRetries - retries + 1} times: ${description}`)
                }
                await (0, utils_1.delay)(5000);
                return testResolve(retries - 1);
            };
            return testResolve(initialRetries);
        });
    }
}
exports.OpenSeaPort = OpenSeaPort;
//# sourceMappingURL=seaport.js.map