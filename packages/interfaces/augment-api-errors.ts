// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/errors' {
  export interface AugmentedErrors<ApiType> {
    balances: {
      /**
       * Beneficiary account must pre-exist
       **/
      DeadAccount: AugmentedError<ApiType>;
      /**
       * Value too low to create account due to existential deposit
       **/
      ExistentialDeposit: AugmentedError<ApiType>;
      /**
       * A vesting schedule already exists for this account
       **/
      ExistingVestingSchedule: AugmentedError<ApiType>;
      /**
       * Balance too low to send value
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * Transfer/payment would kill account
       **/
      KeepAlive: AugmentedError<ApiType>;
      /**
       * Account liquidity restrictions prevent withdrawal
       **/
      LiquidityRestrictions: AugmentedError<ApiType>;
      /**
       * Got an overflow after adding
       **/
      Overflow: AugmentedError<ApiType>;
      /**
       * Vesting balance too high to send value
       **/
      VestingBalance: AugmentedError<ApiType>;
    };
    grandpa: {
      /**
       * Attempt to signal GRANDPA change with one already pending.
       **/
      ChangePending: AugmentedError<ApiType>;
      /**
       * A given equivocation report is valid but already previously reported.
       **/
      DuplicateOffenceReport: AugmentedError<ApiType>;
      /**
       * An equivocation proof provided as part of an equivocation report is invalid.
       **/
      InvalidEquivocationProof: AugmentedError<ApiType>;
      /**
       * A key ownership proof provided as part of an equivocation report is invalid.
       **/
      InvalidKeyOwnershipProof: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA pause when the authority set isn't live
       * (either paused or already pending pause).
       **/
      PauseFailed: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA resume when the authority set isn't paused
       * (either live or already pending resume).
       **/
      ResumeFailed: AugmentedError<ApiType>;
      /**
       * Cannot signal forced change so soon after last.
       **/
      TooSoon: AugmentedError<ApiType>;
    };
    orderbook: {
      AssetWhiteListLimitsExceed: AugmentedError<ApiType>;
      AssetWhiteListNotExist: AugmentedError<ApiType>;
      OnlyOwner: AugmentedError<ApiType>;
      OrderFieldNotExist: AugmentedError<ApiType>;
      OrderIdExists: AugmentedError<ApiType>;
      OrderIdMissing: AugmentedError<ApiType>;
      OrderIdNotExistInOrderIndices: AugmentedError<ApiType>;
      OrderIdNotExistInOwnerOf: AugmentedError<ApiType>;
      OrderIdTooLong: AugmentedError<ApiType>;
      OrderIndexNotExist: AugmentedError<ApiType>;
      OrderInvalidFieldName: AugmentedError<ApiType>;
      OrderInvalidFieldValue: AugmentedError<ApiType>;
      OrderLimitsExceed: AugmentedError<ApiType>;
      OrderTooManyFields: AugmentedError<ApiType>;
    };
    sudo: {
      /**
       * Sender must be the Sudo account
       **/
      RequireSudo: AugmentedError<ApiType>;
    };
    system: {
      /**
       * Failed to extract the runtime version from the new runtime.
       * 
       * Either calling `Core_version` or decoding `RuntimeVersion` failed.
       **/
      FailedToExtractRuntimeVersion: AugmentedError<ApiType>;
      /**
       * The name of specification does not match between the current runtime
       * and the new runtime.
       **/
      InvalidSpecName: AugmentedError<ApiType>;
      /**
       * Suicide called when the account has non-default composite data.
       **/
      NonDefaultComposite: AugmentedError<ApiType>;
      /**
       * There is a non-zero reference count preventing the account from being purged.
       **/
      NonZeroRefCount: AugmentedError<ApiType>;
      /**
       * The specification version is not allowed to decrease between the current runtime
       * and the new runtime.
       **/
      SpecVersionNeedsToIncrease: AugmentedError<ApiType>;
    };
    wyvernExchange: {
      ArrayNotEqual: AugmentedError<ApiType>;
      BuyArrayNotEqual: AugmentedError<ApiType>;
      BuyPriceLessThanSellPrice: AugmentedError<ApiType>;
      BuyTakerProtocolFeeGreaterThanSellTakerProtocolFee: AugmentedError<ApiType>;
      BuyTakerRelayerFeeGreaterThanSellTakerRelayerFee: AugmentedError<ApiType>;
      InvalidBuyOrderParameters: AugmentedError<ApiType>;
      InvalidOrderHash: AugmentedError<ApiType>;
      InvalidSellOrderParameters: AugmentedError<ApiType>;
      InvalidSignature: AugmentedError<ApiType>;
      ListingTimeExpired: AugmentedError<ApiType>;
      MsgVerifyFailed: AugmentedError<ApiType>;
      OnlyContractSelf: AugmentedError<ApiType>;
      OnlyMaker: AugmentedError<ApiType>;
      OnlyOwner: AugmentedError<ApiType>;
      OrderHashMissing: AugmentedError<ApiType>;
      OrdersCannotMatch: AugmentedError<ApiType>;
      SellArrayNotEqual: AugmentedError<ApiType>;
      SellPaymentTokenEqualPaymentToken: AugmentedError<ApiType>;
      SellTakerProtocolFeeGreaterThanBuyTakerProtocolFee: AugmentedError<ApiType>;
      SellTakerRelayerFeeGreaterThanBuyTakerRelayerFee: AugmentedError<ApiType>;
      ValueLessThanRequiredAmount: AugmentedError<ApiType>;
      ValueNotZero: AugmentedError<ApiType>;
    };
  }

  export interface DecoratedErrors<ApiType extends ApiTypes> extends AugmentedErrors<ApiType> {
  }
}
