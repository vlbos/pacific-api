"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
exports.__esModule = true;
exports.getNonCompliantApprovalAddress = exports.onDeprecated = exports.validateAndFormatWalletAddress = exports.delay = exports.assignOrdersToSides = exports.getOrderHash = exports.getWyvernBundle = exports.getWyvernAsset = exports.estimateCurrentPrice = exports.toWei = exports.makeBigNumber = exports.isContractAddress = exports.orderQueryToJSON = exports.orderToJSON = exports.orderFromJSON = exports.tokenFromJSON = exports.collectionFromJSON = exports.assetContractFromJSON = exports.assetBundleFromJSON = exports.userFromJSON = exports.accountFromJSON = exports.transactionFromJSON = exports.assetEventFromJSON = exports.assetFromJSON = exports.confirmTransaction = exports.SCHEMA_NAME_TO_ASSET_CONTRACT_TYPE = exports.annotateERC20TransferABI = exports.annotateERC721TransferABI = exports.WyvernProtocol = void 0;
var bignumber_js_1 = require("bignumber.js");
var wyvernProtocol_1 = require("../../wyvern-js/wyvernProtocol");
exports.WyvernProtocol = wyvernProtocol_1.WyvernProtocol;
var _ = require("lodash");
var types_1 = require("../../wyvern-schemas/types");
// import { ERC1155 } from '../contracts'
// import { OpenSeaPort } from '..'
var types_2 = require("../types");
var constants_1 = require("../constants");
var annotateERC721TransferABI = function (asset) { return ({
    "constant": false,
    "inputs": [
        {
            "name": "_to",
            "type": "address",
            "kind": types_1.FunctionInputKind.Replaceable
        },
        {
            "name": "_tokenId",
            "type": "uint256",
            "kind": types_1.FunctionInputKind.Asset,
            "value": asset.id
        }
    ],
    "target": asset.address,
    "name": "transfer",
    "outputs": [],
    "payable": false,
    "stateMutability": types_1.StateMutability.Nonpayable,
    "type": types_1.AbiType.Function
}); };
exports.annotateERC721TransferABI = annotateERC721TransferABI;
var annotateERC20TransferABI = function (asset) { return ({
    "constant": false,
    "inputs": [
        {
            "name": "_to",
            "type": "address",
            "kind": types_1.FunctionInputKind.Replaceable
        },
        {
            "name": "_amount",
            "type": "uint256",
            "kind": types_1.FunctionInputKind.Count,
            "value": asset.quantity
        }
    ],
    "target": asset.address,
    "name": "transfer",
    "outputs": [
        {
            "name": "success",
            "type": "bool",
            "kind": types_1.FunctionOutputKind.Other
        }
    ],
    "payable": false,
    "stateMutability": types_1.StateMutability.Nonpayable,
    "type": types_1.AbiType.Function
}); };
exports.annotateERC20TransferABI = annotateERC20TransferABI;
exports.SCHEMA_NAME_TO_ASSET_CONTRACT_TYPE = (_a = {},
    _a[types_2.WyvernSchemaName.ERC721] = types_2.AssetContractType.NonFungible,
    _a[types_2.WyvernSchemaName.ERC1155] = types_2.AssetContractType.SemiFungible,
    _a[types_2.WyvernSchemaName.ERC20] = types_2.AssetContractType.Fungible,
    _a[types_2.WyvernSchemaName.LegacyEnjin] = types_2.AssetContractType.SemiFungible,
    _a[types_2.WyvernSchemaName.ENSShortNameAuction] = types_2.AssetContractType.NonFungible,
    _a);
