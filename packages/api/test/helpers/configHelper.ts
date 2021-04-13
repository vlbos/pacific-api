
import fs from 'fs';
import path from 'path';

const configFile = `nonce.json`
export function savejson(json: any, file: any) {
    try {
        const cmpPath = path.join(__dirname, file);

        if (!fs.existsSync(cmpPath)) {
            fs.writeFileSync(cmpPath, JSON.stringify(json, null, 2), { flag: 'w' });
        }
    } catch (error) {
        console.error(error)
    }


}

export function readjson(file: any): any {
    try {
        const cmpPath = path.join(__dirname, file);

        if (!fs.existsSync(cmpPath)) {
            return {};
        }

        return JSON.parse(fs.readFileSync(cmpPath, 'utf8'));

    } catch (error) {
        console.error(error)
    }
}

export function getValue(key: any) {
    const json = readjson(configFile);
    if (json[key] == undefined){
        return 0
    }
    return json[key]
}

export function putKV(key: any,value:any): any {
        const json = readjson(configFile);
        json[key]=value;
        savejson(json,configFile);
}