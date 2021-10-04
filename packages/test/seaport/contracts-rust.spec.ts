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

import { ALICE, BOB, CREATION_FEE, WSURL } from "./consts";
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

        api.tx.balances
            .transfer(testAccount.address, CREATION_FEE.muln(3))
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
    test.only("Flip contract", async () => {
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


        // const initialValue: Uint8Array = await getContractStorage(
        //   api,
        //   address,
        //   STORAGE_KEY
        // );
        // expect(initialValue).toBeDefined();
        // expect(initialValue.toString()).toEqual("0x00");
        // Read from the contract via an RPC call
        const abi = metadata;
        const contract = new ContractPromise(api, abi, address);

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

        // // // The selector `0x8C97DB39` is copied over from the generated ink! contract metadata
        await callContract(api, alicePair, address, flipAction);

        console.log(api.query.system.account.key(ALICE));

        sleepMs(5000)
        const _address = "5H7a1y8LfcoLa9MXoVA8kYYs6AXiJCcKCBR5U5QUZEuoHB1H";
        const addresss = api.registry.createType('Address', _address)
        const r = await rpcContract(api, address, getAction);
        console.log(r)
        const newValue = await getContractStorage(api, addresss, STORAGE_KEY);
        expect(newValue.toString()).toEqual("0x01");

        //done();
    });

    test("Raw incrementer contract", async () => {
        const STORAGE_KEY = (new Uint8Array(32)).fill(1);
        // Deploy contract code on chain and retrieve the code hash
        const codeHash: Hash = await putCode(
            api,
            testAccount,
            "../contracts/rust/raw-incrementer/target/raw_incrementer-pruned.wasm"
        );
        expect(codeHash).toBeDefined();

        // Instantiate a new contract instance and retrieve the contracts address
        const address: Address = await instantiate(
            api,
            testAccount,
            codeHash,
            "0x00",
            CREATION_FEE
        );
        expect(address).toBeDefined();

        // Call contract with Action: 0x00 0x2a 0x00 0x00 0x00 = Action::Inc(42)
        await callContract(api, testAccount, address, "0x002a000000");

        const newValue = await getContractStorage(api, address, STORAGE_KEY);
        expect(newValue.toString()).toBe("0x2a000000");

        //done();
    });

    test("Restoration contract", async () => {
        // This test does the following:
        // 1. instantiates a contract
        // 2. fills it with data
        // 3. makes the contract to be evicted
        // 4. creates a restoration contract
        // 5. performs calls that rebuild the state of the evicted contract
        // 6. restores the contract
        // 7. checks that the restored contract is equivalent to the evicted.

        const STORAGE_KEY = (new Uint8Array(32)).fill(1);

        // Deploy contract code on chain and retrieve the code hash
        const codeHash: Hash = await putCode(
            api,
            testAccount,
            "../contracts/rust/raw-incrementer/target/raw_incrementer-pruned.wasm"
        );
        expect(codeHash).toBeDefined();

        // 1. Instantiate a new contract instance and retrieve the contracts address
        const address: Address = await instantiate(
            api,
            testAccount,
            codeHash,
            "0x00",
            CREATION_FEE
        );
        expect(address).toBeDefined();

        // 2. Fill contract with initial data
        // Call contract with Action: 0x00 0x2a 0x00 0x00 0x00 = Action::Inc(42)
        await callContract(api, testAccount, address, "0x002a000000");

        const initialValue: Uint8Array = await getContractStorage(
            api,
            address,
            STORAGE_KEY
        );
        expect(initialValue).toBeDefined();
        expect(initialValue.toString()).toBe("0x2a000000");

        // 3. Evict the contract
        // 0x02 = Action::SelfEvict
        await callContract(api, testAccount, address, "0x02");

        // Do the call again, in order to make sure that the contract is evicted due to the state rent.
        // The actual call doesn't matter, but let's use this to not invent anything new.
        await callContract(api, testAccount, address, "0x02");

        // Verify that the contract is actually evicted.
        let contractInfo = await api.query.contracts.contractInfoOf(address);
        expect((contractInfo as Option<ContractInfo>).unwrap().isTombstone).toBe(
            true
        );

        // 4. Re-deploy contract code on chain and retrieve the code hash
        const restoredCodeHash: Hash = await putCode(
            api,
            testAccount,
            "../contracts/rust/restore-contract/target/restore_contract-pruned.wasm"
        );
        expect(restoredCodeHash).toBeDefined();

        const restoredAddress: Address = await instantiate(
            api,
            testAccount,
            restoredCodeHash,
            "0x00",
            CREATION_FEE
        );
        expect(restoredAddress).toBeDefined();

        // 5. performs calls that rebuild the state of the evicted contract
        let encodedPutAction =
            "0x00" + // idx:  0x00 = Action::Inc
            "01010101010101010101010101010101010101010101010101010101010101010110" + // storage key
            "2a000000"; // // little endian 32-bit integer, decimal number `42` toHex() === `2a`
        await callContract(api, testAccount, restoredAddress, encodedPutAction);

        // 6. Restore evicted contract
        const encodedRestoreAction =
            "0x01" + // idx: 0x01 = Action::Get
            u8aToHex(address.toU8a(), 256, false) + // address to hex string without prefix
            u8aToHex(codeHash.toU8a(), 256, false) + // codeHash to hex string without prefix
            "80000000000000000000000000000000"; // little endian 128 bit integer, decimal number `128` toHex() === `80`
        await callContract(api, testAccount, restoredAddress, encodedRestoreAction);

        // 7. Check that the restored contract is equivalent to the evicted.
        const newCounterValue = await getContractStorage(api, address, STORAGE_KEY);
        expect(newCounterValue.toString()).toBe("0x2a000000");

        //done();
    });
});