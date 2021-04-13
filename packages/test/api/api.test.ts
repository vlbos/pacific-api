

import { OpenSeaPort } from '../../pacific-js/index'
// import { WyvernProtocol } from '../../lib/wyvern-js'
import { Network, Order, OrderSide, OrderJSON } from '../../pacific-js/types'
import { orderToJSON, orderFromJSON } from '../../pacific-js'
import { mainApi, rinkebyApi, apiToTest, ALEX_ADDRESS, ALEX_ADDRESS_2, CK_RINKEBY_TOKEN_ID, CK_RINKEBY_ADDRESS, CK_RINKEBY_SELLER_FEE, RINKEBY_API_KEY, CK_ADDRESS, WETH_ADDRESS, MYTHEREUM_TOKEN_ID, MYTHEREUM_ADDRESS, MAINNET_API_KEY } from '../constants'
import { getOrderHash, makeBigNumber } from '../../pacific-js/utils/utils'
import { ORDERBOOK_VERSION, NULL_ADDRESS, LOCALNET_PROVIDER_URL, ORDER_MATCHING_LATENCY_SECONDS } from '../../pacific-js/constants'

// import type { OrderId } from 'pacific-js/interfaces';

// import '../interfaces/augment-api';
// import '../interfaces/augment-types';
import { WsProvider } from '@polkadot/api';
import { stringToU8a } from '@polkadot/util';

// import { submit, users } from '../orders/lib/submit-signed-tx';

// import types from '../../pacific-js/config/types.json';
// import rpcs from '../../pacific-js/config/rpcs.json';
// const rpc = { ...rpcs };
// import { makeOrderArrayEx, makeOrderEx, makeOrder, orderFromJSON } from '../orders/order'
import * as ordersJSONFixture from '../fixtures/orders.json'

const ordersJSON = ordersJSONFixture as any
const englishSellOrderJSON = ordersJSON[0] as OrderJSON

// const provider = new Web3.providers.HttpProvider(MAINNET_PROVIDER_URL)
const provider = new WsProvider(LOCALNET_PROVIDER_URL);

const client = new OpenSeaPort(provider, {
    networkName: Network.Main,
    apiKey: MAINNET_API_KEY
}, line => console.info(`MAINNET: ${line}`))

import { ApiPromise } from '@polkadot/api';
import { submit } from '../../orders/lib/submit-signed-tx'
let users: any;
let api: any;
let accounts: any;

const salary = 100_000_000_000_000;
import { createApiAndTestAccounts, saveNonce, sleepMs } from '../../api/test/helpers/apiHelper'
async function init(): Promise<{ api: ApiPromise; accounts: any }> {
    jest.setTimeout(30000);
    process.env.NODE_ENV = 'test';
    const papi = await createApiAndTestAccounts();
    api = papi.api;
    accounts = papi.accounts;
    users = papi.users;

    submit(api, api.tx.balances.transfer(users.betty.key.address, salary), users.bobBank);
    submit(api, api.tx.balances.transfer(users.bob.key.address, salary), users.bobBank);

    return { api, accounts };

}


