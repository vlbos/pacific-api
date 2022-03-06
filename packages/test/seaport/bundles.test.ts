
import { OpenSeaPort } from '../../pacific-js/index'
import { Network, WyvernSchemaName, UnhashedOrder } from '../../pacific-js/types'
import { ALICE_ADDRESS, DIGITAL_ART_CHAIN_ADDRESS, DIGITAL_ART_CHAIN_TOKEN_ID, MYTHEREUM_TOKEN_ID, MYTHEREUM_ADDRESS, MAINNET_API_KEY, DISSOLUTION_TOKEN_ID, GODS_UNCHAINED_CHEST_ADDRESS, CRYPTOVOXELS_WEARABLE_ID, CRYPTOVOXELS_WEARABLE_ADDRESS, AGE_OF_RUST_TOKEN_ID, ALICE_STASH_ADDRESS, BENZENE_ADDRESS, CRYPTOVOXELS_WEARABLE_2_ID, WDOT_ADDRESS } from '../constants'
import { testFeesMakerOrder } from './fees.test'
import { testMatchingNewOrder } from './orders.test'
import {
    MAINNET_PROVIDER_URL,
    NULL_ADDRESS,
    ENJIN_ADDRESS,
} from '../../pacific-js/constants'

// const provider = new Web3.providers.HttpProvider(MAINNET_PROVIDER_URL)
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';
import { ALICE, BOB, CHARLIE, DAVE, EVE, CREATION_FEE, WSURL } from "./consts";

// import { submit, users } from '../orders/lib/submit-signed-tx';
import * as ordersJSONFixture from '../fixtures/orders.json'

import types from '../../pacific-js/config/types.json';
import rpcs from '../../pacific-js/config/rpcs.json';
import { createApiAndTestAccounts, saveNonce, sleepMs, init, getOrderP } from '../../api/test/helpers/apiHelper'

const provider = new WsProvider('ws://127.0.0.1:9944/');
const devProvider = new WsProvider('ws://127.0.0.1:9944/');
let client: any;
let devClient: any;
const assetsForBundleOrder = [
    { tokenId: MYTHEREUM_TOKEN_ID.toString(), tokenAddress: MYTHEREUM_ADDRESS, quantity: 1 },
    { tokenId: DIGITAL_ART_CHAIN_TOKEN_ID.toString(), tokenAddress: DIGITAL_ART_CHAIN_ADDRESS, quantity: 1 },
]

const fungibleAssetsForBundleOrder = [
    { tokenAddress: BENZENE_ADDRESS, tokenId: null, schemaName: WyvernSchemaName.ERC20, quantity: 20 },
    { tokenAddress: GODS_UNCHAINED_CHEST_ADDRESS, tokenId: null, schemaName: WyvernSchemaName.ERC20, quantity: 1 },
]

const heterogenousSemiFungibleAssetsForBundleOrder = [
    { tokenId: DISSOLUTION_TOKEN_ID, tokenAddress: ENJIN_ADDRESS, schemaName: WyvernSchemaName.ERC1155, quantity: 2 },
    { tokenId: AGE_OF_RUST_TOKEN_ID, tokenAddress: ENJIN_ADDRESS, schemaName: WyvernSchemaName.ERC1155, quantity: 1 },
    { tokenId: CRYPTOVOXELS_WEARABLE_ID, tokenAddress: CRYPTOVOXELS_WEARABLE_ADDRESS, schemaName: WyvernSchemaName.ERC1155, quantity: 1 },
]

const homogenousSemiFungibleAssetsForBundleOrder = [
    { tokenId: CRYPTOVOXELS_WEARABLE_ID, tokenAddress: CRYPTOVOXELS_WEARABLE_ADDRESS, schemaName: WyvernSchemaName.ERC1155, quantity: 1 },
    { tokenId: CRYPTOVOXELS_WEARABLE_2_ID, tokenAddress: CRYPTOVOXELS_WEARABLE_ADDRESS, schemaName: WyvernSchemaName.ERC1155, quantity: 2 },
]

let manaAddress: string