// OTHER
// const txCallbacks: { [key: string]: TxnCallback[] } = {}
// /**
//  * Promisify a callback-syntax web3 function
//  * @param inner callback function that accepts a Web3 callback function and passes
//  * it to the Web3 function
//  */
// async function promisify<T>(
//     inner: (fn: Web3Callback<T>) => void
//   ) {
//   return new Promise<T>((resolve, reject) =>
//     inner((err:any, res:any) => {
//       if (err) { reject(err) }
//       resolve(res)
//     })
//   )
// }
// /**
//  * Promisify a call a method on a contract,
//  * handling Parity errors. Returns '0x' if error.
//  * Note that if T is not "string", this may return a falsey
//  * value when the contract doesn't support the method (e.g. `isApprovedForAll`).
//  * @param callback An anonymous function that takes a web3 callback
//  * and returns a Web3 Contract's call result, e.g. `c => erc721.ownerOf(3, c)`
//  * @param onError callback when user denies transaction
//  */
// export async function promisifyCall<T>(
//     callback: (fn: Web3Callback<T>) => void,
//     onError?: (error: Error) => void
//   ): Promise<T | undefined> {
//   try {
//     const result: any = await promisify<T>(callback)
//     if (result == '0x') {
//       // Geth compatibility
//       return undefined
//     }
//     return result as T
//   } catch (error) {
//     // Probably method not found, and web3 is a Parity node
//     if (onError) {
//       onError(error)
//     } else {
//       console.error(error)
//     }
//     return undefined
//   }
// }
// const track = (web3: any, txHash: string, onFinalized: TxnCallback) => {
//   if (txCallbacks[txHash]) {
//     txCallbacks[txHash].push(onFinalized)
//   } else {
//     txCallbacks[txHash] = [onFinalized]
//     const poll = async () => {
//       const tx = await promisify<Web3.Transaction>(c => web3.eth.getTransaction(txHash, c))
//       if (tx && tx.blockHash && tx.blockHash !== NULL_BLOCK_HASH) {
//         const receipt = await promisify<Web3.TransactionReceipt | null>(c => web3.eth.getTransactionReceipt(txHash, c))
//         if (!receipt) {
//           // Hack: assume success if no receipt
//           console.warn('No receipt found for ', txHash)
//         }
//         const status = receipt
//           ? parseInt((receipt.status || "0").toString()) == 1
//           : true
//         txCallbacks[txHash].map(f => f(status))
//         delete txCallbacks[txHash]
//       } else {
//         setTimeout(poll, 1000)
//       }
//     }
//     poll().catch()
//   }
// }
var confirmTransaction = function (web3, txHash) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                // track(web3, txHash, (didSucceed: boolean) => {
                //   if (didSucceed) {
                resolve("Transaction complete!");
                //   } else {
                //     reject(new Error(`Transaction failed :( You might have already completed this action. See more on the mainnet at etherscan.io/tx/${txHash}`))
                //   }
                // })
            })];
    });
}); };
exports.confirmTransaction = confirmTransaction;
var assetFromJSON = function (asset) {
    var isAnimated = asset.image_url && asset.image_url.endsWith('.gif');
    var isSvg = asset.image_url && asset.image_url.endsWith('.svg');
    // console.log(asset)
    var fromJSON = {
        tokenId: asset.token_id.toString(),
        tokenAddress: asset.asset_contract.address,
        name: asset.name,
        description: asset.description,
        owner: asset.owner,
        assetContract: (0, exports.assetContractFromJSON)(asset.asset_contract),
        collection: (0, exports.collectionFromJSON)(asset.collection),
        orders: asset.orders ? asset.orders.map(exports.orderFromJSON) : null,
        sellOrders: asset.sell_orders ? asset.sell_orders.map(exports.orderFromJSON) : null,
        buyOrders: asset.buy_orders ? asset.buy_orders.map(exports.orderFromJSON) : null,
        isPresale: asset.is_presale,
        // Don't use previews if it's a special image
        imageUrl: isAnimated || isSvg
            ? asset.image_url
            : (asset.image_preview_url || asset.image_url),
        imagePreviewUrl: asset.image_preview_url,
        imageUrlOriginal: asset.image_original_url,
        imageUrlThumbnail: asset.image_thumbnail_url,
        externalLink: asset.external_link,
        openseaLink: asset.permalink,
        traits: asset.traits,
        numSales: asset.num_sales,
        lastSale: asset.last_sale ? (0, exports.assetEventFromJSON)(asset.last_sale) : null,
        backgroundColor: asset.background_color ? "#".concat(asset.background_color) : null,
        transferFee: asset.transfer_fee
            ? makeBigNumber(asset.transfer_fee)
            : null,
        transferFeePaymentToken: asset.transfer_fee_payment_token
            ? (0, exports.tokenFromJSON)(asset.transfer_fee_payment_token)
            : null
    };
    // If orders were included, put them in sell/buy order groups
    if (fromJSON.orders && !fromJSON.sellOrders) {
        fromJSON.sellOrders = fromJSON.orders.filter(function (o) { return o.side == types_2.OrderSide.Sell; });
    }
    if (fromJSON.orders && !fromJSON.buyOrders) {
        fromJSON.buyOrders = fromJSON.orders.filter(function (o) { return o.side == types_2.OrderSide.Buy; });
    }
    return fromJSON;
};
exports.assetFromJSON = assetFromJSON;
var assetEventFromJSON = function (assetEvent) {
    return {
        eventType: assetEvent.event_type,
        eventTimestamp: assetEvent.event_timestamp,
        auctionType: assetEvent.auction_type,
        totalPrice: assetEvent.total_price,
        transaction: assetEvent.transaction ? (0, exports.transactionFromJSON)(assetEvent.transaction) : null,
        paymentToken: assetEvent.payment_token ? (0, exports.tokenFromJSON)(assetEvent.payment_token) : null
    };
};
exports.assetEventFromJSON = assetEventFromJSON;
var transactionFromJSON = function (transaction) {
    return {
        fromAccount: (0, exports.accountFromJSON)(transaction.from_account),
        toAccount: (0, exports.accountFromJSON)(transaction.to_account),
        createdDate: new Date("".concat(transaction.created_date, "Z")),
        modifiedDate: new Date("".concat(transaction.modified_date, "Z")),
        transactionHash: transaction.transaction_hash,
        transactionIndex: transaction.transaction_index,
        blockNumber: transaction.block_number,
        blockHash: transaction.block_hash,
        timestamp: new Date("".concat(transaction.timestamp, "Z"))
    };
};
exports.transactionFromJSON = transactionFromJSON;
var accountFromJSON = function (account) {
    return {
        address: account.address,
        config: account.config,
        profileImgUrl: account.profile_img_url,
        user: account.user ? (0, exports.userFromJSON)(account.user) : null
    };
};
exports.accountFromJSON = accountFromJSON;
var userFromJSON = function (user) {
    return {
        username: user.username
    };
};
exports.userFromJSON = userFromJSON;
var assetBundleFromJSON = function (asset_bundle) {
    var fromJSON = {
        maker: asset_bundle.maker,
        assets: asset_bundle.assets.map(exports.assetFromJSON),
        assetContract: asset_bundle.asset_contract
            ? (0, exports.assetContractFromJSON)(asset_bundle.asset_contract)
            : undefined,
        name: asset_bundle.name,
        slug: asset_bundle.slug,
        description: asset_bundle.description,
        externalLink: asset_bundle.external_link,
        permalink: asset_bundle.permalink,
        sellOrders: asset_bundle.sell_orders ? asset_bundle.sell_orders.map(exports.orderFromJSON) : null
    };
    return fromJSON;
};
exports.assetBundleFromJSON = assetBundleFromJSON;
var assetContractFromJSON = function (asset_contract) {
    return {
        name: asset_contract.name,
        description: asset_contract.description,
        type: asset_contract.asset_contract_type,
        schemaName: asset_contract.schema_name,
        address: asset_contract.address,
        tokenSymbol: asset_contract.symbol,
        buyerFeeBasisPoints: +asset_contract.buyer_fee_basis_points,
        sellerFeeBasisPoints: +asset_contract.seller_fee_basis_points,
        openseaBuyerFeeBasisPoints: +asset_contract.opensea_buyer_fee_basis_points,
        openseaSellerFeeBasisPoints: +asset_contract.opensea_seller_fee_basis_points,
        devBuyerFeeBasisPoints: +asset_contract.dev_buyer_fee_basis_points,
        devSellerFeeBasisPoints: +asset_contract.dev_seller_fee_basis_points,
        imageUrl: asset_contract.image_url,
        externalLink: asset_contract.external_link,
        wikiLink: asset_contract.wiki_link
    };
};
exports.assetContractFromJSON = assetContractFromJSON;
var collectionFromJSON = function (collection) {
    var createdDate = new Date("".concat(collection.created_date, "Z"));
    return {
        createdDate: createdDate,
        name: collection.name,
        description: collection.description,
        slug: collection.slug,
        editors: collection.editors,
        hidden: collection.hidden,
        featured: collection.featured,
        featuredImageUrl: collection.featured_image_url,
        displayData: collection.display_data,
        paymentTokens: (collection.payment_tokens || []).map(exports.tokenFromJSON),
        openseaBuyerFeeBasisPoints: +collection.opensea_buyer_fee_basis_points,
        openseaSellerFeeBasisPoints: +collection.opensea_seller_fee_basis_points,
        devBuyerFeeBasisPoints: +collection.dev_buyer_fee_basis_points,
        devSellerFeeBasisPoints: +collection.dev_seller_fee_basis_points,
        payoutAddress: collection.payout_address,
        imageUrl: collection.image_url,
        largeImageUrl: collection.large_image_url,
        stats: collection.stats,
        traitStats: collection.traits,
        externalLink: collection.external_url,
        wikiLink: collection.wiki_url
    };
};
exports.collectionFromJSON = collectionFromJSON;
var tokenFromJSON = function (token) {
    var fromJSON = {
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals,
        address: token.address,
        imageUrl: token.image_url,
        ethPrice: token.eth_price,
        usdPrice: token.usd_price
    };
    return fromJSON;
};
exports.tokenFromJSON = tokenFromJSON;
var orderFromJSON = function (order) {
    // console.log("order.fee_recipient========", order.fee_recipient)
    var createdDate = new Date("".concat(order.created_date, "Z"));
    var fromJSON = {
        hash: order.order_hash || order.hash,
        cancelledOrFinalized: order.cancelled || order.finalized,
        markedInvalid: order.marked_invalid,
        metadata: order.metadata,
        quantity: new bignumber_js_1["default"](order.quantity || 1),
        exchange: order.exchange,
        makerAccount: order.maker,
        takerAccount: order.taker,
        // Use string address to conform to Wyvern Order schema
        maker: order.maker.address,
        taker: order.taker.address,
        makerRelayerFee: new bignumber_js_1["default"](order.maker_relayer_fee),
        takerRelayerFee: new bignumber_js_1["default"](order.taker_relayer_fee),
        makerProtocolFee: new bignumber_js_1["default"](order.maker_protocol_fee),
        takerProtocolFee: new bignumber_js_1["default"](order.taker_protocol_fee),
        makerReferrerFee: new bignumber_js_1["default"](order.maker_referrer_fee || 0),
        waitingForBestCounterOrder: order.fee_recipient.address == constants_1.NULL_ADDRESS,
        feeMethod: order.fee_method,
        feeRecipientAccount: order.fee_recipient,
        feeRecipient: order.fee_recipient.address,
        side: order.side,
        saleKind: order.sale_kind,
        target: order.target,
        howToCall: order.how_to_call,
        calldata: order.calldata,
        replacementPattern: order.replacement_pattern,
        staticTarget: order.static_target,
        staticExtradata: order.static_extradata,
        paymentToken: order.payment_token,
        basePrice: new bignumber_js_1["default"](order.base_price),
        extra: new bignumber_js_1["default"](order.extra),
        currentBounty: new bignumber_js_1["default"](order.current_bounty || 0),
        currentPrice: new bignumber_js_1["default"](order.current_price || 0),
        createdTime: new bignumber_js_1["default"](Math.round(createdDate.getTime() / 1000)),
        listingTime: new bignumber_js_1["default"](order.listing_time),
        expirationTime: new bignumber_js_1["default"](order.expiration_time),
        salt: new bignumber_js_1["default"](order.salt),
        v: parseInt(order.v),
        r: order.r,
        s: order.s,
        paymentTokenContract: order.payment_token_contract ? (0, exports.tokenFromJSON)(order.payment_token_contract) : undefined,
        asset: order.asset ? (0, exports.assetFromJSON)(order.asset) : undefined,
        assetBundle: order.asset_bundle ? (0, exports.assetBundleFromJSON)(order.asset_bundle) : undefined
    };
    // Use client-side price calc, to account for buyer fee (not added by server) and latency
    fromJSON.currentPrice = estimateCurrentPrice(fromJSON);
    return fromJSON;
};
exports.orderFromJSON = orderFromJSON;
/**
 * Convert an order to JSON, hashing it as well if necessary
 * @param order order (hashed or unhashed)
 */
