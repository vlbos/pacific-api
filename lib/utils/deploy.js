"use strict";
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const basepath = "/Users/lisheng/Downloads/cargo-contract-1.1.0/target/release/";
async function execCmd(cmd, keyword, path) {
    let { err, stdout, stderr } = await exec(cmd, { cwd: path });
    if (err) {
        console.error(err);
        // return;
    }
    console.log("========stdout==========", stdout, "========stderr==========", stderr);
    return stdout.substring(stdout.indexOf(keyword) + keyword.length).trim();
}
async function savejson(key, value, section) {
    let jsonfile = "./kv.json";
    let json = fs.readFileSync(jsonfile);
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
}
async function getjson(key, section) {
    let jsonfile = "./kv.json";
    let json = fs.readFileSync(jsonfile);
    if (json == undefined) {
        return "";
    }
    json = JSON.parse(json);
    if (json[section.toString()] == undefined) {
        return "";
    }
    return json[section.toString()][key.toString()];
}
async function upload(acc, path, key) {
    const output = await execCmd(basepath + 'cargo-contract contract upload --suri //' + acc, "Code hash", path);
    savejson(key, output, "hash");
    return output;
}
async function instantiate(acc, args, code_hash, path, key) {
    let output = await execCmd(basepath + 'cargo-contract contract instantiate --constructor new ' + (args == undefined || args == "" ? "" : " --args " + args) + ' --suri //' + acc + ' --code-hash ' + code_hash, "Contract ", path);
    savejson(key, output, "address");
    return output;
}
(async function () {
    // const code_hash = await upload(users[0], pathes.erc721);
    // const contract_address = await instantiate(users[0],"", code_hash, pathes.erc721);
    // console.log("============", contract_address)//1000000000000000000000000000
    if (true) {
        const users = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Ferdie"];
        let basepath = "/Users/lisheng/mygit/vlbos/ink/examples/";
        let proxybasepath = "/Users/lisheng/mygit/vlbos/wyvern-ink-contracts-substrate/";
        let pathes = {
            "auth": proxybasepath + "authenticated_proxy", "registry": proxybasepath + "wyvern_proxy_registry", "token": proxybasepath + "wyvern_token_transfer_proxy", "erc20": basepath + "erc20", "erc721": basepath + "erc721", "atom": proxybasepath + "wyvern_atomicizer", "delegate": proxybasepath + "ownable_delegate_proxy"
        };
        let args = { "auth": "", "registry": "", "token": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY", "erc20": "1000000000000000000000000000", "erc721": "", "atom": "", "delegate": "'5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL 0xd5f768bbb70d4afc86b404fd767f01a64e4d0ab7f2bd6cd400895adbe79491c2'" };
        let keys = Object.keys(pathes).slice(0, 7); // Object.keys(pathes);"registry","erc20",
        let codehashes = [];
        let contractaddresses = [];
        let i = 0;
        for (let key of keys) {
            const code_hash = await upload(users[i], pathes[key], key);
            // "0xd1e8fb8f0ad7da538711ed26e6c5e37ee8874dce37fdd3d607800d56f706969a";//
            console.log(i, "======code_hash======", code_hash);
            codehashes.push(code_hash);
            const contract_address = await instantiate(users[i], args[key], code_hash, pathes[key], key);
            if (i == 0) {
                args["delegate"] = "'5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL " + code_hash + "'";
            }
            contractaddresses.push(contract_address);
            i++;
            console.log(i, "======contract_address======", contract_address);
        }
        // for (let i = 2; i < 3; i++) {
        //         const code_hash = "0xaaa8eb01e0ca906fc2f0924c0f8852e3f84f16c52157651c5d6a24926b721e1b"//await upload(users[0], p[i], keys[i]);// "0xd1e8fb8f0ad7da538711ed26e6c5e37ee8874dce37fdd3d607800d56f706969a";//
        //         console.log(i,"======code_hash======", code_hash);
        //         const contract_address = await instantiate(users[1], args[i], code_hash, p[i], keys[i]);
        //         console.log(i,"======contract_address======", contract_address)
        //     }
    }
    // let keyword = "Contract";
    // let stdout = "s ➜ Instantiated\n          deployer: 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY\n          contract: 5Cx8PdsepXFn39oQvJ9YyW8GRK46jRNqtcU7hq3XAXU8DEEV\n        Event Balances ➜ Transfer\n          from: 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY\n          to: 5Cx8PdsepXFn39oQvJ9YyW8GRK46jRNqtcU7hq3XAXU8DEEV\n          amount: 400330000000\n        Event Balances ➜ Reserved\n          who: 5Cx8PdsepXFn39oQvJ9YyW8GRK46jRNqtcU7hq3XAXU8DEEV\n          amount: 400330000000\n        Event System ➜ ExtrinsicSuccess\n          dispatch_info: DispatchInfo { weight: 3637845490, class: Normal, pays_fee: Yes }\n\n     Contract 5Cx8PdsepXFn39oQvJ9YyW8GRK46jRNqtcU7hq3XAXU8DEEV"
    // console.log(stdout.substring(stdout.indexOf(keyword) + keyword.length).trim())
    // await savejson("k", "v", true);
    // await savejson("k", "v1", true);
    // await savejson("k1", "v", true);
    // await savejson("ka", "va", false);
})();
console.log("============");
//# sourceMappingURL=deploy.js.map