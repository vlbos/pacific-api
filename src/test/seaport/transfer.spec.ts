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

const address = "5CorLhFifYgPMGdWDb4PC9FaeAqKJY1ZfS74JDr25h2WhEwN";

// // const abi = ERC20;
const value = 0; // only useful on isPayable messagess
let contracts: any = {};
// NOTE the apps UI specified these in mega units
let gasLimit:any = new BN(300000).mul( new BN(1000000));
let testAccount: KeyringPair;
let api: ApiPromise;
jest.useRealTimers();
// beforeAll((): void => {
//     jest.setTimeout(300000000);
//     // jest.useFakeTimers('legacy')
// });

beforeAll(
    async () => {
        api = await ApiPromise.create({ provider: new WsProvider(WSURL) });
        // let addresses = getAddress();
        // // console.log(abis)
        // for (let key of Object.keys(addresses)) {
        //     // console.log(abis[key.toString()],key.toString())
        //     let abi = new Abi(abis[key.toString()], api.registry.getChainProperties());
        //     contracts[key.toString()] = new ContractPromise(api, abi, addresses[key]);
        // }
        testAccount = keyring.addFromSeed(randomAsU8a(32));
        let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
        let bobnonce = await api.rpc.system.accountNextIndex(bobPair.address);
        // submit(api, api.tx.balances.transfer(bobPair.address, salary), alicePair);
        const txn = api.tx.balances
            .transfer(charliePair.address, salary);
        const getType = (arg: any) => `${arg.type}` === 'Bytes' && arg.Type.name === 'Text' ? 'Text' : arg.type
        const args = txn.args.map((arg: any, idx: any) => `${api.registry.createType(getType(txn.meta.args[idx]), arg)}`)
        console.log("===================")
        const done = await txn
            .signAndSend(alicePair, (result: SubmittableResult): void => {
                if (
                    result.status.isInBlock
                ) {
                    done();
                }
                if (
                    result.status.isInBlock &&
                    result.findRecord("system", "ExtrinsicSuccess")
                ) {
                    done();
                }
            });
        api.tx.balances
            .transfer(davePair.address, salary)
            .signAndSend(bobPair, (result: SubmittableResult): void => {
                if (
                    result.status.isInBlock &&
                    result.findRecord("system", "ExtrinsicSuccess")
                ) {
                    done();
                }
            });
        api.tx.balances
            .transfer(evePair.address, salary)
            .signAndSend(alicePair, { nonce: (Number(nonce.toString()) + 1).toString() }, (result: SubmittableResult): void => {
                if (
                    result.status.isInBlock &&
                    result.findRecord("system", "ExtrinsicSuccess")
                ) {
                    done();
                }
            });
        api.tx.balances
            .transfer(ferdiePair.address, salary)
            .signAndSend(bobPair, { nonce: (Number(bobnonce.toString()) + 1).toString() }, (result: SubmittableResult): void => {
                if (
                    result.status.isInBlock &&
                    result.findRecord("system", "ExtrinsicSuccess")
                ) {
                    done();
                }
            });
    }
);

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