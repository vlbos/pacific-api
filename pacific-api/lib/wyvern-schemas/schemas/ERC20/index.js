"use strict";
// import * as Web3 from 'web3';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20Schema = void 0;
const types_1 = require("../../types");
exports.ERC20Schema = {
    version: 1,
    deploymentBlock: 0,
    name: 'ERC20',
    description: 'Items conforming to the ERC20 spec, using transferFrom.',
    thumbnail: 'https://opensea.io/static/images/opensea-icon.png',
    website: 'https://github.com/ethereum/eips/issues/20',
    fields: [
        { name: 'Address', type: 'address', description: 'Asset Contract Address' },
        { name: 'Quantity', type: 'uint256', description: 'Quantity to transfer' },
    ],
    assetFromFields: (fields) => ({
        address: fields.Address,
        quantity: fields.Quantity,
    }),
    assetToFields: asset => ({
        Address: asset.address,
        Quantity: asset.quantity,
    }),
    formatter: async (asset) => {
        return {
            title: 'ERC20 Asset at ' + asset.address,
            description: 'Trading ' + asset.quantity.toString(),
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
                { kind: types_1.FunctionInputKind.Count, name: '_value', type: 'uint256', value: asset.quantity },
            ],
            outputs: [],
        }),
        countOf: asset => ({
            type: types_1.AbiType.Function,
            name: 'balanceOf',
            payable: false,
            constant: true,
            stateMutability: types_1.StateMutability.View,
            target: asset.address,
            inputs: [
                { kind: types_1.FunctionInputKind.Owner, name: '_owner', type: 'address' },
            ],
            outputs: [
                { kind: types_1.FunctionOutputKind.Count, name: 'balance', type: 'uint' },
            ],
            assetFromOutputs: (outputs) => outputs.balance,
        }),
        assetsOfOwnerByIndex: [],
    },
    events: {
        transfer: [],
    },
    hash: asset => asset.address,
};
//# sourceMappingURL=index.js.map