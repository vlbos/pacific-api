"use strict";
// To help typescript find the type
// import { Schema } from '../types'
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = void 0;
const index_1 = require("./main/index");
const index_2 = require("./dev/index");
exports.schemas = {
    dev: index_2.devSchemas,
    main: index_1.mainSchemas,
};
//# sourceMappingURL=index.js.map