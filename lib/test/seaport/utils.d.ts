import { ApiPromise } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";
import { Address, Hash, StorageData } from "@polkadot/types/interfaces";
import BN from "bn.js";
import { SubmittableExtrinsic } from '@polkadot/api/types';
export declare function sleepMs(ms?: number): Promise<void>;
export declare function execute(extrinsic: SubmittableExtrinsic<'promise'>, signer: KeyringPair, api: ApiPromise, logger?: {
    info: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
}): Promise<void>;
export declare function sendAndReturnFinalized(signer: KeyringPair, tx: any, api: any): Promise<unknown>;
export declare function putCode(api: ApiPromise, signer: KeyringPair, fileName: string, abi: any): Promise<Hash>;
export declare function instantiate(api: ApiPromise, signer: KeyringPair, codeHash: Hash, inputData: any, endowment: BN, gasRequired?: number): Promise<Address>;
export declare function callContract(api: ApiPromise, signer: KeyringPair, contractAddress: Address | string, inputData: any, gasRequired?: number, endowment?: number): Promise<void>;
export declare function rpcContract(api: ApiPromise, contractAddress: Address | string, inputData: any, gasLimit?: number): Promise<Uint8Array>;
export declare function getContractStorage(api: ApiPromise, contractAddress: any, storageKey: Uint8Array): Promise<StorageData>;
