// Copyright 2019 Parity Technologies (UK) Ltd.
// This file is part of Substrate.

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

import { ApiPromise, SubmittableResult, WsProvider } from "@polkadot/api";
import { createTestKeyring } from "@polkadot/keyring/testing";
import { u8aToHex, bnToHex } from "@polkadot/util";
import { randomAsU8a } from "@polkadot/util-crypto";
import { KeyringPair } from "@polkadot/keyring/types";
import { Option } from "@polkadot/types";
import { Address, ContractInfo, Hash } from "@polkadot/types/interfaces";
import { submit } from '../../orders/lib/submit-signed-tx'
import { CodePromise, ContractPromise } from '@polkadot/api-contract';
import BN from "bn.js";
import { Abi } from '@polkadot/api-contract';

import { ALICE, BOB, CHARLIE, DAVE, EVE, FERDIE, CREATION_FEE, WSURL } from "./consts";
import { getAddress, getValue } from './configHelper'


// This is a test account that is going to be created and funded each test.
const keyring = createTestKeyring({ type: "sr25519" });
const alicePair = keyring.getPair(ALICE);
const bobPair = keyring.getPair(BOB);
const salary = 100_000_000_000_000;
const erc20abi = require("../../wyvern-js/abisv2/erc20/metadata.json");
const erc721abi = require("../../wyvern-js/abisv2/erc721/metadata.json");
const authenticated_proxyabi = require("../../wyvern-js/abisv2/authenticated_proxy/metadata.json");
const ownable_delegate_proxyabi = require("../../wyvern-js/abisv2/ownable_delegate_proxy/metadata.json");
const wyvern_atomicizerabi = require("../../wyvern-js/abisv2/wyvern_atomicizer/metadata.json");
const wyvern_proxy_registryabi = require("../../wyvern-js/abisv2/wyvern_proxy_registry/metadata.json");
const wyvern_token_transfer_proxyabi = require("../../wyvern-js/abisv2/wyvern_token_transfer_proxy/metadata.json");


const charliePair = keyring.getPair(CHARLIE);
const davePair = keyring.getPair(DAVE);
const evePair = keyring.getPair(EVE);
const ferdiePair = keyring.getPair(FERDIE);

const address = "5Hq75BNUQiqbjZRWehHtFMhvWU1P57DBqJM81kTExTRgxyAG";
import {
    sleepMs
} from "./utils";
// // const abi = erc20abi;
const value = 0; // only useful on isPayable messagess
let abis: { [key: string]: any } = { "auth": authenticated_proxyabi, "delegate": ownable_delegate_proxyabi, "atom": wyvern_atomicizerabi, "registry": wyvern_proxy_registryabi, "token": wyvern_token_transfer_proxyabi, "erc20": erc20abi, "erc721": erc721abi };
let contracts: any = {};
// NOTE the apps UI specified these in mega units
let gasLimit = new BN(300000) * new BN(1000000);
let testAccount: KeyringPair;
let api: ApiPromise;
let contract: ContractPromise;
let addresses;
jest.useRealTimers();


beforeAll(async () => {
    jest.setTimeout(300000000);
    // jest.useFakeTimers('legacy')
    api = await ApiPromise.create({ provider: new WsProvider(WSURL) });
    //  abi = new Abi(wyvern_proxy_registryabi, api.registry.getChainProperties());
    //  contract = new ContractPromise(api, abi, address);
    addresses = getAddress();
    // console.log(abis)
    for (let key of Object.keys(addresses)) {
        // console.log(abis[key.toString()],key.toString())
        let abi = new Abi(abis[key.toString()], api.registry.getChainProperties());
        contracts[key.toString()] = new ContractPromise(api, abi, addresses[key]);
    }
    contract = contracts["registry"];
});


beforeEach(
    async () => {
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
       
    }
);

describe("proxy Smart Contracts  ERC-20 ", () => {
    beforeAll((): void => {
        contract = contracts["erc20"];
    });

    test(" ERC-20 contract   erc20 transfer", async () => {
        const to = bobPair.address;
        const value = new BN(10000000000); // only useful on isPayable messages
        let gasLimit = new BN(100000000);
        {
            let { gasConsumed, result } = await contract.query.transfer(davePair.address, { value: new BN(0), gasLimit: new BN(-1) }, to, value);

            gasLimit = new BN(gasConsumed.toString()) * new BN(100)
            console.log(`outcome: ${result.isOk ? 'Ok' : 'Error'}`);
            console.log(`gasConsumed ${gasConsumed.toString()}`);
            console.log("===========q=q==========", result.toString());

        }
        {
            let { gasConsumed, result, output } = await contract.tx.transfer({ value: 0, gasLimit }, to, value).signAndSend(davePair);//, (result: SubmittableResult) => { });
            console.log("=============ddd===d======", result);
        }
        {

            let { gasConsumed, result, output } = await contract.query.balanceOf(to, { value: 0, gasLimit: -1 }, to);

            console.log(result.toHuman());

            // gas consumed
            console.log(gasConsumed.toHuman());

            // check if the call was successful
            if (result.isOk) {
                console.log(alicePair.address, 'balanceOf Success', output.toHuman());
            } else {
                console.error('balanceOf Error', result.asErr);
            }
        }

    });
    test(" ERC-20 contract   erc20 approve", async () => {
        const spender = addresses["token"];
        const value = new BN(1000000000000); // only useful on isPayable messages
        let gasLimit = new BN(100000000);
        {
            let { gasConsumed, result } = await contract.query.approve(bobPair.address, { value: new BN(0), gasLimit: new BN(-1) }, spender, value);

            gasLimit = new BN(gasConsumed.toString()) * new BN(100)
            console.log(`outcome: ${result.isOk ? 'Ok' : 'Error'}`);
            console.log(`gasConsumed ${gasConsumed.toString()}`);
            console.log("===========result=========", result.toString());

        }
        {
            let txhash = await contract.tx.approve({ value: 0, gasLimit }, spender, value).signAndSend(bobPair);
            console.log("=============txhash===d======", txhash.toString());
        }


    });

});