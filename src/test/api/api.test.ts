

import { OpenSeaAPI } from '../../pacific-js/index'
// import { WyvernProtocol } from '../../lib/wyvern-js'
import { Network, Order, OrderSide, OrderJSON } from '../../pacific-js/types'
import { orderToJSON, orderFromJSON } from '../../pacific-js'
import { ALICE_ADDRESS, ALICE_STASH_ADDRESS, CK_DEV_TOKEN_ID, CK_DEV_ADDRESS, CK_DEV_SELLER_FEE, DEV_API_KEY, CK_ADDRESS, WDOT_ADDRESS, MYTHEREUM_TOKEN_ID, MYTHEREUM_ADDRESS, MAINNET_API_KEY } from '../constants'
import { getOrderHash, makeBigNumber } from '../../pacific-js/utils/utils'
import { ORDERBOOK_VERSION, NULL_ADDRESS, LOCALNET_PROVIDER_URL, ORDER_MATCHING_LATENCY_SECONDS } from '../../pacific-js/constants'

// import type { OrderId } from 'pacific-js/interfaces';

// import '../interfaces/augment-api';
// import '../interfaces/augment-types';
import { WsProvider } from '@polkadot/api';
import { stringToU8a } from '@polkadot/util';

jest.useFakeTimers()
// import types from '../../pacific-js/config/types.json';
// import rpcs from '../../pacific-js/config/rpcs.json';
// const rpc = { ...rpcs };
// import { makeOrderArrayEx, makeOrderEx, makeOrder, orderFromJSON } from '../orders/order'
import * as ordersJSONFixture from '../fixtures/orders.json'

const ordersJSON = ordersJSONFixture as any
const englishSellOrderJSON = ordersJSON[0] as OrderJSON

// const provider = new Web3.providers.HttpProvider(MAINNET_PROVIDER_URL)
// const provider = new WsProvider("ws://127.0.0.1:9944");//LOCALNET_PROVIDER_URL);

let client: any;
import { ApiPromise } from '@polkadot/api';
let users: any;
let api: any;
let accounts: any;

