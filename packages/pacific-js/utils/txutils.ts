import { ApiPromise, SubmittableResult } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";
import { Option } from "@polkadot/types";
import { Address, ContractInfo, Hash, StorageData } from "@polkadot/types/interfaces";
import { u8aToHex } from "@polkadot/util";
import BN from "bn.js";
import fs from "fs";
import path from "path";
const blake = require('blakejs');
// import { CodePromise, ContractPromise } from '@polkadot/api-contract';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { EventRecord, ExtrinsicStatus } from '@polkadot/types/interfaces';

import { GAS_LIMIT, GAS_REQUIRED } from "./consts";
// import { submit } from '../../orders/lib/submit-signed-tx'
export function sleepMs(ms = 0): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

import { waitFor } from './waitFor';

export async function execute(extrinsic: SubmittableExtrinsic<'promise'>, signer: KeyringPair, api: ApiPromise, logger = { info: console.log }): Promise<void> {
    let currentTxDone = false;

    function sendStatusCb({ events = [], status }: { events?: EventRecord[], status: ExtrinsicStatus; }) {
        if (status.isInvalid) {
            logger.info('Transaction invalid');
            currentTxDone = true;
        } else if (status.isReady) {
            logger.info('Transaction is ready');
        } else if (status.isBroadcast) {
            logger.info('Transaction has been broadcasted');
        } else if (status.isInBlock) {
            logger.info('Transaction is in block');
        } else if (status.isFinalized) {
            logger.info(`Transaction has been included in blockHash ${status.asFinalized.toHex()}`);
            events.forEach(
                ({ event }) => {
                    if (event.method === 'ExtrinsicSuccess') {
                        logger.info('Transaction succeeded');
                    } else if (event.method === 'ExtrinsicFailed') {
                        logger.info('Transaction failed');
                    }
                }
            );
            currentTxDone = true;
        }
    }
    // const nonce = await api.rpc.system.accountNextIndex(signer.address); { nonce: nonce.toHuman() + 1 }, 

    await extrinsic.signAndSend(signer,sendStatusCb);
    await waitFor(() => currentTxDone, { timeout: 20000 });
}
export async function sendAndReturnFinalized(signer: KeyringPair, tx: any, api: any) {
    let nonce = await api.rpc.system.accountNextIndex(signer.address);

    return new Promise(function (resolve, reject) {
        tx.signAndSend(signer, { nonce: nonce.toHuman() + 1 }, (result: SubmittableResult) => {
            if (result.status.isInBlock) {
                // Return the result of the submittable extrinsic after the transfer is finalized
                resolve(result as SubmittableResult);
            }
            if (
                result.status.isDropped ||
                result.status.isInvalid ||
                result.status.isUsurped
            ) {
                reject(result as SubmittableResult);
                console.error("ERROR: Transaction could not be finalized.");
            }
        });
    });
}

