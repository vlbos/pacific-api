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
import { abis } from '../../wyvern-js/abisv2/index';
const charliePair = keyring.getPair(CHARLIE);
const davePair = keyring.getPair(DAVE);
const evePair = keyring.getPair(EVE);
const ferdiePair = keyring.getPair(FERDIE);

const address = "5Hq75BNUQiqbjZRWehHtFMhvWU1P57DBqJM81kTExTRgxyAG";
import {
    sleepMs
} from "./utils";
// // const abi = ERC20;
const value = 0; // only useful on isPayable messagess
let contracts: any = {};
// NOTE the apps UI specified these in mega units
let gasLimit:any = new BN(300000) .mul( new BN(1000000));
let testAccount: KeyringPair;
let api: ApiPromise;
let contract: ContractPromise;
let addresses:any;
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


describe("proxy Smart Contracts  wyvern_token_transfer_proxy", () => {
    beforeAll((): void => {
        contract = contracts["token"];
    });


    test.only("transfer_from", async () => {
         gasLimit=new BN(500_000_000_000)
        let tokenAddress = addresses["erc20"];
            const amount = new BN(10_000_000); // only useful on isPayable messages
        {
            console.log(tokenAddress, bobPair.address, alicePair.address, amount);

            let { gasConsumed, result, output } = await contract.query.transferFrom(bobPair.address, { value: 0, gasLimit: -1 }, tokenAddress, bobPair.address, alicePair.address, amount);

            console.log(result.toString());

            // gas consumed
            console.log(gasConsumed.toString());
            // gasLimit = new BN(gasConsumed.toString()) * (new BN(100));
            // check if the call was successful
            if (result.isOk) {
                console.log(alicePair.address, 'transferFrom Success', output?.toString());
            } else {
                console.error('transferFrom Error', result.asErr);
            }
        }
        console.log("======gasLimit=========", gasLimit)
        {

            let output = await contract.tx.transferFrom({
                value: 0, gasLimit
            }, tokenAddress, bobPair.address, alicePair.address, amount).signAndSend(bobPair);

            console.log("tx", output?.toString());



        }
    });



});
