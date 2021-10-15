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
import { u8aToHex } from "@polkadot/util";
import { randomAsU8a } from "@polkadot/util-crypto";
import { KeyringPair } from "@polkadot/keyring/types";
import { Option } from "@polkadot/types";
import { Address, ContractInfo, Hash } from "@polkadot/types/interfaces";
import { submit } from '../../orders/lib/submit-signed-tx'
import { CodePromise, ContractPromise } from '@polkadot/api-contract';
import BN from "bn.js";
import { Abi } from '@polkadot/api-contract';

import { ALICE, BOB, CHARLIE, CREATION_FEE, WSURL } from "./consts";
import {
    callContract,
    rpcContract,
    instantiate,
    getContractStorage,
    putCode, sleepMs
} from "./utils";

// This is a test account that is going to be created and funded each test.
const keyring = createTestKeyring({ type: "sr25519" });
const alicePair = keyring.getPair(ALICE);
const bobPair = keyring.getPair(BOB);
const charliePair = keyring.getPair(CHARLIE);

const salary = 100_000_000_000_000;

let testAccount: KeyringPair;
let api: ApiPromise;
jest.useRealTimers();
beforeAll((): void => {
    jest.setTimeout(3000000);
    // jest.useFakeTimers('legacy')
});

beforeEach(
    async () => {
        api = await ApiPromise.create({ provider: new WsProvider(WSURL) });
        testAccount = keyring.addFromSeed(randomAsU8a(32));
        let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
        // submit(api, api.tx.balances.transfer(bobPair.address, salary), alicePair);
        const txn = api.tx.balances
            .transfer(bobPair.address, CREATION_FEE.muln(3));
        const getType = (arg: any) => `${arg.type}` === 'Bytes' && arg.Type.name === 'Text' ? 'Text' : arg.type
        const args = txn.args.map((arg: any, idx: any) => `${api.registry.createType(getType(txn.meta.args[idx]), arg)}`)
        console.log(bobPair.address)

        const done = await txn
            .signAndSend(alicePair, { nonce: nonce.toHuman() + 1 }, (result: SubmittableResult): void => {
                if (
                    result.status.isInBlock
                ) {
                    console.log("New bob account has been transfer.");
                    done();
                }
                if (
                    result.status.isInBlock &&
                    result.findRecord("system", "ExtrinsicSuccess")
                ) {
                    console.log("New test account has been created.");
                    done();
                }
            });
        console.log(charliePair.address)

        api.tx.balances
            .transfer(charliePair.address, CREATION_FEE.muln(3))
            .signAndSend(alicePair, { nonce: nonce.toHuman() + 1 }, (result: SubmittableResult): void => {
                if (
                    result.status.isInBlock &&
                    result.findRecord("system", "ExtrinsicSuccess")
                ) {
                    console.log("New test account has been created.");
                    //done();
                }
            });
    }
);