export async function putCode(
    api: ApiPromise,
    signer: KeyringPair,
    fileName: string,
    abi: any
): Promise<Hash> {
    const wasmCode = fs
        .readFileSync(path.join(__dirname, fileName))
        .toString("hex");
    console.log(api.tx.contracts)
    const tx = api.tx.contracts.putCode(`0x${wasmCode}`);
    const result: any = await sendAndReturnFinalized(signer, tx, api);
    const record = result.findRecord("contracts", "CodeStored");

    if (!record) {
        console.error("ERROR: No code stored after executing putCode()");
    }
    // Return code hash.5H7a1y8LfcoLa9MXoVA8kYYs6AXiJCcKCBR5U5QUZEuoHB1H
    return record.event.data[0];

    // const wasm = `0x${wasmCode}`;
    // // const code = new CodePromise(api, abi, wasm);
    // let blueprint;
    // console.log(code)
    // createBlueprint is a normal submittable, so use signAndSend
    // with an known Alice keypair (as per the API samples)
    // Deploy a contract using the Blueprint
    // const endowment = new BN(1230000000000);

    // // NOTE The apps UI specifies these in Mgas
    // let gasLimit = new BN(100000) * new BN(1000000);
    // const initValue = 1;

    // let contract;
    // let record;
    // // We pass the constructor (named `new` in the actual Abi),
    // // the endowment, gasLimit (weight) as well as any constructor params
    // // (in this case `new (initValue: i32)` is the constructor)
    // let nonce = await api.rpc.system.accountNextIndex(signer.address);
    // console.log("nonce==", nonce.toHuman());
    // const unsub = await code.tx
    //     .new(endowment, gasLimit, initValue)
    //     .signAndSend(signer, { nonce: nonce.toHuman() + 1 }, ({ status, events, dispatchError }) => {
    //         if (!status.isInBlock && !status.isFinalized) {
    //             return;
    //         }
    //         console.log(JSON.stringify(events))

    //         unsub();
    //         if (dispatchError) {
    //             if (!dispatchError.isModule) throw `${dispatchError}`;
    //             const decoded = api.registry.findMetaError(dispatchError.asModule);
    //             console.log(JSON.stringify(decoded));
    //             throw decoded.docs.join(' ');
    //         }

    //         console.log(` < [] In block: ${status.asInBlock}`);
    //     });
    // const address = "5H7a1y8LfcoLa9MXoVA8kYYs6AXiJCcKCBR5U5QUZEuoHB1H";
    // try {
    //     const pair = keyring.getAddress(address, 'contract');

    //     if (!pair) {
    //         throw new Error();
    //     }

    //     const data = pair?.meta.contract?.abi;

    //     contract = new ContractPromise(api, data, address);
    // } catch (error) {
    //     return null;
    // }
    // contract = new ContractPromise(api, abi, address);

    // Read from the contract via an RPC call
    // const value = 0; // only useful on isPayable messages

    // // NOTE the apps UI specified these in mega units
    // gasLimit = new BN(3000) * new BN(1000000);

    // // Perform the actual read (no params at the end, for the `get` message)
    // // (We perform the send from an account, here using Alice's address)
    // let { gasConsumed, result, output } = await contract.query.get(signer.address, { value, gasLimit });

    // // The actual result from RPC as `ContractExecResult`
    // console.log(result.toHuman());

    // // gas consumed
    // console.log(gasConsumed.toHuman());

    // // check if the call was successful
    // if (result.isOk) {
    //     // should output 123 as per our initial set (output here is an i32)
    //     console.log('Success', output.toHuman());
    // } else {
    //     console.error('Error', result.asErr);
    // }


    // // We will use these values for the execution
    // // const value = 0; // only useful on isPayable messages
    // gasLimit = new BN(300) * new BN(1000000);
    // const incValue = true;
    // {
    //     let { gasConsumed, result, output } = await contract.tx.flip({ value, gasLimit })
    //         .signAndSend(signer);//.address, { value, gasLimit });
    // }
    // let { gasConsumed, result } = await contract.query.flip(signer.address, { value, gasLimit: -1 });
    // console.log(output.toHuman());
    // The actual result from RPC as `ContractExecResult`
    // console.log(result.toHuman());

    // gas consumed
    // console.log(gasConsumed.toHuman());
    // Send the transaction, like elsewhere this is a normal extrinsic
    // with the same rules as applied in the API (As with the read example,
    // additional params, if required can follow - here only one is needed)
    //     let unsub = await contract.tx
    //         .flip({ value, gasLimit: gasConsumed })
    //         .signAndSend(signer, { nonce: nonce.toHuman() + 1 }, ({ status, events, dispatchError }) => {
    //             if (!status.isInBlock && !status.isFinalized) {
    //                 return;
    //             }
    //             console.log(JSON.stringify(events))

    //             unsub();
    //             if (dispatchError) {
    //                 if (!dispatchError.isModule) throw `${dispatchError}`;
    //                 const decoded = api.registry.findMetaError(dispatchError.asModule);
    //                 console.log(JSON.stringify(decoded));
    //                 throw decoded.docs.join(' ');
    //             }

    //             console.log(` < [] In block: ${status.asInBlock}`);
    //         });
    // }
    // .signAndSend(signer,{ nonce: nonce.toHuman() + 1 }, (result) => {
    //     if (result.status.isInBlock) {
    //         console.log('in a block');
    //     } else if (result.status.isFinalized) {
    //         console.log('finalized');
    //     }
    // });

    // Perform the actual read (no params at the end, for the `get` message)
    // (We perform the send from an account, here using Alice's address)
    // {
    //     let { gasConsumed, result, output } = await contract.query.get(signer.address, { value, gasLimit: -1 });

    //     // The actual result from RPC as `ContractExecResult`
    //     console.log(result.toHuman());

    //     // gas consumed
    //     console.log(gasConsumed.toHuman());

    //     // check if the call was successful
    //     if (result.isOk) {
    //         // should output 123 as per our initial set (output here is an i32)
    //         console.log('2Success', output.toHuman());
    //     } else {
    //         console.error('2Error', result.asErr);
    //     }
    // }


}

