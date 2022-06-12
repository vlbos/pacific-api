"use strict";
// Copyright 2019 Parity Technologies (UK) Ltd.
// This file is part of Substrate.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const api_1 = require("@polkadot/api");
const testing_1 = require("@polkadot/keyring/testing");
const api_contract_1 = require("@polkadot/api-contract");
const bn_js_1 = __importDefault(require("bn.js"));
const api_contract_2 = require("@polkadot/api-contract");
const consts_1 = require("./consts");
const configHelper_1 = require("./configHelper");
// This is a test account that is going to be created and funded each test.
const keyring = (0, testing_1.createTestKeyring)({ type: "sr25519" });
const alicePair = keyring.getPair(consts_1.ALICE);
const bobPair = keyring.getPair(consts_1.BOB);
const salary = 100000000000000;
const erc20abi = require("../../wyvern-js/abisv2/erc20/metadata.json");
const erc721abi = require("../../wyvern-js/abisv2/erc721/metadata.json");
const authenticated_proxyabi = require("../../wyvern-js/abisv2/authenticated_proxy/metadata.json");
const ownable_delegate_proxyabi = require("../../wyvern-js/abisv2/ownable_delegate_proxy/metadata.json");
const wyvern_atomicizerabi = require("../../wyvern-js/abisv2/wyvern_atomicizer/metadata.json");
const wyvern_proxy_registryabi = require("../../wyvern-js/abisv2/wyvern_proxy_registry/metadata.json");
const wyvern_token_transfer_proxyabi = require("../../wyvern-js/abisv2/wyvern_token_transfer_proxy/metadata.json");
const charliePair = keyring.getPair(consts_1.CHARLIE);
const davePair = keyring.getPair(consts_1.DAVE);
const evePair = keyring.getPair(consts_1.EVE);
const ferdiePair = keyring.getPair(consts_1.FERDIE);
const address = "5Hq75BNUQiqbjZRWehHtFMhvWU1P57DBqJM81kTExTRgxyAG";
// // const abi = erc20abi;
const value = 0; // only useful on isPayable messagess
let abis = { "auth": authenticated_proxyabi, "delegate": ownable_delegate_proxyabi, "atom": wyvern_atomicizerabi, "registry": wyvern_proxy_registryabi, "token": wyvern_token_transfer_proxyabi, "erc20": erc20abi, "erc721": erc721abi };
let contracts = {};
// NOTE the apps UI specified these in mega units
let gasLimit = new bn_js_1.default(300000).mul(new bn_js_1.default(1000000));
let testAccount;
let api;
let contract;
let addresses;
jest.useRealTimers();
beforeAll(async () => {
    jest.setTimeout(300000000);
    // jest.useFakeTimers('legacy')
    api = await api_1.ApiPromise.create({ provider: new api_1.WsProvider(consts_1.WSURL) });
    //  abi = new Abi(wyvern_proxy_registryabi, api.registry.getChainProperties());
    //  contract = new ContractPromise(api, abi, address);
    addresses = (0, configHelper_1.getAddress)();
    // console.log(abis)
    for (let key of Object.keys(addresses)) {
        // console.log(abis[key.toString()],key.toString())
        let abi = new api_contract_2.Abi(abis[key.toString()], api.registry.getChainProperties());
        contracts[key.toString()] = new api_contract_1.ContractPromise(api, abi, addresses[key]);
    }
    contract = contracts["registry"];
});
beforeEach(async () => {
    // api = await ApiPromise.create({ provider: new WsProvider(WSURL) });
    // //  abi = new Abi(wyvern_proxy_registryabi, api.registry.getChainProperties());
    // //  contract = new ContractPromise(api, abi, address);
    // addresses = getAddress();
    // // console.log(abis)
    // for (let key of Object.keys(addresses)) {
    //     // console.log(abis[key.toString()],key.toString())
    //     let abi = new Abi(abis[key.toString()], api.registry.getChainProperties());
    //     contracts[key.toString()] = new ContractPromise(api, abi, addresses[key]);
    // }
    // contract = contracts["registry"];
    // testAccount = keyring.addFromSeed(randomAsU8a(32));
    // let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
    // let bobnonce = await api.rpc.system.accountNextIndex(bobPair.address);
    // // submit(api, api.tx.balances.transfer(bobPair.address, salary), alicePair);
    // const txn = api.tx.balances
    //     .transfer(charliePair.address, salary);
    // const getType = (arg: any) => `${arg.type}` === 'Bytes' && arg.Type.name === 'Text' ? 'Text' : arg.type
    // const args = txn.args.map((arg: any, idx: any) => `${api.registry.createType(getType(txn.meta.args[idx]), arg)}`)
    // console.log("===================")
    // const done = await txn
    //     .signAndSend(alicePair, (result: SubmittableResult): void => {
    //         if (
    //             result.status.isInBlock
    //         ) {
    //             done();
    //         }
    //         if (
    //             result.status.isInBlock &&
    //             result.findRecord("system", "ExtrinsicSuccess")
    //         ) {
    //             done();
    //         }
    //     });
});
describe("proxy Smart Contracts registry", () => {
    beforeAll(() => {
        contract = contracts["registry"];
    });
    test.only("contractsContains", async () => {
        {
            let { gasConsumed, result, output } = await contract.query.contractsContains(alicePair.address, { value: 0, gasLimit: -1 }, alicePair.address);
            console.log(result.toString());
            // gas consumed
            console.log(gasConsumed.toString());
            // gasLimit = gasConsumed;
            // check if the call was successful
            if (result.isOk) {
                console.log(alicePair.address, 'contractsContains Success', output === null || output === void 0 ? void 0 : output.toString());
            }
            else {
                console.error('contractsContains Error', result.asErr);
            }
        }
    });
    test("getProxy", async () => {
        {
            let { gasConsumed, result, output } = await contract.query.getProxy(alicePair.address, { value: new bn_js_1.default(0), gasLimit: new bn_js_1.default(-1) }, alicePair.address); //, (result: SubmittableResult) => { });
            console.log(`outcome: ${result.isOk ? 'Ok' : 'Error'}`);
            console.log(`gasConsumed ${gasConsumed.toString()}`);
            console.log(output === null || output === void 0 ? void 0 : output.toString(), "===========q=q==========", result.toString());
        }
    });
    test("owner", async () => {
        {
            let { gasConsumed, result, output } = await contract.query.owner(alicePair.address, { value: new bn_js_1.default(0), gasLimit: new bn_js_1.default(-1) });
            console.log(`outcome: ${result.isOk ? 'Ok' : 'Error'}`);
            console.log(`gasConsumed ${gasConsumed.toString()}`);
            console.log(output === null || output === void 0 ? void 0 : output.toString(), "====owner=======q=q==========", result.toString());
        }
    });
    test.only("grantInitialAuthentication", async () => {
        {
            let { gasConsumed, result, output } = await contract.query.grantInitialAuthentication(bobPair.address, { value: 0, gasLimit: -1 }, alicePair.address);
            console.log(result.toString());
            // gas consumed
            console.log(gasConsumed.toString());
            gasLimit = new bn_js_1.default(gasConsumed.toString()).mul(new bn_js_1.default(100));
            // check if the call was successful
            if (result.isOk) {
                console.log(alicePair.address, 'grantInitialAuthentication Success', output === null || output === void 0 ? void 0 : output.toString());
            }
            else {
                console.error('grantInitialAuthentication Error', result.asErr);
            }
        }
        console.log("======gasLimit=========", gasLimit);
        {
            let output = await contract.tx.grantInitialAuthentication({
                value: 0, gasLimit
            }, alicePair.address).signAndSend(bobPair);
            console.log("tx", output === null || output === void 0 ? void 0 : output.toString());
        }
    });
    test("startGrantAuthentication", async () => {
        {
            let { gasConsumed, result, output } = await contract.query.startGrantAuthentication(bobPair.address, { value: 0, gasLimit: -1 }, alicePair.address);
            console.log(result.toString());
            // console.trace("==trace==")
            // gas consumed
            console.log(gasConsumed.toString());
            gasLimit = new bn_js_1.default(gasConsumed.toString()).mul(new bn_js_1.default(100));
            // check if the call was successful
            if (result.isOk) {
                console.log(alicePair.address, 'startGrantAuthentication Success', output === null || output === void 0 ? void 0 : output.toString());
            }
            else {
                console.error('startGrantAuthentication Error', result.asErr);
            }
        }
        {
            let output = await contract.tx.startGrantAuthentication({
                value: 0, gasLimit
            }, alicePair.address).signAndSend(bobPair);
            console.log("tx", output === null || output === void 0 ? void 0 : output.toString());
        }
    });
    test("transfer_ownership", async () => {
        {
            // console.log(contract.query);
            let { gasConsumed, result, output } = await contract.query.transferOwnership(bobPair.address, { value: 0, gasLimit: -1 }, alicePair.address);
            console.log(result.toString());
            // gas consumed
            console.log(gasLimit, gasConsumed.toString());
            gasLimit = new bn_js_1.default(gasConsumed.toString()).mul(new bn_js_1.default(100));
            // check if the call was successful
            if (result.isOk) {
                console.log(alicePair.address, 'transferOwnership Success', output === null || output === void 0 ? void 0 : output.toString());
            }
            else {
                console.error('transferOwnership Error', result.asErr);
            }
        }
        {
            let output = await contract.tx.transferOwnership({
                value: 0, gasLimit
            }, alicePair.address).signAndSend(bobPair);
            console.log("tx", output === null || output === void 0 ? void 0 : output.toString());
        }
    });
    test("endGrantAuthentication", async () => {
        {
            let { gasConsumed, result, output } = await contract.query.endGrantAuthentication(bobPair.address, { value: 0, gasLimit: -1 }, alicePair.address);
            console.log(result.toString());
            // gas consumed
            console.log(gasConsumed.toString());
            gasLimit = gasConsumed.toString();
            // check if the call was successful
            if (result.isOk) {
                console.log(alicePair.address, 'endGrantAuthentication Success', output === null || output === void 0 ? void 0 : output.toString());
            }
            else {
                console.error('endGrantAuthentication Error', result.asErr);
            }
        }
        {
            let output = await contract.tx.endGrantAuthentication({
                value: 0, gasLimit
            }, alicePair.address).signAndSend(bobPair);
            console.log("tx", output === null || output === void 0 ? void 0 : output.toString());
        }
    });
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
//# sourceMappingURL=proxy-authenticated.spec.js.map