"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeProxyCall = exports.encodeTransferCall = exports.encodeAtomicizedTransfer = exports.encodeDefaultCall = exports.encodeBuy = exports.encodeAtomicizedBuy = exports.encodeAtomicizedSell = exports.encodeSell = exports.encodeCall = exports.encodeReplacementPattern = void 0;
// import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';
const util_crypto_1 = require("@polkadot/util-crypto");
//   const publicKey = decodeAddress(address);
//   const hexPublicKey = u8aToHex(publicKey);
// const DummyNullAddress = "5CaRw9VCzZxtnaTjJzWw6NNwi4D9h3yur7akGybuG4wWXaJW";
// const DummyNullPublicKey = decodeAddress(DummyNullAddress);
// const DummyNullHexPublicKey = u8aToHex(DummyNullPublicKey).slice(2);
const DummyNullPublicKey = '0x0000000000000000000000000000000000000000000000000000000000000000';
const DummyNullHexPublicKey = DummyNullPublicKey.slice(2);
const DummyNullAddress = (0, util_crypto_1.encodeAddress)(DummyNullPublicKey);
console.log("======00000000=======", DummyNullAddress); //5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM
// import { BigNumber } from 'bignumber.js'
// import * as ethABI from 'ethereumjs-abi'
const WyvernProtocol_1 = require("../../wyvern-js/WyvernProtocol");
// import { WyvernAtomicizerContract } from 'wyvern-js/abi_gen/wyvern_atomicizer'
const types_1 = require("../../wyvern-schemas/types");
// export { AbiType } from '../../lib/wyvern-schemas'
const types_2 = require("../types");
const Proxy_1 = require("../abi/Proxy");
exports.encodeReplacementPattern = WyvernProtocol_1.WyvernProtocol.encodeReplacementPattern;
const encodeCall = (atomicizer, parameters) => {
    let tx = atomicizer.tx.transferFrom({ value: 0, gasLimit: -1 }, ...parameters).toHex();
    let selectorIndex = tx.indexOf("0b396f18"); ///100
    if (selectorIndex == -1) {
        console.error("===0b396f18======selectorIndex==-1=============");
        // return "";
        selectorIndex = 100;
    }
    console.log("====0b396f18====selectorIndex===============", selectorIndex);
    let txdata = "0x" + tx.slice(selectorIndex);
    // console.log(...parameters, DummyNullHexPublicKey, "======txdata=========", tx, selectorIndex);
    // let hex = txdata.replace(DummyNullHexPublicKey, WyvernProtocol.generateDefaultValue("bytes32").slice(2));
    let hex = txdata;
    console.log(hex, "======hex=========", txdata);
    return hex;
    //   const inputTypes = abi.inputs.map(i => i.type)
    // return '0x' + Buffer.concat([
    //     // ethABI.methodID(abi.name, inputTypes),
    //     // ethABI.rawEncode(inputTypes, parameters),
    // ]).toString('hex')
};
exports.encodeCall = encodeCall;
const encodeSell = (schema, asset, address, wyvernProtocol, networkName) => {
    console.log("=======encodeSell========");
    // const transfer = schema.functions.transfer(asset)
    const atomicizer = wyvernProtocol.wyvernAtomicizer;
    const { atomicizedCalldata, atomicizedReplacementPattern } = encodeAtomicizedCalldata(atomicizer, [schema], [asset], address, types_2.OrderSide.Sell); //encodeCall(atomicizer, ["0b396f18",transfer.target,address, DummyNullAddress, asset.id == undefined ? (<WyvernFTAsset>asset).quantity : asset.id])
    return {
        target: WyvernProtocol_1.WyvernProtocol.getAtomicizerContractAddress(networkName),
        calldata: atomicizedCalldata,
        replacementPattern: atomicizedReplacementPattern,
    };
};
exports.encodeSell = encodeSell;
const encodeAtomicizedSell = (schemas, assets, address, wyvernProtocol, networkName) => {
    const atomicizer = wyvernProtocol.wyvernAtomicizer;
    const { atomicizedCalldata, atomicizedReplacementPattern } = encodeAtomicizedCalldata(atomicizer, schemas, assets, address, types_2.OrderSide.Sell);
    return {
        calldata: atomicizedCalldata,
        replacementPattern: atomicizedReplacementPattern,
        target: WyvernProtocol_1.WyvernProtocol.getAtomicizerContractAddress(networkName)
    };
};
exports.encodeAtomicizedSell = encodeAtomicizedSell;
const encodeAtomicizedBuy = (schemas, assets, address, wyvernProtocol, networkName) => {
    const atomicizer = wyvernProtocol.wyvernAtomicizer;
    const { atomicizedCalldata, atomicizedReplacementPattern } = encodeAtomicizedCalldata(atomicizer, schemas, assets, address, types_2.OrderSide.Buy);
    return {
        calldata: atomicizedCalldata,
        replacementPattern: atomicizedReplacementPattern,
        target: WyvernProtocol_1.WyvernProtocol.getAtomicizerContractAddress(networkName)
    };
};
exports.encodeAtomicizedBuy = encodeAtomicizedBuy;
const encodeBuy = (schema, asset, address, wyvernProtocol, networkName) => {
    console.log("=======encodeBuy========");
    const atomicizer = wyvernProtocol.wyvernAtomicizer;
    if (schema.functions == undefined) {
        return {
            target: "WyvernProtocol.getAtomicizerContractAddress(networkName)",
            calldata: "atomicizedCalldata",
            replacementPattern: "atomicizedReplacementPattern",
        };
    }
    const transfer = schema.functions.transfer(asset);
    const replaceables = transfer.inputs.filter((i) => i.kind === types_1.FunctionInputKind.Replaceable);
    // const ownerInputs = transfer.inputs.filter((i: any) => i.kind === FunctionInputKind.Owner)
    // Validate
    if (replaceables.length !== 1) {
        // throw new Error('Only 1 input can match transfer destination, but instead ' + replaceables.length + ' did')
    }
    // Compute calldata
    // const parameters = transfer.inputs.map((input: any) => {
    //     switch (input.kind) {
    //         case FunctionInputKind.Replaceable:
    //             return address
    //         case FunctionInputKind.Owner:
    //             return WyvernProtocol.generateDefaultValue(input.type)
    //         default:
    //             try {
    //                 return input.value.toString()
    //             } catch (e) {
    //                 console.error(schema)
    //                 console.error(asset)
    //                 throw e
    //             }
    //     }
    // })
    const { atomicizedCalldata, atomicizedReplacementPattern } = encodeAtomicizedCalldata(atomicizer, [schema], [asset], address, types_2.OrderSide.Buy); //encodeCall(token, ["0b396f18",transfer.target,DummyNullAddress, address, asset.id == undefined ? (<WyvernFTAsset>asset).quantity : asset.id])
    console.log("===buy=====calldata=======", atomicizedCalldata);
    // Compute replacement pattern
    // let replacementPattern = encodeReplacementPattern(calldata, FunctionInputKind.Owner)
    console.log(atomicizedReplacementPattern, "===buy=====calldata=======", atomicizedCalldata);
    // if (ownerInputs.length > 0) {
    //     replacementPattern = encodeReplacementPattern(calldata, FunctionInputKind.Owner)
    // }
    return {
        target: WyvernProtocol_1.WyvernProtocol.getAtomicizerContractAddress(networkName),
        calldata: atomicizedCalldata,
        replacementPattern: atomicizedReplacementPattern,
    };
};
exports.encodeBuy = encodeBuy;
const encodeDefaultCall = (abi, address) => {
    // const parameters = abi.inputs.map(input => {
    //     switch (input.kind) {
    //         case FunctionInputKind.Replaceable:
    //             return WyvernProtocol.generateDefaultValue(input.type)
    //         case FunctionInputKind.Owner:
    //             return address
    //         case FunctionInputKind.Asset:
    //         default:
    //             return input.value
    //     }
    // })
    // return encodeCall(abi, parameters)
    return "";
};
exports.encodeDefaultCall = encodeDefaultCall;
/**
 * Encode the atomicized transfer of many assets
 * @param schema Wyvern Schema for the assets
 * @param assets List of assets to transfer
 * @param from Current address owning the assets
 * @param to Destination address
 * @param atomicizer Wyvern Atomicizer instance
 */
