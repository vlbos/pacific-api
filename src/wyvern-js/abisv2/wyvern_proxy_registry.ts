export const WYVERN_PROXY_REGISTRY={
  "source": {
    "hash": "0x59afc95bb950ffd434ed66fbd74e7651126e48bdc7c219ad3af9a28bf47d5fcf",
    "language": "ink! 3.0.0",
    "compiler": "rustc 1.62.0-nightly"
  },
  "contract": {
    "name": "wyvern_proxy_registry",
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
            "Instantiate a `delegator` contract with the given sub-contract codes."
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
              "label": "previous_owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "new_owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [],
          "label": "OwnershipTransferred"
        }
      ],
      "messages": [
        {
          "args": [
            {
              "label": "auth_address",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " Grant authentication to the initial Exchange protocol contract",
            "dev No delay, can only be called once - after that the standard registry process with a delay must be used",
            "param auth_address :AccountId of the contract to grant authentication"
          ],
          "label": "grant_initial_authentication",
          "mutates": true,
          "payable": false,
          "returnType": null,
          "selector": "0xd320faff"
        },
        {
          "args": [
            {
              "label": "auth_address",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [],
          "label": "contracts_contains",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "bool"
            ],
            "type": 0
          },
          "selector": "0x8005a470"
        },
        {
          "args": [
            {
              "label": "auth_address",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [],
          "label": "pending_contains",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "u64"
            ],
            "type": 7
          },
          "selector": "0xec185329"
        },
        {
          "args": [
            {
              "label": "auth_address",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [],
          "label": "get_proxy",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "AccountId"
            ],
            "type": 1
          },
          "selector": "0x36d30035"
        },
        {
          "args": [
            {
              "label": "addr",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " Start the process to enable access for specified contract. Subject to delay period.",
            "dev ProxyRegistry owner only",
            "param addr to :AccountId which to grant permissions"
          ],
          "label": "start_grant_authentication",
          "mutates": true,
          "payable": false,
          "returnType": null,
          "selector": "0xf7aeeeac"
        },
        {
          "args": [
            {
              "label": "addr",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " End the process to able access for specified contract after delay period has passed.",
            "dev ProxyRegistry owner only",
            "param addr to :AccountId which to grant permissions"
          ],
          "label": "end_grant_authentication",
          "mutates": true,
          "payable": false,
          "returnType": null,
          "selector": "0xe1209dc9"
        },
        {
          "args": [
            {
              "label": "addr",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " Revoke access for specified contract. Can be done instantly.",
            "dev ProxyRegistry owner only",
            "param addr of :AccountId which to revoke permissions"
          ],
          "label": "revoke_authentication",
          "mutates": true,
          "payable": false,
          "returnType": null,
          "selector": "0x7b311892"
        },
        {
          "args": [
            {
              "label": "ownable_delegate_proxy_address",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " Register a proxy contract with this registry",
            "dev Must be called by the user which the proxy is for, creates a new AuthenticatedProxy",
            "return New AuthenticatedProxy contract"
          ],
          "label": "register_proxy",
          "mutates": true,
          "payable": false,
          "returnType": null,
          "selector": "0x356abada"
        },
        {
          "args": [],
          "docs": [
            "dev Initializes the contract setting the deployer as the initial owner.",
            "dev Returns the of :AccountId the current owner."
          ],
          "label": "owner",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "AccountId"
            ],
            "type": 1
          },
          "selector": "0xfeaea4fa"
        },
        {
          "args": [],
          "docs": [
            "dev Leaves the contract without owner. It will not be possible to call",
            " `onlyOwner` functions anymore. Can only be called by the current owner.",
            "",
            " NOTE: Renouncing ownership will leave the contract without an owner,",
            " thereby removing any functionality that is only available to the owner."
          ],
          "label": "renounce_ownership",
          "mutates": true,
          "payable": false,
          "returnType": null,
          "selector": "0x8c90065b"
        },
        {
          "args": [
            {
              "label": "new_owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            "dev Transfers ownership of the contract to a new account (`new_owner`).",
            " Can only be called by the current owner."
          ],
          "label": "transfer_ownership",
          "mutates": true,
          "payable": false,
          "returnType": null,
          "selector": "0x107e33ea"
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
            "name": "initial_address_set"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                "ty": 1
              }
            },
            "name": "_owner"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                "ty": 4
              }
            },
            "name": "proxies"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0300000000000000000000000000000000000000000000000000000000000000",
                "ty": 6
              }
            },
            "name": "pending"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0400000000000000000000000000000000000000000000000000000000000000",
                "ty": 8
              }
            },
            "name": "contracts"
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
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 1
            },
            {
              "name": "V",
              "type": 1
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 5,
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
            "ink_primitives",
            "Key"
          ]
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 1
            },
            {
              "name": "V",
              "type": 7
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 7,
        "type": {
          "def": {
            "primitive": "u64"
          }
        }
      },
      {
        "id": 8,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 1
            },
            {
              "name": "V",
              "type": 0
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      }
    ]
  }
}