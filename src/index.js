"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.Network = exports.EventType = exports.OpenSeaAPI = exports.OpenSeaPort = void 0;
var index_1 = require("./pacific-js/index");
// Main SDK export:
__createBinding(exports, index_1, "OpenSeaPort");
// So the API could be used separately:
__createBinding(exports, index_1, "OpenSeaAPI");
__createBinding(exports, index_1, "EventType");
__createBinding(exports, index_1, "Network");