function encodeAtomicizedTransfer(schemas, assets, from, to, wyvernProtocol, networkName) {
    //       const atomicizer = wyvernProtocol.wyvernAtomicizer
    //     const transactions = assets.map((asset: WyvernAsset, i) => {
    //         const schema = schemas[i]
    //         if (schema.functions==undefined){
    //  return {
    //             calldata:"",
    //             address: "transfer.target",
    //             value: "asset.quantity",
    //         };
    //         }
    //         const transfer = schema.functions.transfer(asset)
    //         const calldata = encodeTransferCall(transfer, from, to)
    //         return {
    //             calldata,
    //             address: transfer.target,
    //             value: 0,//asset.quantity,
    //         }
    //     })
    const atomicizedCalldata = "";
    // atomicizer.atomicize.getABIEncodedTransactionData(
    //         transactions.map((t: any) => t.address),
    //         transactions.map((t: any) => t.value),
    //         transactions.map((t: any) => new BigNumber((t.calldata.length - 2) / 2)), // subtract 2 for '0x', divide by 2 for hex
    //         transactions.map((t: any) => t.calldata).reduce((x: string, current: string) => x + current.slice(2), '0x'), // cut off the '0x'
    //     )
    return {
        calldata: atomicizedCalldata,
        target: WyvernProtocol_1.WyvernProtocol.getAtomicizerContractAddress(networkName)
    };
}
exports.encodeAtomicizedTransfer = encodeAtomicizedTransfer;
/**
 * Encode a transfer call for a Wyvern schema function
 * @param transferAbi Annotated Wyvern ABI
 * @param from From address
 * @param to To address
 */
