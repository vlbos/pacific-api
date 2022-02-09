
import {
  AnnotatedFunctionABI,
  Schema,
} from '../../../types'

export interface DevCustomType {
  name: string
  description: string
  thumbnail: string
  url: string
  transfer: AnnotatedFunctionABI
}

export const devCustomSchema: Schema<DevCustomType> = {
  version: 1,
  deploymentBlock: 0,
  name: 'DevCustom',
  description: 'Dev Custom (manual ABI specification)',
  thumbnail: 'https://d30y9cdsu7xlg0.cloudfront.net/png/45447-200.png',
  website: 'https://github.com/projectwyvern/wyvern-schemas',
  fields: [
    {name: 'Name', type: 'string', description: 'Name of Asset'},
    {name: 'Description', type: 'string', description: 'Description of Asset'},
    {name: 'Thumbnail', type: 'string', description: 'URL of asset thumbnail image'},
    {name: 'URL', type: 'string', description: 'URL of asset'},
    {name: 'Transfer', type: 'abi', description: 'ABI of transfer function'},
  ],
  assetFromFields: (fields: any) => ({
    name: fields.Name,
    description: fields.Description,
    thumbnail: fields.Thumbnail,
    url: fields.URL,
    transfer: fields.Transfer,
  }),
  formatter:
    async asset => {
      return {
        thumbnail: asset.thumbnail,
        title: asset.name,
        description: asset.description,
        url: asset.url,
        properties: [],
      }
  },
  functions: {
    transfer: asset => asset.transfer,
    assetsOfOwnerByIndex: [],
  },
  events: {
    transfer: [],
  },
  hash: a => JSON.stringify(a),
}