describe('api tests', (): void => {

    const second = 1000;
    const block = 6.5 * second;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
    let api: any;
    beforeAll(async () => {
        jest.setTimeout(90 * 1000)
        const papi = await init();
        api = papi.api;
    });

    afterAll(() => {
        //   return clearCityDatabase();
        saveNonce(users)
    });

    //   it('API fetches bundles and prefetches sell orders', async () => {
    //     const { bundles } = await apiToTest.getBundles({asset_contract_address: CK_RINKEBY_ADDRESS, on_sale: true})
    //     expect(bundles). toBeInstanceOf(Array)

    //     const bundle = bundles[0]
    //     expect(bundle).toBeNull()
    //     if (!bundle) {
    //       return
    //     }
    //     expect(bundle.assets.map(a => a.assetContract.name)). toContain( "CryptoKittiesRinkeby")
    //     assert.isNotEmpty(bundle.sellOrders)
    //   })

    //   it('Includes API key in token request', async () => {
    //     const oldLogger = rinkebyApi.logger

    //     const logPromise = new Promise((resolve, reject) => {
    //       rinkebyApi.logger = log => {
    //         try {
    //           expect(log). toContain( `"X-API-KEY":"${RINKEBY_API_KEY}"`)
    //           resolve()
    //         } catch (e) {
    //           reject(e)
    //         } finally {
    //           rinkebyApi.logger = oldLogger
    //         }
    //       }
    //       rinkebyApi.getPaymentTokens({ symbol: "WETH" })
    //     })

    //     await logPromise
    //   })

    it('An API asset\'s order has correct hash', async () => {
        console.log("==================")
        // const s:OrderId = new OrderId(1);//stringToU8a("null");
        // // (async function () { 
        // console.log("=============dddddd",s)

        console.log("==================")
        const asset = await client.api.getAsset({ tokenAddress: CK_ADDRESS, tokenId: 1 })
        expect(asset.orders).toBeNull()
        if (!asset.orders) {
            return
        }
        const order = asset.orders[0]
        expect(order).toBeNull()
        if (!order) {
            return
        }
        expect(order.hash).toEqual(getOrderHash(order))
    })

    it('orderToJSON is correct', async () => {
        const accountAddress = ALEX_ADDRESS
        const quantity = 1
        const amountInToken = 1.2
        const paymentTokenAddress = WETH_ADDRESS
        const extraBountyBasisPoints = 0
        const expirationTime = Math.round(Date.now() / 1000 + 60) // one minute from now
        const englishAuctionReservePrice = 2

        const tokenId = MYTHEREUM_TOKEN_ID.toString()
        const tokenAddress = MYTHEREUM_ADDRESS
        const order = await client._makeSellOrder({
            asset: { tokenAddress, tokenId },
            quantity,
            accountAddress,
            startAmount: amountInToken,
            paymentTokenAddress,
            extraBountyBasisPoints,
            buyerAddress: NULL_ADDRESS,
            expirationTime,
            waitForHighestBid: true,
            englishAuctionReservePrice,
        })

        const hashedOrder = {
            ...order,
            hash: getOrderHash(order)
        }

        const orderData = orderToJSON(hashedOrder)
        expect(orderData.quantity).toEqual(quantity.toString())
        expect(orderData.maker).toEqual(accountAddress)
        expect(orderData.taker).toEqual(NULL_ADDRESS)
        // expect(orderData.basePrice).toEqual( WyvernProtocol.toBaseUnitAmount(makeBigNumber(amountInToken), 18).toString())
        expect(orderData.paymentToken).toEqual(paymentTokenAddress)
        expect(orderData.extra).toEqual(extraBountyBasisPoints.toString())
        expect(orderData.expirationTime).toEqual(expirationTime + ORDER_MATCHING_LATENCY_SECONDS)
        // expect(orderData.englishAuctionReservePrice).toEqual( WyvernProtocol.toBaseUnitAmount(makeBigNumber(englishAuctionReservePrice), 18).toString())
    })


    //   it('API fetches orderbook', async () => {
    //     const {orders, count} = await apiToTest.getOrders()
    //     expect(orders). toBeInstanceOf(Array)
    //     expect(count). toBeInstanceOf(Number)
    //     expect(orders.length).toEqual( apiToTest.pageSize)
    //     // assert.isAtLeast(count, orders.length)
    //   })

    //   it('API can change page size', async () => {
    //     const defaultPageSize = apiToTest.pageSize
    //     apiToTest.pageSize = 7
    //     const {orders} = await apiToTest.getOrders()
    //     expect(orders.length).toEqual( 7)
    //     apiToTest.pageSize = defaultPageSize
    //   })

    //   if (ORDERBOOK_VERSION > 0) {
    //     it('API orderbook paginates', async () => {
    //       const {orders, count} = await apiToTest.getOrders()
    //       const pagination = await apiToTest.getOrders({}, 2)
    //       expect(pagination.orders.length).toEqual( apiToTest.pageSize)
    //       expect(pagination.orders[0]).not.toStrictEqual(orders[0])
    //       expect(pagination.count).toEqual( count)
    //     })
    //   }

    //   it('API fetches orders for asset contract and asset', async () => {
    //     const forKitties = await apiToTest.getOrders({asset_contract_address: CK_RINKEBY_ADDRESS})
    //     expect(forKitties.orders.length). toBeGreaterThan( 0)
    //     expect(forKitties.count). toBeGreaterThan( 0)

    //     const forKitty = await apiToTest.getOrders({asset_contract_address: CK_RINKEBY_ADDRESS, token_id: CK_RINKEBY_TOKEN_ID})
    //     expect(forKitty.orders). toBeInstanceOf(Array)
    //   })

    //   it('API fetches orders for asset owner', async () => {
    //     const forOwner = await apiToTest.getOrders({owner: ALEX_ADDRESS})
    //     expect(forOwner.orders.length). toBeGreaterThan( 0)
    //     expect(forOwner.count). toBeGreaterThan( 0)
    //     const owners = forOwner.orders.map((o:any) => o.asset && o.asset.owner && o.asset.owner.address)
    //     owners.forEach((owner:any) => {
    //       expect([ALEX_ADDRESS, NULL_ADDRESS]). toContain( owner)
    //     })
    //   })

    //   it('API fetches buy orders for maker', async () => {
    //     const forMaker = await apiToTest.getOrders({maker: ALEX_ADDRESS, side: OrderSide.Buy})
    //     expect(forMaker.orders.length). toBeGreaterThan( 0)
    //     expect(forMaker.count). toBeGreaterThan( 0)
    //     forMaker.orders.forEach((order:any) => {
    //       expect(ALEX_ADDRESS).toEqual( order.maker)
    //       expect(OrderSide.Buy).toEqual( order.side)
    //     })
    //   })

    it.only("API  fetch  orders", async () => {
        let s = await apiToTest.getOrder(englishSellOrderJSON)
        console.log(s)
    })

    it("API doesn't fetch impossible orders", async () => {
        try {
            expect(await apiToTest.getOrder({ maker: ALEX_ADDRESS, taker: ALEX_ADDRESS })).toThrow()
        } catch (e) {
            expect(e.message).toContain("Not found")
        }
    })

    //   it('API excludes cancelledOrFinalized and markedInvalid orders', async () => {
    //     const {orders} = await apiToTest.getOrders({limit: 100})
    //     const finishedOrders = orders.filter((o:any) => o.cancelledOrFinalized)
    //     expect(finishedOrders). toHaveLength(0)
    //     const invalidOrders = orders.filter((o:any) => o.markedInvalid)
    //     expect(invalidOrders). toHaveLength(0)
    //   })

    //   it('API fetches fees for an asset', async () => {
    //     const asset = await apiToTest.getAsset({ tokenAddress: CK_RINKEBY_ADDRESS, tokenId: CK_RINKEBY_TOKEN_ID })
    //     expect(asset.tokenId).toEqual( CK_RINKEBY_TOKEN_ID.toString())
    //     expect(asset.assetContract.name).toEqual( "CryptoKittiesRinkeby")
    //     expect(asset.assetContract.sellerFeeBasisPoints).toEqual( CK_RINKEBY_SELLER_FEE)
    //   })

    //   it('API fetches assets', async () => {
    //     const { assets } = await apiToTest.getAssets({asset_contract_address: CK_RINKEBY_ADDRESS, order_by: "current_price"})
    //     expect(assets). toBeInstanceOf(Array)
    //     expect(assets.length).toEqual( apiToTest.pageSize)

    //     const asset = assets[0]
    //     expect(asset.assetContract.name).toEqual( "CryptoKittiesRinkeby")
    //   })


    it('postAssetWhitelist API handles ', async () => {

        await apiToTest.postAssetWhitelist('hashedOrder', 'tokenIhhhhhhhhd', "test@test.mail", users.betty)

    })

    it('post order API handles ', async () => {
        const hashedOrder = englishSellOrderJSON;

        hashedOrder.maker = users.betty.key.address

        await apiToTest.postOrder(hashedOrder, users.betty)

    })
})
