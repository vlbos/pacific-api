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
var index_1 = require("../../pacific-js/index");
// import { WyvernProtocol } from '../../lib/wyvern-js'
var types_1 = require("../../pacific-js/types");
var pacific_js_1 = require("../../pacific-js");
var constants_1 = require("../constants");
var utils_1 = require("../../pacific-js/utils/utils");
var constants_2 = require("../../pacific-js/constants");
// import types from '../../pacific-js/config/types.json';
// import rpcs from '../../pacific-js/config/rpcs.json';
// const rpc = { ...rpcs };
// import { makeOrderArrayEx, makeOrderEx, makeOrder, orderFromJSON } from '../orders/order'
var ordersJSONFixture = require("../fixtures/orders.json");
var ordersJSON = ordersJSONFixture;
var englishSellOrderJSON = ordersJSON[0];
// const provider = new Web3.providers.HttpProvider(MAINNET_PROVIDER_URL)
var provider = {}; //new WsProvider();//LOCALNET_PROVIDER_URL);
var client = new index_1.OpenSeaPort(provider, {
    networkName: types_1.Network.Main,
    apiKey: constants_1.MAINNET_API_KEY
}, function (line) { return console.info("MAINNET: ".concat(line)); });
var users;
var api;
var accounts;
var salary = 100000000000000;
var apiHelper_1 = require("../../api/test/helpers/apiHelper");
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var papi;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(90000);
                    process.env.NODE_ENV = 'test';
                    return [4 /*yield*/, (0, apiHelper_1.createApiAndTestAccounts)()];
                case 1:
                    papi = _a.sent();
                    api = papi.api;
                    accounts = papi.accounts;
                    users = papi.users;
                    // submit(api, api.tx.balances.transfer(users.betty.key.address, salary), users.bobBank);
                    // submit(api, api.tx.balances.transfer(users.bob.key.address, salary), users.bobBank);
                    return [2 /*return*/, { api: api, accounts: accounts }];
            }
        });
    });
}
describe('api tests', function () {
    var second = 1000;
    var block = 6.5 * second;
    var minute = 60 * second;
    var hour = 60 * minute;
    var day = 24 * hour;
    var api;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            jest.setTimeout(90 * 1000);
            return [2 /*return*/];
        });
    }); });
    afterAll(function () {
        //   return clearCityDatabase();
        // saveNonce(users)
    });
    it('API fetches bundles and prefetches sell orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var bundles, bundle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, constants_1.apiToTest.getBundles({ asset_contract_address: constants_1.CK_DEV_ADDRESS, on_sale: true })];
                case 1:
                    bundles = (_a.sent()).bundles;
                    expect(bundles).toBeInstanceOf(Array);
                    bundle = bundles[0];
                    expect(bundle).not.toBeNull();
                    if (!bundle) {
                        return [2 /*return*/];
                    }
                    expect(bundle.assets.map(function (a) { return a.assetContract.name; })).toContain("CryptoKittiesDev");
                    expect(bundle.sellOrders).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Includes API key in token request', function () { return __awaiter(void 0, void 0, void 0, function () {
        var oldLogger, logPromise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oldLogger = constants_1.devApi.logger;
                    logPromise = new Promise(function (resolve, reject) {
                        constants_1.devApi.logger = function (log) {
                            try {
                                expect(log).toContain("\"X-API-KEY\":\"".concat(constants_1.DEV_API_KEY, "\""));
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
                    return [4 /*yield*/, logPromise];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('An API asset\'s order has correct hash', function () { return __awaiter(void 0, void 0, void 0, function () {
        var asset, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("==================");
                    // const s:OrderId = new OrderId(1);//stringToU8a("null");
                    // // (async function () { 
                    // console.log("=============dddddd",s)
                    console.log("==================");
                    return [4 /*yield*/, client.api.getAsset({ tokenAddress: constants_1.CK_ADDRESS, tokenId: 1 })];
                case 1:
                    asset = _a.sent();
                    expect(asset.orders).not.toBeNull();
                    if (!asset.orders) {
                        return [2 /*return*/];
                    }
                    order = asset.orders[0];
                    expect(order).not.toBeNull();
                    if (!order) {
                        return [2 /*return*/];
                    }
                    expect(order.hash).toEqual((0, utils_1.getOrderHash)(order));
                    return [2 /*return*/];
            }
        });
    }); });
    it('orderToJSON is correct', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, quantity, amountInToken, paymentTokenAddress, extraBountyBasisPoints, expirationTime, englishAuctionReservePrice, tokenId, tokenAddress, order, hashedOrder, orderData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    quantity = 1;
                    amountInToken = 1.2;
                    paymentTokenAddress = constants_1.WDOT_ADDRESS;
                    extraBountyBasisPoints = 0;
                    expirationTime = Math.round(Date.now() / 1000 + 60) // one minute from now
                    ;
                    englishAuctionReservePrice = 2;
                    tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
                    tokenAddress = constants_1.MYTHEREUM_ADDRESS;
                    return [4 /*yield*/, client._makeSellOrder({
                            asset: { tokenAddress: tokenAddress, tokenId: tokenId },
                            quantity: quantity,
                            accountAddress: accountAddress,
                            startAmount: amountInToken,
                            paymentTokenAddress: paymentTokenAddress,
                            extraBountyBasisPoints: extraBountyBasisPoints,
                            buyerAddress: constants_2.NULL_ADDRESS,
                            expirationTime: expirationTime,
                            waitForHighestBid: true,
                            englishAuctionReservePrice: englishAuctionReservePrice
                        })];
                case 1:
                    order = _a.sent();
                    hashedOrder = __assign(__assign({}, order), { hash: (0, utils_1.getOrderHash)(order) });
                    orderData = (0, pacific_js_1.orderToJSON)(hashedOrder);
                    expect(orderData.quantity).toEqual(quantity.toString());
                    expect(orderData.maker).toEqual(accountAddress);
                    expect(orderData.taker).toEqual(constants_2.NULL_ADDRESS);
                    // expect(orderData.basePrice).toEqual( WyvernProtocol.toBaseUnitAmount(makeBigNumber(amountInToken), 18).toString())
                    expect(orderData.paymentToken).toEqual(paymentTokenAddress);
                    expect(orderData.extra).toEqual(extraBountyBasisPoints.toString());
                    expect(orderData.expirationTime).toEqual(expirationTime + constants_2.ORDER_MATCHING_LATENCY_SECONDS);
                    return [2 /*return*/];
            }
        });
    }); });
    test('API fetches tokens', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tokens;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, constants_1.apiToTest.getPaymentTokens({ symbol: "MANA" })];
                case 1:
                    tokens = (_a.sent()).tokens;
                    expect(Array.isArray(tokens)).toBe(true);
                    expect(tokens.length).toEqual(1);
                    expect(tokens[0].name).toEqual("Decentraland MANA");
                    return [2 /*return*/];
            }
        });
    }); });
    test('Dev API orders have correct OpenSea url', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, constants_1.devApi.getOrder({})];
                case 1:
                    order = _a.sent();
                    if (!order.asset) {
                        return [2 /*return*/];
                    }
                    url = "https://dev.opensea.io/assets/".concat(order.asset.assetContract.address, "/").concat(order.asset.tokenId);
                    expect(order.asset.openseaLink).toEqual(url);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Mainnet API orders have correct OpenSea url', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, constants_1.mainApi.getOrder({})];
                case 1:
                    order = _a.sent();
                    if (!order.asset) {
                        return [2 /*return*/];
                    }
                    url = "https://opensea.io/assets/".concat(order.asset.assetContract.address, "/").concat(order.asset.tokenId);
                    expect(order.asset.openseaLink).toEqual(url);
                    return [2 /*return*/];
            }
        });
    }); });
    it('API fetches orderbook', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, orders, count;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, constants_1.apiToTest.getOrders()];
                case 1:
                    _a = _b.sent(), orders = _a.orders, count = _a.count;
                    expect(orders).toBeInstanceOf(Array);
                    expect(count).toBeInstanceOf(Number);
                    expect(orders.length).toEqual(constants_1.apiToTest.pageSize);
                    return [2 /*return*/];
            }
        });
    }); });
    it('API can change page size', function () { return __awaiter(void 0, void 0, void 0, function () {
        var defaultPageSize, orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    defaultPageSize = constants_1.apiToTest.pageSize;
                    constants_1.apiToTest.pageSize = 7;
                    return [4 /*yield*/, constants_1.apiToTest.getOrders()];
                case 1:
                    orders = (_a.sent()).orders;
                    expect(orders.length).toEqual(7);
                    constants_1.apiToTest.pageSize = defaultPageSize;
                    return [2 /*return*/];
            }
        });
    }); });
    if (constants_2.ORDERBOOK_VERSION > 0) {
        it('API orderbook paginates', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, orders, count, pagination;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, constants_1.apiToTest.getOrders()];
                    case 1:
                        _a = _b.sent(), orders = _a.orders, count = _a.count;
                        return [4 /*yield*/, constants_1.apiToTest.getOrders({}, 2)];
                    case 2:
                        pagination = _b.sent();
                        expect(pagination.orders.length).toEqual(constants_1.apiToTest.pageSize);
                        expect(pagination.orders[0]).not.toStrictEqual(orders[0]);
                        expect(pagination.count).toEqual(count);
                        return [2 /*return*/];
                }
            });
        }); });
    }
    it('API fetches orders for asset contract and asset', function () { return __awaiter(void 0, void 0, void 0, function () {
        var forKitties, forKitty;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, constants_1.apiToTest.getOrders({ asset_contract_address: constants_1.CK_DEV_ADDRESS })];
                case 1:
                    forKitties = _a.sent();
                    expect(forKitties.orders.length).toBeGreaterThan(0);
                    expect(forKitties.count).toBeGreaterThan(0);
                    return [4 /*yield*/, constants_1.apiToTest.getOrders({ asset_contract_address: constants_1.CK_DEV_ADDRESS, token_id: constants_1.CK_DEV_TOKEN_ID })];
                case 2:
                    forKitty = _a.sent();
                    expect(forKitty.orders).toBeInstanceOf(Array);
                    return [2 /*return*/];
            }
        });
    }); });
    it('API fetches orders for asset owner', function () { return __awaiter(void 0, void 0, void 0, function () {
        var forOwner, owners;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, constants_1.apiToTest.getOrders({ owner: constants_1.ALICE_ADDRESS })];
                case 1:
                    forOwner = _a.sent();
                    expect(forOwner.orders.length).toBeGreaterThan(0);
                    expect(forOwner.count).toBeGreaterThan(0);
                    owners = forOwner.orders.map(function (o) { return o.asset && o.asset.owner && o.asset.owner.address; });
                    owners.forEach(function (owner) {
                        expect([constants_1.ALICE_ADDRESS, constants_2.NULL_ADDRESS]).toContain(owner);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('API fetches buy orders for maker', function () { return __awaiter(void 0, void 0, void 0, function () {
        var forMaker;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, constants_1.apiToTest.getOrders({ maker: constants_1.ALICE_ADDRESS, side: types_1.OrderSide.Buy })];
                case 1:
                    forMaker = _a.sent();
                    expect(forMaker.orders.length).toBeGreaterThan(0);
                    expect(forMaker.count).toBeGreaterThan(0);
                    forMaker.orders.forEach(function (order) {
                        expect(constants_1.ALICE_ADDRESS).toEqual(order.maker);
                        expect(types_1.OrderSide.Buy).toEqual(order.side);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    ///NEEDED TEST 
    it.only("API  fetch  orders", function () { return __awaiter(void 0, void 0, void 0, function () {
        var s;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, constants_1.apiToTest.getOrder(englishSellOrderJSON)];
                case 1:
                    s = _a.sent();
                    console.log(s);
                    return [2 /*return*/];
            }
        });
    }); });
    it("API  post  orders", function () { return __awaiter(void 0, void 0, void 0, function () {
        var s;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, constants_1.apiToTest.postOrder(englishSellOrderJSON)];
                case 1:
                    s = _a.sent();
                    console.log(s);
                    return [2 /*return*/];
            }
        });
    }); });
    it("API  post  postAssetWhitelist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var s;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, constants_1.apiToTest.postAssetWhitelist("tokenAddress: string", "tokenId: string | number", "email: string")];
                case 1:
                    s = _a.sent();
                    console.log(s);
                    return [2 /*return*/];
            }
        });
    }); });
    it("API doesn't fetch impossible orders", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = expect;
                    return [4 /*yield*/, constants_1.apiToTest.getOrder({ maker: constants_1.ALICE_ADDRESS, taker: constants_1.ALICE_ADDRESS })];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toThrow();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    expect(e_1.message).toContain("Not found");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it('API excludes cancelledOrFinalized and markedInvalid orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orders, finishedOrders, invalidOrders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, constants_1.apiToTest.getOrders({ limit: 100 })];
                case 1:
                    orders = (_a.sent()).orders;
                    finishedOrders = orders.filter(function (o) { return o.cancelledOrFinalized; });
                    expect(finishedOrders).toHaveLength(0);
                    invalidOrders = orders.filter(function (o) { return o.markedInvalid; });
                    expect(invalidOrders).toHaveLength(0);
                    return [2 /*return*/];
            }
        });
    }); });
    ///NEEDED TEST 
    it('API fetches fees for an asset', function () { return __awaiter(void 0, void 0, void 0, function () {
        var asset;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, constants_1.apiToTest.getAsset({ tokenAddress: constants_1.CK_DEV_ADDRESS, tokenId: constants_1.CK_DEV_TOKEN_ID })];
                case 1:
                    asset = _a.sent();
                    expect(asset.tokenId).toEqual(constants_1.CK_DEV_TOKEN_ID.toString());
                    expect(asset.assetContract.name).toEqual("CryptoKittiesDev");
                    expect(asset.assetContract.sellerFeeBasisPoints).toEqual(constants_1.CK_DEV_SELLER_FEE);
                    return [2 /*return*/];
            }
        });
    }); });
    it('API fetches assets', function () { return __awaiter(void 0, void 0, void 0, function () {
        var assets, asset;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, constants_1.apiToTest.getAssets({ asset_contract_address: constants_1.CK_DEV_ADDRESS, order_by: "current_price" })];
                case 1:
                    assets = (_a.sent()).assets;
                    expect(assets).toBeInstanceOf(Array);
                    expect(assets.length).toEqual(constants_1.apiToTest.pageSize);
                    asset = assets[0];
                    expect(asset.assetContract.name).toEqual("CryptoKittiesDev");
                    return [2 /*return*/];
            }
        });
    }); });
    it('API handles errors', function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1, error_2, res, order, newOrder, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, constants_1.apiToTest.get('/user')];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    expect(error_1.message).toMatch("Unauthorized");
                    return [3 /*break*/, 3];
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, constants_1.apiToTest.get("/asset/".concat(constants_1.CK_DEV_ADDRESS, "/0"))];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    expect(error_2.message).toMatch("Not found");
                    return [3 /*break*/, 6];
                case 6: return [4 /*yield*/, constants_1.apiToTest.getOrders({
                        // Get an old order to make sure listing time is too early
                        listed_before: Math.round(Date.now() / 1000 - 3600)
                    })];
                case 7:
                    res = _a.sent();
                    order = res.orders[0];
                    expect(order).not.toBeNull();
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 10, , 11]);
                    newOrder = __assign(__assign({}, (0, pacific_js_1.orderToJSON)(order)), { v: 1, r: "", s: "" });
                    return [4 /*yield*/, constants_1.apiToTest.postOrder(newOrder)];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 11];
                case 10:
                    error_3 = _a.sent();
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    }); });
});
