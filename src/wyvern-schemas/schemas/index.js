"use strict";
// To help typescript find the type
// import { Schema } from '../types'
exports.__esModule = true;
exports.schemas = void 0;
var index_1 = require("./main/index");
var index_2 = require("./dev/index");
exports.schemas = {
    dev: index_2.devSchemas,
    main: index_1.mainSchemas
};
