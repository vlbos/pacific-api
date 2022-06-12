"use strict";
/* eslint-disable @typescript-eslint/camelcase */
exports.__esModule = true;
exports["default"] = {
    types: {
        Side: {
            _enum: ["Buy", "Sell"]
        },
        SaleKind: {
            _enum: ["FixedPrice", "DutchAuction"]
        },
        FeeMethod: {
            _enum: ["ProtocolFee", "SplitFee"]
        },
        HowToCall: {
            _enum: ["Call", "DelegateCall"]
        }
    }
};