var orderToJSON = function (order) {
    var asJSON = {
        exchange: order.exchange,
        maker: order.maker,
        taker: order.taker,
        makerRelayerFee: order.makerRelayerFee.toString(),
        takerRelayerFee: order.takerRelayerFee.toString(),
        makerProtocolFee: order.makerProtocolFee.toString(),
        takerProtocolFee: order.takerProtocolFee.toString(),
        makerReferrerFee: order.makerReferrerFee.toString(),
        feeMethod: order.feeMethod,
        feeRecipient: order.feeRecipient,
        side: order.side,
        saleKind: order.saleKind,
        target: order.target,
        howToCall: order.howToCall,
        calldata: order.calldata,
        replacementPattern: order.replacementPattern,
        staticTarget: order.staticTarget,
        staticExtradata: order.staticExtradata,
        paymentToken: order.paymentToken,
        quantity: order.quantity.toString(),
        basePrice: order.basePrice.toString(),
        englishAuctionReservePrice: order.englishAuctionReservePrice ? order.englishAuctionReservePrice.toString() : undefined,
        extra: order.extra.toString(),
        createdTime: order.createdTime
            ? order.createdTime.toString()
            : undefined,
        listingTime: order.listingTime.toString(),
        expirationTime: order.expirationTime.toString(),
        salt: order.salt.toString(),
        metadata: order.metadata,
        v: order.v,
        r: order.r,
        s: order.s,
        hash: order.hash
    };
    return asJSON;
};
exports.orderToJSON = orderToJSON;
var orderQueryToJSON = function (order) {
    var orderQueryProps = ["owner",
        "sale_kind",
        "asset_contract_address",
        "payment_token_address",
        "is_english",
        "is_expired",
        "bundled",
        "include_invalid",
        "token_id",
        "token_ids",
        "listed_after",
        "listed_before",
        "limit",
        "offset"];
    var params = {};
    Object.keys(order).reduce(function (o, v) {
        if (-1 == orderQueryProps.indexOf(v)) {
            o[v] = order[v];
        }
        return o;
    }, params);
    var asJSON = {};
    var orderQueryMinProps = ["owner",
        "token_ids",
        "limit",
        "offset"];
    orderQueryMinProps.map(function (o) {
        if (order.hasOwnProperty(o)) {
            asJSON[o] = order[o];
        }
    });
    if (order.hasOwnProperty("token_id")) {
        if (asJSON.hasOwnProperty("token_ids")) {
            asJSON.token_ids.push(order["token_id"]);
        }
        else {
            asJSON.token_ids = [order["token_id"]];
        }
    }
    // asJSON.params = orderJSONToHexArray(params)
    return asJSON;
};
exports.orderQueryToJSON = orderQueryToJSON;
// /**
//  * Sign messages using web3 personal signatures
//  * @param web3 Web3 instance
//  * @param message message to sign
//  * @param signerAddress web3 address signing the message
//  * @returns A signature if provider can sign, otherwise null
//  */
// export async function personalSignAsync(web3: Web3, message: string, signerAddress: string
//   ): Promise<ECSignature> {
//   const signature = await promisify<Web3.JSONRPCResponsePayload>(c => web3.currentProvider.sendAsync({
//       method: 'personal_sign',
//       params: [message, signerAddress],
//       from: signerAddress,
//       id: new Date().getTime()
//     } as any, c)
//   )
//   const error = (signature as any).error
//   if (error) {
//     throw new Error(error)
//   }
//   return parseSignatureHex(signature.result)
// }
/**
 * Checks whether a given address contains any code
 * @param web3 Web3 instance
 * @param address input address
 */
