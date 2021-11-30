import { OpenSeaPort } from '../../pacific-js/index'
import { Network, Asset, WyvernSchemaName } from '../../pacific-js/types'
import { getCurrentGasPrice, getNonCompliantApprovalAddress, isContractAddress} from '../../pacific-js/utils/utils'
import { ALICE_ADDRESS, MAINNET_API_KEY, CK_TOKEN_ID, ALICE_STASH_ADDRESS, DAVE_ADDRESS, EVE_ADDRESS,WDOT_ADDRESS} from '../../pacific-js/constants'
import { ERC721 } from '../../pacific-js/contracts'
import {
  CK_ADDRESS,
  MAINNET_PROVIDER_URL,
  MAX_UINT_256
} from '../../pacific-js/constants'

// const provider = new Web3.providers.HttpProvider(MAINNET_PROVIDER_URL)
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';
import { ALICE, BOB, CHARLIE, DAVE, EVE, CREATION_FEE, WSURL } from "./consts";

// import { submit, users } from '../orders/lib/submit-signed-tx';
import * as ordersJSONFixture from '../fixtures/orders.json'

import types from '../../pacific-js/config/types.json';
import rpcs from '../../pacific-js/config/rpcs.json';
const provider = new WsProvider('ws://127.0.0.1:9944/');
const devProvider = new WsProvider('ws://127.0.0.1:9944/');

const client = new OpenSeaPort(provider, {
  networkName: Network.Main,
  apiKey: MAINNET_API_KEY
}, line => console.info(`MAINNET: ${line}`))

describe('seaport: misc', () => {

  test('Instance has public methods', () => {
    expect(typeof client.getCurrentPrice).toEqual( 'function')
    expect(typeof client.wrapEth).toEqual( 'function')
  })

  test('Instance exposes API methods', () => {
    expect(typeof client.api.getOrder).toEqual( 'function')
    expect(typeof client.api.getOrders).toEqual( 'function')
    expect(typeof client.api.postOrder).toEqual( 'function')
  })

  test('Instance exposes some underscored methods', () => {
    expect(typeof client._initializeProxy).toEqual( 'function')
    expect(typeof client._getProxy).toEqual( 'function')
  })

  test('Uses a gas price above the mean', async () => {
    const gasPrice = await client._computeGasPrice()
    const meanGasPrice = await getCurrentGasPrice(client.papi)
    expect(meanGasPrice.toNumber()).toBeGreaterThan( 0)
    expect(gasPrice.toNumber()).toBeGreaterThan( meanGasPrice.toNumber())
  })

  test('Fetches proxy for an account', async () => {
    const accountAddress = ALICE_ADDRESS
    const proxy = await client._getProxy(accountAddress)
    expect(proxy).not.toBeNull()
  })

  test('Fetches positive token balance for an account', async () => {
    const accountAddress = ALICE_ADDRESS
    const balance = await client.getTokenBalance({ accountAddress, tokenAddress:WDOT_ADDRESS })
    expect(balance.toNumber()).toBeGreaterThan( 0)
  })

  test('Accounts have maximum token balance approved', async () => {
    const accountAddress = ALICE_ADDRESS
    const approved = await client._getApprovedTokenCount({ accountAddress })
    expect(approved.toString()).toEqual( MAX_UINT_256.toString())
  })

  test('Single-approval tokens are approved for tester address', async () => {
    const accountAddress = ALICE_STASH_ADDRESS
    const proxyAddress = await client._getProxy(accountAddress)
    const tokenId = CK_TOKEN_ID.toString()
    const tokenAddress = CK_ADDRESS
    const erc721 = await client.papi.eth.contract(ERC721 as any).at(tokenAddress)
    const approvedAddress = await getNonCompliantApprovalAddress(erc721, tokenId, accountAddress)
    expect(approvedAddress).toEqual( proxyAddress)
  })

  test('Checks whether an address is a contract addrress', async () => {
    const smartContractWalletAddress = EVE_ADDRESS
    const acccountOneIsContractAddress = await isContractAddress(client.papi, smartContractWalletAddress)
    const nonSmartContractWalletAddress = DAVE_ADDRESS
    const acccountTwoIsContractAddress = await isContractAddress(client.papi, nonSmartContractWalletAddress)
    expect(acccountOneIsContractAddress).toEqual( true)
    expect(acccountTwoIsContractAddress).toEqual( false)
  })

})