describe("Rust Smart Contracts", () => {
    test("Flip contract", async () => {
        // The next two lines are a not so pretty workaround until the new metadata format has been fully implemented
        const metadata = require("/Users/lisheng/Downloads/polkadotui/ink-master/examples/flipper/target/ink/metadata.json");///Users/lisheng/Downloads/polkadotui/ink-master/examples/flipper/target/ink/metadata.json
        // console.log("============",api.tx.contracts,"===========")

        const selector = metadata.spec.constructors[1].selector;
        const flipAction = metadata.spec.messages[0].selector;
        const getAction = metadata.spec.messages[1].selector;
        const STORAGE_KEY = (new Uint8Array(32)).fill(0);


        const _codeHash = "0xb1756c6848d9f13cf587e4bad1b52288cb206e70fd15e8b284bf92919daca4e0";
        const codeHash = api.registry.createType('Hash', _codeHash)


        const address = "5H7a1y8LfcoLa9MXoVA8kYYs6AXiJCcKCBR5U5QUZEuoHB1H";


        const abi = metadata;
        // const abi = new Abi(api.registry, metadata);

        const contract = new ContractPromise(api, abi, address);

        const value = 0; // only useful on isPayable messages
        const gasLimit = new BN(300) * new BN(1000000);
        const incValue = true;
        console.log("============", contract.address, "===========")
        const initialValue: Uint8Array = await getContractStorage(
            api,
            contract.address,
            STORAGE_KEY
        );
        // {
        //     let { gasConsumed, result, output } = await contract.tx[contract.abi.messages[0].method]({ value, gasLimit })
        //         .signAndSend(alicePair);//.address, { value, gasLimit });
        // }



        //done();
    });

    test.only("flip contract", async () => {
        // The next two lines are a not so pretty workaround until the new metadata format has been fully implemented
        const metadata = require("/Users/lisheng/Downloads/polkadotui/ink-master/examples/flipper/target/ink/metadata.json");///Users/lisheng/Downloads/polkadotui/ink-master/examples/flipper/target/ink/metadata.json
        // console.log("============",api.tx.contracts,"===========")

        const selector = metadata.spec.constructors[1].selector;
        const flipAction = metadata.spec.messages[0].selector;
        const getAction = metadata.spec.messages[1].selector;
        const STORAGE_KEY = (new Uint8Array(32)).fill(0);

        // Deploy contract code on chain and retrieve the code hash
        // const codeHash: Hash = await putCode(
        //   api,
        //   alicePair,
        //   "flipper.wasm",metadata
        // );
        // expect(codeHash).toBeDefined();
        const _codeHash = "0xb1756c6848d9f13cf587e4bad1b52288cb206e70fd15e8b284bf92919daca4e0";
        const codeHash = api.registry.createType('Hash', _codeHash)

        // // Instantiate a new contract instance and retrieve the contracts address
        // // The selector `0x0222FF18` is copied over from the generated ink! contract metadata
        // const address: Address = await instantiate(
        //     api,
        //     alicePair,
        //     codeHash,
        //     selector,
        //     CREATION_FEE
        // );
        // expect(address).toBeDefined();

        const address = "5H7a1y8LfcoLa9MXoVA8kYYs6AXiJCcKCBR5U5QUZEuoHB1H";
        const abi = metadata;

        const contract = new ContractPromise(api, abi, address);

        const value = 0; // only useful on isPayable messages
        const gasLimit = new BN(400) * new BN(1000000);
        const abic = new Abi(metadata, api.registry.getChainProperties());
        // console.log(abic)
        api.tx.contracts
            .call(address, value, gasLimit, contract.abi.messages[0].toU8a([]))
            .signAndSend(alicePair, (result: SubmittableResult) => { });


        // {
        //     const owner = alicePair;
        //     let hash = await contract.tx.flip({ value, gasLimit }).signAndSend(alicePair);//.address, { value, gasLimit });
        //     console.log("hash======",hash.toHuman());
        // }
        // const initialValue: Uint8Array = await getContractStorage(
        //   api,
        //   address,
        //   STORAGE_KEY
        // );
        // expect(initialValue).toBeDefined();
        // expect(initialValue.toString()).toEqual("0x00");
        // Read from the contract via an RPC call

        {
            const value = 0; // only useful on isPayable messages

            // NOTE the apps UI specified these in mega units
            const gasLimit = new BN(3000) * new BN(1000000);

            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            let { gasConsumed, result, output } = await contract.query.get(alicePair.address, { value, gasLimit });

            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());

            // gas consumed
            console.log(gasConsumed.toHuman());

            // check if the call was successful
            if (result.isOk) {
                // should output 123 as per our initial set (output here is an i32)
                console.log('Success', output.toHuman());
            } else {
                console.error('Error', result.asErr);
            }
        }
        // // // The selector `0x8C97DB39` is copied over from the generated ink! contract metadata
        // await callContract(api, alicePair, address, flipAction);

        // console.log(api.query.system.account.key(ALICE));

        // sleepMs(5000)
        // const _address = "5H7a1y8LfcoLa9MXoVA8kYYs6AXiJCcKCBR5U5QUZEuoHB1H";
        // const addresss = api.registry.createType('Address', _address)
        // const r = await rpcContract(api, address, getAction);
        // console.log(r)
        // const newValue = await getContractStorage(api, addresss, STORAGE_KEY);
        // expect(newValue.toString()).toEqual("0x01");

        //done();
    });

});