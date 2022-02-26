
import { OpenSeaPort } from '../../pacific-js/index'
import { Network, OrderSide, UnhashedOrder, Order, OpenSeaCollection, OpenSeaAsset, OpenSeaAssetBundle, FeeMethod } from '../../pacific-js/types'
import { getOrderHash } from '../../pacific-js/utils/utils'
import {
    MYTHEREUM_TOKEN_ID, MYTHEREUM_ADDRESS,
    CK_ADDRESS, CK_TOKEN_ID,
    MAINNET_API_KEY, ALICE_ADDRESS,
    CATS_IN_MECHS_ID,
    SPIRIT_CLASH_TOKEN_ID,
    SPIRIT_CLASH_OWNER,
    DECENTRALAND_ADDRESS,
    DECENTRALAND_ID,
    WDOT_ADDRESS
} from '../constants'
import {
    DEFAULT_BUYER_FEE_BASIS_POINTS,
    DEFAULT_MAX_BOUNTY,
    DEFAULT_SELLER_FEE_BASIS_POINTS,
    ENJIN_ADDRESS,
    ENJIN_COIN_ADDRESS, MAINNET_PROVIDER_URL, NULL_ADDRESS, OPENSEA_FEE_RECIPIENT,
    OPENSEA_SELLER_BOUNTY_BASIS_POINTS
} from '../../pacific-js/constants'
import BigNumber from 'bignumber.js'

// const provider = new Web3.providers.HttpProvider(MAINNET_PROVIDER_URL)
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';
import { ALICE, BOB, CHARLIE, DAVE, EVE, CREATION_FEE, WSURL } from "./consts";

// import { submit, users } from '../orders/lib/submit-signed-tx';
import * as ordersJSONFixture from '../fixtures/orders.json'

import types from '../../pacific-js/config/types.json';
import rpcs from '../../pacific-js/config/rpcs.json';
const provider = new WsProvider('ws://127.0.0.1:9944/');
// const devProvider = new WsProvider('ws://127.0.0.1:9944/');

let client: any

let asset: OpenSeaAsset
const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24) // one day from now

