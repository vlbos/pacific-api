export const WYVERN_TOKEN_TRANSFER_PROXY={
  "source": {
    "hash": "0x16cb97ca5b62f07067fb93781d245e0b175ed89a194d4aab7e9115074c25dd4b",
    "language": "ink! 3.0.0",
    "compiler": "rustc 1.62.0-nightly"
  },
  "contract": {
    "name": "wyvern_token_transfer_proxy",
    "version": "0.1.0",
    "authors": [
      "ShengLi vlbos2018@gmail.com"
    ]
  },
  "V3": {
    "spec": {
      "constructors": [
        {
          "args": [
            {
              "label": "registry",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "label": "new",
          "payable": false,
          "selector": "0x9bae9d5e"
        }
      ],
      "docs": [],
      "events": [],
      "messages": [
        {
          "args": [
            {
              "label": "token",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "label": "from",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "label": "to",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "label": "amount",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 3
              }
            }
          ],
          "docs": [
            " Call ERC20 `transferFrom`",
            "  Authenticated contract only",
            " token ERC20 token address",
            " from From address",
            " to To address",
            " amount Transfer amount"
          ],
          "label": "transfer_from",
          "mutates": true,
          "payable": false,
          "returnType": null,
          "selector": "0x0b396f18"
        }
      ]
    },
    "storage": {
      "struct": {
        "fields": [
          {
            "layout": {
              "cell": {
                "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "ty": 0
              }
            },
            "name": "registry"
          }
        ]
      }
    },
    "types": [
      {
        "id": 0,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 1,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_env",
            "types",
            "AccountId"
          ]
        }
      },
      {
        "id": 1,
        "type": {
          "def": {
            "array": {
              "len": 32,
              "type": 2
            }
          }
        }
      },
      {
        "id": 2,
        "type": {
          "def": {
            "primitive": "u8"
          }
        }
      },
      {
        "id": 3,
        "type": {
          "def": {
            "primitive": "u128"
          }
        }
      }
    ]
  }
}