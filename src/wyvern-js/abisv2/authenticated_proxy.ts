export const AUTHENTICATED_PROXY={
  "source": {
    "hash": "0xd5f768bbb70d4afc86b404fd767f01a64e4d0ab7f2bd6cd400895adbe79491c2",
    "language": "ink! 3.0.0",
    "compiler": "rustc 1.62.0-nightly"
  },
  "contract": {
    "name": "authenticated_proxy",
    "version": "0.1.0",
    "authors": [
      "ShengLi vlbos2018@gmail.com"
    ]
  },
  "V3": {
    "spec": {
      "constructors": [
        {
          "args": [],
          "docs": [
            "Constructor that initializes the `bool` value to the given `init_value`."
          ],
          "label": "new",
          "payable": false,
          "selector": "0x9bae9d5e"
        }
      ],
      "docs": [],
      "events": [
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "sender",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "amount",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            }
          ],
          "docs": [],
          "label": "ReceivedNativeToken"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "from",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "token",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "extra_data",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 5
              }
            }
          ],
          "docs": [],
          "label": "ReceivedTokens"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "revoked",
              "type": {
                "displayName": [
                  "bool"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " Event fired when the proxy access is revoked or unrevoked."
          ],
          "label": "Revoked"
        }
      ],
      "messages": [
        {
          "args": [
            {
              "label": "addr_user",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "label": "addr_registry",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            "Initialize an AuthenticatedProxy",
            "@param addr_user of :AccountId user on whose behalf this proxy will act",
            "@param addr_registry of :AccountId ProxyRegistry contract which will manage this proxy"
          ],
          "label": "initialize",
          "mutates": true,
          "payable": false,
          "returnType": null,
          "selector": "0xf2f6dba3"
        },
        {
          "args": [
            {
              "label": "revoke",
              "type": {
                "displayName": [
                  "bool"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            "Set the revoked flag (allows a user to revoke ProxyRegistry access)",
            "@dev Can be called by the user only",
            "@param revoke Whether or not to revoke access"
          ],
          "label": "set_revoke",
          "mutates": true,
          "payable": false,
          "returnType": null,
          "selector": "0x2b71ec11"
        },
        {
          "args": [
            {
              "label": "dest",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "label": "_how_to_call",
              "type": {
                "displayName": [
                  "HowToCall"
                ],
                "type": 4
              }
            },
            {
              "label": "calldata",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 5
              }
            }
          ],
          "docs": [
            "Execute a message call from the proxy contract",
            "@dev Can be called by the user, or by a contract authorized by the registry as long as the user has not revoked access",
            "@param dest to :AccountId which the call will be sent",
            "@param how_to_call Which kind of call to make",
            "@param calldata Calldata to send",
            "@return Result of the call (success or failure)"
          ],
          "label": "proxy",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "bool"
            ],
            "type": 0
          },
          "selector": "0xe948e7b4"
        },
        {
          "args": [
            {
              "label": "dest",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "label": "how_to_call",
              "type": {
                "displayName": [
                  "HowToCall"
                ],
                "type": 4
              }
            },
            {
              "label": "calldata",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 5
              }
            }
          ],
          "docs": [
            "Execute a message call and assert success",
            "",
            "@dev Same functionality as `proxy`, just asserts the return value",
            "@param dest to :AccountId which the call will be sent",
            "@param how_to_call What kind of call to make",
            "@param calldata Calldata to send"
          ],
          "label": "proxy_assert",
          "mutates": true,
          "payable": false,
          "returnType": null,
          "selector": "0xba6b4e9c"
        },
        {
          "args": [],
          "docs": [],
          "label": "contract_address",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "AccountId"
            ],
            "type": 1
          },
          "selector": "0x09c19fa9"
        },
        {
          "args": [
            {
              "label": "from",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "label": "value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            },
            {
              "label": "token",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "label": "extra_data",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 5
              }
            }
          ],
          "docs": [
            "@dev Receive tokens and generate a log event",
            "@param from from :AccountId which to transfer tokens",
            "@param value Amount of tokens to transfer",
            "@param token of :AccountId token",
            "@param extra_data Additional data to log"
          ],
          "label": "receive_approval",
          "mutates": true,
          "payable": false,
          "returnType": null,
          "selector": "0x81c867f1"
        },
        {
          "args": [],
          "docs": [
            "@dev Receive Ether and generate a log event",
            " Asserts that the token amount sent as payment with this call",
            " is exactly `10`. This method will fail otherwise, and the",
            " transaction would then be reverted.",
            "",
            " # Note",
            "",
            " The method needs to be annotated with `payable`; only then it is",
            " allowed to receive value as part of the call."
          ],
          "label": "receive_native_token",
          "mutates": false,
          "payable": true,
          "returnType": null,
          "selector": "0x8287e207"
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
            "name": "initialized"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                "ty": 1
              }
            },
            "name": "user"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                "ty": 1
              }
            },
            "name": "registry"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0300000000000000000000000000000000000000000000000000000000000000",
                "ty": 0
              }
            },
            "name": "revoked"
          }
        ]
      }
    },
    "types": [
      {
        "id": 0,
        "type": {
          "def": {
            "primitive": "bool"
          }
        }
      },
      {
        "id": 1,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 2,
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
        "id": 2,
        "type": {
          "def": {
            "array": {
              "len": 32,
              "type": 3
            }
          }
        }
      },
      {
        "id": 3,
        "type": {
          "def": {
            "primitive": "u8"
          }
        }
      },
      {
        "id": 4,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "Call"
                },
                {
                  "index": 1,
                  "name": "DelegateCall"
                }
              ]
            }
          },
          "path": [
            "authenticated_proxy",
            "authenticated_proxy",
            "HowToCall"
          ]
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "sequence": {
              "type": 3
            }
          }
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "primitive": "u128"
          }
        }
      }
    ]
  }
}