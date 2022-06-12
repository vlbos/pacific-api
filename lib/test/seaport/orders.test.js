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
exports.testMatchingNewOrder = exports.testMatchingOrder = void 0;
const api_1 = require("@polkadot/api");
const rpcs_json_1 = __importDefault(require("../../pacific-js/config/rpcs.json"));
const rpc = Object.assign({}, rpcs_json_1.default);
// import { makeOrderArrayEx, makeOrderEx, makeOrder, orderFromJSON } from '../orders/order'
const index_1 = require("../../pacific-js/index");
const types_1 = require("../../pacific-js/types");
const utils_1 = require("../../pacific-js/utils/utils");
const ordersJSONFixture = __importStar(require("../fixtures/orders.json"));
const bignumber_js_1 = require("bignumber.js");
const constants_1 = require("../constants");
const constants_2 = require("../../pacific-js/constants");
const ordersJSON = ordersJSONFixture;
const englishSellOrderJSON = ordersJSON[0];
//   const provider = new WsProvider('wss://kusama-rpc.polkadot.io');
// const provider = new WsProvider('wss://westend-rpc.polkadot.io/');
//   const provider = new WsProvider('ws://127.0.0.1:9944/');
const provider = new api_1.WsProvider('ws://127.0.0.1:9944/');
const devProvider = new api_1.WsProvider('ws://127.0.0.1:9944/');
let client;
let devClient;
(async function () {
    // let apip = await init(provider);
    // let api = apip.api;
    // console.log("============================",api)
    // client = new OpenSeaPort(provider, api, {
    //     networkName: Network.Main,
    //     apiKey: MAINNET_API_KEY
    // }, line => console.info(`MAINNET: ${line}`))
    // devClient = new OpenSeaPort(devProvider, api, {
    //     networkName: Network.Dev,
    //     apiKey: DEV_API_KEY
    // }, line => console.info(`DEV: ${line}`))
})();
// let client = new OpenSeaPort(provider,api, {
//     networkName: Network.Main,
//     apiKey: MAINNET_API_KEY
// }, line => console.info(`MAINNET: ${line}`))
// let  devClient = new OpenSeaPort(devProvider,api, {
//     networkName: Network.Dev,
//     apiKey: DEV_API_KEY
// }, line => console.info(`DEV: ${line}`))
const assetsForBundleOrder = [
    { tokenId: constants_1.MYTHEREUM_TOKEN_ID.toString(), tokenAddress: constants_1.MYTHEREUM_ADDRESS },
    { tokenId: constants_1.DIGITAL_ART_CHAIN_TOKEN_ID.toString(), tokenAddress: constants_1.DIGITAL_ART_CHAIN_ADDRESS },
];
const assetsForBulkTransfer = assetsForBundleOrder;
let manaAddress;
let daiAddress;
describe('seaport: orders', () => {
    beforeAll(async () => {
        jest.setTimeout(30000);
        // let apip = await init(provider);
        // let api = apip.api;
        // console.log("============================",api)
        client = new index_1.OpenSeaPort(provider, {
            networkName: types_1.Network.Main,
            apiKey: constants_1.MAINNET_API_KEY
        }, line => console.info(`MAINNET: ${line}`));
        devClient = new index_1.OpenSeaPort(devProvider, {
            networkName: types_1.Network.Dev,
            apiKey: constants_1.DEV_API_KEY
        }, line => console.info(`DEV: ${line}`));
        // await client.apipro();
        // daiAddress = (await client.api.getPaymentTokens({ symbol: 'DAI' })).tokens[0].address
        // manaAddress = (await client.api.getPaymentTokens({ symbol: 'MANA' })).tokens[0].address
    });
    afterAll(async () => {
        // await provider.disconnect();
        // await devProvider.disconnect();
        // await client.closeProvider();
        // jest.setTimeout(30000);
        // await client.apipro();
        // daiAddress = (await client.api.getPaymentTokens({ symbol: 'DAI' })).tokens[0].address
        // manaAddress = (await client.api.getPaymentTokens({ symbol: 'MANA' })).tokens[0].address
    });
    // console.log(ordersJSON)
    let s = Object.values(ordersJSON);
    s.map((orderJSON, index) => {
        it('Order #' + index + ' has correct types', () => {
            const order = (0, utils_1.orderFromJSON)(orderJSON);
            expect(order.basePrice).toBeInstanceOf(bignumber_js_1.BigNumber);
            expect(order.hash).toBeInstanceOf("string");
            expect(order.maker).toBeInstanceOf("string");
            expect(+order.quantity).toEqual(1);
        });
    });
    s.map((orderJSON, index) => {
        it('Order #' + index + ' has correct hash', () => {
            const order = (0, utils_1.orderFromJSON)(orderJSON);
            expect(order.hash).toEqual((0, utils_1.getOrderHash)(order));
        });
    });
    it("Correctly sets decimals on fungible order", async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const tokenId = constants_1.DISSOLUTION_TOKEN_ID.toString();
        const tokenAddress = constants_2.ENJIN_ADDRESS;
        const quantity = 1;
        const decimals = 2;
        const order = await client._makeSellOrder({
            asset: { tokenAddress, tokenId, decimals, schemaName: types_1.WyvernSchemaName.ERC1155 },
            quantity,
            accountAddress,
            startAmount: 2,
            extraBountyBasisPoints: 0,
            buyerAddress: constants_2.NULL_ADDRESS,
            expirationTime: 0,
            paymentTokenAddress: constants_2.NULL_ADDRESS,
            waitForHighestBid: false,
        });
        expect(order.quantity.toNumber()).toEqual(quantity * Math.pow(10, decimals));
    });
    it("Correctly errors for invalid sell order price parameters", async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const expirationTime = Math.round(Date.now() / 1000 + 60); // one minute from now
        const paymentTokenAddress = manaAddress;
        const tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
        const tokenAddress = constants_1.MYTHEREUM_ADDRESS;
        try {
            expect(await client._makeSellOrder({
                asset: { tokenAddress, tokenId },
                quantity: 1,
                accountAddress,
                startAmount: 2,
                extraBountyBasisPoints: 0,
                buyerAddress: constants_2.NULL_ADDRESS,
                expirationTime: 0,
                paymentTokenAddress,
                waitForHighestBid: true,
            })).toThrow();
        }
        catch (error) {
            expect(error).toContain('English auctions must have an expiration time');
        }
        try {
            expect(await client._makeSellOrder({
                asset: { tokenAddress, tokenId },
                quantity: 1,
                accountAddress,
                startAmount: 2,
                endAmount: 1,
                extraBountyBasisPoints: 0,
                buyerAddress: constants_2.NULL_ADDRESS,
                expirationTime,
                paymentTokenAddress: constants_2.NULL_ADDRESS,
                waitForHighestBid: true,
            })).toThrow();
        }
        catch (error) {
            expect(error).toContain('English auctions must use wrapped ETH');
        }
        try {
            expect(await client._makeSellOrder({
                asset: { tokenAddress, tokenId },
                quantity: 1,
                accountAddress,
                startAmount: 2,
                endAmount: 3,
                extraBountyBasisPoints: 0,
                buyerAddress: constants_2.NULL_ADDRESS,
                expirationTime,
                paymentTokenAddress: constants_2.NULL_ADDRESS,
                waitForHighestBid: false,
            })).toThrow();
        }
        catch (error) {
            expect(error).toContain('End price must be less than or equal to the start price');
        }
        try {
            expect(await client._makeSellOrder({
                asset: { tokenAddress, tokenId },
                quantity: 1,
                accountAddress,
                startAmount: 2,
                endAmount: 1,
                extraBountyBasisPoints: 0,
                buyerAddress: constants_2.NULL_ADDRESS,
                expirationTime: 0,
                paymentTokenAddress: constants_2.NULL_ADDRESS,
                waitForHighestBid: false,
            })).toThrow();
        }
        catch (error) {
            expect(error).toContain('Expiration time must be set if order will change in price');
        }
        try {
            expect(await client._makeSellOrder({
                asset: { tokenAddress, tokenId },
                quantity: 1,
                accountAddress,
                startAmount: 2,
                listingTime: Math.round(Date.now() / 1000 - 60),
                extraBountyBasisPoints: 0,
                buyerAddress: constants_2.NULL_ADDRESS,
                expirationTime: 0,
                paymentTokenAddress: constants_2.NULL_ADDRESS,
                waitForHighestBid: false,
            })).toThrow();
        }
        catch (error) {
            expect(error).toContain('Listing time cannot be in the past');
        }
        try {
            expect(await client._makeSellOrder({
                asset: { tokenAddress, tokenId },
                quantity: 1,
                accountAddress,
                startAmount: 2,
                listingTime: Math.round(Date.now() / 1000 + 20),
                extraBountyBasisPoints: 0,
                buyerAddress: constants_2.NULL_ADDRESS,
                expirationTime,
                paymentTokenAddress,
                waitForHighestBid: true,
            })).toThrow();
        }
        catch (error) {
            expect(error).toContain('Cannot schedule an English auction for the future');
        }
        // try {
        //     let a:any = await client._makeSellOrder({
        //         asset: { tokenAddress, tokenId },
        //         quantity: 1,
        //         accountAddress,
        //         startAmount: 2,
        //         extraBountyBasisPoints: 0,
        //         buyerAddress: NULL_ADDRESS,
        //         expirationTime,
        //         paymentTokenAddress,
        //         waitForHighestBid: false,
        //         englishAuctionReservePrice: 1
        //     });
        //     exepct(a).toThrow()
        // } catch (error) {
        //     expect(error).toContain('Reserve prices may only be set on English auctions')
        // }
        try {
            expect(await client._makeSellOrder({
                asset: { tokenAddress, tokenId },
                quantity: 1,
                accountAddress,
                startAmount: 2,
                extraBountyBasisPoints: 0,
                buyerAddress: constants_2.NULL_ADDRESS,
                expirationTime,
                paymentTokenAddress,
                waitForHighestBid: true,
                englishAuctionReservePrice: 1
            })).toThrow();
        }
        catch (error) {
            expect(error).toContain('Reserve price must be greater than or equal to the start amount');
        }
    });
    it("Correctly errors for invalid buy order price parameters", async () => {
        const accountAddress = constants_1.ALICE_STASH_ADDRESS;
        const expirationTime = Math.round(Date.now() / 1000 + 60); // one minute from now
        const tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
        const tokenAddress = constants_1.MYTHEREUM_ADDRESS;
        try {
            expect(await client._makeBuyOrder({
                asset: { tokenAddress, tokenId },
                quantity: 1,
                accountAddress,
                startAmount: 2,
                extraBountyBasisPoints: 0,
                expirationTime,
                paymentTokenAddress: constants_2.NULL_ADDRESS
            })).toThrow();
        }
        catch (error) {
            expect(error).toContain('Offers must use wrapped ETH or an ERC-20 token');
        }
    });
    it('Cannot yet match a new English auction sell order, bountied', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_STASH_ADDRESS;
        const amountInToken = 1.2;
        const paymentTokenAddress = constants_1.WDOT_ADDRESS;
        const expirationTime = Math.round(Date.now() / 1000 + 60); // one minute from now
        const bountyPercent = 1.1;
        const tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
        const tokenAddress = constants_1.MYTHEREUM_ADDRESS;
        const asset = await client.api.getAsset({ tokenAddress, tokenId });
        const order = await client._makeSellOrder({
            asset: { tokenAddress, tokenId },
            quantity: 1,
            accountAddress,
            startAmount: amountInToken,
            paymentTokenAddress,
            extraBountyBasisPoints: bountyPercent * 100,
            buyerAddress: constants_2.NULL_ADDRESS,
            expirationTime,
            waitForHighestBid: true,
        });
        expect(order.taker).toEqual(constants_2.NULL_ADDRESS);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInToken);
        expect(order.extra.toNumber()).toEqual(0);
        // Make sure there's gap time to expire it
        expect(order.expirationTime.toNumber()).toBeGreaterThan(expirationTime);
        // Make sure it's listed in the future
        expect(order.listingTime.toNumber()).toEqual(expirationTime);
        await client._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is impossible
        try {
            expect(await testMatchingNewOrder(order, takerAddress, expirationTime + 100)).toThrow();
        }
        catch (error) {
            expect(error).toContain("Buy-side order is set in the future or expired");
        }
    });
    it.skip('Can match a finished English auction sell order', async () => {
        const makerAddress = constants_1.ALICE_STASH_ADDRESS;
        const takerAddress = constants_1.ALICE_ADDRESS;
        const matcherAddress = constants_1.CHARLIE_ADDRESS;
        const now = Math.round(Date.now() / 1000);
        // Get bid from server
        const paymentTokenAddress = constants_1.WDOT_ADDRESS;
        const { orders } = await devClient.api.getOrders({
            side: types_1.OrderSide.Buy,
            asset_contract_address: constants_1.CK_DEV_ADDRESS,
            token_id: constants_1.CK_DEV_TOKEN_ID,
            payment_token_address: paymentTokenAddress,
            maker: makerAddress
        });
        const buy = orders[0];
        expect(buy).toBeDefined();
        expect(buy.asset).toBeDefined();
        if (!buy || !buy.asset) {
            return;
        }
        // Make sure it's listed in the past
        expect(buy.listingTime.toNumber()).toBeLessThan(now);
        //testFeesMakerOrder(buy, buy.asset.collection)
        const sell = (0, utils_1.orderFromJSON)(englishSellOrderJSON);
        expect(+sell.quantity).toEqual(1);
        expect(sell.feeRecipient).toEqual(constants_2.NULL_ADDRESS);
        expect(sell.paymentToken).toEqual(paymentTokenAddress);
        /* Requirements in Wyvern contract for funds transfer. */
        expect(buy.takerRelayerFee.toNumber()).toBeLessThanOrEqual(sell.takerRelayerFee.toNumber());
        expect(buy.takerProtocolFee.toNumber()).toBeLessThanOrEqual(sell.takerProtocolFee.toNumber());
        const sellPrice = await devClient.getCurrentPrice(sell);
        const buyPrice = await devClient.getCurrentPrice(buy);
        expect(buyPrice.toNumber()).toBeGreaterThanOrEqual(sellPrice.toNumber());
        console.info(`Matching two orders that differ in price by ${buyPrice.toNumber() - sellPrice.toNumber()}`);
        await devClient._buyOrderValidationAndApprovals({ order: buy, accountAddress: makerAddress });
        await devClient._sellOrderValidationAndApprovals({ order: sell, accountAddress: takerAddress });
        const gas = await devClient._estimateGasForMatch({ buy, sell, accountAddress: matcherAddress });
        expect(gas || 0).toBeGreaterThan(0);
        console.info(`Match gas cost: ${gas}`);
    });
    it('Ensures buy order compatibility with an English sell order', async () => {
        const accountAddress = constants_1.ALICE_STASH_ADDRESS;
        const takerAddress = constants_1.ALICE_ADDRESS;
        const paymentTokenAddress = constants_1.WDOT_ADDRESS;
        const amountInToken = 0.01;
        const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24); // one day from now
        const extraBountyBasisPoints = 1.1 * 100;
        const tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
        const tokenAddress = constants_1.MYTHEREUM_ADDRESS;
        const asset = await client.api.getAsset({ tokenAddress, tokenId });
        const sellOrder = await client._makeSellOrder({
            asset: { tokenAddress, tokenId },
            quantity: 1,
            accountAddress: takerAddress,
            startAmount: amountInToken,
            paymentTokenAddress,
            expirationTime,
            extraBountyBasisPoints,
            buyerAddress: constants_2.NULL_ADDRESS,
            waitForHighestBid: true,
        });
        const buyOrder = await client._makeBuyOrder({
            asset: { tokenAddress, tokenId, schemaName: types_1.WyvernSchemaName.ERC721 },
            quantity: 1,
            accountAddress,
            paymentTokenAddress,
            startAmount: amountInToken,
            expirationTime: 0,
            extraBountyBasisPoints: 0,
            sellOrder,
        });
        //testFeesMakerOrder(buyOrder, asset.collection)
        expect(sellOrder.taker).toEqual(constants_2.NULL_ADDRESS);
        expect(buyOrder.taker).toEqual(sellOrder.maker);
        expect(buyOrder.makerRelayerFee.toNumber()).toEqual(sellOrder.makerRelayerFee.toNumber());
        expect(buyOrder.takerRelayerFee.toNumber()).toEqual(sellOrder.takerRelayerFee.toNumber());
        expect(buyOrder.makerProtocolFee.toNumber()).toEqual(sellOrder.makerProtocolFee.toNumber());
        expect(buyOrder.takerProtocolFee.toNumber()).toEqual(sellOrder.takerProtocolFee.toNumber());
        await client._buyOrderValidationAndApprovals({ order: buyOrder, accountAddress });
        await client._sellOrderValidationAndApprovals({ order: sellOrder, accountAddress: takerAddress });
    });
    ///TEST NEEDED
    it.skip("Creates ENS name buy order", async () => {
        const paymentTokenAddress = constants_1.WDOT_ADDRESS;
        const buyOrder = await devClient._makeBuyOrder({
            asset: {
                tokenId: constants_1.ENS_HELLO_TOKEN_ID,
                tokenAddress: constants_1.ENS_DEV_TOKEN_ADDRESS,
                name: constants_1.ENS_HELLO_NAME,
                schemaName: types_1.WyvernSchemaName.ENSShortNameAuction,
            },
            quantity: 1,
            accountAddress: constants_1.ENS_DEV_SHORT_NAME_OWNER,
            paymentTokenAddress,
            startAmount: 0.01,
            expirationTime: Math.round(Date.now() / 1000 + 60 * 60 * 24),
            extraBountyBasisPoints: 0,
        });
        // TODO (joshuawu): Fill this test out after backend supports ENS short names.
        // expect(buyOrder).toEqual( {})
    });
    it("Matches a private sell order, doesn't for wrong taker", async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_STASH_ADDRESS;
        const amountInToken = 2;
        const bountyPercent = 0;
        const tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
        const tokenAddress = constants_1.MYTHEREUM_ADDRESS;
        const asset = await client.api.getAsset({ tokenAddress, tokenId });
        const order = await client._makeSellOrder({
            asset: { tokenAddress, tokenId },
            quantity: 1,
            accountAddress,
            startAmount: amountInToken,
            extraBountyBasisPoints: bountyPercent * 100,
            buyerAddress: takerAddress,
            expirationTime: 0,
            paymentTokenAddress: constants_2.NULL_ADDRESS,
            waitForHighestBid: false,
        });
        expect(order.paymentToken).toEqual(constants_2.NULL_ADDRESS);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInToken);
        expect(order.extra.toNumber()).toEqual(0);
        expect(order.expirationTime.toNumber()).toEqual(0);
        //testFeesMakerOrder(order, asset.collection, bountyPercent * 100)
        await client._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        expect(await testMatchingNewOrder(order, takerAddress)).toThrow();
        // Make sure no one else can take it
        try {
            await testMatchingNewOrder(order, constants_1.CHARLIE_ADDRESS);
        }
        catch (e) {
            // It works!
            return;
        }
    });
    it('Matches a new dutch sell order of a small amount of ERC-20 item (DAI) for ETH', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_STASH_ADDRESS;
        const amountInEth = 0.012;
        const tokenId = null;
        const tokenAddress = daiAddress;
        const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);
        const order = await client._makeSellOrder({
            asset: { tokenAddress, tokenId, schemaName: types_1.WyvernSchemaName.ERC20 },
            quantity: Math.pow(10, 18) * 0.01,
            accountAddress,
            startAmount: amountInEth,
            endAmount: 0,
            paymentTokenAddress: constants_2.NULL_ADDRESS,
            extraBountyBasisPoints: 0,
            buyerAddress: constants_2.NULL_ADDRESS,
            expirationTime,
            waitForHighestBid: false,
        });
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth);
        expect(order.extra.toNumber()).toEqual(Math.pow(10, 18) * amountInEth);
        expect(order.expirationTime.toNumber()).toEqual(expirationTime);
        await client._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        await testMatchingNewOrder(order, takerAddress);
    });
    it('Matches a new sell order of an 1155 item for ETH', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_STASH_ADDRESS;
        const amountInEth = 2;
        const tokenId = constants_1.CATS_IN_MECHS_ID;
        const tokenAddress = constants_2.ENJIN_ADDRESS;
        const asset = await client.api.getAsset({ tokenAddress, tokenId });
        const order = await client._makeSellOrder({
            asset: { tokenAddress, tokenId, schemaName: types_1.WyvernSchemaName.ERC1155 },
            quantity: 1,
            accountAddress,
            startAmount: amountInEth,
            paymentTokenAddress: constants_2.NULL_ADDRESS,
            extraBountyBasisPoints: 0,
            buyerAddress: constants_2.NULL_ADDRESS,
            expirationTime: 0,
            waitForHighestBid: false,
        });
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth);
        expect(order.extra.toNumber()).toEqual(0);
        expect(order.expirationTime.toNumber()).toEqual(0);
        //testFeesMakerOrder(order, asset.collection)
        await client._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        await testMatchingNewOrder(order, takerAddress);
    });
    it('Matches a buy order of an 1155 item for W-ETH', async () => {
        const accountAddress = constants_1.ALICE_STASH_ADDRESS;
        const takerAddress = constants_1.ALICE_ADDRESS;
        const paymentToken = constants_1.WDOT_ADDRESS;
        const amountInToken = 0.01;
        const tokenId = constants_1.DISSOLUTION_TOKEN_ID;
        const tokenAddress = constants_2.ENJIN_ADDRESS;
        const asset = await client.api.getAsset({ tokenAddress, tokenId });
        const order = await client._makeBuyOrder({
            asset: { tokenAddress, tokenId, schemaName: types_1.WyvernSchemaName.ERC1155 },
            quantity: 1,
            accountAddress,
            startAmount: amountInToken,
            paymentTokenAddress: paymentToken,
            expirationTime: 0,
            extraBountyBasisPoints: 0,
        });
        expect(order.taker).toEqual(constants_2.NULL_ADDRESS);
        expect(order.paymentToken).toEqual(paymentToken);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInToken);
        expect(order.extra.toNumber()).toEqual(0);
        expect(order.expirationTime.toNumber()).toEqual(0);
        //testFeesMakerOrder(order, asset.collection)
        await client._buyOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        await testMatchingNewOrder(order, takerAddress);
    });
    ///TEST NEEDED  OK
    it('Matches a new bountied sell order for an ERC-20 token (MANA)', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_STASH_ADDRESS;
        const paymentToken = (await client.api.getPaymentTokens({ symbol: 'MANA' })).tokens[0];
        const amountInToken = 5000;
        const bountyPercent = 1;
        const tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
        const tokenAddress = constants_1.MYTHEREUM_ADDRESS;
        const asset = await client.api.getAsset({ tokenAddress, tokenId });
        const order = await client._makeSellOrder({
            asset: { tokenAddress, tokenId },
            quantity: 1,
            accountAddress,
            startAmount: amountInToken,
            paymentTokenAddress: paymentToken.address,
            extraBountyBasisPoints: bountyPercent * 100,
            buyerAddress: constants_2.NULL_ADDRESS,
            expirationTime: 0,
            waitForHighestBid: false,
        });
        console.log(order);
        expect(order.paymentToken).toEqual(paymentToken.address);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, paymentToken.decimals) * amountInToken);
        expect(order.extra.toNumber()).toEqual(0);
        expect(order.expirationTime.toNumber()).toEqual(0);
        //testFeesMakerOrder(order, asset.collection, bountyPercent * 100)
        await client._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        await testMatchingNewOrder(order, takerAddress);
    });
    ///TEST NEEDED OK
    it('Matches a buy order with an ERC-20 token (DAI)', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_STASH_ADDRESS;
        const paymentToken = (await client.api.getPaymentTokens({ symbol: 'DAI' })).tokens[0];
        const amountInToken = 3;
        const tokenId = constants_1.CK_TOKEN_ID.toString();
        const tokenAddress = constants_1.CK_ADDRESS;
        const asset = await client.api.getAsset({ tokenAddress, tokenId });
        // console.log("================",tokenAddress)
        // console.log(asset,paymentToken)
        let order = await client._makeBuyOrder({
            asset: { tokenAddress, tokenId },
            quantity: 1,
            accountAddress,
            startAmount: amountInToken,
            paymentTokenAddress: paymentToken.address,
            expirationTime: 0,
            extraBountyBasisPoints: 0,
        });
        console.log(order);
        expect(order.taker).toEqual(constants_2.NULL_ADDRESS);
        expect(order.paymentToken).toEqual(paymentToken.address);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, paymentToken.decimals) * amountInToken);
        expect(order.extra.toNumber()).toEqual(0);
        expect(order.expirationTime.toNumber()).toEqual(0);
        // testFeesMakerOrder(order, asset.collection)
        // // console.log(order)
        // await client._buyOrderValidationAndApprovals({ order, accountAddress })
        // // Make sure match is valid
        // await testMatchingNewOrder(order, takerAddress)
    });
    it('Serializes payment token and matches most recent ERC-20 sell order', async () => {
        const takerAddress = constants_1.ALICE_ADDRESS;
        const order = await client.api.getOrder({
            side: types_1.OrderSide.Sell,
            payment_token_address: manaAddress
        });
        expect(order.paymentTokenContract).not.toBeNull();
        if (!order.paymentTokenContract) {
            return;
        }
        expect(order.paymentTokenContract.address).toEqual(manaAddress);
        expect(order.paymentToken).toEqual(manaAddress);
        // TODO why can't we test atomicMatch?
        await testMatchingOrder(order, takerAddress, false);
    });
    it('Bulk transfer', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_STASH_ADDRESS;
        const gas = await client._estimateGasForTransfer({
            assets: assetsForBulkTransfer,
            fromAddress: accountAddress,
            toAddress: takerAddress
        });
        expect(gas).toBeGreaterThan(0);
    });
    test('Fungible tokens filter', async () => {
        const manaTokens = (await client.api.getPaymentTokens({ symbol: "MANA" })).tokens;
        expect(manaTokens.length).toEqual(1);
        const mana = manaTokens[0];
        expect(mana).not.toBeNull();
        expect(mana.name).toEqual("Decentraland MANA");
        expect(mana.address).toEqual("0x0f5d2fb29fb7d3cfee444a200298f468908cc942");
        expect(mana.decimals).toEqual(18);
        const dai = (await client.api.getPaymentTokens({ symbol: "DAI" })).tokens[0];
        expect(dai).not.toBeNull();
        expect(dai.name).toEqual("Dai Stablecoin");
        expect(dai.decimals).toEqual(18);
        const all = await client.api.getPaymentTokens();
        expect(all).not.toHaveLength(0);
    });
    it('orderToJSON computes correct current price for Dutch auctions', async () => {
        const { orders } = await client.api.getOrders({ sale_kind: types_1.SaleKind.DutchAuction });
        expect(orders.length).toEqual(client.api.pageSize);
        orders.map((order) => {
            expect(order.currentPrice).not.toBeNull();
            const buyerFeeBPS = order.asset
                ? order.asset.assetContract.buyerFeeBasisPoints
                : order.assetBundle && order.assetBundle.assetContract
                    ? order.assetBundle.assetContract.buyerFeeBasisPoints
                    : null;
            if (!order.currentPrice || buyerFeeBPS) {
                // Skip checks with buyer fees
                return;
            }
            const multiple = order.side == types_1.OrderSide.Sell
                ? +order.takerRelayerFee / constants_2.INVERSE_BASIS_POINT + 1
                : 1;
            // Possible race condition
            expect(order.currentPrice.toPrecision(3)).toEqual((0, utils_1.estimateCurrentPrice)(order).toPrecision(3));
            expect(order.basePrice.times(multiple).toNumber()).toBeGreaterThanOrEqual(order.currentPrice.toNumber());
        });
    });
    it('orderToJSON current price includes buyer fee', async () => {
        const { orders } = await client.api.getOrders({
            sale_kind: types_1.SaleKind.FixedPrice,
            asset_contract_address: constants_1.CRYPTOFLOWERS_CONTRACT_ADDRESS_WITH_BUYER_FEE,
            bundled: false,
            side: types_1.OrderSide.Sell,
            is_english: false
        });
        expect(orders).not.toHaveLength(0);
        orders.map((order) => {
            expect(order.currentPrice).not.toBeNull();
            expect(order.asset).not.toBeNull();
            if (!order.currentPrice || !order.asset) {
                return;
            }
            const buyerFeeBPS = order.takerRelayerFee;
            const multiple = +buyerFeeBPS / constants_2.INVERSE_BASIS_POINT + 1;
            expect(order.basePrice.times(multiple).toNumber()).toEqual((0, utils_1.estimateCurrentPrice)(order).toNumber());
        });
    });
    ///TEST NEEDED
    it('orderToJSON current price does not include buyer fee for English auctions', async () => {
        const { orders } = await client.api.getOrders({
            side: types_1.OrderSide.Sell,
            is_english: true
        });
        expect(orders).not.toHaveLength(0);
        orders.map((order) => {
            expect(order.currentPrice).not.toBeNull();
            expect(order.asset).not.toBeNull();
            if (!order.currentPrice || !order.asset) {
                return;
            }
            expect(order.basePrice.toNumber()).toEqual((0, utils_1.estimateCurrentPrice)(order).toNumber());
        });
    });
    it.skip('Matches first buy order in book', async () => {
        const order = await client.api.getOrder({ side: types_1.OrderSide.Buy });
        expect(order).not.toBeNull();
        if (!order) {
            return;
        }
        const assetOrBundle = order.asset || order.assetBundle;
        expect(assetOrBundle).not.toBeNull();
        if (!assetOrBundle) {
            return;
        }
        const takerAddress = order.maker;
        // Taker might not have all approval permissions so only test match
        await testMatchingOrder(order, takerAddress, false);
    });
    ///TEST NEEDED
    it('Matches a buy order and estimates gas on fulfillment', async () => {
        // Need to use a taker who has created a proxy and approved W-ETH already
        const takerAddress = constants_1.ALICE_ADDRESS;
        const order = await client.api.getOrder({
            side: types_1.OrderSide.Buy,
            owner: takerAddress,
            // Use a token that has already been approved via approve-all
            asset_contract_address: constants_1.DIGITAL_ART_CHAIN_ADDRESS
        });
        expect(order).not.toBeNull();
        if (!order) {
            return;
        }
        expect(order.asset).not.toBeNull();
        if (!order.asset) {
            return;
        }
        await testMatchingOrder(order, takerAddress, true);
    });
    it('  cancel order', async () => {
        // Need to use a taker who has created a proxy and approved W-ETH already
        const accountAddress = constants_1.ALICE_ADDRESS;
        let order = await client.api.getOrder({
            side: types_1.OrderSide.Buy,
            owner: accountAddress,
            // Use a token that has already been approved via approve-all
            asset_contract_address: constants_1.DIGITAL_ART_CHAIN_ADDRESS
        });
        expect(order).not.toBeNull();
        if (!order) {
            return;
        }
        expect(order.asset).not.toBeNull();
        if (!order.asset) {
            return;
        }
        // order = await getOrderP(order,[accountAddress])
        await client.cancelOrder({ order, accountAddress });
    });
    it.only('Matches a buy order and  fulfillment', async () => {
        // Need to use a taker who has created a proxy and approved W-ETH already
        let accountAddress = constants_1.BOB_ADDRESS;
        let order = await client.api.getOrder({
            side: types_1.OrderSide.Buy,
            owner: accountAddress,
            // Use a token that has already been approved via approve-all
            asset_contract_address: constants_1.DIGITAL_ART_CHAIN_ADDRESS
        });
        order.side = types_1.OrderSide.Buy;
        let recipientAddress = order.side === types_1.OrderSide.Sell ? constants_1.ALICE_ADDRESS : accountAddress;
        const matchingOrder = client._makeMatchingOrder({
            order,
            accountAddress,
            recipientAddress
        });
        order.calldata = matchingOrder.calldata;
        order.replacementPattern = matchingOrder.replacementPattern;
        // console.log("======order=====", order)
        order.side = types_1.OrderSide.Sell;
        recipientAddress = order.side === types_1.OrderSide.Sell ? constants_1.ALICE_STASH_ADDRESS : accountAddress;
        expect(order).not.toBeNull();
        if (!order) {
            console.log("===========");
            return;
        }
        expect(order.asset).not.toBeNull();
        if (!order.asset) {
            console.log("======d=====");
            return;
        }
        // let calldata = await client.encodeTransferAll({
        //     assets: [{
        //         tokenId: null,
        //         tokenAddress: "5FedJTj4z2T9EqcqwGMsksMd2dc6fC7cxaeAm6fcE8ZXdqtP",
        //         schemaName: WyvernSchemaName.ERC20
        //     }, {
        //         tokenId: null,
        //         tokenAddress: "5D4LDS32J567Dh46TEihGDM8V9tKoX497e6FPJKn9HMwYquN",
        //         schemaName: WyvernSchemaName.ERC20
        //     }],
        //     fromAddress: ALICE_ADDRESS,
        //     toAddress: "5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL",
        //     schemaName: WyvernSchemaName.ERC20
        // })
        // console.log(calldata)
        // console.log(calldata.slice(calldata.indexOf("557efb0c")))
        // calldata = "0x" + calldata.slice(calldata.indexOf("557efb0c"));
        // await client.initParameters(
        //     "5HjfpJY1udFo143xVCoGwd2zVB5N4brbySru2yzVfTGy6x9f",
        //     EVE_ADDRESS
        // );
        order.exchange = "5HjfpJY1udFo143xVCoGwd2zVB5N4brbySru2yzVfTGy6x9f";
        await client.fulfillOrder({ order, accountAddress, recipientAddress });
    });
    it('Matches a referred order via sell_orders and getAssets', async () => {
        const { assets } = await client.api.getAssets({ asset_contract_address: constants_1.CRYPTO_CRYSTAL_ADDRESS, order_by: "current_price", order_direction: "desc" });
        const asset = assets.filter((a) => !!a.sellOrders)[0];
        expect(asset).not.toBeNull();
        if (!asset || !asset.sellOrders) {
            return;
        }
        const order = asset.sellOrders[0];
        expect(order).not.toBeNull();
        if (!order) {
            return;
        }
        // Make sure match is valid
        const takerAddress = constants_1.ALICE_ADDRESS;
        const referrerAddress = constants_1.ALICE_STASH_ADDRESS;
        await testMatchingOrder(order, takerAddress, true, referrerAddress);
    });
});
async function testMatchingOrder(order, accountAddress, testAtomicMatch = false, referrerAddress) {
    // Test a separate recipient for sell orders
    const recipientAddress = order.side === types_1.OrderSide.Sell ? constants_1.ALICE_STASH_ADDRESS : accountAddress;
    const matchingOrder = client._makeMatchingOrder({
        order,
        accountAddress,
        recipientAddress
    });
    expect(matchingOrder.hash).toEqual((0, utils_1.getOrderHash)(matchingOrder));
    const { buy, sell } = (0, utils_1.assignOrdersToSides)(order, matchingOrder);
    if (!order.waitingForBestCounterOrder) {
        const isValid = await client._validateMatch({ buy, sell, accountAddress });
        expect(isValid).toBeTruthy();
    }
    else {
        console.info(`English Auction detected, skipping validation`);
    }
    if (testAtomicMatch && !order.waitingForBestCounterOrder) {
        const isValid = await client._validateOrder(order);
        expect(isValid).toBeTruthy();
        const isFulfillable = await client.isOrderFulfillable({
            order,
            accountAddress,
            recipientAddress,
            referrerAddress
        });
        expect(isFulfillable).toBeTruthy();
        const gasPrice = await client._computeGasPrice();
        console.info(`Gas price to use: ${gasPrice} gwei`);
    }
}
exports.testMatchingOrder = testMatchingOrder;
async function testMatchingNewOrder(unhashedOrder, accountAddress, counterOrderListingTime) {
    const order = Object.assign(Object.assign({}, unhashedOrder), { hash: (0, utils_1.getOrderHash)(unhashedOrder) });
    const matchingOrder = client._makeMatchingOrder({
        order,
        accountAddress,
        recipientAddress: accountAddress
    });
    if (counterOrderListingTime != null) {
        matchingOrder.listingTime = (0, utils_1.makeBigNumber)(counterOrderListingTime);
        matchingOrder.hash = (0, utils_1.getOrderHash)(matchingOrder);
    }
    expect(matchingOrder.hash).toEqual((0, utils_1.getOrderHash)(matchingOrder));
    // Test fees
    expect(matchingOrder.makerProtocolFee.toNumber()).toEqual(0);
    expect(matchingOrder.takerProtocolFee.toNumber()).toEqual(0);
    if (order.waitingForBestCounterOrder) {
        expect(matchingOrder.feeRecipient).toEqual(constants_2.OPENSEA_FEE_RECIPIENT);
    }
    else {
        expect(matchingOrder.feeRecipient).toEqual(constants_2.NULL_ADDRESS);
    }
    expect(matchingOrder.makerRelayerFee.toNumber()).toEqual(order.makerRelayerFee.toNumber());
    expect(matchingOrder.takerRelayerFee.toNumber()).toEqual(order.takerRelayerFee.toNumber());
    expect(matchingOrder.makerReferrerFee.toNumber()).toEqual(order.makerReferrerFee.toNumber());
    const v = 27;
    const r = '';
    const s = '';
    let buy;
    let sell;
    if (order.side == types_1.OrderSide.Buy) {
        buy = Object.assign(Object.assign({}, order), { v, r, s });
        sell = Object.assign(Object.assign({}, matchingOrder), { v, r, s });
    }
    else {
        sell = Object.assign(Object.assign({}, order), { v, r, s });
        buy = Object.assign(Object.assign({}, matchingOrder), { v, r, s });
    }
    const isValid = await client._validateMatch({ buy, sell, accountAddress });
    expect(isValid).toBeTruthy();
    // Make sure assets are transferrable
    await Promise.all(getAssetsAndQuantities(order).map(async ({ asset, quantity }) => {
        const fromAddress = sell.maker;
        const toAddress = buy.maker;
        const useProxy = asset.tokenAddress === constants_1.CK_ADDRESS || asset.schemaName === types_1.WyvernSchemaName.ERC20;
        const isTransferrable = await client.isAssetTransferrable({
            asset,
            quantity,
            fromAddress,
            toAddress,
            useProxy,
        });
        expect(isTransferrable).toBeTruthy(); // `Not transferrable: ${asset.tokenAddress} # ${asset.tokenId} schema ${asset.schemaName} quantity ${quantity} from ${fromAddress} to ${toAddress} using proxy: ${useProxy}`
    }));
}
exports.testMatchingNewOrder = testMatchingNewOrder;
function getAssetsAndQuantities(order) {
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
    expect(wyAssets).not.toHaveLength(0);
    expect(wyAssets.length).toEqual(schemaNames.length);
    return wyAssets.map((wyAsset, i) => {
        const asset = {
            tokenId: 'id' in wyAsset && wyAsset.id != null ? wyAsset.id : null,
            tokenAddress: wyAsset.address,
            schemaName: schemaNames[i]
        };
        if ('quantity' in wyAsset) {
            return { asset, quantity: new bignumber_js_1.BigNumber(wyAsset.quantity) };
        }
        else {
            return { asset, quantity: new bignumber_js_1.BigNumber(1) };
        }
    });
}
//# sourceMappingURL=orders.test.js.map