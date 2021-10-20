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
    test.only("AS-Substrate ERC-20 contract", async () => {
        /**
        * 1. Deploy & instantiate the contract
        * 2. Test if the TOTAL_SUPPLY_STORAGE_KEY holds the CREATION_FEE as a value
        * 3. Test if FRANKIES storage holds the totalSupply of tokens
        * 4. Use the transfer function to transfer some tokens from the FRANKIES account to a new address CAROL
        * 5. Approve withdrawal amount from FRANKIES account for new 'spender' account DAN
        * 6. Use the transferFrom function to transfer some ERC20 tokens from FRANKIES to a new account OSCAR
        * 7. Use the transferFrom to let DAN try to transfer the full original allowance from FRANKIE to OSCAR. This attempt should fail.
        **/
        const metadata = require("./abis/erc721/metadata.json");///Users/lisheng/Downloads/polkadotui/ink-master/examples/flipper/target/ink/metadata.json
        // const flipAction = metadata.spec.messages[0].selector;
        // const getAction = metadata.spec.messages[1].selector;

        const TOTAL_SUPPLY_STORAGE_KEY = (new Uint8Array(32)).fill(3);

        // FRANKIE is our contract creator account
        const FRANKIE = alicePair;
        // FRANKIE will transfer 2000000000000000 tokens to CAROL
        const CAROL = keyring.getPair(CHARLIE);
        // FRANKIE will approve, that DAN is allowed to transfer 5000000000000000 of her tokens on her behalf
        const DAN = keyring.getPair(DAVE);
        // DAN will then transfer 10000000 of the 5000000000000000 approved tokens from FRANKIE to OSCAR
        const OSCAR = keyring.getPair(BOB);

        // await api.tx.balances
        //     .transfer(DAN.address, CREATION_FEE.muln(10))
        //     .signAndSend(alicePair);//
        // , (result: SubmittableResult): void => {
        //                 if (result.status.isInBlock && result.findRecord("system", "ExtrinsicSuccess")) {
        //                     console.log("DANs account is now funded.");
        //                 }
        //             });

        /**
        * 1. Deploy & instantiate the contract
        **/

        // Deploy contract code on chain and retrieve the code hash
        // const codeHash = await putCode(
        //     api,
        //     FRANKIE,
        //     "../lib/as-substrate/contracts/erc20/build/erc20.wasm"
        // );
        // expect(codeHash).toBeDefined();

        // // Instantiate a new contract instance and retrieve the contracts address
        // const address: Address = await instantiate(
        //     api,
        //     FRANKIE,
        //     codeHash,
        //     "0x00",
        //     CREATION_FEE
        // );
        // expect(address).toBeDefined();

        const address = "5FkmJ5zuMvqSGau2AGrwyz2ensv4ge6VHP2d8KenFpUXEEkJ";
        const abi = new Abi(metadata, api.registry.getChainProperties());

        // // const abi = metadata;
        const contract = new ContractPromise(api, abi, address);
        const value = 0; // only useful on isPayable messages

        // NOTE the apps UI specified these in mega units
        let gasLimit = new BN(25000) * new BN(1000000);
        const vv = new BN(30) * new BN(1000000);
        // /**
        // * 2. Test if the TOTAL_SUPPLY_STORAGE_KEY holds the CREATION_FEE as a value
        // **/

        // // Get the totalSupply of the contract from storage
        // const totalSupplyRaw = await getContractStorage(api, address, TOTAL_SUPPLY_STORAGE_KEY);
        // // Convert unsigned 128 bit integer returned as a little endian hex value 
        // // From Storage: 0x000014bbf08ac6020000000000000000
        // // Converted to <BN: 2c68af0bb140000>
        // const totalSupply = hexToBn(totalSupplyRaw.toString(), true);
        // // Test if the totalSupply value in storage equals the CREATION_FEE
        // expect(totalSupply.eq(CREATION_FEE)).toBeTruthy();
        /**
        *  3. Test if FRANKIES storage holds the totalSupply of tokens
        *
        * We know that the creator should own the total supply of the contract
        * after initialization. The return value should be of type Balance.
        * We get the value from storage and convert the returned hex value
        * to an BN instance to be able to compare the values.
        **/

        // let frankieBalanceRaw = await getContractStorage(api, address, FRANKIE.publicKey);
        // let frankieBalance = hexToBn(frankieBalanceRaw.toString(), true);
        // expect(frankieBalance.toString()).toBe(CREATION_FEE.toString());
        {
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            const owner = FRANKIE.address;
            let { gasConsumed, result, output } = await contract.query.balanceOf(FRANKIE.address, { value, gasLimit }, owner);

            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());

            // gas consumed
            console.log(gasConsumed.toHuman());

            // check if the call was successful
            if (result.isOk) {
                // should output 123 as per our initial set (output here is an i32)
                console.log(FRANKIE.address, 'balanceOf Success', output.toHuman());
            } else {
                console.error('balanceOf Error', result.asErr);
            }
        }

        /**
        * 4. Use the transfer function to transfer some tokens from the FRANKIES account to CAROLS account
        **/
        {
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            const id = new BN(1);
            let { gasConsumed, result, output } = await contract.query.ownerOf(FRANKIE.address, { value, gasLimit }, id);

            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());

            // gas consumed
            console.log(gasConsumed.toHuman());

            // check if the call was successful
            if (result.isOk) {
                // should output 123 as per our initial set (output here is an i32)
                console.log(FRANKIE.address, 'mint Success', output.toHuman());
            } else {
                console.error('mint Error', result.asErr);
            }
        }
        {
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            const id = new BN(1);
            let { gasConsumed, result, output } = await contract.query.getApproved(FRANKIE.address, { value, gasLimit }, id);

            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());

            // gas consumed
            console.log(gasConsumed.toHuman());

            // check if the call was successful
            if (result.isOk) {
                // should output 123 as per our initial set (output here is an i32)
                console.log(FRANKIE.address, 'mint Success', output.toHuman());
            } else {
                console.error('mint Error', result.asErr);
            }
        }
        {
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            const id = new BN(1);
            let { gasConsumed, result, output } = await contract.query.mint(FRANKIE.address, { value, gasLimit }, id);

            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());

            // gas consumed
            console.log(gasConsumed.toHuman());

            // check if the call was successful
            if (result.isOk) {
                // should output 123 as per our initial set (output here is an i32)
                console.log(FRANKIE.address, 'mint Success', output.toHuman());
            } else {
                console.error('mint Error', result.asErr);
            }
        }
        {
            //   console.log(contract)
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            // const id = new BN(1);
            // let { gasConsumed, result, output } = await contract.tx.mint({ value, gasLimit }, id).signAndSend(DAN);
            // sleepMs(500000)

            // let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
            // The actual result from RPC as `ContractExecResult`
            // console.log(result);

            // gas consumed
            // console.log(gasConsumed.toHuman());

            // check if the call was successful
            // if (result.isOk) {
            //     // should output 123 as per our initial set (output here is an i32)
            //     console.log(FRANKIE.address, 'mint Success', output.toHuman());
            // } else {
            //     console.error('mint Error', result.asErr);
            // }
        }
        {
            //   console.log(contract)
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            const destination = OSCAR.address;
            const id = new BN(1);

            let { gasConsumed, result, output } = await contract.query.transfer(DAN.address, { value, gasLimit }, destination, id);
            // sleepMs(500000)

            // let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
            // The actual result from RPC as `ContractExecResult`
            // console.log(result);

            // gas consumed
            // console.log(gasConsumed.toHuman());

            // check if the call was successful
            // if (result.isOk) {
            //     // should output 123 as per our initial set (output here is an i32)
            //     console.log(FRANKIE.address, 'mint Success', output.toHuman());
            // } else {
            //     console.error('mint Error', result.asErr);
            // }
        }

        {
            //   console.log(contract)
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            const destination = OSCAR.address;
            const id = new BN(1);

            let { gasConsumed, result, output } = await contract.tx.transfer({ value, gasLimit }, destination, id).signAndSend(DAN);
            sleepMs(500000)

            let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
            // The actual result from RPC as `ContractExecResult`
            // console.log(result);

            // gas consumed
            // console.log(gasConsumed.toHuman());

            // check if the call was successful
            // if (result.isOk) {
            //     // should output 123 as per our initial set (output here is an i32)
            //     console.log(FRANKIE.address, 'mint Success', output.toHuman());
            // } else {
            //     console.error('mint Error', result.asErr);
            // }
        }
        {
            //   console.log(contract)
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            const to = OSCAR.address;
            const approved = true;

            let { gasConsumed, result, output } = await contract.query.setApprovalForAll(DAN.address, { value, gasLimit }, to, approved);
            // sleepMs(500000)

            // let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
            // The actual result from RPC as `ContractExecResult`
            // console.log(result);

            // gas consumed
            // console.log(gasConsumed.toHuman());

            // check if the call was successful
            // if (result.isOk) {
            //     // should output 123 as per our initial set (output here is an i32)
            //     console.log(FRANKIE.address, 'mint Success', output.toHuman());
            // } else {
            //     console.error('mint Error', result.asErr);
            // }
        }
        {
            //   console.log(contract)
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            const to = OSCAR.address;
            const id = new BN(1);

            let { gasConsumed, result, output } = await contract.query.approve(DAN.address, { value, gasLimit }, to, id);
            // sleepMs(500000)

            // let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
            // The actual result from RPC as `ContractExecResult`
            // console.log(result);

            // gas consumed
            // console.log(gasConsumed.toHuman());

            // check if the call was successful
            // if (result.isOk) {
            //     // should output 123 as per our initial set (output here is an i32)
            //     console.log(FRANKIE.address, 'mint Success', output.toHuman());
            // } else {
            //     console.error('mint Error', result.asErr);
            // }
        }
        {
            //   console.log(contract)
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            const from = OSCAR.address;
            const to = OSCAR.address;
            const id = new BN(1);

            let { gasConsumed, result, output } = await contract.query.transferFrom(DAN.address, { value, gasLimit }, from, to, id);
            // sleepMs(500000)

            // let nonce = await api.rpc.system.accountNextIndex(alicePair.address);
            // The actual result from RPC as `ContractExecResult`
            // console.log(result);

            // gas consumed
            // console.log(gasConsumed.toHuman());

            // check if the call was successful
            // if (result.isOk) {
            //     // should output 123 as per our initial set (output here is an i32)
            //     console.log(FRANKIE.address, 'mint Success', output.toHuman());
            // } else {
            //     console.error('mint Error', result.asErr);
            // }
        }
        {
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            const id = new BN(1);
            let { gasConsumed, result, output } = await contract.query.burn(FRANKIE.address, { value, gasLimit }, id);

            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());

            // gas consumed
            console.log(gasConsumed.toHuman());

            // check if the call was successful
            if (result.isOk) {
                // should output 123 as per our initial set (output here is an i32)
                console.log(FRANKIE.address, 'mint Success', output.toHuman());
            } else {
                console.error('mint Error', result.asErr);
            }
        }
        // const transferTokenId = bnToHex(new BN(1), {
        //     bitLength: 128,
        //     isLe: false,
        //     isNegative: false
        // })
        // console.log("transferTokenId===", transferTokenId)
        // const paramsTransfer =
        //     '0xcfdd9aa2' // 1 byte: First byte Action.Transfer
        //     + transferTokenId; // 16 bytes: Amount of tokens to transfer as u128 little endian hex (2000000000000000 in decimal)) value

        // await callContract(api, FRANKIE, address, paramsTransfer);

        // const paramsTransfer =
        //     '0x84a15da1' // 1 byte: First byte Action.Transfer
        //     + u8aToHex(CAROL.publicKey, -1, false) // 32 bytes: Hex encoded new account address as u256
        //     + transferTokenId; // 16 bytes: Amount of tokens to transfer as u128 little endian hex (2000000000000000 in decimal)) value

        // await callContract(api, FRANKIE, address, paramsTransfer);

        // sleepMs(500000)

        // let nonce = await api.rpc.system.accountNextIndex(alicePair.address);


        // Perform the actual read (no params at the end, for the `get` message)
        // (We perform the send from an account, here using Alice's address)


        // console.log(contract.abi.messages[3])
        // api.tx.contracts
        //     .call(address, value, gasLimit, contract.abi.messages[3].toU8a([DAN.address, vv]))
        //     .signAndSend(alicePair, { nonce: nonce.toHuman() + 1 }, (result: SubmittableResult) => { });
        // nonce = await api.rpc.system.accountNextIndex(alicePair.address);
        // {
        //     // Perform the actual read (no params at the end, for the `get` message)
        //     // (We perform the send from an account, here using Alice's address)
        //     // const to = OSCAR.address;
        //     // // const value = 100000000; // only useful on isPayable messages
        //     // const value = new BN(30) * new BN(1000000);
        //     // // let { gasConsumed, result, output } = await contract.tx.transfer({ value, gasLimit }, to,value).signAndSend(alicePair,{ nonce: nonce.toHuman() + 1 }) ;//, (result: SubmittableResult) => { });
        //     // execute(contract.tx.transfer({ value: 0, gasLimit }, to, value), alicePair);
        //     // nonce = await api.rpc.system.accountNextIndex(alicePair.address);

        //     // The actual result from RPC as `ContractExecResult`
        //     // console.log(result.toHuman());

        //     // gas consumed
        //     // console.log(gasConsumed.toHuman());

        //     // check if the call was successful
        //     // if (result.isOk) {
        //     //     // should output 123 as per our initial set (output here is an i32)
        //     //     console.log('balanceOf Success', output.toHuman());
        //     // } else {
        //     //     console.error('balanceOf Error', result.asErr);
        //     // }
        // }
        // const paramsbalanceOf =
        //     '0x01' // 1 byte: First byte Action.Transfer
        //     + u8aToHex(alicePair.publicKey, -1, false) // 32 bytes: Hex encoded new account address as u256
        // const r = await rpcContract(api, address, paramsbalanceOf);
        // console.log("r========",r)


        // frankieBalanceRaw = await getContractStorage(api, address, FRANKIE.publicKey);
        // frankieBalance = hexToBn(frankieBalanceRaw.toString(), true);
        // const carolBalanceRaw = await getContractStorage(api, address, CAROL.publicKey);
        // const carolBalance = hexToBn(carolBalanceRaw.toString(), true);
        // let frankieBalanceNew = totalSupply.sub(new BN(2000000000000000));
        // expect(frankieBalance.toString()).toBe(frankieBalanceNew.toString());
        // expect(carolBalance.toString()).toBe("2000000000000000");
        // frankieBalance = frankieBalanceNew;

        /**
        * 5. FRANKIE approves withdrawal amount for new account DAN
        **/

        // 16 bytes: Amount of tokens to transfer as u128 little endian hex (5000000000000000 in decimal)) value
        const approvedAmount = '0080e03779c311000000000000000000';
        // const approvedAmount = bnToHex(new BN(90) * new BN(100000000000000), {
        //     bitLength: 128,
        //     isLe: true,
        //     isNegative: false
        // })
        // const paramsApprove =
        //     '0x681266a0' // 1 byte: First byte Action.Transfer
        //     + u8aToHex(DAN.publicKey, -1, false) // 32 bytes: Hex encoded new spender account address as u256
        //     + approvedAmount;

        // await callContract(api, FRANKIE, address, paramsApprove);
        // sleepMs(500000)
        // nonce = await api.rpc.system.accountNextIndex(alicePair.address);
        // // Create a new storage key from the FRANKIE.publicKey and the DAN.publicKey
        // // It will be hashed to 32 byte hash with blake2b in the `getContractStorage` function before querying.
        // const storageKeyApprove = new Uint8Array(64);
        // storageKeyApprove.set(FRANKIE.publicKey);
        // storageKeyApprove.set(DAN.publicKey, 32);

        // // let storageKeyApprove32: Uint8Array = sha256(storageKeyApprove) // default export is hash
        // // let allowanceRaw = await getContractStorage(api, address, storageKeyApprove32);
        // // expect(allowanceRaw.toString()).toBe('0x' + approvedAmount);
        // expect(frankieBalance.toString()).toBe(CREATION_FEE.toString());
        {
            // Perform the actual read (no params at the end, for the `get` message)
            // (We perform the send from an account, here using Alice's address)
            const owner = FRANKIE.address;
            const operator = DAN.address;
            gasLimit = new BN(30000) * new BN(1000000);
            let { gasConsumed, result, output } = await contract.query.isApprovedForAll(FRANKIE.address, { value, gasLimit }, owner, operator);

            // The actual result from RPC as `ContractExecResult`
            console.log(result.toHuman());

            // gas consumed
            console.log(gasConsumed.toHuman());

            // check if the call was successful
            if (result.isOk) {
                // should output 123 as per our initial set (output here is an i32)
                console.log('isApprovedForAll Success', output.toHuman());
            } else {
                console.error('isApprovedForAll Error', result.asErr);
            }
        }
        // // /**
        // // *  6. Use the transferFrom function to let DAN transfer 10000000 ERC20 tokens from FRANKIE to OSCAR
        // // **/

        // // let oscarBalanceRaw = await getContractStorage(api, address, OSCAR.publicKey);
        // // let oscarBalance = hexToBn(oscarBalanceRaw.toString(), true);
        // // expect(oscarBalance.toString()).toBe("0");
        //    const transferfromAmount = bnToHex(new BN(90) * new BN(100000000000000), {
        //         bitLength: 256,
        //         isLe: true,
        //         isNegative: false
        //     })
        //     const paramsTransferFrom =
        //         '0x0b396f18' // 1 byte: First byte Action.TransferFrom
        //         + u8aToHex(FRANKIE.publicKey, -1, false) // 32 bytes: Hex encoded contract caller address as u256
        //         + u8aToHex(OSCAR.publicKey, -1, false) // 32 bytes: Hex encoded new account address as u256
        //         + '80969800000000000000000000000000'; // 16 bytes: Amount of tokens to transfer as u128 little endian hex (10000000 in decimal)) value

        //     await callContract(api, DAN, address, paramsTransferFrom);
        //     sleepMs(500000)
        //     nonce = await api.rpc.system.accountNextIndex(alicePair.address);
        // // frankieBalanceNew = frankieBalance.sub(new BN(10000000));

        // // frankieBalanceRaw = await getContractStorage(api, address, FRANKIE.publicKey);
        // // frankieBalance = hexToBn(frankieBalanceRaw.toString(), true);
        // // oscarBalanceRaw = await getContractStorage(api, address, OSCAR.publicKey);
        // // oscarBalance = hexToBn(oscarBalanceRaw.toString(), true);

        // // // Test that value has been deducted from the approved amount
        // // const allowanceUpdated = hexToBn(allowanceRaw.toString(), true).sub(new BN(10000000));
        // // allowanceRaw = await getContractStorage(api, address, storageKeyApprove32);
        // // let allowance = hexToBn(allowanceRaw.toString(), true);
        // // expect(allowance.toString()).toBe(allowanceUpdated.toString());

        // // expect(oscarBalance.toString()).toBe("10000000");
        // // expect(frankieBalance.toString()).toBe(frankieBalanceNew.toString());

        // /**
        // *  7. Use the transferFrom function to let DAN try to transfer the full original allowance from FRANKIE to OSCAR. This attempt should fail now, because that value would be higher than the remaining allowance from FRANKIE to DAN.
        // **/

        // const paramsTransferFromFail =
        //     '0x0b396f18' // 1 byte: First byte Action.TransferFrom
        //     + u8aToHex(FRANKIE.publicKey, -1, false) // 32 bytes: Hex encoded contract caller address as u256
        //     + u8aToHex(OSCAR.publicKey, -1, false) // 32 bytes: Hex encoded new account address as u256
        //     + approvedAmount; // 16 bytes: Amount of tokens to transfer as u128 little endian hex value

        // await callContract(api, DAN, address, paramsTransferFromFail);

        // frankieBalanceRaw = await getContractStorage(api, address, FRANKIE.publicKey);
        // frankieBalance = hexToBn(frankieBalanceRaw.toString(), true);
        // oscarBalanceRaw = await getContractStorage(api, address, OSCAR.publicKey);
        // oscarBalance = hexToBn(oscarBalanceRaw.toString(), true);

        // // The balances of FRANKIE and OSCAR are remaining the same 
        // expect(oscarBalance.toString()).toBe("10000000");
        // expect(frankieBalance.toString()).toBe(frankieBalanceNew.toString());

        // // Test that the allowance hasn't changed
        // const allowanceOld = allowance;
        // allowanceRaw = await getContractStorage(api, address, storageKeyApprove32);
        // allowance = hexToBn(allowanceRaw.toString(), true);
        // expect(allowanceOld.toString()).toBe(allowance.toString());
        //  done();
    });





});