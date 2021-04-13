import { ApiPromise, Keyring } from '@polkadot/api'//WsProvider,
// import { ApiOptions } from '@polkadot/api/types';
import '@polkadot/types/augment'
import '@polkadot/api/augment'
import * as definitions from '../../interfaces/definitions';
import '../../interfaces/augment-api';
import '../../interfaces/augment-types';
import { putKV, getValue } from '../../api/test/helpers/configHelper'

export function submit(api: any, txn: any, sender: any) {
    const txnId = `${sender.key.meta.name}+${sender.nonce}`
    const getType = (arg: any) => `${arg.type}` === 'Bytes' && arg.Type.name === 'Text' ? 'Text' : arg.type
    const args = txn.args.map((arg: any, idx: any) => `${api.registry.createType(getType(txn.meta.args[idx]), arg)}`)
    console.log(` > [${txnId}] Submitting: ${txn.method.section}.${txn.method.method}(${args})`)
    return new Promise(async (resolve, reject) => {
        try {
            // retrieve sender's next index/nonce, taking txs in the pool into account
            // if (0== sender.nonce) {
            //     console.log("sender.nonce==7==", sender.nonce);
            //     let nonce = await api.rpc.system.accountNextIndex(sender.key.address);
            //     if (0 != nonce.words[0]) {
            //         sender.nonce = nonce.words[0];
            //         console.log("sender.nonce==77==", sender.nonce);
            //     }
            // }
            // import type { AccountId, Balance, Header, Index } from '@polkadot/types/interfaces';
            // let acc = await api.query.system.account(sender.key.address);
            //   const nonce1 = await api.query.system.accountNonce<Index>(sender.key.address);
            //   const nonce2 = await api.query.system.accountNonce(sender.key.address);

            console.log(` > [${txnId}] Submitting: ${txn.method.section}.${txn.method.method}(${args})`, "submit sender.nonce====",  sender.nonce)
            const drop = await txn.signAndSend(sender.key, { nonce: sender.nonce++ }, ({ status, events, dispatchError }: { status: any; events: any; dispatchError: any; }) => {
                if (!status.isInBlock && !status.isFinalized) {
                    return
                }

                drop()
                if (dispatchError) {
                    if (!dispatchError.isModule) { throw new Error(`${dispatchError}`) }
                    const decoded = api.registry.findMetaError(dispatchError.asModule)
                    console.log(JSON.stringify(decoded))
                    throw decoded.documentation.join(' ')
                }

                console.log(` < [${txnId}] In block: ${status.asInBlock}`)
                resolve(events)
            })
        } catch (e) {
            reject(`${e}`)
        }
    })
}

export function testUsers(): any {
    const keyring = new Keyring({ type: 'sr25519' })
    return {
        admin: { key: keyring.addFromUri('//Alice', { name: 'ADMIN' }), nonce: 0 },
        bob: { key: keyring.addFromUri('//Bob', { name: 'Bob' }), nonce: 0 },
        bobBank: { key: keyring.addFromUri('//Bob//stash', { name: 'Bob-BANK' }), nonce: 0 },
        betty: { key: keyring.addFromUri('//Bert', { name: 'Bert' }), nonce: 0 },
        charlie: { key: keyring.addFromUri('//Charlie', { name: 'Charlie' }), nonce: 0 },
        charlieBank: { key: keyring.addFromUri('//Charlie//stash', { name: 'Charlie-BANK' }), nonce: 0 },
        clarice: { key: keyring.addFromUri('//Clarice', { name: 'Clarice' }), nonce: 0 },
        dave: { key: keyring.addFromUri('//Dave', { name: 'Dave' }), nonce: 0 },
        daveBank: { key: keyring.addFromUri('//Dave//stash', { name: 'Dave-BANK' }), nonce: 0 },
        daisy: { key: keyring.addFromUri('//Daisy', { name: 'Daisy' }), nonce: 0 },
        eve: { key: keyring.addFromUri('//Eve', { name: 'Eve' }), nonce: 0 },
        eveBank: { key: keyring.addFromUri('//Eve//stash', { name: 'Eve-BANK' }), nonce: 0 },
        erowid: { key: keyring.addFromUri('//Erowid', { name: 'Erowid' }), nonce: 0 },
        ferdie: { key: keyring.addFromUri('//Ferdie', { name: 'Ferdie' }), nonce: 0 },
        ferdieBank: { key: keyring.addFromUri('//Ferdie//stash', { name: 'Ferdie-BANK' }), nonce: 0 },
        francis: { key: keyring.addFromUri('//Francis', { name: 'Francis' }), nonce: 0 },
    }
}

// import { TypeRegistry } from '@polkadot/types/create';
// const registry = new TypeRegistry();
// import types from '../../../config/types.json'
// import rpcs from '../../../config/rpcs.json'
import { createType } from '@polkadot/types';
export async function initmetedata(): Promise<ApiPromise> {
    console.log("===============odkddd==========")
    console.log("===============odkddd==========")

    // const provider = new WsProvider('ws://127.0.0.1:9944/');
    // // const rpc = { ...rpcs };
    // const registry = new TypeRegistry();
    // extract all types from definitions - fast and dirty approach, flatted on 'types'
    const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {});
    console.log("===============odkddd==========")

    const api = await ApiPromise.create({
        types: {
            ...types,
            // chain-specific overrides
            Keys: 'SessionKeys4'
        }
    });
    console.log("===============odkddd==========")
    console.log(`OrderId bitLength:`, [
        api.createType('OrderId').toString(),
        api.registry.createType('OrderId').toString(),
        createType(api.registry, 'OrderId').toString()
    ]);
    // // Construct the actual api
    // const api = await ApiPromise.create({
    //     provider,
    //     types,
    //     rpc,
    //     registry
    // });
    // await provider.connect()
    // const rpcData = await provider.send('state_getMetadata', []);
    //   const genesisHash = registry.createType('Hash', await provider.send('chain_getBlockHash', [])).toHex();
    //   const specVersion = 0;
    //   const metadata: any = {};
    //   const key = `${genesisHash}-${specVersion}`;

    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    //   metadata[key] = rpcData;
    //   console.log("========================",rpcData)
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   const api = await ApiPromise.create({ metadata, provider, registry } as ApiOptions);


    return api
    //   expect(api.genesisHash).toBeDefined();
    //   expect(api.runtimeMetadata).toBeDefined();
    //   expect(api.runtimeVersion).toBeDefined();
    //   expect(api.rpc).toBeDefined();
    //   expect(api.query).toBeDefined();
    //   expect(api.tx).toBeDefined();
    //   expect(api.derive).toBeDefined();
}