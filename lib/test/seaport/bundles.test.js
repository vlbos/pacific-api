"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../pacific-js/index");
const types_1 = require("../../pacific-js/types");
const constants_1 = require("../constants");
const fees_test_1 = require("./fees.test");
const orders_test_1 = require("./orders.test");
const constants_2 = require("../../pacific-js/constants");
// const provider = new Web3.providers.HttpProvider(MAINNET_PROVIDER_URL)
const api_1 = require("@polkadot/api");
const provider = new api_1.WsProvider('ws://127.0.0.1:9944/');
const devProvider = new api_1.WsProvider('ws://127.0.0.1:9944/');
let client;
let devClient;
const assetsForBundleOrder = [
    { tokenId: constants_1.MYTHEREUM_TOKEN_ID.toString(), tokenAddress: constants_1.MYTHEREUM_ADDRESS, quantity: 1 },
    { tokenId: constants_1.DIGITAL_ART_CHAIN_TOKEN_ID.toString(), tokenAddress: constants_1.DIGITAL_ART_CHAIN_ADDRESS, quantity: 1 },
];
const fungibleAssetsForBundleOrder = [
    { tokenAddress: constants_1.BENZENE_ADDRESS, tokenId: null, schemaName: types_1.WyvernSchemaName.ERC20, quantity: 20 },
    { tokenAddress: constants_1.GODS_UNCHAINED_CHEST_ADDRESS, tokenId: null, schemaName: types_1.WyvernSchemaName.ERC20, quantity: 1 },
];
const heterogenousSemiFungibleAssetsForBundleOrder = [
    { tokenId: constants_1.DISSOLUTION_TOKEN_ID, tokenAddress: constants_2.ENJIN_ADDRESS, schemaName: types_1.WyvernSchemaName.ERC1155, quantity: 2 },
    { tokenId: constants_1.AGE_OF_RUST_TOKEN_ID, tokenAddress: constants_2.ENJIN_ADDRESS, schemaName: types_1.WyvernSchemaName.ERC1155, quantity: 1 },
    { tokenId: constants_1.CRYPTOVOXELS_WEARABLE_ID, tokenAddress: constants_1.CRYPTOVOXELS_WEARABLE_ADDRESS, schemaName: types_1.WyvernSchemaName.ERC1155, quantity: 1 },
];
const homogenousSemiFungibleAssetsForBundleOrder = [
    { tokenId: constants_1.CRYPTOVOXELS_WEARABLE_ID, tokenAddress: constants_1.CRYPTOVOXELS_WEARABLE_ADDRESS, schemaName: types_1.WyvernSchemaName.ERC1155, quantity: 1 },
    { tokenId: constants_1.CRYPTOVOXELS_WEARABLE_2_ID, tokenAddress: constants_1.CRYPTOVOXELS_WEARABLE_ADDRESS, schemaName: types_1.WyvernSchemaName.ERC1155, quantity: 2 },
];
let manaAddress;
describe('seaport: bundles', () => {
    beforeAll(async () => {
        // console.log("============================",api)
        client = new index_1.OpenSeaPort(provider, {
            networkName: types_1.Network.Dev,
            apiKey: constants_1.MAINNET_API_KEY
        }, line => console.info(`MAINNET: ${line}`));
        devClient = new index_1.OpenSeaPort(devProvider, {
            networkName: types_1.Network.Dev,
            apiKey: constants_1.MAINNET_API_KEY
        }, line => console.info(`DEV: ${line}`));
        manaAddress = (await client.api.getPaymentTokens({ symbol: 'MANA' })).tokens[0].address;
    });
    test('Matches heterogenous bundle buy order', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_ADDRESS;
        const amountInEth = 0.01;
        const order = await client._makeBundleBuyOrder({
            assets: assetsForBundleOrder,
            quantities: [1, 1],
            accountAddress,
            startAmount: amountInEth,
            extraBountyBasisPoints: 0,
            expirationTime: 0,
            paymentTokenAddress: constants_1.WDOT_ADDRESS
        });
        expect(order.paymentToken).toEqual(constants_1.WDOT_ADDRESS);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth);
        expect(order.extra.toNumber()).toEqual(0);
        expect(order.expirationTime.toNumber()).toEqual(0);
        testBundleMetadata(order, types_1.WyvernSchemaName.ERC721);
        (0, fees_test_1.testFeesMakerOrder)(order, undefined);
        await client._buyOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        await (0, orders_test_1.testMatchingNewOrder)(order, takerAddress);
    });
    ///TEST NEEDED
    test('Matches homogenous bundle buy order', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_ADDRESS;
        const amountInToken = 10;
        const assets = [{ tokenId: constants_1.MYTHEREUM_TOKEN_ID.toString(), tokenAddress: constants_1.MYTHEREUM_ADDRESS }];
        const order = await client._makeBundleBuyOrder({
            assets,
            quantities: [1],
            accountAddress,
            startAmount: amountInToken,
            extraBountyBasisPoints: 0,
            expirationTime: 0,
            paymentTokenAddress: manaAddress
        });
        console.log(order);
        const asset = await client.api.getAsset(assets[0]);
        expect(order.paymentToken).toEqual(manaAddress);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 9) * amountInToken);
        expect(order.extra.toNumber()).toEqual(0);
        expect(order.expirationTime.toNumber()).toEqual(0);
        testBundleMetadata(order, types_1.WyvernSchemaName.ERC721);
        (0, fees_test_1.testFeesMakerOrder)(order, asset.collection);
        await client._buyOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        await (0, orders_test_1.testMatchingNewOrder)(order, takerAddress);
    });
    test('Matches fixed heterogenous bountied bundle sell order', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_ADDRESS;
        const amountInEth = 1;
        const bountyPercent = 1.5;
        const order = await client._makeBundleSellOrder({
            bundleName: "Test Bundle",
            bundleDescription: "This is a test with different types of assets",
            assets: assetsForBundleOrder,
            quantities: [1, 1],
            accountAddress,
            startAmount: amountInEth,
            extraBountyBasisPoints: bountyPercent * 100,
            expirationTime: 0,
            paymentTokenAddress: constants_2.NULL_ADDRESS,
            waitForHighestBid: false,
            buyerAddress: constants_2.NULL_ADDRESS
        });
        expect(order.paymentToken).toEqual(constants_2.NULL_ADDRESS);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth);
        expect(order.extra.toNumber()).toEqual(0);
        expect(order.expirationTime.toNumber()).toEqual(0);
        testBundleMetadata(order, types_1.WyvernSchemaName.ERC721);
        (0, fees_test_1.testFeesMakerOrder)(order, undefined, bountyPercent * 100);
        await client._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        await (0, orders_test_1.testMatchingNewOrder)(order, takerAddress);
    });
    ///TEST NEEDED
    test('Matches homogenous, bountied bundle sell order', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_ADDRESS;
        const amountInEth = 1;
        const bountyPercent = 0.8;
        const assets = [{ tokenId: constants_1.MYTHEREUM_TOKEN_ID.toString(), tokenAddress: constants_1.MYTHEREUM_ADDRESS }];
        const order = await client._makeBundleSellOrder({
            bundleName: "Test Homogenous Bundle",
            bundleDescription: "This is a test with one type of asset",
            assets,
            quantities: [1],
            accountAddress,
            startAmount: amountInEth,
            extraBountyBasisPoints: bountyPercent * 100,
            expirationTime: 0,
            paymentTokenAddress: constants_2.NULL_ADDRESS,
            waitForHighestBid: false,
            buyerAddress: constants_2.NULL_ADDRESS
        });
        console.log(order);
        const asset = await client.api.getAsset(assets[0]);
        expect(order.paymentToken).toEqual(constants_2.NULL_ADDRESS);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 9) * amountInEth);
        expect(order.extra.toNumber()).toEqual(0);
        expect(order.expirationTime.toNumber()).toEqual(0);
        testBundleMetadata(order, types_1.WyvernSchemaName.ERC721);
        (0, fees_test_1.testFeesMakerOrder)(order, asset.collection, bountyPercent * 100);
        await client._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        await (0, orders_test_1.testMatchingNewOrder)(order, takerAddress);
    });
    test('Matches a new bundle sell order for an ERC-20 token (MANA)', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_ADDRESS;
        const token = (await client.api.getPaymentTokens({ symbol: 'MANA' })).tokens[0];
        const amountInToken = 2.422;
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
            buyerAddress: constants_2.NULL_ADDRESS
        });
        expect(order.paymentToken).toEqual(token.address);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, token.decimals) * amountInToken);
        expect(order.extra.toNumber()).toEqual(0);
        testBundleMetadata(order, types_1.WyvernSchemaName.ERC721);
        expect(order.expirationTime.toNumber()).toEqual(0);
        await client._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        await (0, orders_test_1.testMatchingNewOrder)(order, takerAddress);
    });
    test('Matches Dutch bundle order for different approve-all assets', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_ADDRESS;
        const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24); // one day from now
        const amountInEth = 1;
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
            buyerAddress: constants_2.NULL_ADDRESS,
            paymentTokenAddress: constants_2.NULL_ADDRESS
        });
        expect(order.paymentToken).toEqual(constants_2.NULL_ADDRESS);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth);
        expect(order.extra.toNumber()).toEqual(Math.pow(10, 18) * amountInEth);
        expect(order.expirationTime.toNumber()).toEqual(expirationTime);
        testBundleMetadata(order, types_1.WyvernSchemaName.ERC721);
        await client._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        await (0, orders_test_1.testMatchingNewOrder)(order, takerAddress);
    });
    test('Can bundle multiple fungible tokens together', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_ADDRESS;
        const amountInEth = 1;
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
            buyerAddress: constants_2.NULL_ADDRESS,
            paymentTokenAddress: constants_2.NULL_ADDRESS
        });
        expect(order.paymentToken).toEqual(constants_2.NULL_ADDRESS);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth);
        testBundleMetadata(order, types_1.WyvernSchemaName.ERC20);
        (0, fees_test_1.testFeesMakerOrder)(order, undefined);
        await client._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        await (0, orders_test_1.testMatchingNewOrder)(order, takerAddress);
    });
    test('Can bundle multiple SFTs together', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_ADDRESS;
        const amountInEth = 1;
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
            buyerAddress: constants_2.NULL_ADDRESS,
            paymentTokenAddress: constants_2.NULL_ADDRESS
        });
        expect(order.paymentToken).toEqual(constants_2.NULL_ADDRESS);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth);
        testBundleMetadata(order, types_1.WyvernSchemaName.ERC1155);
        (0, fees_test_1.testFeesMakerOrder)(order, undefined);
        await client._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        await (0, orders_test_1.testMatchingNewOrder)(order, takerAddress);
    });
    test('Can bundle multiple homogenous semifungibles', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_ADDRESS;
        const amountInEth = 1;
        const asset = await client.api.getAsset(homogenousSemiFungibleAssetsForBundleOrder[0]);
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
            buyerAddress: constants_2.NULL_ADDRESS,
            paymentTokenAddress: constants_2.NULL_ADDRESS
        });
        expect(order.paymentToken).toEqual(constants_2.NULL_ADDRESS);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth);
        testBundleMetadata(order, types_1.WyvernSchemaName.ERC1155);
        (0, fees_test_1.testFeesMakerOrder)(order, asset.collection);
        await client._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        await (0, orders_test_1.testMatchingNewOrder)(order, takerAddress);
    });
    test('Matches bundle sell order for misordered assets with different schemas', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_STASH_ADDRESS;
        const amountInEth = 1;
        const assets = [
            assetsForBundleOrder[0],
            fungibleAssetsForBundleOrder[0],
            heterogenousSemiFungibleAssetsForBundleOrder[0]
        ];
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
            buyerAddress: constants_2.NULL_ADDRESS,
            paymentTokenAddress: constants_2.NULL_ADDRESS
        });
        expect(order.paymentToken).toEqual(constants_2.NULL_ADDRESS);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth);
        (0, fees_test_1.testFeesMakerOrder)(order, undefined);
        await client._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        await (0, orders_test_1.testMatchingNewOrder)(order, takerAddress);
    });
    test('Matches bundle buy order for misordered assets with different schemas', async () => {
        const accountAddress = constants_1.ALICE_STASH_ADDRESS;
        const takerAddress = constants_1.ALICE_ADDRESS;
        const amountInEth = 0.01;
        const assets = [
            assetsForBundleOrder[0],
            fungibleAssetsForBundleOrder[0],
            heterogenousSemiFungibleAssetsForBundleOrder[0]
        ];
        const order = await client._makeBundleBuyOrder({
            assets,
            quantities: assets.map(a => a.quantity),
            accountAddress,
            startAmount: amountInEth,
            expirationTime: 0,
            extraBountyBasisPoints: 0,
            paymentTokenAddress: constants_1.WDOT_ADDRESS
        });
        expect(order.paymentToken).toEqual(constants_1.WDOT_ADDRESS);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInEth);
        expect(order.extra.toNumber()).toEqual(0);
        expect(order.expirationTime.toNumber()).toEqual(0);
        (0, fees_test_1.testFeesMakerOrder)(order, undefined);
        await client._buyOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        await (0, orders_test_1.testMatchingNewOrder)(order, takerAddress);
    });
});
function testBundleMetadata(order, schemaName) {
    expect(order.metadata).toEqual(expect.arrayContaining(['bundle']));
    if (!('bundle' in order.metadata)) {
        return;
    }
    expect(order.metadata.bundle.assets).not.toHaveLength(0);
    const expectedSchemas = order.metadata.bundle.assets.map(a => schemaName);
    expect(order.metadata.bundle.schemas).toMatchObject(expectedSchemas);
}
//# sourceMappingURL=bundles.test.js.map