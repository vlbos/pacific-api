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
exports.__esModule = true;
exports.testMatchingNewOrder = exports.testMatchingOrder = void 0;
var api_1 = require("@polkadot/api");
var rpcs_json_1 = require("../../pacific-js/config/rpcs.json");
var rpc = __assign({}, rpcs_json_1["default"]);
// import { makeOrderArrayEx, makeOrderEx, makeOrder, orderFromJSON } from '../orders/order'
var index_1 = require("../../pacific-js/index");
var types_1 = require("../../pacific-js/types");
var utils_1 = require("../../pacific-js/utils/utils");
var ordersJSONFixture = require("../fixtures/orders.json");
var bignumber_js_1 = require("bignumber.js");
var constants_1 = require("../constants");
var constants_2 = require("../../pacific-js/constants");
var ordersJSON = ordersJSONFixture;
var englishSellOrderJSON = ordersJSON[0];
//   const provider = new WsProvider('wss://kusama-rpc.polkadot.io');
// const provider = new WsProvider('wss://westend-rpc.polkadot.io/');
//   const provider = new WsProvider('ws://127.0.0.1:9944/');
var provider = new api_1.WsProvider('ws://127.0.0.1:9944/');
var devProvider = new api_1.WsProvider('ws://127.0.0.1:9944/');
var apiHelper_1 = require("../../api/test/helpers/apiHelper");
var client;
var devClient;
(function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
})();
// let client = new OpenSeaPort(provider,api, {
//     networkName: Network.Main,
//     apiKey: MAINNET_API_KEY
// }, line => console.info(`MAINNET: ${line}`))
// let  devClient = new OpenSeaPort(devProvider,api, {
//     networkName: Network.Dev,
//     apiKey: DEV_API_KEY
// }, line => console.info(`DEV: ${line}`))
var assetsForBundleOrder = [
    { tokenId: constants_1.MYTHEREUM_TOKEN_ID.toString(), tokenAddress: constants_1.MYTHEREUM_ADDRESS },
    { tokenId: constants_1.DIGITAL_ART_CHAIN_TOKEN_ID.toString(), tokenAddress: constants_1.DIGITAL_ART_CHAIN_ADDRESS },
];
var assetsForBulkTransfer = assetsForBundleOrder;
var manaAddress;
var daiAddress;
describe('seaport: orders', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var apip, api;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(30000);
                    return [4 /*yield*/, (0, apiHelper_1.init)(provider)];
                case 1:
                    apip = _a.sent();
                    api = apip.api;
                    // console.log("============================",api)
                    client = new index_1.OpenSeaPort(provider, api, {
                        networkName: types_1.Network.Main,
                        apiKey: constants_1.MAINNET_API_KEY
                    }, function (line) { return console.info("MAINNET: ".concat(line)); });
                    devClient = new index_1.OpenSeaPort(devProvider, api, {
                        networkName: types_1.Network.Dev,
                        apiKey: constants_1.DEV_API_KEY
                    }, function (line) { return console.info("DEV: ".concat(line)); });
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); });
    // console.log(ordersJSON)
    var s = Object.values(ordersJSON);
    s.map(function (orderJSON, index) {
        it('Order #' + index + ' has correct types', function () {
            var order = (0, utils_1.orderFromJSON)(orderJSON);
            expect(order.basePrice).toBeInstanceOf(bignumber_js_1.BigNumber);
            expect(order.hash).toBeInstanceOf("string");
            expect(order.maker).toBeInstanceOf("string");
            expect(+order.quantity).toEqual(1);
        });
    });
    s.map(function (orderJSON, index) {
        it('Order #' + index + ' has correct hash', function () {
            var order = (0, utils_1.orderFromJSON)(orderJSON);
            expect(order.hash).toEqual((0, utils_1.getOrderHash)(order));
        });
    });
    it("Correctly sets decimals on fungible order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, tokenId, tokenAddress, quantity, decimals, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    tokenId = constants_1.DISSOLUTION_TOKEN_ID.toString();
                    tokenAddress = constants_2.ENJIN_ADDRESS;
                    quantity = 1;
                    decimals = 2;
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId, decimals: decimals, schemaName: types_1.WyvernSchemaName.ERC1155 },
                            quantity: quantity,
                            accountAddress: accountAddress,
                            startAmount: 2,
                            extraBountyBasisPoints: 0,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: 0,
                            paymentTokenAddress: constants_2.NULL_ADDRESS,
                            waitForHighestBid: false
                        })];
                case 1:
                    order = _a.sent();
                    expect(order.quantity.toNumber()).toEqual(quantity * Math.pow(10, decimals));
                    return [2 /*return*/];
            }
        });
    }); });
    it("Correctly errors for invalid sell order price parameters", function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, expirationTime, paymentTokenAddress, tokenId, tokenAddress, _a, error_1, _b, error_2, _c, error_3, _d, error_4, _e, error_5, _f, error_6, _g, error_7, _h, error_8;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    expirationTime = Math.round(Date.now() / 1000 + 60) // one minute from now
                    ;
                    paymentTokenAddress = manaAddress;
                    tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
                    tokenAddress = constants_1.MYTHEREUM_ADDRESS;
                    _j.label = 1;
                case 1:
                    _j.trys.push([1, 3, , 4]);
                    _a = expect;
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId },
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: 2,
                            extraBountyBasisPoints: 0,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: 0,
                            paymentTokenAddress: paymentTokenAddress,
                            waitForHighestBid: true
                        })];
                case 2:
                    _a.apply(void 0, [_j.sent()]).toThrow();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _j.sent();
                    expect(error_1.message).toContain('English auctions must have an expiration time');
                    return [3 /*break*/, 4];
                case 4:
                    _j.trys.push([4, 6, , 7]);
                    _b = expect;
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId },
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: 2,
                            endAmount: 1,
                            extraBountyBasisPoints: 0,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: expirationTime,
                            paymentTokenAddress: constants_2.NULL_ADDRESS,
                            waitForHighestBid: true
                        })];
                case 5:
                    _b.apply(void 0, [_j.sent()]).toThrow();
                    return [3 /*break*/, 7];
                case 6:
                    error_2 = _j.sent();
                    expect(error_2.message).toContain('English auctions must use wrapped ETH');
                    return [3 /*break*/, 7];
                case 7:
                    _j.trys.push([7, 9, , 10]);
                    _c = expect;
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId },
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: 2,
                            endAmount: 3,
                            extraBountyBasisPoints: 0,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: expirationTime,
                            paymentTokenAddress: constants_2.NULL_ADDRESS,
                            waitForHighestBid: false
                        })];
                case 8:
                    _c.apply(void 0, [_j.sent()]).toThrow();
                    return [3 /*break*/, 10];
                case 9:
                    error_3 = _j.sent();
                    expect(error_3.message).toContain('End price must be less than or equal to the start price');
                    return [3 /*break*/, 10];
                case 10:
                    _j.trys.push([10, 12, , 13]);
                    _d = expect;
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId },
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: 2,
                            endAmount: 1,
                            extraBountyBasisPoints: 0,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: 0,
                            paymentTokenAddress: constants_2.NULL_ADDRESS,
                            waitForHighestBid: false
                        })];
                case 11:
                    _d.apply(void 0, [_j.sent()]).toThrow();
                    return [3 /*break*/, 13];
                case 12:
                    error_4 = _j.sent();
                    expect(error_4.message).toContain('Expiration time must be set if order will change in price');
                    return [3 /*break*/, 13];
                case 13:
                    _j.trys.push([13, 15, , 16]);
                    _e = expect;
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId },
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: 2,
                            listingTime: Math.round(Date.now() / 1000 - 60),
                            extraBountyBasisPoints: 0,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: 0,
                            paymentTokenAddress: constants_2.NULL_ADDRESS,
                            waitForHighestBid: false
                        })];
                case 14:
                    _e.apply(void 0, [_j.sent()]).toThrow();
                    return [3 /*break*/, 16];
                case 15:
                    error_5 = _j.sent();
                    expect(error_5.message).toContain('Listing time cannot be in the past');
                    return [3 /*break*/, 16];
                case 16:
                    _j.trys.push([16, 18, , 19]);
                    _f = expect;
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId },
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: 2,
                            listingTime: Math.round(Date.now() / 1000 + 20),
                            extraBountyBasisPoints: 0,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: expirationTime,
                            paymentTokenAddress: paymentTokenAddress,
                            waitForHighestBid: true
                        })];
                case 17:
                    _f.apply(void 0, [_j.sent()]).toThrow();
                    return [3 /*break*/, 19];
                case 18:
                    error_6 = _j.sent();
                    expect(error_6.message).toContain('Cannot schedule an English auction for the future');
                    return [3 /*break*/, 19];
                case 19:
                    _j.trys.push([19, 21, , 22]);
                    _g = exepct;
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId },
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: 2,
                            extraBountyBasisPoints: 0,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: expirationTime,
                            paymentTokenAddress: paymentTokenAddress,
                            waitForHighestBid: false,
                            englishAuctionReservePrice: 1
                        })];
                case 20:
                    _g.apply(void 0, [_j.sent()]).toThrow();
                    return [3 /*break*/, 22];
                case 21:
                    error_7 = _j.sent();
                    expect(error_7.message).toContain('Reserve prices may only be set on English auctions');
                    return [3 /*break*/, 22];
                case 22:
                    _j.trys.push([22, 24, , 25]);
                    _h = expect;
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId },
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: 2,
                            extraBountyBasisPoints: 0,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: expirationTime,
                            paymentTokenAddress: paymentTokenAddress,
                            waitForHighestBid: true,
                            englishAuctionReservePrice: 1
                        })];
                case 23:
                    _h.apply(void 0, [_j.sent()]).toThrow();
                    return [3 /*break*/, 25];
                case 24:
                    error_8 = _j.sent();
                    expect(error_8.message).toContain('Reserve price must be greater than or equal to the start amount');
                    return [3 /*break*/, 25];
                case 25: return [2 /*return*/];
            }
        });
    }); });
    it("Correctly errors for invalid buy order price parameters", function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, expirationTime, tokenId, tokenAddress, _a, error_9;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    accountAddress = constants_1.ALICE_STASH_ADDRESS;
                    expirationTime = Math.round(Date.now() / 1000 + 60) // one minute from now
                    ;
                    tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
                    tokenAddress = constants_1.MYTHEREUM_ADDRESS;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = expect;
                    return [4 /*yield*/, client._makeBuyOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId },
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: 2,
                            extraBountyBasisPoints: 0,
                            expirationTime: expirationTime,
                            paymentTokenAddress: constants_2.NULL_ADDRESS
                        })];
                case 2:
                    _a.apply(void 0, [_b.sent()]).toThrow();
                    return [3 /*break*/, 4];
                case 3:
                    error_9 = _b.sent();
                    expect(error_9.message).toContain('Offers must use wrapped ETH or an ERC-20 token');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('Cannot yet match a new English auction sell order, bountied', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, takerAddress, amountInToken, paymentTokenAddress, expirationTime, bountyPercent, tokenId, tokenAddress, asset, order, _a, error_10;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    takerAddress = constants_1.ALICE_STASH_ADDRESS;
                    amountInToken = 1.2;
                    paymentTokenAddress = constants_1.WDOT_ADDRESS;
                    expirationTime = Math.round(Date.now() / 1000 + 60) // one minute from now
                    ;
                    bountyPercent = 1.1;
                    tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
                    tokenAddress = constants_1.MYTHEREUM_ADDRESS;
                    return [4 /*yield*/, client.api.getAsset({ tokenAddress: tokenAddress, tokenId: tokenId })];
                case 1:
                    asset = _b.sent();
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId },
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: amountInToken,
                            paymentTokenAddress: paymentTokenAddress,
                            extraBountyBasisPoints: bountyPercent * 100,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: expirationTime,
                            waitForHighestBid: true
                        })];
                case 2:
                    order = _b.sent();
                    expect(order.taker).toEqual(constants_2.NULL_ADDRESS);
                    expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInToken);
                    expect(order.extra.toNumber()).toEqual(0);
                    // Make sure there's gap time to expire it
                    expect(order.expirationTime.toNumber()).toBeGreaterThan(expirationTime);
                    // Make sure it's listed in the future
                    expect(order.listingTime.toNumber()).toEqual(expirationTime);
                    return [4 /*yield*/, client._sellOrderValidationAndApprovals({ order: order, accountAddress: accountAddress })
                        // Make sure match is impossible
                    ];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    _a = expect;
                    return [4 /*yield*/, testMatchingNewOrder(order, takerAddress, expirationTime + 100)];
                case 5:
                    _a.apply(void 0, [_b.sent()]).toThrow();
                    return [3 /*break*/, 7];
                case 6:
                    error_10 = _b.sent();
                    expect(error_10.message).toContain("Buy-side order is set in the future or expired");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); });
    it.skip('Can match a finished English auction sell order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var makerAddress, takerAddress, matcherAddress, now, paymentTokenAddress, orders, buy, sell, sellPrice, buyPrice, gas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    makerAddress = constants_1.ALICE_STASH_ADDRESS;
                    takerAddress = constants_1.ALICE_ADDRESS;
                    matcherAddress = constants_1.CHARLIE_ADDRESS;
                    now = Math.round(Date.now() / 1000);
                    paymentTokenAddress = constants_1.WDOT_ADDRESS;
                    return [4 /*yield*/, devClient.api.getOrders({
                            side: types_1.OrderSide.Buy,
                            asset_contract_address: constants_1.CK_DEV_ADDRESS,
                            token_id: constants_1.CK_DEV_TOKEN_ID,
                            payment_token_address: paymentTokenAddress,
                            maker: makerAddress
                        })];
                case 1:
                    orders = (_a.sent()).orders;
                    buy = orders[0];
                    expect(buy).toBeDefined();
                    expect(buy.asset).toBeDefined();
                    if (!buy || !buy.asset) {
                        return [2 /*return*/];
                    }
                    // Make sure it's listed in the past
                    expect(buy.listingTime.toNumber()).toBeLessThan(now);
                    sell = (0, utils_1.orderFromJSON)(englishSellOrderJSON);
                    expect(+sell.quantity).toEqual(1);
                    expect(sell.feeRecipient).toEqual(constants_2.NULL_ADDRESS);
                    expect(sell.paymentToken).toEqual(paymentTokenAddress);
                    /* Requirements in Wyvern contract for funds transfer. */
                    expect(buy.takerRelayerFee.toNumber()).toBeLessThanOrEqual(sell.takerRelayerFee.toNumber());
                    expect(buy.takerProtocolFee.toNumber()).toBeLessThanOrEqual(sell.takerProtocolFee.toNumber());
                    return [4 /*yield*/, devClient.getCurrentPrice(sell)];
                case 2:
                    sellPrice = _a.sent();
                    return [4 /*yield*/, devClient.getCurrentPrice(buy)];
                case 3:
                    buyPrice = _a.sent();
                    expect(buyPrice.toNumber()).toBeGreaterThanOrEqual(sellPrice.toNumber());
                    console.info("Matching two orders that differ in price by ".concat(buyPrice.toNumber() - sellPrice.toNumber()));
                    return [4 /*yield*/, devClient._buyOrderValidationAndApprovals({ order: buy, accountAddress: makerAddress })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, devClient._sellOrderValidationAndApprovals({ order: sell, accountAddress: takerAddress })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, devClient._estimateGasForMatch({ buy: buy, sell: sell, accountAddress: matcherAddress })];
                case 6:
                    gas = _a.sent();
                    expect(gas || 0).toBeGreaterThan(0);
                    console.info("Match gas cost: ".concat(gas));
                    return [2 /*return*/];
            }
        });
    }); });
    it('Ensures buy order compatibility with an English sell order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, takerAddress, paymentTokenAddress, amountInToken, expirationTime, extraBountyBasisPoints, tokenId, tokenAddress, asset, sellOrder, buyOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountAddress = constants_1.ALICE_STASH_ADDRESS;
                    takerAddress = constants_1.ALICE_ADDRESS;
                    paymentTokenAddress = constants_1.WDOT_ADDRESS;
                    amountInToken = 0.01;
                    expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24) // one day from now
                    ;
                    extraBountyBasisPoints = 1.1 * 100;
                    tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
                    tokenAddress = constants_1.MYTHEREUM_ADDRESS;
                    return [4 /*yield*/, client.api.getAsset({ tokenAddress: tokenAddress, tokenId: tokenId })];
                case 1:
                    asset = _a.sent();
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId },
                            quantity: 1,
                            accountAddress: takerAddress,
                            startAmount: amountInToken,
                            paymentTokenAddress: paymentTokenAddress,
                            expirationTime: expirationTime,
                            extraBountyBasisPoints: extraBountyBasisPoints,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            waitForHighestBid: true
                        })];
                case 2:
                    sellOrder = _a.sent();
                    return [4 /*yield*/, client._makeBuyOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId, schemaName: types_1.WyvernSchemaName.ERC721 },
                            quantity: 1,
                            accountAddress: accountAddress,
                            paymentTokenAddress: paymentTokenAddress,
                            startAmount: amountInToken,
                            expirationTime: 0,
                            extraBountyBasisPoints: 0,
                            sellOrder: sellOrder
                        })
                        //testFeesMakerOrder(buyOrder, asset.collection)
                    ];
                case 3:
                    buyOrder = _a.sent();
                    //testFeesMakerOrder(buyOrder, asset.collection)
                    expect(sellOrder.taker).toEqual(constants_2.NULL_ADDRESS);
                    expect(buyOrder.taker).toEqual(sellOrder.maker);
                    expect(buyOrder.makerRelayerFee.toNumber()).toEqual(sellOrder.makerRelayerFee.toNumber());
                    expect(buyOrder.takerRelayerFee.toNumber()).toEqual(sellOrder.takerRelayerFee.toNumber());
                    expect(buyOrder.makerProtocolFee.toNumber()).toEqual(sellOrder.makerProtocolFee.toNumber());
                    expect(buyOrder.takerProtocolFee.toNumber()).toEqual(sellOrder.takerProtocolFee.toNumber());
                    return [4 /*yield*/, client._buyOrderValidationAndApprovals({ order: buyOrder, accountAddress: accountAddress })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, client._sellOrderValidationAndApprovals({ order: sellOrder, accountAddress: takerAddress })];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    ///TEST NEEDED
    it.skip("Creates ENS name buy order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var paymentTokenAddress, buyOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paymentTokenAddress = constants_1.WDOT_ADDRESS;
                    return [4 /*yield*/, devClient._makeBuyOrder({
                            asset: {
                                tokenId: ENS_HELLO_TOKEN_ID,
                                tokenAddress: ENS_DEV_TOKEN_ADDRESS,
                                name: ENS_HELLO_NAME,
                                schemaName: types_1.WyvernSchemaName.ENSShortNameAuction
                            },
                            quantity: 1,
                            accountAddress: ENS_DEV_SHORT_NAME_OWNER,
                            paymentTokenAddress: paymentTokenAddress,
                            startAmount: 0.01,
                            expirationTime: Math.round(Date.now() / 1000 + 60 * 60 * 24),
                            extraBountyBasisPoints: 0
                        })
                        // TODO (joshuawu): Fill this test out after backend supports ENS short names.
                        // expect(buyOrder).toEqual( {})
                    ];
                case 1:
                    buyOrder = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Matches a private sell order, doesn't for wrong taker", function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, takerAddress, amountInToken, bountyPercent, tokenId, tokenAddress, asset, order, _a, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    takerAddress = constants_1.ALICE_STASH_ADDRESS;
                    amountInToken = 2;
                    bountyPercent = 0;
                    tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
                    tokenAddress = constants_1.MYTHEREUM_ADDRESS;
                    return [4 /*yield*/, client.api.getAsset({ tokenAddress: tokenAddress, tokenId: tokenId })];
                case 1:
                    asset = _b.sent();
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId },
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: amountInToken,
                            extraBountyBasisPoints: bountyPercent * 100,
                            buyerAddress: takerAddress,
                            expirationTime: 0,
                            paymentTokenAddress: constants_2.NULL_ADDRESS,
                            waitForHighestBid: false
                        })];
                case 2:
                    order = _b.sent();
                    expect(order.paymentToken).toEqual(constants_2.NULL_ADDRESS);
                    expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInToken);
                    expect(order.extra.toNumber()).toEqual(0);
                    expect(order.expirationTime.toNumber()).toEqual(0);
                    //testFeesMakerOrder(order, asset.collection, bountyPercent * 100)
                    return [4 /*yield*/, client._sellOrderValidationAndApprovals({ order: order, accountAddress: accountAddress })
                        // Make sure match is valid
                    ];
                case 3:
                    //testFeesMakerOrder(order, asset.collection, bountyPercent * 100)
                    _b.sent();
                    // Make sure match is valid
                    _a = expect;
                    return [4 /*yield*/, testMatchingNewOrder(order, takerAddress)];
                case 4:
                    // Make sure match is valid
                    _a.apply(void 0, [_b.sent()]).toThrow();
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, testMatchingNewOrder(order, constants_1.CHARLIE_ADDRESS)];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_1 = _b.sent();
                    // It works!
                    return [2 /*return*/];
                case 8: return [2 /*return*/];
            }
        });
    }); });
    it('Matches a new dutch sell order of a small amount of ERC-20 item (DAI) for ETH', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, takerAddress, amountInEth, tokenId, tokenAddress, expirationTime, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    takerAddress = constants_1.ALICE_STASH_ADDRESS;
                    amountInEth = 0.012;
                    tokenId = null;
                    tokenAddress = daiAddress;
                    expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId, schemaName: types_1.WyvernSchemaName.ERC20 },
                            quantity: Math.pow(10, 18) * 0.01,
                            accountAddress: accountAddress,
                            startAmount: amountInEth,
                            endAmount: 0,
                            paymentTokenAddress: constants_2.NULL_ADDRESS,
                            extraBountyBasisPoints: 0,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: expirationTime,
                            waitForHighestBid: false
                        })];
                case 1:
                    order = _a.sent();
                    expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth);
                    expect(order.extra.toNumber()).toEqual(Math.pow(10, 18) * amountInEth);
                    expect(order.expirationTime.toNumber()).toEqual(expirationTime);
                    return [4 /*yield*/, client._sellOrderValidationAndApprovals({ order: order, accountAddress: accountAddress })
                        // Make sure match is valid
                    ];
                case 2:
                    _a.sent();
                    // Make sure match is valid
                    return [4 /*yield*/, testMatchingNewOrder(order, takerAddress)];
                case 3:
                    // Make sure match is valid
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Matches a new sell order of an 1155 item for ETH', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, takerAddress, amountInEth, tokenId, tokenAddress, asset, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    takerAddress = constants_1.ALICE_STASH_ADDRESS;
                    amountInEth = 2;
                    tokenId = constants_1.CATS_IN_MECHS_ID;
                    tokenAddress = constants_2.ENJIN_ADDRESS;
                    return [4 /*yield*/, client.api.getAsset({ tokenAddress: tokenAddress, tokenId: tokenId })];
                case 1:
                    asset = _a.sent();
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId, schemaName: types_1.WyvernSchemaName.ERC1155 },
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: amountInEth,
                            paymentTokenAddress: constants_2.NULL_ADDRESS,
                            extraBountyBasisPoints: 0,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: 0,
                            waitForHighestBid: false
                        })];
                case 2:
                    order = _a.sent();
                    expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth);
                    expect(order.extra.toNumber()).toEqual(0);
                    expect(order.expirationTime.toNumber()).toEqual(0);
                    //testFeesMakerOrder(order, asset.collection)
                    return [4 /*yield*/, client._sellOrderValidationAndApprovals({ order: order, accountAddress: accountAddress })
                        // Make sure match is valid
                    ];
                case 3:
                    //testFeesMakerOrder(order, asset.collection)
                    _a.sent();
                    // Make sure match is valid
                    return [4 /*yield*/, testMatchingNewOrder(order, takerAddress)];
                case 4:
                    // Make sure match is valid
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Matches a buy order of an 1155 item for W-ETH', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, takerAddress, paymentToken, amountInToken, tokenId, tokenAddress, asset, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountAddress = constants_1.ALICE_STASH_ADDRESS;
                    takerAddress = constants_1.ALICE_ADDRESS;
                    paymentToken = constants_1.WDOT_ADDRESS;
                    amountInToken = 0.01;
                    tokenId = constants_1.DISSOLUTION_TOKEN_ID;
                    tokenAddress = constants_2.ENJIN_ADDRESS;
                    return [4 /*yield*/, client.api.getAsset({ tokenAddress: tokenAddress, tokenId: tokenId })];
                case 1:
                    asset = _a.sent();
                    return [4 /*yield*/, client._makeBuyOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId, schemaName: types_1.WyvernSchemaName.ERC1155 },
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: amountInToken,
                            paymentTokenAddress: paymentToken,
                            expirationTime: 0,
                            extraBountyBasisPoints: 0
                        })];
                case 2:
                    order = _a.sent();
                    expect(order.taker).toEqual(constants_2.NULL_ADDRESS);
                    expect(order.paymentToken).toEqual(paymentToken);
                    expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInToken);
                    expect(order.extra.toNumber()).toEqual(0);
                    expect(order.expirationTime.toNumber()).toEqual(0);
                    //testFeesMakerOrder(order, asset.collection)
                    return [4 /*yield*/, client._buyOrderValidationAndApprovals({ order: order, accountAddress: accountAddress })
                        // Make sure match is valid
                    ];
                case 3:
                    //testFeesMakerOrder(order, asset.collection)
                    _a.sent();
                    // Make sure match is valid
                    return [4 /*yield*/, testMatchingNewOrder(order, takerAddress)];
                case 4:
                    // Make sure match is valid
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    ///TEST NEEDED  OK
    it('Matches a new bountied sell order for an ERC-20 token (MANA)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, takerAddress, paymentToken, amountInToken, bountyPercent, tokenId, tokenAddress, asset, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    takerAddress = constants_1.ALICE_STASH_ADDRESS;
                    return [4 /*yield*/, client.api.getPaymentTokens({ symbol: 'MANA' })];
                case 1:
                    paymentToken = (_a.sent()).tokens[0];
                    amountInToken = 5000;
                    bountyPercent = 1;
                    tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
                    tokenAddress = constants_1.MYTHEREUM_ADDRESS;
                    return [4 /*yield*/, client.api.getAsset({ tokenAddress: tokenAddress, tokenId: tokenId })];
                case 2:
                    asset = _a.sent();
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId },
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: amountInToken,
                            paymentTokenAddress: paymentToken.address,
                            extraBountyBasisPoints: bountyPercent * 100,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: 0,
                            waitForHighestBid: false
                        })];
                case 3:
                    order = _a.sent();
                    console.log(order);
                    expect(order.paymentToken).toEqual(paymentToken.address);
                    expect(order.basePrice.toNumber()).toEqual(Math.pow(10, paymentToken.decimals) * amountInToken);
                    expect(order.extra.toNumber()).toEqual(0);
                    expect(order.expirationTime.toNumber()).toEqual(0);
                    //testFeesMakerOrder(order, asset.collection, bountyPercent * 100)
                    return [4 /*yield*/, client._sellOrderValidationAndApprovals({ order: order, accountAddress: accountAddress })
                        // Make sure match is valid
                    ];
                case 4:
                    //testFeesMakerOrder(order, asset.collection, bountyPercent * 100)
                    _a.sent();
                    // Make sure match is valid
                    return [4 /*yield*/, testMatchingNewOrder(order, takerAddress)];
                case 5:
                    // Make sure match is valid
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    ///TEST NEEDED OK
    it('Matches a buy order with an ERC-20 token (DAI)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, takerAddress, paymentToken, amountInToken, tokenId, tokenAddress, asset, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    takerAddress = constants_1.ALICE_STASH_ADDRESS;
                    return [4 /*yield*/, client.api.getPaymentTokens({ symbol: 'DAI' })];
                case 1:
                    paymentToken = (_a.sent()).tokens[0];
                    amountInToken = 3;
                    tokenId = constants_1.CK_TOKEN_ID.toString();
                    tokenAddress = constants_1.CK_ADDRESS;
                    return [4 /*yield*/, client.api.getAsset({ tokenAddress: tokenAddress, tokenId: tokenId })
                        // console.log("================",tokenAddress)
                        // console.log(asset,paymentToken)
                    ];
                case 2:
                    asset = _a.sent();
                    return [4 /*yield*/, client._makeBuyOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId },
                            quantity: 1,
                            accountAddress: accountAddress,
                            startAmount: amountInToken,
                            paymentTokenAddress: paymentToken.address,
                            expirationTime: 0,
                            extraBountyBasisPoints: 0
                        })];
                case 3:
                    order = _a.sent();
                    console.log(order);
                    expect(order.taker).toEqual(constants_2.NULL_ADDRESS);
                    expect(order.paymentToken).toEqual(paymentToken.address);
                    expect(order.basePrice.toNumber()).toEqual(Math.pow(10, paymentToken.decimals) * amountInToken);
                    expect(order.extra.toNumber()).toEqual(0);
                    expect(order.expirationTime.toNumber()).toEqual(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Serializes payment token and matches most recent ERC-20 sell order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var takerAddress, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    takerAddress = constants_1.ALICE_ADDRESS;
                    return [4 /*yield*/, client.api.getOrder({
                            side: types_1.OrderSide.Sell,
                            payment_token_address: manaAddress
                        })];
                case 1:
                    order = _a.sent();
                    expect(order.paymentTokenContract).not.toBeNull();
                    if (!order.paymentTokenContract) {
                        return [2 /*return*/];
                    }
                    expect(order.paymentTokenContract.address).toEqual(manaAddress);
                    expect(order.paymentToken).toEqual(manaAddress);
                    // TODO why can't we test atomicMatch?
                    return [4 /*yield*/, testMatchingOrder(order, takerAddress, false)];
                case 2:
                    // TODO why can't we test atomicMatch?
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Bulk transfer', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, takerAddress, gas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    takerAddress = constants_1.ALICE_STASH_ADDRESS;
                    return [4 /*yield*/, client._estimateGasForTransfer({
                            assets: assetsForBulkTransfer,
                            fromAddress: accountAddress,
                            toAddress: takerAddress
                        })];
                case 1:
                    gas = _a.sent();
                    expect(gas).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Fungible tokens filter', function () { return __awaiter(void 0, void 0, void 0, function () {
        var manaTokens, mana, dai, all;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.api.getPaymentTokens({ symbol: "MANA" })];
                case 1:
                    manaTokens = (_a.sent()).tokens;
                    expect(manaTokens.length).toEqual(1);
                    mana = manaTokens[0];
                    expect(mana).not.toBeNull();
                    expect(mana.name).toEqual("Decentraland MANA");
                    expect(mana.address).toEqual("0x0f5d2fb29fb7d3cfee444a200298f468908cc942");
                    expect(mana.decimals).toEqual(18);
                    return [4 /*yield*/, client.api.getPaymentTokens({ symbol: "DAI" })];
                case 2:
                    dai = (_a.sent()).tokens[0];
                    expect(dai).not.toBeNull();
                    expect(dai.name).toEqual("Dai Stablecoin");
                    expect(dai.decimals).toEqual(18);
                    return [4 /*yield*/, client.api.getPaymentTokens()];
                case 3:
                    all = _a.sent();
                    expect(all).not.toHaveLength(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('orderToJSON computes correct current price for Dutch auctions', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.api.getOrders({ sale_kind: types_1.SaleKind.DutchAuction })];
                case 1:
                    orders = (_a.sent()).orders;
                    expect(orders.length).toEqual(client.api.pageSize);
                    orders.map(function (order) {
                        expect(order.currentPrice).not.toBeNull();
                        var buyerFeeBPS = order.asset
                            ? order.asset.assetContract.buyerFeeBasisPoints
                            : order.assetBundle && order.assetBundle.assetContract
                                ? order.assetBundle.assetContract.buyerFeeBasisPoints
                                : null;
                        if (!order.currentPrice || buyerFeeBPS) {
                            // Skip checks with buyer fees
                            return;
                        }
                        var multiple = order.side == types_1.OrderSide.Sell
                            ? +order.takerRelayerFee / constants_2.INVERSE_BASIS_POINT + 1
                            : 1;
                        // Possible race condition
                        expect(order.currentPrice.toPrecision(3)).toEqual((0, utils_1.estimateCurrentPrice)(order).toPrecision(3));
                        expect(order.basePrice.times(multiple).toNumber()).toBeGreaterThanOrEqual(order.currentPrice.toNumber());
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('orderToJSON current price includes buyer fee', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.api.getOrders({
                        sale_kind: types_1.SaleKind.FixedPrice,
                        asset_contract_address: CRYPTOFLOWERS_CONTRACT_ADDRESS_WITH_BUYER_FEE,
                        bundled: false,
                        side: types_1.OrderSide.Sell,
                        is_english: false
                    })];
                case 1:
                    orders = (_a.sent()).orders;
                    expect(orders).not.toHaveLength(0);
                    orders.map(function (order) {
                        expect(order.currentPrice).not.toBeNull();
                        expect(order.asset).not.toBeNull();
                        if (!order.currentPrice || !order.asset) {
                            return;
                        }
                        var buyerFeeBPS = order.takerRelayerFee;
                        var multiple = +buyerFeeBPS / constants_2.INVERSE_BASIS_POINT + 1;
                        expect(order.basePrice.times(multiple).toNumber()).toEqual((0, utils_1.estimateCurrentPrice)(order).toNumber());
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    ///TEST NEEDED
    it('orderToJSON current price does not include buyer fee for English auctions', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.api.getOrders({
                        side: types_1.OrderSide.Sell,
                        is_english: true
                    })];
                case 1:
                    orders = (_a.sent()).orders;
                    expect(orders).not.toHaveLength(0);
                    orders.map(function (order) {
                        expect(order.currentPrice).not.toBeNull();
                        expect(order.asset).not.toBeNull();
                        if (!order.currentPrice || !order.asset) {
                            return;
                        }
                        expect(order.basePrice.toNumber()).toEqual((0, utils_1.estimateCurrentPrice)(order).toNumber());
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it.skip('Matches first buy order in book', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, assetOrBundle, takerAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.api.getOrder({ side: types_1.OrderSide.Buy })];
                case 1:
                    order = _a.sent();
                    expect(order).not.toBeNull();
                    if (!order) {
                        return [2 /*return*/];
                    }
                    assetOrBundle = order.asset || order.assetBundle;
                    expect(assetOrBundle).not.toBeNull();
                    if (!assetOrBundle) {
                        return [2 /*return*/];
                    }
                    takerAddress = order.maker;
                    // Taker might not have all approval permissions so only test match
                    return [4 /*yield*/, testMatchingOrder(order, takerAddress, false)];
                case 2:
                    // Taker might not have all approval permissions so only test match
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    ///TEST NEEDED
    it('Matches a buy order and estimates gas on fulfillment', function () { return __awaiter(void 0, void 0, void 0, function () {
        var takerAddress, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    takerAddress = constants_1.ALICE_ADDRESS;
                    return [4 /*yield*/, client.api.getOrder({
                            side: types_1.OrderSide.Buy,
                            owner: takerAddress,
                            // Use a token that has already been approved via approve-all
                            asset_contract_address: constants_1.DIGITAL_ART_CHAIN_ADDRESS
                        })];
                case 1:
                    order = _a.sent();
                    expect(order).not.toBeNull();
                    if (!order) {
                        return [2 /*return*/];
                    }
                    expect(order.asset).not.toBeNull();
                    if (!order.asset) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, testMatchingOrder(order, takerAddress, true)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('  cancel order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    return [4 /*yield*/, client.api.getOrder({
                            side: types_1.OrderSide.Buy,
                            owner: accountAddress,
                            // Use a token that has already been approved via approve-all
                            asset_contract_address: constants_1.DIGITAL_ART_CHAIN_ADDRESS
                        })];
                case 1:
                    order = _a.sent();
                    expect(order).not.toBeNull();
                    if (!order) {
                        return [2 /*return*/];
                    }
                    expect(order.asset).not.toBeNull();
                    if (!order.asset) {
                        return [2 /*return*/];
                    }
                    // order = await getOrderP(order,[accountAddress])
                    return [4 /*yield*/, client.cancelOrder({ order: order, accountAddress: accountAddress })];
                case 2:
                    // order = await getOrderP(order,[accountAddress])
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it.only('Matches a buy order and  fulfillment', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, order, recipientAddress, matchingOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountAddress = constants_1.BOB_ADDRESS;
                    return [4 /*yield*/, client.api.getOrder({
                            side: types_1.OrderSide.Buy,
                            owner: accountAddress,
                            // Use a token that has already been approved via approve-all
                            asset_contract_address: constants_1.DIGITAL_ART_CHAIN_ADDRESS
                        })];
                case 1:
                    order = _a.sent();
                    order.side = types_1.OrderSide.Buy;
                    recipientAddress = order.side === types_1.OrderSide.Sell ? constants_1.ALICE_ADDRESS : accountAddress;
                    matchingOrder = client._makeMatchingOrder({
                        order: order,
                        accountAddress: accountAddress,
                        recipientAddress: recipientAddress
                    });
                    order.calldata = matchingOrder.calldata;
                    order.replacementPattern = matchingOrder.replacementPattern;
                    // console.log("======order=====", order)
                    order.side = types_1.OrderSide.Sell;
                    recipientAddress = order.side === types_1.OrderSide.Sell ? constants_1.ALICE_STASH_ADDRESS : accountAddress;
                    expect(order).not.toBeNull();
                    if (!order) {
                        console.log("===========");
                        return [2 /*return*/];
                    }
                    expect(order.asset).not.toBeNull();
                    if (!order.asset) {
                        console.log("======d=====");
                        return [2 /*return*/];
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
                    return [4 /*yield*/, client.fulfillOrder({ order: order, accountAddress: accountAddress, recipientAddress: recipientAddress })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Matches a referred order via sell_orders and getAssets', function () { return __awaiter(void 0, void 0, void 0, function () {
        var assets, asset, order, takerAddress, referrerAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.api.getAssets({ asset_contract_address: CRYPTO_CRYSTAL_ADDRESS, order_by: "current_price", order_direction: "desc" })];
                case 1:
                    assets = (_a.sent()).assets;
                    asset = assets.filter(function (a) { return !!a.sellOrders; })[0];
                    expect(asset).not.toBeNull();
                    if (!asset || !asset.sellOrders) {
                        return [2 /*return*/];
                    }
                    order = asset.sellOrders[0];
                    expect(order).not.toBeNull();
                    if (!order) {
                        return [2 /*return*/];
                    }
                    takerAddress = constants_1.ALICE_ADDRESS;
                    referrerAddress = constants_1.ALICE_STASH_ADDRESS;
                    return [4 /*yield*/, testMatchingOrder(order, takerAddress, true, referrerAddress)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
function testMatchingOrder(order, accountAddress, testAtomicMatch, referrerAddress) {
    if (testAtomicMatch === void 0) { testAtomicMatch = false; }
    return __awaiter(this, void 0, void 0, function () {
        var recipientAddress, matchingOrder, _a, buy, sell, isValid, isValid, isFulfillable, gasPrice;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    recipientAddress = order.side === types_1.OrderSide.Sell ? constants_1.ALICE_STASH_ADDRESS : accountAddress;
                    matchingOrder = client._makeMatchingOrder({
                        order: order,
                        accountAddress: accountAddress,
                        recipientAddress: recipientAddress
                    });
                    expect(matchingOrder.hash).toEqual((0, utils_1.getOrderHash)(matchingOrder));
                    _a = (0, utils_1.assignOrdersToSides)(order, matchingOrder), buy = _a.buy, sell = _a.sell;
                    if (!!order.waitingForBestCounterOrder) return [3 /*break*/, 2];
                    return [4 /*yield*/, client._validateMatch({ buy: buy, sell: sell, accountAddress: accountAddress })];
                case 1:
                    isValid = _b.sent();
                    expect(isValid).toBeTruthy();
                    return [3 /*break*/, 3];
                case 2:
                    console.info("English Auction detected, skipping validation");
                    _b.label = 3;
                case 3:
                    if (!(testAtomicMatch && !order.waitingForBestCounterOrder)) return [3 /*break*/, 7];
                    return [4 /*yield*/, client._validateOrder(order)];
                case 4:
                    isValid = _b.sent();
                    expect(isValid).toBeTruthy();
                    return [4 /*yield*/, client.isOrderFulfillable({
                            order: order,
                            accountAddress: accountAddress,
                            recipientAddress: recipientAddress,
                            referrerAddress: referrerAddress
                        })];
                case 5:
                    isFulfillable = _b.sent();
                    expect(isFulfillable).toBeTruthy();
                    return [4 /*yield*/, client._computeGasPrice()];
                case 6:
                    gasPrice = _b.sent();
                    console.info("Gas price to use: ".concat(gasPrice, " gwei"));
                    _b.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.testMatchingOrder = testMatchingOrder;
function testMatchingNewOrder(unhashedOrder, accountAddress, counterOrderListingTime) {
    return __awaiter(this, void 0, void 0, function () {
        var order, matchingOrder, v, r, s, buy, sell, isValid;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    order = __assign(__assign({}, unhashedOrder), { hash: (0, utils_1.getOrderHash)(unhashedOrder) });
                    matchingOrder = client._makeMatchingOrder({
                        order: order,
                        accountAddress: accountAddress,
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
                    v = 27;
                    r = '';
                    s = '';
                    if (order.side == types_1.OrderSide.Buy) {
                        buy = __assign(__assign({}, order), { v: v, r: r, s: s });
                        sell = __assign(__assign({}, matchingOrder), { v: v, r: r, s: s });
                    }
                    else {
                        sell = __assign(__assign({}, order), { v: v, r: r, s: s });
                        buy = __assign(__assign({}, matchingOrder), { v: v, r: r, s: s });
                    }
                    return [4 /*yield*/, client._validateMatch({ buy: buy, sell: sell, accountAddress: accountAddress })];
                case 1:
                    isValid = _a.sent();
                    expect(isValid).toBeTruthy();
                    // Make sure assets are transferrable
                    return [4 /*yield*/, Promise.all(getAssetsAndQuantities(order).map(function (_a) {
                            var asset = _a.asset, quantity = _a.quantity;
                            return __awaiter(_this, void 0, void 0, function () {
                                var fromAddress, toAddress, useProxy, isTransferrable;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            fromAddress = sell.maker;
                                            toAddress = buy.maker;
                                            useProxy = asset.tokenAddress === constants_1.CK_ADDRESS || asset.schemaName === types_1.WyvernSchemaName.ERC20;
                                            return [4 /*yield*/, client.isAssetTransferrable({
                                                    asset: asset,
                                                    quantity: quantity,
                                                    fromAddress: fromAddress,
                                                    toAddress: toAddress,
                                                    useProxy: useProxy
                                                })];
                                        case 1:
                                            isTransferrable = _b.sent();
                                            expect(isTransferrable).toBeTruthy(); // `Not transferrable: ${asset.tokenAddress} # ${asset.tokenId} schema ${asset.schemaName} quantity ${quantity} from ${fromAddress} to ${toAddress} using proxy: ${useProxy}`
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        }))];
                case 2:
                    // Make sure assets are transferrable
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.testMatchingNewOrder = testMatchingNewOrder;
function getAssetsAndQuantities(order) {
    var wyAssets = 'bundle' in order.metadata
        ? order.metadata.bundle.assets
        : order.metadata.asset
            ? [order.metadata.asset]
            : [];
    var schemaNames = 'bundle' in order.metadata && 'schemas' in order.metadata.bundle
        ? order.metadata.bundle.schemas
        : 'schema' in order.metadata
            ? [order.metadata.schema]
            : [];
    expect(wyAssets).not.toHaveLength(0);
    expect(wyAssets.length).toEqual(schemaNames.length);
    return wyAssets.map(function (wyAsset, i) {
        var asset = {
            tokenId: 'id' in wyAsset && wyAsset.id != null ? wyAsset.id : null,
            tokenAddress: wyAsset.address,
            schemaName: schemaNames[i]
        };
        if ('quantity' in wyAsset) {
            return { asset: asset, quantity: new bignumber_js_1.BigNumber(wyAsset.quantity) };
        }
        else {
            return { asset: asset, quantity: new bignumber_js_1.BigNumber(1) };
        }
    });
}
