"use strict";
exports.__esModule = true;
exports.FERDIE = exports.EVE = exports.DAVE = exports.CHARLIE = exports.BOB = exports.ALICE = exports.GAS_LIMIT = exports.GAS_REQUIRED = exports.CREATION_FEE = exports.DOT = exports.WSURL = void 0;
var bn_js_1 = require("bn.js");
exports.WSURL = "ws://127.0.0.1:9944";
exports.DOT = new bn_js_1["default"]("1000000000000000");
exports.CREATION_FEE = exports.DOT.muln(200);
exports.GAS_REQUIRED = 100000000000;
exports.GAS_LIMIT = 4294967295; // u32::MAX
exports.ALICE = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
exports.BOB = "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty";
exports.CHARLIE = "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y";
// export const DAVE = "126TwBzBM4jUEK2gTphmW4oLoBWWnYvPp8hygmduTr4uds57";
exports.DAVE = "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy";
exports.EVE = "5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw";
exports.FERDIE = "5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL";
