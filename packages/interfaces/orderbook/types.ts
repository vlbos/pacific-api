// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Option, Struct, Text, Vec, u64 } from '@polkadot/types-codec';
import type { AccountId, Moment } from '@polkadot/types/interfaces/runtime';

/** @name AssetQuery */
export interface AssetQuery extends Struct {
  readonly owner: Option<AccountId>;
  readonly asset_contract_address: Option<Bytes>;
  readonly token_ids: Option<Vec<TokenId>>;
  readonly search: Option<Bytes>;
  readonly order_by: Option<Bytes>;
  readonly order_direction: Option<Bytes>;
  readonly limit: Option<u64>;
  readonly offset: Option<u64>;
}

/** @name AssetQueryJSON */
export interface AssetQueryJSON extends Struct {
  readonly owner: Option<AccountId>;
  readonly asset_contract_address: Option<Text>;
  readonly token_ids: Option<Vec<Text>>;
  readonly search: Option<Text>;
  readonly order_by: Option<Text>;
  readonly order_direction: Option<Text>;
  readonly limit: Option<u64>;
  readonly offset: Option<u64>;
}

/** @name FieldName */
export interface FieldName extends Bytes {}

/** @name FieldValue */
export interface FieldValue extends Bytes {}

/** @name JSONField */
export interface JSONField extends Struct {
  readonly name: FieldName;
  readonly json: Option<Vec<OrderField>>;
}

/** @name JSONType */
export interface JSONType extends Struct {
  readonly fields: Option<Vec<OrderField>>;
  readonly jsons: Option<Vec<JSONField>>;
}

/** @name OrderField */
export interface OrderField extends Struct {
  readonly name: FieldName;
  readonly value: FieldValue;
}

/** @name OrderId */
export interface OrderId extends Bytes {}

/** @name OrderJSONType */
export interface OrderJSONType extends Struct {
  readonly index: u64;
  readonly id: OrderId;
  readonly owner: AccountId;
  readonly fields: Option<Vec<OrderField>>;
  readonly created_date: Moment;
}

/** @name OrderQuery */
export interface OrderQuery extends Struct {
  readonly limit: Option<u64>;
  readonly offset: Option<u64>;
  readonly owner: Option<AccountId>;
  readonly token_ids: Option<Vec<TokenId>>;
  readonly params: Option<Vec<OrderField>>;
}

/** @name OrderQueryJSON */
export interface OrderQueryJSON extends Struct {
  readonly limit: Option<u64>;
  readonly offset: Option<u64>;
  readonly owner: Option<AccountId>;
  readonly token_ids: Option<Vec<Text>>;
  readonly params: Option<Vec<QueryParameter>>;
}

/** @name QueryParameter */
export interface QueryParameter extends Struct {
  readonly name: Text;
  readonly value: Text;
}

/** @name TokenId */
export interface TokenId extends Bytes {}

export type PHANTOM_ORDERBOOK = 'orderbook';
