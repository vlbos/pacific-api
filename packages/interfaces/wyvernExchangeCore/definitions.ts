/* eslint-disable @typescript-eslint/camelcase */

export default {
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
    },
  }
};
