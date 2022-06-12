"use strict";
exports.__esModule = true;
exports.EventInputKind = exports.FunctionOutputKind = exports.StateMutability = exports.ABIType = exports.Network = exports.AbiType = exports.FunctionInputKind = void 0;
var types_1 = require("../wyvern-js/types");
exports.FunctionInputKind = types_1.FunctionInputKind;
exports.AbiType = types_1.AbiType;
var Network;
(function (Network) {
    Network["Main"] = "main";
    Network["Dev"] = "dev";
    Network["Kovan"] = "kovan";
})(Network = exports.Network || (exports.Network = {}));
var ABIType;
(function (ABIType) {
    ABIType[ABIType["Function"] = 1] = "Function";
    ABIType[ABIType["Event"] = 2] = "Event";
})(ABIType = exports.ABIType || (exports.ABIType = {}));
var StateMutability;
(function (StateMutability) {
    StateMutability["Pure"] = "pure";
    StateMutability["View"] = "view";
    StateMutability["Payable"] = "payable";
    StateMutability["Nonpayable"] = "nonpayable";
})(StateMutability = exports.StateMutability || (exports.StateMutability = {}));
var FunctionOutputKind;
(function (FunctionOutputKind) {
    FunctionOutputKind["Owner"] = "owner";
    FunctionOutputKind["Asset"] = "asset";
    FunctionOutputKind["Count"] = "count";
    FunctionOutputKind["Other"] = "other";
})(FunctionOutputKind = exports.FunctionOutputKind || (exports.FunctionOutputKind = {}));
var EventInputKind;
(function (EventInputKind) {
    EventInputKind["Source"] = "source";
    EventInputKind["Destination"] = "destination";
    EventInputKind["Asset"] = "asset";
    EventInputKind["Other"] = "other";
})(EventInputKind = exports.EventInputKind || (exports.EventInputKind = {}));
