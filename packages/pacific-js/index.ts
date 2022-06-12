import { OpenSeaPort } from './seaport'
import { OpenSeaAPI } from './api'
import { Network, EventData, EventType } from './types'

import '../interfaces/augment-api';
import '../interfaces/augment-types';
import { WsProvider } from '@polkadot/api'

export {OrderSide } from './types'
export { orderToJSON, orderFromJSON, WyvernProtocol } from './utils/utils'

// all type stuff, the only one we are using here
import type { OrderId } from 'pacific-js/interfaces';


// async function main()
// {
// const provider = new WsProvider('ws://127.0.0.1:9944/');

// const client = new OpenSeaPort(provider, {
//     networkName: Network.Main,
//     apiKey: "MAINNET_API_KEY"
// }, line => console.info(`MAINNET: ${line}`));
// // const s:OrderId = null;
// // // (async function () { 
// // console.log("=============dddddd",s)
// // await client.apipro()
// //  })
// }

//  main().catch(console.error).finally(() => process.exit());

// export {
//   encodeCall,
//   encodeSell, encodeAtomicizedBuy, encodeAtomicizedSell,
//   encodeDefaultCall, encodeReplacementPattern,
//   AbiType,
// } from './utils/schema'

/**
 * Example setup:
 *
 * import * as Web3 from 'web3'
 * import { OpenSeaPort, Network } from 'opensea-js'
 * const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')
 * const client = new OpenSeaPort(provider, {
 *   networkName: Network.Main
 * })
 */

export {
  // Main SDK export:
  OpenSeaPort,
  // So the API could be used separately:
  OpenSeaAPI,
  // Useful for serializing and deserializing orders:
  // Types to help initialize SDK and listen to events.
  // Can also be imported using e.g.
  //   import { EventType } from 'opensea-js/lib/types'
  EventData, EventType, Network
}
