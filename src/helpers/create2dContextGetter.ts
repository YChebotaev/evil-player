export const create2dContextGetter = () => {
  const cache: WeakMap<
    HTMLCanvasElement,
    CanvasRenderingContext2D
  > = new WeakMap()

  return (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
    const cachedCtx = cache.get(canvas)

    if (cachedCtx) return cachedCtx

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    cache.set(canvas, ctx)
    return ctx
  }
}
