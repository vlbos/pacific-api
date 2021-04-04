// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum } from '@polkadot/types';

/** @name FeeMethod */
export interface FeeMethod extends Enum {
  readonly isProtocolFee: boolean;
  readonly isSplitFee: boolean;
}

/** @name HowToCall */
export interface HowToCall extends Enum {
  readonly isCall: boolean;
  readonly isDelegateCall: boolean;
}

/** @name SaleKind */
export interface SaleKind extends Enum {
  readonly isFixedPrice: boolean;
  readonly isDutchAuction: boolean;
}

/** @name Side */
export interface Side extends Enum {
  readonly isBuy: boolean;
  readonly isSell: boolean;
}

export type PHANTOM_WYVERNEXCHANGECORE = 'wyvernExchangeCore';
