export declare const schemas: {
    orderSchema: {
        id: string;
        properties: {
            exchange: {
                $ref: string;
            };
            maker: {
                $ref: string;
            };
            taker: {
                $ref: string;
            };
            makerRelayerFee: {
                $ref: string;
            };
            takerRelayerFee: {
                $ref: string;
            };
            makerProtocolFee: {
                $ref: string;
            };
            takerProtocolFee: {
                $ref: string;
            };
            feeRecipient: {
                $ref: string;
            };
            feeMethod: {
                $ref: string;
            };
            side: {
                $ref: string;
            };
            saleKind: {
                $ref: string;
            };
            target: {
                $ref: string;
            };
            howToCall: {
                $ref: string;
            };
            calldata: {
                type: string;
                pattern: string;
            };
            replacementPattern: {
                type: string;
                pattern: string;
            };
            staticTarget: {
                $ref: string;
            };
            staticExtradata: {
                type: string;
                pattern: string;
            };
            paymentToken: {
                $ref: string;
            };
            basePrice: {
                $ref: string;
            };
            extra: {
                $ref: string;
            };
            listingTime: {
                $ref: string;
            };
            expirationTime: {
                $ref: string;
            };
            salt: {
                $ref: string;
            };
        };
        required: string[];
        type: string;
    };
    signedOrderSchema: {
        id: string;
        allOf: ({
            $ref: string;
            properties?: undefined;
            required?: undefined;
        } | {
            properties: {
                ecSignature: {
                    $ref: string;
                };
            };
            required: string[];
            $ref?: undefined;
        })[];
    };
};
