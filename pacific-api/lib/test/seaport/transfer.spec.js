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
const util_crypto_1 = require("@polkadot/util-crypto");
const bn_js_1 = __importDefault(require("bn.js"));
const consts_1 = require("./consts");
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
const address = "5CorLhFifYgPMGdWDb4PC9FaeAqKJY1ZfS74JDr25h2WhEwN";
// // const abi = erc20abi;
const value = 0; // only useful on isPayable messagess
let abis = { "auth": authenticated_proxyabi, "delegate": ownable_delegate_proxyabi, "atom": wyvern_atomicizerabi, "registry": wyvern_proxy_registryabi, "token": wyvern_token_transfer_proxyabi, "erc20": erc20abi, "erc721": erc721abi };
let contracts = {};
// NOTE the apps UI specified these in mega units
let gasLimit = new bn_js_1.default(300000).mul(new bn_js_1.default(1000000));
let testAccount;
let api;
jest.useRealTimers();
// beforeAll((): void => {
//     jest.setTimeout(300000000);
//     // jest.useFakeTimers('legacy')
// });
beforeAll(async () => {
    api = await api_1.ApiPromise.create({ provider: new api_1.WsProvider(consts_1.WSURL) });
    // let addresses = getAddress();
    // // console.log(abis)
    // for (let key of Object.keys(addresses)) {
    //     // console.log(abis[key.toString()],key.toString())
    //     let abi = new Abi(abis[key.toString()], api.registry.getChainProperties());
    //     contracts[key.toString()] = new ContractPromise(api, abi, addresses[key]);
    // }
    testAccount = keyring.addFromSeed((0, util_crypto_1.randomAsU8a)(32));
    let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
    let bobnonce = await api.rpc.system.accountNextIndex(bobPair.address);
    // submit(api, api.tx.balances.transfer(bobPair.address, salary), alicePair);
    const txn = api.tx.balances
        .transfer(charliePair.address, salary);
    const getType = (arg) => `${arg.type}` === 'Bytes' && arg.Type.name === 'Text' ? 'Text' : arg.type;
    const args = txn.args.map((arg, idx) => `${api.registry.createType(getType(txn.meta.args[idx]), arg)}`);
    console.log("===================");
    const done = await txn
        .signAndSend(alicePair, (result) => {
        if (result.status.isInBlock) {
            done();
        }
        if (result.status.isInBlock &&
            result.findRecord("system", "ExtrinsicSuccess")) {
            done();
        }
    });
    api.tx.balances
        .transfer(davePair.address, salary)
        .signAndSend(bobPair, (result) => {
        if (result.status.isInBlock &&
            result.findRecord("system", "ExtrinsicSuccess")) {
            done();
        }
    });
    api.tx.balances
        .transfer(evePair.address, salary)
        .signAndSend(alicePair, { nonce: (Number(nonce.toString()) + 1).toString() }, (result) => {
        if (result.status.isInBlock &&
            result.findRecord("system", "ExtrinsicSuccess")) {
            done();
        }
    });
    api.tx.balances
        .transfer(ferdiePair.address, salary)
        .signAndSend(bobPair, { nonce: (Number(bobnonce.toString()) + 1).toString() }, (result) => {
        if (result.status.isInBlock &&
            result.findRecord("system", "ExtrinsicSuccess")) {
            done();
        }
    });
});
describe("proxy Smart Contracts", () => {
    test.only("_transfer", async () => {
        // console.log(getValue("erc20"))
        // let contract =contracts["registry"];
        // let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
        // const to = bobPair.address;
        // const value = new BN(100000000); // only useful on isPayable messages
        // // const value = new BN(30) * new BN(1000000000000);
        // // const value = bnToHex(new BN(20) * new BN(100000000000000), {
        // //     bitLength: 128,
        // //     isLe: true,
        // //     isNegative: false
        // // })
        // {
        //     console.log(contract.query,"==========grantInitialAuthentication==q==========", nonce.toHuman());
        //     let { gasConsumed, result } = await contract.query.getProxy(alicePair.address, { value: new BN(0), gasLimit: new BN(-1) }, alicePair.address);//, (result: SubmittableResult) => { });
        //     gasLimit = gasConsumed.toString()
        //     console.log(`outcome: ${result.isOk ? 'Ok' : 'Error'}`);
        //     console.log(`gasConsumed ${gasConsumed.toString()}`);
        //     console.log("===========q=q==========", result.toString());
        // }
        // {
        //     console.log("============ddd==========", nonce);
        //     let { gasConsumed, result, output } = await contract.tx.getProxy({ value: 0, gasLimit }, alicePair.address).signAndSend(alicePair);//, (result: SubmittableResult) => { });
        //     // execute(contract.tx.transfer({ value: 0, gasLimit }, to, value), alicePair);
        //     nonce = await api.rpc.system.accountNextIndex(alicePair.address);
        //     console.log("=============ddd===d======", result);
        // }
        // {
        //     // Perform the actual read (no params at the end, for the `get` message)
        //     // (We perform the send from an account, here using Alice's address)
        //     let { gasConsumed, result, output } = await contract.query.balanceOf(to, { value: 0, gasLimit: -1 }, to);
        //     // The actual result from RPC as `ContractExecResult`
        //     console.log(result.toHuman());
        //     // gas consumed
        //     console.log(gasConsumed.toHuman());
        //     // check if the call was successful
        //     if (result.isOk) {
        //         // should output 123 as per our initial set (output here is an i32)
        //         console.log(alicePair.address, 'balanceOf Success', output.toHuman());
        //     } else {
        //         console.error('balanceOf Error', result.asErr);
        //     }
        // }
    });
});
//# sourceMappingURL=transfer.spec.js.map