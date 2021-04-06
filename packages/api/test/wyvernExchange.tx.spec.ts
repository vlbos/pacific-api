// Copyright 2017-2021 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0
import type { ApiOptions } from '@polkadot/api/types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { createType } from '@polkadot/types';
import { u8aToString, u8aToHex } from '@polkadot/util';

import * as definitions from '../../interfaces/definitions';
import '../../interfaces/augment-api';
import '../../interfaces/augment-types';
import { submit, testUsers } from '../../orders/src/lib/submit-signed-tx'
import { makeOrderArrayEx, makeOrderEx, makeOrder, orderFromJSON } from '../../orders/order.js'
import { v4 as uuidv4 } from 'uuid'
// import rpcs from './config/rpcs.json';
import rpcs from '../../orders/src/lib/rpcs.json'

const provider = new WsProvider('ws://127.0.0.1:9944/');
import { TypeRegistry } from '@polkadot/types/create';
const registry = new TypeRegistry();
let users: any;
const salary = 100_000_000_000_000;

import { createApiAndTestAccounts, sleepMs } from './helpers/apiHelper'

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

    // console.log("======transfer====");
    submit(api, api.tx.balances.transfer(users.betty.key.address, salary), users.bobBank);
    submit(api, api.tx.balances.transfer(users.bob.key.address, salary), users.bobBank);

    return { api, accounts };

}


