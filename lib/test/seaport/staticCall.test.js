"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../pacific-js/index");
const types_1 = require("../../pacific-js/types");
const constants_1 = require("../constants");
const fees_test_1 = require("./fees.test");
// import { testMatchingNewOrder } from './orders'
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
    networkName: types_1.Network.Dev,
    apiKey: constants_1.DEV_API_KEY
}, line => console.info(`DEV: ${line}`));
describe('seaport: static calls', () => {
    test("Mainnet staticCall tx.origin can be applied to arbitrary order", async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const takerAddress = constants_1.ALICE_STASH_ADDRESS;
        const amountInToken = 2;
        const tokenId = constants_1.MYTHEREUM_TOKEN_ID.toString();
        const tokenAddress = constants_1.MYTHEREUM_ADDRESS;
        const order = await client._makeSellOrder({
            asset: { tokenAddress, tokenId },
            accountAddress,
            startAmount: amountInToken,
            extraBountyBasisPoints: 0,
            buyerAddress: constants_2.NULL_ADDRESS,
            expirationTime: 0,
            quantity: 1,
            paymentTokenAddress: constants_2.NULL_ADDRESS,
            waitForHighestBid: false
        });
        order.staticTarget = constants_2.STATIC_CALL_TX_ORIGIN_ADDRESS;
        // order.staticExtradata = encodeCall(getMethod(StaticCheckTxOrigin, 'succeedIfTxOriginMatchesSpecifiedAddress'), [takerAddress])
        expect(order.paymentToken).toEqual(constants_2.NULL_ADDRESS);
        await client._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        // await testMatchingNewOrder(order, takerAddress)
    });
    test.skip("Mainnet StaticCall Decentraland", async () => {
        // Mainnet Decentraland
        const accountAddress = '0xf293dfe0ac79c2536b9426957ac8898d6c743717'; // Mainnet Decentraland Estate owner
        const takerAddress = constants_1.ALICE_STASH_ADDRESS;
        const amountInToken = 2;
        const tokenId = '2898'; // Mainnet DecentralandEstate TokenID
        const tokenAddress = '0x959e104e1a4db6317fa58f8295f586e1a978c297'; // Mainnet DecentralandEstates Contract
        const asset = await client.api.getAsset({ tokenAddress, tokenId });
        const order = await client._makeSellOrder({
            asset: { tokenAddress, tokenId },
            accountAddress,
            startAmount: amountInToken,
            extraBountyBasisPoints: 0,
            buyerAddress: constants_2.NULL_ADDRESS,
            expirationTime: 0,
            quantity: 1,
            paymentTokenAddress: constants_2.NULL_ADDRESS,
            waitForHighestBid: false
        });
        expect(order.paymentToken).toEqual(constants_2.NULL_ADDRESS);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInToken);
        expect(order.extra.toNumber()).toEqual(0);
        expect(order.expirationTime.toNumber()).toEqual(0);
        (0, fees_test_1.testFeesMakerOrder)(order, asset.collection, 0);
        await client._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        // await testMatchingNewOrder(order, takerAddress)
    });
    test.skip("Testnet StaticCall CheezeWizards", async () => {
        // Testnet Cheezewizards
        const accountAddress = constants_1.ALICE_ADDRESS; // Testnet CheezeWizards token owner
        const takerAddress = constants_1.ALICE_STASH_ADDRESS;
        const amountInToken = 2;
        // Testnet Cheezewizards
        const tokenId = '3'; // Testnet CheezeWizards TokenID
        const tokenAddress = '0x095731b672b76b00A0b5cb9D8258CD3F6E976cB2'; // Testnet CheezeWizards Guild address
        const asset = await devClient.api.getAsset({ tokenAddress, tokenId });
        const order = await devClient._makeSellOrder({
            asset: { tokenAddress, tokenId },
            accountAddress,
            startAmount: amountInToken,
            extraBountyBasisPoints: 0,
            buyerAddress: constants_2.NULL_ADDRESS,
            expirationTime: 0,
            quantity: 1,
            paymentTokenAddress: constants_2.NULL_ADDRESS,
            waitForHighestBid: false
        });
        expect(order.paymentToken).toEqual(constants_2.NULL_ADDRESS);
        expect(order.basePrice.toNumber()).toEqual(Math.pow(10, 18) * amountInToken);
        expect(order.extra.toNumber()).toEqual(0);
        expect(order.expirationTime.toNumber()).toEqual(0);
        (0, fees_test_1.testFeesMakerOrder)(order, asset.collection, 0);
        await devClient._sellOrderValidationAndApprovals({ order, accountAddress });
        // Make sure match is valid
        // await testMatchingNewOrder(order, takerAddress)
    });
});
//# sourceMappingURL=staticCall.test.js.map