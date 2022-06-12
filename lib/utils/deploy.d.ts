declare const fs: any;
declare const util: any;
declare const exec: any;
declare const basepath = "/Users/lisheng/Downloads/cargo-contract-1.1.0/target/release/";
declare function execCmd(cmd: String, keyword: String, path: String): Promise<any>;
declare function savejson(key: String, value: String, section: String): Promise<void>;
declare function getjson(key: String, section: String): Promise<any>;
declare function upload(acc: String, path: String, key: String): Promise<any>;
declare function instantiate(acc: String, args: String, code_hash: String, path: String, key: String): Promise<any>;
