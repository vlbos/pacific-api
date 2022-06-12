// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Result, U8aFixed, Vec, bool, u128, u64 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H256 } from '@polkadot/types/interfaces/runtime';
import type { FrameSupportTokensMiscBalanceStatus, FrameSupportWeightsDispatchInfo, PalletWyvernExchangeCoreFeeMethod, PalletWyvernExchangeCoreHowToCall, PalletWyvernExchangeCoreSaleKind, PalletWyvernExchangeCoreSide, SpFinalityGrandpaAppPublic, SpRuntimeDispatchError } from '@polkadot/types/lookup';

declare module '@polkadot/api-base/types/events' {
  export interface AugmentedEvents<ApiType extends ApiTypes> {
    balances: {
      /**
       * A balance was set by root.
       **/
      BalanceSet: AugmentedEvent<ApiType, [AccountId32, u128, u128]>;
      /**
       * Some amount was deposited (e.g. for transaction fees).
       **/
      Deposit: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * An account was removed whose balance was non-zero but below ExistentialDeposit,
       * resulting in an outright loss.
       **/
      DustLost: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * An account was created with some free balance.
       **/
      Endowed: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * Some balance was reserved (moved from free to reserved).
       **/
      Reserved: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * Some balance was moved from the reserve of the first account to the second account.
       * Final argument indicates the destination balance type.
       **/
      ReserveRepatriated: AugmentedEvent<ApiType, [AccountId32, AccountId32, u128, FrameSupportTokensMiscBalanceStatus]>;
      /**
       * Some amount was removed from the account (e.g. for misbehavior).
       **/
      Slashed: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * Transfer succeeded.
       **/
      Transfer: AugmentedEvent<ApiType, [AccountId32, AccountId32, u128]>;
      /**
       * Some balance was unreserved (moved from reserved to free).
       **/
      Unreserved: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * Some amount was withdrawn from the account (e.g. for transaction fees).
       **/
      Withdraw: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    contracts: {
      /**
       * A code with the specified hash was removed.
       **/
      CodeRemoved: AugmentedEvent<ApiType, [H256]>;
      /**
       * Code with the specified hash has been stored.
       **/
      CodeStored: AugmentedEvent<ApiType, [H256]>;
      /**
       * A contract's code was updated.
       **/
      ContractCodeUpdated: AugmentedEvent<ApiType, [AccountId32, H256, H256]>;
      /**
       * A custom event emitted by the contract.
       **/
      ContractEmitted: AugmentedEvent<ApiType, [AccountId32, Bytes]>;
      /**
       * Contract deployed by address at the specified address.
       **/
      Instantiated: AugmentedEvent<ApiType, [AccountId32, AccountId32]>;
      /**
       * Contract has been removed.
       * 
       * # Note
       * 
       * The only way for a contract to be removed and emitting this event is by calling
       * `seal_terminate`.
       **/
      Terminated: AugmentedEvent<ApiType, [AccountId32, AccountId32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    grandpa: {
      /**
       * New authority set has been applied.
       **/
      NewAuthorities: AugmentedEvent<ApiType, [Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>]>;
      /**
       * Current authority set has been paused.
       **/
      Paused: AugmentedEvent<ApiType, []>;
      /**
       * Current authority set has been resumed.
       **/
      Resumed: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    orderbook: {
      AssetWhiteListLimitsChanged: AugmentedEvent<ApiType, [u64]>;
      AssetWhiteListPosted: AugmentedEvent<ApiType, [Bytes, Bytes, Bytes]>;
      OrderLimitsChanged: AugmentedEvent<ApiType, [u64]>;
      OrderPosted: AugmentedEvent<ApiType, [AccountId32, Bytes, AccountId32]>;
      OwnerChanged: AugmentedEvent<ApiType, [AccountId32, AccountId32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    substrateKitties: {
      /**
       * A new kitty was successfully created.
       **/
      Created: AugmentedEvent<ApiType, [U8aFixed, AccountId32]>;
      /**
       * The price of a kitty was successfully set.
       **/
      PriceSet: AugmentedEvent<ApiType, [U8aFixed, Option<u128>]>;
      /**
       * A kitty was successfully sold.
       **/
      Sold: AugmentedEvent<ApiType, [AccountId32, AccountId32, U8aFixed, u128]>;
      /**
       * A kitty was successfully transferred.
       **/
      Transferred: AugmentedEvent<ApiType, [AccountId32, AccountId32, U8aFixed]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sudo: {
      /**
       * The \[sudoer\] just switched identity; the old key is supplied if one existed.
       **/
      KeyChanged: AugmentedEvent<ApiType, [Option<AccountId32>]>;
      /**
       * A sudo just took place. \[result\]
       **/
      Sudid: AugmentedEvent<ApiType, [Result<Null, SpRuntimeDispatchError>]>;
      /**
       * A sudo just took place. \[result\]
       **/
      SudoAsDone: AugmentedEvent<ApiType, [Result<Null, SpRuntimeDispatchError>]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    system: {
      /**
       * `:code` was updated.
       **/
      CodeUpdated: AugmentedEvent<ApiType, []>;
      /**
       * An extrinsic failed.
       **/
      ExtrinsicFailed: AugmentedEvent<ApiType, [SpRuntimeDispatchError, FrameSupportWeightsDispatchInfo]>;
      /**
       * An extrinsic completed successfully.
       **/
      ExtrinsicSuccess: AugmentedEvent<ApiType, [FrameSupportWeightsDispatchInfo]>;
      /**
       * An account was reaped.
       **/
      KilledAccount: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * A new account was created.
       **/
      NewAccount: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * On on-chain remark happened.
       **/
      Remarked: AugmentedEvent<ApiType, [AccountId32, H256]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    wyvernExchangeCore: {
      ContractSelfChanged: AugmentedEvent<ApiType, [AccountId32, AccountId32]>;
      GasLimitChanged: AugmentedEvent<ApiType, [AccountId32, u64]>;
      MinimumMakerProtocolFeeChanged: AugmentedEvent<ApiType, [u128]>;
      MinimumTakerProtocolFeeChanged: AugmentedEvent<ApiType, [u128]>;
      OrderApprovedPartOne: AugmentedEvent<ApiType, [Bytes, AccountId32, AccountId32, AccountId32, u128, u128, u128, u128, AccountId32, PalletWyvernExchangeCoreFeeMethod, PalletWyvernExchangeCoreSide, PalletWyvernExchangeCoreSaleKind, AccountId32]>;
      OrderApprovedPartTwo: AugmentedEvent<ApiType, [Bytes, PalletWyvernExchangeCoreHowToCall, Bytes, Bytes, AccountId32, Bytes, AccountId32, u128, u64, u64, u64, u64, bool]>;
      OrderCancelled: AugmentedEvent<ApiType, [Bytes]>;
      OrdersMatched: AugmentedEvent<ApiType, [Bytes, Bytes, AccountId32, AccountId32, u128, Bytes]>;
      OwnerChanged: AugmentedEvent<ApiType, [AccountId32, AccountId32]>;
      ProtocolFeeRecipientChanged: AugmentedEvent<ApiType, [AccountId32, AccountId32]>;
      ProxyRegistryChanged: AugmentedEvent<ApiType, [AccountId32, AccountId32]>;
      ProxySelectorChanged: AugmentedEvent<ApiType, [AccountId32, Bytes]>;
      TokenSelectorChanged: AugmentedEvent<ApiType, [AccountId32, Bytes]>;
      TokenTransferProxyChanged: AugmentedEvent<ApiType, [AccountId32, AccountId32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
  } // AugmentedEvents
} // declare module
