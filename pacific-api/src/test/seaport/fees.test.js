"use strict";
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
exports.__esModule = true;
exports.testFeesMakerOrder = void 0;
var index_1 = require("../../pacific-js/index");
var types_1 = require("../../pacific-js/types");
var utils_1 = require("../../pacific-js/utils/utils");
var constants_1 = require("../constants");
var constants_2 = require("../../pacific-js/constants");
// const provider = new Web3.providers.HttpProvider(MAINNET_PROVIDER_URL)
var api_1 = require("@polkadot/api");
var provider = new api_1.WsProvider('ws://127.0.0.1:9944/');
// const devProvider = new WsProvider('ws://127.0.0.1:9944/');
var client;
var asset;
var expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24); // one day from now
describe('seaport: fees', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var tokenId, tokenAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new index_1.OpenSeaPort(provider, {
                        networkName: types_1.Network.Dev,
                        apiKey: constants_1.MAINNET_API_KEY
                    }, function (line) { return console.info("MAINNET: ".concat(line)); });
                    tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
                    tokenAddress = constants_1.MYTHEREUM_ADDRESS;
                    return [4 /*yield*/, client.api.getAsset({ tokenAddress: tokenAddress, tokenId: tokenId })];
                case 1:
                    asset = _a.sent();
                    expect(asset).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Computes fees correctly for non-zero-fee asset", function () { return __awaiter(void 0, void 0, void 0, function () {
        var bountyPercent, extraBountyBasisPoints, collection, buyerFeeBasisPoints, sellerFeeBasisPoints, buyerFees, sellerFees, heterogenousBundleSellerFees, privateSellerFees, privateBuyerFees;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bountyPercent = 1.5;
                    extraBountyBasisPoints = bountyPercent * 100;
                    collection = asset.collection;
                    buyerFeeBasisPoints = collection.openseaBuyerFeeBasisPoints + collection.devBuyerFeeBasisPoints;
                    sellerFeeBasisPoints = collection.openseaSellerFeeBasisPoints + collection.devSellerFeeBasisPoints;
                    return [4 /*yield*/, client.computeFees({
                            asset: asset,
                            extraBountyBasisPoints: extraBountyBasisPoints,
                            side: types_1.OrderSide.Buy
                        })];
                case 1:
                    buyerFees = _a.sent();
                    expect(buyerFees.totalBuyerFeeBasisPoints).toEqual(buyerFeeBasisPoints);
                    expect(buyerFees.totalSellerFeeBasisPoints).toEqual(sellerFeeBasisPoints);
                    expect(buyerFees.devBuyerFeeBasisPoints).toEqual(collection.devBuyerFeeBasisPoints);
                    expect(buyerFees.devSellerFeeBasisPoints).toEqual(collection.devSellerFeeBasisPoints);
                    expect(buyerFees.openseaBuyerFeeBasisPoints).toEqual(collection.openseaBuyerFeeBasisPoints);
                    expect(buyerFees.openseaSellerFeeBasisPoints).toEqual(collection.openseaSellerFeeBasisPoints);
                    expect(buyerFees.sellerBountyBasisPoints).toEqual(0);
                    return [4 /*yield*/, client.computeFees({
                            asset: asset,
                            extraBountyBasisPoints: extraBountyBasisPoints,
                            side: types_1.OrderSide.Sell
                        })];
                case 2:
                    sellerFees = _a.sent();
                    expect(sellerFees.totalBuyerFeeBasisPoints).toEqual(buyerFeeBasisPoints);
                    expect(sellerFees.totalSellerFeeBasisPoints).toEqual(sellerFeeBasisPoints);
                    expect(sellerFees.devBuyerFeeBasisPoints).toEqual(collection.devBuyerFeeBasisPoints);
                    expect(sellerFees.devSellerFeeBasisPoints).toEqual(collection.devSellerFeeBasisPoints);
                    expect(sellerFees.openseaBuyerFeeBasisPoints).toEqual(collection.openseaBuyerFeeBasisPoints);
                    expect(sellerFees.openseaSellerFeeBasisPoints).toEqual(collection.openseaSellerFeeBasisPoints);
                    expect(sellerFees.sellerBountyBasisPoints).toEqual(extraBountyBasisPoints);
                    return [4 /*yield*/, client.computeFees({
                            extraBountyBasisPoints: extraBountyBasisPoints,
                            side: types_1.OrderSide.Sell
                        })];
                case 3:
                    heterogenousBundleSellerFees = _a.sent();
                    expect(heterogenousBundleSellerFees.totalBuyerFeeBasisPoints).toEqual(constants_2.DEFAULT_BUYER_FEE_BASIS_POINTS);
                    expect(heterogenousBundleSellerFees.totalSellerFeeBasisPoints).toEqual(constants_2.DEFAULT_SELLER_FEE_BASIS_POINTS);
                    expect(heterogenousBundleSellerFees.devBuyerFeeBasisPoints).toEqual(0);
                    expect(heterogenousBundleSellerFees.devSellerFeeBasisPoints).toEqual(0);
                    expect(heterogenousBundleSellerFees.openseaBuyerFeeBasisPoints).toEqual(constants_2.DEFAULT_BUYER_FEE_BASIS_POINTS);
                    expect(heterogenousBundleSellerFees.openseaSellerFeeBasisPoints).toEqual(constants_2.DEFAULT_SELLER_FEE_BASIS_POINTS);
                    expect(heterogenousBundleSellerFees.sellerBountyBasisPoints).toEqual(extraBountyBasisPoints);
                    return [4 /*yield*/, client.computeFees({
                            asset: asset,
                            extraBountyBasisPoints: extraBountyBasisPoints,
                            side: types_1.OrderSide.Sell,
                            isPrivate: true
                        })];
                case 4:
                    privateSellerFees = _a.sent();
                    expect(privateSellerFees.totalBuyerFeeBasisPoints).toEqual(0);
                    expect(privateSellerFees.totalSellerFeeBasisPoints).toEqual(0);
                    expect(privateSellerFees.devBuyerFeeBasisPoints).toEqual(0);
                    expect(privateSellerFees.devSellerFeeBasisPoints).toEqual(0);
                    expect(privateSellerFees.openseaBuyerFeeBasisPoints).toEqual(0);
                    expect(privateSellerFees.openseaSellerFeeBasisPoints).toEqual(0);
                    expect(privateSellerFees.sellerBountyBasisPoints).toEqual(0);
                    return [4 /*yield*/, client.computeFees({
                            asset: asset,
                            extraBountyBasisPoints: extraBountyBasisPoints,
                            side: types_1.OrderSide.Buy,
                            isPrivate: true
                        })];
                case 5:
                    privateBuyerFees = _a.sent();
                    expect(privateBuyerFees.totalBuyerFeeBasisPoints).toEqual(0);
                    expect(privateBuyerFees.totalSellerFeeBasisPoints).toEqual(0);
                    expect(privateBuyerFees.devBuyerFeeBasisPoints).toEqual(0);
                    expect(privateBuyerFees.devSellerFeeBasisPoints).toEqual(0);
                    expect(privateBuyerFees.openseaBuyerFeeBasisPoints).toEqual(0);
                    expect(privateBuyerFees.openseaSellerFeeBasisPoints).toEqual(0);
                    expect(privateBuyerFees.sellerBountyBasisPoints).toEqual(0);
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("Computes fees correctly for zero-fee asset", function () { return __awaiter(void 0, void 0, void 0, function () {
        var asset, bountyPercent, buyerFees, sellerFees;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.api.getAsset({ tokenAddress: constants_1.DECENTRALAND_ADDRESS, tokenId: constants_1.DECENTRALAND_ID })];
                case 1:
                    asset = _a.sent();
                    bountyPercent = 0;
                    return [4 /*yield*/, client.computeFees({
                            asset: asset,
                            extraBountyBasisPoints: bountyPercent * 100,
                            side: types_1.OrderSide.Buy
                        })];
                case 2:
                    buyerFees = _a.sent();
                    expect(buyerFees.totalBuyerFeeBasisPoints).toEqual(0);
                    expect(buyerFees.totalSellerFeeBasisPoints).toEqual(0);
                    expect(buyerFees.devBuyerFeeBasisPoints).toEqual(0);
                    expect(buyerFees.devSellerFeeBasisPoints).toEqual(0);
                    expect(buyerFees.openseaBuyerFeeBasisPoints).toEqual(0);
                    expect(buyerFees.openseaSellerFeeBasisPoints).toEqual(0);
                    expect(buyerFees.sellerBountyBasisPoints).toEqual(0);
                    return [4 /*yield*/, client.computeFees({
                            asset: asset,
                            extraBountyBasisPoints: bountyPercent * 100,
                            side: types_1.OrderSide.Sell
                        })];
                case 3:
                    sellerFees = _a.sent();
                    expect(sellerFees.totalBuyerFeeBasisPoints).toEqual(0);
                    expect(sellerFees.totalSellerFeeBasisPoints).toEqual(0);
                    expect(sellerFees.devBuyerFeeBasisPoints).toEqual(0);
                    expect(sellerFees.devSellerFeeBasisPoints).toEqual(0);
                    expect(sellerFees.openseaBuyerFeeBasisPoints).toEqual(0);
                    expect(sellerFees.openseaSellerFeeBasisPoints).toEqual(0);
                    expect(sellerFees.sellerBountyBasisPoints).toEqual(bountyPercent * 100);
                    return [2 /*return*/];
            }
        });
    }); });
    test("Errors for computing fees correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, client.computeFees({
                            asset: asset,
                            extraBountyBasisPoints: 200,
                            side: types_1.OrderSide.Sell
                        })
                        //   assert.fail()
                    ];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    if (!error_1.message.includes('bounty exceeds the maximum') ||
                        !error_1.message.includes('OpenSea will add')) {
                        // assert.fail(error.message)
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    test('First page of orders have valid hashes and fees', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.api.getOrders()];
                case 1:
                    orders = (_a.sent()).orders;
                    expect(orders).not.toHaveLength(0);
                    orders.forEach(function (order) {
                        if (order.asset) {
                            expect(order.asset.assetContract).not.toHaveLength(0);
                            expect(order.asset.tokenId).not.toHaveLength(0);
                            testFeesMakerOrder(order, order.asset.collection);
                        }
                        expect(order.paymentTokenContract).not.toHaveLength(0);
                        var accountAddress = constants_1.ALICE_ADDRESS;
                        var matchingOrder = client._makeMatchingOrder({
                            order: order,
                            accountAddress: accountAddress,
                            recipientAddress: accountAddress
                        });
                        var matchingOrderHash = matchingOrder.hash;
                        delete matchingOrder.hash;
                        expect(matchingOrder.hash).not.toBeDefined();
                        var orderHash = (0, utils_1.getOrderHash)(matchingOrder);
                        expect(orderHash).toEqual(matchingOrderHash);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test("Computes per-transfer fees correctly, Enjin and CK", function () { return __awaiter(void 0, void 0, void 0, function () {
        var asset, zeroTransferFeeAsset, sellerFees, sellerZeroFees;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.api.getAsset({ tokenAddress: constants_2.ENJIN_ADDRESS, tokenId: constants_1.CATS_IN_MECHS_ID })];
                case 1:
                    asset = _a.sent();
                    return [4 /*yield*/, client.api.getAsset({ tokenAddress: constants_1.CK_ADDRESS, tokenId: constants_1.CK_TOKEN_ID })];
                case 2:
                    zeroTransferFeeAsset = _a.sent();
                    return [4 /*yield*/, client.computeFees({
                            asset: asset,
                            side: types_1.OrderSide.Sell
                        })];
                case 3:
                    sellerFees = _a.sent();
                    return [4 /*yield*/, client.computeFees({
                            asset: zeroTransferFeeAsset,
                            side: types_1.OrderSide.Sell
                        })];
                case 4:
                    sellerZeroFees = _a.sent();
                    expect(sellerZeroFees.transferFee.toString()).toEqual("0");
                    expect(sellerZeroFees.transferFeeTokenAddress).toBeNull();
                    expect(sellerFees.transferFee.toString()).toEqual("1000000000000000000");
                    expect(sellerFees.transferFeeTokenAddress).toEqual(constants_2.ENJIN_COIN_ADDRESS);
                    return [2 /*return*/];
            }
        });
    }); });
    // NOTE: Enjin platform limitation:
    // the transfer fee isn't showing as whitelisted (skipped) by Enjin's method
    test.skip("Computes whitelisted Enjin per-transfer fees correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        var whitelistedAsset, sellerZeroFees;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.api.getAsset({ tokenAddress: constants_2.ENJIN_ADDRESS, tokenId: constants_1.SPIRIT_CLASH_TOKEN_ID })];
                case 1:
                    whitelistedAsset = _a.sent();
                    return [4 /*yield*/, client.computeFees({
                            asset: whitelistedAsset,
                            side: types_1.OrderSide.Sell,
                            accountAddress: constants_1.SPIRIT_CLASH_OWNER
                        })];
                case 2:
                    sellerZeroFees = _a.sent();
                    expect(sellerZeroFees.transferFee.toString()).toEqual("0");
                    expect(sellerZeroFees.transferFeeTokenAddress).toEqual(constants_2.ENJIN_COIN_ADDRESS);
                    return [2 /*return*/];
            }
        });
    }); });
    test("_getBuyFeeParameters works for assets", function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, extraBountyBasisPoints, sellOrder, _a, totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, _b, makerRelayerFee, takerRelayerFee, makerProtocolFee, takerProtocolFee, makerReferrerFee, feeRecipient, feeMethod;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    extraBountyBasisPoints = 0;
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: asset,
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: 1,
                            paymentTokenAddress: constants_2.NULL_ADDRESS,
                            extraBountyBasisPoints: extraBountyBasisPoints,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: 0,
                            waitForHighestBid: false
                        })];
                case 1:
                    sellOrder = _c.sent();
                    return [4 /*yield*/, client.computeFees({ asset: asset, extraBountyBasisPoints: extraBountyBasisPoints, side: types_1.OrderSide.Buy })];
                case 2:
                    _a = _c.sent(), totalBuyerFeeBasisPoints = _a.totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints = _a.totalSellerFeeBasisPoints;
                    _b = client._getBuyFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, sellOrder), makerRelayerFee = _b.makerRelayerFee, takerRelayerFee = _b.takerRelayerFee, makerProtocolFee = _b.makerProtocolFee, takerProtocolFee = _b.takerProtocolFee, makerReferrerFee = _b.makerReferrerFee, feeRecipient = _b.feeRecipient, feeMethod = _b.feeMethod;
                    expect(totalSellerFeeBasisPoints).toBeGreaterThan(0);
                    unitTestFeesBuyOrder({
                        makerRelayerFee: makerRelayerFee,
                        takerRelayerFee: takerRelayerFee,
                        makerProtocolFee: makerProtocolFee,
                        takerProtocolFee: takerProtocolFee,
                        makerReferrerFee: makerReferrerFee,
                        feeRecipient: feeRecipient,
                        feeMethod: feeMethod
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test("_getBuyFeeParameters works for English auction assets", function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, extraBountyBasisPoints, sellOrder, _a, totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, _b, makerRelayerFee, takerRelayerFee, makerProtocolFee, takerProtocolFee, makerReferrerFee, feeRecipient, feeMethod;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    extraBountyBasisPoints = 0;
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: asset,
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: 1,
                            paymentTokenAddress: constants_1.WDOT_ADDRESS,
                            extraBountyBasisPoints: extraBountyBasisPoints,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: expirationTime,
                            waitForHighestBid: true
                        })];
                case 1:
                    sellOrder = _c.sent();
                    return [4 /*yield*/, client.computeFees({ asset: asset, extraBountyBasisPoints: extraBountyBasisPoints, side: types_1.OrderSide.Buy })];
                case 2:
                    _a = _c.sent(), totalBuyerFeeBasisPoints = _a.totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints = _a.totalSellerFeeBasisPoints;
                    _b = client._getBuyFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, sellOrder), makerRelayerFee = _b.makerRelayerFee, takerRelayerFee = _b.takerRelayerFee, makerProtocolFee = _b.makerProtocolFee, takerProtocolFee = _b.takerProtocolFee, makerReferrerFee = _b.makerReferrerFee, feeRecipient = _b.feeRecipient, feeMethod = _b.feeMethod;
                    expect(totalSellerFeeBasisPoints).toBeGreaterThan(0);
                    unitTestFeesBuyOrder({
                        makerRelayerFee: makerRelayerFee,
                        takerRelayerFee: takerRelayerFee,
                        makerProtocolFee: makerProtocolFee,
                        takerProtocolFee: takerProtocolFee,
                        makerReferrerFee: makerReferrerFee,
                        feeRecipient: feeRecipient,
                        feeMethod: feeMethod
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
function unitTestFeesBuyOrder(_a) {
    var makerRelayerFee = _a.makerRelayerFee, takerRelayerFee = _a.takerRelayerFee, makerProtocolFee = _a.makerProtocolFee, takerProtocolFee = _a.takerProtocolFee, makerReferrerFee = _a.makerReferrerFee, feeRecipient = _a.feeRecipient, feeMethod = _a.feeMethod;
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
        var totalSellerFee = collection.devSellerFeeBasisPoints + collection.openseaSellerFeeBasisPoints;
        var totalBuyerFeeBasisPoints = collection.devBuyerFeeBasisPoints + collection.openseaBuyerFeeBasisPoints;
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
