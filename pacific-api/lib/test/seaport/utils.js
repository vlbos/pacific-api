"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractStorage = exports.rpcContract = exports.callContract = exports.instantiate = exports.putCode = exports.sendAndReturnFinalized = exports.execute = exports.sleepMs = void 0;
const util_1 = require("@polkadot/util");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const blake = require('blakejs');
const consts_1 = require("./consts");
function sleepMs(ms = 0) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleepMs = sleepMs;
const waitFor_1 = require("./waitFor");
async function execute(extrinsic, signer, api, logger = { info: console.log }) {
    let currentTxDone = false;
    function sendStatusCb({ events = [], status }) {
        if (status.isInvalid) {
            logger.info('Transaction invalid');
            currentTxDone = true;
        }
        else if (status.isReady) {
            logger.info('Transaction is ready');
        }
        else if (status.isBroadcast) {
            logger.info('Transaction has been broadcasted');
        }
        else if (status.isInBlock) {
            logger.info('Transaction is in block');
        }
        else if (status.isFinalized) {
            logger.info(`Transaction has been included in blockHash ${status.asFinalized.toHex()}`);
            events.forEach(({ event }) => {
                if (event.method === 'ExtrinsicSuccess') {
                    logger.info('Transaction succeeded');
                }
                else if (event.method === 'ExtrinsicFailed') {
                    logger.info('Transaction failed');
                }
            });
            currentTxDone = true;
        }
    }
    // const nonce = await api.rpc.system.accountNextIndex(signer.address); { nonce: nonce.toHuman() + 1 }, 
    await extrinsic.signAndSend(signer, sendStatusCb);
    await (0, waitFor_1.waitFor)(() => currentTxDone, { timeout: 20000 });
}
exports.execute = execute;
async function sendAndReturnFinalized(signer, tx, api) {
    let nonce = await api.rpc.system.accountNextIndex(signer.address);
    return new Promise(function (resolve, reject) {
        tx.signAndSend(signer, { nonce: nonce.toHuman() + 1 }, (result) => {
            if (result.status.isInBlock) {
                // Return the result of the submittable extrinsic after the transfer is finalized
                resolve(result);
            }
            if (result.status.isDropped ||
                result.status.isInvalid ||
                result.status.isUsurped) {
                reject(result);
                console.error("ERROR: Transaction could not be finalized.");
            }
        });
    });
}
exports.sendAndReturnFinalized = sendAndReturnFinalized;
async function putCode(api, signer, fileName, abi) {
    const wasmCode = fs_1.default
        .readFileSync(path_1.default.join(__dirname, fileName))
        .toString("hex");
    console.log(api.tx.contracts);
    const tx = api.tx.contracts.putCode(`0x${wasmCode}`);
    const result = await sendAndReturnFinalized(signer, tx, api);
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
exports.putCode = putCode;
async function instantiate(api, signer, codeHash, inputData, endowment, gasRequired = consts_1.GAS_REQUIRED) {
    const tx = null; //
    //  api.tx.contracts.instantiate(
    //         endowment,
    //         gasRequired,
    //         codeHash,
    //         inputData,
    //         null
    //     );
    const result = await sendAndReturnFinalized(signer, tx, api);
    const record = result.findRecord("contracts", "Instantiated");
    if (!record) {
        console.error("ERROR: No new instantiated contract");
    }
    // Return the Address of  the instantiated contract.
    return record.event.data[1];
}
exports.instantiate = instantiate;
async function callContract(api, signer, contractAddress, inputData, gasRequired = consts_1.GAS_REQUIRED, endowment = 0) {
    // const tx = api.tx.contracts.call(
    //     contractAddress,
    //     endowment,
    //     gasRequired,
    //     inputData
    // );
    // execute(tx, signer, api)
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
exports.callContract = callContract;
async function rpcContract(api, contractAddress, inputData, gasLimit = consts_1.GAS_LIMIT) {
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
exports.rpcContract = rpcContract;
async function getContractStorage(api, contractAddress, storageKey) {
    const contractInfo = await api.query.contracts.contractInfoOf(contractAddress);
    // Return the value of the contracts storage
    const childStorageKey = contractInfo.unwrap().asAlive.trieId;
    // Add the default child_storage key prefix `:child_storage:default:` to the storage key
    const prefixedStorageKey = '0x3a6368696c645f73746f726167653a64656661756c743a' + (0, util_1.u8aToHex)(childStorageKey, -1, false);
    console.log(prefixedStorageKey);
    const storageKeyBlake2b = '0x' + blake.blake2bHex(storageKey, null, 32);
    const result = await api.rpc.childstate.getStorage(prefixedStorageKey, // childStorageKey || prefixed trieId of the contract
    storageKeyBlake2b // hashed storageKey
    );
    console.log(result.unwrapOrDefault());
    return result.unwrapOrDefault();
}
exports.getContractStorage = getContractStorage;
//# sourceMappingURL=utils.js.map