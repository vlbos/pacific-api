import BigNumber from 'bignumber.js';
import { WyvernProtocol } from '../../wyvern-js/wyvernProtocol';
import { AnnotatedFunctionABI, Schema } from '../../wyvern-schemas/types';
import { Asset, AssetContractType, AssetEvent, OpenSeaAccount, OpenSeaAsset, OpenSeaAssetBundle, OpenSeaAssetContract, OpenSeaCollection, OpenSeaFungibleToken, OpenSeaUser, Order, OrderJSON, Transaction, UnhashedOrder, UnsignedOrder, WyvernAsset, WyvernFTAsset, WyvernNFTAsset, WyvernSchemaName } from '../types';
export { WyvernProtocol };
export declare const annotateERC721TransferABI: (asset: WyvernNFTAsset) => AnnotatedFunctionABI;
export declare const annotateERC20TransferABI: (asset: WyvernFTAsset) => AnnotatedFunctionABI;
export declare const SCHEMA_NAME_TO_ASSET_CONTRACT_TYPE: {
    [key in WyvernSchemaName]: AssetContractType;
};
export declare const confirmTransaction: (web3: any, txHash: string) => Promise<unknown>;
export declare const assetFromJSON: (asset: any) => OpenSeaAsset;
export declare const assetEventFromJSON: (assetEvent: any) => AssetEvent;
export declare const transactionFromJSON: (transaction: any) => Transaction;
export declare const accountFromJSON: (account: any) => OpenSeaAccount;
export declare const userFromJSON: (user: any) => OpenSeaUser;
export declare const assetBundleFromJSON: (asset_bundle: any) => OpenSeaAssetBundle;
export declare const assetContractFromJSON: (asset_contract: any) => OpenSeaAssetContract;
export declare const collectionFromJSON: (collection: any) => OpenSeaCollection;
export declare const tokenFromJSON: (token: any) => OpenSeaFungibleToken;
export declare const orderFromJSON: (order: any) => Order;
/**
 * Convert an order to JSON, hashing it as well if necessary
 * @param order order (hashed or unhashed)
 */
export declare const orderToJSON: (order: Order) => OrderJSON;
export declare const orderQueryToJSON: (order: any) => any;
/**
 * Checks whether a given address contains any code
 * @param web3 Web3 instance
 * @param address input address
 */
export declare function isContractAddress(web3: any, address: string): Promise<boolean>;
/**
 * Special fixes for making BigNumbers using web3 results
 * @param arg An arg or the result of a web3 call to turn into a BigNumber
 */
export declare function makeBigNumber(arg: number | string | BigNumber): BigNumber;
export declare function toWei(arg: number, decimals: number): BigNumber;
/**
 * Estimates the price of an order
 * @param order The order to estimate price on
 * @param secondsToBacktrack The number of seconds to subtract on current time,
 *  to fix race conditions
 * @param shouldRoundUp Whether to round up fractional wei
 */
export declare function estimateCurrentPrice(order: Order, secondsToBacktrack?: number, shouldRoundUp?: boolean): BigNumber;
/**
 * Get the Wyvern representation of a fungible asset
 * @param schema The WyvernSchema needed to access this asset
 * @param asset The asset to trade
 * @param quantity The number of items to trade
 */
export declare function getWyvernAsset(schema: Schema<WyvernAsset>, asset: Asset, quantity?: BigNumber): any;
/**
 * Get the Wyvern representation of a group of assets
 * Sort order is enforced here. Throws if there's a duplicate.
 * @param assets Assets to bundle
 * @param schemas The WyvernSchemas needed to access each asset, respectively
 * @param quantities The quantity of each asset to bundle, respectively
 */
export declare function getWyvernBundle(assets: any, schemas: any, quantities: BigNumber[]): any;
/**
 * Get the non-prefixed hash for the order
 * (Fixes a Wyvern typescript issue and casing issue)
 * @param order order to hash
 */
export declare function getOrderHash(order: UnhashedOrder): string;
/**
 * Assign an order and a new matching order to their buy/sell sides
 * @param order Original order
 * @param matchingOrder The result of _makeMatchingOrder
 */
export declare function assignOrdersToSides(order: Order, matchingOrder: UnsignedOrder): {
    buy: Order;
    sell: Order;
};
/**
 * Delay using setTimeout
 * @param ms milliseconds to wait
 */
export declare function delay(ms: number): Promise<unknown>;
/**
 * Validates that an address exists, isn't null, and is properly
 * formatted for Wyvern and OpenSea
 * @param address input address
 */
export declare function validateAndFormatWalletAddress(web3: any, address: string): string;
/**
 * Notify developer when a pattern will be deprecated
 * @param msg message to log to console
 */
export declare function onDeprecated(msg: string): void;
/**
 * Get special-case approval addresses for an erc721 contract
 * @param erc721Contract contract to check
 */
export declare function getNonCompliantApprovalAddress(erc721Contract: any, tokenId: string, accountAddress: string): Promise<string | undefined>;
