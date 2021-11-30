import { AbiType } from 'web3'

import {
  ENSName,
  ENSNameBaseSchema,
  namehash,
  nodehash,
} from '../../../common/ens'
import {
  EventInputKind,
  FunctionInputKind,
  Schema,
  StateMutability,
} from '../../../types'

export const DEV_ENS_SHORT_NAME_AUCTION_ADDRESS =
  '0x76b6481a334783be36f2fc35b8f0b9bc7835d57b'

export const devENSShortNameAuctionSchema: Schema<ENSName> = {
  ...ENSNameBaseSchema,
  version: 0,
  deploymentBlock: 4791629,
  name: 'ENSShortNameAuction',
  description: 'ERC721 ENS short (3-6 character) names sold via auction.',
  thumbnail: '', // TODO: put SVG body directly here or host a PNG ourselves?
  website: 'https://ens.domains/',
  formatter: async ({ name }) => {
    return {
      title: 'ENS Short Name: ' + name,
      description: '',
      url: '',
      thumbnail: '',
      properties: [],
    }
  },
  functions: {
    transfer: ({ name }) => ({
      type: AbiType.Function,
      name: 'register',
      payable: false,
      constant: false,
      stateMutability: StateMutability.Nonpayable,
      target: DEV_ENS_SHORT_NAME_AUCTION_ADDRESS,
      inputs: [
        {
          kind: FunctionInputKind.Data,
          name: 'name',
          type: 'string',
          value: name.split('.')[0],
        },
        { kind: FunctionInputKind.Replaceable, name: 'owner', type: 'address' },
      ],
      outputs: [],
    }),
    assetsOfOwnerByIndex: [],
  },
  events: {
    transfer: [
      {
        type: AbiType.Event,
        name: 'NameRegistered',
        target: DEV_ENS_SHORT_NAME_AUCTION_ADDRESS,
        anonymous: false,
        inputs: [
          {
            kind: EventInputKind.Asset,
            indexed: false,
            name: 'name',
            type: 'string',
          },
          {
            kind: EventInputKind.Destination,
            indexed: false,
            name: 'owner',
            type: 'address',
          },
        ],
        assetFromInputs: async (inputs: { name: string }) => ({
          name: inputs.name,
          nodeHash: nodehash(inputs.name),
          nameHash: namehash(inputs.name),
        }),
      },
    ],
  },
}
