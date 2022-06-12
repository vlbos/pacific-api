"use strict";
exports.__esModule = true;
exports.putKV = exports.getAddress = exports.getValue = exports.readjson = exports.savejson = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var configFile = "../../utils/kv.json";
function savejson(json, file) {
    try {
        var cmpPath = path_1["default"].join(__dirname, file);
        if (!fs_1["default"].existsSync(cmpPath)) {
            fs_1["default"].writeFileSync(cmpPath, JSON.stringify(json, null, 2), { flag: 'w' });
        }
    }
    catch (error) {
        console.error(error);
    }
}
exports.savejson = savejson;
function readjson(file) {
    try {
        var cmpPath = path_1["default"].join(__dirname, file);
        if (!fs_1["default"].existsSync(cmpPath)) {
            return {};
        }
        return JSON.parse(fs_1["default"].readFileSync(cmpPath, 'utf8'));
    }
    catch (error) {
        console.error(error);
    }
}
exports.readjson = readjson;
function getValue(key) {
    var json = readjson(configFile);
    if (json["address"][key] == undefined) {
        return 0;
    }
    return json["address"][key];
}
exports.getValue = getValue;
function getAddress() {
    var json = readjson(configFile);
    if (json["address"] == undefined) {
        return {};
    }
    return json["address"];
}
exports.getAddress = getAddress;
function putKV(key, value) {
    var json = readjson(configFile);
    json[key] = value;
    savejson(json, configFile);
}
exports.putKV = putKV;