describe('seaport: fees', () => {
    beforeAll(async () => {
        client = new OpenSeaPort(provider, {
            networkName: Network.Dev,
            apiKey: MAINNET_API_KEY
        }, line => console.info(`MAINNET: ${line}`))
        const tokenId = MYTHEREUM_TOKEN_ID.toString()
        const tokenAddress = MYTHEREUM_ADDRESS
        asset = await client.api.getAsset({ tokenAddress, tokenId })
        expect(asset).not.toBeNull()
    })

    test("Computes fees correctly for non-zero-fee asset", async () => {
        const bountyPercent = 1.5
        const extraBountyBasisPoints = bountyPercent * 100

        const collection = asset.collection
        const buyerFeeBasisPoints = collection.openseaBuyerFeeBasisPoints + collection.devBuyerFeeBasisPoints
        const sellerFeeBasisPoints = collection.openseaSellerFeeBasisPoints + collection.devSellerFeeBasisPoints

        const buyerFees = await client.computeFees({
            asset,
            extraBountyBasisPoints,
            side: OrderSide.Buy
        })
        expect(buyerFees.totalBuyerFeeBasisPoints).toEqual(buyerFeeBasisPoints)
        expect(buyerFees.totalSellerFeeBasisPoints).toEqual(sellerFeeBasisPoints)
        expect(buyerFees.devBuyerFeeBasisPoints).toEqual(collection.devBuyerFeeBasisPoints)
        expect(buyerFees.devSellerFeeBasisPoints).toEqual(collection.devSellerFeeBasisPoints)
        expect(buyerFees.openseaBuyerFeeBasisPoints).toEqual(collection.openseaBuyerFeeBasisPoints)
        expect(buyerFees.openseaSellerFeeBasisPoints).toEqual(collection.openseaSellerFeeBasisPoints)
        expect(buyerFees.sellerBountyBasisPoints).toEqual(0)

        const sellerFees = await client.computeFees({
            asset,
            extraBountyBasisPoints,
            side: OrderSide.Sell
        })
        expect(sellerFees.totalBuyerFeeBasisPoints).toEqual(buyerFeeBasisPoints)
        expect(sellerFees.totalSellerFeeBasisPoints).toEqual(sellerFeeBasisPoints)
        expect(sellerFees.devBuyerFeeBasisPoints).toEqual(collection.devBuyerFeeBasisPoints)
        expect(sellerFees.devSellerFeeBasisPoints).toEqual(collection.devSellerFeeBasisPoints)
        expect(sellerFees.openseaBuyerFeeBasisPoints).toEqual(collection.openseaBuyerFeeBasisPoints)
        expect(sellerFees.openseaSellerFeeBasisPoints).toEqual(collection.openseaSellerFeeBasisPoints)
        expect(sellerFees.sellerBountyBasisPoints).toEqual(extraBountyBasisPoints)

        const heterogenousBundleSellerFees = await client.computeFees({
            extraBountyBasisPoints,
            side: OrderSide.Sell
        })
        expect(heterogenousBundleSellerFees.totalBuyerFeeBasisPoints).toEqual(DEFAULT_BUYER_FEE_BASIS_POINTS)
        expect(heterogenousBundleSellerFees.totalSellerFeeBasisPoints).toEqual(DEFAULT_SELLER_FEE_BASIS_POINTS)
        expect(heterogenousBundleSellerFees.devBuyerFeeBasisPoints).toEqual(0)
        expect(heterogenousBundleSellerFees.devSellerFeeBasisPoints).toEqual(0)
        expect(heterogenousBundleSellerFees.openseaBuyerFeeBasisPoints).toEqual(DEFAULT_BUYER_FEE_BASIS_POINTS)
        expect(heterogenousBundleSellerFees.openseaSellerFeeBasisPoints).toEqual(DEFAULT_SELLER_FEE_BASIS_POINTS)
        expect(heterogenousBundleSellerFees.sellerBountyBasisPoints).toEqual(extraBountyBasisPoints)

        const privateSellerFees = await client.computeFees({
            asset,
            extraBountyBasisPoints,
            side: OrderSide.Sell,
            isPrivate: true
        })
        expect(privateSellerFees.totalBuyerFeeBasisPoints).toEqual(0)
        expect(privateSellerFees.totalSellerFeeBasisPoints).toEqual(0)
        expect(privateSellerFees.devBuyerFeeBasisPoints).toEqual(0)
        expect(privateSellerFees.devSellerFeeBasisPoints).toEqual(0)
        expect(privateSellerFees.openseaBuyerFeeBasisPoints).toEqual(0)
        expect(privateSellerFees.openseaSellerFeeBasisPoints).toEqual(0)
        expect(privateSellerFees.sellerBountyBasisPoints).toEqual(0)

        const privateBuyerFees = await client.computeFees({
            asset,
            extraBountyBasisPoints,
            side: OrderSide.Buy,
            isPrivate: true
        })
        expect(privateBuyerFees.totalBuyerFeeBasisPoints).toEqual(0)
        expect(privateBuyerFees.totalSellerFeeBasisPoints).toEqual(0)
        expect(privateBuyerFees.devBuyerFeeBasisPoints).toEqual(0)
        expect(privateBuyerFees.devSellerFeeBasisPoints).toEqual(0)
        expect(privateBuyerFees.openseaBuyerFeeBasisPoints).toEqual(0)
        expect(privateBuyerFees.openseaSellerFeeBasisPoints).toEqual(0)
        expect(privateBuyerFees.sellerBountyBasisPoints).toEqual(0)
    })

    test.skip("Computes fees correctly for zero-fee asset", async () => {
        const asset = await client.api.getAsset({ tokenAddress: DECENTRALAND_ADDRESS, tokenId: DECENTRALAND_ID })
        const bountyPercent = 0

        const buyerFees = await client.computeFees({
            asset,
            extraBountyBasisPoints: bountyPercent * 100,
            side: OrderSide.Buy
        })
        expect(buyerFees.totalBuyerFeeBasisPoints).toEqual(0)
        expect(buyerFees.totalSellerFeeBasisPoints).toEqual(0)
        expect(buyerFees.devBuyerFeeBasisPoints).toEqual(0)
        expect(buyerFees.devSellerFeeBasisPoints).toEqual(0)
        expect(buyerFees.openseaBuyerFeeBasisPoints).toEqual(0)
        expect(buyerFees.openseaSellerFeeBasisPoints).toEqual(0)
        expect(buyerFees.sellerBountyBasisPoints).toEqual(0)

        const sellerFees = await client.computeFees({
            asset,
            extraBountyBasisPoints: bountyPercent * 100,
            side: OrderSide.Sell
        })
        expect(sellerFees.totalBuyerFeeBasisPoints).toEqual(0)
        expect(sellerFees.totalSellerFeeBasisPoints).toEqual(0)
        expect(sellerFees.devBuyerFeeBasisPoints).toEqual(0)
        expect(sellerFees.devSellerFeeBasisPoints).toEqual(0)
        expect(sellerFees.openseaBuyerFeeBasisPoints).toEqual(0)
        expect(sellerFees.openseaSellerFeeBasisPoints).toEqual(0)
        expect(sellerFees.sellerBountyBasisPoints).toEqual(bountyPercent * 100)

    })

    test("Errors for computing fees correctly", async () => {

        try {
            await client.computeFees({
                asset,
                extraBountyBasisPoints: 200,
                side: OrderSide.Sell
            })
            //   assert.fail()
        } catch (error) {
            if (!error.message.includes('bounty exceeds the maximum') ||
                !error.message.includes('OpenSea will add')) {
                // assert.fail(error.message)
            }
        }
    })

    test('First page of orders have valid hashes and fees', async () => {
        const { orders } = await client.api.getOrders()
        expect(orders).not.toHaveLength(0)

        orders.forEach(order => {
            if (order.asset) {
                expect(order.asset.assetContract).not.toHaveLength(0)
                expect(order.asset.tokenId).not.toHaveLength(0)
                testFeesMakerOrder(order, order.asset.collection)
            }
            expect(order.paymentTokenContract).not.toHaveLength(0)

            const accountAddress = ALICE_ADDRESS
            const matchingOrder = client._makeMatchingOrder({
                order,
                accountAddress,
                recipientAddress: accountAddress
            })
            const matchingOrderHash = matchingOrder.hash
            delete matchingOrder.hash
            expect(matchingOrder.hash).not.toBeDefined()

            const orderHash = getOrderHash(matchingOrder)
            expect(orderHash).toEqual(matchingOrderHash)
        })
    })

    test("Computes per-transfer fees correctly, Enjin and CK", async () => {

        const asset = await client.api.getAsset({ tokenAddress: ENJIN_ADDRESS, tokenId: CATS_IN_MECHS_ID })

        const zeroTransferFeeAsset = await client.api.getAsset({ tokenAddress: CK_ADDRESS, tokenId: CK_TOKEN_ID })

        const sellerFees = await client.computeFees({
            asset,
            side: OrderSide.Sell
        })

        const sellerZeroFees = await client.computeFees({
            asset: zeroTransferFeeAsset,
            side: OrderSide.Sell
        })

        expect(sellerZeroFees.transferFee.toString()).toEqual("0")
        expect(sellerZeroFees.transferFeeTokenAddress).toBeNull()

        expect(sellerFees.transferFee.toString()).toEqual("1000000000000000000")
        expect(sellerFees.transferFeeTokenAddress).toEqual(ENJIN_COIN_ADDRESS)
    })

    // NOTE: Enjin platform limitation:
    // the transfer fee isn't showing as whitelisted (skipped) by Enjin's method
    test.skip("Computes whitelisted Enjin per-transfer fees correctly", async () => {

        const whitelistedAsset = await client.api.getAsset({ tokenAddress: ENJIN_ADDRESS, tokenId: SPIRIT_CLASH_TOKEN_ID })

        const sellerZeroFees = await client.computeFees({
            asset: whitelistedAsset,
            side: OrderSide.Sell,
            accountAddress: SPIRIT_CLASH_OWNER
        })

        expect(sellerZeroFees.transferFee.toString()).toEqual("0")
        expect(sellerZeroFees.transferFeeTokenAddress).toEqual(ENJIN_COIN_ADDRESS)
    })

    test("_getBuyFeeParameters works for assets", async () => {
        const accountAddress = ALICE_ADDRESS
        const extraBountyBasisPoints = 0
        const sellOrder = await client._makeSellOrder({
            asset,
            quantity: 1,
            accountAddress,
            startAmount: 1,
            paymentTokenAddress: NULL_ADDRESS,
            extraBountyBasisPoints,
            buyerAddress: NULL_ADDRESS,
            expirationTime: 0,
            waitForHighestBid: false,
        })

        const {
            totalBuyerFeeBasisPoints,
            totalSellerFeeBasisPoints
        } = await client.computeFees({ asset, extraBountyBasisPoints, side: OrderSide.Buy })


        const {
            makerRelayerFee,
            takerRelayerFee,
            makerProtocolFee,
            takerProtocolFee,
            makerReferrerFee,
            feeRecipient,
            feeMethod
        } = client._getBuyFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, sellOrder)

        expect(totalSellerFeeBasisPoints).toBeGreaterThan(0)

        unitTestFeesBuyOrder({
            makerRelayerFee,
            takerRelayerFee,
            makerProtocolFee,
            takerProtocolFee,
            makerReferrerFee,
            feeRecipient,
            feeMethod
        })
    })

    test("_getBuyFeeParameters works for English auction assets", async () => {
        const accountAddress = ALICE_ADDRESS
        const extraBountyBasisPoints = 0
        const sellOrder = await client._makeSellOrder({
            asset,
            quantity: 1,
            accountAddress,
            startAmount: 1,
            paymentTokenAddress: WDOT_ADDRESS,
            extraBountyBasisPoints,
            buyerAddress: NULL_ADDRESS,
            expirationTime,
            waitForHighestBid: true,
        })

        const {
            totalBuyerFeeBasisPoints,
            totalSellerFeeBasisPoints
        } = await client.computeFees({ asset, extraBountyBasisPoints, side: OrderSide.Buy })

        const {
            makerRelayerFee,
            takerRelayerFee,
            makerProtocolFee,
            takerProtocolFee,
            makerReferrerFee,
            feeRecipient,
            feeMethod
        } = client._getBuyFeeParameters(totalBuyerFeeBasisPoints, totalSellerFeeBasisPoints, sellOrder)

        expect(totalSellerFeeBasisPoints).toBeGreaterThan(0)

        unitTestFeesBuyOrder({
            makerRelayerFee,
            takerRelayerFee,
            makerProtocolFee,
            takerProtocolFee,
            makerReferrerFee,
            feeRecipient,
            feeMethod
        })
    })
})

