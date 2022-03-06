import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';
import { decodeAddress,encodeAddress } from "@polkadot/util-crypto";

//   const publicKey = decodeAddress(address);
//   const hexPublicKey = u8aToHex(publicKey);
// const DummyNullAddress = "5CaRw9VCzZxtnaTjJzWw6NNwi4D9h3yur7akGybuG4wWXaJW";
// const DummyNullPublicKey = decodeAddress(DummyNullAddress);
// const DummyNullHexPublicKey = u8aToHex(DummyNullPublicKey).slice(2);
const DummyNullPublicKey = '0x0000000000000000000000000000000000000000000000000000000000000000';
const DummyNullHexPublicKey = DummyNullPublicKey.slice(2);
const DummyNullAddress = encodeAddress(DummyNullPublicKey);
console.log("======00000000=======",DummyNullAddress);//5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM
import { ContractPromise, Abi } from '@polkadot/api-contract';
import { BigNumber } from 'bignumber.js'
import * as ethABI from 'ethereumjs-abi'
import { WyvernProtocol } from '../../wyvern-js/WyvernProtocol'
import { HowToCall, ReplacementEncoder, Network } from '../../wyvern-js/types'
// import { WyvernAtomicizerContract } from 'wyvern-js/abi_gen/wyvern_atomicizer'
import {
    AnnotatedFunctionABI,
    FunctionInputKind,
    Schema,
} from '../../wyvern-schemas/types'
// export { AbiType } from '../../lib/wyvern-schemas'
import { WyvernAsset, WyvernFTAsset, OrderSide } from '../types'
import { proxyAssertABI, proxyABI } from '../abi/Proxy'

export interface LimitedCallSpec {
    target: string
    calldata: string
}

export interface CallSpec {
    target: string
    calldata: string
    replacementPattern: string
}

export const encodeReplacementPattern: ReplacementEncoder = WyvernProtocol.encodeReplacementPattern

export type Encoder = (schema: Schema<WyvernAsset>, asset: WyvernAsset, address: string, token: ContractPromise) => CallSpec

export const encodeCall = (abi: ContractPromise, parameters: any[]): string => {
    let tx = abi.tx.transferFrom({ value: 0, gasLimit: -1 }, ...parameters).toHex();
    let selectorIndex = tx.indexOf("0b396f18");///100
    if (selectorIndex == -1) {
        console.error("===0b396f18======selectorIndex==-1=============")
        // return "";
        selectorIndex=100;
    }
    console.log("====0b396f18====selectorIndex===============", selectorIndex)
    let txdata = "0x" + tx.slice(selectorIndex);
    // console.log(...parameters, DummyNullHexPublicKey, "======txdata=========", tx, selectorIndex);

    // let hex = txdata.replace(DummyNullHexPublicKey, WyvernProtocol.generateDefaultValue("bytes32").slice(2));
    let hex= txdata;
    console.log(hex, "======hex=========",txdata);
    return hex;
    //   const inputTypes = abi.inputs.map(i => i.type)
    // return '0x' + Buffer.concat([
    //     // ethABI.methodID(abi.name, inputTypes),
    //     // ethABI.rawEncode(inputTypes, parameters),
    // ]).toString('hex')
}

export const encodeSell: Encoder = (schema, asset, address, token) => {
    console.log("=======encodeSell========")
    const transfer = schema.functions.transfer(asset)
    const calldata = encodeCall(token, [address, DummyNullAddress, asset.id == undefined ? (<WyvernFTAsset>asset).quantity : asset.id])
    return {
        target: transfer.target,
        calldata,
        replacementPattern: encodeReplacementPattern(calldata),
    }
}

export type AtomicizedSellEncoder = (schemas: Array<Schema<WyvernAsset>>, assets: WyvernAsset[], address: string, wyvernProtocol: WyvernProtocol, networkName: Network) => CallSpec

export const encodeAtomicizedSell: AtomicizedSellEncoder = (schemas, assets, address, wyvernProtocol, networkName) => {

    const atomicizer = wyvernProtocol.wyvernAtomicizer

    const { atomicizedCalldata, atomicizedReplacementPattern } = encodeAtomicizedCalldata(atomicizer, schemas, assets, address, OrderSide.Sell)

    return {
        calldata: atomicizedCalldata,
        replacementPattern: atomicizedReplacementPattern,
        target: WyvernProtocol.getAtomicizerContractAddress(networkName)
    }
}

