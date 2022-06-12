declare const _default: {
    /**
     * Lookup3: frame_system::AccountInfo<Index, pallet_balances::AccountData<Balance>>
     **/
    FrameSystemAccountInfo: {
        nonce: string;
        consumers: string;
        providers: string;
        sufficients: string;
        data: string;
    };
    /**
     * Lookup5: pallet_balances::AccountData<Balance>
     **/
    PalletBalancesAccountData: {
        free: string;
        reserved: string;
        miscFrozen: string;
        feeFrozen: string;
    };
    /**
     * Lookup7: frame_support::weights::PerDispatchClass<T>
     **/
    FrameSupportWeightsPerDispatchClassU64: {
        normal: string;
        operational: string;
        mandatory: string;
    };
    /**
     * Lookup11: sp_runtime::generic::digest::Digest
     **/
    SpRuntimeDigest: {
        logs: string;
    };
    /**
     * Lookup13: sp_runtime::generic::digest::DigestItem
     **/
    SpRuntimeDigestDigestItem: {
        _enum: {
            Other: string;
            __Unused1: string;
            __Unused2: string;
            __Unused3: string;
            Consensus: string;
            Seal: string;
            PreRuntime: string;
            __Unused7: string;
            RuntimeEnvironmentUpdated: string;
        };
    };
    /**
     * Lookup16: frame_system::EventRecord<contracts_node_runtime::Event, primitive_types::H256>
     **/
    FrameSystemEventRecord: {
        phase: string;
        event: string;
        topics: string;
    };
    /**
     * Lookup18: frame_system::pallet::Event<T>
     **/
    FrameSystemEvent: {
        _enum: {
            ExtrinsicSuccess: {
                dispatchInfo: string;
            };
            ExtrinsicFailed: {
                dispatchError: string;
                dispatchInfo: string;
            };
            CodeUpdated: string;
            NewAccount: {
                account: string;
            };
            KilledAccount: {
                account: string;
            };
            Remarked: {
                _alias: {
                    hash_: string;
                };
                sender: string;
                hash_: string;
            };
        };
    };
    /**
     * Lookup19: frame_support::weights::DispatchInfo
     **/
    FrameSupportWeightsDispatchInfo: {
        weight: string;
        class: string;
        paysFee: string;
    };
    /**
     * Lookup20: frame_support::weights::DispatchClass
     **/
    FrameSupportWeightsDispatchClass: {
        _enum: string[];
    };
    /**
     * Lookup21: frame_support::weights::Pays
     **/
    FrameSupportWeightsPays: {
        _enum: string[];
    };
    /**
     * Lookup22: sp_runtime::DispatchError
     **/
    SpRuntimeDispatchError: {
        _enum: {
            Other: string;
            CannotLookup: string;
            BadOrigin: string;
            Module: string;
            ConsumerRemaining: string;
            NoProviders: string;
            TooManyConsumers: string;
            Token: string;
            Arithmetic: string;
            Transactional: string;
        };
    };
    /**
     * Lookup23: sp_runtime::ModuleError
     **/
    SpRuntimeModuleError: {
        index: string;
        error: string;
    };
    /**
     * Lookup24: sp_runtime::TokenError
     **/
    SpRuntimeTokenError: {
        _enum: string[];
    };
    /**
     * Lookup25: sp_runtime::ArithmeticError
     **/
    SpRuntimeArithmeticError: {
        _enum: string[];
    };
    /**
     * Lookup26: sp_runtime::TransactionalError
     **/
    SpRuntimeTransactionalError: {
        _enum: string[];
    };
    /**
     * Lookup27: pallet_grandpa::pallet::Event
     **/
    PalletGrandpaEvent: {
        _enum: {
            NewAuthorities: {
                authoritySet: string;
            };
            Paused: string;
            Resumed: string;
        };
    };
    /**
     * Lookup30: sp_finality_grandpa::app::Public
     **/
    SpFinalityGrandpaAppPublic: string;
    /**
     * Lookup31: sp_core::ed25519::Public
     **/
    SpCoreEd25519Public: string;
    /**
     * Lookup32: pallet_balances::pallet::Event<T, I>
     **/
    PalletBalancesEvent: {
        _enum: {
            Endowed: {
                account: string;
                freeBalance: string;
            };
            DustLost: {
                account: string;
                amount: string;
            };
            Transfer: {
                from: string;
                to: string;
                amount: string;
            };
            BalanceSet: {
                who: string;
                free: string;
                reserved: string;
            };
            Reserved: {
                who: string;
                amount: string;
            };
            Unreserved: {
                who: string;
                amount: string;
            };
            ReserveRepatriated: {
                from: string;
                to: string;
                amount: string;
                destinationStatus: string;
            };
            Deposit: {
                who: string;
                amount: string;
            };
            Withdraw: {
                who: string;
                amount: string;
            };
            Slashed: {
                who: string;
                amount: string;
            };
        };
    };
    /**
     * Lookup33: frame_support::traits::tokens::misc::BalanceStatus
     **/
    FrameSupportTokensMiscBalanceStatus: {
        _enum: string[];
    };
    /**
     * Lookup34: pallet_sudo::pallet::Event<T>
     **/
    PalletSudoEvent: {
        _enum: {
            Sudid: {
                sudoResult: string;
            };
            KeyChanged: {
                oldSudoer: string;
            };
            SudoAsDone: {
                sudoResult: string;
            };
        };
    };
    /**
     * Lookup38: pallet_orderbook::pallet::Event<T>
     **/
    PalletOrderbookEvent: {
        _enum: {
            OrderPosted: string;
            AssetWhiteListPosted: string;
            OwnerChanged: string;
            OrderLimitsChanged: string;
            AssetWhiteListLimitsChanged: string;
        };
    };
    /**
     * Lookup39: pallet_wyvern_exchange_core::pallet::Event<T>
     **/
    PalletWyvernExchangeCoreEvent: {
        _enum: {
            OrderApprovedPartOne: string;
            OrderApprovedPartTwo: string;
            OrderCancelled: string;
            OrdersMatched: string;
            MinimumMakerProtocolFeeChanged: string;
            MinimumTakerProtocolFeeChanged: string;
            ProtocolFeeRecipientChanged: string;
            OwnerChanged: string;
            ContractSelfChanged: string;
            ProxyRegistryChanged: string;
            TokenTransferProxyChanged: string;
            GasLimitChanged: string;
            ProxySelectorChanged: string;
            TokenSelectorChanged: string;
        };
    };
    /**
     * Lookup40: pallet_wyvern_exchange_core::types::FeeMethod
     **/
    PalletWyvernExchangeCoreFeeMethod: {
        _enum: string[];
    };
    /**
     * Lookup41: pallet_wyvern_exchange_core::types::Side
     **/
    PalletWyvernExchangeCoreSide: {
        _enum: string[];
    };
    /**
     * Lookup42: pallet_wyvern_exchange_core::types::SaleKind
     **/
    PalletWyvernExchangeCoreSaleKind: {
        _enum: string[];
    };
    /**
     * Lookup43: pallet_wyvern_exchange_core::types::HowToCall
     **/
    PalletWyvernExchangeCoreHowToCall: {
        _enum: string[];
    };
    /**
     * Lookup45: pallet_contracts::pallet::Event<T>
     **/
    PalletContractsEvent: {
        _enum: {
            Instantiated: {
                deployer: string;
                contract: string;
            };
            Terminated: {
                contract: string;
                beneficiary: string;
            };
            CodeStored: {
                codeHash: string;
            };
            ContractEmitted: {
                contract: string;
                data: string;
            };
            CodeRemoved: {
                codeHash: string;
            };
            ContractCodeUpdated: {
                contract: string;
                newCodeHash: string;
                oldCodeHash: string;
            };
        };
    };
    /**
     * Lookup46: pallet_kitties::pallet::Event<T>
     **/
    PalletKittiesEvent: {
        _enum: {
            Created: {
                kitty: string;
                owner: string;
            };
            PriceSet: {
                kitty: string;
                price: string;
            };
            Transferred: {
                from: string;
                to: string;
                kitty: string;
            };
            Sold: {
                seller: string;
                buyer: string;
                kitty: string;
                price: string;
            };
        };
    };
    /**
     * Lookup49: frame_system::Phase
     **/
    FrameSystemPhase: {
        _enum: {
            ApplyExtrinsic: string;
            Finalization: string;
            Initialization: string;
        };
    };
    /**
     * Lookup53: frame_system::LastRuntimeUpgradeInfo
     **/
    FrameSystemLastRuntimeUpgradeInfo: {
        specVersion: string;
        specName: string;
    };
    /**
     * Lookup56: frame_system::pallet::Call<T>
     **/
    FrameSystemCall: {
        _enum: {
            fill_block: {
                ratio: string;
            };
            remark: {
                remark: string;
            };
            set_heap_pages: {
                pages: string;
            };
            set_code: {
                code: string;
            };
            set_code_without_checks: {
                code: string;
            };
            set_storage: {
                items: string;
            };
            kill_storage: {
                _alias: {
                    keys_: string;
                };
                keys_: string;
            };
            kill_prefix: {
                prefix: string;
                subkeys: string;
            };
            remark_with_event: {
                remark: string;
            };
        };
    };
    /**
     * Lookup61: frame_system::limits::BlockWeights
     **/
    FrameSystemLimitsBlockWeights: {
        baseBlock: string;
        maxBlock: string;
        perClass: string;
    };
    /**
     * Lookup62: frame_support::weights::PerDispatchClass<frame_system::limits::WeightsPerClass>
     **/
    FrameSupportWeightsPerDispatchClassWeightsPerClass: {
        normal: string;
        operational: string;
        mandatory: string;
    };
    /**
     * Lookup63: frame_system::limits::WeightsPerClass
     **/
    FrameSystemLimitsWeightsPerClass: {
        baseExtrinsic: string;
        maxExtrinsic: string;
        maxTotal: string;
        reserved: string;
    };
    /**
     * Lookup65: frame_system::limits::BlockLength
     **/
    FrameSystemLimitsBlockLength: {
        max: string;
    };
    /**
     * Lookup66: frame_support::weights::PerDispatchClass<T>
     **/
    FrameSupportWeightsPerDispatchClassU32: {
        normal: string;
        operational: string;
        mandatory: string;
    };
    /**
     * Lookup67: frame_support::weights::RuntimeDbWeight
     **/
    FrameSupportWeightsRuntimeDbWeight: {
        read: string;
        write: string;
    };
    /**
     * Lookup68: sp_version::RuntimeVersion
     **/
    SpVersionRuntimeVersion: {
        specName: string;
        implName: string;
        authoringVersion: string;
        specVersion: string;
        implVersion: string;
        apis: string;
        transactionVersion: string;
        stateVersion: string;
    };
    /**
     * Lookup74: frame_system::pallet::Error<T>
     **/
    FrameSystemError: {
        _enum: string[];
    };
    /**
     * Lookup76: pallet_timestamp::pallet::Call<T>
     **/
    PalletTimestampCall: {
        _enum: {
            set: {
                now: string;
            };
        };
    };
    /**
     * Lookup79: sp_consensus_aura::sr25519::app_sr25519::Public
     **/
    SpConsensusAuraSr25519AppSr25519Public: string;
    /**
     * Lookup80: sp_core::sr25519::Public
     **/
    SpCoreSr25519Public: string;
    /**
     * Lookup83: pallet_grandpa::StoredState<N>
     **/
    PalletGrandpaStoredState: {
        _enum: {
            Live: string;
            PendingPause: {
                scheduledAt: string;
                delay: string;
            };
            Paused: string;
            PendingResume: {
                scheduledAt: string;
                delay: string;
            };
        };
    };
    /**
     * Lookup84: pallet_grandpa::StoredPendingChange<N, Limit>
     **/
    PalletGrandpaStoredPendingChange: {
        scheduledAt: string;
        delay: string;
        nextAuthorities: string;
        forced: string;
    };
    /**
     * Lookup87: pallet_grandpa::pallet::Call<T>
     **/
    PalletGrandpaCall: {
        _enum: {
            report_equivocation: {
                equivocationProof: string;
                keyOwnerProof: string;
            };
            report_equivocation_unsigned: {
                equivocationProof: string;
                keyOwnerProof: string;
            };
            note_stalled: {
                delay: string;
                bestFinalizedBlockNumber: string;
            };
        };
    };
    /**
     * Lookup88: sp_finality_grandpa::EquivocationProof<primitive_types::H256, N>
     **/
    SpFinalityGrandpaEquivocationProof: {
        setId: string;
        equivocation: string;
    };
    /**
     * Lookup89: sp_finality_grandpa::Equivocation<primitive_types::H256, N>
     **/
    SpFinalityGrandpaEquivocation: {
        _enum: {
            Prevote: string;
            Precommit: string;
        };
    };
    /**
     * Lookup90: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
     **/
    FinalityGrandpaEquivocationPrevote: {
        roundNumber: string;
        identity: string;
        first: string;
        second: string;
    };
    /**
     * Lookup91: finality_grandpa::Prevote<primitive_types::H256, N>
     **/
    FinalityGrandpaPrevote: {
        targetHash: string;
        targetNumber: string;
    };
    /**
     * Lookup92: sp_finality_grandpa::app::Signature
     **/
    SpFinalityGrandpaAppSignature: string;
    /**
     * Lookup93: sp_core::ed25519::Signature
     **/
    SpCoreEd25519Signature: string;
    /**
     * Lookup96: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
     **/
    FinalityGrandpaEquivocationPrecommit: {
        roundNumber: string;
        identity: string;
        first: string;
        second: string;
    };
    /**
     * Lookup97: finality_grandpa::Precommit<primitive_types::H256, N>
     **/
    FinalityGrandpaPrecommit: {
        targetHash: string;
        targetNumber: string;
    };
    /**
     * Lookup99: sp_core::Void
     **/
    SpCoreVoid: string;
    /**
     * Lookup100: pallet_grandpa::pallet::Error<T>
     **/
    PalletGrandpaError: {
        _enum: string[];
    };
    /**
     * Lookup102: pallet_balances::BalanceLock<Balance>
     **/
    PalletBalancesBalanceLock: {
        id: string;
        amount: string;
        reasons: string;
    };
    /**
     * Lookup103: pallet_balances::Reasons
     **/
    PalletBalancesReasons: {
        _enum: string[];
    };
    /**
     * Lookup106: pallet_balances::ReserveData<ReserveIdentifier, Balance>
     **/
    PalletBalancesReserveData: {
        id: string;
        amount: string;
    };
    /**
     * Lookup108: pallet_balances::Releases
     **/
    PalletBalancesReleases: {
        _enum: string[];
    };
    /**
     * Lookup109: pallet_balances::pallet::Call<T, I>
     **/
    PalletBalancesCall: {
        _enum: {
            transfer: {
                dest: string;
                value: string;
            };
            set_balance: {
                who: string;
                newFree: string;
                newReserved: string;
            };
            force_transfer: {
                source: string;
                dest: string;
                value: string;
            };
            transfer_keep_alive: {
                dest: string;
                value: string;
            };
            transfer_all: {
                dest: string;
                keepAlive: string;
            };
            force_unreserve: {
                who: string;
                amount: string;
            };
        };
    };
    /**
     * Lookup114: pallet_balances::pallet::Error<T, I>
     **/
    PalletBalancesError: {
        _enum: string[];
    };
    /**
     * Lookup116: pallet_transaction_payment::Releases
     **/
    PalletTransactionPaymentReleases: {
        _enum: string[];
    };
    /**
     * Lookup118: frame_support::weights::WeightToFeeCoefficient<Balance>
     **/
    FrameSupportWeightsWeightToFeeCoefficient: {
        coeffInteger: string;
        coeffFrac: string;
        negative: string;
        degree: string;
    };
    /**
     * Lookup119: pallet_sudo::pallet::Call<T>
     **/
    PalletSudoCall: {
        _enum: {
            sudo: {
                call: string;
            };
            sudo_unchecked_weight: {
                call: string;
                weight: string;
            };
            set_key: {
                _alias: {
                    new_: string;
                };
                new_: string;
            };
            sudo_as: {
                who: string;
                call: string;
            };
        };
    };
    /**
     * Lookup121: pallet_orderbook::pallet::Call<T>
     **/
    PalletOrderbookCall: {
        _enum: {
            change_owner: {
                newOwner: string;
            };
            set_order_limits: {
                limits: string;
            };
            set_asset_white_list_limits: {
                limits: string;
            };
            post_order: {
                orderId: string;
                owner: string;
                fields: string;
            };
            post_asset_white_list: {
                tokenAddress: string;
                tokenId: string;
                email: string;
            };
            remove_order: {
                orderIndex: string;
            };
            remove_asset_white_list: {
                tokenAddress: string;
                tokenId: string;
            };
        };
    };
    /**
     * Lookup124: pallet_orderbook::types::OrderField
     **/
    PalletOrderbookOrderField: {
        name: string;
        value: string;
    };
    /**
     * Lookup125: pallet_wyvern_exchange::pallet::Call<T>
     **/
    PalletWyvernExchangeCall: {
        _enum: {
            approve_order_ex: {
                addrs: string;
                uints: string;
                feeMethod: string;
                side: string;
                saleKind: string;
                howToCall: string;
                calldata: string;
                replacementPattern: string;
                staticExtradata: string;
                orderbookInclusionDesired: string;
            };
            cancel_order_ex: {
                addrs: string;
                uints: string;
                feeMethod: string;
                side: string;
                saleKind: string;
                howToCall: string;
                calldata: string;
                replacementPattern: string;
                staticExtradata: string;
                sig: string;
            };
            atomic_match_ex: {
                addrs: string;
                uints: string;
                feeMethodsSidesKindsHowToCalls: string;
                calldataBuy: string;
                calldataSell: string;
                replacementPatternBuy: string;
                replacementPatternSell: string;
                staticExtradataBuy: string;
                staticExtradataSell: string;
                sigBuy: string;
                sigSell: string;
                rssMetadata: string;
            };
        };
    };
    /**
     * Lookup128: pallet_wyvern_exchange_core::pallet::Call<T>
     **/
    PalletWyvernExchangeCoreCall: {
        _enum: {
            change_minimum_maker_protocol_fee: {
                newMinimumMakerProtocolFee: string;
            };
            change_minimum_taker_protocol_fee: {
                newMinimumTakerProtocolFee: string;
            };
            change_protocol_fee_recipient: {
                newProtocolFeeRecipient: string;
            };
            change_owner: {
                newOwner: string;
            };
            set_contract_self: {
                contract: string;
            };
            set_proxy_registry: {
                registryAddress: string;
            };
            set_token_transfer_proxy: {
                proxyAddress: string;
            };
            set_gas_limit: {
                gasLimit: string;
            };
            set_proxy_selector: {
                selectror: string;
            };
            set_token_selector: {
                selectror: string;
            };
            call_smart_contract: {
                dest: string;
                selector: string;
                selectors: string;
                callees: string;
                from: string;
                to: string;
                values: string;
                gasLimit: string;
            };
            call_smart_contracts: {
                dest: string;
                selector: string;
                from: string;
                to: string;
                values: string;
                gasLimit: string;
            };
            call_proxy_contracts: {
                dest: string;
                selector: string;
                from: string;
                gasLimit: string;
            };
        };
    };
    /**
     * Lookup130: pallet_contracts::pallet::Call<T>
     **/
    PalletContractsCall: {
        _enum: {
            call: {
                dest: string;
                value: string;
                gasLimit: string;
                storageDepositLimit: string;
                data: string;
            };
            instantiate_with_code: {
                value: string;
                gasLimit: string;
                storageDepositLimit: string;
                code: string;
                data: string;
                salt: string;
            };
            instantiate: {
                value: string;
                gasLimit: string;
                storageDepositLimit: string;
                codeHash: string;
                data: string;
                salt: string;
            };
            upload_code: {
                code: string;
                storageDepositLimit: string;
            };
            remove_code: {
                codeHash: string;
            };
            set_code: {
                dest: string;
                codeHash: string;
            };
        };
    };
    /**
     * Lookup132: pallet_kitties::pallet::Call<T>
     **/
    PalletKittiesCall: {
        _enum: {
            create_kitty: string;
            breed_kitty: {
                parent1: string;
                parent2: string;
            };
            transfer: {
                to: string;
                kittyId: string;
            };
            buy_kitty: {
                kittyId: string;
                limitPrice: string;
            };
            set_price: {
                kittyId: string;
                newPrice: string;
            };
        };
    };
    /**
     * Lookup133: pallet_sudo::pallet::Error<T>
     **/
    PalletSudoError: {
        _enum: string[];
    };
    /**
     * Lookup134: pallet_orderbook::types::OrderJSONType<sp_core::crypto::AccountId32, Moment>
     **/
    PalletOrderbookOrderJSONType: {
        index: string;
        orderId: string;
        owner: string;
        fields: string;
        createdDate: string;
    };
    /**
     * Lookup135: pallet_orderbook::pallet::Error<T>
     **/
    PalletOrderbookError: {
        _enum: string[];
    };
    /**
     * Lookup136: pallet_wyvern_exchange_core::pallet::Error<T>
     **/
    PalletWyvernExchangeCoreError: {
        _enum: string[];
    };
    /**
     * Lookup138: pallet_contracts::wasm::PrefabWasmModule<T>
     **/
    PalletContractsWasmPrefabWasmModule: {
        instructionWeightsVersion: string;
        initial: string;
        maximum: string;
        code: string;
    };
    /**
     * Lookup140: pallet_contracts::wasm::OwnerInfo<T>
     **/
    PalletContractsWasmOwnerInfo: {
        owner: string;
        deposit: string;
        refcount: string;
    };
    /**
     * Lookup141: pallet_contracts::storage::RawContractInfo<primitive_types::H256, Balance>
     **/
    PalletContractsStorageRawContractInfo: {
        trieId: string;
        codeHash: string;
        storageDeposit: string;
    };
    /**
     * Lookup144: pallet_contracts::storage::DeletedContract
     **/
    PalletContractsStorageDeletedContract: {
        trieId: string;
    };
    /**
     * Lookup146: pallet_contracts::schedule::Schedule<T>
     **/
    PalletContractsSchedule: {
        limits: string;
        instructionWeights: string;
        hostFnWeights: string;
    };
    /**
     * Lookup147: pallet_contracts::schedule::Limits
     **/
    PalletContractsScheduleLimits: {
        eventTopics: string;
        stackHeight: string;
        globals: string;
        parameters: string;
        memoryPages: string;
        tableSize: string;
        brTableSize: string;
        subjectLen: string;
        callDepth: string;
        payloadLen: string;
    };
    /**
     * Lookup148: pallet_contracts::schedule::InstructionWeights<T>
     **/
    PalletContractsScheduleInstructionWeights: {
        _alias: {
            r_if: string;
        };
        version: string;
        i64const: string;
        i64load: string;
        i64store: string;
        select: string;
        r_if: string;
        br: string;
        brIf: string;
        brTable: string;
        brTablePerEntry: string;
        call: string;
        callIndirect: string;
        callIndirectPerParam: string;
        localGet: string;
        localSet: string;
        localTee: string;
        globalGet: string;
        globalSet: string;
        memoryCurrent: string;
        memoryGrow: string;
        i64clz: string;
        i64ctz: string;
        i64popcnt: string;
        i64eqz: string;
        i64extendsi32: string;
        i64extendui32: string;
        i32wrapi64: string;
        i64eq: string;
        i64ne: string;
        i64lts: string;
        i64ltu: string;
        i64gts: string;
        i64gtu: string;
        i64les: string;
        i64leu: string;
        i64ges: string;
        i64geu: string;
        i64add: string;
        i64sub: string;
        i64mul: string;
        i64divs: string;
        i64divu: string;
        i64rems: string;
        i64remu: string;
        i64and: string;
        i64or: string;
        i64xor: string;
        i64shl: string;
        i64shrs: string;
        i64shru: string;
        i64rotl: string;
        i64rotr: string;
    };
    /**
     * Lookup149: pallet_contracts::schedule::HostFnWeights<T>
     **/
    PalletContractsScheduleHostFnWeights: {
        _alias: {
            r_return: string;
        };
        caller: string;
        isContract: string;
        codeHash: string;
        ownCodeHash: string;
        callerIsOrigin: string;
        address: string;
        gasLeft: string;
        balance: string;
        valueTransferred: string;
        minimumBalance: string;
        blockNumber: string;
        now: string;
        weightToFee: string;
        gas: string;
        input: string;
        inputPerByte: string;
        r_return: string;
        returnPerByte: string;
        terminate: string;
        random: string;
        depositEvent: string;
        depositEventPerTopic: string;
        depositEventPerByte: string;
        debugMessage: string;
        setStorage: string;
        setStoragePerNewByte: string;
        setStoragePerOldByte: string;
        setCodeHash: string;
        clearStorage: string;
        clearStoragePerByte: string;
        containsStorage: string;
        containsStoragePerByte: string;
        getStorage: string;
        getStoragePerByte: string;
        takeStorage: string;
        takeStoragePerByte: string;
        transfer: string;
        call: string;
        delegateCall: string;
        callTransferSurcharge: string;
        callPerClonedByte: string;
        instantiate: string;
        instantiateTransferSurcharge: string;
        instantiatePerSaltByte: string;
        hashSha2256: string;
        hashSha2256PerByte: string;
        hashKeccak256: string;
        hashKeccak256PerByte: string;
        hashBlake2256: string;
        hashBlake2256PerByte: string;
        hashBlake2128: string;
        hashBlake2128PerByte: string;
        ecdsaRecover: string;
        ecdsaToEthAddress: string;
    };
    /**
     * Lookup150: pallet_contracts::pallet::Error<T>
     **/
    PalletContractsError: {
        _enum: string[];
    };
    /**
     * Lookup151: pallet_kitties::pallet::Kitty<T>
     **/
    PalletKittiesKitty: {
        dna: string;
        price: string;
        gender: string;
        owner: string;
    };
    /**
     * Lookup152: pallet_kitties::pallet::Gender
     **/
    PalletKittiesGender: {
        _enum: string[];
    };
    /**
     * Lookup155: pallet_kitties::pallet::Error<T>
     **/
    PalletKittiesError: {
        _enum: string[];
    };
    /**
     * Lookup157: sp_runtime::MultiSignature
     **/
    SpRuntimeMultiSignature: {
        _enum: {
            Ed25519: string;
            Sr25519: string;
            Ecdsa: string;
        };
    };
    /**
     * Lookup158: sp_core::sr25519::Signature
     **/
    SpCoreSr25519Signature: string;
    /**
     * Lookup159: sp_core::ecdsa::Signature
     **/
    SpCoreEcdsaSignature: string;
    /**
     * Lookup162: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
     **/
    FrameSystemExtensionsCheckNonZeroSender: string;
    /**
     * Lookup163: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
     **/
    FrameSystemExtensionsCheckSpecVersion: string;
    /**
     * Lookup164: frame_system::extensions::check_tx_version::CheckTxVersion<T>
     **/
    FrameSystemExtensionsCheckTxVersion: string;
    /**
     * Lookup165: frame_system::extensions::check_genesis::CheckGenesis<T>
     **/
    FrameSystemExtensionsCheckGenesis: string;
    /**
     * Lookup168: frame_system::extensions::check_nonce::CheckNonce<T>
     **/
    FrameSystemExtensionsCheckNonce: string;
    /**
     * Lookup169: frame_system::extensions::check_weight::CheckWeight<T>
     **/
    FrameSystemExtensionsCheckWeight: string;
    /**
     * Lookup170: pallet_transaction_payment::ChargeTransactionPayment<T>
     **/
    PalletTransactionPaymentChargeTransactionPayment: string;
    /**
     * Lookup171: contracts_node_runtime::Runtime
     **/
    ContractsNodeRuntimeRuntime: string;
};
export default _default;
