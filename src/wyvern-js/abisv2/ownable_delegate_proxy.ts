export const OWNABLE_DELEGATE_PROXY={
  "source": {
    "hash": "0xade3812dbbfef16589b85e8ee825d7b3ecf516ad258b8383958034c0edb03f31",
    "language": "ink! 3.0.0",
    "compiler": "rustc 1.62.0-nightly"
  },
  "contract": {
    "name": "ownable_delegate_proxy",
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
              "label": "_owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 3
              }
            },
            {
              "label": "_initial_implementation",
              "type": {
                "displayName": [
                  "Hash"
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
      "events": [
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "previous_owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 3
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "new_owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 3
              }
            }
          ],
          "docs": [
            "dev Event to show ownership has been transferred",
            "param previousOwner representing the of :AccountId the previous owner",
            "param new_owner representing the of :AccountId the new owner"
          ],
          "label": "ProxyOwnershipTransferred"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "implementation",
              "type": {
                "displayName": [
                  "Hash"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            "dev This event will be emitted every time the implementation gets upgraded",
            "param implementation representing the of :AccountId the upgraded implementation"
          ],
          "label": "Upgraded"
        }
      ],
      "messages": [
        {
          "args": [
            {
              "label": "new_code_hash",
              "type": {
                "displayName": [
                  "Hash"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " Changes the `Hash` of the contract where any call that does",
            " not match a selector of this contract is delegated to."
          ],
          "label": "change_delegate_code",
          "mutates": true,
          "payable": false,
          "returnType": null,
          "selector": "0xb71d5c5c"
        },
        {
          "args": [],
          "docs": [
            " Fallback message for a contract call that doesn't match any",
            " of the other message selectors. Proxy contract delegates the execution",
            " of that message to the `_implementation` contract with all input data.",
            "",
            " # Note:",
            "",
            " - We allow payable messages here and would forward any optionally supplied",
            "   value as well.",
            " - If the self receiver were `forward(&mut self)` here, this would not",
            "   have any effect whatsoever on the contract we forward to."
          ],
          "label": "forward",
          "mutates": false,
          "payable": true,
          "returnType": {
            "displayName": [
              "u32"
            ],
            "type": 4
          },
          "selector": "0x45753c2b"
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
            "type": 3
          },
          "selector": "0x09c19fa9"
        },
        {
          "args": [],
          "docs": [
            "dev Tells the of :AccountId the owner",
            "return the of :AccountId the owner"
          ],
          "label": "upgradeability_owner",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "AccountId"
            ],
            "type": 3
          },
          "selector": "0x34967f24"
        },
        {
          "args": [],
          "docs": [
            "dev Throws if called by any account other than the owner.",
            "dev Tells the of :AccountId the current implementation",
            "return of :AccountId the current implementation"
          ],
          "label": "implementation",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Hash"
            ],
            "type": 0
          },
          "selector": "0x1163d1cf"
        },
        {
          "args": [],
          "docs": [
            "dev Tells the proxy type (EIP 897)",
            "return Proxy type, 2 for forwarding proxy"
          ],
          "label": "proxy_type",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "u32"
            ],
            "type": 4
          },
          "selector": "0x881ec52f"
        },
        {
          "args": [],
          "docs": [
            "dev Tells the of :AccountId the current implementation",
            "return of :AccountId the current implementation",
            "dev Tells the of :AccountId the proxy owner",
            "return the of :AccountId the proxy owner"
          ],
          "label": "proxy_owner",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "AccountId"
            ],
            "type": 3
          },
          "selector": "0x29694734"
        },
        {
          "args": [
            {
              "label": "new_owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 3
              }
            }
          ],
          "docs": [
            "dev Allows the current owner to transfer control of the contract to a new_owner.",
            "param new_owner The to :AccountId transfer ownership to."
          ],
          "label": "transfer_proxy_ownership",
          "mutates": true,
          "payable": false,
          "returnType": null,
          "selector": "0xf70ff7f7"
        },
        {
          "args": [
            {
              "label": "implementation",
              "type": {
                "displayName": [
                  "Hash"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            "dev Allows the upgradeability owner to upgrade the current implementation of the proxy.",
            "param implementation representing the of :AccountId the new implementation to be set."
          ],
          "label": "upgrade_to",
          "mutates": true,
          "payable": false,
          "returnType": null,
          "selector": "0x475298d8"
        },
        {
          "args": [
            {
              "label": "implementation",
              "type": {
                "displayName": [
                  "Hash"
                ],
                "type": 0
              }
            },
            {
              "label": "data",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 5
              }
            }
          ],
          "docs": [
            "dev Allows the upgradeability owner to upgrade the current implementation of the proxy",
            "and delegatecall the new implementation for initialization.",
            "param implementation representing the of :AccountId the new implementation to be set.",
            "param data represents the msg.data to bet sent in the low level call. This parameter may include the fn",
            "signature of the implementation to be called with the needed payload"
          ],
          "label": "upgrade_to_and_call",
          "mutates": true,
          "payable": true,
          "returnType": null,
          "selector": "0x3576dfba"
        }
      ]
    },
    "storage": {
      "struct": {
        "fields": [
          {
            "layout": {
              "struct": {
                "fields": [
                  {
                    "layout": {
                      "cell": {
                        "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                        "ty": 0
                      }
                    },
                    "name": "_implementation"
                  },
                  {
                    "layout": {
                      "cell": {
                        "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                        "ty": 3
                      }
                    },
                    "name": "_upgradeability_owner"
                  }
                ]
              }
            },
            "name": "proxy"
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
            "Hash"
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
        "id": 4,
        "type": {
          "def": {
            "primitive": "u32"
          }
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "sequence": {
              "type": 2
            }
          }
        }
      }
    ]
  }
}