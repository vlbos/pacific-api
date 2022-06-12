"use strict";
exports.__esModule = true;
exports.WyvernProtocol = void 0;
// import { SchemaValidator } from '@0xproject/json-schemas'
// import { BigNumber, intervalUtils } from '@0xproject/utils'
// import { Web3Wrapper } from '@0xproject/web3-wrapper'
// import * as ethABI from 'ethereumjs-abi'
// import * as ethUtil from 'ethereumjs-util'
var bignumber_js_1 = require("bignumber.js");
var api_contract_1 = require("@polkadot/api-contract");
// const erc20metadata = require("./abisv2/erc20/metadata.json");
// const erc721metadata = require("./abisv2/erc721/metadata.json");
var msigmetadata = require("./abisv2/multisig/metadata.json");
var wyvern_proxy_registry_metadata = require("./abisv2/wyvern_proxy_registry/metadata.json");
// import * as definitions from '../interfaces/definitions';
require("../interfaces/augment-api");
require("../interfaces/augment-types");
// import rpcs from '../orders/lib/rpcs.json'
var types_1 = require("./types");
// import { schemas } from './schemas'
// import { AbiDecoder } from './utils/abi_decoder'
// import { assert } from './utils/assert'
var constants_1 = require("./utils/constants");
// import { decorators } from './utils/decorators'
// import { signatureUtils } from './utils/signature_utils'
var utils_1 = require("./utils/utils");
// import { WyvernAtomicizerContract } from './abi_gen/wyvern_atomicizer'
// import { WyvernDAOContract } from './abi_gen/wyvern_d_a_o'
// import { WyvernExchangeContract } from './abi_gen/wyvern_exchange'
// import { WyvernProxyRegistryContract } from './abi_gen/wyvern_proxy_registry'
// import { WyvernTokenContract } from './abi_gen/wyvern_token'
var WyvernProtocol = /** @class */ (function () {
    function WyvernProtocol(provider, api, config) {
        this.provider = provider;
        this.api = api;
        // assert.isWeb3Provider('provider', provider)
        // // assert.doesConformToSchema('config', config, wyvernProtocolConfigSchema)
        // this._web3Wrapper = new Web3Wrapper(provider, { gasPrice: config.gasPrice })
        // const exchangeContractAddress = config.wyvernExchangeContractAddress || WyvernProtocol.getExchangeContractAddress(config.network)
        // this.wyvernExchange = new WyvernExchangeContract(
        //     this._web3Wrapper.getContractInstance((constants.EXCHANGE_ABI as any), exchangeContractAddress),
        //     {},
        // )
        if (config.rpc != undefined) {
            if (api.rpc != undefined) {
                // this.wyvernExchange = api.rpc.wyvernExchange;
            }
        }
        else {
            if (api.tx != undefined) {
                this.wyvernExchange = api.tx.wyvernExchange;
            }
        }
        var proxyRegistryContractAddress = config.wyvernProxyRegistryContractAddress || WyvernProtocol.getProxyRegistryContractAddress(config.network);
        // this.wyvernProxyRegistry = new WyvernProxyRegistryContract(
        //     this._web3Wrapper.getContractInstance((constants.PROXY_REGISTRY_ABI as any), proxyRegistryContractAddress),
        //     {},
        // )
        var regabi = new api_contract_1.Abi(wyvern_proxy_registry_metadata, this.api.registry != undefined ? this.api.registry.getChainProperties() : undefined);
        this.wyvernProxyRegistry = new api_contract_1.ContractPromise(this.api, regabi, proxyRegistryContractAddress);
        // const daoContractAddress = config.wyvernDAOContractAddress || WyvernProtocol.getDAOContractAddress(config.network)
        // this.wyvernDAO = new WyvernDAOContract(
        //     this._web3Wrapper.getContractInstance((constants.DAO_ABI as any), daoContractAddress),
        //     {},
        // )
        // const tokenContractAddress = config.wyvernTokenContractAddress || WyvernProtocol.getTokenContractAddress(config.network)
        // this.wyvernToken = new WyvernTokenContract(
        //     this._web3Wrapper.getContractInstance((constants.TOKEN_ABI as any), tokenContractAddress),
        //     {},
        // )
        // console.log(config.wyvernAtomicizerContractAddress, WyvernProtocol.getAtomicizerContractAddress(config.network))
        var atomicizerContractAddress = config.wyvernAtomicizerContractAddress || WyvernProtocol.getAtomicizerContractAddress(config.network);
        var mabi = new api_contract_1.Abi(msigmetadata, this.api.registry != undefined ? this.api.registry.getChainProperties() : undefined);
        this.wyvernAtomicizer = new api_contract_1.ContractPromise(this.api, mabi, atomicizerContractAddress);
    }
    // private _abiDecoder: AbiDecoder
    WyvernProtocol.getExchangeContractAddress = function (network) {
        return constants_1.constants.DEPLOYED[network].WyvernExchange;
    };
    WyvernProtocol.getProxyRegistryContractAddress = function (network) {
        return constants_1.constants.DEPLOYED[network].WyvernProxyRegistry;
    };
    WyvernProtocol.getTokenContractAddress = function (network) {
        return constants_1.constants.DEPLOYED[network].WyvernToken;
    };
    WyvernProtocol.getDAOContractAddress = function (network) {
        return constants_1.constants.DEPLOYED[network].WyvernDAO;
    };
    WyvernProtocol.getAtomicizerContractAddress = function (network) {
        return constants_1.constants.DEPLOYED[network].WyvernAtomicizer;
    };
    WyvernProtocol.getTokenTransferProxyAddress = function (network) {
        return constants_1.constants.DEPLOYED[network].WyvernTokenTransferProxy;
    };
    WyvernProtocol.getOwnableDelegateProxyAddress = function (network) {
        return constants_1.constants.DEPLOYED[network].OwnableDelegateProxy;
    };
    /**
     * Verifies that the elliptic curve signature `signature` was generated
     * by signing `data` with the private key corresponding to the `signerAddress` address.
     * @param   data          The hex encoded data signed by the supplied signature.
     * @param   signature     An object containing the elliptic curve signature parameters.
     * @param   signerAddress The hex encoded address that signed the data, producing the supplied signature.
     * @return  Whether the signature is valid for the supplied signerAddress and data.
     */
    WyvernProtocol.isValidSignature = function (data, signature, signerAddress) {
        // assert.isHexString('data', data)
        // assert.doesConformToSchema('signature', signature, schemas.ecSignatureSchema)
        // assert.isETHAddressHex('signerAddress', signerAddress)
        var isValidSignature = true; //signatureUtils.isValidSignature(data, signature, signerAddress)
        return isValidSignature;
    };
    /**
     * Generates a pseudo-random 256-bit salt.
     * The salt can be included in an 0x order, ensuring that the order generates a unique orderHash
     * and will not collide with other outstanding orders that are identical in all other parameters.
     * @return  A pseudo-random 256-bit number that can be used as a salt.
     */
    WyvernProtocol.generatePseudoRandomSalt = function () {
        // return new BigNumber(10);///salt TODO
        // BigNumber.random returns a pseudo-random number between 0 & 1 with a passed in number of decimal places.
        // Source: https://mikemcl.github.io/bignumber.js/#random
        // const randomNumber = BigNumber.random(constants.MAX_DIGITS_IN_UNSIGNED_256_INT)
        // const factor = new BigNumber(10).pow(constants.MAX_DIGITS_IN_UNSIGNED_256_INT - 1)
        var salt = new bignumber_js_1["default"](10); // randomNumber.times(factor).round()
        return salt;
    };
    /**
     * Checks if the supplied hex encoded order hash is valid.
     * Note: Valid means it has the expected format, not that an order with the orderHash exists.
     * Use this method when processing orderHashes submitted as user input.
     * @param   orderHash    Hex encoded orderHash.
     * @return  Whether the supplied orderHash has the expected format.
     */
    WyvernProtocol.isValidOrderHash = function (orderHash) {
        // Since this method can be called to check if any arbitrary string conforms to an orderHash's
        // format, we only assert that we were indeed passed a string.
        // assert.isString('orderHash', orderHash)
        // const schemaValidator = new SchemaValidator()
        var isValidOrderHash = true; //schemaValidator.validate(orderHash, schemas.orderHashSchema).valid
        return isValidOrderHash;
    };
    /**
     * A unit amount is defined as the amount of a token above the specified decimal places (integer part).
     * E.g: If a currency has 18 decimal places, 1e18 or one quintillion of the currency is equivalent
     * to 1 unit.
     * @param   amount      The amount in baseUnits that you would like converted to units.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in units.
     */
    WyvernProtocol.toUnitAmount = function (amount, decimals) {
        // assert.isValidBaseUnitAmount('amount', amount)
        // assert.isNumber('decimals', decimals)
        var aUnit = new bignumber_js_1["default"](10).pow(decimals);
        var unit = amount.div(aUnit);
        return unit;
    };
    /**
     * A baseUnit is defined as the smallest denomination of a token. An amount expressed in baseUnits
     * is the amount expressed in the smallest denomination.
     * E.g: 1 unit of a token with 18 decimal places is expressed in baseUnits as 1000000000000000000
     * @param   amount      The amount of units that you would like converted to baseUnits.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in baseUnits.
     */
    WyvernProtocol.toBaseUnitAmount = function (amount, decimals) {
        // assert.isBigNumber('amount', amount)
        // assert.isNumber('decimals', decimals)
        var unit = new bignumber_js_1["default"](10).pow(decimals);
        var baseUnitAmount = amount.times(unit);
        var hasDecimals = baseUnitAmount.decimalPlaces() !== 0;
        if (hasDecimals) {
            throw new Error("Invalid unit amount: ".concat(amount.toString(), " - Too many decimal places"));
        }
        return baseUnitAmount;
    };
    /**
     * Computes the orderHash for a supplied order.
     * @param   order   An object that conforms to the Order or SignedOrder interface definitions.
     * @return  The resulting orderHash from hashing the supplied order.
     */
    // @decorators.syncWyvernProtocolErrorHandler
    WyvernProtocol.getOrderHashHex = function (order) {
        // assert.doesConformToSchema('order', order, schemas.orderSchema)
        var orderHashHex = utils_1.utils.getOrderHashHex(order);
        return orderHashHex;
    };
    /**
     * Computes the assetHash for a supplied asset.
     */
    WyvernProtocol.getAssetHashHex = function (assetHash, schema) {
        var assetHashHex = utils_1.utils.getAssetHashHex(assetHash, schema);
        return assetHashHex;
    };
    WyvernProtocol.prototype.getProvider = function () {
        return this.provider;
    };
    /**
     * Sets a new web3 provider for wyvernProtocol.js. Updating the provider will stop all
     * subscriptions so you will need to re-subscribe to all events relevant to your app after this call.
     * @param   provider    The Web3Provider you would like the wyvernProtocol.js library to use from now on.
     * @param   networkId   The id of the network your provider is connected to
     */
    WyvernProtocol.prototype.setProvider = function (provider, networkId) {
        this.provider = provider;
        // (this.wyvernExchange as any)._invalidateContractInstances();
        // (this.wyvernExchange as any)._setNetworkId(networkId);
        // (this.wyvernProxyRegistry as any)._invalidateContractInstance();
        // (this.wyvernProxyRegistry as any)._setNetworkId(networkId)
    };
    WyvernProtocol.NULL_ADDRESS = constants_1.constants.NULL_ADDRESS;
    WyvernProtocol.MAX_UINT_256 = new bignumber_js_1["default"](2).pow(30).minus(1);
    /**
     * Encodes the replacementPattern for a supplied ABI and replace kind
     * @param   abi AnnotatedFunctionABI
     * @param   replaceKind Parameter kind to replace
     * @return  The resulting encoded replacementPattern
     */
    WyvernProtocol.encodeReplacementPattern = function (abi, replaceKind, encodeToBytes) {
        if (replaceKind === void 0) { replaceKind = types_1.FunctionInputKind.Replaceable; }
        if (encodeToBytes === void 0) { encodeToBytes = true; }
        abi = abi.slice(2);
        var len = abi.length;
        var nullindex = abi.indexOf(WyvernProtocol.generateDefaultValue("bytes32").slice(2));
        if (nullindex == -1) {
            console.error("nullindex==-1", abi);
            return "";
        }
        var s = '0'.repeat(nullindex);
        s += 'f'.repeat(64);
        s += len > nullindex + 64 ? '0'.repeat(len - nullindex - 64) : "";
        console.log(s.length == abi.length, s, abi);
        return "0x" + s;
        //  const allowReplaceByte = '1'
        //     const doNotAllowReplaceByte = '0'
        //     const output: Buffer[] = []
        //     const data: Buffer[] = []
        //     const dynamicOffset = abi.inputs.reduce((len, { type }) => {
        //         const match = type.match(/\[(.+)\]$/)
        //         return len + (match ? parseInt(match[1], 10) * 32 : 32)
        //     }, 0)
        //     abi.inputs
        //         .map(({ kind, type, value }) => ({
        //             bitmask: kind === replaceKind ? 255 : 0,
        //             type: ethABI.elementaryName(type),
        //             value: value !== undefined ? value : WyvernProtocol.generateDefaultValue(type),
        //         }))
        //         .reduce((offset, { bitmask, type, value }) => {
        //             // The 0xff bytes in the mask select the replacement bytes. All other bytes are 0x00.
        //             const cur = new Buffer(ethABI.encodeSingle(type, value).length).fill(bitmask)
        //             if (ethABI.isDynamic(type)) {
        //                 if (bitmask) {
        //                     throw new Error('Replacement is not supported for dynamic parameters.')
        //                 }
        //                 output.push(new Buffer(ethABI.encodeSingle('uint256', dynamicOffset).length))
        //                 data.push(cur)
        //                 return offset + cur.length
        //             }
        //             output.push(cur)
        //             return offset
        //         }, dynamicOffset)
        //     // 4 initial bytes of 0x00 for the method hash.
        //     const methodIdMask = new Buffer(4)
        //     const mask = Buffer.concat([methodIdMask, Buffer.concat(output.concat(data))])
        //     return encodeToBytes ? `0x${mask.toString('hex')}` : mask.map(b => b ? 1 : 0).join('')
    };
    /**
     * Encodes the atomicized replacementPattern for a supplied ABI and replace kind
     * @param   abis array of AnnotatedFunctionABI
     * @param   replaceKind Parameter kind to replace
     * @return  The resulting encoded replacementPattern
     */
    WyvernProtocol.encodeAtomicizedReplacementPattern = function (abis, replaceKind) {
        if (replaceKind === void 0) { replaceKind = types_1.FunctionInputKind.Replaceable; }
        abis = abis.slice(2);
        var len = abis.length;
        var nullindex = abis.indexOf(WyvernProtocol.generateDefaultValue("bytes32").slice(2));
        if (nullindex == -1) {
            console.error("nullindex==-1", abis, WyvernProtocol.generateDefaultValue("bytes32").slice(2));
            return "";
        }
        var s = '0'.repeat(nullindex);
        s += 'f'.repeat(64);
        s += len > nullindex + 64 ? '0'.repeat(len - nullindex - 64) : "";
        console.log(s.length == abis.length, s, abis);
        return "0x" + s;
        //  const allowReplaceByte = '1'
        //     const doNotAllowReplaceByte = '0'
        //     /* Four bytes for method ID. */
        //     const maskArr: string[] = [doNotAllowReplaceByte, doNotAllowReplaceByte,
        //         doNotAllowReplaceByte, doNotAllowReplaceByte]
        //     const encodedUint256 = ethABI.encodeSingle(ethABI.elementaryName('uint256'), WyvernProtocol.generateDefaultValue('uint256'))
        //     const dataLocationSize = encodedUint256.length
        //     const dynamicArgumentLengthSize = encodedUint256.length
        //     // See https://solidity.readthedocs.io/en/develop/abi-spec.html#examples
        //     // Prepare dymanic types to be passed in (they need locations of their data parts). 4 for addresses, values, calldata lengths, calldatas
        //     maskArr.push((doNotAllowReplaceByte as any).repeat(dataLocationSize * 4))
        //     // Length of addresses array
        //     maskArr.push((doNotAllowReplaceByte as any).repeat(dynamicArgumentLengthSize))
        //     // Addresses should not be replaced
        //     let encoded = ethABI.encodeSingle(ethABI.elementaryName('address'), WyvernProtocol.generateDefaultValue('address'))
        //     maskArr.push((doNotAllowReplaceByte as any).repeat(encoded.length * abis.length))
        //     // Length of values array
        //     maskArr.push((doNotAllowReplaceByte as any).repeat(dynamicArgumentLengthSize))
        //     // Add the values...
        //     encoded = ethABI.encodeSingle(ethABI.elementaryName('uint'), WyvernProtocol.generateDefaultValue('uint'))
        //     maskArr.push((doNotAllowReplaceByte as any).repeat(encoded.length * abis.length))
        //     // Length of calldata lengths array
        //     maskArr.push((doNotAllowReplaceByte as any).repeat(dynamicArgumentLengthSize))
        //     // ... and calldata lengths
        //     maskArr.push((doNotAllowReplaceByte as any).repeat(encoded.length * abis.length))
        //     // Length of replacementPatterns
        //     maskArr.push((doNotAllowReplaceByte as any).repeat(dynamicArgumentLengthSize))
        //     // Raw replacementPatterns
        //     const replacementBytes: string[] = []
        //     abis.map(abi => {
        //         const replacement = WyvernProtocol.encodeReplacementPattern(abi, replaceKind, false)
        //         replacementBytes.push(replacement)
        //     })
        //     const concatenatedReplacementPatterns = replacementBytes.join('')
        //     maskArr.push(concatenatedReplacementPatterns)
        //     if (concatenatedReplacementPatterns.length % 32 !== 0) {
        //         // Pad replacementPatterns to nearest multiple of 32
        //         maskArr.push((doNotAllowReplaceByte as any).repeat(32 - concatenatedReplacementPatterns.length % 32))
        //     }
        //     const mask = maskArr.reduce((x, y) => x + y, '')
        //     const ret = []
        //     /* Encode into bytes. */
        //     for (const char of mask) {
        //         const byte = char === allowReplaceByte ? 255 : 0
        //         const buf = Buffer.alloc(1)
        //         buf.writeUInt8(byte, 0)
        //         ret.push(buf)
        //     }
        //     return '0x' + Buffer.concat(ret).toString('hex')
    };
    /**
     * Computes the default value for a type
     * @param type The ABI type to calculate a default value for
     * @return The default value for that type
     */
    WyvernProtocol.generateDefaultValue = function (type) {
        switch (type) {
            case 'address':
            case 'bytes20':
                /* Null address is sometimes checked in transfer calls. */
                // But we need to use 0x000 because bitwise XOR won't work if there's a 0 in the actual address, since it will be replaced as 1 OR 0 = 1
                return '0x0000000000000000000000000000000000000000';
            case 'bytes32':
                return '0x0000000000000000000000000000000000000000000000000000000000000000';
            case 'bool':
                return false;
            case 'int':
            case 'uint':
            case 'uint8':
            case 'uint16':
            case 'uint32':
            case 'uint64':
            case 'uint256':
                return 0;
            default:
                throw new Error('Default value not yet implemented for type: ' + type);
        }
    };
    return WyvernProtocol;
}());
exports.WyvernProtocol = WyvernProtocol;
