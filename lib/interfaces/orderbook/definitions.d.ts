declare const _default: {
    types: {
        OrderId: string;
        TokenId: string;
        FieldName: string;
        FieldValue: string;
        OrderField: {
            name: string;
            value: string;
        };
        JSONField: {
            name: string;
            json: string;
        };
        OrderJSONType: {
            index: string;
            id: string;
            owner: string;
            fields: string;
            created_date: string;
        };
        OrderQuery: {
            limit: string;
            offset: string;
            owner: string;
            token_ids: string;
            params: string;
        };
        AssetQuery: {
            owner: string;
            asset_contract_address: string;
            token_ids: string;
            search: string;
            order_by: string;
            order_direction: string;
            limit: string;
            offset: string;
        };
        QueryParameter: {
            name: string;
            value: string;
        };
        OrderQueryJSON: {
            limit: string;
            offset: string;
            owner: string;
            token_ids: string;
            params: string;
        };
        AssetQueryJSON: {
            owner: string;
            asset_contract_address: string;
            token_ids: string;
            search: string;
            order_by: string;
            order_direction: string;
            limit: string;
            offset: string;
        };
        JSONType: {
            fields: string;
            jsons: string;
        };
    };
};
export default _default;