export type AtomicizedBuyEncoder = (schemas: Array<Schema<WyvernAsset>>, assets: WyvernAsset[], address: string, wyvernProtocol: WyvernProtocol, networkName: Network) => CallSpec

export const encodeAtomicizedBuy: AtomicizedBuyEncoder = (schemas, assets, address, wyvernProtocol, networkName) => {

    const atomicizer = wyvernProtocol.wyvernAtomicizer

    const { atomicizedCalldata, atomicizedReplacementPattern } = encodeAtomicizedCalldata(atomicizer, schemas, assets, address, OrderSide.Buy)

    return {
        calldata: atomicizedCalldata,
        replacementPattern: atomicizedReplacementPattern,
        target: WyvernProtocol.getAtomicizerContractAddress(networkName)
    }
}

export const encodeBuy: Encoder = (schema, asset, address, token) => {
    console.log("=======encodeBuy========")

    const transfer = schema.functions.transfer(asset)
    const replaceables = transfer.inputs.filter((i: any) => i.kind === FunctionInputKind.Replaceable)
    const ownerInputs = transfer.inputs.filter((i: any) => i.kind === FunctionInputKind.Owner)

    // Validate
    if (replaceables.length !== 1) {
        throw new Error('Only 1 input can match transfer destination, but instead ' + replaceables.length + ' did')
    }

    // Compute calldata
    const parameters = transfer.inputs.map((input: any) => {
        switch (input.kind) {
            case FunctionInputKind.Replaceable:
                return address
            case FunctionInputKind.Owner:
                return WyvernProtocol.generateDefaultValue(input.type)
            default:
                try {
                    return input.value.toString()
                } catch (e) {
                    console.error(schema)
                    console.error(asset)
                    throw e
                }
        }
    })



    const calldata = encodeCall(token, [DummyNullAddress, address, asset.id == undefined ? (<WyvernFTAsset>asset).quantity : asset.id])
    console.log("===buy=====calldata=======", calldata);
    // Compute replacement pattern
    let replacementPattern = encodeReplacementPattern(calldata, FunctionInputKind.Owner)
    console.log(replacementPattern, "===buy=====calldata=======", calldata);

    // if (ownerInputs.length > 0) {
    //     replacementPattern = encodeReplacementPattern(calldata, FunctionInputKind.Owner)
    // }

    return {
        target: transfer.target,
        calldata,
        replacementPattern,
    }

}

export type DefaultCallEncoder = (abi: AnnotatedFunctionABI, address: string) => string

export const encodeDefaultCall: DefaultCallEncoder = (abi, address) => {
    const parameters = abi.inputs.map(input => {
        switch (input.kind) {
            case FunctionInputKind.Replaceable:
                return WyvernProtocol.generateDefaultValue(input.type)
            case FunctionInputKind.Owner:
                return address
            case FunctionInputKind.Asset:
            default:
                return input.value
        }
    })
    return encodeCall(abi, parameters)
}

/**
 * Encode the atomicized transfer of many assets
 * @param schema Wyvern Schema for the assets
 * @param assets List of assets to transfer
 * @param from Current address owning the assets
 * @param to Destination address
 * @param atomicizer Wyvern Atomicizer instance
 */
export function encodeAtomicizedTransfer(schemas: Array<Schema<WyvernAsset>>, assets: WyvernAsset[], from: string, to: string, wyvernProtocol: WyvernProtocol, networkName: Network): LimitedCallSpec {

    //   const atomicizer = wyvernProtocol.wyvernAtomicizer

    const transactions = assets.map((asset: WyvernAsset, i) => {
        const schema = schemas[i]
        const transfer = schema.functions.transfer(asset)
        const calldata = encodeTransferCall(transfer, from, to)
        return {
            calldata,
            address: transfer.target,
            value: asset.quantity,
        }
    })

    const atomicizedCalldata = atomicizer.atomicize.getABIEncodedTransactionData(
        transactions.map((t: any) => t.address),
        transactions.map((t: any) => t.value),
        transactions.map((t: any) => new BigNumber((t.calldata.length - 2) / 2)), // subtract 2 for '0x', divide by 2 for hex
        transactions.map((t: any) => t.calldata).reduce((x: string, current: string) => x + current.slice(2), '0x'), // cut off the '0x'
    )

    return {
        calldata: atomicizedCalldata,
        target: WyvernProtocol.getAtomicizerContractAddress(networkName)
    }
}

