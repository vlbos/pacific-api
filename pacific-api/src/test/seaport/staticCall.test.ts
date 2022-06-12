import * as WyvernSchemas from 'wyvern-schemas'

import { OpenSeaPort } from '../../pacific-js/index'
import { Network } from '../../pacific-js/types'
import { ALICE_ADDRESS, MYTHEREUM_TOKEN_ID, MYTHEREUM_ADDRESS, ALICE_STASH_ADDRESS, MAINNET_API_KEY, DEV_API_KEY } from '../constants'
import { testFeesMakerOrder } from './fees.test'
import { getMethod, StaticCheckTxOrigin } from '../../pacific-js/contracts'
// import { testMatchingNewOrder } from './orders'
import {
  MAINNET_PROVIDER_URL, NULL_ADDRESS,
  DEV_PROVIDER_URL,
  STATIC_CALL_TX_ORIGIN_ADDRESS
} from '../../pacific-js/constants'
import { encodeCall } from '../../pacific-js/utils/schema'
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';
import { ALICE, BOB, CHARLIE, DAVE, EVE, CREATION_FEE, WSURL } from "./consts";

import * as ordersJSONFixture from '../fixtures/orders.json'

import types from '../../pacific-js/config/types.json';
import rpcs from '../../pacific-js/config/rpcs.json';
// const provider = new Web3.providers.HttpProvider(MAINNET_PROVIDER_URL)
// const devProvider = new Web3.providers.HttpProvider(DEV_PROVIDER_URL)
const provider = new WsProvider('ws://127.0.0.1:9944/');
const devProvider = new WsProvider('ws://127.0.0.1:9944/');
const client = new OpenSeaPort(provider, {
  networkName: Network.Main,
  apiKey: MAINNET_API_KEY
}, line => console.info(`MAINNET: ${line}`))

const devClient = new OpenSeaPort(devProvider, {
  networkName: Network.Dev,
  apiKey: DEV_API_KEY
}, line => console.info(`DEV: ${line}`))

describe('seaport: static calls', () => {

  test("Mainnet staticCall tx.origin can be applied to arbitrary order", async () => {
    const accountAddress = ALICE_ADDRESS
    const takerAddress = ALICE_STASH_ADDRESS
    const amountInToken = 2

    const tokenId = MYTHEREUM_TOKEN_ID.toString()
    const tokenAddress = MYTHEREUM_ADDRESS

    const order = await client._makeSellOrder({
      asset: { tokenAddress, tokenId },
      accountAddress,
      startAmount: amountInToken,
      extraBountyBasisPoints: 0,
      buyerAddress: NULL_ADDRESS,
      expirationTime: 0,
      quantity: 1,
      paymentTokenAddress: NULL_ADDRESS,
      waitForHighestBid: false
    })

    order.staticTarget = STATIC_CALL_TX_ORIGIN_ADDRESS
    // order.staticExtradata = encodeCall(getMethod(StaticCheckTxOrigin, 'succeedIfTxOriginMatchesSpecifiedAddress'), [takerAddress])

    expect(order.paymentToken).toEqual( NULL_ADDRESS)

    await client._sellOrderValidationAndApprovals({ order, accountAddress })
    // Make sure match is valid
    // await testMatchingNewOrder(order, takerAddress)
  })

  test.skip("Mainnet StaticCall Decentraland", async () => {
    // Mainnet Decentraland
    const accountAddress = '0xf293dfe0ac79c2536b9426957ac8898d6c743717' // Mainnet Decentraland Estate owner
    const takerAddress = ALICE_STASH_ADDRESS
    const amountInToken = 2

    const tokenId = '2898' // Mainnet DecentralandEstate TokenID
    const tokenAddress = '0x959e104e1a4db6317fa58f8295f586e1a978c297' // Mainnet DecentralandEstates Contract

    const asset = await client.api.getAsset({ tokenAddress, tokenId })

    const order = await client._makeSellOrder({
      asset: { tokenAddress, tokenId },
      accountAddress,
      startAmount: amountInToken,
      extraBountyBasisPoints: 0,
      buyerAddress: NULL_ADDRESS,
      expirationTime: 0,
      quantity: 1,
      paymentTokenAddress: NULL_ADDRESS,
      waitForHighestBid: false
    })

    expect(order.paymentToken).toEqual( NULL_ADDRESS)
    expect(order.basePrice.toNumber()).toEqual( Math.pow(10, 18) * amountInToken)
    expect(order.extra.toNumber()).toEqual( 0)
    expect(order.expirationTime.toNumber()).toEqual( 0)
    testFeesMakerOrder(order, asset.collection, 0)

    await client._sellOrderValidationAndApprovals({ order, accountAddress })
    // Make sure match is valid
    // await testMatchingNewOrder(order, takerAddress)
  })

  test.skip("Testnet StaticCall CheezeWizards", async () => {
    // Testnet Cheezewizards
    const accountAddress = ALICE_ADDRESS // Testnet CheezeWizards token owner
    const takerAddress = ALICE_STASH_ADDRESS
    const amountInToken = 2

     // Testnet Cheezewizards
    const tokenId = '3' // Testnet CheezeWizards TokenID
    const tokenAddress = '0x095731b672b76b00A0b5cb9D8258CD3F6E976cB2' // Testnet CheezeWizards Guild address

    const asset = await devClient.api.getAsset({ tokenAddress, tokenId })

    const order = await devClient._makeSellOrder({
      asset: { tokenAddress, tokenId },
      accountAddress,
      startAmount: amountInToken,
      extraBountyBasisPoints: 0,
      buyerAddress: NULL_ADDRESS,
      expirationTime: 0,
      quantity: 1,
      paymentTokenAddress: NULL_ADDRESS,
      waitForHighestBid: false
    })

    expect(order.paymentToken).toEqual( NULL_ADDRESS)
    expect(order.basePrice.toNumber()).toEqual( Math.pow(10, 18) * amountInToken)
    expect(order.extra.toNumber()).toEqual( 0)
    expect(order.expirationTime.toNumber()).toEqual( 0)
    testFeesMakerOrder(order, asset.collection, 0)

    await devClient._sellOrderValidationAndApprovals({ order, accountAddress })
    // Make sure match is valid
    // await testMatchingNewOrder(order, takerAddress)
  })
})
