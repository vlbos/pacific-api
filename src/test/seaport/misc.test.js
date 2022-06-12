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
var index_1 = require("../../pacific-js/index");
var types_1 = require("../../pacific-js/types");
var utils_1 = require("../../pacific-js/utils/utils");
var constants_1 = require("../../pacific-js/constants");
var contracts_1 = require("../../pacific-js/contracts");
var constants_2 = require("../../pacific-js/constants");
// const provider = new Web3.providers.HttpProvider(MAINNET_PROVIDER_URL)
var api_1 = require("@polkadot/api");
var provider = new api_1.WsProvider('ws://127.0.0.1:9944/');
var devProvider = new api_1.WsProvider('ws://127.0.0.1:9944/');
var client = new index_1.OpenSeaPort(provider, {
    networkName: types_1.Network.Main,
    apiKey: constants_1.MAINNET_API_KEY
}, function (line) { return console.info("MAINNET: ".concat(line)); });
describe('seaport: misc', function () {
    test('Instance has public methods', function () {
        expect(typeof client.getCurrentPrice).toEqual('function');
        expect(typeof client.wrapEth).toEqual('function');
    });
    test('Instance exposes API methods', function () {
        expect(typeof client.api.getOrder).toEqual('function');
        expect(typeof client.api.getOrders).toEqual('function');
        expect(typeof client.api.postOrder).toEqual('function');
    });
    test('Instance exposes some underscored methods', function () {
        expect(typeof client._initializeProxy).toEqual('function');
        expect(typeof client._getProxy).toEqual('function');
    });
    test('Uses a gas price above the mean', function () { return __awaiter(void 0, void 0, void 0, function () {
        var gasPrice, meanGasPrice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client._computeGasPrice()];
                case 1:
                    gasPrice = _a.sent();
                    return [4 /*yield*/, (0, utils_1.getCurrentGasPrice)(client.papi)];
                case 2:
                    meanGasPrice = _a.sent();
                    expect(meanGasPrice.toNumber()).toBeGreaterThan(0);
                    expect(gasPrice.toNumber()).toBeGreaterThan(meanGasPrice.toNumber());
                    return [2 /*return*/];
            }
        });
    }); });
    test('Fetches proxy for an account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, proxy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    return [4 /*yield*/, client._getProxy(accountAddress)];
                case 1:
                    proxy = _a.sent();
                    expect(proxy).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Fetches positive token balance for an account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    return [4 /*yield*/, client.getTokenBalance({ accountAddress: accountAddress, tokenAddress: constants_1.WDOT_ADDRESS })];
                case 1:
                    balance = _a.sent();
                    expect(balance.toNumber()).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Accounts have maximum token balance approved', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, approved;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountAddress = constants_1.ALICE_ADDRESS;
                    return [4 /*yield*/, client._getApprovedTokenCount({ accountAddress: accountAddress })];
                case 1:
                    approved = _a.sent();
                    expect(approved.toString()).toEqual(constants_2.MAX_UINT_256.toString());
                    return [2 /*return*/];
            }
        });
    }); });
    test('Single-approval tokens are approved for tester address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, proxyAddress, tokenId, tokenAddress, erc721, approvedAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountAddress = constants_1.ALICE_STASH_ADDRESS;
                    return [4 /*yield*/, client._getProxy(accountAddress)];
                case 1:
                    proxyAddress = _a.sent();
                    tokenId = constants_1.CK_TOKEN_ID.toString();
                    tokenAddress = constants_2.CK_ADDRESS;
                    return [4 /*yield*/, client.papi.eth.contract(contracts_1.ERC721).at(tokenAddress)];
                case 2:
                    erc721 = _a.sent();
                    return [4 /*yield*/, (0, utils_1.getNonCompliantApprovalAddress)(erc721, tokenId, accountAddress)];
                case 3:
                    approvedAddress = _a.sent();
                    expect(approvedAddress).toEqual(proxyAddress);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Checks whether an address is a contract addrress', function () { return __awaiter(void 0, void 0, void 0, function () {
        var smartContractWalletAddress, acccountOneIsContractAddress, nonSmartContractWalletAddress, acccountTwoIsContractAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    smartContractWalletAddress = constants_1.EVE_ADDRESS;
                    return [4 /*yield*/, (0, utils_1.isContractAddress)(client.papi, smartContractWalletAddress)];
                case 1:
                    acccountOneIsContractAddress = _a.sent();
                    nonSmartContractWalletAddress = constants_1.DAVE_ADDRESS;
                    return [4 /*yield*/, (0, utils_1.isContractAddress)(client.papi, nonSmartContractWalletAddress)];
                case 2:
                    acccountTwoIsContractAddress = _a.sent();
                    expect(acccountOneIsContractAddress).toEqual(true);
                    expect(acccountTwoIsContractAddress).toEqual(false);
                    return [2 /*return*/];
            }
        });
    }); });
});
