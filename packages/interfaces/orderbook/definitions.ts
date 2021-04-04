/* eslint-disable @typescript-eslint/camelcase */

export default {
 rpc: {
      getOrder: {
        description: "Get an order from the orderbook, throwing if none is found.",
        params: [
          {
            name: "order_query",
            type: "Option<OrderQueryJSON<AccountId>>"
          }
        ],
        type: "Option<OrderJSONType<AccountId, Moment>>"
      },
      getOrders: {
        description: " Get a list of orders from the orderbook, returning the page of orders",
        params: [
          {
            name: "order_query",
            type: "Option<OrderQueryJSON<AccountId>>"
          },
          {
            name: "page",
            type: "Option<u64>"
          }
        ],
        type: "Option<Vec<OrderJSONType<AccountId, Moment>>>"
      },
      getAsset: {
        description: "Fetch an asset from the API, throwing if none is found",
        params: [
          {
            name: "token_address",
            type: "String"
          },
          {
            name: "token_id",
            type: "String"
          }
        ],
        type: "Option<JSONType>"
      },
      getAssets: {
        description: "Fetch list of assets from the API, returning the page of assets and the count of total assets",
        params: [
          {
            name: "asset_query",
            type: "Option<AssetQueryJSON<AccountId>>"
          },
          {
            name: "page",
            type: "Option<u64>"
          }
        ],
        type: "Option<Vec<JSONType>>"
      }
    },
     types: {
        OrderId: "Vec<u8>",
        TokenId: "Vec<u8>",
        FieldName: "Vec<u8>",
        FieldValue: "Vec<u8>",
        OrderField: {
            name: "FieldName",
            value: "FieldValue"
        },
        JSONField: {
            name: "FieldName",
            json: "Option<Vec<OrderField>>"
        },
        OrderJSONType: {
            index: "u64",
            id: "OrderId",
            owner: "AccountId",
            fields: "Option<Vec<OrderField>>",
            created_date: "Moment"
        },
        OrderQuery: {
            limit: "Option<u64>",
            offset: "Option<u64>",
            owner: "Option<AccountId>",
            token_ids: "Option<Vec<TokenId>>",
            params: "Option<Vec<OrderField>>"
        },
        AssetQuery: {
            owner: "Option<AccountId>",
            asset_contract_address: "Option<Vec<u8>>",
            token_ids: "Option<Vec<TokenId>>",
            search: "Option<Vec<u8>>",
            order_by: "Option<Vec<u8>>",
            order_direction: "Option<Vec<u8>>",
            limit: "Option<u64>",
            offset: "Option<u64>"
        },
        QueryParameter: {
            name: "String",
            value: "String"
        },
        OrderQueryJSON: {
            limit: "Option<u64>",
            offset: "Option<u64>",
            owner: "Option<AccountId>",
            token_ids: "Option<Vec<String>>",
            params: "Option<Vec<QueryParameter>>"
        },
        AssetQueryJSON: {
            owner: "Option<AccountId>",
            asset_contract_address: "Option<String>",
            token_ids: "Option<Vec<String>>",
            search: "Option<String>",
            order_by: "Option<String>",
            order_direction: "Option<String>",
            limit: "Option<u64>",
            offset: "Option<u64>"
        },
        JSONType: {
            fields: "Option<Vec<OrderField>>",
            jsons: "Option<Vec<JSONField>>"
        }
    }
};