function isContractAddress(web3, address) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // const code = "await promisify<string>(c => web3.eth.getCode(address, c))"
            return [2 /*return*/, true]; // code !== '0x'
        });
    });
}
exports.isContractAddress = isContractAddress;
/**
 * Special fixes for making BigNumbers using web3 results
 * @param arg An arg or the result of a web3 call to turn into a BigNumber
 */
function makeBigNumber(arg) {
    // Zero sometimes returned as 0x from contracts
    if (arg === '0x') {
        arg = 0;
    }
    // fix "new BigNumber() number type has more than 15 significant digits"
    arg = arg.toString();
    return new bignumber_js_1["default"](arg);
}
exports.makeBigNumber = makeBigNumber;
function toWei(arg, decimals) {
    arg = Math.pow(10, decimals) * arg;
    return new bignumber_js_1["default"](arg.toString());
}
exports.toWei = toWei;
// /**
//  * Send a transaction to the blockchain and optionally confirm it
//  * @param web3 Web3 instance
//  * @param param0 __namedParameters
//  * @param from address sending transaction
//  * @param to destination contract address
//  * @param data data to send to contract
//  * @param gasPrice gas price to use. If unspecified, uses web3 default (mean gas price)
//  * @param value value in ETH to send with data. Defaults to 0
//  * @param onError callback when user denies transaction
//  */
// export async function sendRawTransaction(
//     web3: Web3,
//     {from, to, data, gasPrice, value = 0, gas}: Web3.TxData,
//     onError: (error: Error) => void
//   ): Promise<string> {
//   if (gas == null) {
//     // This gas cannot be increased due to an ethjs error
//     gas = await estimateGas(web3, { from, to, data, value })
//   }
//   try {
//     const txHashRes = await promisify<string>(c => web3.eth.sendTransaction({
//       from,
//       to,
//       value,
//       data,
//       gas,
//       gasPrice
//     }, c))
//     return txHashRes.toString()
//   } catch (error) {
//     onError(error)
//     throw error
//   }
// }
// /**
//  * Call a method on a contract, sending arbitrary data and
//  * handling Parity errors. Returns '0x' if error.
//  * @param web3 Web3 instance
//  * @param param0 __namedParameters
//  * @param from address sending call
//  * @param to destination contract address
//  * @param data data to send to contract
//  * @param onError callback when user denies transaction
//  */
// export async function rawCall(
//     web3: Web3,
//     { from, to, data }: Web3.CallData,
//     onError?: (error: Error) => void
//   ): Promise<string> {
//   try {
//     const result = await promisify<string>(c => web3.eth.call({
//       from,
//       to,
//       data
//     }, c))
//     return result
//   } catch (error) {
//     // Probably method not found, and web3 is a Parity node
//     if (onError) {
//       onError(error)
//     }
//     // Backwards compatibility with Geth nodes
//     return '0x'
//   }
// }
// /**
//  * Estimate Gas usage for a transaction
//  * @param web3 Web3 instance
//  * @param from address sending transaction
//  * @param to destination contract address
//  * @param data data to send to contract
//  * @param value value in ETH to send with data
//  */
// export async function estimateGas(
//     web3: Web3,
//     {from, to, data, value = 0 }: Web3.TxData
//   ): Promise<number> {
//   const amount = await promisify<number>(c => web3.eth.estimateGas({
//     from,
//     to,
//     value,
//     data,
//   }, c))
//   return amount
// }
// /**
//  * Get mean gas price for sending a txn, in wei
//  * @param web3 Web3 instance
//  */
// export async function getCurrentGasPrice(web3: Web3): Promise<BigNumber> {
//   const meanGas = await promisify<BigNumber>(c => web3.eth.getGasPrice(c))
//   return meanGas
// }
// /**
//  * Get current transfer fees for an asset
//  * @param web3 Web3 instance
//  * @param asset The asset to check for transfer fees
//  */
// export async function getTransferFeeSettings(
//     web3: Web3,
//     { asset, accountAddress }: {
//       asset: Asset;
//       accountAddress?: string;
//     }
//   ) {
//   let transferFee: BigNumber | undefined
//   let transferFeeTokenAddress: string | undefined
//   if (asset.tokenAddress.toLowerCase() == ENJIN_ADDRESS.toLowerCase()) {
//     // Enjin asset
//     const feeContract = web3.eth.contract(ERC1155 as any).at(asset.tokenAddress)
//     const params = await promisifyCall<any[]>(c => feeContract.transferSettings(
//         asset.tokenId,
//         { from: accountAddress },
//       c)
//     )
//     if (params) {
//       transferFee = makeBigNumber(params[3])
//       if (params[2] == 0) {
//         transferFeeTokenAddress = ENJIN_COIN_ADDRESS
//       }
//     }
//   }
//   return { transferFee, transferFeeTokenAddress }
// }
// // sourced from 0x.js:
// // https://github.com/ProjectWyvern/wyvern-js/blob/39999cb93ce5d80ea90b4382182d1bd4339a9c6c/src/utils/signature_utils.ts
// function parseSignatureHex(signature: string): ECSignature {
//   // HACK: There is no consensus on whether the signatureHex string should be formatted as
//   // v + r + s OR r + s + v, and different clients (even different versions of the same client)
//   // return the signature params in different orders. In order to support all client implementations,
//   // we parse the signature in both ways, and evaluate if either one is a valid signature.
//   const validVParamValues = [27, 28]
//   const ecSignatureRSV = _parseSignatureHexAsRSV(signature)
//   if (_.includes(validVParamValues, ecSignatureRSV.v)) {
//     return ecSignatureRSV
//   }
//   // For older clients
//   const ecSignatureVRS = _parseSignatureHexAsVRS(signature)
//   if (_.includes(validVParamValues, ecSignatureVRS.v)) {
//     return ecSignatureVRS
//   }
//   throw new Error('Invalid signature')
//   function _parseSignatureHexAsVRS(signatureHex: string) {
//     const signatureBuffer: any = ethUtil.toBuffer(signatureHex)
//     let v = signatureBuffer[0]
//     if (v < 27) {
//       v += 27
//     }
//     const r = signatureBuffer.slice(1, 33)
//     const s = signatureBuffer.slice(33, 65)
//     const ecSignature = {
//       v,
//       r: ethUtil.bufferToHex(r),
//       s: ethUtil.bufferToHex(s),
//     }
//     return ecSignature
//   }
//   function _parseSignatureHexAsRSV(signatureHex: string) {
//     const { v, r, s } = ethUtil.fromRpcSig(signatureHex)
//     const ecSignature = {
//         v,
//         r: ethUtil.bufferToHex(r),
//         s: ethUtil.bufferToHex(s),
//     }
//     return ecSignature
//   }
// }
/**
 * Estimates the price of an order
 * @param order The order to estimate price on
 * @param secondsToBacktrack The number of seconds to subtract on current time,
 *  to fix race conditions
 * @param shouldRoundUp Whether to round up fractional wei
 */
