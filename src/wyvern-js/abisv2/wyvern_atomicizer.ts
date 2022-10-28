export const WYVERN_ATOMICIZER={
  "source": {
    "hash": "0x9f5e37707264c892198a7f5da6c0ca3037d3b2fbd0b92d3a8250d3d1be50f559",
    "language": "ink! 3.0.0",
    "compiler": "rustc 1.62.0-nightly"
  },
  "contract": {
    "name": "wyvern_atomicizer",
    "version": "3.0.0",
    "authors": [
      "Parity Technologies <admin@parity.io>"
    ]
  },
  "V3": {
    "spec": {
      "constructors": [
        {
          "args": [],
          "docs": [
            "The only constructor of the contract.",
            "",
            "A list of owners must be supplied and a number of how many of them must",
            "confirm a transaction. Duplicate owners are silently dropped.",
            "",
            "# Panics",
            "",
            "If `requirement` violates our invariant."
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
              "docs": [
                " The transaction that was confirmed."
              ],
              "indexed": true,
              "label": "selector",
              "type": {
                "displayName": [],
                "type": 0
              }
            },
            {
              "docs": [
                " The owner that sent the confirmation."
              ],
              "indexed": true,
              "label": "from",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 3
              }
            },
            {
              "docs": [
                " The confirmation status after this confirmation was applied."
              ],
              "indexed": true,
              "label": "to",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 3
              }
            }
          ],
          "docs": [
            " Emitted when an owner confirms a transaction."
          ],
          "label": "Confirmation"
        },
        {
          "args": [
            {
              "docs": [
                " The transaction that was executed."
              ],
              "indexed": true,
              "label": "callee",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 3
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            },
            {
              "docs": [
                " Indicates whether the transaction executed successfully. If so the `Ok` value holds",
                " the output in Vec<u8>. The Option is `None` when the transaction was executed through",
                " `invoke_transaction` rather than `evaluate_transaction`."
              ],
              "indexed": true,
              "label": "result",
              "type": {
                "displayName": [
                  "Result"
                ],
                "type": 10
              }
            }
          ],
          "docs": [
            " Emitted when a transaction was executed."
          ],
          "label": "Execution"
        }
      ],
      "messages": [
        {
          "args": [
            {
              "label": "selector",
              "type": {
                "displayName": [],
                "type": 0
              }
            },
            {
              "label": "callees",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 2
              }
            },
            {
              "label": "from",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 3
              }
            },
            {
              "label": "to",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 3
              }
            },
            {
              "label": "values",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 5
              }
            }
          ],
          "docs": [
            " Evaluate a confirmed execution and return its output as Vec<u8>.",
            "",
            " Its return value indicates whether the called transaction was successful and contains",
            " its output when successful.",
            " This can be called by anyone."
          ],
          "label": "atomicize",
          "mutates": true,
          "payable": true,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 7
          },
          "selector": "0x54cd9641"
        },
        {
          "args": [
            {
              "label": "selector",
              "type": {
                "displayName": [],
                "type": 0
              }
            },
            {
              "label": "callees",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 2
              }
            },
            {
              "label": "from",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 3
              }
            },
            {
              "label": "to",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 3
              }
            },
            {
              "label": "values",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 5
              }
            }
          ],
          "docs": [
            " Evaluate a confirmed execution and return its output as Vec<u8>.",
            "",
            " Its return value indicates whether the called transaction was successful and contains",
            " its output when successful.",
            " This can be called by anyone."
          ],
          "label": "eval_atomicize",
          "mutates": true,
          "payable": true,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 7
          },
          "selector": "0x464b7479"
        }
      ]
    },
    "storage": {
      "struct": {
        "fields": []
      }
    },
    "types": [
      {
        "id": 0,
        "type": {
          "def": {
            "array": {
              "len": 4,
              "type": 1
            }
          }
        }
      },
      {
        "id": 1,
        "type": {
          "def": {
            "primitive": "u8"
          }
        }
      },
      {
        "id": 2,
        "type": {
          "def": {
            "sequence": {
              "type": 3
            }
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
                  "type": 4,
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
            "array": {
              "len": 32,
              "type": 1
            }
          }
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "sequence": {
              "type": 6
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
      },
      {
        "id": 7,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 8
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 8
            },
            {
              "name": "E",
              "type": 9
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 8,
        "type": {
          "def": {
            "tuple": []
          }
        }
      },
      {
        "id": 9,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "TransactionFailed"
                }
              ]
            }
          },
          "path": [
            "wyvern_atomicizer",
            "wyvern_atomicizer",
            "Error"
          ]
        }
      },
      {
        "id": 10,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 11
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 11
            },
            {
              "name": "E",
              "type": 9
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 11,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 12
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 12
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 12,
        "type": {
          "def": {
            "sequence": {
              "type": 1
            }
          }
        }
      }
    ]
  }
}