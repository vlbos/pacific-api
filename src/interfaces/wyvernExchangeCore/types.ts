// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum } from '@polkadot/types-codec';

/** @name FeeMethod */
export interface FeeMethod extends Enum {
  readonly isProtocolFee: boolean;
  readonly isSplitFee: boolean;
  readonly type: 'ProtocolFee' | 'SplitFee';
}

/** @name HowToCall */
export interface HowToCall extends Enum {
  readonly isCall: boolean;
  readonly isDelegateCall: boolean;
  readonly type: 'Call' | 'DelegateCall';
}

/** @name SaleKind */
export interface SaleKind extends Enum {
  readonly isFixedPrice: boolean;
  readonly isDutchAuction: boolean;
  readonly type: 'FixedPrice' | 'DutchAuction';
}

/** @name Side */
export interface Side extends Enum {
  readonly isBuy: boolean;
  readonly isSell: boolean;
  readonly type: 'Buy' | 'Sell';
}

export type PHANTOM_WYVERNEXCHANGECORE = 'wyvernExchangeCore';
