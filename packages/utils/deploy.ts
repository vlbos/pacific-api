
const fs = require('fs');

const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function execCmd(cmd: String, keyword: String, path: String) {
    let { err, stdout, stderr } = await exec(cmd, { cwd: path });
    if (err) {
        console.error(err);
        // return;
    }
    console.log("========stdout==========",stdout, "========stderr==========", stderr);
    return stdout.substring(stdout.indexOf(keyword) + keyword.length).trim();
}
async function savejson(key: String, value: String, section: String) {
    let jsonfile = "./kv.json";
    let json: any = fs.readFileSync(jsonfile);

    if (json == undefined) {
        json = {};
    } else {
        json = JSON.parse(json);
    }
    if (json[section.toString()] == undefined) {
        json[section.toString()] = {}
    }
    json[section.toString()][key.toString()] = value;
    fs.writeFileSync(jsonfile, JSON.stringify(json));
}
async function getjson(key: String, section: String) {
    let jsonfile = "./kv.json";
    let json: any = fs.readFileSync(jsonfile);

    if (json == undefined) {
        return "";
    }
    json = JSON.parse(json);

    if (json[section.toString()] == undefined) {
        return ""
    }
    return json[section.toString()][key.toString()];

}
async function upload(acc: String, path: String, key: String) {
    const output = await execCmd('cargo contract upload --suri //' + acc, "Code hash", path);
    savejson(key, output, "hash");
    return output;
}
async function instantiate(acc: String, args: String, code_hash: String, path: String, key: String) {
    let output = await execCmd('cargo contract instantiate --constructor new ' + (args == undefined || args == "" ? "" : " --args " + args) + ' --suri //' + acc + ' --code-hash ' + code_hash, "Contract ", path);
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
            auth: proxybasepath + "authenticated_proxy", registry: proxybasepath + "wyvern_proxy_registry", delegate: proxybasepath + "ownable_delegate_proxy", token: proxybasepath + "wyvern_token_transfer_proxy", erc20: basepath + "erc20", erc721: basepath + "erc721", atom: proxybasepath + "wyvern_atomicizer"
        };
        let args = ["", "0xd1e8fb8f0ad7da538711ed26e6c5e37ee8874dce37fdd3d607800d56f706969a", "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY 0xd1e8fb8f0ad7da538711ed26e6c5e37ee8874dce37fdd3d607800d56f706969a 0x0", "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY", "1000000000000000000000000000", ""];
        let keys = Object.keys(pathes);
        let p = Object.values(pathes);
        let codehashes=[];
        let contractaddresses=[];
        for (let i = 0; i < 6; i++) {
            const code_hash = await upload(users[i], p[i], keys[i]);// "0xd1e8fb8f0ad7da538711ed26e6c5e37ee8874dce37fdd3d607800d56f706969a";//
            console.log(i,"======code_hash======", code_hash);

            codehashes.push(code_hash);
            if (i==0){
                args[i+1]=code_hash;
                args[i+1]=" 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY "+code_hash+" 0x0";
            }
            const contract_address = await instantiate(users[i], args[i], code_hash, p[i], keys[i]);
            if (i==1){
                args[3]=contract_address;
            }
            contractaddresses.push(contract_address);
         
            console.log(i,"======contract_address======", contract_address)
        }
    }
    // let keyword = "Contract";
    // let stdout = "s ➜ Instantiated\n          deployer: 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY\n          contract: 5Cx8PdsepXFn39oQvJ9YyW8GRK46jRNqtcU7hq3XAXU8DEEV\n        Event Balances ➜ Transfer\n          from: 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY\n          to: 5Cx8PdsepXFn39oQvJ9YyW8GRK46jRNqtcU7hq3XAXU8DEEV\n          amount: 400330000000\n        Event Balances ➜ Reserved\n          who: 5Cx8PdsepXFn39oQvJ9YyW8GRK46jRNqtcU7hq3XAXU8DEEV\n          amount: 400330000000\n        Event System ➜ ExtrinsicSuccess\n          dispatch_info: DispatchInfo { weight: 3637845490, class: Normal, pays_fee: Yes }\n\n     Contract 5Cx8PdsepXFn39oQvJ9YyW8GRK46jRNqtcU7hq3XAXU8DEEV"
    // console.log(stdout.substring(stdout.indexOf(keyword) + keyword.length).trim())
    // await savejson("k", "v", true);
    // await savejson("k", "v1", true);
    // await savejson("k1", "v", true);
    // await savejson("ka", "va", false);
})();
console.log("============")