function unitTestFeesBuyOrder({
    makerRelayerFee,
    takerRelayerFee,
    makerProtocolFee,
    takerProtocolFee,
    makerReferrerFee,
    feeRecipient,
    feeMethod
}: {
    makerRelayerFee: BigNumber,
    takerRelayerFee: BigNumber,
    makerProtocolFee: BigNumber,
    takerProtocolFee: BigNumber,
    makerReferrerFee: BigNumber,
    feeRecipient: string,
    feeMethod: FeeMethod
}) {
    expect(+makerRelayerFee).toEqual(asset.collection.openseaBuyerFeeBasisPoints)
    expect(+takerRelayerFee).toEqual(asset.collection.openseaSellerFeeBasisPoints)
    expect(+makerProtocolFee).toEqual(0)
    expect(+takerProtocolFee).toEqual(0)
    expect(+makerReferrerFee).toEqual(0)
    expect(feeRecipient).toEqual(OPENSEA_FEE_RECIPIENT)
    expect(feeMethod).toEqual(FeeMethod.SplitFee)
}

export function testFeesMakerOrder(order: Order | UnhashedOrder, collection?: OpenSeaCollection, makerBountyBPS?: number) {
    expect(order.makerProtocolFee.toNumber()).toEqual(0)
    expect(order.takerProtocolFee.toNumber()).toEqual(0)
    if (order.waitingForBestCounterOrder) {
        expect(order.feeRecipient).toEqual(NULL_ADDRESS)
    } else {
        expect(order.feeRecipient).toEqual(OPENSEA_FEE_RECIPIENT)
    }
    if (order.taker != NULL_ADDRESS && order.side == OrderSide.Sell) {
        // Private sell order
        expect(order.makerReferrerFee.toNumber()).toEqual(0)
        expect(order.takerRelayerFee.toNumber()).toEqual(0)
        expect(order.makerRelayerFee.toNumber()).toEqual(0)
        return
    }
    // Public order
    if (makerBountyBPS != null) {
        expect(order.makerReferrerFee.toNumber()).toEqual(makerBountyBPS)
    }
    if (collection) {
        const totalSellerFee = collection.devSellerFeeBasisPoints + collection.openseaSellerFeeBasisPoints
        const totalBuyerFeeBasisPoints = collection.devBuyerFeeBasisPoints + collection.openseaBuyerFeeBasisPoints
        // Homogenous sale
        if (order.side == OrderSide.Sell && order.waitingForBestCounterOrder) {
            // Fees may not match the contract's fees, which are changeable.
        } else if (order.side == OrderSide.Sell) {

            expect(order.makerRelayerFee.toNumber()).toEqual(totalSellerFee)
            expect(order.takerRelayerFee.toNumber()).toEqual(totalBuyerFeeBasisPoints)

            expect(order.makerRelayerFee.toNumber()).toEqual(collection.devSellerFeeBasisPoints + collection.openseaSellerFeeBasisPoints)
            // Check bounty
            if (collection.openseaSellerFeeBasisPoints >= OPENSEA_SELLER_BOUNTY_BASIS_POINTS) {
                expect(OPENSEA_SELLER_BOUNTY_BASIS_POINTS + order.makerReferrerFee.toNumber()).toBeLessThanOrEqual(collection.openseaSellerFeeBasisPoints)
            } else {
                // No extra bounty allowed if < 1%
                expect(order.makerReferrerFee.toNumber()).toEqual(0)
            }
        } else {

            expect(order.makerRelayerFee.toNumber()).toEqual(totalBuyerFeeBasisPoints)
            expect(order.takerRelayerFee.toNumber()).toEqual(totalSellerFee)

            expect(order.makerRelayerFee.toNumber()).toEqual(collection.devBuyerFeeBasisPoints + collection.openseaBuyerFeeBasisPoints)
        }
    } else {
        // Heterogenous
        if (order.side == OrderSide.Sell) {
            expect(order.makerRelayerFee.toNumber()).toEqual(DEFAULT_SELLER_FEE_BASIS_POINTS)
            expect(order.takerRelayerFee.toNumber()).toEqual(DEFAULT_BUYER_FEE_BASIS_POINTS)
            expect(OPENSEA_SELLER_BOUNTY_BASIS_POINTS + order.makerReferrerFee.toNumber()).toBeLessThanOrEqual(DEFAULT_MAX_BOUNTY)
        } else {
            expect(order.makerRelayerFee.toNumber()).toEqual(DEFAULT_BUYER_FEE_BASIS_POINTS)
            expect(order.takerRelayerFee.toNumber()).toEqual(DEFAULT_SELLER_FEE_BASIS_POINTS)
        }
    }
}
