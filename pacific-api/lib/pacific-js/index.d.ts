import { OpenSeaPort } from './seaport';
import { OpenSeaAPI } from './api';
import { Network, EventData, EventType } from './types';
import '../interfaces/augment-api';
import '../interfaces/augment-types';
export { OrderSide } from './types';
export { orderToJSON, orderFromJSON, WyvernProtocol } from './utils/utils';
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
export { OpenSeaPort, OpenSeaAPI, EventData, EventType, Network };