function estimateCurrentPrice(order, secondsToBacktrack, shouldRoundUp) {
    if (secondsToBacktrack === void 0) { secondsToBacktrack = 30; }
    if (shouldRoundUp === void 0) { shouldRoundUp = true; }
    var basePrice = order.basePrice, listingTime = order.listingTime, expirationTime = order.expirationTime, extra = order.extra;
    var side = order.side, takerRelayerFee = order.takerRelayerFee, saleKind = order.saleKind;
    var now = new bignumber_js_1["default"](Math.round(Date.now() / 1000)).minus(secondsToBacktrack);
    basePrice = new bignumber_js_1["default"](basePrice);
    listingTime = new bignumber_js_1["default"](listingTime);
    expirationTime = new bignumber_js_1["default"](expirationTime);
    extra = new bignumber_js_1["default"](extra);
    var exactPrice = basePrice;
    if (saleKind === types_2.SaleKind.FixedPrice) {
        // Do nothing, price is correct
    }
    else if (saleKind === types_2.SaleKind.DutchAuction) {
        var diff = extra.times(now.minus(listingTime))
            .dividedBy(expirationTime.minus(listingTime));
        exactPrice = side == types_2.OrderSide.Sell
            /* Sell-side - start price: basePrice. End price: basePrice - extra. */
            ? basePrice.minus(diff)
            /* Buy-side - start price: basePrice. End price: basePrice + extra. */
            : basePrice.plus(diff);
    }
    // Add taker fee only for buyers
    if (side === types_2.OrderSide.Sell && !order.waitingForBestCounterOrder) {
        // Buyer fee increases sale price
        exactPrice = exactPrice.times(+takerRelayerFee / constants_1.INVERSE_BASIS_POINT + 1);
    }
    return shouldRoundUp ? exactPrice.integerValue(bignumber_js_1["default"].ROUND_CEIL) : exactPrice;
}
exports.estimateCurrentPrice = estimateCurrentPrice;
/**
 * Get the Wyvern representation of a fungible asset
 * @param schema The WyvernSchema needed to access this asset
 * @param asset The asset to trade
 * @param quantity The number of items to trade
 */
