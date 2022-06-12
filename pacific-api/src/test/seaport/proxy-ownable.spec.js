"use strict";
// Copyright 2019 Parity Technologies (UK) Ltd.
// This file is part of Substrate.
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
// Substrate is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// Substrate is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with Substrate. If not, see <http://www.gnu.org/licenses/>.
var api_1 = require("@polkadot/api");
var testing_1 = require("@polkadot/keyring/testing");
var api_contract_1 = require("@polkadot/api-contract");
var bn_js_1 = require("bn.js");
var api_contract_2 = require("@polkadot/api-contract");
var consts_1 = require("./consts");
var configHelper_1 = require("./configHelper");
// This is a test account that is going to be created and funded each test.
var keyring = (0, testing_1.createTestKeyring)({ type: "sr25519" });
var alicePair = keyring.getPair(consts_1.ALICE);
var bobPair = keyring.getPair(consts_1.BOB);
var salary = 100000000000000;
var erc20abi = require("../../wyvern-js/abisv2/erc20/metadata.json");
var erc721abi = require("../../wyvern-js/abisv2/erc721/metadata.json");
var authenticated_proxyabi = require("../../wyvern-js/abisv2/authenticated_proxy/metadata.json");
var ownable_delegate_proxyabi = require("../../wyvern-js/abisv2/ownable_delegate_proxy/metadata.json");
var wyvern_atomicizerabi = require("../../wyvern-js/abisv2/wyvern_atomicizer/metadata.json");
var wyvern_proxy_registryabi = require("../../wyvern-js/abisv2/wyvern_proxy_registry/metadata.json");
var wyvern_token_transfer_proxyabi = require("../../wyvern-js/abisv2/wyvern_token_transfer_proxy/metadata.json");
var charliePair = keyring.getPair(consts_1.CHARLIE);
var davePair = keyring.getPair(consts_1.DAVE);
var evePair = keyring.getPair(consts_1.EVE);
var ferdiePair = keyring.getPair(consts_1.FERDIE);
var address = "5Hq75BNUQiqbjZRWehHtFMhvWU1P57DBqJM81kTExTRgxyAG";
var utils_1 = require("./utils");
// // const abi = erc20abi;
var value = 0; // only useful on isPayable messagess
var abis = { "auth": authenticated_proxyabi, "delegate": ownable_delegate_proxyabi, "atom": wyvern_atomicizerabi, "registry": wyvern_proxy_registryabi, "token": wyvern_token_transfer_proxyabi, "erc20": erc20abi, "erc721": erc721abi };
var contracts = {};
// NOTE the apps UI specified these in mega units
var gasLimit = new bn_js_1["default"](300000) * new bn_js_1["default"](1000000);
var testAccount;
var api;
var contract;
var addresses;
jest.useRealTimers();
var erc20;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var abi;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jest.setTimeout(300000000);
                return [4 /*yield*/, api_1.ApiPromise.create({ provider: new api_1.WsProvider(consts_1.WSURL) })];
            case 1:
                // jest.useFakeTimers('legacy')
                api = _a.sent();
                //  abi = new Abi(wyvern_proxy_registryabi, api.registry.getChainProperties());
                //  contract = new ContractPromise(api, abi, address);
                addresses = (0, configHelper_1.getAddress)();
                abi = new api_contract_2.Abi(abis["auth"], api.registry.getChainProperties());
                console.log("===delegate address======", addresses["delegate"]);
                contract = new api_contract_1.ContractPromise(api, abi, addresses["delegate"]);
                abi = new api_contract_2.Abi(abis["erc20"], api.registry.getChainProperties());
                erc20 = new api_contract_1.ContractPromise(api, abi, addresses["erc20"]);
                return [2 /*return*/];
        }
    });
}); });
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
describe("proxy Smart Contracts registry", function () {
    beforeAll(function () {
        // contract = contracts["registry"];
    });
    test("initialize", function () { return __awaiter(void 0, void 0, void 0, function () {
        var gasLimit, registryAddress, _a, gasConsumed, result, output, output;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    registryAddress = addresses["registry"];
                    return [4 /*yield*/, contract.query.initialize(bobPair.address, { value: 0, gasLimit: -1 }, alicePair.address, registryAddress)];
                case 1:
                    _a = _b.sent(), gasConsumed = _a.gasConsumed, result = _a.result, output = _a.output;
                    console.log(result.toString());
                    // gas consumed
                    console.log(gasConsumed.toString());
                    gasLimit = new bn_js_1["default"](gasConsumed.toString()) * (new bn_js_1["default"](100));
                    // check if the call was successful
                    if (result.isOk) {
                        console.log(alicePair.address, 'initialize Success', output === null || output === void 0 ? void 0 : output.toString());
                    }
                    else {
                        console.error('initialize Error', result.asErr);
                    }
                    console.log("======gasLimit=========", gasLimit);
                    return [4 /*yield*/, contract.tx.initialize({
                            value: 0,
                            gasLimit: gasLimit
                        }, alicePair.address, registryAddress).signAndSend(bobPair)];
                case 2:
                    output = _b.sent();
                    console.log("tx", output === null || output === void 0 ? void 0 : output.toString());
                    return [2 /*return*/];
            }
        });
    }); });
    test.only("proxy", function () { return __awaiter(void 0, void 0, void 0, function () {
        var gasLimit, from, to, value, calldata, selectorIndex, erc20Calldata, _a, gasConsumed, result, output, output;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    from = bobPair.address;
                    to = alicePair.address;
                    value = new bn_js_1["default"](1000000);
                    calldata = erc20.tx.transferFrom({ value: new bn_js_1["default"](0), gasLimit: new bn_js_1["default"](-1) }, from, to, value).toHex();
                    selectorIndex = calldata.indexOf("0b396f18");
                    if (selectorIndex == -1) {
                        console.error("======0b396f18===selectorIndex==-1=============");
                        return [2 /*return*/, ""];
                    }
                    erc20Calldata = "0x" + calldata.slice(selectorIndex);
                    console.log(calldata, "=====", selectorIndex, "===0b396f18====erc20Calldata=========", erc20Calldata);
                    return [4 /*yield*/, contract.query.proxy(bobPair.address, { value: 0, gasLimit: -1 }, alicePair.address, 0, erc20Calldata)];
                case 1:
                    _a = _b.sent(), gasConsumed = _a.gasConsumed, result = _a.result, output = _a.output;
                    console.log(result.toString());
                    // console.trace("==trace==")
                    // gas consumed
                    console.log(gasConsumed.toString());
                    gasLimit = new bn_js_1["default"](gasConsumed.toString()) * (new bn_js_1["default"](100)); // new BN(99722) * (new BN(1_000_000));//
                    // check if the call was successful
                    if (result.isOk) {
                        console.log(alicePair.address, 'proxy Success', output === null || output === void 0 ? void 0 : output.toString());
                    }
                    else {
                        console.error('proxy Error', result.asErr);
                    }
                    return [4 /*yield*/, contract.tx.proxy({
                            value: 0,
                            gasLimit: gasLimit
                        }, alicePair.address, 0, erc20Calldata).signAndSend(bobPair)];
                case 2:
                    output = _b.sent();
                    console.log("tx", output === null || output === void 0 ? void 0 : output.toString());
                    (0, utils_1.sleepMs)(5000000);
                    return [2 /*return*/];
            }
        });
    }); });
});
// describe("proxy Smart Contracts  wyvern_token_transfer_proxy", () => {
//     beforeAll((): void => {
//         contract = contracts["token"];
//     });
//     test.only("transfer_from", async () => {
//         let gasLimit=new BN(500_000_000_000)
//         let tokenAddress = addresses["erc20"];
//             const amount = new BN(10_000_000); // only useful on isPayable messages
//         {
//             console.log(tokenAddress, bobPair.address, alicePair.address, amount);
//             let { gasConsumed, result, output } = await contract.query.transferFrom(bobPair.address, { value: 0, gasLimit: -1 }, tokenAddress, bobPair.address, alicePair.address, amount);
//             console.log(result.toString());
//             // gas consumed
//             console.log(gasConsumed.toString());
//             // gasLimit = new BN(gasConsumed.toString()) * (new BN(100));
//             // check if the call was successful
//             if (result.isOk) {
//                 console.log(alicePair.address, 'transferFrom Success', output?.toString());
//             } else {
//                 console.error('transferFrom Error', result.asErr);
//             }
//         }
//         console.log("======gasLimit=========", gasLimit)
//         {
//             let output = await contract.tx.transferFrom({
//                 value: 0, gasLimit
//             }, tokenAddress, bobPair.address, alicePair.address, amount).signAndSend(bobPair);
//             console.log("tx", output?.toString());
//         }
//     });
// });
// describe("proxy Smart Contracts  ERC-20 ", () => {
//     beforeAll((): void => {
//         contract = contracts["erc20"];
//     });
//     test(" ERC-20 contract   erc20 transfer", async () => {
//         const to = bobPair.address;
//         const value = new BN(10000000000); // only useful on isPayable messages
//         let gasLimit = new BN(100000000);
//         {
//             let { gasConsumed, result } = await contract.query.transfer(davePair.address, { value: new BN(0), gasLimit: new BN(-1) }, to, value);
//             gasLimit = new BN(gasConsumed.toString()) * new BN(100)
//             console.log(`outcome: ${result.isOk ? 'Ok' : 'Error'}`);
//             console.log(`gasConsumed ${gasConsumed.toString()}`);
//             console.log("===========q=q==========", result.toString());
//         }
//         {
//             let { gasConsumed, result, output } = await contract.tx.transfer({ value: 0, gasLimit }, to, value).signAndSend(davePair);//, (result: SubmittableResult) => { });
//             console.log("=============ddd===d======", result);
//         }
//         {
//             let { gasConsumed, result, output } = await contract.query.balanceOf(to, { value: 0, gasLimit: -1 }, to);
//             console.log(result.toHuman());
//             // gas consumed
//             console.log(gasConsumed.toHuman());
//             // check if the call was successful
//             if (result.isOk) {
//                 console.log(alicePair.address, 'balanceOf Success', output.toHuman());
//             } else {
//                 console.error('balanceOf Error', result.asErr);
//             }
//         }
//     });
//     test(" ERC-20 contract   erc20 approve", async () => {
//         const spender = addresses["token"];
//         const value = new BN(1000000000000); // only useful on isPayable messages
//         let gasLimit = new BN(100000000);
//         {
//             let { gasConsumed, result } = await contract.query.approve(bobPair.address, { value: new BN(0), gasLimit: new BN(-1) }, spender, value);
//             gasLimit = new BN(gasConsumed.toString()) * new BN(100)
//             console.log(`outcome: ${result.isOk ? 'Ok' : 'Error'}`);
//             console.log(`gasConsumed ${gasConsumed.toString()}`);
//             console.log("===========result=========", result.toString());
//         }
//         {
//             let txhash = await contract.tx.approve({ value: 0, gasLimit }, spender, value).signAndSend(bobPair);
//             console.log("=============txhash===d======", txhash.toString());
//         }
//     });
// });
