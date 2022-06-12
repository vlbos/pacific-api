"use strict";
// To help typescript find the type
// import { NetworkTokens } from '../types'
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = void 0;
const index_1 = require("./main/index");
const index_2 = require("./dev/index");
exports.tokens = {
    dev: index_2.devTokens,
    main: index_1.mainTokens,
};
//# sourceMappingURL=index.js.map