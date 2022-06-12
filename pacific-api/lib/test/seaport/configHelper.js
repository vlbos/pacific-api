"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putKV = exports.getAddress = exports.getValue = exports.readjson = exports.savejson = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const configFile = `../../utils/kv.json`;
function savejson(json, file) {
    try {
        const cmpPath = path_1.default.join(__dirname, file);
        if (!fs_1.default.existsSync(cmpPath)) {
            fs_1.default.writeFileSync(cmpPath, JSON.stringify(json, null, 2), { flag: 'w' });
        }
    }
    catch (error) {
        console.error(error);
    }
}
exports.savejson = savejson;
function readjson(file) {
    try {
        const cmpPath = path_1.default.join(__dirname, file);
        if (!fs_1.default.existsSync(cmpPath)) {
            return {};
        }
        return JSON.parse(fs_1.default.readFileSync(cmpPath, 'utf8'));
    }
    catch (error) {
        console.error(error);
    }
}
exports.readjson = readjson;
function getValue(key) {
    const json = readjson(configFile);
    if (json["address"][key] == undefined) {
        return 0;
    }
    return json["address"][key];
}
exports.getValue = getValue;
function getAddress() {
    const json = readjson(configFile);
    if (json["address"] == undefined) {
        return {};
    }
    return json["address"];
}
exports.getAddress = getAddress;
function putKV(key, value) {
    const json = readjson(configFile);
    json[key] = value;
    savejson(json, configFile);
}
exports.putKV = putKV;
//# sourceMappingURL=configHelper.js.map