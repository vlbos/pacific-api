// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api-base/types';
import type { Bytes, bool, u64 } from '@polkadot/types-codec';
import type { BalanceStatus } from '@polkadot/types/interfaces/balances';
import type { AuthorityList } from '@polkadot/types/interfaces/grandpa';
import type { AccountId, Balance, Moment } from '@polkadot/types/interfaces/runtime';
import type { DispatchError, DispatchInfo, DispatchResult } from '@polkadot/types/interfaces/system';
import type { OrderId } from 'pacificstore-polkadotjs-typegen/interfaces/orderbook';
import type { FeeMethod, HowToCall, SaleKind, Side } from 'pacificstore-polkadotjs-typegen/interfaces/wyvernExchangeCore';

declare module '@polkadot/api-base/types/events' {
  export interface AugmentedEvents<ApiType extends ApiTypes> {
    balances: {
      /**
       * A balance was set by root. \[who, free, reserved\]
       **/
      BalanceSet: AugmentedEvent<ApiType, [AccountId, Balance, Balance]>;
      /**
       * Some amount was deposited (e.g. for transaction fees). \[who, deposit\]
       **/
      Deposit: AugmentedEvent<ApiType, [AccountId, Balance]>;
      /**
       * An account was removed whose balance was non-zero but below ExistentialDeposit,
       * resulting in an outright loss. \[account, balance\]
       **/
      DustLost: AugmentedEvent<ApiType, [AccountId, Balance]>;
      /**
       * An account was created with some free balance. \[account, free_balance\]
       **/
      Endowed: AugmentedEvent<ApiType, [AccountId, Balance]>;
      /**
       * Some balance was reserved (moved from free to reserved). \[who, value\]
       **/
      Reserved: AugmentedEvent<ApiType, [AccountId, Balance]>;
      /**
       * Some balance was moved from the reserve of the first account to the second account.
       * Final argument indicates the destination balance type.
       * \[from, to, balance, destination_status\]
       **/
      ReserveRepatriated: AugmentedEvent<ApiType, [AccountId, AccountId, Balance, BalanceStatus]>;
      /**
       * Transfer succeeded. \[from, to, value\]
       **/
      Transfer: AugmentedEvent<ApiType, [AccountId, AccountId, Balance]>;
      /**
       * Some balance was unreserved (moved from reserved to free). \[who, value\]
       **/
      Unreserved: AugmentedEvent<ApiType, [AccountId, Balance]>;
    };
    grandpa: {
      /**
       * New authority set has been applied. \[authority_set\]
       **/
      NewAuthorities: AugmentedEvent<ApiType, [AuthorityList]>;
      /**
       * Current authority set has been paused.
       **/
      Paused: AugmentedEvent<ApiType, []>;
      /**
       * Current authority set has been resumed.
       **/
      Resumed: AugmentedEvent<ApiType, []>;
    };
    orderbook: {
      AssetWhiteListLimitsChanged: AugmentedEvent<ApiType, [u64]>;
      AssetWhiteListPosted: AugmentedEvent<ApiType, [Bytes, Bytes, Bytes]>;
      OrderLimitsChanged: AugmentedEvent<ApiType, [u64]>;
      OrderPosted: AugmentedEvent<ApiType, [AccountId, OrderId, AccountId]>;
      OwnerChanged: AugmentedEvent<ApiType, [AccountId, AccountId]>;
    };
    sudo: {
      /**
       * The \[sudoer\] just switched identity; the old key is supplied.
       **/
      KeyChanged: AugmentedEvent<ApiType, [AccountId]>;
      /**
       * A sudo just took place. \[result\]
       **/
      Sudid: AugmentedEvent<ApiType, [DispatchResult]>;
      /**
       * A sudo just took place. \[result\]
       **/
      SudoAsDone: AugmentedEvent<ApiType, [bool]>;
    };
    system: {
      /**
       * `:code` was updated.
       **/
      CodeUpdated: AugmentedEvent<ApiType, []>;
      /**
       * An extrinsic failed. \[error, info\]
       **/
      ExtrinsicFailed: AugmentedEvent<ApiType, [DispatchError, DispatchInfo]>;
      /**
       * An extrinsic completed successfully. \[info\]
       **/
      ExtrinsicSuccess: AugmentedEvent<ApiType, [DispatchInfo]>;
      /**
       * An \[account\] was reaped.
       **/
      KilledAccount: AugmentedEvent<ApiType, [AccountId]>;
      /**
       * A new \[account\] was created.
       **/
      NewAccount: AugmentedEvent<ApiType, [AccountId]>;
    };
    wyvernExchangeCore: {
      ContractSelfChanged: AugmentedEvent<ApiType, [AccountId, AccountId]>;
      MinimumMakerProtocolFeeChanged: AugmentedEvent<ApiType, [Balance]>;
      MinimumTakerProtocolFeeChanged: AugmentedEvent<ApiType, [Balance]>;
      OrderApprovedPartOne: AugmentedEvent<ApiType, [Bytes, AccountId, AccountId, AccountId, Balance, Balance, Balance, Balance, AccountId, FeeMethod, Side, SaleKind, AccountId]>;
      OrderApprovedPartTwo: AugmentedEvent<ApiType, [Bytes, HowToCall, Bytes, Bytes, AccountId, Bytes, AccountId, Balance, Moment, Moment, Moment, u64, bool]>;
      OrderCancelled: AugmentedEvent<ApiType, [Bytes]>;
      OrdersMatched: AugmentedEvent<ApiType, [Bytes, Bytes, AccountId, AccountId, Balance, Bytes]>;
      OwnerChanged: AugmentedEvent<ApiType, [AccountId, AccountId]>;
      ProtocolFeeRecipientChanged: AugmentedEvent<ApiType, [AccountId, AccountId]>;
    };
  } // AugmentedEvents
} // declare module
