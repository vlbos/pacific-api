"use strict";
// import { ApiPromise } from '@polkadot/api'
// import { v4 as uuidv4 } from 'uuid'
// import { stringToHex, stringToU8a } from '@polkadot/util'
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSeaAPI = void 0;
// import { orderJSONToHexArray, orderFieldsJSONToOrder, makeOrderArrayEx, makeOrderEx, makeOrder } from '../orders/order'
// import  {createType}  from '@polkadot/types';
// import * as definitions from './typegen/src/interfaces/definitions';
// import types from './config/types.json';
// import rpcs from './config/rpcs.json';
// const rpc = { ...rpcs };
// import type { OrderJSONType } from '../interfaces/augment-types';
require("isomorphic-unfetch");
const QueryString = __importStar(require("query-string"));
const types_1 = require("./types");
const utils_1 = require("./utils/utils");
const constants_1 = require("./constants");
// import { createApi } from '../api/test/helpers/apiHelper'
class OpenSeaAPI {
    /**
     * Create an instance of the OpenSea API
     * @param config OpenSeaAPIConfig for setting up the API, including an optional API key, network name, and base URL
     * @param logger Optional function for logging debug strings before and after requests are made
     */
    constructor(config, logger) {
        /**
         * Page size to use for fetching orders
         */
        this.pageSize = 20;
        this.apiKey = config.apiKey;
        // const provider = new WsProvider('ws://127.0.0.1:9944/');
        // api =  new ApiPromise({ provider });
        //         (async function () { api = await this.apipro()
        //  })
        switch (config.networkName) {
            case types_1.Network.Dev:
                this.apiBaseUrl = config.apiBaseUrl || constants_1.API_BASE_DEV;
                this.hostUrl = constants_1.SITE_HOST_DEV;
                break;
            case types_1.Network.Main:
            default:
                this.apiBaseUrl = config.apiBaseUrl || constants_1.API_BASE_MAINNET;
                this.hostUrl = constants_1.SITE_HOST_MAINNET;
                break;
        }
        // Debugging: default to nothing
        this.logger = logger || ((arg) => arg);
    }
    // public async apipro() {
    // const provider = new WsProvider('ws://127.0.0.1:9944/');
    //     const rpc = { ...rpcs };
    //     // extract all types from definitions - fast and dirty approach, flatted on 'types'
    //     const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {});
    // console.log("===============odkddd==========")
    //     const api = await ApiPromise.create({
    //         types: {
    //             ...types,
    //             // chain-specific overrides
    //             Keys: 'SessionKeys4'
    //         }
    //     });
    // console.log("===============odkddd==========")
    // console.log(`OrderId bitLength:`, [
    //         api.createType('OrderId').toString(),
    //         api.registry.createType('OrderId').toString(),
    //         createType(api.registry, 'OrderId').toString()
    //     ]);
    // const provider = new WsProvider('ws://127.0.0.1:9944/');
    // api = await ApiPromise.create({ provider })
    // this.apipReadOnly = await ApiPromise.create({ provider: this.provider, types, rpc: rpcs })
    // this.api.apip = api
    // }
    /**
     * Send an order to the orderbook.
     * Throws when the order is invalid.
     * IN NEXT VERSION: change order input to Order type
     * @param order Order JSON to post to the orderbook
     * @param retries Number of times to retry if the service is unavailable for any reason
     */
    async postOrder(order, retries = 2) {
        let json;
        try {
            json = await this.post(`${constants_1.ORDERBOOK_PATH}/orders/post/`, order);
        }
        catch (error) {
            // _throwOrContinue(error, retries)
            await (0, utils_1.delay)(3000);
            return this.postOrder(order, retries - 1);
        }
        return (0, utils_1.orderFromJSON)(json);
    }
    /**
     * Create a whitelist entry for an asset to prevent others from buying.
     * Buyers will have to have verified at least one of the emails
     * on an asset in order to buy.
     * This will throw a 403 if the given API key isn't allowed to create whitelist entries for this contract or asset.
     * @param tokenAddress Address of the asset's contract
     * @param tokenId The asset's token ID
     * @param email The email allowed to buy.
     */
    async postAssetWhitelist(tokenAddress, tokenId, email) {
        const json = await this.post(`${constants_1.API_PATH}/asset/${tokenAddress}/${tokenId}/whitelist/`, {
            email
        });
        return !!json.success;
    }
    /**
     * Get an order from the orderbook, throwing if none is found.
     * @param query Query to use for getting orders. A subset of parameters
     *  on the `OrderJSON` type is supported
     */
    ///NEEDED
    async getOrder(query) {
        const result = await this.get(`${constants_1.ORDERBOOK_PATH}/orders/`, Object.assign({ limit: 1 }, query));
        // console.log("1111")
        let orderJSON;
        if (constants_1.ORDERBOOK_VERSION == 0) {
            const json = result;
            orderJSON = json[0];
        }
        else {
            const json = result;
            orderJSON = json.orders[0];
            //  console.log("ddddd",result)
        }
        if (!orderJSON) {
            throw new Error(`Not found: no matching order found`);
        }
        return (0, utils_1.orderFromJSON)(orderJSON);
    }
    /**
     * Get a list of orders from the orderbook, returning the page of orders
     *  and the count of total orders found.
     * @param query Query to use for getting orders. A subset of parameters
     *  on the `OrderJSON` type is supported
     * @param page Page number, defaults to 1. Can be overridden by
     * `limit` and `offset` attributes from OrderQuery
     */
    async getOrders(query = {}, page = 1) {
        const result = await this.get(`${constants_1.ORDERBOOK_PATH}/orders/`, Object.assign({ limit: this.pageSize, offset: (page - 1) * this.pageSize }, query));
        if (constants_1.ORDERBOOK_VERSION == 0) {
            const json = result;
            return {
                orders: json.map(j => (0, utils_1.orderFromJSON)(j)),
                count: json.length
            };
        }
        else {
            const json = result;
            return {
                orders: json.orders.map(j => (0, utils_1.orderFromJSON)(j)),
                count: json.count
            };
        }
    }
    /**
     * Fetch an asset from the API, throwing if none is found
     * @param tokenAddress Address of the asset's contract
     * @param tokenId The asset's token ID, or null if ERC-20
     * @param retries Number of times to retry if the service is unavailable for any reason
     */
    ///NEEDED
    async getAsset({ tokenAddress, tokenId }, retries = 1) {
        // console.log("getAsset====",tokenAddress)
        let json;
        try {
            json = await this.get(`${constants_1.API_PATH}/asset/${tokenAddress}/${tokenId || 0}/`);
        }
        catch (error) {
            // _throwOrContinue(error, retries)
            await (0, utils_1.delay)(1000);
            return this.getAsset({ tokenAddress, tokenId }, retries - 1);
        }
        return (0, utils_1.assetFromJSON)(json);
    }
    /**
     * Fetch list of assets from the API, returning the page of assets and the count of total assets
     * @param query Query to use for getting orders. A subset of parameters on the `OpenSeaAssetJSON` type is supported
     * @param page Page number, defaults to 1. Can be overridden by
     * `limit` and `offset` attributes from OpenSeaAssetQuery
     */
    async getAssets(query = {}, page = 1) {
        const json = await this.get(`${constants_1.API_PATH}/assets/`, Object.assign({ limit: this.pageSize, offset: (page - 1) * this.pageSize }, query));
        return {
            assets: json.assets.map((j) => (0, utils_1.assetFromJSON)(j)),
            estimatedCount: json.estimated_count
        };
    }
    /**
     * Fetch list of fungible tokens from the API matching paramters
     * @param query Query to use for getting orders. A subset of parameters on the `OpenSeaAssetJSON` type is supported
     * @param page Page number, defaults to 1. Can be overridden by
     * `limit` and `offset` attributes from OpenSeaFungibleTokenQuery
     * @param retries Number of times to retry if the service is unavailable for any reason
     */
    async getPaymentTokens(query = {}, page = 1, retries = 1) {
        let json;
        try {
            json = await this.get(`${constants_1.API_PATH}/tokens/`, Object.assign(Object.assign({}, query), { limit: this.pageSize, offset: (page - 1) * this.pageSize }));
        }
        catch (error) {
            // _throwOrContinue(error, retries)
            await (0, utils_1.delay)(1000);
            return this.getPaymentTokens(query, page, retries - 1);
        }
        // console.log(json)
        return {
            tokens: json.map((t) => (0, utils_1.tokenFromJSON)(t))
        };
    }
    /**
     * Fetch an bundle from the API, return null if it isn't found
     * @param slug The bundle's identifier
     */
    async getBundle({ slug }) {
        const json = await this.get(`${constants_1.API_PATH}/bundle/${slug}/`);
        return json ? (0, utils_1.assetBundleFromJSON)(json) : null;
    }
    /**
     * Fetch list of bundles from the API, returning the page of bundles and the count of total bundles
     * @param query Query to use for getting orders. A subset of parameters on the `OpenSeaAssetBundleJSON` type is supported
     * @param page Page number, defaults to 1. Can be overridden by
     * `limit` and `offset` attributes from OpenSeaAssetBundleQuery
     */
    async getBundles(query = {}, page = 1) {
        const json = await this.get(`${constants_1.API_PATH}/bundles/`, Object.assign(Object.assign({}, query), { limit: this.pageSize, offset: (page - 1) * this.pageSize }));
        return {
            bundles: json.bundles.map((j) => (0, utils_1.assetBundleFromJSON)(j)),
            estimatedCount: json.estimated_count
        };
    }
    /**
     * Get JSON data from API, sending auth token in headers
     * @param apiPath Path to URL endpoint under API
     * @param query Data to send. Will be stringified using QueryString
     */
    async get(apiPath, query = {}) {
        const qs = QueryString.stringify(query);
        const url = `${apiPath}?${qs}`;
        const response = await this._fetch(url);
        return response.json();
    }
    /**
     * POST JSON data to API, sending auth token in headers
     * @param apiPath Path to URL endpoint under API
     * @param body Data to send. Will be JSON.stringified
     * @param opts RequestInit opts, similar to Fetch API. If it contains
     *  a body, it won't be stringified.
     */
    async post(apiPath, body, opts = {}) {
        const fetchOpts = Object.assign({ method: 'POST', body: body ? JSON.stringify(body) : undefined, headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            } }, opts);
        const response = await this._fetch(apiPath, fetchOpts);
        return response.json();
    }
    /**
     * PUT JSON data to API, sending auth token in headers
     * @param apiPath Path to URL endpoint under API
     * @param body Data to send
     * @param opts RequestInit opts, similar to Fetch API. If it contains
     *  a body, it won't be stringified.
     */
    async put(apiPath, body, opts = {}) {
        return this.post(apiPath, body, Object.assign({ method: 'PUT' }, opts));
    }
    /**
     * Get from an API Endpoint, sending auth token in headers
     * @param apiPath Path to URL endpoint under API
     * @param opts RequestInit opts, similar to Fetch API
     */
    async _fetch(apiPath, opts = {}) {
        const apiBase = this.apiBaseUrl;
        const apiKey = this.apiKey;
        const finalUrl = apiBase + apiPath;
        const finalOpts = Object.assign(Object.assign({}, opts), { headers: Object.assign(Object.assign({}, (apiKey ? { 'X-API-KEY': apiKey } : {})), (opts.headers || {})) });
        this.logger(`Sending request: ${finalUrl} ${JSON.stringify(finalOpts).substr(0, 100)}...`);
        // console.log(`Sending request: ${finalUrl} ${JSON.stringify(finalOpts).substr(0, 100)}...`)
        return fetch(finalUrl, finalOpts).then(async (res) => this._handleApiResponse(res));
    }
    async _handleApiResponse(response) {
        if (response.ok) {
            //this.logger(`Got success: ${response.status}`)
            return response;
        }
        let result;
        let errorMessage;
        try {
            result = await response.text();
            result = JSON.parse(result);
        }
        catch (_a) {
            // Result will be undefined or text
        }
        //this.logger(`Got error ${response.status}: ${JSON.stringify(result)}`)
        switch (response.status) {
            case 400:
                errorMessage = result && result.errors
                    ? result.errors.join(', ')
                    : `Invalid request: ${JSON.stringify(result)}`;
                break;
            case 401:
            case 403:
                errorMessage = `Unauthorized. Full message was '${JSON.stringify(result)}'`;
                break;
            case 404:
                errorMessage = `Not found. Full message was '${JSON.stringify(result)}'`;
                break;
            case 500:
                errorMessage = `Internal server error. OpenSea has been alerted, but if the problem persists please contact us via Discord: https://discord.gg/ga8EJbv - full message was ${JSON.stringify(result)}`;
                break;
            case 503:
                errorMessage = `Service unavailable. Please try again in a few minutes. If the problem persists please contact us via Discord: https://discord.gg/ga8EJbv - full message was ${JSON.stringify(result)}`;
                break;
            default:
                errorMessage = `Message: ${JSON.stringify(result)}`;
                break;
        }
        throw new Error(`API Error ${response.status}: ${errorMessage}`);
    }
}
exports.OpenSeaAPI = OpenSeaAPI;
// function _throwOrContinue(error: Error, retries: number) {
//     const isUnavailable = !!error.message && (
//         error.message.includes('503') ||
//         error.message.includes('429')
//     )
//     if (retries <= 0 || !isUnavailable) {
//         throw error
//     }
// }
//# sourceMappingURL=api.js.map