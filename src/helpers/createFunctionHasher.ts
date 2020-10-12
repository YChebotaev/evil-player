export const createFunctionHasher = () => {
  const hashes: WeakMap<Function, number> = new WeakMap()
  let count = 1

  return (fn: Function): number => {
    let hash = hashes.get(fn)

    if (hash == null) {
      hash = count++
      hashes.set(fn, hash)
    }

    return hash
  }
}
