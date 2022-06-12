"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFeesMakerOrder = void 0;
const index_1 = require("../../pacific-js/index");
const types_1 = require("../../pacific-js/types");
const utils_1 = require("../../pacific-js/utils/utils");
const constants_1 = require("../constants");
const constants_2 = require("../../pacific-js/constants");
// const provider = new Web3.providers.HttpProvider(MAINNET_PROVIDER_URL)
const api_1 = require("@polkadot/api");
const provider = new api_1.WsProvider('ws://127.0.0.1:9944/');
// const devProvider = new WsProvider('ws://127.0.0.1:9944/');
let client;
let asset;
const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24); // one day from now
describe('seaport: fees', () => {
    beforeAll(async () => {
        client = new index_1.OpenSeaPort(provider, {
            networkName: types_1.Network.Dev,
            apiKey: constants_1.MAINNET_API_KEY
        }, line => console.info(`MAINNET: ${line}`));
        const tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
        const tokenAddress = constants_1.MYTHEREUM_ADDRESS;
        asset = await client.api.getAsset({ tokenAddress, tokenId });
        expect(asset).not.toBeNull();
    });
    test("Computes fees correctly for non-zero-fee asset", async () => {
        const bountyPercent = 1.5;
        const extraBountyBasisPoints = bountyPercent * 100;
        const collection = asset.collection;
        const buyerFeeBasisPoints = collection.openseaBuyerFeeBasisPoints + collection.devBuyerFeeBasisPoints;
        const sellerFeeBasisPoints = collection.openseaSellerFeeBasisPoints + collection.devSellerFeeBasisPoints;
        const buyerFees = await client.computeFees({
            asset,
            extraBountyBasisPoints,
            side: types_1.OrderSide.Buy
        });
        expect(buyerFees.totalBuyerFeeBasisPoints).toEqual(buyerFeeBasisPoints);
        expect(buyerFees.totalSellerFeeBasisPoints).toEqual(sellerFeeBasisPoints);
        expect(buyerFees.devBuyerFeeBasisPoints).toEqual(collection.devBuyerFeeBasisPoints);
        expect(buyerFees.devSellerFeeBasisPoints).toEqual(collection.devSellerFeeBasisPoints);
        expect(buyerFees.openseaBuyerFeeBasisPoints).toEqual(collection.openseaBuyerFeeBasisPoints);
        expect(buyerFees.openseaSellerFeeBasisPoints).toEqual(collection.openseaSellerFeeBasisPoints);
        expect(buyerFees.sellerBountyBasisPoints).toEqual(0);
        const sellerFees = await client.computeFees({
            asset,
            extraBountyBasisPoints,
            side: types_1.OrderSide.Sell
        });
        expect(sellerFees.totalBuyerFeeBasisPoints).toEqual(buyerFeeBasisPoints);
        expect(sellerFees.totalSellerFeeBasisPoints).toEqual(sellerFeeBasisPoints);
        expect(sellerFees.devBuyerFeeBasisPoints).toEqual(collection.devBuyerFeeBasisPoints);
        expect(sellerFees.devSellerFeeBasisPoints).toEqual(collection.devSellerFeeBasisPoints);
        expect(sellerFees.openseaBuyerFeeBasisPoints).toEqual(collection.openseaBuyerFeeBasisPoints);
        expect(sellerFees.openseaSellerFeeBasisPoints).toEqual(collection.openseaSellerFeeBasisPoints);
        expect(sellerFees.sellerBountyBasisPoints).toEqual(extraBountyBasisPoints);
        const heterogenousBundleSellerFees = await client.computeFees({
            extraBountyBasisPoints,
            side: types_1.OrderSide.Sell
        });
        expect(heterogenousBundleSellerFees.totalBuyerFeeBasisPoints).toEqual(constants_2.DEFAULT_BUYER_FEE_BASIS_POINTS);
        expect(heterogenousBundleSellerFees.totalSellerFeeBasisPoints).toEqual(constants_2.DEFAULT_SELLER_FEE_BASIS_POINTS);
        expect(heterogenousBundleSellerFees.devBuyerFeeBasisPoints).toEqual(0);
        expect(heterogenousBundleSellerFees.devSellerFeeBasisPoints).toEqual(0);
        expect(heterogenousBundleSellerFees.openseaBuyerFeeBasisPoints).toEqual(constants_2.DEFAULT_BUYER_FEE_BASIS_POINTS);
        expect(heterogenousBundleSellerFees.openseaSellerFeeBasisPoints).toEqual(constants_2.DEFAULT_SELLER_FEE_BASIS_POINTS);
        expect(heterogenousBundleSellerFees.sellerBountyBasisPoints).toEqual(extraBountyBasisPoints);
        const privateSellerFees = await client.computeFees({
            asset,
            extraBountyBasisPoints,
            side: types_1.OrderSide.Sell,
            isPrivate: true
        });
        expect(privateSellerFees.totalBuyerFeeBasisPoints).toEqual(0);
        expect(privateSellerFees.totalSellerFeeBasisPoints).toEqual(0);
        expect(privateSellerFees.devBuyerFeeBasisPoints).toEqual(0);
        expect(privateSellerFees.devSellerFeeBasisPoints).toEqual(0);
        expect(privateSellerFees.openseaBuyerFeeBasisPoints).toEqual(0);
        expect(privateSellerFees.openseaSellerFeeBasisPoints).toEqual(0);
        expect(privateSellerFees.sellerBountyBasisPoints).toEqual(0);
        const privateBuyerFees = await client.computeFees({
            asset,
            extraBountyBasisPoints,
            side: types_1.OrderSide.Buy,
            isPrivate: true
        });
        expect(privateBuyerFees.totalBuyerFeeBasisPoints).toEqual(0);
        expect(privateBuyerFees.totalSellerFeeBasisPoints).toEqual(0);
        expect(privateBuyerFees.devBuyerFeeBasisPoints).toEqual(0);
        expect(privateBuyerFees.devSellerFeeBasisPoints).toEqual(0);
        expect(privateBuyerFees.openseaBuyerFeeBasisPoints).toEqual(0);
        expect(privateBuyerFees.openseaSellerFeeBasisPoints).toEqual(0);
        expect(privateBuyerFees.sellerBountyBasisPoints).toEqual(0);
    });
    test.skip("Computes fees correctly for zero-fee asset", async () => {
        const asset = await client.api.getAsset({ tokenAddress: constants_1.DECENTRALAND_ADDRESS, tokenId: constants_1.DECENTRALAND_ID });
        const bountyPercent = 0;
        const buyerFees = await client.computeFees({
            asset,
            extraBountyBasisPoints: bountyPercent * 100,
            side: types_1.OrderSide.Buy
        });
        expect(buyerFees.totalBuyerFeeBasisPoints).toEqual(0);
        expect(buyerFees.totalSellerFeeBasisPoints).toEqual(0);
        expect(buyerFees.devBuyerFeeBasisPoints).toEqual(0);
        expect(buyerFees.devSellerFeeBasisPoints).toEqual(0);
        expect(buyerFees.openseaBuyerFeeBasisPoints).toEqual(0);
        expect(buyerFees.openseaSellerFeeBasisPoints).toEqual(0);
        expect(buyerFees.sellerBountyBasisPoints).toEqual(0);
        const sellerFees = await client.computeFees({
            asset,
            extraBountyBasisPoints: bountyPercent * 100,
            side: types_1.OrderSide.Sell
        });
        expect(sellerFees.totalBuyerFeeBasisPoints).toEqual(0);
        expect(sellerFees.totalSellerFeeBasisPoints).toEqual(0);
        expect(sellerFees.devBuyerFeeBasisPoints).toEqual(0);
        expect(sellerFees.devSellerFeeBasisPoints).toEqual(0);
        expect(sellerFees.openseaBuyerFeeBasisPoints).toEqual(0);
        expect(sellerFees.openseaSellerFeeBasisPoints).toEqual(0);
        expect(sellerFees.sellerBountyBasisPoints).toEqual(bountyPercent * 100);
    });
    test("Errors for computing fees correctly", async () => {
        try {
            await client.computeFees({
                asset,
                extraBountyBasisPoints: 200,
                side: types_1.OrderSide.Sell
            });
            //   assert.fail()
        }
        catch (error) {
            console.error(error);
            // if (!error.includes('bounty exceeds the maximum') ||
            //     !error.includes('OpenSea will add')) {
            //     // assert.fail(error)
            // }
        }
    });
    test('First page of orders have valid hashes and fees', async () => {
        const { orders } = await client.api.getOrders();
        expect(orders).not.toHaveLength(0);
        orders.forEach((order) => {
            if (order.asset) {
                expect(order.asset.assetContract).not.toHaveLength(0);
                expect(order.asset.tokenId).not.toHaveLength(0);
                testFeesMakerOrder(order, order.asset.collection);
            }
            expect(order.paymentTokenContract).not.toHaveLength(0);
            const accountAddress = constants_1.ALICE_ADDRESS;
            const matchingOrder = client._makeMatchingOrder({
                order,
                accountAddress,
                recipientAddress: accountAddress
            });
            const matchingOrderHash = matchingOrder.hash;
            delete matchingOrder.hash;
            expect(matchingOrder.hash).not.toBeDefined();
            const orderHash = (0, utils_1.getOrderHash)(matchingOrder);
            expect(orderHash).toEqual(matchingOrderHash);
        });
    });
    test("Computes per-transfer fees correctly, Enjin and CK", async () => {
        const asset = await client.api.getAsset({ tokenAddress: constants_2.ENJIN_ADDRESS, tokenId: constants_1.CATS_IN_MECHS_ID });
        const zeroTransferFeeAsset = await client.api.getAsset({ tokenAddress: constants_1.CK_ADDRESS, tokenId: constants_1.CK_TOKEN_ID });
        const sellerFees = await client.computeFees({
            asset,
            side: types_1.OrderSide.Sell
        });
        const sellerZeroFees = await client.computeFees({
            asset: zeroTransferFeeAsset,
            side: types_1.OrderSide.Sell
        });
        expect(sellerZeroFees.transferFee.toString()).toEqual("0");
        expect(sellerZeroFees.transferFeeTokenAddress).toBeNull();
        expect(sellerFees.transferFee.toString()).toEqual("1000000000000000000");
        expect(sellerFees.transferFeeTokenAddress).toEqual(constants_2.ENJIN_COIN_ADDRESS);
    });
    // NOTE: Enjin platform limitation:
    // the transfer fee isn't showing as whitelisted (skipped) by Enjin's method
    test.skip("Computes whitelisted Enjin per-transfer fees correctly", async () => {
        const whitelistedAsset = await client.api.getAsset({ tokenAddress: constants_2.ENJIN_ADDRESS, tokenId: constants_1.SPIRIT_CLASH_TOKEN_ID });
        const sellerZeroFees = await client.computeFees({
            asset: whitelistedAsset,
            side: types_1.OrderSide.Sell,
            accountAddress: constants_1.SPIRIT_CLASH_OWNER
        });
        expect(sellerZeroFees.transferFee.toString()).toEqual("0");
        expect(sellerZeroFees.transferFeeTokenAddress).toEqual(constants_2.ENJIN_COIN_ADDRESS);
    });
    test("_getBuyFeeParameters works for assets", async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const extraBountyBasisPoints = 0;
        const sellOrder = await client._makeSellOrder({
            asset,
            quantity: 1,
            accountAddress,
            startAmount: 1,
            paymentTokenAddress: constants_2.NULL_ADDRESS,
            extraBountyBasisPoints,
            buyerAddress: constants_2.NULL_ADDRESS,
            expirationTime: 0,
            waitForHighestBid: false,
        });
        const { totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints } = await client.computeFees({ asset, extraBountyBasisPoints, side: types_1.OrderSide.Buy });
        const { makerRelayerFee, takerRelayerFee, makerProtocolFee, takerProtocolFee, makerReferrerFee, feeRecipient, feeMethod } = client._getBuyFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, sellOrder);
        expect(totalSellerFeeBasisPoints).toBeGreaterThan(0);
        unitTestFeesBuyOrder({
            makerRelayerFee,
            takerRelayerFee,
            makerProtocolFee,
            takerProtocolFee,
            makerReferrerFee,
            feeRecipient,
            feeMethod
        });
    });
    test("_getBuyFeeParameters works for English auction assets", async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const extraBountyBasisPoints = 0;
        const sellOrder = await client._makeSellOrder({
            asset,
            quantity: 1,
            accountAddress,
            startAmount: 1,
            paymentTokenAddress: constants_1.WDOT_ADDRESS,
            extraBountyBasisPoints,
            buyerAddress: constants_2.NULL_ADDRESS,
            expirationTime,
            waitForHighestBid: true,
        });
        const { totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints } = await client.computeFees({ asset, extraBountyBasisPoints, side: types_1.OrderSide.Buy });
        const { makerRelayerFee, takerRelayerFee, makerProtocolFee, takerProtocolFee, makerReferrerFee, feeRecipient, feeMethod } = client._getBuyFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, sellOrder);
        expect(totalSellerFeeBasisPoints).toBeGreaterThan(0);
        unitTestFeesBuyOrder({
            makerRelayerFee,
            takerRelayerFee,
            makerProtocolFee,
            takerProtocolFee,
            makerReferrerFee,
            feeRecipient,
            feeMethod
        });
    });
});
function unitTestFeesBuyOrder({ makerRelayerFee, takerRelayerFee, makerProtocolFee, takerProtocolFee, makerReferrerFee, feeRecipient, feeMethod }) {
    expect(+makerRelayerFee).toEqual(asset.collection.openseaBuyerFeeBasisPoints);
    expect(+takerRelayerFee).toEqual(asset.collection.openseaSellerFeeBasisPoints);
    expect(+makerProtocolFee).toEqual(0);
    expect(+takerProtocolFee).toEqual(0);
    expect(+makerReferrerFee).toEqual(0);
    expect(feeRecipient).toEqual(constants_2.OPENSEA_FEE_RECIPIENT);
    expect(feeMethod).toEqual(types_1.FeeMethod.SplitFee);
}
function testFeesMakerOrder(order, collection, makerBountyBPS) {
    expect(order.makerProtocolFee.toNumber()).toEqual(0);
    expect(order.takerProtocolFee.toNumber()).toEqual(0);
    if (order.waitingForBestCounterOrder) {
        expect(order.feeRecipient).toEqual(constants_2.NULL_ADDRESS);
    }
    else {
        expect(order.feeRecipient).toEqual(constants_2.OPENSEA_FEE_RECIPIENT);
    }
    if (order.taker != constants_2.NULL_ADDRESS && order.side == types_1.OrderSide.Sell) {
        // Private sell order
        expect(order.makerReferrerFee.toNumber()).toEqual(0);
        expect(order.takerRelayerFee.toNumber()).toEqual(0);
        expect(order.makerRelayerFee.toNumber()).toEqual(0);
        return;
    }
    // Public order
    if (makerBountyBPS != null) {
        expect(order.makerReferrerFee.toNumber()).toEqual(makerBountyBPS);
    }
    if (collection) {
        const totalSellerFee = collection.devSellerFeeBasisPoints + collection.openseaSellerFeeBasisPoints;
        const totalBuyerFeeBasisPoints = collection.devBuyerFeeBasisPoints + collection.openseaBuyerFeeBasisPoints;
        // Homogenous sale
        if (order.side == types_1.OrderSide.Sell && order.waitingForBestCounterOrder) {
            // Fees may not match the contract's fees, which are changeable.
        }
        else if (order.side == types_1.OrderSide.Sell) {
            expect(order.makerRelayerFee.toNumber()).toEqual(totalSellerFee);
            expect(order.takerRelayerFee.toNumber()).toEqual(totalBuyerFeeBasisPoints);
            expect(order.makerRelayerFee.toNumber()).toEqual(collection.devSellerFeeBasisPoints + collection.openseaSellerFeeBasisPoints);
            // Check bounty
            if (collection.openseaSellerFeeBasisPoints >= constants_2.OPENSEA_SELLER_BOUNTY_BASIS_POINTS) {
                expect(constants_2.OPENSEA_SELLER_BOUNTY_BASIS_POINTS + order.makerReferrerFee.toNumber()).toBeLessThanOrEqual(collection.openseaSellerFeeBasisPoints);
            }
            else {
                // No extra bounty allowed if < 1%
                expect(order.makerReferrerFee.toNumber()).toEqual(0);
            }
        }
        else {
            expect(order.makerRelayerFee.toNumber()).toEqual(totalBuyerFeeBasisPoints);
            expect(order.takerRelayerFee.toNumber()).toEqual(totalSellerFee);
            expect(order.makerRelayerFee.toNumber()).toEqual(collection.devBuyerFeeBasisPoints + collection.openseaBuyerFeeBasisPoints);
        }
    }
    else {
        // Heterogenous
        if (order.side == types_1.OrderSide.Sell) {
            expect(order.makerRelayerFee.toNumber()).toEqual(constants_2.DEFAULT_SELLER_FEE_BASIS_POINTS);
            expect(order.takerRelayerFee.toNumber()).toEqual(constants_2.DEFAULT_BUYER_FEE_BASIS_POINTS);
            expect(constants_2.OPENSEA_SELLER_BOUNTY_BASIS_POINTS + order.makerReferrerFee.toNumber()).toBeLessThanOrEqual(constants_2.DEFAULT_MAX_BOUNTY);
        }
        else {
            expect(order.makerRelayerFee.toNumber()).toEqual(constants_2.DEFAULT_BUYER_FEE_BASIS_POINTS);
            expect(order.takerRelayerFee.toNumber()).toEqual(constants_2.DEFAULT_SELLER_FEE_BASIS_POINTS);
        }
    }
}
exports.testFeesMakerOrder = testFeesMakerOrder;
//# sourceMappingURL=fees.test.js.map