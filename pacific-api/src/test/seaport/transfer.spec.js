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
var util_crypto_1 = require("@polkadot/util-crypto");
var bn_js_1 = require("bn.js");
var consts_1 = require("./consts");
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
var address = "5CorLhFifYgPMGdWDb4PC9FaeAqKJY1ZfS74JDr25h2WhEwN";
// // const abi = erc20abi;
var value = 0; // only useful on isPayable messagess
var abis = { "auth": authenticated_proxyabi, "delegate": ownable_delegate_proxyabi, "atom": wyvern_atomicizerabi, "registry": wyvern_proxy_registryabi, "token": wyvern_token_transfer_proxyabi, "erc20": erc20abi, "erc721": erc721abi };
var contracts = {};
// NOTE the apps UI specified these in mega units
var gasLimit = new bn_js_1["default"](300000) * new bn_js_1["default"](1000000);
var testAccount;
var api;
jest.useRealTimers();
// beforeAll((): void => {
//     jest.setTimeout(300000000);
//     // jest.useFakeTimers('legacy')
// });
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var nonce, bobnonce, txn, getType, args, done;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api_1.ApiPromise.create({ provider: new api_1.WsProvider(consts_1.WSURL) })];
            case 1:
                api = _a.sent();
                // let addresses = getAddress();
                // // console.log(abis)
                // for (let key of Object.keys(addresses)) {
                //     // console.log(abis[key.toString()],key.toString())
                //     let abi = new Abi(abis[key.toString()], api.registry.getChainProperties());
                //     contracts[key.toString()] = new ContractPromise(api, abi, addresses[key]);
                // }
                testAccount = keyring.addFromSeed((0, util_crypto_1.randomAsU8a)(32));
                return [4 /*yield*/, api.rpc.system.accountNextIndex(alicePair.address)];
            case 2:
                nonce = _a.sent();
                return [4 /*yield*/, api.rpc.system.accountNextIndex(bobPair.address)];
            case 3:
                bobnonce = _a.sent();
                txn = api.tx.balances
                    .transfer(charliePair.address, salary);
                getType = function (arg) { return "".concat(arg.type) === 'Bytes' && arg.Type.name === 'Text' ? 'Text' : arg.type; };
                args = txn.args.map(function (arg, idx) { return "".concat(api.registry.createType(getType(txn.meta.args[idx]), arg)); });
                console.log("===================");
                return [4 /*yield*/, txn
                        .signAndSend(alicePair, function (result) {
                        if (result.status.isInBlock) {
                            done();
                        }
                        if (result.status.isInBlock &&
                            result.findRecord("system", "ExtrinsicSuccess")) {
                            done();
                        }
                    })];
            case 4:
                done = _a.sent();
                api.tx.balances
                    .transfer(davePair.address, salary)
                    .signAndSend(bobPair, function (result) {
                    if (result.status.isInBlock &&
                        result.findRecord("system", "ExtrinsicSuccess")) {
                        done();
                    }
                });
                api.tx.balances
                    .transfer(evePair.address, salary)
                    .signAndSend(alicePair, { nonce: (Number(nonce.toString()) + 1).toString() }, function (result) {
                    if (result.status.isInBlock &&
                        result.findRecord("system", "ExtrinsicSuccess")) {
                        done();
                    }
                });
                api.tx.balances
                    .transfer(ferdiePair.address, salary)
                    .signAndSend(bobPair, { nonce: (Number(bobnonce.toString()) + 1).toString() }, function (result) {
                    if (result.status.isInBlock &&
                        result.findRecord("system", "ExtrinsicSuccess")) {
                        done();
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
describe("proxy Smart Contracts", function () {
    test.only("_transfer", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); });
});
