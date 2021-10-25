// Copyright 2017-2021 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0
import type { ApiOptions } from '@polkadot/api/types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { createType } from '@polkadot/types';
import * as definitions from '../../interfaces/definitions';
import '../../interfaces/augment-api';
import '../../interfaces/augment-types';
import { submit, testUsers } from '../../orders/lib/submit-signed-tx'
import { makeOrderArrayEx, makeOrderEx, makeOrder, orderFromJSON } from '../../orders/order'
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
    const papi = await createApiAndTestAccounts(provider);
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
    // let senders = [users.dave, users.bob, users.admin];
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
    submit(api, api.tx.balances.transfer(users.admin.key.address, salary), users.dave);
    submit(api, api.tx.balances.transfer(users.bob.key.address, salary), users.dave);

    return { api, accounts };

}


describe('orderbook tx tests', (): void => {

    const second = 1000;
    const block = 6.5 * second;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
    let api: any;
    beforeAll(async () => {
        const papi = await init();
        api = papi.api;
        submit(api, api.tx.orderbook.changeOwner(
            users.admin.key.address), users.admin);
        submit(api, api.tx.orderbook.setOrderLimits(
            1000), users.admin);
        submit(api, api.tx.orderbook.setAssetWhiteListLimits(
            1000), users.admin);
    });

    afterAll(() => {
        saveNonce(users)
        sleepMs(65000)
    });
    it('postOrder', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);

        const orderArray = makeOrderArrayEx();
        // let o = orderArray[0];
        console.log("======postOrder=========");
        let order_id = "";
        for (let o of orderArray) {
            // console.log(o);
            order_id = uuidv4();
            submit(api, api.tx.orderbook.postOrder(order_id, users.bob.key.address, o), users.admin);
        }

        sleepMs(65000)
        // console.log("========postAssetWhiteList=======");
        // submit(api, api.tx.orderbook.postAssetWhiteList('users.bob.key.address', 'token id', "test@test.com"), users.admin);

    });

    it('postAssetWhiteList', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);

        // const orderArray = makeOrderArrayEx();
        // let o = orderArray[0];
        // console.log("======postOrder=========");
        // let order_id = "";
        // for (let o of orderArray) {
        //     // console.log(o);
        //     order_id = uuidv4();
        //     submit(api, api.tx.orderbook.postOrder(order_id, users.bob.key.address, o), users.admin);
        // }

        console.log("========postAssetWhiteList=======");
        submit(api, api.tx.orderbook.postAssetWhiteList('users.bob.key.address', 'token id', "test@test.com"), users.admin);

    });

    it('changeOwner', async (): Promise<void> => {
        submit(api, api.tx.orderbook.changeOwner(
            users.admin.key.address), users.admin);
    });

    it('setOrderLimits', async (): Promise<void> => {
        submit(api, api.tx.orderbook.setOrderLimits(
            1000), users.admin);
    });

    it('setAssetWhiteListLimits', async (): Promise<void> => {
        submit(api, api.tx.orderbook.setAssetWhiteListLimits(
            1000), users.admin);

    });

});