function getWyvernAsset(schema, asset, quantity) {
    if (quantity === void 0) { quantity = new bignumber_js_1["default"](1); }
    var tokenId = asset.tokenId != null
        ? asset.tokenId.toString()
        : undefined;
    return schema.assetFromFields({
        'ID': tokenId,
        'Quantity': quantity.toString(),
        'Address': asset.tokenAddress,
        'Name': asset.name
    });
}
exports.getWyvernAsset = getWyvernAsset;
/**
 * Get the Wyvern representation of a group of assets
 * Sort order is enforced here. Throws if there's a duplicate.
 * @param assets Assets to bundle
 * @param schemas The WyvernSchemas needed to access each asset, respectively
 * @param quantities The quantity of each asset to bundle, respectively
 */
function getWyvernBundle(assets, schemas, quantities) {
    if (assets.length != quantities.length) {
        throw new Error("Bundle must have a quantity for every asset");
    }
    if (assets.length != schemas.length) {
        throw new Error("Bundle must have a schema for every asset");
    }
    //:{asset: WyvernAsset, i:Number}
    var wyAssets = assets.map(function (asset, i) { return getWyvernAsset(schemas[i], asset, quantities[i]); });
    var sorters = [
        function (assetAndSchema) { return assetAndSchema.asset.address; },
        function (assetAndSchema) { return assetAndSchema.asset.id || 0; }
    ];
    var wyAssetsAndSchemas = wyAssets.map(function (asset, i) { return ({
        asset: asset,
        schema: schemas[i].name
    }); });
    var uniqueAssets = _.uniqBy(wyAssetsAndSchemas, function (group) { return "".concat(sorters[0](group), "-").concat(sorters[1](group)); });
    if (uniqueAssets.length != wyAssetsAndSchemas.length) {
        throw new Error("Bundle can't contain duplicate assets");
    }
    var sortedWyAssetsAndSchemas = _.sortBy(wyAssetsAndSchemas, sorters);
    return {
        assets: sortedWyAssetsAndSchemas.map(function (group) { return group.asset; }),
        schemas: sortedWyAssetsAndSchemas.map(function (group) { return group.schema; })
    };
}
exports.getWyvernBundle = getWyvernBundle;
/**
 * Get the non-prefixed hash for the order
 * (Fixes a Wyvern typescript issue and casing issue)
 * @param order order to hash
 */
