// Copyright 2017-2021 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0

const config = require('@polkadot/dev/config/jest.cjs');

module.exports = {
  ...config,
  moduleNameMapper: {
    
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/api/build',
    '<rootDir>/packages/api-contract/build',
    '<rootDir>/packages/api-derive/build',
    '<rootDir>/packages/metadata/build',
    '<rootDir>/packages/rpc-core/build',
    '<rootDir>/packages/rpc-provider/build',
    '<rootDir>/packages/typegen/build',
    '<rootDir>/packages/types/build',
    '<rootDir>/packages/types-known/build'
  ],
  transformIgnorePatterns: ['/node_modules/(?!@polkadot|@babel/runtime/helpers/esm/)']
};
