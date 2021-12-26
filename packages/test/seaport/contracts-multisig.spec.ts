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

import { ALICE, BOB, CHARLIE, DAVE, CREATION_FEE, WSURL } from "./consts";
import {
    callContract,
    rpcContract,
    instantiate,
    getContractStorage,

    putCode, sleepMs, execute
} from "./utils";

// This is a test account that is going to be created and funded each test.
const keyring = createTestKeyring({ type: "sr25519" });
const alicePair = keyring.getPair(ALICE);
const bobPair = keyring.getPair(BOB);
const salary = 100_000_000_000_000;
const metadata = require("../../pacific-js/abisv2/multisig/metadata.json");
const metadata2 = require("../../pacific-js/abisv2/erc20/metadata.json");



// alicePair is our contract creator account   charlie
const charliePair = keyring.getPair(CHARLIE);
// alicePair will approve, that davePair is allowed to transfer 5000000000000000 of her tokens on her behalf  dave
const davePair = keyring.getPair(DAVE);
// davePair will then transfer 10000000 of the 5000000000000000 approved tokens from alicePair to bobPair


const address = "5GzLx3mr93e4DdMTbV7YJf7SnaYwxLsvvX4AiNbtVP7J1YC2";
//0x84a15da1  transfer
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
        // submit(api, api.tx.balances.transfer(bobPair.address, salary), alicePair);
        const txn = api.tx.balances
            .transfer(bobPair.address, CREATION_FEE.muln(3));
        const getType = (arg: any) => `${arg.type}` === 'Bytes' && arg.Type.name === 'Text' ? 'Text' : arg.type
        const args = txn.args.map((arg: any, idx: any) => `${api.registry.createType(getType(txn.meta.args[idx]), arg)}`)
        console.log("===================")
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
    test("AS-Substrate ERC-20 contract", async () => {
        /**
        * 1. Deploy & instantiate the contract
        * 2. Test if the TOTAL_SUPPLY_STORAGE_KEY holds the CREATION_FEE as a value
        * 3. Test if FRANKIES storage holds the totalSupply of tokens
        * 4. Use the transfer function to transfer some tokens from the FRANKIES account to a new address charliePair
        * 5. Approve withdrawal amount from FRANKIES account for new 'spender' account davePair
        * 6. Use the transferFrom function to transfer some ERC20 tokens from FRANKIES to a new account bobPair
        * 7. Use the transferFrom to let davePair try to transfer the full original allowance from alicePair to bobPair. This attempt should fail.
        **/
        const metadata = require("./abis/erc20/metadata.json");///Users/lisheng/Downloads/polkadotui/ink-master/examples/flipper/target/ink/metadata.json
        const selector = metadata.spec.constructors[1].selector;
        const flipAction = metadata.spec.messages[0].selector;
        const getAction = metadata.spec.messages[1].selector;

        const TOTAL_SUPPLY_STORAGE_KEY = (new Uint8Array(32)).fill(3);

        // alicePair is our contract creator account
        const alicePair = alicePair;
        // alicePair will transfer 2000000000000000 tokens to charliePair
        const charliePair = keyring.getPair(CHARLIE);
        // alicePair will approve, that davePair is allowed to transfer 5000000000000000 of her tokens on her behalf
        const davePair = keyring.getPair(DAVE);
        // davePair will then transfer 10000000 of the 5000000000000000 approved tokens from alicePair to bobPair
        const bobPair = keyring.getPair(BOB);


        const address = "5GepYorrwKeyfy9mrSdKyQbjV7ewdSjTEjt2A4tS9nUHSGSN";
        const abi = new Abi(metadata, api.registry.getChainProperties());

        // // const abi = metadata;
        const contract = new ContractPromise(api, abi, address);
        const value = 0; // only useful on isPayable messages

        // NOTE the apps UI specified these in mega units
        const gasLimit = new BN(3000) * new BN(1000000);
        const vv = new BN(30) * new BN(1000000);

        // expect(totalSupply.eq(CREATION_FEE)).toBeTruthy();
        let { gasConsumed, result, output } = await contract.query.totalSupply(alicePair.address, { value, gasLimit });

        // The actual result from RPC as `ContractExecResult`
        console.log(result.toHuman());

        // gas consumed
        console.log(gasConsumed.toHuman());

        // check if the call was successful
        if (result.isOk) {
            // should output 123 as per our initial set (output here is an i32)
            console.log('totalSupply Success', output.toHuman());
        } else {
            console.error('Error', result.asErr);
        }
        /**
        *  3. Test if FRANKIES storage holds the totalSupply of tokens
        *
        * We know that the creator should own the total supply of the contract
        * after initialization. The return value should be of type Balance.
        * We get the value from storage and convert the returned hex value
        * to an BN instance to be able to compare the values.
        **/

        // let frankieBalanceRaw = await getContractStorage(api, address, alicePair.publicKey);
        // let frankieBalance = hexToBn(frankieBalanceRaw.toString(), true);
        // expect(frankieBalance.toString()).toBe(CREATION_FEE.toString());
        {
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            const owner = alicePair.address;
            let { gasConsumed, result, output } = await contract.query.balanceOf(alicePair.address, { value, gasLimit }, owner);

            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());

            // gas consumed
            console.log(gasConsumed.toHuman());

            // check if the call was successful
            if (result.isOk) {
                // should output 123 as per our initial set (output here is an i32)
                console.log(alicePair.address, 'balanceOf Success', output.toHuman());
            } else {
                console.error('balanceOf Error', result.asErr);
            }
        }

        /**
        * 4. Use the transfer function to transfer some tokens from the FRANKIES account to CAROLS account
        **/
        const s = bnToHex(new BN(20) * new BN(100000000000000), {
            bitLength: 128,
            isLe: true,
            isNegative: false
        })
        console.log("s===", s)

        let nonce = await api.rpc.system.accountNextIndex(alicePair.address);

        // 16 bytes: Amount of tokens to transfer as u128 little endian hex (5000000000000000 in decimal)) value
        const approvedAmount = '0080e03779c311000000000000000000';

        {
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            const owner = alicePair.address;
            const spender = davePair.address;
            let { gasConsumed, result, output } = await contract.query.allowance(alicePair.address, { value, gasLimit }, owner, spender);

            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());

            // gas consumed
            console.log(gasConsumed.toHuman());

            // check if the call was successful
            if (result.isOk) {
                // should output 123 as per our initial set (output here is an i32)
                console.log('allowance Success', output.toHuman());
            } else {
                console.error('balanceOf Error', result.asErr);
            }
        }

    });

    test.only("AS-Substrate multisig contract   multisig evalucontra", async () => {

        let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
        const to = davePair.address;
        const value = new BN(700000000); // only useful on isPayable messages
        // const value = new BN(30) * new BN(1000000000000);
        // const value = bnToHex(new BN(20) * new BN(100000000000000), {
        //     bitLength: 128,
        //     isLe: true,
        //     isNegative: false
        // })
        const callee = "5CorLhFifYgPMGdWDb4PC9FaeAqKJY1ZfS74JDr25h2WhEwN"
        const selector = "0x84a15da1"
        const input = "0x0";
        const transferredValue = new BN(0);
        const tvalue = new BN(8);

        {


            console.log("============q==========", nonce.toHuman());
            let { gasConsumed, result,output } = await contract.query.evaluTransaction(charliePair.address, { value: new BN(0), gasLimit: new BN(-1) }, {callee, selector, input, transferredValue, gasLimit:new BN(0) }, to, value);//, (result: SubmittableResult) => { });
            gasLimit = gasConsumed.toString()
            console.log(`outcome: ${result.isOk ? 'Ok' : 'Error'}`);
            console.log(`gasConsumed ${gasConsumed.toString()}`);
            console.log(output,"===========q=q==========", result.toString());

        }
        {
            console.log("============ddd==========", nonce);
            let { gasConsumed, result,output } = await contract.tx.evaluTransaction( { value: new BN(0), gasLimit }, { callee, selector, input, transferredValue, gasLimit:new BN(0) }, to, value).signAndSend(charliePair);//, (result: SubmittableResult) => { });
            // execute(contract.tx.transfer({ value: 0, gasLimit }, to, value), alicePair);
            nonce = await api.rpc.system.accountNextIndex(alicePair.address);
            console.log("=============ddd===d======", result,output);
        }
        {
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            let { gasConsumed, result, output } = await contract.query.balanceOf(to, { value: 0, gasLimit: -1 }, to);

            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());

            // gas consumed
            console.log(gasConsumed.toHuman());

            // check if the call was successful
            if (result.isOk) {
                // should output 123 as per our initial set (output here is an i32)
                console.log(alicePair.address, 'balanceOf Success', output.toHuman());
            } else {
                console.error('balanceOf Error', result.asErr);
            }
        }
        sleepMs(50000000)

    });
    test("AS-Substrate ERC-20 contract   erc20 balanceOf", async () => {

        let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
        const to = bobPair.address;

        {
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            let { gasConsumed, result, output } = await contract.query.balanceOf(to, { value: 0, gasLimit: -1 }, to);

            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());

            // gas consumed
            console.log(gasConsumed.toHuman());

            // check if the call was successful
            if (result.isOk) {
                // should output 123 as per our initial set (output here is an i32)
                console.log(alicePair.address, 'balanceOf Success', output.toHuman(), output.toString());
            } else {
                console.error('balanceOf Error', result.asErr);
            }
        }

    });
    test("AS-Substrate ERC-20 contract   erc20 approve", async () => {

        let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
        const spender = charliePair.address;
        const value = new BN(100000000); // only useful on isPayable messages
        // const value = new BN(30) * new BN(1000000000000);
        // const value = bnToHex(new BN(20) * new BN(100000000000000), {
        //     bitLength: 128,
        //     isLe: true,
        //     isNegative: false
        // })

        {
            console.log("============q==========", nonce.toHuman());
            let { gasConsumed, result } = await contract.query.approve(alicePair.address, { value: new BN(0), gasLimit: new BN(-1) }, spender, value);//, (result: SubmittableResult) => { });

            gasLimit = gasConsumed.toString()
            console.log(`outcome: ${result.isOk ? 'Ok' : 'Error'}`);
            console.log(`gasConsumed ${gasConsumed.toString()}`);
            console.log("===========q=q==========", result.toString());

        }
        {
            console.log("============ddd==========", nonce);
            let { gasConsumed, result, output } = await contract.tx.approve({ value: 0, gasLimit }, spender, value).signAndSend(alicePair);//, (result: SubmittableResult) => { });
            // execute(contract.tx.transfer({ value: 0, gasLimit }, to, value), alicePair);
            nonce = await api.rpc.system.accountNextIndex(alicePair.address);
            console.log("=============ddd===d======", result);
        }

        {
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            const owner = alicePair.address;
            let { gasConsumed, result, output } = await contract.query.allowance(alicePair.address, { value: 0, gasLimit: -1 }, owner, spender);

            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());

            // gas consumed
            console.log(gasConsumed.toHuman());

            // check if the call was successful
            if (result.isOk) {
                // should output 123 as per our initial set (output here is an i32)
                console.log('allowance Success', output.toHuman());
            } else {
                console.error('balanceOf Error', result.asErr);
            }
        }

        sleepMs(50000000)

    });
    test("AS-Substrate ERC-20 contract   erc20 allowance", async () => {

        let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
        const spender = charliePair.address;
        const value = new BN(100000000); // only useful on isPayable messages
        // const value = new BN(30) * new BN(1000000000000);

        {
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            const owner = alicePair.address;
            let { gasConsumed, result, output } = await contract.query.allowance(alicePair.address, { value: 0, gasLimit: -1 }, owner, spender);

            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());

            // gas consumed
            console.log(gasConsumed.toHuman());

            // check if the call was successful
            if (result.isOk) {
                // should output 123 as per our initial set (output here is an i32)
                console.log('allowance Success', output.toHuman());
            } else {
                console.error('allowance Error', result.asErr);
            }
        }
        console.log("======allow enbd========")
        // sleepMs(50000000)

    });
    test("AS-Substrate ERC-20 contract   erc20 transfer_from", async () => {

        let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
        const from = alicePair.address;
        const to = davePair.address;
        const value = new BN(100000000); // only useful on isPayable messages
        // const value = new BN(30) * new BN(1000000000000);
        // const value = bnToHex(new BN(20) * new BN(100000000000000), {
        //     bitLength: 128,
        //     isLe: true,
        //     isNegative: false
        // })

        {
            console.log("============q==========", nonce.toHuman());
            let { gasConsumed, result } = await contract.query.transferFrom(charliePair.address, { value: new BN(0), gasLimit: new BN(-1) }, from, to, value);//, (result: SubmittableResult) => { });

            gasLimit = gasConsumed.toString()
            console.log(`outcome: ${result.isOk ? 'Ok' : 'Error'}`);
            console.log(`gasConsumed ${gasConsumed.toString()}`);
            console.log("===========q=q==========", result.toString());

        }
        {
            console.log("============ddd==========", nonce);
            let { gasConsumed, result, output } = await contract.tx.transferFrom({ value: 0, gasLimit }, from, to, value).signAndSend(charliePair);//, (result: SubmittableResult) => { });
            // execute(contract.tx.transfer({ value: 0, gasLimit }, to, value), alicePair);
            nonce = await api.rpc.system.accountNextIndex(alicePair.address);
            console.log("=============ddd===d======", result);
        }
        sleepMs(50000000)

    });
    test("ERC20 contract", async () => {
        // The next two lines are a not so pretty workaround until the new metadata format has been fully implemented
        const metadata = require("./abis/erc20/metadata.json");///Users/lisheng/Downloads/polkadotui/ink-master/examples/flipper/target/ink/metadata.json
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

        const address = "5GepYorrwKeyfy9mrSdKyQbjV7ewdSjTEjt2A4tS9nUHSGSN";


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




});