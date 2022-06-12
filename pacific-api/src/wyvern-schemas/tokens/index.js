"use strict";
// To help typescript find the type
// import { NetworkTokens } from '../types'
exports.__esModule = true;
exports.tokens = void 0;
var index_1 = require("./main/index");
var index_2 = require("./dev/index");
exports.tokens = {
    dev: index_2.devTokens,
    main: index_1.mainTokens
};
