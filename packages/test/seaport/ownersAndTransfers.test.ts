
import { OpenSeaPort } from '../../pacific-js/index'
import { Network, WyvernSchemaName, WyvernNFTAsset, WyvernFTAsset } from '../../pacific-js/types'
import { ALICE_ADDRESS,EVE_ADDRESS, DIGITAL_ART_CHAIN_ADDRESS, DIGITAL_ART_CHAIN_TOKEN_ID, MYTHEREUM_TOKEN_ID, MYTHEREUM_ADDRESS, GODS_UNCHAINED_ADDRESS, CK_ADDRESS, CHARLIE_ADDRESS, ALICE_STASH_ADDRESS, GODS_UNCHAINED_TOKEN_ID, CK_TOKEN_ID, MAINNET_API_KEY, DEV_API_KEY, CK_DEV_ADDRESS, CK_DEV_TOKEN_ID, CATS_IN_MECHS_ID, BOB_ADDRESS, DISSOLUTION_TOKEN_ID, SANDBOX_DEV_ID, SANDBOX_DEV_ADDRESS, AGE_OF_RUST_TOKEN_ID , WDOT_ADDRESS, WDOT_ADDRESS2 } from '../constants'
import {
    ENJIN_ADDRESS,
    ENJIN_LEGACY_ADDRESS, MAINNET_PROVIDER_URL, MAX_UINT_256, DEV_PROVIDER_URL
} from '../../pacific-js/constants'
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';
import { ALICE, BOB, CHARLIE, DAVE, EVE, CREATION_FEE, WSURL } from "./consts";

// import { submit, users } from '../orders/lib/submit-signed-tx';
import * as ordersJSONFixture from '../fixtures/orders.json'

import types from '../../pacific-js/config/types.json';
import rpcs from '../../pacific-js/config/rpcs.json';
import BigNumber from 'bignumber.js';
// const provider = new Web3.providers.HttpProvider(MAINNET_PROVIDER_URL)
// const devProvider = new Web3.providers.HttpProvider(DEV_PROVIDER_URL)
const provider = new WsProvider('ws://127.0.0.1:9944/');
const devProvider = new WsProvider('ws://127.0.0.1:9944/');

const client = new OpenSeaPort(provider, {
    networkName: Network.Main,
    apiKey: MAINNET_API_KEY
}, line => console.info(`MAINNET: ${line}`))

const devClient = new OpenSeaPort(devProvider, {
    networkName: Network.Main,
    apiKey: DEV_API_KEY
}, line => console.info(`DEV: ${line}`))

let manaAddress: string

