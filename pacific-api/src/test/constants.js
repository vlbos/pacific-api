"use strict";
exports.__esModule = true;
exports.EVE_ADDRESS = exports.DAVE_ADDRESS = exports.CHARLIE_ADDRESS = exports.ALICE_STASH_ADDRESS = exports.BOB_ADDRESS = exports.ALICE_ADDRESS = exports.GODS_UNCHAINED_CHEST_ADDRESS = exports.BENZENE_ADDRESS = exports.SPIRIT_CLASH_OWNER = exports.SPIRIT_CLASH_TOKEN_ID = exports.SANDBOX_DEV_ID = exports.SANDBOX_DEV_ADDRESS = exports.CRYPTOPUNKS_ADDRESS = exports.CRYPTOFLOWERS_CONTRACT_ADDRESS_WITH_BUYER_FEE = exports.DISSOLUTION_TOKEN_ID = exports.DECENTRALAND_ID = exports.DECENTRALAND_ADDRESS = exports.CRYPTOVOXELS_WEARABLE_2_ID = exports.CRYPTOVOXELS_WEARABLE_ID = exports.CRYPTOVOXELS_WEARABLE_ADDRESS = exports.AGE_OF_RUST_TOKEN_ID = exports.CATS_IN_MECHS_ID = exports.CK_DEV_SELLER_FEE = exports.CRYPTOPUNKS_ID = exports.CK_TOKEN_ID = exports.CK_DEV_TOKEN_ID = exports.ENS_HELLO_NAME = exports.ENS_HELLO_TOKEN_ID = exports.ENS_DEV_SHORT_NAME_OWNER = exports.ENS_DEV_TOKEN_ADDRESS = exports.WDOT_ADDRESS2 = exports.WDOT_ADDRESS = exports.CK_DEV_BUNDLE_SLUG = exports.MYTHEREUM_TOKEN_ID = exports.GODS_UNCHAINED_TOKEN_ID = exports.DIGITAL_ART_CHAIN_TOKEN_ID = exports.MYTHEREUM_ADDRESS = exports.DIGITAL_ART_CHAIN_ADDRESS = exports.CRYPTO_CRYSTAL_ADDRESS = exports.GODS_UNCHAINED_ADDRESS = exports.CK_DEV_ADDRESS = exports.CK_ADDRESS = exports.apiToTest = exports.devApi = exports.mainApi = exports.DEV_API_KEY = exports.MAINNET_API_KEY = void 0;
var api_1 = require("../pacific-js/api");
var types_1 = require("../pacific-js/types");
var constants_1 = require("../pacific-js/constants");
exports.CK_ADDRESS = constants_1.CK_ADDRESS;
exports.CK_DEV_ADDRESS = constants_1.CK_DEV_ADDRESS;
exports.MAINNET_API_KEY = "testKeyMainnet";
exports.DEV_API_KEY = "testKeyDev";
exports.mainApi = new api_1.OpenSeaAPI({
    apiKey: exports.MAINNET_API_KEY,
    networkName: types_1.Network.Main
}, console.info);
exports.devApi = new api_1.OpenSeaAPI({
    apiKey: exports.DEV_API_KEY,
    networkName: types_1.Network.Dev
}, console.info);
exports.apiToTest = exports.devApi;
exports.GODS_UNCHAINED_ADDRESS = '0x6ebeaf8e8e946f0716e6533a6f2cefc83f60e8ab';
exports.CRYPTO_CRYSTAL_ADDRESS = '0xcfbc9103362aec4ce3089f155c2da2eea1cb7602';
exports.DIGITAL_ART_CHAIN_ADDRESS = '5CMStp6FsUNjU78d9ET5VswnHkMtHR7rUCQQEmFBRNLUsqTL';
exports.MYTHEREUM_ADDRESS = '5CthQsFsTxEkqdVozDf7QRV78jkkE23FRrnCoK7GWKCPMidc';
exports.DIGITAL_ART_CHAIN_TOKEN_ID = 189;
exports.GODS_UNCHAINED_TOKEN_ID = 76719;
exports.MYTHEREUM_TOKEN_ID = 4367;
exports.CK_DEV_BUNDLE_SLUG = 'puff-kitty';
exports.WDOT_ADDRESS = '5Gc5PeAoQ6TQ7Buc9iXVsud8EZSabSbJyvk1hYK2rEx1eUN9';
exports.WDOT_ADDRESS2 = '5ETSvcSaWLG6kKbXF3V7B5yGa8JVRG8TgdTRM3TXmhAz5ubF';
exports.ENS_DEV_TOKEN_ADDRESS = '0x53ceb15b76023fbec5bb39450214926f6aa77d2e';
exports.ENS_DEV_SHORT_NAME_OWNER = '0xe0ee13cd5a45e7fa140409edfc9ce17c7b11e6d2';
exports.ENS_HELLO_TOKEN_ID = '12910348618308260923200348219926901280687058984330794534952861439530514639560';
exports.ENS_HELLO_NAME = 'hello';
exports.CK_DEV_TOKEN_ID = 1;
exports.CK_TOKEN_ID = 1;
exports.CRYPTOPUNKS_ID = 7858;
exports.CK_DEV_SELLER_FEE = 250;
// Toasta Gun, NFT
exports.CATS_IN_MECHS_ID = '11081664790290028159747096595969945056246807881612483124155840544084353614722';
// Bounty, FT
exports.AGE_OF_RUST_TOKEN_ID = '10855508365998404086189256032722001339622921863551706494238735756561045520384';
exports.CRYPTOVOXELS_WEARABLE_ADDRESS = '0xa58b5224e2fd94020cb2837231b2b0e4247301a6';
exports.CRYPTOVOXELS_WEARABLE_ID = '908';
exports.CRYPTOVOXELS_WEARABLE_2_ID = '693';
exports.DECENTRALAND_ADDRESS = '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d';
exports.DECENTRALAND_ID = '115792089237316195423570985008687907840339254722644902427849348925505937604680';
exports.DISSOLUTION_TOKEN_ID = '39803530675327460487158288219684256433559304725576879659134376004308812431360';
exports.CRYPTOFLOWERS_CONTRACT_ADDRESS_WITH_BUYER_FEE = '0x8bc67d00253fd60b1afcce88b78820413139f4c6';
exports.CRYPTOPUNKS_ADDRESS = '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb';
exports.SANDBOX_DEV_ADDRESS = '0xcdeadfb2caa81d8c16d2935f3e379dda61242be9';
exports.SANDBOX_DEV_ID = '44221324190444972628403853229966997983936414854632412290085204005353951330306';
exports.SPIRIT_CLASH_TOKEN_ID = '10855508365998412378240648478527290366700749920879042165450277893550637056000';
exports.SPIRIT_CLASH_OWNER = '0x6a846239658f5a16a0b5977e1c0d007bc13267f0';
exports.BENZENE_ADDRESS = '0x6524b87960c2d573ae514fd4181777e7842435d4';
exports.GODS_UNCHAINED_CHEST_ADDRESS = '0xee85966b4974d3c6f71a2779cc3b6f53afbc2b68';
exports.ALICE_ADDRESS = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
exports.BOB_ADDRESS = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
exports.ALICE_STASH_ADDRESS = '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY';
exports.CHARLIE_ADDRESS = '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y';
exports.DAVE_ADDRESS = '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy';
exports.EVE_ADDRESS = '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw';