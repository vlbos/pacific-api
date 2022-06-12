// To help typescript find the type
// import { NetworkTokens } from '../types'

import { mainTokens } from './main/index'
import { devTokens } from './dev/index'

export const tokens = {
  dev: devTokens,
  main: mainTokens,
}
