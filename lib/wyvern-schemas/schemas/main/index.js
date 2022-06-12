"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainSchemas = void 0;
// import { ContractRoleSchema } from '../ContractRole/index';
const ERC1155_1 = require("../ERC1155");
const ERC20_1 = require("../ERC20");
const index_1 = require("../ERC721/index");
// import { CryptoKittiesSchema } from './CryptoKitties/index'
// import { CryptoPunksSchema } from './CryptoPunks/index'
// import { EnjinItemSchema } from './EnjinItem'
// import { ENSNameSchema } from './ENSName/index'
// import { ENSShortNameAuctionSchema } from './ENSShortNameAuction/index'
// import { OwnableContractSchema } from './OwnableContract/index'
exports.mainSchemas = [
    //   CryptoKittiesSchema,
    //   CryptoPunksSchema,
    //   ENSNameSchema,
    //   ENSShortNameAuctionSchema,
    //   OwnableContractSchema,
    ERC20_1.ERC20Schema,
    index_1.ERC721Schema,
    ERC1155_1.ERC1155Schema,
    //   EnjinItemSchema,
    //   ContractRoleSchema,
];
//# sourceMappingURL=index.js.map