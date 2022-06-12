var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fs = require('fs');
var util = require('util');
var exec = util.promisify(require('child_process').exec);
var basepath = "/Users/lisheng/Downloads/cargo-contract-1.1.0/target/release/";
function execCmd(cmd, keyword, path) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, err, stdout, stderr;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, exec(cmd, { cwd: path })];
                case 1:
                    _a = _b.sent(), err = _a.err, stdout = _a.stdout, stderr = _a.stderr;
                    if (err) {
                        console.error(err);
                        // return;
                    }
                    console.log("========stdout==========", stdout, "========stderr==========", stderr);
                    return [2 /*return*/, stdout.substring(stdout.indexOf(keyword) + keyword.length).trim()];
            }
        });
    });
}
function savejson(key, value, section) {
    return __awaiter(this, void 0, void 0, function () {
        var jsonfile, json;
        return __generator(this, function (_a) {
            jsonfile = "./kv.json";
            json = fs.readFileSync(jsonfile);
            if (json == undefined) {
                json = {};
            }
            else {
                json = JSON.parse(json);
            }
            if (json[section.toString()] == undefined) {
                json[section.toString()] = {};
            }
            json[section.toString()][key.toString()] = value;
            fs.writeFileSync(jsonfile, JSON.stringify(json));
            return [2 /*return*/];
        });
    });
}
function getjson(key, section) {
    return __awaiter(this, void 0, void 0, function () {
        var jsonfile, json;
        return __generator(this, function (_a) {
            jsonfile = "./kv.json";
            json = fs.readFileSync(jsonfile);
            if (json == undefined) {
                return [2 /*return*/, ""];
            }
            json = JSON.parse(json);
            if (json[section.toString()] == undefined) {
                return [2 /*return*/, ""];
            }
            return [2 /*return*/, json[section.toString()][key.toString()]];
        });
    });
}
function upload(acc, path, key) {
    return __awaiter(this, void 0, void 0, function () {
        var output;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execCmd(basepath + 'cargo-contract contract upload --suri //' + acc, "Code hash", path)];
                case 1:
                    output = _a.sent();
                    savejson(key, output, "hash");
                    return [2 /*return*/, output];
            }
        });
    });
}
function instantiate(acc, args, code_hash, path, key) {
    return __awaiter(this, void 0, void 0, function () {
        var output;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execCmd(basepath + 'cargo-contract contract instantiate --constructor new ' + (args == undefined || args == "" ? "" : " --args " + args) + ' --suri //' + acc + ' --code-hash ' + code_hash, "Contract ", path)];
                case 1:
                    output = _a.sent();
                    savejson(key, output, "address");
                    return [2 /*return*/, output];
            }
        });
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var users, basepath_1, proxybasepath, pathes, args, keys, codehashes, contractaddresses, i, _i, keys_1, key, code_hash, contract_address;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!true) return [3 /*break*/, 5];
                    users = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Ferdie"];
                    basepath_1 = "/Users/lisheng/mygit/vlbos/ink/examples/";
                    proxybasepath = "/Users/lisheng/mygit/vlbos/wyvern-ink-contracts-substrate/";
                    pathes = {
                        "auth": proxybasepath + "authenticated_proxy", "registry": proxybasepath + "wyvern_proxy_registry", "token": proxybasepath + "wyvern_token_transfer_proxy", "erc20": basepath_1 + "erc20", "erc721": basepath_1 + "erc721", "atom": proxybasepath + "wyvern_atomicizer", "delegate": proxybasepath + "ownable_delegate_proxy"
                    };
                    args = { "auth": "", "registry": "", "token": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY", "erc20": "1000000000000000000000000000", "erc721": "", "atom": "", "delegate": "'5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL 0xd5f768bbb70d4afc86b404fd767f01a64e4d0ab7f2bd6cd400895adbe79491c2'" };
                    keys = Object.keys(pathes).slice(0, 7);
                    codehashes = [];
                    contractaddresses = [];
                    i = 0;
                    _i = 0, keys_1 = keys;
                    _a.label = 1;
                case 1:
                    if (!(_i < keys_1.length)) return [3 /*break*/, 5];
                    key = keys_1[_i];
                    return [4 /*yield*/, upload(users[i], pathes[key], key)];
                case 2:
                    code_hash = _a.sent();
                    // "0xd1e8fb8f0ad7da538711ed26e6c5e37ee8874dce37fdd3d607800d56f706969a";//
                    console.log(i, "======code_hash======", code_hash);
                    codehashes.push(code_hash);
                    return [4 /*yield*/, instantiate(users[i], args[key], code_hash, pathes[key], key)];
                case 3:
                    contract_address = _a.sent();
                    if (i == 0) {
                        args["delegate"] = "'5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL " + code_hash + "'";
                    }
                    contractaddresses.push(contract_address);
                    i++;
                    console.log(i, "======contract_address======", contract_address);
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
})();
console.log("============");