function getOrderHash(order) {
    var orderWithStringTypes = __assign(__assign({}, order), { maker: order.maker, taker: order.taker, feeRecipient: order.feeRecipient, side: order.side.toString(), saleKind: order.saleKind.toString(), howToCall: order.howToCall.toString(), feeMethod: order.feeMethod.toString() });
    return wyvernProtocol_1.WyvernProtocol.getOrderHashHex(orderWithStringTypes);
}
exports.getOrderHash = getOrderHash;
/**
 * Assign an order and a new matching order to their buy/sell sides
 * @param order Original order
 * @param matchingOrder The result of _makeMatchingOrder
 */
function assignOrdersToSides(order, matchingOrder) {
    var isSellOrder = order.side == types_2.OrderSide.Sell;
    var buy;
    var sell;
    if (!isSellOrder) {
        buy = order;
        sell = __assign(__assign({}, matchingOrder), { v: buy.v, r: buy.r, s: buy.s });
    }
    else {
        sell = order;
        buy = __assign(__assign({}, matchingOrder), { v: sell.v, r: sell.r, s: sell.s });
    }
    return { buy: buy, sell: sell };
}
exports.assignOrdersToSides = assignOrdersToSides;
// BROKEN
// TODO fix this calldata for buy orders
// async function canSettleOrder(client: OpenSeaPort, order: Order, matchingOrder: Order): Promise<boolean> {
//     console.log(client)
//     // HACK that doesn't always work
//     //  to change null address to 0x1111111... for replacing calldata
//     // const calldata = order.calldata.slice(0, 98) + "1111111111111111111111111111111111111111" + order.calldata.slice(138)
//     const seller = order.side == OrderSide.Buy ? matchingOrder.maker : order.maker
//     const proxy = false// await client._getProxy(seller)
//     if (!proxy) {
//         console.warn(`No proxy found for seller ${seller}`)
//         return false
//     }
//     //   const contract = (client.web3.eth.contract([proxyABI])).at(proxy)
//     return new Promise<boolean>((resolve, reject) => resolve(true)
//         // contract.proxy.call(
//         //   order.target,
//         //   order.howToCall,
//         //   calldata,
//         //   {from: seller},
//         // c)
//     )
// }
/**
 * Delay using setTimeout
 * @param ms milliseconds to wait
 */