describe('seaport: bundles', () => {

    beforeAll(async () => {
        let apip = await init(provider);
        let api = apip.api;
        // console.log("============================",api)
        client = new OpenSeaPort(provider, api, {
            networkName: Network.Dev,
            apiKey: MAINNET_API_KEY
        }, line => console.info(`MAINNET: ${line}`))

        devClient = new OpenSeaPort(devProvider, api, {
            networkName: Network.Dev,
            apiKey: MAINNET_API_KEY
        }, line => console.info(`DEV: ${line}`))
        manaAddress = (await client.api.getPaymentTokens({ symbol: 'MANA' })).tokens[0].address

    })

    test('Matches heterogenous bundle buy order', async () => {
        const accountAddress = ALICE_ADDRESS
        const takerAddress = ALICE_ADDRESS
        const amountInEth = 0.01

        const order = await client._makeBundleBuyOrder({
            assets: assetsForBundleOrder,
            quantities: [1, 1],
            accountAddress,
            startAmount: amountInEth,
            extraBountyBasisPoints: 0,
            expirationTime: 0,
            paymentTokenAddress: WDOT_ADDRESS
        })

        expect(order.paymentToken).toEqual(WDOT_ADDRESS)
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth)
        expect(order.extra.toNumber()).toEqual(0)
        expect(order.expirationTime.toNumber()).toEqual(0)
        testBundleMetadata(order, WyvernSchemaName.ERC721)
        testFeesMakerOrder(order, undefined)

        await client._buyOrderValidationAndApprovals({ order, accountAddress })
        // Make sure match is valid
        await testMatchingNewOrder(order, takerAddress)
    })

    ///TEST NEEDED
    test('Matches homogenous bundle buy order', async () => {
        const accountAddress = ALICE_ADDRESS
        const takerAddress = ALICE_ADDRESS
        const amountInToken = 10
        const assets = [{ tokenId: MYTHEREUM_TOKEN_ID.toString(), tokenAddress: MYTHEREUM_ADDRESS }]

        const order = await client._makeBundleBuyOrder({
            assets,
            quantities: [1],
            accountAddress,
            startAmount: amountInToken,
            extraBountyBasisPoints: 0,
            expirationTime: 0,
            paymentTokenAddress: manaAddress
        })
        console.log(order)
        const asset = await client.api.getAsset(assets[0])

        expect(order.paymentToken).toEqual(manaAddress)
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 9) * amountInToken)
        expect(order.extra.toNumber()).toEqual(0)
        expect(order.expirationTime.toNumber()).toEqual(0)
        testBundleMetadata(order, WyvernSchemaName.ERC721)
        testFeesMakerOrder(order, asset.collection)

        await client._buyOrderValidationAndApprovals({ order, accountAddress })
        // Make sure match is valid
        await testMatchingNewOrder(order, takerAddress)
    })

    test('Matches fixed heterogenous bountied bundle sell order', async () => {
        const accountAddress = ALICE_ADDRESS
        const takerAddress = ALICE_ADDRESS
        const amountInEth = 1
        const bountyPercent = 1.5

        const order = await client._makeBundleSellOrder({
            bundleName: "Test Bundle",
            bundleDescription: "This is a test with different types of assets",
            assets: assetsForBundleOrder,
            quantities: [1, 1],
            accountAddress,
            startAmount: amountInEth,
            extraBountyBasisPoints: bountyPercent * 100,
            expirationTime: 0,
            paymentTokenAddress: NULL_ADDRESS,
            waitForHighestBid: false,
            buyerAddress: NULL_ADDRESS
        })

        expect(order.paymentToken).toEqual(NULL_ADDRESS)
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth)
        expect(order.extra.toNumber()).toEqual(0)
        expect(order.expirationTime.toNumber()).toEqual(0)
        testBundleMetadata(order, WyvernSchemaName.ERC721)
        testFeesMakerOrder(order, undefined, bountyPercent * 100)

        await client._sellOrderValidationAndApprovals({ order, accountAddress })
        // Make sure match is valid
        await testMatchingNewOrder(order, takerAddress)
    })

    ///TEST NEEDED
    test('Matches homogenous, bountied bundle sell order', async () => {
        const accountAddress = ALICE_ADDRESS
        const takerAddress = ALICE_ADDRESS
        const amountInEth = 1
        const bountyPercent = 0.8

        const assets = [{ tokenId: MYTHEREUM_TOKEN_ID.toString(), tokenAddress: MYTHEREUM_ADDRESS }]

        const order = await client._makeBundleSellOrder({
            bundleName: "Test Homogenous Bundle",
            bundleDescription: "This is a test with one type of asset",
            assets,
            quantities: [1],
            accountAddress,
            startAmount: amountInEth,
            extraBountyBasisPoints: bountyPercent * 100,
            expirationTime: 0,
            paymentTokenAddress: NULL_ADDRESS,
            waitForHighestBid: false,
            buyerAddress: NULL_ADDRESS
        })
        console.log(order)
        const asset = await client.api.getAsset(assets[0])

        expect(order.paymentToken).toEqual(NULL_ADDRESS)
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 9) * amountInEth)
        expect(order.extra.toNumber()).toEqual(0)
        expect(order.expirationTime.toNumber()).toEqual(0)
        testBundleMetadata(order, WyvernSchemaName.ERC721)
        testFeesMakerOrder(order, asset.collection, bountyPercent * 100)

        await client._sellOrderValidationAndApprovals({ order, accountAddress })
        // Make sure match is valid
        await testMatchingNewOrder(order, takerAddress)
    })

    test('Matches a new bundle sell order for an ERC-20 token (MANA)', async () => {
        const accountAddress = ALICE_ADDRESS
        const takerAddress = ALICE_ADDRESS
        const token = (await client.api.getPaymentTokens({ symbol: 'MANA' })).tokens[0]
        const amountInToken = 2.422

        const order = await client._makeBundleSellOrder({
            bundleName: "Test Bundle",
            bundleDescription: "This is a test with different types of assets",
            assets: assetsForBundleOrder,
            quantities: [1, 1],
            accountAddress,
            startAmount: amountInToken,
            paymentTokenAddress: token.address,
            extraBountyBasisPoints: 0,
            expirationTime: 0,
            waitForHighestBid: false,
            buyerAddress: NULL_ADDRESS
        })

        expect(order.paymentToken).toEqual(token.address)
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, token.decimals) * amountInToken)
        expect(order.extra.toNumber()).toEqual(0)
        testBundleMetadata(order, WyvernSchemaName.ERC721)
        expect(order.expirationTime.toNumber()).toEqual(0)

        await client._sellOrderValidationAndApprovals({ order, accountAddress })
        // Make sure match is valid
        await testMatchingNewOrder(order, takerAddress)
    })

    test('Matches Dutch bundle order for different approve-all assets', async () => {
        const accountAddress = ALICE_ADDRESS
        const takerAddress = ALICE_ADDRESS
        const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24) // one day from now
        const amountInEth = 1

        const order = await client._makeBundleSellOrder({
            bundleName: "Test Bundle",
            bundleDescription: "This is a test with different types of assets",
            assets: assetsForBundleOrder,
            quantities: [1, 1],
            accountAddress,
            startAmount: amountInEth,
            endAmount: 0,
            expirationTime,
            extraBountyBasisPoints: 0,
            waitForHighestBid: false,
            buyerAddress: NULL_ADDRESS,
            paymentTokenAddress: NULL_ADDRESS
        })

        expect(order.paymentToken).toEqual(NULL_ADDRESS)
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth)
        expect(order.extra.toNumber()).toEqual(Math.pow(10, 18) * amountInEth)
        expect(order.expirationTime.toNumber()).toEqual(expirationTime)
        testBundleMetadata(order, WyvernSchemaName.ERC721)

        await client._sellOrderValidationAndApprovals({ order, accountAddress })
        // Make sure match is valid
        await testMatchingNewOrder(order, takerAddress)
    })

    test('Can bundle multiple fungible tokens together', async () => {
        const accountAddress = ALICE_ADDRESS
        const takerAddress = ALICE_ADDRESS
        const amountInEth = 1

        const order = await client._makeBundleSellOrder({
            bundleName: "Test Bundle",
            bundleDescription: "This is a test with fungible assets",
            assets: fungibleAssetsForBundleOrder,
            quantities: fungibleAssetsForBundleOrder.map(a => a.quantity),
            accountAddress,
            startAmount: amountInEth,
            expirationTime: 0,
            extraBountyBasisPoints: 0,
            waitForHighestBid: false,
            buyerAddress: NULL_ADDRESS,
            paymentTokenAddress: NULL_ADDRESS
        })

        expect(order.paymentToken).toEqual(NULL_ADDRESS)
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth)
        testBundleMetadata(order, WyvernSchemaName.ERC20)
        testFeesMakerOrder(order, undefined)

        await client._sellOrderValidationAndApprovals({ order, accountAddress })
        // Make sure match is valid
        await testMatchingNewOrder(order, takerAddress)
    })

    test('Can bundle multiple SFTs together', async () => {
        const accountAddress = ALICE_ADDRESS
        const takerAddress = ALICE_ADDRESS
        const amountInEth = 1

        const order = await client._makeBundleSellOrder({
            bundleName: "Test Bundle",
            bundleDescription: "This is a test with SFT assets",
            assets: heterogenousSemiFungibleAssetsForBundleOrder,
            quantities: heterogenousSemiFungibleAssetsForBundleOrder.map(a => a.quantity),
            accountAddress,
            startAmount: amountInEth,
            expirationTime: 0,
            extraBountyBasisPoints: 0,
            waitForHighestBid: false,
            buyerAddress: NULL_ADDRESS,
            paymentTokenAddress: NULL_ADDRESS
        })

        expect(order.paymentToken).toEqual(NULL_ADDRESS)
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth)
        testBundleMetadata(order, WyvernSchemaName.ERC1155)
        testFeesMakerOrder(order, undefined)

        await client._sellOrderValidationAndApprovals({ order, accountAddress })
        // Make sure match is valid
        await testMatchingNewOrder(order, takerAddress)
    })

    test('Can bundle multiple homogenous semifungibles', async () => {
        const accountAddress = ALICE_ADDRESS
        const takerAddress = ALICE_ADDRESS
        const amountInEth = 1
        const asset = await client.api.getAsset(homogenousSemiFungibleAssetsForBundleOrder[0])

        const order = await client._makeBundleSellOrder({
            bundleName: "Test Bundle",
            bundleDescription: "This is a test with homogenous SFT assets",
            assets: homogenousSemiFungibleAssetsForBundleOrder,
            collection: asset.collection,
            quantities: homogenousSemiFungibleAssetsForBundleOrder.map(a => a.quantity),
            accountAddress,
            startAmount: amountInEth,
            expirationTime: 0,
            extraBountyBasisPoints: 0,
            waitForHighestBid: false,
            buyerAddress: NULL_ADDRESS,
            paymentTokenAddress: NULL_ADDRESS
        })

        expect(order.paymentToken).toEqual(NULL_ADDRESS)
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth)
        testBundleMetadata(order, WyvernSchemaName.ERC1155)
        testFeesMakerOrder(order, asset.collection)

        await client._sellOrderValidationAndApprovals({ order, accountAddress })
        // Make sure match is valid
        await testMatchingNewOrder(order, takerAddress)
    })

    test('Matches bundle sell order for misordered assets with different schemas', async () => {
        const accountAddress = ALICE_ADDRESS
        const takerAddress = ALICE_STASH_ADDRESS
        const amountInEth = 1
        const assets = [
            assetsForBundleOrder[0],
            fungibleAssetsForBundleOrder[0],
            heterogenousSemiFungibleAssetsForBundleOrder[0]]

        const order = await client._makeBundleSellOrder({
            bundleName: "Test Bundle",
            bundleDescription: "This is a test with different schemas of assets",
            assets,
            quantities: assets.map(a => a.quantity),
            accountAddress,
            startAmount: amountInEth,
            expirationTime: 0,
            extraBountyBasisPoints: 0,
            waitForHighestBid: false,
            buyerAddress: NULL_ADDRESS,
            paymentTokenAddress: NULL_ADDRESS
        })

        expect(order.paymentToken).toEqual(NULL_ADDRESS)
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth)
        testFeesMakerOrder(order, undefined)

        await client._sellOrderValidationAndApprovals({ order, accountAddress })
        // Make sure match is valid
        await testMatchingNewOrder(order, takerAddress)
    })

    test('Matches bundle buy order for misordered assets with different schemas', async () => {
        const accountAddress = ALICE_STASH_ADDRESS
        const takerAddress = ALICE_ADDRESS
        const amountInEth = 0.01
        const assets = [
            assetsForBundleOrder[0],
            fungibleAssetsForBundleOrder[0],
            heterogenousSemiFungibleAssetsForBundleOrder[0]]

        const order = await client._makeBundleBuyOrder({
            assets,
            quantities: assets.map(a => a.quantity),
            accountAddress,
            startAmount: amountInEth,
            expirationTime: 0,
            extraBountyBasisPoints: 0,
            paymentTokenAddress: WDOT_ADDRESS
        })

        expect(order.paymentToken).toEqual(WDOT_ADDRESS)
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth)
        expect(order.extra.toNumber()).toEqual(0)
        expect(order.expirationTime.toNumber()).toEqual(0)
        testFeesMakerOrder(order, undefined)

        await client._buyOrderValidationAndApprovals({ order, accountAddress })
        // Make sure match is valid
        await testMatchingNewOrder(order, takerAddress)
    })

})

function testBundleMetadata(order: UnhashedOrder, schemaName: WyvernSchemaName) {
    expect(order.metadata).toEqual(expect.arrayContaining(['bundle']));
    if (!('bundle' in order.metadata)) {
        return
    }
    expect(order.metadata.bundle.assets).not.toHaveLength(0)
    const expectedSchemas = order.metadata.bundle.assets.map(a => schemaName)
    expect(order.metadata.bundle.schemas).toMatchObject(expectedSchemas)
}
