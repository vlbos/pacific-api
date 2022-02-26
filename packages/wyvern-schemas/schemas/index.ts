// To help typescript find the type
// import { Schema } from '../types'

import { mainSchemas } from './main/index'
import { devSchemas } from './dev/index';

export const schemas = {
  dev: devSchemas,
  main: mainSchemas,
}
