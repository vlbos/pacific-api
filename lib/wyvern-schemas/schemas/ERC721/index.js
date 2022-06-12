"use strict";
// import * as Web3 from 'web3';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC721Schema = void 0;
const types_1 = require("../../types");
exports.ERC721Schema = {
    version: 2,
    deploymentBlock: 0,
    name: 'ERC721',
    description: 'Items conforming to the ERC721 spec, using transferFrom.',
    thumbnail: 'https://opensea.io/static/images/opensea-icon.png',
    website: 'http://erc721.org/',
    fields: [
        { name: 'ID', type: 'uint256', description: 'Asset Token ID' },
        { name: 'Address', type: 'address', description: 'Asset Contract Address' },
    ],
    assetFromFields: (fields) => ({
        id: fields.ID,
        address: fields.Address,
    }),
    assetToFields: asset => ({
        ID: asset.id,
        Address: asset.address,
    }),
    formatter: async (asset) => {
        return {
            title: 'ERC721 Asset: Token ID ' + asset.id + ' at ' + asset.address,
            description: '',
            url: '',
            thumbnail: '',
            properties: [],
        };
    },
    functions: {
        transfer: asset => ({
            type: types_1.AbiType.Function,
            name: 'transferFrom',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: asset.address,
            inputs: [
                { kind: types_1.FunctionInputKind.Owner, name: '_from', type: 'address' },
                { kind: types_1.FunctionInputKind.Replaceable, name: '_to', type: 'address' },
                { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset.id },
            ],
            outputs: [],
        }),
        ownerOf: asset => ({
            type: types_1.AbiType.Function,
            name: 'ownerOf',
            payable: false,
            constant: true,
            stateMutability: types_1.StateMutability.View,
            target: asset.address,
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset.id },
            ],
            outputs: [
                { kind: types_1.FunctionOutputKind.Owner, name: 'owner', type: 'address' },
            ],
        }),
        assetsOfOwnerByIndex: [],
    },
    events: {
        transfer: [],
    },
    hash: asset => asset.address + '-' + asset.id,
};
//# sourceMappingURL=index.js.map