describe('seaport: owners and transfers', () => {
    beforeAll(async () => {
        jest.setTimeout(30000);
        await client.apipro();
        manaAddress = (await client.api.getPaymentTokens({ symbol: 'MANA' })).tokens[0].address
    })
    afterAll(async () => {
        await provider.disconnect();
        await devProvider.disconnect();
        await client.closeProvider();
    })
    ///TEST OK
    test("On-chain ownership throws for invalid assets", async () => {
        const accountAddress = ALICE_ADDRESS
        const schemaName = WyvernSchemaName.ERC721
        const wyAssetDev: WyvernNFTAsset = {
            id: CK_DEV_TOKEN_ID.toString(),
            address: CK_DEV_ADDRESS
        }
        try {
            // Use mainnet client with dev asset
            const isOwner = await client._ownsAssetOnChain({ accountAddress, wyAsset: wyAssetDev, schemaName })
            //   assert.fail

        } catch (error) {
            expect(error.message).toContain('Unable to get current owner')
        }
    })

    test("On-chain ownership correctly pulled for ERC721s", async () => {
        const accountAddress = ALICE_ADDRESS
        const schemaName = WyvernSchemaName.ERC721

        // Ownership
        const wyAsset: WyvernNFTAsset = {
            id: MYTHEREUM_TOKEN_ID.toString(),
            address: MYTHEREUM_ADDRESS
        }
        const isOwner = await client._ownsAssetOnChain({ accountAddress, wyAsset, schemaName })
        expect(isOwner).toBeTruthy()

        // Non-ownership
        const isOwner2 = await client._ownsAssetOnChain({ accountAddress: ALICE_STASH_ADDRESS, wyAsset, schemaName })
        expect(isOwner2).toBeFalsy()
    })
    ///TEST OK
    test("On-chain ownership correctly pulled for ERC20s", async () => {
        const accountAddress = ALICE_ADDRESS
        const schemaName = WyvernSchemaName.ERC20

        // Ownership
        const wyAsset: WyvernFTAsset = {
            address: manaAddress,
            quantity: "1"
        }
        const isOwner = await client._ownsAssetOnChain({ accountAddress, wyAsset, schemaName })
        expect(isOwner).toBeTruthy()

        // Not enough ownership
        const isOwner2 = await client._ownsAssetOnChain({ accountAddress, wyAsset: { ...wyAsset, quantity: MAX_UINT_256.toString() }, schemaName })
        expect(isOwner2).toBeFalsy()

        // Non-ownership
        const isOwner3 = await client._ownsAssetOnChain({ accountAddress: BOB_ADDRESS, wyAsset, schemaName })
        expect(isOwner3).toBeFalsy()
    })

    test("On-chain ownership correctly pulled for ERC1155s", async () => {
        const accountAddress = ALICE_ADDRESS
        const schemaName = WyvernSchemaName.ERC1155

        // Ownership of NFT
        const wyAssetNFT: WyvernNFTAsset = {
            id: AGE_OF_RUST_TOKEN_ID,
            address: ENJIN_ADDRESS
        }
        const isOwner = await client._ownsAssetOnChain({ accountAddress, wyAsset: wyAssetNFT, schemaName })
        expect(isOwner).toBeTruthy()

        // Non-ownership
        const isOwner2 = await client._ownsAssetOnChain({ accountAddress: BOB_ADDRESS, wyAsset: wyAssetNFT, schemaName })
        expect(isOwner2).toBeFalsy()

        // Ownership of FT
        const wyAssetFT: WyvernFTAsset = {
            id: DISSOLUTION_TOKEN_ID,
            address: ENJIN_ADDRESS,
            quantity: "1"
        }
        const isOwner3 = await client._ownsAssetOnChain({ accountAddress, wyAsset: wyAssetFT, schemaName })
        expect(isOwner3).toBeTruthy()

        // Not enough ownership
        const isOwner5 = await client._ownsAssetOnChain({ accountAddress, wyAsset: { ...wyAssetFT, quantity: MAX_UINT_256.toString() }, schemaName })
        expect(isOwner5).toBeFalsy()

        // Non-ownership
        const isOwner4 = await client._ownsAssetOnChain({ accountAddress: BOB_ADDRESS, wyAsset: wyAssetFT, schemaName })
        expect(isOwner4).toBeFalsy()
    })

    test('ERC-721 v3 asset locked in contract is not transferrable', async () => {
        const isTransferrable = await client.isAssetTransferrable({
            asset: {
                tokenId: GODS_UNCHAINED_TOKEN_ID.toString(),
                tokenAddress: GODS_UNCHAINED_ADDRESS,
            },
            fromAddress: ALICE_ADDRESS,
            toAddress: ALICE_STASH_ADDRESS
        })
        expect(isTransferrable).not.toBeTruthy()
    })

    test('ERC-721 v3 asset not owned by fromAddress is not transferrable', async () => {
        const isTransferrable = await client.isAssetTransferrable({
            asset: {
                tokenId: "1",
                tokenAddress: DIGITAL_ART_CHAIN_ADDRESS,
            },
            fromAddress: ALICE_ADDRESS,
            toAddress: ALICE_STASH_ADDRESS
        })
        expect(isTransferrable).not.toBeTruthy()
    })

    test('ERC-721 v3 asset owned by fromAddress is transferrable', async () => {
        const isTransferrable = await client.isAssetTransferrable({
            asset: {
                tokenId: DIGITAL_ART_CHAIN_TOKEN_ID.toString(),
                tokenAddress: DIGITAL_ART_CHAIN_ADDRESS,
            },
            fromAddress: ALICE_ADDRESS,
            toAddress: ALICE_STASH_ADDRESS
        })
        expect(isTransferrable).toBeTruthy()
    })

    test('ERC-721 v1 asset owned by fromAddress is transferrable', async () => {
        const isTransferrable = await client.isAssetTransferrable({
            asset: {
                tokenId: CK_TOKEN_ID.toString(),
                tokenAddress: CK_ADDRESS,
            },
            fromAddress: ALICE_STASH_ADDRESS,
            toAddress: ALICE_ADDRESS,
            useProxy: true
        })
        expect(isTransferrable).toBeTruthy()
    })
    ///TEST OK
    test('ERC-721 v1 asset owned by fromAddress is transfer', async () => {
        const isTransferrable = await client.transfer({
            asset: {
                tokenId: CK_TOKEN_ID.toString(),
                tokenAddress: CK_ADDRESS,
            },
            fromAddress: ALICE_STASH_ADDRESS,
            toAddress: ALICE_ADDRESS,
        })
        expect(isTransferrable).toBeTruthy()
    })

    test('ERC-20 asset not owned by fromAddress is not transferrable', async () => {
        const isTransferrable = await client.isAssetTransferrable({
            asset: {
                tokenId: null,
                tokenAddress: WDOT_ADDRESS,
                schemaName: WyvernSchemaName.ERC20
            },
            fromAddress: BOB_ADDRESS,
            toAddress: ALICE_STASH_ADDRESS,
        })
        expect(isTransferrable).not.toBeTruthy()
    })

    test('ERC-20 asset owned by fromAddress is transferrable', async () => {
        const isTransferrable = await client.isAssetTransferrable({
            asset: {
                tokenId: null,
                tokenAddress: WDOT_ADDRESS,
                schemaName: WyvernSchemaName.ERC20
            },
            quantity: Math.pow(10, 18) * 0.001,
            fromAddress: ALICE_ADDRESS,
            toAddress: ALICE_STASH_ADDRESS,
        })
        expect(isTransferrable).toBeTruthy()
    })

    ///TEST OK
    test('ERC-20 asset owned by fromAddress is transfer', async () => {
        const isTransferrable = await client.transfer({
            asset: {
                tokenId: null,
                tokenAddress: WDOT_ADDRESS,
                schemaName: WyvernSchemaName.ERC20
            },
            quantity: Math.pow(10, 18) * 0.001,
            fromAddress: ALICE_ADDRESS,
            toAddress: ALICE_STASH_ADDRESS,
        })
        expect(isTransferrable).toBeTruthy()
    })

    ///TEST 
    test('ERC-20 asset owned by fromAddress is transfer all', async () => {
        const isTransferrable = await client.transferAll({
            assets: [{
                tokenId: null,
                tokenAddress: WDOT_ADDRESS,
                schemaName: WyvernSchemaName.ERC20
            }],
            fromAddress: ALICE_ADDRESS,
            toAddress: ALICE_STASH_ADDRESS,
            schemaName: WyvernSchemaName.ERC20
        })
        expect(isTransferrable).toBeTruthy()
    })

    ///TEST 
    test.only('ERC-20 assets owned by fromAddress is transfer all', async () => {
        const isTransferrable = await client.transferAll({
            assets: [{
                tokenId: null,
                tokenAddress: WDOT_ADDRESS,
                schemaName: WyvernSchemaName.ERC20
            }, {
                tokenId: null,
                tokenAddress: WDOT_ADDRESS2,
                schemaName: WyvernSchemaName.ERC20
            }],
            fromAddress: ALICE_ADDRESS,
            toAddress: EVE_ADDRESS,
            schemaName: WyvernSchemaName.ERC20
        })
        expect(isTransferrable).toBeTruthy()
    })

    ///TEST
    test('ERC-721 v1 asset owned by fromAddress is transfer all', async () => {
        const isTransferrable = await client.transferAll({
            assets: [{
                tokenId: CK_TOKEN_ID.toString(),
                tokenAddress: CK_ADDRESS,
            }],
            fromAddress: ALICE_STASH_ADDRESS,
            toAddress: ALICE_ADDRESS,
            schemaName: WyvernSchemaName.ERC721
        })
        expect(isTransferrable).toBeTruthy()
    })

    test('ERC-1155 asset locked in contract is not transferrable', async () => {
        const isTransferrable2 = await client.isAssetTransferrable({
            asset: {
                tokenId: ENJIN_LEGACY_ADDRESS.toString(),
                tokenAddress: CATS_IN_MECHS_ID,
                schemaName: WyvernSchemaName.ERC1155
            },
            fromAddress: ALICE_ADDRESS,
            toAddress: ALICE_STASH_ADDRESS,
        })
        expect(isTransferrable2).not.toBeTruthy()
    })

    test('ERC-1155 asset not owned by fromAddress is not transferrable', async () => {
        const isTransferrable = await client.isAssetTransferrable({
            asset: {
                tokenId: CATS_IN_MECHS_ID,
                tokenAddress: ENJIN_ADDRESS,
                schemaName: WyvernSchemaName.ERC1155
            },
            fromAddress: CHARLIE_ADDRESS,
            toAddress: ALICE_STASH_ADDRESS,
        })
        expect(isTransferrable).not.toBeTruthy()
    })

    test('Dev ERC-1155 asset owned by fromAddress is transferrable', async () => {
        const isTransferrable = await devClient.isAssetTransferrable({
            asset: {
                tokenAddress: SANDBOX_DEV_ADDRESS,
                tokenId: SANDBOX_DEV_ID,
                schemaName: WyvernSchemaName.ERC1155
            },
            fromAddress: "0x61c461ecc993aadeb7e4b47e96d1b8cc37314b20",
            toAddress: ALICE_ADDRESS,
        })
        expect(isTransferrable).toBeTruthy()
    })
})