function delay(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res) { return setTimeout(res, ms); })];
        });
    });
}
exports.delay = delay;
/**
 * Validates that an address exists, isn't null, and is properly
 * formatted for Wyvern and OpenSea
 * @param address input address
 */
function validateAndFormatWalletAddress(web3, address) {
    if (!address) {
        throw new Error('No wallet address found');
    }
    //   if (!web3.isAddress(address)) {
    //     throw new Error('Invalid wallet address')
    //   }
    if (address == constants_1.NULL_ADDRESS) {
        throw new Error('Wallet cannot be the null address');
    }
    return address;
}
exports.validateAndFormatWalletAddress = validateAndFormatWalletAddress;
/**
 * Notify developer when a pattern will be deprecated
 * @param msg message to log to console
 */
function onDeprecated(msg) {
    console.warn("DEPRECATION NOTICE: ".concat(msg));
}
exports.onDeprecated = onDeprecated;
/**
 * Get special-case approval addresses for an erc721 contract
 * @param erc721Contract contract to check
 */
function getNonCompliantApprovalAddress(erc721Contract, tokenId, accountAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all([accountAddress
                        // // CRYPTOKITTIES check
                        // promisifyCall<string>(c => erc721Contract.kittyIndexToApproved.call(tokenId, c)),
                        // // Etherbots check
                        // promisifyCall<string>(c => erc721Contract.partIndexToApproved.call(tokenId, c)),
                    ])];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, _.compact(results)[0]];
            }
        });
    });
}
exports.getNonCompliantApprovalAddress = getNonCompliantApprovalAddress;