export async function instantiate(
    api: ApiPromise,
    signer: KeyringPair,
    codeHash: Hash,
    inputData: any,
    endowment: BN,
    gasRequired: number = GAS_REQUIRED
): Promise<Address> {
    const tx = api.tx.contracts.instantiate(
        endowment,
        gasRequired,
        codeHash,
        inputData,
        null
    );
    const result: any = await sendAndReturnFinalized(signer, tx, api);
    const record = result.findRecord("contracts", "Instantiated");

    if (!record) {
        console.error("ERROR: No new instantiated contract");
    }
    // Return the Address of  the instantiated contract.
    return record.event.data[1];
}


export async function callContract(
    api: ApiPromise,
    signer: KeyringPair,
    contractAddress: Address | string,
    inputData: any,
    gasRequired: number = GAS_REQUIRED,
    endowment: number = 0
): Promise<void> {
    const tx = api.tx.contracts.call(
        contractAddress,
        endowment,
        gasRequired,
        inputData
    );


    execute(tx, signer, api)
    // let nonce = await api.rpc.system.accountNextIndex(signer.address);//nonce.toHuman() + 1
    // await tx.signAndSend(signer, { nonce: -1 });
    // console.log("===========")
    // const unsub = await tx.signAndSend(signer, { nonce: nonce.toHuman() + 1 }, ({ status, events, dispatchError }) => {
    //     if (!status.isInBlock && !status.isFinalized) {
    //         // console.log(JSON.stringify(status))
    //         // console.log("===========")
    //         return;
    //     }
    //     console.log(JSON.stringify(events))

    //     unsub();
    //     if (dispatchError) {
    //         if (!dispatchError.isModule) throw `${dispatchError}`;
    //         const decoded = api.registry.findMetaError(dispatchError.asModule);
    //         console.log(JSON.stringify(decoded));
    //         throw decoded.docs.join(' ');
    //     }

    //     console.log(` < [] In block: ${status.asInBlock}`);
    // });
    // submit(api,tx,signer)
    // await sendAndReturnFinalized(signer, tx,api);
}

export async function rpcContract(
    api: ApiPromise,
    contractAddress: Address | string,
    inputData: any,
    gasLimit: number = GAS_LIMIT,
): Promise<Uint8Array> {
    const res = await api.rpc.contracts.call({
        dest: contractAddress,
        gasLimit,
        inputData
    });
    console.log(res.toHuman());

    if (!res.result.isOk) {
        console.error("ERROR: rpc call did not succeed", res.result.asErr);
    }

    return res.result.toU8a();
}

export async function getContractStorage(
    api: ApiPromise,
    contractAddress: any,
    storageKey: Uint8Array
): Promise<StorageData> {
    const contractInfo = await api.query.contracts.contractInfoOf(
        contractAddress
    );
    // Return the value of the contracts storage
    const childStorageKey = (contractInfo as Option<ContractInfo>).unwrap().asAlive.trieId;
    // Add the default child_storage key prefix `:child_storage:default:` to the storage key
    const prefixedStorageKey = '0x3a6368696c645f73746f726167653a64656661756c743a' + u8aToHex(childStorageKey, -1, false);

    console.log(prefixedStorageKey)
    const storageKeyBlake2b = '0x' + blake.blake2bHex(storageKey, null, 32);

    const result = await api.rpc.childstate.getStorage(
        prefixedStorageKey, // childStorageKey || prefixed trieId of the contract
        storageKeyBlake2b // hashed storageKey
    ) as Option<StorageData>;
    console.log(result.unwrapOrDefault())
    return result.unwrapOrDefault();
}
