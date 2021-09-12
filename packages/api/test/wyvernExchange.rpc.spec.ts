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


describe('wyvernExchange rpc tests', (): void => {

    const second = 1000;
    const block = 6.5 * second;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
    let api: any;
    let accounts: any;
    let accounts7: any;
    let accounts77: any;
    let buy: any;
    let sell: any;
    let buy_hash: any;
    let sell_hash: any;
    let buy_sig: any;
    let sell_sig: any;
    let result: any;
    beforeAll(async () => {
        const papi = await init();
        api = papi.api;
        accounts = papi.accounts;
        accounts7 = accounts.slice(0, 7);
        accounts77 = accounts.slice(-8, -1);
        buy = makeOrder(users.bob.key.address, true, 0);
        sell = makeOrder(users.bob.key.address, false, 1);
        [sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken] = accounts77;
        [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken] = accounts7;
        buy.taker = users.bob.key.address;
        sell.taker = users.bob.key.address;
        sell.feeRecipient = users.bob.key.address;
        buy.exchange = users.bob.key.address;
        sell.exchange = users.bob.key.address;
        buy.target = sell.target;
        buy.paymentToken = sell.paymentToken;

    });

    afterAll(() => {
        //   return clearCityDatabase();
        saveNonce(users)
    });
    it('hashOrderEx', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);
        console.log("hashOrderEx(",
            [sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
            [sell.makerRelayerFee, sell.takerRelayerFee, sell.makerProtocolFee, sell.takerProtocolFee, sell.basePrice, sell.extra, sell.listingTime, sell.expirationTime, sell.salt],
            sell.feeMethod,
            sell.side,
            sell.saleKind,
            sell.howToCall,
            sell.calldata,
            sell.replacementPattern,
            sell.staticExtradata);
        let sell_hash = await api.rpc.wyvernExchange.hashOrderEx(
            [sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
            [sell.makerRelayerFee, sell.takerRelayerFee, sell.makerProtocolFee, sell.takerProtocolFee, sell.basePrice, sell.extra, sell.listingTime, sell.expirationTime, sell.salt],
            sell.feeMethod,
            sell.side,
            sell.saleKind,
            sell.howToCall,
            sell.calldata,
            sell.replacementPattern,
            sell.staticExtradata);
        console.log(`The value from  hashOrderEx is ${sell_hash}\n`);

    });


    it('hashToSignEx', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);


        console.log("hashToSignEx(",
            [sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
            [sell.makerRelayerFee, sell.takerRelayerFee, sell.makerProtocolFee, sell.takerProtocolFee, sell.basePrice, sell.extra, sell.listingTime, sell.expirationTime, sell.salt],
            sell.feeMethod,
            sell.side,
            sell.saleKind,
            sell.howToCall,
            sell.calldata,
            sell.replacementPattern,
            sell.staticExtradata);

        sell_hash = await api.rpc.wyvernExchange.hashToSignEx(
            [sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
            [sell.makerRelayerFee, sell.takerRelayerFee, sell.makerProtocolFee, sell.takerProtocolFee, sell.basePrice, sell.extra, sell.listingTime, sell.expirationTime, sell.salt],
            sell.feeMethod,
            sell.side,
            sell.saleKind,
            sell.howToCall,
            sell.calldata,
            sell.replacementPattern,
            sell.staticExtradata);

        console.log(`The value from  hashToSignEx is ${sell_hash}\n`);

    });


    it('validateOrderEx', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);
        // let buy_sig = await api.sign(users.betty.key,buy_hash);
        buy_sig = await users.betty.key.sign(buy_hash);

        console.log("===========validateOrderEx(",
            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata,
            buy_sig
        );
        let result = await api.rpc.wyvernExchange.validateOrderEx(
            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata,
            buy_sig
        );
        console.log(`The value from  validateOrderEx is ${result}\n`);

    });


    it('validateOrderParametersEx', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);
        console.log("validateOrderParametersEx(",
            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata
        );
        result = await api.rpc.wyvernExchange.validateOrderParametersEx(
            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata
        );
        console.log(`The value from  validateOrderParametersEx is ${result}\n`);

    });


    it('ordersCanMatchEx', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);
        console.log("ordersCanMatchEx(",
            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken, sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt, sell.makerRelayerFee, sell.takerRelayerFee, sell.makerProtocolFee, sell.takerProtocolFee, sell.basePrice, sell.extra, sell.listingTime, sell.expirationTime, sell.salt],
            [buy.feeMethod, buy.side, buy.saleKind, buy.howToCall, sell.feeMethod, sell.side, sell.saleKind, sell.howToCall],
            buy.calldata,
            sell.calldata,
            buy.replacementPattern,
            sell.replacementPattern,
            buy.staticExtradata,
            sell.staticExtradata
        );
        result = await api.rpc.wyvernExchange.ordersCanMatchEx(
            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken, sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt, sell.makerRelayerFee, sell.takerRelayerFee, sell.makerProtocolFee, sell.takerProtocolFee, sell.basePrice, sell.extra, sell.listingTime, sell.expirationTime, sell.salt],
            [buy.feeMethod, buy.side, buy.saleKind, buy.howToCall, sell.feeMethod, sell.side, sell.saleKind, sell.howToCall],
            buy.calldata,
            sell.calldata,
            buy.replacementPattern,
            sell.replacementPattern,
            buy.staticExtradata,
            sell.staticExtradata
        );
        console.log(`The value from  ordersCanMatchEx is ${result}\n`);

    });


    it('calculateMatchPriceEx', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);
        console.log("calculateMatchPriceEx(",
            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken, sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt, sell.makerRelayerFee, sell.takerRelayerFee, sell.makerProtocolFee, sell.takerProtocolFee, sell.basePrice, sell.extra, sell.listingTime, sell.expirationTime, sell.salt],
            [buy.feeMethod, buy.side, buy.saleKind, buy.howToCall, sell.feeMethod, sell.side, sell.saleKind, sell.howToCall],
            buy.calldata,
            sell.calldata,
            buy.replacementPattern,
            sell.replacementPattern,
            buy.staticExtradata,
            sell.staticExtradata
        );
        // assert.equal(ret, true, 'Orders were not matchable!')
        result = await api.rpc.wyvernExchange.calculateMatchPriceEx(
            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken, sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt, sell.makerRelayerFee, sell.takerRelayerFee, sell.makerProtocolFee, sell.takerProtocolFee, sell.basePrice, sell.extra, sell.listingTime, sell.expirationTime, sell.salt],
            [buy.feeMethod, buy.side, buy.saleKind, buy.howToCall, sell.feeMethod, sell.side, sell.saleKind, sell.howToCall],
            buy.calldata,
            sell.calldata,
            buy.replacementPattern,
            sell.replacementPattern,
            buy.staticExtradata,
            sell.staticExtradata
        );
        console.log(`The value from  calculateMatchPriceEx is ${result}\n`);


    });


});
