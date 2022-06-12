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
exports.getContractStorage = exports.rpcContract = exports.callContract = exports.instantiate = exports.putCode = exports.sendAndReturnFinalized = exports.execute = exports.sleepMs = void 0;
var util_1 = require("@polkadot/util");
var fs_1 = require("fs");
var path_1 = require("path");
var blake = require('blakejs');
var consts_1 = require("./consts");
function sleepMs(ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleepMs = sleepMs;
var waitFor_1 = require("./waitFor");
function execute(extrinsic, signer, api, logger) {
    if (logger === void 0) { logger = { info: console.log }; }
    return __awaiter(this, void 0, void 0, function () {
        function sendStatusCb(_a) {
            var _b = _a.events, events = _b === void 0 ? [] : _b, status = _a.status;
            if (status.isInvalid) {
                logger.info('Transaction invalid');
                currentTxDone = true;
            }
            else if (status.isReady) {
                logger.info('Transaction is ready');
            }
            else if (status.isBroadcast) {
                logger.info('Transaction has been broadcasted');
            }
            else if (status.isInBlock) {
                logger.info('Transaction is in block');
            }
            else if (status.isFinalized) {
                logger.info("Transaction has been included in blockHash ".concat(status.asFinalized.toHex()));
                events.forEach(function (_a) {
                    var event = _a.event;
                    if (event.method === 'ExtrinsicSuccess') {
                        logger.info('Transaction succeeded');
                    }
                    else if (event.method === 'ExtrinsicFailed') {
                        logger.info('Transaction failed');
                    }
                });
                currentTxDone = true;
            }
        }
        var currentTxDone;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentTxDone = false;
                    // const nonce = await api.rpc.system.accountNextIndex(signer.address); { nonce: nonce.toHuman() + 1 }, 
                    return [4 /*yield*/, extrinsic.signAndSend(signer, sendStatusCb)];
                case 1:
                    // const nonce = await api.rpc.system.accountNextIndex(signer.address); { nonce: nonce.toHuman() + 1 }, 
                    _a.sent();
                    return [4 /*yield*/, (0, waitFor_1.waitFor)(function () { return currentTxDone; }, { timeout: 20000 })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
function sendAndReturnFinalized(signer, tx, api) {
    return __awaiter(this, void 0, void 0, function () {
        var nonce;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.rpc.system.accountNextIndex(signer.address)];
                case 1:
                    nonce = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            tx.signAndSend(signer, { nonce: nonce.toHuman() + 1 }, function (result) {
                                if (result.status.isInBlock) {
                                    // Return the result of the submittable extrinsic after the transfer is finalized
                                    resolve(result);
                                }
                                if (result.status.isDropped ||
                                    result.status.isInvalid ||
                                    result.status.isUsurped) {
                                    reject(result);
                                    console.error("ERROR: Transaction could not be finalized.");
                                }
                            });
                        })];
            }
        });
    });
}
exports.sendAndReturnFinalized = sendAndReturnFinalized;
function putCode(api, signer, fileName, abi) {
    return __awaiter(this, void 0, void 0, function () {
        var wasmCode, tx, result, record;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wasmCode = fs_1["default"]
                        .readFileSync(path_1["default"].join(__dirname, fileName))
                        .toString("hex");
                    console.log(api.tx.contracts);
                    tx = api.tx.contracts.putCode("0x".concat(wasmCode));
                    return [4 /*yield*/, sendAndReturnFinalized(signer, tx, api)];
                case 1:
                    result = _a.sent();
                    record = result.findRecord("contracts", "CodeStored");
                    if (!record) {
                        console.error("ERROR: No code stored after executing putCode()");
                    }
                    // Return code hash.5H7a1y8LfcoLa9MXoVA8kYYs6AXiJCcKCBR5U5QUZEuoHB1H
                    return [2 /*return*/, record.event.data[0]];
            }
        });
    });
}
exports.putCode = putCode;
function instantiate(api, signer, codeHash, inputData, endowment, gasRequired) {
    if (gasRequired === void 0) { gasRequired = consts_1.GAS_REQUIRED; }
    return __awaiter(this, void 0, void 0, function () {
        var tx, result, record;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tx = api.tx.contracts.instantiate(endowment, gasRequired, codeHash, inputData, null);
                    return [4 /*yield*/, sendAndReturnFinalized(signer, tx, api)];
                case 1:
                    result = _a.sent();
                    record = result.findRecord("contracts", "Instantiated");
                    if (!record) {
                        console.error("ERROR: No new instantiated contract");
                    }
                    // Return the Address of  the instantiated contract.
                    return [2 /*return*/, record.event.data[1]];
            }
        });
    });
}
exports.instantiate = instantiate;
function callContract(api, signer, contractAddress, inputData, gasRequired, endowment) {
    if (gasRequired === void 0) { gasRequired = consts_1.GAS_REQUIRED; }
    if (endowment === void 0) { endowment = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var tx;
        return __generator(this, function (_a) {
            tx = api.tx.contracts.call(contractAddress, endowment, gasRequired, inputData);
            execute(tx, signer, api);
            return [2 /*return*/];
        });
    });
}
exports.callContract = callContract;
function rpcContract(api, contractAddress, inputData, gasLimit) {
    if (gasLimit === void 0) { gasLimit = consts_1.GAS_LIMIT; }
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.rpc.contracts.call({
                        dest: contractAddress,
                        gasLimit: gasLimit,
                        inputData: inputData
                    })];
                case 1:
                    res = _a.sent();
                    console.log(res.toHuman());
                    if (!res.result.isOk) {
                        console.error("ERROR: rpc call did not succeed", res.result.asErr);
                    }
                    return [2 /*return*/, res.result.toU8a()];
            }
        });
    });
}
exports.rpcContract = rpcContract;
function getContractStorage(api, contractAddress, storageKey) {
    return __awaiter(this, void 0, void 0, function () {
        var contractInfo, childStorageKey, prefixedStorageKey, storageKeyBlake2b, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.query.contracts.contractInfoOf(contractAddress)];
                case 1:
                    contractInfo = _a.sent();
                    childStorageKey = contractInfo.unwrap().asAlive.trieId;
                    prefixedStorageKey = '0x3a6368696c645f73746f726167653a64656661756c743a' + (0, util_1.u8aToHex)(childStorageKey, -1, false);
                    console.log(prefixedStorageKey);
                    storageKeyBlake2b = '0x' + blake.blake2bHex(storageKey, null, 32);
                    return [4 /*yield*/, api.rpc.childstate.getStorage(prefixedStorageKey, // childStorageKey || prefixed trieId of the contract
                        storageKeyBlake2b // hashed storageKey
                        )];
                case 2:
                    result = _a.sent();
                    console.log(result.unwrapOrDefault());
                    return [2 /*return*/, result.unwrapOrDefault()];
            }
        });
    });
}
exports.getContractStorage = getContractStorage;
