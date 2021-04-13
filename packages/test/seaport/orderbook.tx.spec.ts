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

import { createApiAndTestAccounts, saveNonce, sleepMs } from './helpers/apiHelper'

async function init(): Promise<{ api: ApiPromise; accounts: any }> {
    jest.setTimeout(30000);
    process.env.NODE_ENV = 'test';
    const papi = await createApiAndTestAccounts();
    const api = papi.api;
    const accounts = papi.accounts;
    users = papi.users;

    submit(api, api.tx.balances.transfer(users.betty.key.address, salary), users.bobBank);
    submit(api, api.tx.balances.transfer(users.bob.key.address, salary), users.bobBank);

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
    });

    afterAll(() => {
        //   return clearCityDatabase();
        saveNonce(users)
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
            submit(api, api.tx.orderbook.postOrder(order_id, users.bob.key.address, o), users.betty);
        }

        // console.log("========postAssetWhiteList=======");
        // submit(api, api.tx.orderbook.postAssetWhiteList('users.bob.key.address', 'token id', "test@test.com"), users.betty);

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
        //     submit(api, api.tx.orderbook.postOrder(order_id, users.bob.key.address, o), users.betty);
        // }

        console.log("========postAssetWhiteList=======");
        submit(api, api.tx.orderbook.postAssetWhiteList('users.bob.key.address', 'token id', "test@test.com"), users.betty);

    });

});
