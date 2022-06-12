// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api-base/types';
import type { Bytes, Compact, Option, U8aFixed, Vec, bool, u128, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, IMethod, ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H256, MultiAddress, Perbill } from '@polkadot/types/interfaces/runtime';
import type { PalletOrderbookOrderField, PalletWyvernExchangeCoreFeeMethod, PalletWyvernExchangeCoreHowToCall, PalletWyvernExchangeCoreSaleKind, PalletWyvernExchangeCoreSide, SpSessionMembershipProof, SpFinalityGrandpaEquivocationProof } from '@polkadot/types/lookup';

declare module '@polkadot/api-base/types/submittable' {
  export interface AugmentedSubmittables<ApiType extends ApiTypes> {
    balances: {
      /**
       * Exactly as `transfer`, except the origin must be root and the source account may be
       * specified.
       * # <weight>
       * - Same as transfer, but additional read and write because the source account is not
       * assumed to be in the overlay.
       * # </weight>
       **/
      forceTransfer: AugmentedSubmittable<(source: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, MultiAddress, Compact<u128>]>;
      /**
       * Unreserve some balance from a user by force.
       * 
       * Can only be called by ROOT.
       **/
      forceUnreserve: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, u128]>;
      /**
       * Set the balances of a given account.
       * 
       * This will alter `FreeBalance` and `ReservedBalance` in storage. it will
       * also alter the total issuance of the system (`TotalIssuance`) appropriately.
       * If the new free or reserved balance is below the existential deposit,
       * it will reset the account nonce (`frame_system::AccountNonce`).
       * 
       * The dispatch origin for this call is `root`.
       **/
      setBalance: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, newFree: Compact<u128> | AnyNumber | Uint8Array, newReserved: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>, Compact<u128>]>;
      /**
       * Transfer some liquid free balance to another account.
       * 
       * `transfer` will set the `FreeBalance` of the sender and receiver.
       * If the sender's account is below the existential deposit as a result
       * of the transfer, the account will be reaped.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Dependent on arguments but not critical, given proper implementations for input config
       * types. See related functions below.
       * - It contains a limited number of reads and writes internally and no complex
       * computation.
       * 
       * Related functions:
       * 
       * - `ensure_can_withdraw` is always called internally but has a bounded complexity.
       * - Transferring balances to accounts that did not exist before will cause
       * `T::OnNewAccount::on_new_account` to be called.
       * - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
       * - `transfer_keep_alive` works the same way as `transfer`, but has an additional check
       * that the transfer will not kill the origin account.
       * ---------------------------------
       * - Origin account is already in memory, so no DB operations for them.
       * # </weight>
       **/
      transfer: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * Transfer the entire transferable balance from the caller account.
       * 
       * NOTE: This function only attempts to transfer _transferable_ balances. This means that
       * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
       * transferred by this function. To ensure that this function results in a killed account,
       * you might need to prepare the account by removing any reference counters, storage
       * deposits, etc...
       * 
       * The dispatch origin of this call must be Signed.
       * 
       * - `dest`: The recipient of the transfer.
       * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
       * of the funds the account has, causing the sender account to be killed (false), or
       * transfer everything except at least the existential deposit, which will guarantee to
       * keep the sender account alive (true). # <weight>
       * - O(1). Just like transfer, but reading the user's transferable balance first.
       * #</weight>
       **/
      transferAll: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, keepAlive: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, bool]>;
      /**
       * Same as the [`transfer`] call, but with a check that the transfer will not kill the
       * origin account.
       * 
       * 99% of the time you want [`transfer`] instead.
       * 
       * [`transfer`]: struct.Pallet.html#method.transfer
       **/
      transferKeepAlive: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    contracts: {
      /**
       * Makes a call to an account, optionally transferring some balance.
       * 
       * # Parameters
       * 
       * * `dest`: Address of the contract to call.
       * * `value`: The balance to transfer from the `origin` to `dest`.
       * * `gas_limit`: The gas limit enforced when executing the constructor.
       * * `storage_deposit_limit`: The maximum amount of balance that can be charged from the
       * caller to pay for the storage consumed.
       * * `data`: The input data to pass to the contract.
       * 
       * * If the account is a smart-contract account, the associated code will be
       * executed and any value will be transferred.
       * * If the account is a regular account, any value will be transferred.
       * * If no account exists and the call value is not less than `existential_deposit`,
       * a regular account will be created and any value will be transferred.
       **/
      call: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array, gasLimit: Compact<u64> | AnyNumber | Uint8Array, storageDepositLimit: Option<Compact<u128>> | null | object | string | Uint8Array, data: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>, Compact<u64>, Option<Compact<u128>>, Bytes]>;
      /**
       * Instantiates a contract from a previously deployed wasm binary.
       * 
       * This function is identical to [`Self::instantiate_with_code`] but without the
       * code deployment step. Instead, the `code_hash` of an on-chain deployed wasm binary
       * must be supplied.
       **/
      instantiate: AugmentedSubmittable<(value: Compact<u128> | AnyNumber | Uint8Array, gasLimit: Compact<u64> | AnyNumber | Uint8Array, storageDepositLimit: Option<Compact<u128>> | null | object | string | Uint8Array, codeHash: H256 | string | Uint8Array, data: Bytes | string | Uint8Array, salt: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, Compact<u64>, Option<Compact<u128>>, H256, Bytes, Bytes]>;
      /**
       * Instantiates a new contract from the supplied `code` optionally transferring
       * some balance.
       * 
       * This dispatchable has the same effect as calling [`Self::upload_code`] +
       * [`Self::instantiate`]. Bundling them together provides efficiency gains. Please
       * also check the documentation of [`Self::upload_code`].
       * 
       * # Parameters
       * 
       * * `value`: The balance to transfer from the `origin` to the newly created contract.
       * * `gas_limit`: The gas limit enforced when executing the constructor.
       * * `storage_deposit_limit`: The maximum amount of balance that can be charged/reserved
       * from the caller to pay for the storage consumed.
       * * `code`: The contract code to deploy in raw bytes.
       * * `data`: The input data to pass to the contract constructor.
       * * `salt`: Used for the address derivation. See [`Pallet::contract_address`].
       * 
       * Instantiation is executed as follows:
       * 
       * - The supplied `code` is instrumented, deployed, and a `code_hash` is created for that
       * code.
       * - If the `code_hash` already exists on the chain the underlying `code` will be shared.
       * - The destination address is computed based on the sender, code_hash and the salt.
       * - The smart-contract account is created at the computed address.
       * - The `value` is transferred to the new account.
       * - The `deploy` function is executed in the context of the newly-created account.
       **/
      instantiateWithCode: AugmentedSubmittable<(value: Compact<u128> | AnyNumber | Uint8Array, gasLimit: Compact<u64> | AnyNumber | Uint8Array, storageDepositLimit: Option<Compact<u128>> | null | object | string | Uint8Array, code: Bytes | string | Uint8Array, data: Bytes | string | Uint8Array, salt: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, Compact<u64>, Option<Compact<u128>>, Bytes, Bytes, Bytes]>;
      /**
       * Remove the code stored under `code_hash` and refund the deposit to its owner.
       * 
       * A code can only be removed by its original uploader (its owner) and only if it is
       * not used by any contract.
       **/
      removeCode: AugmentedSubmittable<(codeHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      /**
       * Privileged function that changes the code of an existing contract.
       * 
       * This takes care of updating refcounts and all other necessary operations. Returns
       * an error if either the `code_hash` or `dest` do not exist.
       * 
       * # Note
       * 
       * This does **not** change the address of the contract in question. This means
       * that the contract address is no longer derived from its code hash after calling
       * this dispatchable.
       **/
      setCode: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, codeHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, H256]>;
      /**
       * Upload new `code` without instantiating a contract from it.
       * 
       * If the code does not already exist a deposit is reserved from the caller
       * and unreserved only when [`Self::remove_code`] is called. The size of the reserve
       * depends on the instrumented size of the the supplied `code`.
       * 
       * If the code already exists in storage it will still return `Ok` and upgrades
       * the in storage version to the current
       * [`InstructionWeights::version`](InstructionWeights).
       * 
       * # Note
       * 
       * Anyone can instantiate a contract from any uploaded code and thus prevent its removal.
       * To avoid this situation a constructor could employ access control so that it can
       * only be instantiated by permissioned entities. The same is true when uploading
       * through [`Self::instantiate_with_code`].
       **/
      uploadCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array, storageDepositLimit: Option<Compact<u128>> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, Option<Compact<u128>>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    grandpa: {
      /**
       * Note that the current authority set of the GRANDPA finality gadget has
       * stalled. This will trigger a forced authority set change at the beginning
       * of the next session, to be enacted `delay` blocks after that. The delay
       * should be high enough to safely assume that the block signalling the
       * forced change will not be re-orged (e.g. 1000 blocks). The GRANDPA voters
       * will start the new authority set using the given finalized block as base.
       * Only callable by root.
       **/
       noteStalled: AugmentedSubmittable<(delay: u32 | AnyNumber | Uint8Array, bestFinalizedBlockNumber: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Report voter equivocation/misbehavior. This method will verify the
       * equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence
       * will be reported.
       **/
      reportEquivocation: AugmentedSubmittable<(equivocationProof: SpFinalityGrandpaEquivocationProof | {
                setId?: any;
                equivocation?: any;
            } | string | Uint8Array, keyOwnerProof: SpSessionMembershipProof | {
                session?: any;
                trieNodes?: any;
                validatorCount?: any;
            } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [SpFinalityGrandpaEquivocationProof, SpSessionMembershipProof]>;
            /**
             * Report voter equivocation/misbehavior. This method will verify the
             * equivocation proof and validate the given key ownership proof
             * against the extracted offender. If both are valid, the offence
             * will be reported.
             *
             * This extrinsic must be called unsigned and it is expected that only
             * block authors will call it (validated in `ValidateUnsigned`), as such
             * if the block author is defined it will be defined as the equivocation
             * reporter.
             **/
            reportEquivocationUnsigned: AugmentedSubmittable<(equivocationProof: SpFinalityGrandpaEquivocationProof | {
                setId?: any;
                equivocation?: any;
            } | string | Uint8Array, keyOwnerProof: SpSessionMembershipProof | {
                session?: any;
                trieNodes?: any;
                validatorCount?: any;
            } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [SpFinalityGrandpaEquivocationProof, SpSessionMembershipProof]>;
            /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    orderbook: {
      changeOwner: AugmentedSubmittable<(newOwner: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Create a whitelist entry for an asset to prevent others from buying.
       * Buyers will have to have verified at least one of the emails
       * on an asset in order to buy.
       * This will return error code if the given API key isn't allowed to
       * create whitelist entries for this contract or asset.
       * tokenAddress Address of the asset's contract
       * tokenId The asset's token ID
       * email The email allowed to buy.
       **/
      postAssetWhiteList: AugmentedSubmittable<(tokenAddress: Bytes | string | Uint8Array, tokenId: Bytes | string | Uint8Array, email: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, Bytes, Bytes]>;
      /**
       * Send an order to the orderbook.
       * param order Order JSON to post to the orderbook
       **/
      postOrder: AugmentedSubmittable<(orderId: Bytes | string | Uint8Array, owner: AccountId32 | string | Uint8Array, fields: Option<Vec<PalletOrderbookOrderField>> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, AccountId32, Option<Vec<PalletOrderbookOrderField>>]>;
      /**
       * remove an asset whitelist on chain.
       * tokenAddress Address of the asset's contract
       * tokenId The asset's token ID
       **/
      removeAssetWhiteList: AugmentedSubmittable<(tokenAddress: Bytes | string | Uint8Array, tokenId: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, Bytes]>;
      /**
       * remove an order on chain.
       * orderIndx the index of the order
       **/
      removeOrder: AugmentedSubmittable<(orderIndex: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      setAssetWhiteListLimits: AugmentedSubmittable<(limits: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      setOrderLimits: AugmentedSubmittable<(limits: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    substrateKitties: {
      /**
       * Breed a kitty.
       * 
       * Breed two kitties to give birth to a new kitty.
       **/
      breedKitty: AugmentedSubmittable<(parent1: U8aFixed | string | Uint8Array, parent2: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [U8aFixed, U8aFixed]>;
      /**
       * Buy a kitty for sale. The `limit_price` parameter is set as a safeguard against the
       * possibility that the seller front-runs the transaction by setting a high price. A front-end
       * should assume that this value is always equal to the actual price of the kitty. The buyer
       * will always be charged the actual price of the kitty.
       * 
       * If successful, this dispatchable will reset the price of the kitty to `None`, making
       * it no longer for sale and handle the balance and kitty transfer between the buyer and seller.
       **/
      buyKitty: AugmentedSubmittable<(kittyId: U8aFixed | string | Uint8Array, limitPrice: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [U8aFixed, u128]>;
      /**
       * Create a new unique kitty.
       * 
       * The actual kitty creation is done in the `mint()` function.
       **/
      createKitty: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Set the price for a kitty.
       * 
       * Updates kitty price and updates storage.
       **/
      setPrice: AugmentedSubmittable<(kittyId: U8aFixed | string | Uint8Array, newPrice: Option<u128> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [U8aFixed, Option<u128>]>;
      /**
       * Directly transfer a kitty to another recipient.
       * 
       * Any account that holds a kitty can send it to another Account. This will reset the
       * asking price of the kitty, marking it not for sale.
       **/
      transfer: AugmentedSubmittable<(to: AccountId32 | string | Uint8Array, kittyId: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, U8aFixed]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    sudo: {
      /**
       * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
       * key.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB change.
       * # </weight>
       **/
      setKey: AugmentedSubmittable<(updated: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + 10,000.
       * # </weight>
       **/
      sudo: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Signed` origin from
       * a given account.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + 10,000.
       * # </weight>
       **/
      sudoAs: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Call]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * This function does not check the weight of the call, and instead allows the
       * Sudo user to specify the weight of the call.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - The weight of this call is defined by the caller.
       * # </weight>
       **/
      sudoUncheckedWeight: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array, weight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, u64]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    system: {
      /**
       * A dispatch that will fill the block weight up to the given ratio.
       **/
      fillBlock: AugmentedSubmittable<(ratio: Perbill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Perbill]>;
      /**
       * Kill all storage items with a key that starts with the given prefix.
       * 
       * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
       * the prefix we are removing to accurately calculate the weight of this function.
       **/
      killPrefix: AugmentedSubmittable<(prefix: Bytes | string | Uint8Array, subkeys: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, u32]>;
      /**
       * Kill some items from storage.
       **/
      killStorage: AugmentedSubmittable<(keys: Vec<Bytes> | (Bytes | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Bytes>]>;
      /**
       * Make some on-chain remark.
       * 
       * # <weight>
       * - `O(1)`
       * # </weight>
       **/
      remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Make some on-chain remark and emit event.
       **/
      remarkWithEvent: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code.
       * 
       * # <weight>
       * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
       * - 1 call to `can_set_code`: `O(S)` (calls `sp_io::misc::runtime_version` which is
       * expensive).
       * - 1 storage write (codec `O(C)`).
       * - 1 digest item.
       * - 1 event.
       * The weight of this function is dependent on the runtime, but generally this is very
       * expensive. We will treat this as a full block.
       * # </weight>
       **/
      setCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code without doing any checks of the given `code`.
       * 
       * # <weight>
       * - `O(C)` where `C` length of `code`
       * - 1 storage write (codec `O(C)`).
       * - 1 digest item.
       * - 1 event.
       * The weight of this function is dependent on the runtime. We will treat this as a full
       * block. # </weight>
       **/
      setCodeWithoutChecks: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the number of pages in the WebAssembly environment's heap.
       **/
      setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      /**
       * Set some items of storage.
       **/
      setStorage: AugmentedSubmittable<(items: Vec<ITuple<[Bytes, Bytes]>> | ([Bytes | string | Uint8Array, Bytes | string | Uint8Array])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[Bytes, Bytes]>>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    timestamp: {
      /**
       * Set the current time.
       * 
       * This call should be invoked exactly once per block. It will panic at the finalization
       * phase, if this call hasn't been invoked by that time.
       * 
       * The timestamp should be greater than the previous one by the amount specified by
       * `MinimumPeriod`.
       * 
       * The dispatch origin for this call must be `Inherent`.
       * 
       * # <weight>
       * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
       * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in
       * `on_finalize`)
       * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
       * # </weight>
       **/
      set: AugmentedSubmittable<(now: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    wyvernExchange: {
      approveOrderEx: AugmentedSubmittable<(addrs: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], uints: Vec<u64> | (u64 | AnyNumber | Uint8Array)[], feeMethod: PalletWyvernExchangeCoreFeeMethod | 'ProtocolFee' | 'SplitFee' | number | Uint8Array, side: PalletWyvernExchangeCoreSide | 'Buy' | 'Sell' | number | Uint8Array, saleKind: PalletWyvernExchangeCoreSaleKind | 'FixedPrice' | 'DutchAuction' | number | Uint8Array, howToCall: PalletWyvernExchangeCoreHowToCall | 'Call' | 'DelegateCall' | number | Uint8Array, calldata: Bytes | string | Uint8Array, replacementPattern: Bytes | string | Uint8Array, staticExtradata: Bytes | string | Uint8Array, orderbookInclusionDesired: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, Vec<u64>, PalletWyvernExchangeCoreFeeMethod, PalletWyvernExchangeCoreSide, PalletWyvernExchangeCoreSaleKind, PalletWyvernExchangeCoreHowToCall, Bytes, Bytes, Bytes, bool]>;
      atomicMatchEx: AugmentedSubmittable<(addrs: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], uints: Vec<u64> | (u64 | AnyNumber | Uint8Array)[], feeMethodsSidesKindsHowToCalls: Bytes | string | Uint8Array, calldataBuy: Bytes | string | Uint8Array, calldataSell: Bytes | string | Uint8Array, replacementPatternBuy: Bytes | string | Uint8Array, replacementPatternSell: Bytes | string | Uint8Array, staticExtradataBuy: Bytes | string | Uint8Array, staticExtradataSell: Bytes | string | Uint8Array, sigBuy: Bytes | string | Uint8Array, sigSell: Bytes | string | Uint8Array, rssMetadata: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, Vec<u64>, Bytes, Bytes, Bytes, Bytes, Bytes, Bytes, Bytes, Bytes, Bytes, Bytes]>;
      cancelOrderEx: AugmentedSubmittable<(addrs: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], uints: Vec<u64> | (u64 | AnyNumber | Uint8Array)[], feeMethod: PalletWyvernExchangeCoreFeeMethod | 'ProtocolFee' | 'SplitFee' | number | Uint8Array, side: PalletWyvernExchangeCoreSide | 'Buy' | 'Sell' | number | Uint8Array, saleKind: PalletWyvernExchangeCoreSaleKind | 'FixedPrice' | 'DutchAuction' | number | Uint8Array, howToCall: PalletWyvernExchangeCoreHowToCall | 'Call' | 'DelegateCall' | number | Uint8Array, calldata: Bytes | string | Uint8Array, replacementPattern: Bytes | string | Uint8Array, staticExtradata: Bytes | string | Uint8Array, sig: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, Vec<u64>, PalletWyvernExchangeCoreFeeMethod, PalletWyvernExchangeCoreSide, PalletWyvernExchangeCoreSaleKind, PalletWyvernExchangeCoreHowToCall, Bytes, Bytes, Bytes, Bytes]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    wyvernExchangeCore: {
      callProxyContracts: AugmentedSubmittable<(dest: AccountId32 | string | Uint8Array, selector: Bytes | string | Uint8Array, from: AccountId32 | string | Uint8Array, gasLimit: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, Bytes, AccountId32, Compact<u64>]>;
      /**
       * A generic extrinsic to wrap
       * [pallet_contracts::bare_call](https://github.com/paritytech/substrate/blob/352c46a648a5f2d4526e790a184daa4a1ffdb3bf/frame/contracts/src/lib.rs#L545-L562)
       * 
       * * `dest` - A destination account id for the contract being targeted
       * * `selector` - The 'selector' of the ink! smart contract function.
       * This can be retrived from the compiled `metadata.json`. It's possible to
       * [specify a selector](https://paritytech.github.io/ink-docs/macros-attributes/selector/) in
       * the smart contract itself.
       * * `arg` - An argument to be passed to the smart contract.
       * * `gas_limit` - The gas limit passed to the contract bare_call. This example should work
       * when given a value of around 10000000000
       **/
      callSmartContract: AugmentedSubmittable<(dest: AccountId32 | string | Uint8Array, selector: Bytes | string | Uint8Array, selectors: Bytes | string | Uint8Array, callees: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], from: AccountId32 | string | Uint8Array, to: AccountId32 | string | Uint8Array, values: Vec<u128> | (u128 | AnyNumber | Uint8Array)[], gasLimit: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, Bytes, Bytes, Vec<AccountId32>, AccountId32, AccountId32, Vec<u128>, Compact<u64>]>;
      callSmartContracts: AugmentedSubmittable<(dest: AccountId32 | string | Uint8Array, selector: Bytes | string | Uint8Array, from: AccountId32 | string | Uint8Array, to: AccountId32 | string | Uint8Array, values: u128 | AnyNumber | Uint8Array, gasLimit: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, Bytes, AccountId32, AccountId32, u128, Compact<u64>]>;
      changeMinimumMakerProtocolFee: AugmentedSubmittable<(newMinimumMakerProtocolFee: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128]>;
      changeMinimumTakerProtocolFee: AugmentedSubmittable<(newMinimumTakerProtocolFee: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128]>;
      changeOwner: AugmentedSubmittable<(newOwner: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      changeProtocolFeeRecipient: AugmentedSubmittable<(newProtocolFeeRecipient: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      setContractSelf: AugmentedSubmittable<(contract: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      setGasLimit: AugmentedSubmittable<(gasLimit: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      setProxyRegistry: AugmentedSubmittable<(registryAddress: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      setProxySelector: AugmentedSubmittable<(selectror: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      setTokenSelector: AugmentedSubmittable<(selectror: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      setTokenTransferProxy: AugmentedSubmittable<(proxyAddress: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  } // AugmentedSubmittables
} // declare module
