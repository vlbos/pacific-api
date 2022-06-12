// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

declare module '@polkadot/types/lookup' {
  import type { Bytes, Compact, Enum, Null, Option, Result, Struct, Text, U8aFixed, Vec, bool, u128, u32, u64, u8 } from '@polkadot/types-codec';
  import type { ITuple } from '@polkadot/types-codec/types';
  import type { AccountId32, Call, H256, MultiAddress, Perbill } from '@polkadot/types/interfaces/runtime';
  import type { Event } from '@polkadot/types/interfaces/system';

  /** @name FrameSystemAccountInfo (3) */
  export interface FrameSystemAccountInfo extends Struct {
    readonly nonce: u32;
    readonly consumers: u32;
    readonly providers: u32;
    readonly sufficients: u32;
    readonly data: PalletBalancesAccountData;
  }

  /** @name PalletBalancesAccountData (5) */
  export interface PalletBalancesAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly miscFrozen: u128;
    readonly feeFrozen: u128;
  }

  /** @name FrameSupportWeightsPerDispatchClassU64 (7) */
  export interface FrameSupportWeightsPerDispatchClassU64 extends Struct {
    readonly normal: u64;
    readonly operational: u64;
    readonly mandatory: u64;
  }

  /** @name SpRuntimeDigest (11) */
  export interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (13) */
  export interface SpRuntimeDigestDigestItem extends Enum {
    readonly isOther: boolean;
    readonly asOther: Bytes;
    readonly isConsensus: boolean;
    readonly asConsensus: ITuple<[U8aFixed, Bytes]>;
    readonly isSeal: boolean;
    readonly asSeal: ITuple<[U8aFixed, Bytes]>;
    readonly isPreRuntime: boolean;
    readonly asPreRuntime: ITuple<[U8aFixed, Bytes]>;
    readonly isRuntimeEnvironmentUpdated: boolean;
    readonly type: 'Other' | 'Consensus' | 'Seal' | 'PreRuntime' | 'RuntimeEnvironmentUpdated';
  }

  /** @name FrameSystemEventRecord (16) */
  export interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (18) */
  export interface FrameSystemEvent extends Enum {
    readonly isExtrinsicSuccess: boolean;
    readonly asExtrinsicSuccess: {
      readonly dispatchInfo: FrameSupportWeightsDispatchInfo;
    } & Struct;
    readonly isExtrinsicFailed: boolean;
    readonly asExtrinsicFailed: {
      readonly dispatchError: SpRuntimeDispatchError;
      readonly dispatchInfo: FrameSupportWeightsDispatchInfo;
    } & Struct;
    readonly isCodeUpdated: boolean;
    readonly isNewAccount: boolean;
    readonly asNewAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isKilledAccount: boolean;
    readonly asKilledAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isRemarked: boolean;
    readonly asRemarked: {
      readonly sender: AccountId32;
      readonly hash_: H256;
    } & Struct;
    readonly type: 'ExtrinsicSuccess' | 'ExtrinsicFailed' | 'CodeUpdated' | 'NewAccount' | 'KilledAccount' | 'Remarked';
  }

  /** @name FrameSupportWeightsDispatchInfo (19) */
  export interface FrameSupportWeightsDispatchInfo extends Struct {
    readonly weight: u64;
    readonly class: FrameSupportWeightsDispatchClass;
    readonly paysFee: FrameSupportWeightsPays;
  }

  /** @name FrameSupportWeightsDispatchClass (20) */
  export interface FrameSupportWeightsDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportWeightsPays (21) */
  export interface FrameSupportWeightsPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (22) */
  export interface SpRuntimeDispatchError extends Enum {
    readonly isOther: boolean;
    readonly isCannotLookup: boolean;
    readonly isBadOrigin: boolean;
    readonly isModule: boolean;
    readonly asModule: SpRuntimeModuleError;
    readonly isConsumerRemaining: boolean;
    readonly isNoProviders: boolean;
    readonly isTooManyConsumers: boolean;
    readonly isToken: boolean;
    readonly asToken: SpRuntimeTokenError;
    readonly isArithmetic: boolean;
    readonly asArithmetic: SpRuntimeArithmeticError;
    readonly isTransactional: boolean;
    readonly asTransactional: SpRuntimeTransactionalError;
    readonly type: 'Other' | 'CannotLookup' | 'BadOrigin' | 'Module' | 'ConsumerRemaining' | 'NoProviders' | 'TooManyConsumers' | 'Token' | 'Arithmetic' | 'Transactional';
  }

  /** @name SpRuntimeModuleError (23) */
  export interface SpRuntimeModuleError extends Struct {
    readonly index: u8;
    readonly error: U8aFixed;
  }

  /** @name SpRuntimeTokenError (24) */
  export interface SpRuntimeTokenError extends Enum {
    readonly isNoFunds: boolean;
    readonly isWouldDie: boolean;
    readonly isBelowMinimum: boolean;
    readonly isCannotCreate: boolean;
    readonly isUnknownAsset: boolean;
    readonly isFrozen: boolean;
    readonly isUnsupported: boolean;
    readonly type: 'NoFunds' | 'WouldDie' | 'BelowMinimum' | 'CannotCreate' | 'UnknownAsset' | 'Frozen' | 'Unsupported';
  }

  /** @name SpRuntimeArithmeticError (25) */
  export interface SpRuntimeArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name SpRuntimeTransactionalError (26) */
  export interface SpRuntimeTransactionalError extends Enum {
    readonly isLimitReached: boolean;
    readonly isNoLayer: boolean;
    readonly type: 'LimitReached' | 'NoLayer';
  }

  /** @name PalletGrandpaEvent (27) */
  export interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: {
      readonly authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    } & Struct;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: 'NewAuthorities' | 'Paused' | 'Resumed';
  }

  /** @name SpFinalityGrandpaAppPublic (30) */
  export interface SpFinalityGrandpaAppPublic extends SpCoreEd25519Public {}

  /** @name SpCoreEd25519Public (31) */
  export interface SpCoreEd25519Public extends U8aFixed {}

  /** @name PalletBalancesEvent (32) */
  export interface PalletBalancesEvent extends Enum {
    readonly isEndowed: boolean;
    readonly asEndowed: {
      readonly account: AccountId32;
      readonly freeBalance: u128;
    } & Struct;
    readonly isDustLost: boolean;
    readonly asDustLost: {
      readonly account: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBalanceSet: boolean;
    readonly asBalanceSet: {
      readonly who: AccountId32;
      readonly free: u128;
      readonly reserved: u128;
    } & Struct;
    readonly isReserved: boolean;
    readonly asReserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnreserved: boolean;
    readonly asUnreserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isReserveRepatriated: boolean;
    readonly asReserveRepatriated: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
      readonly destinationStatus: FrameSupportTokensMiscBalanceStatus;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'BalanceSet' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'Deposit' | 'Withdraw' | 'Slashed';
  }

  /** @name FrameSupportTokensMiscBalanceStatus (33) */
  export interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: 'Free' | 'Reserved';
  }

  /** @name PalletSudoEvent (34) */
  export interface PalletSudoEvent extends Enum {
    readonly isSudid: boolean;
    readonly asSudid: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isKeyChanged: boolean;
    readonly asKeyChanged: {
      readonly oldSudoer: Option<AccountId32>;
    } & Struct;
    readonly isSudoAsDone: boolean;
    readonly asSudoAsDone: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'Sudid' | 'KeyChanged' | 'SudoAsDone';
  }

  /** @name PalletOrderbookEvent (38) */
  export interface PalletOrderbookEvent extends Enum {
    readonly isOrderPosted: boolean;
    readonly asOrderPosted: ITuple<[AccountId32, Bytes, AccountId32]>;
    readonly isAssetWhiteListPosted: boolean;
    readonly asAssetWhiteListPosted: ITuple<[Bytes, Bytes, Bytes]>;
    readonly isOwnerChanged: boolean;
    readonly asOwnerChanged: ITuple<[AccountId32, AccountId32]>;
    readonly isOrderLimitsChanged: boolean;
    readonly asOrderLimitsChanged: u64;
    readonly isAssetWhiteListLimitsChanged: boolean;
    readonly asAssetWhiteListLimitsChanged: u64;
    readonly type: 'OrderPosted' | 'AssetWhiteListPosted' | 'OwnerChanged' | 'OrderLimitsChanged' | 'AssetWhiteListLimitsChanged';
  }

  /** @name PalletWyvernExchangeCoreEvent (39) */
  export interface PalletWyvernExchangeCoreEvent extends Enum {
    readonly isOrderApprovedPartOne: boolean;
    readonly asOrderApprovedPartOne: ITuple<[Bytes, AccountId32, AccountId32, AccountId32, u128, u128, u128, u128, AccountId32, PalletWyvernExchangeCoreFeeMethod, PalletWyvernExchangeCoreSide, PalletWyvernExchangeCoreSaleKind, AccountId32]>;
    readonly isOrderApprovedPartTwo: boolean;
    readonly asOrderApprovedPartTwo: ITuple<[Bytes, PalletWyvernExchangeCoreHowToCall, Bytes, Bytes, AccountId32, Bytes, AccountId32, u128, u64, u64, u64, u64, bool]>;
    readonly isOrderCancelled: boolean;
    readonly asOrderCancelled: Bytes;
    readonly isOrdersMatched: boolean;
    readonly asOrdersMatched: ITuple<[Bytes, Bytes, AccountId32, AccountId32, u128, Bytes]>;
    readonly isMinimumMakerProtocolFeeChanged: boolean;
    readonly asMinimumMakerProtocolFeeChanged: u128;
    readonly isMinimumTakerProtocolFeeChanged: boolean;
    readonly asMinimumTakerProtocolFeeChanged: u128;
    readonly isProtocolFeeRecipientChanged: boolean;
    readonly asProtocolFeeRecipientChanged: ITuple<[AccountId32, AccountId32]>;
    readonly isOwnerChanged: boolean;
    readonly asOwnerChanged: ITuple<[AccountId32, AccountId32]>;
    readonly isContractSelfChanged: boolean;
    readonly asContractSelfChanged: ITuple<[AccountId32, AccountId32]>;
    readonly isProxyRegistryChanged: boolean;
    readonly asProxyRegistryChanged: ITuple<[AccountId32, AccountId32]>;
    readonly isTokenTransferProxyChanged: boolean;
    readonly asTokenTransferProxyChanged: ITuple<[AccountId32, AccountId32]>;
    readonly isGasLimitChanged: boolean;
    readonly asGasLimitChanged: ITuple<[AccountId32, u64]>;
    readonly isProxySelectorChanged: boolean;
    readonly asProxySelectorChanged: ITuple<[AccountId32, Bytes]>;
    readonly isTokenSelectorChanged: boolean;
    readonly asTokenSelectorChanged: ITuple<[AccountId32, Bytes]>;
    readonly type: 'OrderApprovedPartOne' | 'OrderApprovedPartTwo' | 'OrderCancelled' | 'OrdersMatched' | 'MinimumMakerProtocolFeeChanged' | 'MinimumTakerProtocolFeeChanged' | 'ProtocolFeeRecipientChanged' | 'OwnerChanged' | 'ContractSelfChanged' | 'ProxyRegistryChanged' | 'TokenTransferProxyChanged' | 'GasLimitChanged' | 'ProxySelectorChanged' | 'TokenSelectorChanged';
  }

  /** @name PalletWyvernExchangeCoreFeeMethod (40) */
  export interface PalletWyvernExchangeCoreFeeMethod extends Enum {
    readonly isProtocolFee: boolean;
    readonly isSplitFee: boolean;
    readonly type: 'ProtocolFee' | 'SplitFee';
  }

  /** @name PalletWyvernExchangeCoreSide (41) */
  export interface PalletWyvernExchangeCoreSide extends Enum {
    readonly isBuy: boolean;
    readonly isSell: boolean;
    readonly type: 'Buy' | 'Sell';
  }

  /** @name PalletWyvernExchangeCoreSaleKind (42) */
  export interface PalletWyvernExchangeCoreSaleKind extends Enum {
    readonly isFixedPrice: boolean;
    readonly isDutchAuction: boolean;
    readonly type: 'FixedPrice' | 'DutchAuction';
  }

  /** @name PalletWyvernExchangeCoreHowToCall (43) */
  export interface PalletWyvernExchangeCoreHowToCall extends Enum {
    readonly isCall: boolean;
    readonly isDelegateCall: boolean;
    readonly type: 'Call' | 'DelegateCall';
  }

  /** @name PalletContractsEvent (45) */
  export interface PalletContractsEvent extends Enum {
    readonly isInstantiated: boolean;
    readonly asInstantiated: {
      readonly deployer: AccountId32;
      readonly contract: AccountId32;
    } & Struct;
    readonly isTerminated: boolean;
    readonly asTerminated: {
      readonly contract: AccountId32;
      readonly beneficiary: AccountId32;
    } & Struct;
    readonly isCodeStored: boolean;
    readonly asCodeStored: {
      readonly codeHash: H256;
    } & Struct;
    readonly isContractEmitted: boolean;
    readonly asContractEmitted: {
      readonly contract: AccountId32;
      readonly data: Bytes;
    } & Struct;
    readonly isCodeRemoved: boolean;
    readonly asCodeRemoved: {
      readonly codeHash: H256;
    } & Struct;
    readonly isContractCodeUpdated: boolean;
    readonly asContractCodeUpdated: {
      readonly contract: AccountId32;
      readonly newCodeHash: H256;
      readonly oldCodeHash: H256;
    } & Struct;
    readonly type: 'Instantiated' | 'Terminated' | 'CodeStored' | 'ContractEmitted' | 'CodeRemoved' | 'ContractCodeUpdated';
  }

  /** @name PalletKittiesEvent (46) */
  export interface PalletKittiesEvent extends Enum {
    readonly isCreated: boolean;
    readonly asCreated: {
      readonly kitty: U8aFixed;
      readonly owner: AccountId32;
    } & Struct;
    readonly isPriceSet: boolean;
    readonly asPriceSet: {
      readonly kitty: U8aFixed;
      readonly price: Option<u128>;
    } & Struct;
    readonly isTransferred: boolean;
    readonly asTransferred: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly kitty: U8aFixed;
    } & Struct;
    readonly isSold: boolean;
    readonly asSold: {
      readonly seller: AccountId32;
      readonly buyer: AccountId32;
      readonly kitty: U8aFixed;
      readonly price: u128;
    } & Struct;
    readonly type: 'Created' | 'PriceSet' | 'Transferred' | 'Sold';
  }

  /** @name FrameSystemPhase (49) */
  export interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (53) */
  export interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCall (56) */
  export interface FrameSystemCall extends Enum {
    readonly isFillBlock: boolean;
    readonly asFillBlock: {
      readonly ratio: Perbill;
    } & Struct;
    readonly isRemark: boolean;
    readonly asRemark: {
      readonly remark: Bytes;
    } & Struct;
    readonly isSetHeapPages: boolean;
    readonly asSetHeapPages: {
      readonly pages: u64;
    } & Struct;
    readonly isSetCode: boolean;
    readonly asSetCode: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetCodeWithoutChecks: boolean;
    readonly asSetCodeWithoutChecks: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetStorage: boolean;
    readonly asSetStorage: {
      readonly items: Vec<ITuple<[Bytes, Bytes]>>;
    } & Struct;
    readonly isKillStorage: boolean;
    readonly asKillStorage: {
      readonly keys_: Vec<Bytes>;
    } & Struct;
    readonly isKillPrefix: boolean;
    readonly asKillPrefix: {
      readonly prefix: Bytes;
      readonly subkeys: u32;
    } & Struct;
    readonly isRemarkWithEvent: boolean;
    readonly asRemarkWithEvent: {
      readonly remark: Bytes;
    } & Struct;
    readonly type: 'FillBlock' | 'Remark' | 'SetHeapPages' | 'SetCode' | 'SetCodeWithoutChecks' | 'SetStorage' | 'KillStorage' | 'KillPrefix' | 'RemarkWithEvent';
  }

  /** @name FrameSystemLimitsBlockWeights (61) */
  export interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: u64;
    readonly maxBlock: u64;
    readonly perClass: FrameSupportWeightsPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportWeightsPerDispatchClassWeightsPerClass (62) */
  export interface FrameSupportWeightsPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (63) */
  export interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: u64;
    readonly maxExtrinsic: Option<u64>;
    readonly maxTotal: Option<u64>;
    readonly reserved: Option<u64>;
  }

  /** @name FrameSystemLimitsBlockLength (65) */
  export interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportWeightsPerDispatchClassU32;
  }

  /** @name FrameSupportWeightsPerDispatchClassU32 (66) */
  export interface FrameSupportWeightsPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name FrameSupportWeightsRuntimeDbWeight (67) */
  export interface FrameSupportWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (68) */
  export interface SpVersionRuntimeVersion extends Struct {
    readonly specName: Text;
    readonly implName: Text;
    readonly authoringVersion: u32;
    readonly specVersion: u32;
    readonly implVersion: u32;
    readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
    readonly transactionVersion: u32;
    readonly stateVersion: u8;
  }

  /** @name FrameSystemError (74) */
  export interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly isCallFiltered: boolean;
    readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount' | 'CallFiltered';
  }

  /** @name PalletTimestampCall (76) */
  export interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name SpConsensusAuraSr25519AppSr25519Public (79) */
  export interface SpConsensusAuraSr25519AppSr25519Public extends SpCoreSr25519Public {}

  /** @name SpCoreSr25519Public (80) */
  export interface SpCoreSr25519Public extends U8aFixed {}

  /** @name PalletGrandpaStoredState (83) */
  export interface PalletGrandpaStoredState extends Enum {
    readonly isLive: boolean;
    readonly isPendingPause: boolean;
    readonly asPendingPause: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly isPaused: boolean;
    readonly isPendingResume: boolean;
    readonly asPendingResume: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly type: 'Live' | 'PendingPause' | 'Paused' | 'PendingResume';
  }

  /** @name PalletGrandpaStoredPendingChange (84) */
  export interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaCall (87) */
  export interface PalletGrandpaCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isNoteStalled: boolean;
    readonly asNoteStalled: {
      readonly delay: u32;
      readonly bestFinalizedBlockNumber: u32;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'NoteStalled';
  }

  /** @name SpFinalityGrandpaEquivocationProof (88) */
  export interface SpFinalityGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpFinalityGrandpaEquivocation;
  }

  /** @name SpFinalityGrandpaEquivocation (89) */
  export interface SpFinalityGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (90) */
  export interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (91) */
  export interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpFinalityGrandpaAppSignature (92) */
  export interface SpFinalityGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (93) */
  export interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (96) */
  export interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (97) */
  export interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpCoreVoid (99) */
  export type SpCoreVoid = Null;

  /** @name PalletGrandpaError (100) */
  export interface PalletGrandpaError extends Enum {
    readonly isPauseFailed: boolean;
    readonly isResumeFailed: boolean;
    readonly isChangePending: boolean;
    readonly isTooSoon: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isInvalidEquivocationProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type: 'PauseFailed' | 'ResumeFailed' | 'ChangePending' | 'TooSoon' | 'InvalidKeyOwnershipProof' | 'InvalidEquivocationProof' | 'DuplicateOffenceReport';
  }

  /** @name PalletBalancesBalanceLock (102) */
  export interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (103) */
  export interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (106) */
  export interface PalletBalancesReserveData extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }

  /** @name PalletBalancesReleases (108) */
  export interface PalletBalancesReleases extends Enum {
    readonly isV100: boolean;
    readonly isV200: boolean;
    readonly type: 'V100' | 'V200';
  }

  /** @name PalletBalancesCall (109) */
  export interface PalletBalancesCall extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isSetBalance: boolean;
    readonly asSetBalance: {
      readonly who: MultiAddress;
      readonly newFree: Compact<u128>;
      readonly newReserved: Compact<u128>;
    } & Struct;
    readonly isForceTransfer: boolean;
    readonly asForceTransfer: {
      readonly source: MultiAddress;
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferKeepAlive: boolean;
    readonly asTransferKeepAlive: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferAll: boolean;
    readonly asTransferAll: {
      readonly dest: MultiAddress;
      readonly keepAlive: bool;
    } & Struct;
    readonly isForceUnreserve: boolean;
    readonly asForceUnreserve: {
      readonly who: MultiAddress;
      readonly amount: u128;
    } & Struct;
    readonly type: 'Transfer' | 'SetBalance' | 'ForceTransfer' | 'TransferKeepAlive' | 'TransferAll' | 'ForceUnreserve';
  }

  /** @name PalletBalancesError (114) */
  export interface PalletBalancesError extends Enum {
    readonly isVestingBalance: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isKeepAlive: boolean;
    readonly isExistingVestingSchedule: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly type: 'VestingBalance' | 'LiquidityRestrictions' | 'InsufficientBalance' | 'ExistentialDeposit' | 'KeepAlive' | 'ExistingVestingSchedule' | 'DeadAccount' | 'TooManyReserves';
  }

  /** @name PalletTransactionPaymentReleases (116) */
  export interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name FrameSupportWeightsWeightToFeeCoefficient (118) */
  export interface FrameSupportWeightsWeightToFeeCoefficient extends Struct {
    readonly coeffInteger: u128;
    readonly coeffFrac: Perbill;
    readonly negative: bool;
    readonly degree: u8;
  }

  /** @name PalletSudoCall (119) */
  export interface PalletSudoCall extends Enum {
    readonly isSudo: boolean;
    readonly asSudo: {
      readonly call: Call;
    } & Struct;
    readonly isSudoUncheckedWeight: boolean;
    readonly asSudoUncheckedWeight: {
      readonly call: Call;
      readonly weight: u64;
    } & Struct;
    readonly isSetKey: boolean;
    readonly asSetKey: {
      readonly new_: MultiAddress;
    } & Struct;
    readonly isSudoAs: boolean;
    readonly asSudoAs: {
      readonly who: MultiAddress;
      readonly call: Call;
    } & Struct;
    readonly type: 'Sudo' | 'SudoUncheckedWeight' | 'SetKey' | 'SudoAs';
  }

  /** @name PalletOrderbookCall (121) */
  export interface PalletOrderbookCall extends Enum {
    readonly isChangeOwner: boolean;
    readonly asChangeOwner: {
      readonly newOwner: AccountId32;
    } & Struct;
    readonly isSetOrderLimits: boolean;
    readonly asSetOrderLimits: {
      readonly limits: u64;
    } & Struct;
    readonly isSetAssetWhiteListLimits: boolean;
    readonly asSetAssetWhiteListLimits: {
      readonly limits: u64;
    } & Struct;
    readonly isPostOrder: boolean;
    readonly asPostOrder: {
      readonly orderId: Bytes;
      readonly owner: AccountId32;
      readonly fields: Option<Vec<PalletOrderbookOrderField>>;
    } & Struct;
    readonly isPostAssetWhiteList: boolean;
    readonly asPostAssetWhiteList: {
      readonly tokenAddress: Bytes;
      readonly tokenId: Bytes;
      readonly email: Bytes;
    } & Struct;
    readonly isRemoveOrder: boolean;
    readonly asRemoveOrder: {
      readonly orderIndex: u64;
    } & Struct;
    readonly isRemoveAssetWhiteList: boolean;
    readonly asRemoveAssetWhiteList: {
      readonly tokenAddress: Bytes;
      readonly tokenId: Bytes;
    } & Struct;
    readonly type: 'ChangeOwner' | 'SetOrderLimits' | 'SetAssetWhiteListLimits' | 'PostOrder' | 'PostAssetWhiteList' | 'RemoveOrder' | 'RemoveAssetWhiteList';
  }

  /** @name PalletOrderbookOrderField (124) */
  export interface PalletOrderbookOrderField extends Struct {
    readonly name: Bytes;
    readonly value: Bytes;
  }

  /** @name PalletWyvernExchangeCall (125) */
  export interface PalletWyvernExchangeCall extends Enum {
    readonly isApproveOrderEx: boolean;
    readonly asApproveOrderEx: {
      readonly addrs: Vec<AccountId32>;
      readonly uints: Vec<u64>;
      readonly feeMethod: PalletWyvernExchangeCoreFeeMethod;
      readonly side: PalletWyvernExchangeCoreSide;
      readonly saleKind: PalletWyvernExchangeCoreSaleKind;
      readonly howToCall: PalletWyvernExchangeCoreHowToCall;
      readonly calldata: Bytes;
      readonly replacementPattern: Bytes;
      readonly staticExtradata: Bytes;
      readonly orderbookInclusionDesired: bool;
    } & Struct;
    readonly isCancelOrderEx: boolean;
    readonly asCancelOrderEx: {
      readonly addrs: Vec<AccountId32>;
      readonly uints: Vec<u64>;
      readonly feeMethod: PalletWyvernExchangeCoreFeeMethod;
      readonly side: PalletWyvernExchangeCoreSide;
      readonly saleKind: PalletWyvernExchangeCoreSaleKind;
      readonly howToCall: PalletWyvernExchangeCoreHowToCall;
      readonly calldata: Bytes;
      readonly replacementPattern: Bytes;
      readonly staticExtradata: Bytes;
      readonly sig: Bytes;
    } & Struct;
    readonly isAtomicMatchEx: boolean;
    readonly asAtomicMatchEx: {
      readonly addrs: Vec<AccountId32>;
      readonly uints: Vec<u64>;
      readonly feeMethodsSidesKindsHowToCalls: Bytes;
      readonly calldataBuy: Bytes;
      readonly calldataSell: Bytes;
      readonly replacementPatternBuy: Bytes;
      readonly replacementPatternSell: Bytes;
      readonly staticExtradataBuy: Bytes;
      readonly staticExtradataSell: Bytes;
      readonly sigBuy: Bytes;
      readonly sigSell: Bytes;
      readonly rssMetadata: Bytes;
    } & Struct;
    readonly type: 'ApproveOrderEx' | 'CancelOrderEx' | 'AtomicMatchEx';
  }

  /** @name PalletWyvernExchangeCoreCall (128) */
  export interface PalletWyvernExchangeCoreCall extends Enum {
    readonly isChangeMinimumMakerProtocolFee: boolean;
    readonly asChangeMinimumMakerProtocolFee: {
      readonly newMinimumMakerProtocolFee: u128;
    } & Struct;
    readonly isChangeMinimumTakerProtocolFee: boolean;
    readonly asChangeMinimumTakerProtocolFee: {
      readonly newMinimumTakerProtocolFee: u128;
    } & Struct;
    readonly isChangeProtocolFeeRecipient: boolean;
    readonly asChangeProtocolFeeRecipient: {
      readonly newProtocolFeeRecipient: AccountId32;
    } & Struct;
    readonly isChangeOwner: boolean;
    readonly asChangeOwner: {
      readonly newOwner: AccountId32;
    } & Struct;
    readonly isSetContractSelf: boolean;
    readonly asSetContractSelf: {
      readonly contract: AccountId32;
    } & Struct;
    readonly isSetProxyRegistry: boolean;
    readonly asSetProxyRegistry: {
      readonly registryAddress: AccountId32;
    } & Struct;
    readonly isSetTokenTransferProxy: boolean;
    readonly asSetTokenTransferProxy: {
      readonly proxyAddress: AccountId32;
    } & Struct;
    readonly isSetGasLimit: boolean;
    readonly asSetGasLimit: {
      readonly gasLimit: u64;
    } & Struct;
    readonly isSetProxySelector: boolean;
    readonly asSetProxySelector: {
      readonly selectror: Bytes;
    } & Struct;
    readonly isSetTokenSelector: boolean;
    readonly asSetTokenSelector: {
      readonly selectror: Bytes;
    } & Struct;
    readonly isCallSmartContract: boolean;
    readonly asCallSmartContract: {
      readonly dest: AccountId32;
      readonly selector: Bytes;
      readonly selectors: Bytes;
      readonly callees: Vec<AccountId32>;
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly values: Vec<u128>;
      readonly gasLimit: Compact<u64>;
    } & Struct;
    readonly isCallSmartContracts: boolean;
    readonly asCallSmartContracts: {
      readonly dest: AccountId32;
      readonly selector: Bytes;
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly values: u128;
      readonly gasLimit: Compact<u64>;
    } & Struct;
    readonly isCallProxyContracts: boolean;
    readonly asCallProxyContracts: {
      readonly dest: AccountId32;
      readonly selector: Bytes;
      readonly from: AccountId32;
      readonly gasLimit: Compact<u64>;
    } & Struct;
    readonly type: 'ChangeMinimumMakerProtocolFee' | 'ChangeMinimumTakerProtocolFee' | 'ChangeProtocolFeeRecipient' | 'ChangeOwner' | 'SetContractSelf' | 'SetProxyRegistry' | 'SetTokenTransferProxy' | 'SetGasLimit' | 'SetProxySelector' | 'SetTokenSelector' | 'CallSmartContract' | 'CallSmartContracts' | 'CallProxyContracts';
  }

  /** @name PalletContractsCall (130) */
  export interface PalletContractsCall extends Enum {
    readonly isCall: boolean;
    readonly asCall: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
      readonly gasLimit: Compact<u64>;
      readonly storageDepositLimit: Option<Compact<u128>>;
      readonly data: Bytes;
    } & Struct;
    readonly isInstantiateWithCode: boolean;
    readonly asInstantiateWithCode: {
      readonly value: Compact<u128>;
      readonly gasLimit: Compact<u64>;
      readonly storageDepositLimit: Option<Compact<u128>>;
      readonly code: Bytes;
      readonly data: Bytes;
      readonly salt: Bytes;
    } & Struct;
    readonly isInstantiate: boolean;
    readonly asInstantiate: {
      readonly value: Compact<u128>;
      readonly gasLimit: Compact<u64>;
      readonly storageDepositLimit: Option<Compact<u128>>;
      readonly codeHash: H256;
      readonly data: Bytes;
      readonly salt: Bytes;
    } & Struct;
    readonly isUploadCode: boolean;
    readonly asUploadCode: {
      readonly code: Bytes;
      readonly storageDepositLimit: Option<Compact<u128>>;
    } & Struct;
    readonly isRemoveCode: boolean;
    readonly asRemoveCode: {
      readonly codeHash: H256;
    } & Struct;
    readonly isSetCode: boolean;
    readonly asSetCode: {
      readonly dest: MultiAddress;
      readonly codeHash: H256;
    } & Struct;
    readonly type: 'Call' | 'InstantiateWithCode' | 'Instantiate' | 'UploadCode' | 'RemoveCode' | 'SetCode';
  }

  /** @name PalletKittiesCall (132) */
  export interface PalletKittiesCall extends Enum {
    readonly isCreateKitty: boolean;
    readonly isBreedKitty: boolean;
    readonly asBreedKitty: {
      readonly parent1: U8aFixed;
      readonly parent2: U8aFixed;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly to: AccountId32;
      readonly kittyId: U8aFixed;
    } & Struct;
    readonly isBuyKitty: boolean;
    readonly asBuyKitty: {
      readonly kittyId: U8aFixed;
      readonly limitPrice: u128;
    } & Struct;
    readonly isSetPrice: boolean;
    readonly asSetPrice: {
      readonly kittyId: U8aFixed;
      readonly newPrice: Option<u128>;
    } & Struct;
    readonly type: 'CreateKitty' | 'BreedKitty' | 'Transfer' | 'BuyKitty' | 'SetPrice';
  }

  /** @name PalletSudoError (133) */
  export interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name PalletOrderbookOrderJSONType (134) */
  export interface PalletOrderbookOrderJSONType extends Struct {
    readonly index: u64;
    readonly orderId: Bytes;
    readonly owner: AccountId32;
    readonly fields: Option<Vec<PalletOrderbookOrderField>>;
    readonly createdDate: u64;
  }

  /** @name PalletOrderbookError (135) */
  export interface PalletOrderbookError extends Enum {
    readonly isOrderIdMissing: boolean;
    readonly isOrderIdTooLong: boolean;
    readonly isOrderIdExists: boolean;
    readonly isOrderTooManyFields: boolean;
    readonly isOrderInvalidFieldName: boolean;
    readonly isOrderInvalidFieldValue: boolean;
    readonly isOrderLimitsExceed: boolean;
    readonly isAssetWhiteListLimitsExceed: boolean;
    readonly isOrderIndexNotExist: boolean;
    readonly isOrderIdNotExistInOrderIndices: boolean;
    readonly isOrderIdNotExistInOwnerOf: boolean;
    readonly isOrderFieldNotExist: boolean;
    readonly isAssetWhiteListNotExist: boolean;
    readonly isOnlyOwner: boolean;
    readonly type: 'OrderIdMissing' | 'OrderIdTooLong' | 'OrderIdExists' | 'OrderTooManyFields' | 'OrderInvalidFieldName' | 'OrderInvalidFieldValue' | 'OrderLimitsExceed' | 'AssetWhiteListLimitsExceed' | 'OrderIndexNotExist' | 'OrderIdNotExistInOrderIndices' | 'OrderIdNotExistInOwnerOf' | 'OrderFieldNotExist' | 'AssetWhiteListNotExist' | 'OnlyOwner';
  }

  /** @name PalletWyvernExchangeCoreError (136) */
  export interface PalletWyvernExchangeCoreError extends Enum {
    readonly isMsgVerifyFailed: boolean;
    readonly isInvalidBuyOrderParameters: boolean;
    readonly isInvalidSellOrderParameters: boolean;
    readonly isOrdersCannotMatch: boolean;
    readonly isListingTimeExpired: boolean;
    readonly isArrayNotEqual: boolean;
    readonly isBuyArrayNotEqual: boolean;
    readonly isSellArrayNotEqual: boolean;
    readonly isBuyTakerProtocolFeeGreaterThanSellTakerProtocolFee: boolean;
    readonly isBuyTakerRelayerFeeGreaterThanSellTakerRelayerFee: boolean;
    readonly isSellPaymentTokenEqualPaymentToken: boolean;
    readonly isSellTakerProtocolFeeGreaterThanBuyTakerProtocolFee: boolean;
    readonly isSellTakerRelayerFeeGreaterThanBuyTakerRelayerFee: boolean;
    readonly isValueLessThanRequiredAmount: boolean;
    readonly isValueNotZero: boolean;
    readonly isBuyPriceLessThanSellPrice: boolean;
    readonly isOrderHashExists: boolean;
    readonly isOnlyMaker: boolean;
    readonly isInvalidOrderHash: boolean;
    readonly isInvalidSignature: boolean;
    readonly isOnlyOwner: boolean;
    readonly isOnlyContractSelf: boolean;
    readonly isProxyRegistryIsEmpty: boolean;
    readonly isTokenTransferProxyIsEmpty: boolean;
    readonly type: 'MsgVerifyFailed' | 'InvalidBuyOrderParameters' | 'InvalidSellOrderParameters' | 'OrdersCannotMatch' | 'ListingTimeExpired' | 'ArrayNotEqual' | 'BuyArrayNotEqual' | 'SellArrayNotEqual' | 'BuyTakerProtocolFeeGreaterThanSellTakerProtocolFee' | 'BuyTakerRelayerFeeGreaterThanSellTakerRelayerFee' | 'SellPaymentTokenEqualPaymentToken' | 'SellTakerProtocolFeeGreaterThanBuyTakerProtocolFee' | 'SellTakerRelayerFeeGreaterThanBuyTakerRelayerFee' | 'ValueLessThanRequiredAmount' | 'ValueNotZero' | 'BuyPriceLessThanSellPrice' | 'OrderHashExists' | 'OnlyMaker' | 'InvalidOrderHash' | 'InvalidSignature' | 'OnlyOwner' | 'OnlyContractSelf' | 'ProxyRegistryIsEmpty' | 'TokenTransferProxyIsEmpty';
  }

  /** @name PalletContractsWasmPrefabWasmModule (138) */
  export interface PalletContractsWasmPrefabWasmModule extends Struct {
    readonly instructionWeightsVersion: Compact<u32>;
    readonly initial: Compact<u32>;
    readonly maximum: Compact<u32>;
    readonly code: Bytes;
  }
  /** @name SpSessionMembershipProof (142) */
  export interface SpSessionMembershipProof extends Struct {
    readonly session: u32;
    readonly trieNodes: Vec<Bytes>;
    readonly validatorCount: u32;
  }
  /** @name PalletContractsWasmOwnerInfo (140) */
  export interface PalletContractsWasmOwnerInfo extends Struct {
    readonly owner: AccountId32;
    readonly deposit: Compact<u128>;
    readonly refcount: Compact<u64>;
  }

  /** @name PalletContractsStorageRawContractInfo (141) */
  export interface PalletContractsStorageRawContractInfo extends Struct {
    readonly trieId: Bytes;
    readonly codeHash: H256;
    readonly storageDeposit: u128;
  }

  /** @name PalletContractsStorageDeletedContract (144) */
  export interface PalletContractsStorageDeletedContract extends Struct {
    readonly trieId: Bytes;
  }

  /** @name PalletContractsSchedule (146) */
  export interface PalletContractsSchedule extends Struct {
    readonly limits: PalletContractsScheduleLimits;
    readonly instructionWeights: PalletContractsScheduleInstructionWeights;
    readonly hostFnWeights: PalletContractsScheduleHostFnWeights;
  }

  /** @name PalletContractsScheduleLimits (147) */
  export interface PalletContractsScheduleLimits extends Struct {
    readonly eventTopics: u32;
    readonly stackHeight: Option<u32>;
    readonly globals: u32;
    readonly parameters: u32;
    readonly memoryPages: u32;
    readonly tableSize: u32;
    readonly brTableSize: u32;
    readonly subjectLen: u32;
    readonly callDepth: u32;
    readonly payloadLen: u32;
  }

  /** @name PalletContractsScheduleInstructionWeights (148) */
  export interface PalletContractsScheduleInstructionWeights extends Struct {
    readonly version: u32;
    readonly i64const: u32;
    readonly i64load: u32;
    readonly i64store: u32;
    readonly select: u32;
    readonly r_if: u32;
    readonly br: u32;
    readonly brIf: u32;
    readonly brTable: u32;
    readonly brTablePerEntry: u32;
    readonly call: u32;
    readonly callIndirect: u32;
    readonly callIndirectPerParam: u32;
    readonly localGet: u32;
    readonly localSet: u32;
    readonly localTee: u32;
    readonly globalGet: u32;
    readonly globalSet: u32;
    readonly memoryCurrent: u32;
    readonly memoryGrow: u32;
    readonly i64clz: u32;
    readonly i64ctz: u32;
    readonly i64popcnt: u32;
    readonly i64eqz: u32;
    readonly i64extendsi32: u32;
    readonly i64extendui32: u32;
    readonly i32wrapi64: u32;
    readonly i64eq: u32;
    readonly i64ne: u32;
    readonly i64lts: u32;
    readonly i64ltu: u32;
    readonly i64gts: u32;
    readonly i64gtu: u32;
    readonly i64les: u32;
    readonly i64leu: u32;
    readonly i64ges: u32;
    readonly i64geu: u32;
    readonly i64add: u32;
    readonly i64sub: u32;
    readonly i64mul: u32;
    readonly i64divs: u32;
    readonly i64divu: u32;
    readonly i64rems: u32;
    readonly i64remu: u32;
    readonly i64and: u32;
    readonly i64or: u32;
    readonly i64xor: u32;
    readonly i64shl: u32;
    readonly i64shrs: u32;
    readonly i64shru: u32;
    readonly i64rotl: u32;
    readonly i64rotr: u32;
  }

  /** @name PalletContractsScheduleHostFnWeights (149) */
  export interface PalletContractsScheduleHostFnWeights extends Struct {
    readonly caller: u64;
    readonly isContract: u64;
    readonly codeHash: u64;
    readonly ownCodeHash: u64;
    readonly callerIsOrigin: u64;
    readonly address: u64;
    readonly gasLeft: u64;
    readonly balance: u64;
    readonly valueTransferred: u64;
    readonly minimumBalance: u64;
    readonly blockNumber: u64;
    readonly now: u64;
    readonly weightToFee: u64;
    readonly gas: u64;
    readonly input: u64;
    readonly inputPerByte: u64;
    readonly r_return: u64;
    readonly returnPerByte: u64;
    readonly terminate: u64;
    readonly random: u64;
    readonly depositEvent: u64;
    readonly depositEventPerTopic: u64;
    readonly depositEventPerByte: u64;
    readonly debugMessage: u64;
    readonly setStorage: u64;
    readonly setStoragePerNewByte: u64;
    readonly setStoragePerOldByte: u64;
    readonly setCodeHash: u64;
    readonly clearStorage: u64;
    readonly clearStoragePerByte: u64;
    readonly containsStorage: u64;
    readonly containsStoragePerByte: u64;
    readonly getStorage: u64;
    readonly getStoragePerByte: u64;
    readonly takeStorage: u64;
    readonly takeStoragePerByte: u64;
    readonly transfer: u64;
    readonly call: u64;
    readonly delegateCall: u64;
    readonly callTransferSurcharge: u64;
    readonly callPerClonedByte: u64;
    readonly instantiate: u64;
    readonly instantiateTransferSurcharge: u64;
    readonly instantiatePerSaltByte: u64;
    readonly hashSha2256: u64;
    readonly hashSha2256PerByte: u64;
    readonly hashKeccak256: u64;
    readonly hashKeccak256PerByte: u64;
    readonly hashBlake2256: u64;
    readonly hashBlake2256PerByte: u64;
    readonly hashBlake2128: u64;
    readonly hashBlake2128PerByte: u64;
    readonly ecdsaRecover: u64;
    readonly ecdsaToEthAddress: u64;
  }

  /** @name PalletContractsError (150) */
  export interface PalletContractsError extends Enum {
    readonly isInvalidScheduleVersion: boolean;
    readonly isInvalidCallFlags: boolean;
    readonly isOutOfGas: boolean;
    readonly isOutputBufferTooSmall: boolean;
    readonly isTransferFailed: boolean;
    readonly isMaxCallDepthReached: boolean;
    readonly isContractNotFound: boolean;
    readonly isCodeTooLarge: boolean;
    readonly isCodeNotFound: boolean;
    readonly isOutOfBounds: boolean;
    readonly isDecodingFailed: boolean;
    readonly isContractTrapped: boolean;
    readonly isValueTooLarge: boolean;
    readonly isTerminatedWhileReentrant: boolean;
    readonly isInputForwarded: boolean;
    readonly isRandomSubjectTooLong: boolean;
    readonly isTooManyTopics: boolean;
    readonly isDuplicateTopics: boolean;
    readonly isNoChainExtension: boolean;
    readonly isDeletionQueueFull: boolean;
    readonly isDuplicateContract: boolean;
    readonly isTerminatedInConstructor: boolean;
    readonly isDebugMessageInvalidUTF8: boolean;
    readonly isReentranceDenied: boolean;
    readonly isStorageDepositNotEnoughFunds: boolean;
    readonly isStorageDepositLimitExhausted: boolean;
    readonly isCodeInUse: boolean;
    readonly isContractReverted: boolean;
    readonly isCodeRejected: boolean;
    readonly type: 'InvalidScheduleVersion' | 'InvalidCallFlags' | 'OutOfGas' | 'OutputBufferTooSmall' | 'TransferFailed' | 'MaxCallDepthReached' | 'ContractNotFound' | 'CodeTooLarge' | 'CodeNotFound' | 'OutOfBounds' | 'DecodingFailed' | 'ContractTrapped' | 'ValueTooLarge' | 'TerminatedWhileReentrant' | 'InputForwarded' | 'RandomSubjectTooLong' | 'TooManyTopics' | 'DuplicateTopics' | 'NoChainExtension' | 'DeletionQueueFull' | 'DuplicateContract' | 'TerminatedInConstructor' | 'DebugMessageInvalidUTF8' | 'ReentranceDenied' | 'StorageDepositNotEnoughFunds' | 'StorageDepositLimitExhausted' | 'CodeInUse' | 'ContractReverted' | 'CodeRejected';
  }

  /** @name PalletKittiesKitty (151) */
  export interface PalletKittiesKitty extends Struct {
    readonly dna: U8aFixed;
    readonly price: Option<u128>;
    readonly gender: PalletKittiesGender;
    readonly owner: AccountId32;
  }

  /** @name PalletKittiesGender (152) */
  export interface PalletKittiesGender extends Enum {
    readonly isMale: boolean;
    readonly isFemale: boolean;
    readonly type: 'Male' | 'Female';
  }

  /** @name PalletKittiesError (155) */
  export interface PalletKittiesError extends Enum {
    readonly isTooManyOwned: boolean;
    readonly isTransferToSelf: boolean;
    readonly isDuplicateKitty: boolean;
    readonly isNoKitty: boolean;
    readonly isNotOwner: boolean;
    readonly isNotForSale: boolean;
    readonly isBidPriceTooLow: boolean;
    readonly isCantBreed: boolean;
    readonly type: 'TooManyOwned' | 'TransferToSelf' | 'DuplicateKitty' | 'NoKitty' | 'NotOwner' | 'NotForSale' | 'BidPriceTooLow' | 'CantBreed';
  }

  /** @name SpRuntimeMultiSignature (157) */
  export interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name SpCoreSr25519Signature (158) */
  export interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name SpCoreEcdsaSignature (159) */
  export interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name FrameSystemExtensionsCheckNonZeroSender (162) */
  export type FrameSystemExtensionsCheckNonZeroSender = Null;

  /** @name FrameSystemExtensionsCheckSpecVersion (163) */
  export type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (164) */
  export type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (165) */
  export type FrameSystemExtensionsCheckGenesis = Null;

  /** @name FrameSystemExtensionsCheckNonce (168) */
  export interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

  /** @name FrameSystemExtensionsCheckWeight (169) */
  export type FrameSystemExtensionsCheckWeight = Null;

  /** @name PalletTransactionPaymentChargeTransactionPayment (170) */
  export interface PalletTransactionPaymentChargeTransactionPayment extends Compact<u128> {}

  /** @name ContractsNodeRuntimeRuntime (171) */
  export type ContractsNodeRuntimeRuntime = Null;

} // declare module
