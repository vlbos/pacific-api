"use strict";
// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable sort-keys */
exports.default = {
    /**
     * Lookup3: frame_system::AccountInfo<Index, pallet_balances::AccountData<Balance>>
     **/
    FrameSystemAccountInfo: {
        nonce: 'u32',
        consumers: 'u32',
        providers: 'u32',
        sufficients: 'u32',
        data: 'PalletBalancesAccountData'
    },
    /**
     * Lookup5: pallet_balances::AccountData<Balance>
     **/
    PalletBalancesAccountData: {
        free: 'u128',
        reserved: 'u128',
        miscFrozen: 'u128',
        feeFrozen: 'u128'
    },
    /**
     * Lookup7: frame_support::weights::PerDispatchClass<T>
     **/
    FrameSupportWeightsPerDispatchClassU64: {
        normal: 'u64',
        operational: 'u64',
        mandatory: 'u64'
    },
    /**
     * Lookup11: sp_runtime::generic::digest::Digest
     **/
    SpRuntimeDigest: {
        logs: 'Vec<SpRuntimeDigestDigestItem>'
    },
    /**
     * Lookup13: sp_runtime::generic::digest::DigestItem
     **/
    SpRuntimeDigestDigestItem: {
        _enum: {
            Other: 'Bytes',
            __Unused1: 'Null',
            __Unused2: 'Null',
            __Unused3: 'Null',
            Consensus: '([u8;4],Bytes)',
            Seal: '([u8;4],Bytes)',
            PreRuntime: '([u8;4],Bytes)',
            __Unused7: 'Null',
            RuntimeEnvironmentUpdated: 'Null'
        }
    },
    /**
     * Lookup16: frame_system::EventRecord<contracts_node_runtime::Event, primitive_types::H256>
     **/
    FrameSystemEventRecord: {
        phase: 'FrameSystemPhase',
        event: 'Event',
        topics: 'Vec<H256>'
    },
    /**
     * Lookup18: frame_system::pallet::Event<T>
     **/
    FrameSystemEvent: {
        _enum: {
            ExtrinsicSuccess: {
                dispatchInfo: 'FrameSupportWeightsDispatchInfo',
            },
            ExtrinsicFailed: {
                dispatchError: 'SpRuntimeDispatchError',
                dispatchInfo: 'FrameSupportWeightsDispatchInfo',
            },
            CodeUpdated: 'Null',
            NewAccount: {
                account: 'AccountId32',
            },
            KilledAccount: {
                account: 'AccountId32',
            },
            Remarked: {
                _alias: {
                    hash_: 'hash',
                },
                sender: 'AccountId32',
                hash_: 'H256'
            }
        }
    },
    /**
     * Lookup19: frame_support::weights::DispatchInfo
     **/
    FrameSupportWeightsDispatchInfo: {
        weight: 'u64',
        class: 'FrameSupportWeightsDispatchClass',
        paysFee: 'FrameSupportWeightsPays'
    },
    /**
     * Lookup20: frame_support::weights::DispatchClass
     **/
    FrameSupportWeightsDispatchClass: {
        _enum: ['Normal', 'Operational', 'Mandatory']
    },
    /**
     * Lookup21: frame_support::weights::Pays
     **/
    FrameSupportWeightsPays: {
        _enum: ['Yes', 'No']
    },
    /**
     * Lookup22: sp_runtime::DispatchError
     **/
    SpRuntimeDispatchError: {
        _enum: {
            Other: 'Null',
            CannotLookup: 'Null',
            BadOrigin: 'Null',
            Module: 'SpRuntimeModuleError',
            ConsumerRemaining: 'Null',
            NoProviders: 'Null',
            TooManyConsumers: 'Null',
            Token: 'SpRuntimeTokenError',
            Arithmetic: 'SpRuntimeArithmeticError',
            Transactional: 'SpRuntimeTransactionalError'
        }
    },
    /**
     * Lookup23: sp_runtime::ModuleError
     **/
    SpRuntimeModuleError: {
        index: 'u8',
        error: '[u8;4]'
    },
    /**
     * Lookup24: sp_runtime::TokenError
     **/
    SpRuntimeTokenError: {
        _enum: ['NoFunds', 'WouldDie', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported']
    },
    /**
     * Lookup25: sp_runtime::ArithmeticError
     **/
    SpRuntimeArithmeticError: {
        _enum: ['Underflow', 'Overflow', 'DivisionByZero']
    },
    /**
     * Lookup26: sp_runtime::TransactionalError
     **/
    SpRuntimeTransactionalError: {
        _enum: ['LimitReached', 'NoLayer']
    },
    /**
     * Lookup27: pallet_grandpa::pallet::Event
     **/
    PalletGrandpaEvent: {
        _enum: {
            NewAuthorities: {
                authoritySet: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
            },
            Paused: 'Null',
            Resumed: 'Null'
        }
    },
    /**
     * Lookup30: sp_finality_grandpa::app::Public
     **/
    SpFinalityGrandpaAppPublic: 'SpCoreEd25519Public',
    /**
     * Lookup31: sp_core::ed25519::Public
     **/
    SpCoreEd25519Public: '[u8;32]',
    /**
     * Lookup32: pallet_balances::pallet::Event<T, I>
     **/
    PalletBalancesEvent: {
        _enum: {
            Endowed: {
                account: 'AccountId32',
                freeBalance: 'u128',
            },
            DustLost: {
                account: 'AccountId32',
                amount: 'u128',
            },
            Transfer: {
                from: 'AccountId32',
                to: 'AccountId32',
                amount: 'u128',
            },
            BalanceSet: {
                who: 'AccountId32',
                free: 'u128',
                reserved: 'u128',
            },
            Reserved: {
                who: 'AccountId32',
                amount: 'u128',
            },
            Unreserved: {
                who: 'AccountId32',
                amount: 'u128',
            },
            ReserveRepatriated: {
                from: 'AccountId32',
                to: 'AccountId32',
                amount: 'u128',
                destinationStatus: 'FrameSupportTokensMiscBalanceStatus',
            },
            Deposit: {
                who: 'AccountId32',
                amount: 'u128',
            },
            Withdraw: {
                who: 'AccountId32',
                amount: 'u128',
            },
            Slashed: {
                who: 'AccountId32',
                amount: 'u128'
            }
        }
    },
    /**
     * Lookup33: frame_support::traits::tokens::misc::BalanceStatus
     **/
    FrameSupportTokensMiscBalanceStatus: {
        _enum: ['Free', 'Reserved']
    },
    /**
     * Lookup34: pallet_sudo::pallet::Event<T>
     **/
    PalletSudoEvent: {
        _enum: {
            Sudid: {
                sudoResult: 'Result<Null, SpRuntimeDispatchError>',
            },
            KeyChanged: {
                oldSudoer: 'Option<AccountId32>',
            },
            SudoAsDone: {
                sudoResult: 'Result<Null, SpRuntimeDispatchError>'
            }
        }
    },
    /**
     * Lookup38: pallet_orderbook::pallet::Event<T>
     **/
    PalletOrderbookEvent: {
        _enum: {
            OrderPosted: '(AccountId32,Bytes,AccountId32)',
            AssetWhiteListPosted: '(Bytes,Bytes,Bytes)',
            OwnerChanged: '(AccountId32,AccountId32)',
            OrderLimitsChanged: 'u64',
            AssetWhiteListLimitsChanged: 'u64'
        }
    },
    /**
     * Lookup39: pallet_wyvern_exchange_core::pallet::Event<T>
     **/
    PalletWyvernExchangeCoreEvent: {
        _enum: {
            OrderApprovedPartOne: '(Bytes,AccountId32,AccountId32,AccountId32,u128,u128,u128,u128,AccountId32,PalletWyvernExchangeCoreFeeMethod,PalletWyvernExchangeCoreSide,PalletWyvernExchangeCoreSaleKind,AccountId32)',
            OrderApprovedPartTwo: '(Bytes,PalletWyvernExchangeCoreHowToCall,Bytes,Bytes,AccountId32,Bytes,AccountId32,u128,u64,u64,u64,u64,bool)',
            OrderCancelled: 'Bytes',
            OrdersMatched: '(Bytes,Bytes,AccountId32,AccountId32,u128,Bytes)',
            MinimumMakerProtocolFeeChanged: 'u128',
            MinimumTakerProtocolFeeChanged: 'u128',
            ProtocolFeeRecipientChanged: '(AccountId32,AccountId32)',
            OwnerChanged: '(AccountId32,AccountId32)',
            ContractSelfChanged: '(AccountId32,AccountId32)',
            ProxyRegistryChanged: '(AccountId32,AccountId32)',
            TokenTransferProxyChanged: '(AccountId32,AccountId32)',
            GasLimitChanged: '(AccountId32,u64)',
            ProxySelectorChanged: '(AccountId32,Bytes)',
            TokenSelectorChanged: '(AccountId32,Bytes)'
        }
    },
    /**
     * Lookup40: pallet_wyvern_exchange_core::types::FeeMethod
     **/
    PalletWyvernExchangeCoreFeeMethod: {
        _enum: ['ProtocolFee', 'SplitFee']
    },
    /**
     * Lookup41: pallet_wyvern_exchange_core::types::Side
     **/
    PalletWyvernExchangeCoreSide: {
        _enum: ['Buy', 'Sell']
    },
    /**
     * Lookup42: pallet_wyvern_exchange_core::types::SaleKind
     **/
    PalletWyvernExchangeCoreSaleKind: {
        _enum: ['FixedPrice', 'DutchAuction']
    },
    /**
     * Lookup43: pallet_wyvern_exchange_core::types::HowToCall
     **/
    PalletWyvernExchangeCoreHowToCall: {
        _enum: ['Call', 'DelegateCall']
    },
    /**
     * Lookup45: pallet_contracts::pallet::Event<T>
     **/
    PalletContractsEvent: {
        _enum: {
            Instantiated: {
                deployer: 'AccountId32',
                contract: 'AccountId32',
            },
            Terminated: {
                contract: 'AccountId32',
                beneficiary: 'AccountId32',
            },
            CodeStored: {
                codeHash: 'H256',
            },
            ContractEmitted: {
                contract: 'AccountId32',
                data: 'Bytes',
            },
            CodeRemoved: {
                codeHash: 'H256',
            },
            ContractCodeUpdated: {
                contract: 'AccountId32',
                newCodeHash: 'H256',
                oldCodeHash: 'H256'
            }
        }
    },
    /**
     * Lookup46: pallet_kitties::pallet::Event<T>
     **/
    PalletKittiesEvent: {
        _enum: {
            Created: {
                kitty: '[u8;16]',
                owner: 'AccountId32',
            },
            PriceSet: {
                kitty: '[u8;16]',
                price: 'Option<u128>',
            },
            Transferred: {
                from: 'AccountId32',
                to: 'AccountId32',
                kitty: '[u8;16]',
            },
            Sold: {
                seller: 'AccountId32',
                buyer: 'AccountId32',
                kitty: '[u8;16]',
                price: 'u128'
            }
        }
    },
    /**
     * Lookup49: frame_system::Phase
     **/
    FrameSystemPhase: {
        _enum: {
            ApplyExtrinsic: 'u32',
            Finalization: 'Null',
            Initialization: 'Null'
        }
    },
    /**
     * Lookup53: frame_system::LastRuntimeUpgradeInfo
     **/
    FrameSystemLastRuntimeUpgradeInfo: {
        specVersion: 'Compact<u32>',
        specName: 'Text'
    },
    /**
     * Lookup56: frame_system::pallet::Call<T>
     **/
    FrameSystemCall: {
        _enum: {
            fill_block: {
                ratio: 'Perbill',
            },
            remark: {
                remark: 'Bytes',
            },
            set_heap_pages: {
                pages: 'u64',
            },
            set_code: {
                code: 'Bytes',
            },
            set_code_without_checks: {
                code: 'Bytes',
            },
            set_storage: {
                items: 'Vec<(Bytes,Bytes)>',
            },
            kill_storage: {
                _alias: {
                    keys_: 'keys',
                },
                keys_: 'Vec<Bytes>',
            },
            kill_prefix: {
                prefix: 'Bytes',
                subkeys: 'u32',
            },
            remark_with_event: {
                remark: 'Bytes'
            }
        }
    },
    /**
     * Lookup61: frame_system::limits::BlockWeights
     **/
    FrameSystemLimitsBlockWeights: {
        baseBlock: 'u64',
        maxBlock: 'u64',
        perClass: 'FrameSupportWeightsPerDispatchClassWeightsPerClass'
    },
    /**
     * Lookup62: frame_support::weights::PerDispatchClass<frame_system::limits::WeightsPerClass>
     **/
    FrameSupportWeightsPerDispatchClassWeightsPerClass: {
        normal: 'FrameSystemLimitsWeightsPerClass',
        operational: 'FrameSystemLimitsWeightsPerClass',
        mandatory: 'FrameSystemLimitsWeightsPerClass'
    },
    /**
     * Lookup63: frame_system::limits::WeightsPerClass
     **/
    FrameSystemLimitsWeightsPerClass: {
        baseExtrinsic: 'u64',
        maxExtrinsic: 'Option<u64>',
        maxTotal: 'Option<u64>',
        reserved: 'Option<u64>'
    },
    /**
     * Lookup65: frame_system::limits::BlockLength
     **/
    FrameSystemLimitsBlockLength: {
        max: 'FrameSupportWeightsPerDispatchClassU32'
    },
    /**
     * Lookup66: frame_support::weights::PerDispatchClass<T>
     **/
    FrameSupportWeightsPerDispatchClassU32: {
        normal: 'u32',
        operational: 'u32',
        mandatory: 'u32'
    },
    /**
     * Lookup67: frame_support::weights::RuntimeDbWeight
     **/
    FrameSupportWeightsRuntimeDbWeight: {
        read: 'u64',
        write: 'u64'
    },
    /**
     * Lookup68: sp_version::RuntimeVersion
     **/
    SpVersionRuntimeVersion: {
        specName: 'Text',
        implName: 'Text',
        authoringVersion: 'u32',
        specVersion: 'u32',
        implVersion: 'u32',
        apis: 'Vec<([u8;8],u32)>',
        transactionVersion: 'u32',
        stateVersion: 'u8'
    },
    /**
     * Lookup74: frame_system::pallet::Error<T>
     **/
    FrameSystemError: {
        _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered']
    },
    /**
     * Lookup76: pallet_timestamp::pallet::Call<T>
     **/
    PalletTimestampCall: {
        _enum: {
            set: {
                now: 'Compact<u64>'
            }
        }
    },
    /**
     * Lookup79: sp_consensus_aura::sr25519::app_sr25519::Public
     **/
    SpConsensusAuraSr25519AppSr25519Public: 'SpCoreSr25519Public',
    /**
     * Lookup80: sp_core::sr25519::Public
     **/
    SpCoreSr25519Public: '[u8;32]',
    /**
     * Lookup83: pallet_grandpa::StoredState<N>
     **/
    PalletGrandpaStoredState: {
        _enum: {
            Live: 'Null',
            PendingPause: {
                scheduledAt: 'u32',
                delay: 'u32',
            },
            Paused: 'Null',
            PendingResume: {
                scheduledAt: 'u32',
                delay: 'u32'
            }
        }
    },
    /**
     * Lookup84: pallet_grandpa::StoredPendingChange<N, Limit>
     **/
    PalletGrandpaStoredPendingChange: {
        scheduledAt: 'u32',
        delay: 'u32',
        nextAuthorities: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
        forced: 'Option<u32>'
    },
    /**
     * Lookup87: pallet_grandpa::pallet::Call<T>
     **/
    PalletGrandpaCall: {
        _enum: {
            report_equivocation: {
                equivocationProof: 'SpFinalityGrandpaEquivocationProof',
                keyOwnerProof: 'SpCoreVoid',
            },
            report_equivocation_unsigned: {
                equivocationProof: 'SpFinalityGrandpaEquivocationProof',
                keyOwnerProof: 'SpCoreVoid',
            },
            note_stalled: {
                delay: 'u32',
                bestFinalizedBlockNumber: 'u32'
            }
        }
    },
    /**
     * Lookup88: sp_finality_grandpa::EquivocationProof<primitive_types::H256, N>
     **/
    SpFinalityGrandpaEquivocationProof: {
        setId: 'u64',
        equivocation: 'SpFinalityGrandpaEquivocation'
    },
    /**
     * Lookup89: sp_finality_grandpa::Equivocation<primitive_types::H256, N>
     **/
    SpFinalityGrandpaEquivocation: {
        _enum: {
            Prevote: 'FinalityGrandpaEquivocationPrevote',
            Precommit: 'FinalityGrandpaEquivocationPrecommit'
        }
    },
    /**
     * Lookup90: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
     **/
    FinalityGrandpaEquivocationPrevote: {
        roundNumber: 'u64',
        identity: 'SpFinalityGrandpaAppPublic',
        first: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)',
        second: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)'
    },
    /**
     * Lookup91: finality_grandpa::Prevote<primitive_types::H256, N>
     **/
    FinalityGrandpaPrevote: {
        targetHash: 'H256',
        targetNumber: 'u32'
    },
    /**
     * Lookup92: sp_finality_grandpa::app::Signature
     **/
    SpFinalityGrandpaAppSignature: 'SpCoreEd25519Signature',
    /**
     * Lookup93: sp_core::ed25519::Signature
     **/
    SpCoreEd25519Signature: '[u8;64]',
    /**
     * Lookup96: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
     **/
    FinalityGrandpaEquivocationPrecommit: {
        roundNumber: 'u64',
        identity: 'SpFinalityGrandpaAppPublic',
        first: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)',
        second: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)'
    },
    /**
     * Lookup97: finality_grandpa::Precommit<primitive_types::H256, N>
     **/
    FinalityGrandpaPrecommit: {
        targetHash: 'H256',
        targetNumber: 'u32'
    },
    /**
     * Lookup99: sp_core::Void
     **/
    SpCoreVoid: 'Null',
    /**
     * Lookup100: pallet_grandpa::pallet::Error<T>
     **/
    PalletGrandpaError: {
        _enum: ['PauseFailed', 'ResumeFailed', 'ChangePending', 'TooSoon', 'InvalidKeyOwnershipProof', 'InvalidEquivocationProof', 'DuplicateOffenceReport']
    },
    /**
     * Lookup102: pallet_balances::BalanceLock<Balance>
     **/
    PalletBalancesBalanceLock: {
        id: '[u8;8]',
        amount: 'u128',
        reasons: 'PalletBalancesReasons'
    },
    /**
     * Lookup103: pallet_balances::Reasons
     **/
    PalletBalancesReasons: {
        _enum: ['Fee', 'Misc', 'All']
    },
    /**
     * Lookup106: pallet_balances::ReserveData<ReserveIdentifier, Balance>
     **/
    PalletBalancesReserveData: {
        id: '[u8;8]',
        amount: 'u128'
    },
    /**
     * Lookup108: pallet_balances::Releases
     **/
    PalletBalancesReleases: {
        _enum: ['V1_0_0', 'V2_0_0']
    },
    /**
     * Lookup109: pallet_balances::pallet::Call<T, I>
     **/
    PalletBalancesCall: {
        _enum: {
            transfer: {
                dest: 'MultiAddress',
                value: 'Compact<u128>',
            },
            set_balance: {
                who: 'MultiAddress',
                newFree: 'Compact<u128>',
                newReserved: 'Compact<u128>',
            },
            force_transfer: {
                source: 'MultiAddress',
                dest: 'MultiAddress',
                value: 'Compact<u128>',
            },
            transfer_keep_alive: {
                dest: 'MultiAddress',
                value: 'Compact<u128>',
            },
            transfer_all: {
                dest: 'MultiAddress',
                keepAlive: 'bool',
            },
            force_unreserve: {
                who: 'MultiAddress',
                amount: 'u128'
            }
        }
    },
    /**
     * Lookup114: pallet_balances::pallet::Error<T, I>
     **/
    PalletBalancesError: {
        _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'KeepAlive', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves']
    },
    /**
     * Lookup116: pallet_transaction_payment::Releases
     **/
    PalletTransactionPaymentReleases: {
        _enum: ['V1Ancient', 'V2']
    },
    /**
     * Lookup118: frame_support::weights::WeightToFeeCoefficient<Balance>
     **/
    FrameSupportWeightsWeightToFeeCoefficient: {
        coeffInteger: 'u128',
        coeffFrac: 'Perbill',
        negative: 'bool',
        degree: 'u8'
    },
    /**
     * Lookup119: pallet_sudo::pallet::Call<T>
     **/
    PalletSudoCall: {
        _enum: {
            sudo: {
                call: 'Call',
            },
            sudo_unchecked_weight: {
                call: 'Call',
                weight: 'u64',
            },
            set_key: {
                _alias: {
                    new_: 'new',
                },
                new_: 'MultiAddress',
            },
            sudo_as: {
                who: 'MultiAddress',
                call: 'Call'
            }
        }
    },
    /**
     * Lookup121: pallet_orderbook::pallet::Call<T>
     **/
    PalletOrderbookCall: {
        _enum: {
            change_owner: {
                newOwner: 'AccountId32',
            },
            set_order_limits: {
                limits: 'u64',
            },
            set_asset_white_list_limits: {
                limits: 'u64',
            },
            post_order: {
                orderId: 'Bytes',
                owner: 'AccountId32',
                fields: 'Option<Vec<PalletOrderbookOrderField>>',
            },
            post_asset_white_list: {
                tokenAddress: 'Bytes',
                tokenId: 'Bytes',
                email: 'Bytes',
            },
            remove_order: {
                orderIndex: 'u64',
            },
            remove_asset_white_list: {
                tokenAddress: 'Bytes',
                tokenId: 'Bytes'
            }
        }
    },
    /**
     * Lookup124: pallet_orderbook::types::OrderField
     **/
    PalletOrderbookOrderField: {
        name: 'Bytes',
        value: 'Bytes'
    },
    /**
     * Lookup125: pallet_wyvern_exchange::pallet::Call<T>
     **/
    PalletWyvernExchangeCall: {
        _enum: {
            approve_order_ex: {
                addrs: 'Vec<AccountId32>',
                uints: 'Vec<u64>',
                feeMethod: 'PalletWyvernExchangeCoreFeeMethod',
                side: 'PalletWyvernExchangeCoreSide',
                saleKind: 'PalletWyvernExchangeCoreSaleKind',
                howToCall: 'PalletWyvernExchangeCoreHowToCall',
                calldata: 'Bytes',
                replacementPattern: 'Bytes',
                staticExtradata: 'Bytes',
                orderbookInclusionDesired: 'bool',
            },
            cancel_order_ex: {
                addrs: 'Vec<AccountId32>',
                uints: 'Vec<u64>',
                feeMethod: 'PalletWyvernExchangeCoreFeeMethod',
                side: 'PalletWyvernExchangeCoreSide',
                saleKind: 'PalletWyvernExchangeCoreSaleKind',
                howToCall: 'PalletWyvernExchangeCoreHowToCall',
                calldata: 'Bytes',
                replacementPattern: 'Bytes',
                staticExtradata: 'Bytes',
                sig: 'Bytes',
            },
            atomic_match_ex: {
                addrs: 'Vec<AccountId32>',
                uints: 'Vec<u64>',
                feeMethodsSidesKindsHowToCalls: 'Bytes',
                calldataBuy: 'Bytes',
                calldataSell: 'Bytes',
                replacementPatternBuy: 'Bytes',
                replacementPatternSell: 'Bytes',
                staticExtradataBuy: 'Bytes',
                staticExtradataSell: 'Bytes',
                sigBuy: 'Bytes',
                sigSell: 'Bytes',
                rssMetadata: 'Bytes'
            }
        }
    },
    /**
     * Lookup128: pallet_wyvern_exchange_core::pallet::Call<T>
     **/
    PalletWyvernExchangeCoreCall: {
        _enum: {
            change_minimum_maker_protocol_fee: {
                newMinimumMakerProtocolFee: 'u128',
            },
            change_minimum_taker_protocol_fee: {
                newMinimumTakerProtocolFee: 'u128',
            },
            change_protocol_fee_recipient: {
                newProtocolFeeRecipient: 'AccountId32',
            },
            change_owner: {
                newOwner: 'AccountId32',
            },
            set_contract_self: {
                contract: 'AccountId32',
            },
            set_proxy_registry: {
                registryAddress: 'AccountId32',
            },
            set_token_transfer_proxy: {
                proxyAddress: 'AccountId32',
            },
            set_gas_limit: {
                gasLimit: 'u64',
            },
            set_proxy_selector: {
                selectror: 'Bytes',
            },
            set_token_selector: {
                selectror: 'Bytes',
            },
            call_smart_contract: {
                dest: 'AccountId32',
                selector: 'Bytes',
                selectors: 'Bytes',
                callees: 'Vec<AccountId32>',
                from: 'AccountId32',
                to: 'AccountId32',
                values: 'Vec<u128>',
                gasLimit: 'Compact<u64>',
            },
            call_smart_contracts: {
                dest: 'AccountId32',
                selector: 'Bytes',
                from: 'AccountId32',
                to: 'AccountId32',
                values: 'u128',
                gasLimit: 'Compact<u64>',
            },
            call_proxy_contracts: {
                dest: 'AccountId32',
                selector: 'Bytes',
                from: 'AccountId32',
                gasLimit: 'Compact<u64>'
            }
        }
    },
    /**
     * Lookup130: pallet_contracts::pallet::Call<T>
     **/
    PalletContractsCall: {
        _enum: {
            call: {
                dest: 'MultiAddress',
                value: 'Compact<u128>',
                gasLimit: 'Compact<u64>',
                storageDepositLimit: 'Option<Compact<u128>>',
                data: 'Bytes',
            },
            instantiate_with_code: {
                value: 'Compact<u128>',
                gasLimit: 'Compact<u64>',
                storageDepositLimit: 'Option<Compact<u128>>',
                code: 'Bytes',
                data: 'Bytes',
                salt: 'Bytes',
            },
            instantiate: {
                value: 'Compact<u128>',
                gasLimit: 'Compact<u64>',
                storageDepositLimit: 'Option<Compact<u128>>',
                codeHash: 'H256',
                data: 'Bytes',
                salt: 'Bytes',
            },
            upload_code: {
                code: 'Bytes',
                storageDepositLimit: 'Option<Compact<u128>>',
            },
            remove_code: {
                codeHash: 'H256',
            },
            set_code: {
                dest: 'MultiAddress',
                codeHash: 'H256'
            }
        }
    },
    /**
     * Lookup132: pallet_kitties::pallet::Call<T>
     **/
    PalletKittiesCall: {
        _enum: {
            create_kitty: 'Null',
            breed_kitty: {
                parent1: '[u8;16]',
                parent2: '[u8;16]',
            },
            transfer: {
                to: 'AccountId32',
                kittyId: '[u8;16]',
            },
            buy_kitty: {
                kittyId: '[u8;16]',
                limitPrice: 'u128',
            },
            set_price: {
                kittyId: '[u8;16]',
                newPrice: 'Option<u128>'
            }
        }
    },
    /**
     * Lookup133: pallet_sudo::pallet::Error<T>
     **/
    PalletSudoError: {
        _enum: ['RequireSudo']
    },
    /**
     * Lookup134: pallet_orderbook::types::OrderJSONType<sp_core::crypto::AccountId32, Moment>
     **/
    PalletOrderbookOrderJSONType: {
        index: 'u64',
        orderId: 'Bytes',
        owner: 'AccountId32',
        fields: 'Option<Vec<PalletOrderbookOrderField>>',
        createdDate: 'u64'
    },
    /**
     * Lookup135: pallet_orderbook::pallet::Error<T>
     **/
    PalletOrderbookError: {
        _enum: ['OrderIdMissing', 'OrderIdTooLong', 'OrderIdExists', 'OrderTooManyFields', 'OrderInvalidFieldName', 'OrderInvalidFieldValue', 'OrderLimitsExceed', 'AssetWhiteListLimitsExceed', 'OrderIndexNotExist', 'OrderIdNotExistInOrderIndices', 'OrderIdNotExistInOwnerOf', 'OrderFieldNotExist', 'AssetWhiteListNotExist', 'OnlyOwner']
    },
    /**
     * Lookup136: pallet_wyvern_exchange_core::pallet::Error<T>
     **/
    PalletWyvernExchangeCoreError: {
        _enum: ['MsgVerifyFailed', 'InvalidBuyOrderParameters', 'InvalidSellOrderParameters', 'OrdersCannotMatch', 'ListingTimeExpired', 'ArrayNotEqual', 'BuyArrayNotEqual', 'SellArrayNotEqual', 'BuyTakerProtocolFeeGreaterThanSellTakerProtocolFee', 'BuyTakerRelayerFeeGreaterThanSellTakerRelayerFee', 'SellPaymentTokenEqualPaymentToken', 'SellTakerProtocolFeeGreaterThanBuyTakerProtocolFee', 'SellTakerRelayerFeeGreaterThanBuyTakerRelayerFee', 'ValueLessThanRequiredAmount', 'ValueNotZero', 'BuyPriceLessThanSellPrice', 'OrderHashExists', 'OnlyMaker', 'InvalidOrderHash', 'InvalidSignature', 'OnlyOwner', 'OnlyContractSelf', 'ProxyRegistryIsEmpty', 'TokenTransferProxyIsEmpty']
    },
    /**
     * Lookup138: pallet_contracts::wasm::PrefabWasmModule<T>
     **/
    PalletContractsWasmPrefabWasmModule: {
        instructionWeightsVersion: 'Compact<u32>',
        initial: 'Compact<u32>',
        maximum: 'Compact<u32>',
        code: 'Bytes'
    },
    /**
     * Lookup140: pallet_contracts::wasm::OwnerInfo<T>
     **/
    PalletContractsWasmOwnerInfo: {
        owner: 'AccountId32',
        deposit: 'Compact<u128>',
        refcount: 'Compact<u64>'
    },
    /**
     * Lookup141: pallet_contracts::storage::RawContractInfo<primitive_types::H256, Balance>
     **/
    PalletContractsStorageRawContractInfo: {
        trieId: 'Bytes',
        codeHash: 'H256',
        storageDeposit: 'u128'
    },
    /**
     * Lookup144: pallet_contracts::storage::DeletedContract
     **/
    PalletContractsStorageDeletedContract: {
        trieId: 'Bytes'
    },
    /**
     * Lookup146: pallet_contracts::schedule::Schedule<T>
     **/
    PalletContractsSchedule: {
        limits: 'PalletContractsScheduleLimits',
        instructionWeights: 'PalletContractsScheduleInstructionWeights',
        hostFnWeights: 'PalletContractsScheduleHostFnWeights'
    },
    /**
     * Lookup147: pallet_contracts::schedule::Limits
     **/
    PalletContractsScheduleLimits: {
        eventTopics: 'u32',
        stackHeight: 'Option<u32>',
        globals: 'u32',
        parameters: 'u32',
        memoryPages: 'u32',
        tableSize: 'u32',
        brTableSize: 'u32',
        subjectLen: 'u32',
        callDepth: 'u32',
        payloadLen: 'u32'
    },
    /**
     * Lookup148: pallet_contracts::schedule::InstructionWeights<T>
     **/
    PalletContractsScheduleInstructionWeights: {
        _alias: {
            r_if: 'r#if'
        },
        version: 'u32',
        i64const: 'u32',
        i64load: 'u32',
        i64store: 'u32',
        select: 'u32',
        r_if: 'u32',
        br: 'u32',
        brIf: 'u32',
        brTable: 'u32',
        brTablePerEntry: 'u32',
        call: 'u32',
        callIndirect: 'u32',
        callIndirectPerParam: 'u32',
        localGet: 'u32',
        localSet: 'u32',
        localTee: 'u32',
        globalGet: 'u32',
        globalSet: 'u32',
        memoryCurrent: 'u32',
        memoryGrow: 'u32',
        i64clz: 'u32',
        i64ctz: 'u32',
        i64popcnt: 'u32',
        i64eqz: 'u32',
        i64extendsi32: 'u32',
        i64extendui32: 'u32',
        i32wrapi64: 'u32',
        i64eq: 'u32',
        i64ne: 'u32',
        i64lts: 'u32',
        i64ltu: 'u32',
        i64gts: 'u32',
        i64gtu: 'u32',
        i64les: 'u32',
        i64leu: 'u32',
        i64ges: 'u32',
        i64geu: 'u32',
        i64add: 'u32',
        i64sub: 'u32',
        i64mul: 'u32',
        i64divs: 'u32',
        i64divu: 'u32',
        i64rems: 'u32',
        i64remu: 'u32',
        i64and: 'u32',
        i64or: 'u32',
        i64xor: 'u32',
        i64shl: 'u32',
        i64shrs: 'u32',
        i64shru: 'u32',
        i64rotl: 'u32',
        i64rotr: 'u32'
    },
    /**
     * Lookup149: pallet_contracts::schedule::HostFnWeights<T>
     **/
    PalletContractsScheduleHostFnWeights: {
        _alias: {
            r_return: 'r#return'
        },
        caller: 'u64',
        isContract: 'u64',
        codeHash: 'u64',
        ownCodeHash: 'u64',
        callerIsOrigin: 'u64',
        address: 'u64',
        gasLeft: 'u64',
        balance: 'u64',
        valueTransferred: 'u64',
        minimumBalance: 'u64',
        blockNumber: 'u64',
        now: 'u64',
        weightToFee: 'u64',
        gas: 'u64',
        input: 'u64',
        inputPerByte: 'u64',
        r_return: 'u64',
        returnPerByte: 'u64',
        terminate: 'u64',
        random: 'u64',
        depositEvent: 'u64',
        depositEventPerTopic: 'u64',
        depositEventPerByte: 'u64',
        debugMessage: 'u64',
        setStorage: 'u64',
        setStoragePerNewByte: 'u64',
        setStoragePerOldByte: 'u64',
        setCodeHash: 'u64',
        clearStorage: 'u64',
        clearStoragePerByte: 'u64',
        containsStorage: 'u64',
        containsStoragePerByte: 'u64',
        getStorage: 'u64',
        getStoragePerByte: 'u64',
        takeStorage: 'u64',
        takeStoragePerByte: 'u64',
        transfer: 'u64',
        call: 'u64',
        delegateCall: 'u64',
        callTransferSurcharge: 'u64',
        callPerClonedByte: 'u64',
        instantiate: 'u64',
        instantiateTransferSurcharge: 'u64',
        instantiatePerSaltByte: 'u64',
        hashSha2256: 'u64',
        hashSha2256PerByte: 'u64',
        hashKeccak256: 'u64',
        hashKeccak256PerByte: 'u64',
        hashBlake2256: 'u64',
        hashBlake2256PerByte: 'u64',
        hashBlake2128: 'u64',
        hashBlake2128PerByte: 'u64',
        ecdsaRecover: 'u64',
        ecdsaToEthAddress: 'u64'
    },
    /**
     * Lookup150: pallet_contracts::pallet::Error<T>
     **/
    PalletContractsError: {
        _enum: ['InvalidScheduleVersion', 'InvalidCallFlags', 'OutOfGas', 'OutputBufferTooSmall', 'TransferFailed', 'MaxCallDepthReached', 'ContractNotFound', 'CodeTooLarge', 'CodeNotFound', 'OutOfBounds', 'DecodingFailed', 'ContractTrapped', 'ValueTooLarge', 'TerminatedWhileReentrant', 'InputForwarded', 'RandomSubjectTooLong', 'TooManyTopics', 'DuplicateTopics', 'NoChainExtension', 'DeletionQueueFull', 'DuplicateContract', 'TerminatedInConstructor', 'DebugMessageInvalidUTF8', 'ReentranceDenied', 'StorageDepositNotEnoughFunds', 'StorageDepositLimitExhausted', 'CodeInUse', 'ContractReverted', 'CodeRejected']
    },
    /**
     * Lookup151: pallet_kitties::pallet::Kitty<T>
     **/
    PalletKittiesKitty: {
        dna: '[u8;16]',
        price: 'Option<u128>',
        gender: 'PalletKittiesGender',
        owner: 'AccountId32'
    },
    /**
     * Lookup152: pallet_kitties::pallet::Gender
     **/
    PalletKittiesGender: {
        _enum: ['Male', 'Female']
    },
    /**
     * Lookup155: pallet_kitties::pallet::Error<T>
     **/
    PalletKittiesError: {
        _enum: ['TooManyOwned', 'TransferToSelf', 'DuplicateKitty', 'NoKitty', 'NotOwner', 'NotForSale', 'BidPriceTooLow', 'CantBreed']
    },
    /**
     * Lookup157: sp_runtime::MultiSignature
     **/
    SpRuntimeMultiSignature: {
        _enum: {
            Ed25519: 'SpCoreEd25519Signature',
            Sr25519: 'SpCoreSr25519Signature',
            Ecdsa: 'SpCoreEcdsaSignature'
        }
    },
    /**
     * Lookup158: sp_core::sr25519::Signature
     **/
    SpCoreSr25519Signature: '[u8;64]',
    /**
     * Lookup159: sp_core::ecdsa::Signature
     **/
    SpCoreEcdsaSignature: '[u8;65]',
    /**
     * Lookup162: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
     **/
    FrameSystemExtensionsCheckNonZeroSender: 'Null',
    /**
     * Lookup163: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
     **/
    FrameSystemExtensionsCheckSpecVersion: 'Null',
    /**
     * Lookup164: frame_system::extensions::check_tx_version::CheckTxVersion<T>
     **/
    FrameSystemExtensionsCheckTxVersion: 'Null',
    /**
     * Lookup165: frame_system::extensions::check_genesis::CheckGenesis<T>
     **/
    FrameSystemExtensionsCheckGenesis: 'Null',
    /**
     * Lookup168: frame_system::extensions::check_nonce::CheckNonce<T>
     **/
    FrameSystemExtensionsCheckNonce: 'Compact<u32>',
    /**
     * Lookup169: frame_system::extensions::check_weight::CheckWeight<T>
     **/
    FrameSystemExtensionsCheckWeight: 'Null',
    /**
     * Lookup170: pallet_transaction_payment::ChargeTransactionPayment<T>
     **/
    PalletTransactionPaymentChargeTransactionPayment: 'Compact<u128>',
    /**
     * Lookup171: contracts_node_runtime::Runtime
     **/
    ContractsNodeRuntimeRuntime: 'Null'
};
//# sourceMappingURL=lookup.js.map