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


// This is a test account that is going to be created and funded each test.
const keyring = createTestKeyring({ type: "sr25519" });
const alicePair = keyring.getPair(ALICE);
const bobPair = keyring.getPair(BOB);
const salary = 100_000_000_000_000;
const metadata = require("../../wyvern-js/abisv2/erc20/metadata.json");///Users/lisheng/Downloads/polkadotui/ink-master/examples/flipper/target/ink/metadata.json


const charliePair = keyring.getPair(CHARLIE);
const davePair = keyring.getPair(DAVE);
const evePair = keyring.getPair(EVE);
const ferdiePair = keyring.getPair(FERDIE);

const address = "5CorLhFifYgPMGdWDb4PC9FaeAqKJY1ZfS74JDr25h2WhEwN";

// // const abi = metadata;
const value = 0; // only useful on isPayable messagess
let abi;
let contract;
// NOTE the apps UI specified these in mega units
let gasLimit = new BN(300000) * new BN(1000000);
let testAccount: KeyringPair;
let api: ApiPromise;
jest.useRealTimers();
beforeAll((): void => {
    jest.setTimeout(300000000);
    // jest.useFakeTimers('legacy')
});

beforeEach(
    async () => {
        api = await ApiPromise.create({ provider: new WsProvider(WSURL) });
        abi = new Abi(metadata, api.registry.getChainProperties());
        contract = new ContractPromise(api, abi, address);

        testAccount = keyring.addFromSeed(randomAsU8a(32));
        let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
     let bobnonce = await api.rpc.system.accountNextIndex(bobPair.address);
        // submit(api, api.tx.balances.transfer(bobPair.address, salary), alicePair);
        const txn = api.tx.balances
            .transfer(charliePair.address,salary);
        const getType = (arg: any) => `${arg.type}` === 'Bytes' && arg.Type.name === 'Text' ? 'Text' : arg.type
        const args = txn.args.map((arg: any, idx: any) => `${api.registry.createType(getType(txn.meta.args[idx]), arg)}`)
        console.log("===================")
        const done = await txn
            .signAndSend(alicePair, (result: SubmittableResult): void => {
                if (
                    result.status.isInBlock
                ) {
                    // console.log("New bob account has been transfer.");
                    done();
                }
                if (
                    result.status.isInBlock &&
                    result.findRecord("system", "ExtrinsicSuccess")
                ) {
                    // console.log("New test account has been created.");
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
                    // console.log("New test account has been created.");
                    done();
                }
            });
        api.tx.balances
            .transfer(evePair.address, salary)
            .signAndSend(alicePair, { nonce: (Number(nonce.toString()) + 1 ).toString() }, (result: SubmittableResult): void => {
                if (
                    result.status.isInBlock &&
                    result.findRecord("system", "ExtrinsicSuccess")
                ) {
                    // console.log("New test account has been created.");
                    done();
                }
            });
        api.tx.balances
            .transfer(ferdiePair.address, salary)
            .signAndSend(bobPair, { nonce: (Number(bobnonce.toString()) + 1 ).toString()},(result: SubmittableResult): void => {
                if (
                    result.status.isInBlock &&
                    result.findRecord("system", "ExtrinsicSuccess")
                ) {
                    // console.log("New test account has been created.");
                    done();
                }
            });
    }
);

describe("Rust Smart Contracts", () => {

test.only("AS-Substrate ERC-20 contract   erc20 transfer", async () => {

       

    });



});