"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../pacific-js/index");
const types_1 = require("../../pacific-js/types");
const constants_1 = require("../constants");
const constants_2 = require("../../pacific-js/constants");
const api_1 = require("@polkadot/api");
// const provider = new Web3.providers.HttpProvider(MAINNET_PROVIDER_URL)
// const devProvider = new Web3.providers.HttpProvider(DEV_PROVIDER_URL)
const provider = new api_1.WsProvider('ws://127.0.0.1:9944/');
const devProvider = new api_1.WsProvider('ws://127.0.0.1:9944/');
const client = new index_1.OpenSeaPort(provider, {
    networkName: types_1.Network.Main,
    apiKey: constants_1.MAINNET_API_KEY
}, line => console.info(`MAINNET: ${line}`));
const devClient = new index_1.OpenSeaPort(devProvider, {
    networkName: types_1.Network.Main,
    apiKey: constants_1.DEV_API_KEY
}, line => console.info(`DEV: ${line}`));
let manaAddress;
describe('seaport: owners and transfers', () => {
    beforeAll(async () => {
        jest.setTimeout(30000);
        await client.apipro();
        manaAddress = (await client.api.getPaymentTokens({ symbol: 'MANA' })).tokens[0].address;
    });
    afterAll(async () => {
        await provider.disconnect();
        await devProvider.disconnect();
        await client.closeProvider();
    });
    ///TEST OK
    test("On-chain ownership throws for invalid assets", async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const schemaName = types_1.WyvernSchemaName.ERC721;
        const wyAssetDev = {
            id: constants_1.CK_DEV_TOKEN_ID.toString(),
            address: constants_1.CK_DEV_ADDRESS
        };
        try {
            // Use mainnet client with dev asset
            const isOwner = await client._ownsAssetOnChain({ accountAddress, wyAsset: wyAssetDev, schemaName });
            //   assert.fail
        }
        catch (error) {
            expect(error).toContain('Unable to get current owner');
        }
    });
    test("On-chain ownership correctly pulled for ERC721s", async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const schemaName = types_1.WyvernSchemaName.ERC721;
        // Ownership
        const wyAsset = {
            id: constants_1.MYTHEREUM_TOKEN_ID.toString(),
            address: constants_1.MYTHEREUM_ADDRESS
        };
        const isOwner = await client._ownsAssetOnChain({ accountAddress, wyAsset, schemaName });
        expect(isOwner).toBeTruthy();
        // Non-ownership
        const isOwner2 = await client._ownsAssetOnChain({ accountAddress: constants_1.ALICE_STASH_ADDRESS, wyAsset, schemaName });
        expect(isOwner2).toBeFalsy();
    });
    ///TEST OK
    test("On-chain ownership correctly pulled for ERC20s", async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const schemaName = types_1.WyvernSchemaName.ERC20;
        // Ownership
        const wyAsset = {
            address: manaAddress,
            quantity: "1"
        };
        const isOwner = await client._ownsAssetOnChain({ accountAddress, wyAsset, schemaName });
        expect(isOwner).toBeTruthy();
        // Not enough ownership
        const isOwner2 = await client._ownsAssetOnChain({ accountAddress, wyAsset: Object.assign(Object.assign({}, wyAsset), { quantity: constants_2.MAX_UINT_256.toString() }), schemaName });
        expect(isOwner2).toBeFalsy();
        // Non-ownership
        const isOwner3 = await client._ownsAssetOnChain({ accountAddress: constants_1.BOB_ADDRESS, wyAsset, schemaName });
        expect(isOwner3).toBeFalsy();
    });
    test("On-chain ownership correctly pulled for ERC1155s", async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const schemaName = types_1.WyvernSchemaName.ERC1155;
        // Ownership of NFT
        const wyAssetNFT = {
            id: constants_1.AGE_OF_RUST_TOKEN_ID,
            address: constants_2.ENJIN_ADDRESS
        };
        const isOwner = await client._ownsAssetOnChain({ accountAddress, wyAsset: wyAssetNFT, schemaName });
        expect(isOwner).toBeTruthy();
        // Non-ownership
        const isOwner2 = await client._ownsAssetOnChain({ accountAddress: constants_1.BOB_ADDRESS, wyAsset: wyAssetNFT, schemaName });
        expect(isOwner2).toBeFalsy();
        // Ownership of FT
        const wyAssetFT = {
            id: constants_1.DISSOLUTION_TOKEN_ID,
            address: constants_2.ENJIN_ADDRESS,
            quantity: "1"
        };
        const isOwner3 = await client._ownsAssetOnChain({ accountAddress, wyAsset: wyAssetFT, schemaName });
        expect(isOwner3).toBeTruthy();
        // Not enough ownership
        const isOwner5 = await client._ownsAssetOnChain({ accountAddress, wyAsset: Object.assign(Object.assign({}, wyAssetFT), { quantity: constants_2.MAX_UINT_256.toString() }), schemaName });
        expect(isOwner5).toBeFalsy();
        // Non-ownership
        const isOwner4 = await client._ownsAssetOnChain({ accountAddress: constants_1.BOB_ADDRESS, wyAsset: wyAssetFT, schemaName });
        expect(isOwner4).toBeFalsy();
    });
    test('ERC-721 v3 asset locked in contract is not transferrable', async () => {
        const isTransferrable = await client.isAssetTransferrable({
            asset: {
                tokenId: constants_1.GODS_UNCHAINED_TOKEN_ID.toString(),
                tokenAddress: constants_1.GODS_UNCHAINED_ADDRESS,
            },
            fromAddress: constants_1.ALICE_ADDRESS,
            toAddress: constants_1.ALICE_STASH_ADDRESS
        });
        expect(isTransferrable).not.toBeTruthy();
    });
    test('ERC-721 v3 asset not owned by fromAddress is not transferrable', async () => {
        const isTransferrable = await client.isAssetTransferrable({
            asset: {
                tokenId: "1",
                tokenAddress: constants_1.DIGITAL_ART_CHAIN_ADDRESS,
            },
            fromAddress: constants_1.ALICE_ADDRESS,
            toAddress: constants_1.ALICE_STASH_ADDRESS
        });
        expect(isTransferrable).not.toBeTruthy();
    });
    test('ERC-721 v3 asset owned by fromAddress is transferrable', async () => {
        const isTransferrable = await client.isAssetTransferrable({
            asset: {
                tokenId: constants_1.DIGITAL_ART_CHAIN_TOKEN_ID.toString(),
                tokenAddress: constants_1.DIGITAL_ART_CHAIN_ADDRESS,
            },
            fromAddress: constants_1.ALICE_ADDRESS,
            toAddress: constants_1.ALICE_STASH_ADDRESS
        });
        expect(isTransferrable).toBeTruthy();
    });
    test('ERC-721 v1 asset owned by fromAddress is transferrable', async () => {
        const isTransferrable = await client.isAssetTransferrable({
            asset: {
                tokenId: constants_1.CK_TOKEN_ID.toString(),
                tokenAddress: constants_1.CK_ADDRESS,
            },
            fromAddress: constants_1.ALICE_STASH_ADDRESS,
            toAddress: constants_1.ALICE_ADDRESS,
            useProxy: true
        });
        expect(isTransferrable).toBeTruthy();
    });
    ///TEST OK
    test('ERC-721 v1 asset owned by fromAddress is transfer', async () => {
        const isTransferrable = await client.transfer({
            asset: {
                tokenId: constants_1.CK_TOKEN_ID.toString(),
                tokenAddress: constants_1.CK_ADDRESS,
            },
            fromAddress: constants_1.ALICE_STASH_ADDRESS,
            toAddress: constants_1.ALICE_ADDRESS,
        });
        expect(isTransferrable).toBeTruthy();
    });
    test('ERC-20 asset not owned by fromAddress is not transferrable', async () => {
        const isTransferrable = await client.isAssetTransferrable({
            asset: {
                tokenId: null,
                tokenAddress: constants_1.WDOT_ADDRESS,
                schemaName: types_1.WyvernSchemaName.ERC20
            },
            fromAddress: constants_1.BOB_ADDRESS,
            toAddress: constants_1.ALICE_STASH_ADDRESS,
        });
        expect(isTransferrable).not.toBeTruthy();
    });
    test('ERC-20 asset owned by fromAddress is transferrable', async () => {
        const isTransferrable = await client.isAssetTransferrable({
            asset: {
                tokenId: null,
                tokenAddress: constants_1.WDOT_ADDRESS,
                schemaName: types_1.WyvernSchemaName.ERC20
            },
            quantity: Math.pow(10, 18) * 0.001,
            fromAddress: constants_1.ALICE_ADDRESS,
            toAddress: constants_1.ALICE_STASH_ADDRESS,
        });
        expect(isTransferrable).toBeTruthy();
    });
    ///TEST OK
    test('ERC-20 asset owned by fromAddress is transfer', async () => {
        const isTransferrable = await client.transfer({
            asset: {
                tokenId: null,
                tokenAddress: constants_1.WDOT_ADDRESS,
                schemaName: types_1.WyvernSchemaName.ERC20
            },
            quantity: Math.pow(10, 18) * 0.001,
            fromAddress: constants_1.ALICE_ADDRESS,
            toAddress: constants_1.ALICE_STASH_ADDRESS,
        });
        expect(isTransferrable).toBeTruthy();
    });
    ///TEST 
    test('ERC-20 asset owned by fromAddress is transfer all', async () => {
        const isTransferrable = await client.transferAll({
            assets: [{
                    tokenId: null,
                    tokenAddress: constants_1.WDOT_ADDRESS,
                    schemaName: types_1.WyvernSchemaName.ERC20
                }],
            fromAddress: constants_1.ALICE_ADDRESS,
            toAddress: constants_1.ALICE_STASH_ADDRESS,
            schemaName: types_1.WyvernSchemaName.ERC20
        });
        expect(isTransferrable).toBeTruthy();
    });
    ///TEST OK
    test.only('ERC-20 assets owned by fromAddress is transfer all', async () => {
        const isTransferrable = await client.transferAll({
            assets: [{
                    tokenId: null,
                    tokenAddress: constants_1.WDOT_ADDRESS,
                    schemaName: types_1.WyvernSchemaName.ERC20
                }, {
                    tokenId: null,
                    tokenAddress: constants_1.WDOT_ADDRESS2,
                    schemaName: types_1.WyvernSchemaName.ERC20
                }],
            fromAddress: constants_1.BOB_ADDRESS,
            toAddress: constants_1.DAVE_ADDRESS,
            schemaName: types_1.WyvernSchemaName.ERC20
        });
        expect(isTransferrable).toBeTruthy();
    });
    ///TEST
    test('ERC-721 v1 asset owned by fromAddress is transfer all', async () => {
        const isTransferrable = await client.transferAll({
            assets: [{
                    tokenId: constants_1.CK_TOKEN_ID.toString(),
                    tokenAddress: constants_1.CK_ADDRESS,
                }],
            fromAddress: constants_1.ALICE_STASH_ADDRESS,
            toAddress: constants_1.ALICE_ADDRESS,
            schemaName: types_1.WyvernSchemaName.ERC721
        });
        expect(isTransferrable).toBeTruthy();
    });
    test('ERC-1155 asset locked in contract is not transferrable', async () => {
        const isTransferrable2 = await client.isAssetTransferrable({
            asset: {
                tokenId: constants_2.ENJIN_LEGACY_ADDRESS.toString(),
                tokenAddress: constants_1.CATS_IN_MECHS_ID,
                schemaName: types_1.WyvernSchemaName.ERC1155
            },
            fromAddress: constants_1.ALICE_ADDRESS,
            toAddress: constants_1.ALICE_STASH_ADDRESS,
        });
        expect(isTransferrable2).not.toBeTruthy();
    });
    test('ERC-1155 asset not owned by fromAddress is not transferrable', async () => {
        const isTransferrable = await client.isAssetTransferrable({
            asset: {
                tokenId: constants_1.CATS_IN_MECHS_ID,
                tokenAddress: constants_2.ENJIN_ADDRESS,
                schemaName: types_1.WyvernSchemaName.ERC1155
            },
            fromAddress: constants_1.CHARLIE_ADDRESS,
            toAddress: constants_1.ALICE_STASH_ADDRESS,
        });
        expect(isTransferrable).not.toBeTruthy();
    });
    test('Dev ERC-1155 asset owned by fromAddress is transferrable', async () => {
        const isTransferrable = await devClient.isAssetTransferrable({
            asset: {
                tokenAddress: constants_1.SANDBOX_DEV_ADDRESS,
                tokenId: constants_1.SANDBOX_DEV_ID,
                schemaName: types_1.WyvernSchemaName.ERC1155
            },
            fromAddress: "0x61c461ecc993aadeb7e4b47e96d1b8cc37314b20",
            toAddress: constants_1.ALICE_ADDRESS,
        });
        expect(isTransferrable).toBeTruthy();
    });
});
//# sourceMappingURL=ownersAndTransfers.test.js.map