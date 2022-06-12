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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../pacific-js/index");
// import { WyvernProtocol } from '../../lib/wyvern-js'
const types_1 = require("../../pacific-js/types");
const pacific_js_1 = require("../../pacific-js");
const constants_1 = require("../constants");
const utils_1 = require("../../pacific-js/utils/utils");
const constants_2 = require("../../pacific-js/constants");
// import type { OrderId } from 'pacific-js/interfaces';
// import '../interfaces/augment-api';
// import '../interfaces/augment-types';
const api_1 = require("@polkadot/api");
// import types from '../../pacific-js/config/types.json';
// import rpcs from '../../pacific-js/config/rpcs.json';
// const rpc = { ...rpcs };
// import { makeOrderArrayEx, makeOrderEx, makeOrder, orderFromJSON } from '../orders/order'
const ordersJSONFixture = __importStar(require("../fixtures/orders.json"));
const ordersJSON = ordersJSONFixture;
const englishSellOrderJSON = ordersJSON[0];
// const provider = new Web3.providers.HttpProvider(MAINNET_PROVIDER_URL)
const provider = new api_1.WsProvider("ws://127.0.0.1:9944"); //LOCALNET_PROVIDER_URL);
const client = new index_1.OpenSeaPort(provider, {
    networkName: types_1.Network.Main,
    apiKey: constants_1.MAINNET_API_KEY
}, line => console.info(`MAINNET: ${line}`));
let users;
let api;
let accounts;
const salary = 100000000000000;
describe('api tests', () => {
    const second = 1000;
    const block = 6.5 * second;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
    let api;
    beforeAll(async () => {
        jest.setTimeout(90 * 1000);
        // const papi = await init();
        // api = papi.api;
    });
    afterAll(() => {
        //   return clearCityDatabase();
        // saveNonce(users)
    });
    it('API fetches bundles and prefetches sell orders', async () => {
        const { bundles } = await constants_1.apiToTest.getBundles({ asset_contract_address: constants_1.CK_DEV_ADDRESS, on_sale: true });
        expect(bundles).toBeInstanceOf(Array);
        const bundle = bundles[0];
        expect(bundle).not.toBeNull();
        if (!bundle) {
            return;
        }
        expect(bundle.assets.map(a => a.assetContract.name)).toContain("CryptoKittiesDev");
        expect(bundle.sellOrders).not.toBeNull();
    });
    it('Includes API key in token request', async () => {
        const oldLogger = constants_1.devApi.logger;
        const logPromise = new Promise((resolve, reject) => {
            constants_1.devApi.logger = log => {
                try {
                    expect(log).toContain(`"X-API-KEY":"${constants_1.DEV_API_KEY}"`);
                    resolve(0);
                }
                catch (e) {
                    reject(e);
                }
                finally {
                    constants_1.devApi.logger = oldLogger;
                }
            };
            constants_1.devApi.getPaymentTokens({ symbol: "WETH" });
        });
        await logPromise;
    });
    it('An API asset\'s order has correct hash', async () => {
        console.log("==================");
        // const s:OrderId = new OrderId(1);//stringToU8a("null");
        // // (async function () { 
        // console.log("=============dddddd",s)
        console.log("==================");
        const asset = await client.api.getAsset({ tokenAddress: constants_1.CK_ADDRESS, tokenId: 1 });
        expect(asset.orders).not.toBeNull();
        if (!asset.orders) {
            return;
        }
        const order = asset.orders[0];
        expect(order).not.toBeNull();
        if (!order) {
            return;
        }
        expect(order.hash).toEqual((0, utils_1.getOrderHash)(order));
    });
    it('orderToJSON is correct', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const quantity = 1;
        const amountInToken = 1.2;
        const paymentTokenAddress = constants_1.WDOT_ADDRESS;
        const extraBountyBasisPoints = 0;
        const expirationTime = Math.round(Date.now() / 1000 + 60); // one minute from now
        const englishAuctionReservePrice = 2;
        const tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
        const tokenAddress = constants_1.MYTHEREUM_ADDRESS;
        const order = await client._makeSellOrder({
            asset: { tokenAddress, tokenId },
            quantity,
            accountAddress,
            startAmount: amountInToken,
            paymentTokenAddress,
            extraBountyBasisPoints,
            buyerAddress: constants_2.NULL_ADDRESS,
            expirationTime,
            waitForHighestBid: true,
            englishAuctionReservePrice,
        });
        const hashedOrder = Object.assign(Object.assign({}, order), { hash: (0, utils_1.getOrderHash)(order) });
        const orderData = (0, pacific_js_1.orderToJSON)(hashedOrder);
        expect(orderData.quantity).toEqual(quantity.toString());
        expect(orderData.maker).toEqual(accountAddress);
        expect(orderData.taker).toEqual(constants_2.NULL_ADDRESS);
        // expect(orderData.basePrice).toEqual( WyvernProtocol.toBaseUnitAmount(makeBigNumber(amountInToken), 18).toString())
        expect(orderData.paymentToken).toEqual(paymentTokenAddress);
        expect(orderData.extra).toEqual(extraBountyBasisPoints.toString());
        expect(orderData.expirationTime).toEqual(expirationTime + constants_2.ORDER_MATCHING_LATENCY_SECONDS);
        // expect(orderData.englishAuctionReservePrice).toEqual( WyvernProtocol.toBaseUnitAmount(makeBigNumber(englishAuctionReservePrice), 18).toString())
    });
    test('API fetches tokens', async () => {
        const { tokens } = await constants_1.apiToTest.getPaymentTokens({ symbol: "MANA" });
        expect(Array.isArray(tokens)).toBe(true);
        expect(tokens.length).toEqual(1);
        expect(tokens[0].name).toEqual("Decentraland MANA");
    });
    test('Dev API orders have correct OpenSea url', async () => {
        const order = await constants_1.devApi.getOrder({});
        if (!order.asset) {
            return;
        }
        const url = `https://dev.opensea.io/assets/${order.asset.assetContract.address}/${order.asset.tokenId}`;
        expect(order.asset.openseaLink).toEqual(url);
    });
    test('Mainnet API orders have correct OpenSea url', async () => {
        const order = await constants_1.mainApi.getOrder({});
        if (!order.asset) {
            return;
        }
        const url = `https://opensea.io/assets/${order.asset.assetContract.address}/${order.asset.tokenId}`;
        expect(order.asset.openseaLink).toEqual(url);
    });
    it('API fetches orderbook', async () => {
        const { orders, count } = await constants_1.apiToTest.getOrders();
        expect(orders).toBeInstanceOf(Array);
        expect(count).toBeInstanceOf(Number);
        expect(orders.length).toEqual(constants_1.apiToTest.pageSize);
        // expect(orders.length).toBeGreaterThanOrEqual(count)
    });
    it('API can change page size', async () => {
        const defaultPageSize = constants_1.apiToTest.pageSize;
        constants_1.apiToTest.pageSize = 7;
        const { orders } = await constants_1.apiToTest.getOrders();
        expect(orders.length).toEqual(7);
        constants_1.apiToTest.pageSize = defaultPageSize;
    });
    if (constants_2.ORDERBOOK_VERSION > 0) {
        it('API orderbook paginates', async () => {
            const { orders, count } = await constants_1.apiToTest.getOrders();
            const pagination = await constants_1.apiToTest.getOrders({}, 2);
            expect(pagination.orders.length).toEqual(constants_1.apiToTest.pageSize);
            expect(pagination.orders[0]).not.toStrictEqual(orders[0]);
            expect(pagination.count).toEqual(count);
        });
    }
    it('API fetches orders for asset contract and asset', async () => {
        const forKitties = await constants_1.apiToTest.getOrders({ asset_contract_address: constants_1.CK_DEV_ADDRESS });
        expect(forKitties.orders.length).toBeGreaterThan(0);
        expect(forKitties.count).toBeGreaterThan(0);
        const forKitty = await constants_1.apiToTest.getOrders({ asset_contract_address: constants_1.CK_DEV_ADDRESS, token_id: constants_1.CK_DEV_TOKEN_ID });
        expect(forKitty.orders).toBeInstanceOf(Array);
    });
    it('API fetches orders for asset owner', async () => {
        const forOwner = await constants_1.apiToTest.getOrders({ owner: constants_1.ALICE_ADDRESS });
        expect(forOwner.orders.length).toBeGreaterThan(0);
        expect(forOwner.count).toBeGreaterThan(0);
        const owners = forOwner.orders.map((o) => o.asset && o.asset.owner && o.asset.owner.address);
        owners.forEach((owner) => {
            expect([constants_1.ALICE_ADDRESS, constants_2.NULL_ADDRESS]).toContain(owner);
        });
    });
    it('API fetches buy orders for maker', async () => {
        const forMaker = await constants_1.apiToTest.getOrders({ maker: constants_1.ALICE_ADDRESS, side: types_1.OrderSide.Buy });
        expect(forMaker.orders.length).toBeGreaterThan(0);
        expect(forMaker.count).toBeGreaterThan(0);
        forMaker.orders.forEach((order) => {
            expect(constants_1.ALICE_ADDRESS).toEqual(order.maker);
            expect(types_1.OrderSide.Buy).toEqual(order.side);
        });
    });
    ///NEEDED TEST 
    it.only("API  fetch  orders", async () => {
        let s = await constants_1.apiToTest.getOrder(englishSellOrderJSON);
        console.log(s);
    });
    it("API  post  orders", async () => {
        let s = await constants_1.apiToTest.postOrder(englishSellOrderJSON);
        console.log(s);
    });
    it("API  post  postAssetWhitelist", async () => {
        let s = await constants_1.apiToTest.postAssetWhitelist("tokenAddress: string", "tokenId: string | number", "email: string");
        console.log(s);
    });
    it("API doesn't fetch impossible orders", async () => {
        try {
            expect(await constants_1.apiToTest.getOrder({ maker: constants_1.ALICE_ADDRESS, taker: constants_1.ALICE_ADDRESS })).toThrow();
        }
        catch (e) {
            expect(e).toContain("Not found");
        }
    });
    it('API excludes cancelledOrFinalized and markedInvalid orders', async () => {
        const { orders } = await constants_1.apiToTest.getOrders({ limit: 100 });
        const finishedOrders = orders.filter((o) => o.cancelledOrFinalized);
        expect(finishedOrders).toHaveLength(0);
        const invalidOrders = orders.filter((o) => o.markedInvalid);
        expect(invalidOrders).toHaveLength(0);
    });
    ///NEEDED TEST 
    it('API fetches fees for an asset', async () => {
        const asset = await constants_1.apiToTest.getAsset({ tokenAddress: constants_1.CK_DEV_ADDRESS, tokenId: constants_1.CK_DEV_TOKEN_ID });
        expect(asset.tokenId).toEqual(constants_1.CK_DEV_TOKEN_ID.toString());
        expect(asset.assetContract.name).toEqual("CryptoKittiesDev");
        expect(asset.assetContract.sellerFeeBasisPoints).toEqual(constants_1.CK_DEV_SELLER_FEE);
    });
    it('API fetches assets', async () => {
        const { assets } = await constants_1.apiToTest.getAssets({ asset_contract_address: constants_1.CK_DEV_ADDRESS, order_by: "current_price" });
        expect(assets).toBeInstanceOf(Array);
        expect(assets.length).toEqual(constants_1.apiToTest.pageSize);
        const asset = assets[0];
        expect(asset.assetContract.name).toEqual("CryptoKittiesDev");
    });
    it('API handles errors', async () => {
        // 401 Unauthorized
        try {
            await constants_1.apiToTest.get('/user');
        }
        catch (error) {
            expect(error).toMatch("Unauthorized");
        }
        // 404 Not found
        try {
            await constants_1.apiToTest.get(`/asset/${constants_1.CK_DEV_ADDRESS}/0`);
        }
        catch (error) {
            expect(error).toMatch("Not found");
        }
        // 400 malformed
        const res = await constants_1.apiToTest.getOrders({
            // Get an old order to make sure listing time is too early
            listed_before: Math.round(Date.now() / 1000 - 3600)
        });
        const order = res.orders[0];
        expect(order).not.toBeNull();
        try {
            const newOrder = Object.assign(Object.assign({}, (0, pacific_js_1.orderToJSON)(order)), { v: 1, r: "", s: "" });
            await constants_1.apiToTest.postOrder(newOrder);
        }
        catch (error) {
            // TODO sometimes the error is "Expected the listing time to be at or past the current time"
            // expect(error.message).stringContaining("Order failed exchange validation")
        }
    });
});
//# sourceMappingURL=api.test.js.map