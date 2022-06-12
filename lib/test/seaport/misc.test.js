"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../pacific-js/index");
const types_1 = require("../../pacific-js/types");
const utils_1 = require("../../pacific-js/utils/utils");
const constants_1 = require("../constants");
const contracts_1 = require("../../pacific-js/contracts");
const constants_2 = require("../../pacific-js/constants");
// const provider = new Web3.providers.HttpProvider(MAINNET_PROVIDER_URL)
const api_1 = require("@polkadot/api");
const provider = new api_1.WsProvider('ws://127.0.0.1:9944/');
const devProvider = new api_1.WsProvider('ws://127.0.0.1:9944/');
const client = new index_1.OpenSeaPort(provider, {
    networkName: types_1.Network.Main,
    apiKey: constants_1.MAINNET_API_KEY
}, line => console.info(`MAINNET: ${line}`));
describe('seaport: misc', () => {
    test('Instance has public methods', () => {
        expect(typeof client.getCurrentPrice).toEqual('function');
        // expect(typeof client.wrapDot).toEqual( 'function')
    });
    test('Instance exposes API methods', () => {
        expect(typeof client.api.getOrder).toEqual('function');
        expect(typeof client.api.getOrders).toEqual('function');
        expect(typeof client.api.postOrder).toEqual('function');
    });
    test('Instance exposes some underscored methods', () => {
        expect(typeof client._initializeProxy).toEqual('function');
        expect(typeof client._getProxy).toEqual('function');
    });
    test('Uses a gas price above the mean', async () => {
        // const gasPrice = await client._computeGasPrice()
        // // const meanGasPrice = await getCurrentGasPrice(client.papi)
        // // expect(meanGasPrice.toNumber()).toBeGreaterThan( 0)
        // expect(gasPrice.toNumber()).toBeGreaterThan( meanGasPrice.toNumber())
    });
    test('Fetches proxy for an account', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const proxy = await client._getProxy(accountAddress);
        expect(proxy).not.toBeNull();
    });
    test('Fetches positive token balance for an account', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const balance = await client.getTokenBalance({ accountAddress, tokenAddress: constants_1.WDOT_ADDRESS });
        expect(balance.toNumber()).toBeGreaterThan(0);
    });
    test('Accounts have maximum token balance approved', async () => {
        const accountAddress = constants_1.ALICE_ADDRESS;
        const approved = await client._getApprovedTokenCount({ accountAddress });
        expect(approved.toString()).toEqual(constants_2.MAX_UINT_256.toString());
    });
    test('Single-approval tokens are approved for tester address', async () => {
        const accountAddress = constants_1.ALICE_STASH_ADDRESS;
        const proxyAddress = await client._getProxy(accountAddress);
        const tokenId = constants_1.CK_TOKEN_ID.toString();
        const tokenAddress = constants_2.CK_ADDRESS;
        const erc721 = await client.papi.eth.contract(contracts_1.ERC721).at(tokenAddress);
        const approvedAddress = await (0, utils_1.getNonCompliantApprovalAddress)(erc721, tokenId, accountAddress);
        expect(approvedAddress).toEqual(proxyAddress);
    });
    test('Checks whether an address is a contract addrress', async () => {
        const smartContractWalletAddress = constants_1.EVE_ADDRESS;
        const acccountOneIsContractAddress = await (0, utils_1.isContractAddress)(client.papi, smartContractWalletAddress);
        const nonSmartContractWalletAddress = constants_1.DAVE_ADDRESS;
        const acccountTwoIsContractAddress = await (0, utils_1.isContractAddress)(client.papi, nonSmartContractWalletAddress);
        expect(acccountOneIsContractAddress).toEqual(true);
        expect(acccountTwoIsContractAddress).toEqual(false);
    });
});
//# sourceMappingURL=misc.test.js.map