describe('wyvernExchange tx tests', (): void => {

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


  beforeEach(async ()=> {
    users = testUsers();
    let senders = [users.bobBank, users.bob, users.betty];
    for (let sender of senders) {
        if (0== sender.nonce) {
            let nonce = await api.rpc.system.accountNextIndex(sender.key.address);
            console.log("sender.nonce==7==", sender.nonce,nonce);
            if (0 != nonce.words[0]) {
                sender.nonce = nonce.words[0];
                console.log("sender.nonce==77==", sender.nonce);
            }
        }
    }
  });

    it('approveOrderEx', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);
        console.log("========approveOrderEx=======", [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata,
            true);
        buy.maker = users.betty.key.address;
        submit(api, api.tx.wyvernExchange.approveOrderEx(
            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata,
            true
        ), users.betty);

    });

    it('cancelOrderEx', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);

        buy.maker = users.bob.key.address;
        console.log("setContractSelf(", users.bob.key.address);
        submit(api, api.tx.wyvernExchangeCore.setContractSelf(
            users.bob.key.address), users.betty);
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

        console.log("========approveOrderEx=======", [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata,
            true);
        submit(api, api.tx.wyvernExchange.approveOrderEx(
            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata,
            true
        ), users.bob);
        console.log("========hashToSignEx=======", [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata);
        buy_hash = await api.rpc.wyvernExchange.hashToSignEx(
            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata);
        buy_sig = users.bob.key.sign(buy_hash);

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

        result = await api.rpc.wyvernExchange.validateOrderEx(
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

        console.log("========cancelOrderEx=======", [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata,
            u8aToHex(buy_sig));
        submit(api, api.tx.wyvernExchange.cancelOrderEx(
            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata,
            u8aToHex(buy_sig)), users.bob);


    });

    it('atomicMatchEx', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);

        console.log("setContractSelf(", users.bob.key.address);
        submit(api, api.tx.wyvernExchangeCore.setContractSelf(
            users.bob.key.address), users.betty);
        console.log("========approveOrderEx=====buy==", [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata,
            true);
        submit(api, api.tx.wyvernExchange.approveOrderEx(
            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata,
            true
        ), users.bob);
        console.log("========approveOrderEx=====sell==", [sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
            [sell.makerRelayerFee, sell.takerRelayerFee, sell.makerProtocolFee, sell.takerProtocolFee, sell.basePrice, sell.extra, sell.listingTime, sell.expirationTime, sell.salt],
            sell.feeMethod,
            sell.side,
            sell.saleKind,
            sell.howToCall,
            sell.calldata,
            sell.replacementPattern,
            sell.staticExtradata,
            true);
        submit(api, api.tx.wyvernExchange.approveOrderEx(
            [sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
            [sell.makerRelayerFee, sell.takerRelayerFee, sell.makerProtocolFee, sell.takerProtocolFee, sell.basePrice, sell.extra, sell.listingTime, sell.expirationTime, sell.salt],
            sell.feeMethod,
            sell.side,
            sell.saleKind,
            sell.howToCall,
            sell.calldata,
            sell.replacementPattern,
            sell.staticExtradata,
            true
        ), users.betty);

        console.log("========hashToSignEx====sell===", [sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
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
        console.log("========hashToSignEx===buy====", [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata);

        buy_hash = await api.rpc.wyvernExchange.hashToSignEx(
            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt],
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            buy.calldata,
            buy.replacementPattern,
            buy.staticExtradata);

        console.log(`The value from  hashToSignEx is ${buy_hash}\n`);
        await new Promise(r => setTimeout(r, block));

        // let buy_sig = users.betty.key.sign(buy_hash, { withType: true });
        // let sell_sig = users.betty.key.sign(sell_hash, { withType: true });
        buy_sig = users.bob.key.sign(buy_hash);
        sell_sig = users.betty.key.sign(sell_hash);
        console.log([buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken, sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt, sell.makerRelayerFee, sell.takerRelayerFee, sell.makerProtocolFee, sell.takerProtocolFee, sell.basePrice, sell.extra, sell.listingTime, sell.expirationTime, sell.salt],
            [buy.feeMethod, buy.side, buy.saleKind, buy.howToCall, sell.feeMethod, sell.side, sell.saleKind, sell.howToCall],
            buy.calldata,
            sell.calldata,
            buy.replacementPattern,
            sell.replacementPattern,
            buy.staticExtradata,
            sell.staticExtradata,
            u8aToHex(buy_sig), u8aToHex(sell_sig),
            '0x0000000000000000000000000000000000000000000000000000000000000000', "========atomicMatchEx=======", buy_sig, sell_sig, u8aToHex(buy_sig), u8aToHex(sell_sig));
        submit(api, api.tx.wyvernExchange.atomicMatchEx(
            [buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken, sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
            [buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt, sell.makerRelayerFee, sell.takerRelayerFee, sell.makerProtocolFee, sell.takerProtocolFee, sell.basePrice, sell.extra, sell.listingTime, sell.expirationTime, sell.salt],
            [buy.feeMethod, buy.side, buy.saleKind, buy.howToCall, sell.feeMethod, sell.side, sell.saleKind, sell.howToCall],
            buy.calldata,
            sell.calldata,
            buy.replacementPattern,
            sell.replacementPattern,
            buy.staticExtradata,
            sell.staticExtradata,
            u8aToHex(buy_sig), u8aToHex(sell_sig),
            '0x0000000000000000000000000000000000000000000000000000000000000000'), users.bob);


    });

    it('changeMinimumMakerProtocolFee', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);

        console.log("========changeMinimumMakerProtocolFee=======");
        submit(api, api.tx.wyvernExchangeCore.changeMinimumMakerProtocolFee(
            1), users.betty);


    });


    it('changeMinimumTakerProtocolFee', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);

        console.log("========changeMinimumTakerProtocolFee=======");
        submit(api, api.tx.wyvernExchangeCore.changeMinimumTakerProtocolFee(
            1), users.betty);

    });


    it('changeProtocolFeeRecipient', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);

        console.log("========changeProtocolFeeRecipient=======");
        submit(api, api.tx.wyvernExchangeCore.changeProtocolFeeRecipient(
            users.bob.key.address), users.betty);

    });


    it('changeOwner', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);

        submit(api, api.tx.wyvernExchangeCore.changeOwner(
            users.bob.key.address), users.betty);

    });


    it('setContractSelf', async (): Promise<void> => {
        // const papi = await init();
        // const api = papi.api;

        // await sleepMs(block);
        submit(api, api.tx.wyvernExchangeCore.setContractSelf(
            users.bob.key.address), users.betty);
    });
});
