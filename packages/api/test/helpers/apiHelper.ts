// Copyright 2017-2021 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0
import type { ApiOptions } from '@polkadot/api/types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { createType } from '@polkadot/types';
// import type { Registry } from '@polkadot/types/types';
import { putKV, getValue } from './configHelper'

import { Metadata } from '@polkadot/metadata';
// import metaStatic from '@polkadot/metadata/static';
import * as definitions from '../../../interfaces/definitions';
import '../../../interfaces/augment-api';
import '../../../interfaces/augment-types';
import { submit, testUsers } from '../../../orders/lib/submit-signed-tx'
import { makeOrderArrayEx, makeOrderEx, makeOrder, orderFromJSON } from '../../orders/order'
import { v4 as uuidv4 } from 'uuid'
// import rpcs from './config/rpcs.json';
import rpcs from '../../../orders/lib/rpcs.json'

const provider = new WsProvider('ws://127.0.0.1:9944/');
import { TypeRegistry } from '@polkadot/types/create';
const registry = new TypeRegistry();
let users: any = null;
const salary = 100_000_000_000_000;

export function sleepMs(ms = 0): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createApi(): Promise<ApiPromise> {
   jest.setTimeout(30000);
    process.env.NODE_ENV = 'test';
    //   const provider = new WsProvider('wss://kusama-rpc.polkadot.io');
    // const provider = new WsProvider('wss://westend-rpc.polkadot.io/');
    const types = Object.values(definitions).reduce((res, { types }):
        object => ({ ...res, ...types }), {});

    return new ApiPromise({
        provider, rpc: rpcs, types: {
            ...types,
            // chain-specific overrides
            Keys: 'SessionKeys4'
        }
    }).isReady;
}

export async function createApiAndTestAccounts(): Promise<{ api: ApiPromise; accounts: any; users: any }> {
    jest.setTimeout(30000);
    process.env.NODE_ENV = 'test';
    await provider.connect();
    await sleepMs(100); // Hack to give the provider time to connect
    if (null == users) {
        users = testUsers();
    }
    const rpcData = await provider.send('state_getMetadata', []);
    const genesisHash = registry.createType('Hash', await provider.send('chain_getBlockHash', [])).toHex();
    const specVersion = 0;
    const rawmetadata: any = {};
    const key = `${genesisHash}-${specVersion}`;
    // console.log("======key====", key)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    rawmetadata[key] = rpcData;
    const metadata = new Metadata(registry, rpcData);

    const types = Object.values(definitions).reduce((res, { types }):
        object => ({ ...res, ...types }), {});
    registry.register({ ...types });
    registry.setMetadata(metadata);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const api = await ApiPromise.create({
        provider, rawmetadata, registry, rpc: rpcs, types: {
            ...types,
            // chain-specific overrides
            Keys: 'SessionKeys4'
        }
    } as ApiOptions);
    api.injectMetadata(metadata, true);

    // const metadata1 = await api.rpc.state.getMetadata();
    // console.log('version: ' + metadata1.version);
    // console.log("Magic number: " + metadata1.magicNumber);
    // console.log("Metadata: " + JSON.stringify(metadata1.asLatest.toHuman(), null, 2));

    // const api = await createApi();
    let senders = [users.bobBank, users.bob, users.betty];
    for (let sender of senders) {
        if (0 == sender.nonce) {
            // console.log("sender.nonce==7==", sender.nonce);
            let nonce = await api.rpc.system.accountNextIndex(sender.key.address);
            if (0 != nonce.words[0]) {
                sender.nonce = nonce.words[0];
                //  let nonce = getValue(sender.key.address)
                putKV(sender.key.address, sender.nonce)
                // console.log("sender.nonce==77==", sender.nonce);
            }
        }
    }

    let accounts = Object.values(users).map((u) => u.key.address);
    let accounts7 = accounts.slice(0, 8);
    let accounts77 = accounts.slice(-8, -1);
    // console.log(accounts, "=======account=====", accounts77);

    // console.log("======transfer====");

    // submit(api, api.tx.balances.transfer(users.betty.key.address, salary), users.bobBank);
    // submit(api, api.tx.balances.transfer(users.bob.key.address, salary), users.bobBank);

    return { api, accounts, users };

}
export function saveNonce(users: any) {
    let senders = [users.bobBank, users.bob, users.betty];
    for (let sender of senders) {
        //  let nonce = getValue(sender.key.address)
        putKV(sender.key.address, sender.nonce)
        console.log("sender.nonce==77==", sender.nonce);
    }
}

// export function createApiWithAugmentations (): ApiPromise {
//   const registry = new TypeRegistry();
//   const metadata = new Metadata(registry, metaStatic);

//   registry.setMetadata(metadata);

//   const api = new ApiPromise({ provider: new WsProvider('ws://', false), registry });

//   api.injectMetadata(metadata, true);

//   return api;
// }