const salary = 100_000_000_000_000;
let originalLog: any;
let originalWarn: any;
let originalError: any;
let consolelog: any;
// import {init} from "../seaport/utils"
describe('api tests', (): void => {

    const second = 1000;
    const block = 6.5 * second;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
    beforeAll(async () => {
        originalLog = global.console.log;
        originalWarn = global.console.warn;
        originalError = global.console.error;

        global.console.log = jest.fn();
        global.console.warn = jest.fn();
        global.console.error = jest.fn();
        consolelog = jest.fn();

        jest.spyOn(console, 'log').mockImplementation(() => { });
        jest.setTimeout(90 * 1000000)
        // const a = await init(provider);
        // client = new OpenSeaPort(provider, {
        //     networkName: Network.Main,
        //     apiKey: MAINNET_API_KEY
        // }, line => consolelog(`MAINNET: ${line}`))
        client = new OpenSeaAPI({
            networkName: Network.Main,
            apiKey: MAINNET_API_KEY
        }, line => consolelog(`MAINNET: ${line}`));

        // const papi = await init();
        // api = papi.api;
    });

    afterAll(() => {
        global.console.log = originalLog;
        global.console.warn = originalWarn;
        global.console.error = originalError;
        //   return clearCityDatabase();
        // saveNonce(users)
    });

    it('API fetches bundles and prefetches sell orders', async () => {
        const { bundles } = await client.getBundles({ asset_contract_address: CK_DEV_ADDRESS, on_sale: true })
        expect(bundles).toBeInstanceOf(Array)

        const bundle = bundles[0]
        expect(bundle).not.toBeNull()
        if (!bundle) {
            return
        }
        expect(bundle.assets.map((a: any) => a.assetContract.name)).toContain("CryptoKittiesDev")
        expect(bundle.sellOrders).not.toBeNull()
    })

    it('Includes API key in token request', async () => {
        const oldLogger = client.logger

        const logPromise = new Promise((resolve, reject) => {
            client.logger = (log: any) => {
                try {
                    expect(log).toContain(`"X-API-KEY":"${DEV_API_KEY}"`)
                    resolve(0)
                } catch (e) {
                    reject(e)
                } finally {
                    client.logger = oldLogger
                }
            }
            client.getPaymentTokens({ symbol: "WETH" })
        })

        await logPromise
    })

    it('An API asset\'s order has correct hash', async () => {
        console.log("==================")
        // const s:OrderId = new OrderId(1);//stringToU8a("null");
        // // (async function () { 
        // console.log("=============dddddd",s)

        console.log("==================")
        const asset = await  client.getAsset({ tokenAddress: CK_ADDRESS, tokenId: 1 })
        expect(asset.orders).not.toBeNull()
        if (!asset.orders) {
            return
        }
        const order = asset.orders[0]
        expect(order).not.toBeNull()
        if (!order) {
            return
        }
        expect(order.hash).toEqual(getOrderHash(order))
    })

    it('orderToJSON is correct', async () => {
        const accountAddress = ALICE_ADDRESS
        const quantity = 1
        const amountInToken = 1.2
        const paymentTokenAddress = WDOT_ADDRESS
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

    test('API fetches tokens', async () => {
        const { tokens } = await client.getPaymentTokens({ symbol: "MANA" })
        expect(Array.isArray(tokens)).toBe(true)
        expect(tokens.length).toEqual(1)
        expect(tokens[0].name).toEqual("Decentraland MANA")
    })

    test('Dev API orders have correct OpenSea url', async () => {
        const order = await client.getOrder({})
        if (!order.asset) {
            return
        }
        const url = `https://dev.opensea.io/assets/${order.asset.assetContract.address}/${order.asset.tokenId}`
        expect(order.asset.openseaLink).toEqual(url)
    })

    test('Mainnet API orders have correct OpenSea url', async () => {
        const order = await client.getOrder({})
        if (!order.asset) {
            return
        }
        const url = `https://opensea.io/assets/${order.asset.assetContract.address}/${order.asset.tokenId}`
        expect(order.asset.openseaLink).toEqual(url)
    })
    it('API fetches orderbook', async () => {
        const { orders, count } = await client.getOrders()
        expect(orders).toBeInstanceOf(Array)
        expect(count).toBeInstanceOf(Number)
        expect(orders.length).toEqual(client.pageSize)
        // expect(orders.length).toBeGreaterThanOrEqual(count)
    })

    it('API can change page size', async () => {
        const defaultPageSize = client.pageSize
        client.pageSize = 7
        const { orders } = await client.getOrders()
        expect(orders.length).toEqual(7)
        client.pageSize = defaultPageSize
    })

    if (ORDERBOOK_VERSION > 0) {
        it('API orderbook paginates', async () => {
            const { orders, count } = await client.getOrders()
            const pagination = await client.getOrders({}, 2)
            expect(pagination.orders.length).toEqual(client.pageSize)
            expect(pagination.orders[0]).not.toStrictEqual(orders[0])
            expect(pagination.count).toEqual(count)
        })
    }

    it('API fetches orders for asset contract and asset', async () => {
        const forKitties = await client.getOrders({ asset_contract_address: CK_DEV_ADDRESS })
        expect(forKitties.orders.length).toBeGreaterThan(0)
        expect(forKitties.count).toBeGreaterThan(0)

        const forKitty = await client.getOrders({ asset_contract_address: CK_DEV_ADDRESS, token_id: CK_DEV_TOKEN_ID })
        expect(forKitty.orders).toBeInstanceOf(Array)
    })

    it('API fetches orders for asset owner', async () => {
        const forOwner = await client.getOrders({ owner: ALICE_ADDRESS })
        expect(forOwner.orders.length).toBeGreaterThan(0)
        expect(forOwner.count).toBeGreaterThan(0)
        const owners = forOwner.orders.map((o: any) => o.asset && o.asset.owner && o.asset.owner.address)
        owners.forEach((owner: any) => {
            expect([ALICE_ADDRESS, NULL_ADDRESS]).toContain(owner)
        })
    })

    it('API fetches buy orders for maker', async () => {
        const forMaker = await client.getOrders({ maker: ALICE_ADDRESS, side: OrderSide.Buy })
        expect(forMaker.orders.length).toBeGreaterThan(0)
        expect(forMaker.count).toBeGreaterThan(0)
        forMaker.orders.forEach((order: any) => {
            expect(ALICE_ADDRESS).toEqual(order.maker)
            expect(OrderSide.Buy).toEqual(order.side)
        })
    })
    ///NEEDED TEST 
    it("API  fetch  orders", async () => {
        let s = await client.getOrder(englishSellOrderJSON)
        expect(global.console.log).toHaveBeenCalledWith('log');
        console.log(s)
    })

    it.only("API  post  orders", async () => {
        consolelog("=========sssss======")
        let s = await  client.postOrder(englishSellOrderJSON)
        console.log(s)

        expect(consolelog).toHaveBeenCalledWith('log');

    })

    it("API  post  postAssetWhitelist", async () => {
        let s = await client.postAssetWhitelist("tokenAddress: string",
            "tokenId: string | number",
            "email: string")
        console.log(s)
    })

    it("API doesn't fetch impossible orders", async () => {
        try {
            expect(await client.getOrder({ maker: ALICE_ADDRESS, taker: ALICE_ADDRESS })).toThrow()
        } catch (e) {
            expect(e).toContain("Not found")
        }
    })

    it('API excludes cancelledOrFinalized and markedInvalid orders', async () => {
        const { orders } = await client.getOrders({ limit: 100 })
        const finishedOrders = orders.filter((o: any) => o.cancelledOrFinalized)
        expect(finishedOrders).toHaveLength(0)
        const invalidOrders = orders.filter((o: any) => o.markedInvalid)
        expect(invalidOrders).toHaveLength(0)
    })
    ///NEEDED TEST 
    it('API fetches fees for an asset', async () => {
        const asset = await client.getAsset({ tokenAddress: CK_DEV_ADDRESS, tokenId: CK_DEV_TOKEN_ID })
        expect(asset.tokenId).toEqual(CK_DEV_TOKEN_ID.toString())
        expect(asset.assetContract.name).toEqual("CryptoKittiesDev")
        expect(asset.assetContract.sellerFeeBasisPoints).toEqual(CK_DEV_SELLER_FEE)
    })

    it('API fetches assets', async () => {
        const { assets } = await client.getAssets({ asset_contract_address: CK_DEV_ADDRESS, order_by: "current_price" })
        expect(assets).toBeInstanceOf(Array)
        expect(assets.length).toEqual(client.pageSize)

        const asset = assets[0]
        expect(asset.assetContract.name).toEqual("CryptoKittiesDev")
    })

    it('API handles errors', async () => {
        // 401 Unauthorized
        try {
            await client.get('/user')
        } catch (error) {
            expect(error).toMatch("Unauthorized")
        }

        // 404 Not found
        try {
            await client.get(`/asset/${CK_DEV_ADDRESS}/0`)
        } catch (error) {
            expect(error).toMatch("Not found")
        }

        // 400 malformed
        const res = await client.getOrders({
            // Get an old order to make sure listing time is too early
            listed_before: Math.round(Date.now() / 1000 - 3600)
        })
        const order = res.orders[0]
        expect(order).not.toBeNull()

        try {
            const newOrder = {
                ...orderToJSON(order),
                v: 1,
                r: "",
                s: ""
            }
            await client.postOrder(newOrder)
        } catch (error) {
            // TODO sometimes the error is "Expected the listing time to be at or past the current time"
            // expect(error.message).stringContaining("Order failed exchange validation")
        }
    })
})
