// Copyright 2017-2021 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0
import type { ApiOptions } from '@polkadot/api/types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { createType } from '@polkadot/types';
import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';

import * as definitions from '../../interfaces/definitions';
import '../../interfaces/augment-api';
import '../../interfaces/augment-types';
import { submit, testUsers } from '../../orders/lib/submit-signed-tx'
import { makeOrderArrayEx,unflattenObject, arr2obj,orderFieldsJSONToOrder, makeOrderArrayHexEx, makeOrderFromJSONHex, makeOrderEx, makeOrder, orderFromJSON } from '../../orders/order'
import { v4 as uuidv4 } from 'uuid'
// import rpcs from './config/rpcs.json';
import rpcs from '../../orders/lib/rpcs.json'

const provider = new WsProvider('ws://127.0.0.1:9944/');
import { TypeRegistry } from '@polkadot/types/create';
const registry = new TypeRegistry();
let users: any;
const salary = 100_000_000_000_000;

// function sleepMs(ms = 0): Promise<void> {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// function createApi(): Promise<ApiPromise> {
//     jest.setTimeout(30000);
//     process.env.NODE_ENV = 'test';

//     //   const provider = new WsProvider('wss://kusama-rpc.polkadot.io');
//     // const provider = new WsProvider('wss://westend-rpc.polkadot.io/');
//     const types = Object.values(definitions).reduce((res, { types }):
//         object => ({ ...res, ...types }), {});

//     return new ApiPromise({
//         provider, rpc: rpcs, types: {
//             ...types,
//             // chain-specific overrides
//             Keys: 'SessionKeys4'
//         }
//     }).isReady;
// }
import { createApiAndTestAccounts, saveNonce, sleepMs } from './helpers/apiHelper'

async function init(): Promise<{ api: ApiPromise; accounts: any }> {
    jest.setTimeout(30000);
    process.env.NODE_ENV = 'test';
    const papi = await createApiAndTestAccounts();
    const api = papi.api;
    const accounts = papi.accounts;
    users = papi.users;
    // await provider.connect();
    // await sleepMs(100); // Hack to give the provider time to connect

    // const rpcData = await provider.send('state_getMetadata', []);
    // const genesisHash = registry.createType('Hash', await provider.send('chain_getBlockHash', [])).toHex();
    // const specVersion = 0;
    // const metadata: any = {};
    // const key = `${genesisHash}-${specVersion}`;

    // // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // metadata[key] = rpcData;

    // const types = Object.values(definitions).reduce((res, { types }):
    //     object => ({ ...res, ...types }), {});
    // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const api = await ApiPromise.create({
    //     metadata, provider, registry, rpc: rpcs, types: {
    //         ...types,
    //         // chain-specific overrides
    //         Keys: 'SessionKeys4'
    //     }
    // } as ApiOptions);
    // // const api = await createApi();
    // users = testUsers();
    // let senders = [users.bobBank, users.bob, users.betty];
    // for (let sender of senders) {
    //     if (0== sender.nonce) {
    //         console.log("sender.nonce==7==", sender.nonce);
    //         let nonce = await api.rpc.system.accountNextIndex(sender.key.address);
    //         if (0 != nonce.words[0]) {
    //             sender.nonce = nonce.words[0];
    //             console.log("sender.nonce==77==", sender.nonce);
    //         }
    //     }
    // }

    // let accounts = Object.values(users).map((u) => u.key.address);
    // let accounts7 = accounts.slice(0, 7);
    // let accounts77 = accounts.slice(-8, -1);
    // console.log(accounts, "=======account=====", accounts77);

    // console.log("======transfer====");
    submit(api, api.tx.balances.transfer(users.betty.key.address, salary), users.bobBank);
    submit(api, api.tx.balances.transfer(users.bob.key.address, salary), users.bobBank);

    return { api, accounts };

}


describe('orderbook rpc tests', (): void => {

    const second = 1000;
    const block = 6.5 * second;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
    let api: any;
    beforeAll(async () => {
        const papi = await init();
        api = papi.api;
    });

    afterAll(() => {
        //   return clearCityDatabase();
        saveNonce(users)
    });
    it.only('getOrder', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);

        const orderArray = makeOrderArrayHexEx();
        const orders = makeOrderEx();

        console.log("getOrder(", {
            params: orderArray[0]
        });
        let order = await api.rpc.orderbook.getOrder({
            params: orderArray[0]
        });
        console.log(order.toHuman())
        // console.log("=arr2obj=",unflattenObject(arr2obj(order.toHuman().fields)))
        console.log("=orderFieldsJSONToOrder==",orderFieldsJSONToOrder(order.toHuman()))
  
        console.log(`The value from the getOrder is ${order}\n`);

    });

    it('getOrders', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);

        const orderArray = makeOrderArrayHexEx();
        const orders = makeOrderEx();

        let orderjsons = await api.rpc.orderbook.getOrders({
            params: orderArray[1]
        }, 1);
        console.log(`The value from the getOrders is ${orderjsons}\n`);

    });


    it('getAsset', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);

        const orderArray = makeOrderArrayHexEx();
        const orders = makeOrderEx();

        console.log("getAsset(", orders[2]["metadata.asset.address"], stringToHex(orders[2]["metadata.asset.id"] + ""));
        let asset1 = await api.rpc.orderbook.getAsset(stringToHex(orders[2]["metadata.asset.address"]), stringToHex(orders[2]["metadata.asset.id"] + ""));
        console.log(`The value from the getAsset is ${asset1}\n`);


        console.log("===================");
        let s = `${asset1}`
        if (s != undefined && s != null && s != "") {
            console.log(makeOrderFromJSONHex([JSON.parse(`${asset1}`)]));
        }
        console.log("===================");

    });


    it('getAssets', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);

        const orderArray = makeOrderArrayHexEx();
        const orders = makeOrderEx();

        console.log("=======getAssets(", {
            token_ids: [stringToHex(orders[3]["metadata.asset.id"])],
            asset_contract_address: stringToHex(orders[3]["metadata.asset.address"])
        }, 1);
        let assets = await api.rpc.orderbook.getAssets({
            token_ids: [stringToHex(orders[2]["metadata.asset.id"])],
            asset_contract_address: stringToHex(orders[2]["metadata.asset.address"])
        }, 1);
        console.log(`The value from the getAssets is ${assets}\n`);

    });
});
