"use strict";
exports.__esModule = true;
exports.devSchemas = void 0;
// import { ContractRoleSchema } from '../ContractRole/index';
var ERC1155_1 = require("../ERC1155");
var ERC20_1 = require("../ERC20");
var index_1 = require("../ERC721/index");
// import { devCryptoKittiesSchema } from './devCryptoKitties/index';
// import { devCustomSchema } from './devCustom/index';
// import { devENSNameSchema } from './devENSName/index';
// import { devENSShortNameAuctionSchema } from './devENSShortNameAuction/index';
// import { devOwnableContractSchema } from './devOwnableContract/index';
// import { testDevNFTSchema } from './testDevNFT/index';
exports.devSchemas = [
    //   devCryptoKittiesSchema,
    //   devCustomSchema,
    //   devENSNameSchema,
    //   devENSShortNameAuctionSchema,
    //   devOwnableContractSchema,
    //   testDevNFTSchema,
    ERC20_1.ERC20Schema,
    index_1.ERC721Schema,
    ERC1155_1.ERC1155Schema,
    //   ContractRoleSchema,
];