/**
 * Encode a transfer call for a Wyvern schema function
 * @param transferAbi Annotated Wyvern ABI
 * @param from From address
 * @param to To address
 */
export function encodeTransferCall(transferAbi: AnnotatedFunctionABI, from: string, to: string) {
    const parameters = transferAbi.inputs.map(input => {
        switch (input.kind) {
            case FunctionInputKind.Replaceable:
                return to
            case FunctionInputKind.Owner:
                return from
            case FunctionInputKind.Asset:
            default:
                if (input.value == null) {
                    throw new Error(`Unsupported function input kind: ${input.kind}`)
                }
                return input.value
        }
    })
    return encodeCall(transferAbi, parameters)
}

/**
 * Encode a call to a user's proxy contract
 * @param address The address for the proxy to call
 * @param howToCall How to call the addres
 * @param calldata The data to use in the call
 * @param shouldAssert Whether to assert success in the proxy call
 */
export function encodeProxyCall(address: string, howToCall: HowToCall, calldata: string, shouldAssert = true) {
    const abi = shouldAssert ? proxyAssertABI : proxyABI
    return encodeCall(abi, [address, howToCall, Buffer.from(calldata.slice(2), 'hex')])
}

// Helpers for atomicizer

function encodeAtomicizedCalldata(atomicizer: ContractPromise, schemas: Array<Schema<WyvernAsset>>, assets: WyvernAsset[], address: string, side: OrderSide) {

    // const encoder = side === OrderSide.Sell ? encodeSell : encodeBuy
    let [fromAddress, toAddress] = side === OrderSide.Sell ? [address, DummyNullAddress] : [DummyNullAddress, address];
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

        const kind = side === OrderSide.Buy ? FunctionInputKind.Owner : undefined

        // const atomicizedReplacementPattern = WyvernProtocol.encodeAtomicizedReplacementPattern(transactions.map(t => t.abi), kind)

        // if (!atomicizedCalldata || !atomicizedReplacementPattern) {
        //   throw new Error(`Invalid calldata: ${atomicizedCalldata}, ${atomicizedReplacementPattern}`)
        // }
        // return {
        //   atomicizedCalldata,
        //   atomicizedReplacementPattern
        // }
        const selectors = ["0x0b396f18", "0x0b396f18"];
        const transactions = assets.map((asset: WyvernAsset, i) => {
            return {
                tx: asset.address,
                value: asset.id == undefined ? (<WyvernFTAsset>asset).quantity : asset.id,
            }
        });
        const args = [selectors[0], transactions.map((t: any) => t.tx), fromAddress, toAddress, transactions.map((t: any) => t.value)];
        // const erc20abi = new Abi(msigmetadata, this.apiPro.registry.getChainProperties());
        // const contract = new ContractPromise(this.apiPro, erc20abi, target);

        console.log(...args)
        let calldata = atomicizer.tx.atomicTransaction({ value: 0, gasLimit: -1 }, ...args).toHex();
        let selectorIndex = calldata.indexOf("557efb0c");
        if (selectorIndex == -1) {
            console.error("======557efb0c===selectorIndex==-1=============")
            return "";
        }
        console.log("===557efb0c====selectorIndex=========", selectorIndex)
        let atomicizedCalldata = "0x" + calldata.slice(selectorIndex);
        atomicizedCalldata = atomicizedCalldata.replace(DummyNullHexPublicKey, WyvernProtocol.generateDefaultValue("bytes32").slice(2));
        console.log(DummyNullHexPublicKey, atomicizedCalldata)
        const atomicizedReplacementPattern = WyvernProtocol.encodeAtomicizedReplacementPattern(atomicizedCalldata, kind)

        return { atomicizedCalldata, atomicizedReplacementPattern };
    } catch (error) {
        console.error({ schemas, assets, address, side })
        throw new Error(`Failed to construct your order: likely something strange about this type of item. OpenSea has been notified. Please contact us in Discord! Original error: ${error}`)
    }
}