function encodeTransferCall(transferAbi, from, to) {
    // const parameters = transferAbi.inputs.map(input => {
    //     switch (input.kind) {
    //         case FunctionInputKind.Replaceable:
    //             return to
    //         case FunctionInputKind.Owner:
    //             return from
    //         case FunctionInputKind.Asset:
    //         default:
    //             if (input.value == null) {
    //                 throw new Error(`Unsupported function input kind: ${input.kind}`)
    //             }
    //             return input.value
    //     }
    // })
    // return encodeCall(transferAbi, parameters)
    return "";
}
exports.encodeTransferCall = encodeTransferCall;
/**
 * Encode a call to a user's proxy contract
 * @param address The address for the proxy to call
 * @param howToCall How to call the addres
 * @param calldata The data to use in the call
 * @param shouldAssert Whether to assert success in the proxy call
 */
function encodeProxyCall(address, howToCall, calldata, shouldAssert = true) {
    const abi = shouldAssert ? Proxy_1.proxyAssertABI : Proxy_1.proxyABI;
    return (0, exports.encodeCall)(abi, [address, howToCall, Buffer.from(calldata.slice(2), 'hex')]);
}
exports.encodeProxyCall = encodeProxyCall;
// Helpers for atomicizer
function encodeAtomicizedCalldata(atomicizer, schemas, assets, address, side) {
    // const encoder = side === OrderSide.Sell ? encodeSell : encodeBuy
    let [fromAddress, toAddress] = side === types_2.OrderSide.Sell ? [address, DummyNullAddress] : [DummyNullAddress, address];
    try {
        // const transactions = assets.map((asset, i) => {
        //   const schema = schemas[i]
        //   const { target, calldata } = encoder(schema, asset, address)
        //   return {
        //     calldata,
        //     abi: schema.functions.transfer(asset),
        //     address: target,
        //     value: new BigNumber(0),
        //   }
        // })
        // const atomicizedCalldata = atomicizer.atomicize.getABIEncodedTransactionData(
        //   transactions.map(t => t.address),
        //   transactions.map(t => t.value),
        //   transactions.map(t => new BigNumber((t.calldata.length - 2) / 2)), // subtract 2 for '0x', divide by 2 for hex
        //   transactions.map(t => t.calldata).reduce((x, y) => x + y.slice(2)), // cut off the '0x'
        // )
        const kind = side === types_2.OrderSide.Buy ? types_1.FunctionInputKind.Owner : undefined;
        // const atomicizedReplacementPattern = WyvernProtocol.encodeAtomicizedReplacementPattern(transactions.map(t => t.abi), kind)
        // if (!atomicizedCalldata || !atomicizedReplacementPattern) {
        //   throw new Error(`Invalid calldata: ${atomicizedCalldata}, ${atomicizedReplacementPattern}`)
        // }
        // return {
        //   atomicizedCalldata,
        //   atomicizedReplacementPattern
        // }
        const selectors = ["0x0b396f18", "0x0b396f18"];
        const transactions = assets.map((asset, i) => {
            return {
                tx: asset.address,
                value: asset.id == undefined ? asset.quantity : asset.id,
            };
        });
        const args = [selectors[0], transactions.map((t) => t.tx), fromAddress, toAddress, transactions.map((t) => t.value)];
        // const erc20abi = new Abi(msigmetadata, this.apiPro.registry.getChainProperties());
        // const contract = new ContractPromise(this.apiPro, erc20abi, target);
        console.log(...args);
        let calldata = atomicizer.tx.atomicTransaction({ value: 0, gasLimit: -1 }, ...args).toHex();
        let selectorIndex = calldata.indexOf("557efb0c");
        if (selectorIndex == -1) {
            console.error("======557efb0c===selectorIndex==-1=============");
            return "";
        }
        console.log("===557efb0c====selectorIndex=========", selectorIndex);
        let atomicizedCalldata = "0x" + calldata.slice(selectorIndex);
        // atomicizedCalldata = atomicizedCalldata.replace(DummyNullHexPublicKey, WyvernProtocol.generateDefaultValue("bytes32").slice(2));
        console.log(DummyNullHexPublicKey, atomicizedCalldata);
        const atomicizedReplacementPattern = WyvernProtocol_1.WyvernProtocol.encodeAtomicizedReplacementPattern(atomicizedCalldata, kind);
        return { atomicizedCalldata, atomicizedReplacementPattern };
    }
    catch (error) {
        console.error({ schemas, assets, address, side });
        // throw new Error(`Failed to construct your order: likely something strange about this type of item. OpenSea has been notified. Please contact us in Discord! Original error: ${error}`)
    }
    return { atomicizedCalldata: "", atomicizedReplacementPattern: "" };
}
//# sourceMappingURL=schema.js.map