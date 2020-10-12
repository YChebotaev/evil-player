import { createFunctionHasher } from './createFunctionHasher'

import { RangeOpts } from '../typings.d'

const fnToHash = createFunctionHasher()

export const rangesToHash = (ranges: RangeOpts[]): number => {
  let hash = 0xffffff
  for (let range of ranges) {
    for (let val of Object.values(range) /* TODO: guarantee keys stability */) {
      if (typeof val === 'function') {
        hash ^= fnToHash(val as Function)
      } else if (typeof val === 'number' || val instanceof Number) {
        hash ^= val as number
      } else if (typeof val === 'string' || val instanceof String) {
        for (let i = 0; i < val.length; i++) {
          hash ^= val.charCodeAt(i)
        }
      } else {
        throw new Error(`Cannot hash "${val}" because of unknown type`)
      }
    }
  }
  return hash
}
