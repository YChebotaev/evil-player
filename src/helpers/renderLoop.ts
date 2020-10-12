import { RenderLoop } from '../typings'

export const createRenderLoop = (frameCallback_: Function): RenderLoop => {
  let frame: number
  let frameCallback: FrameRequestCallback

  frameCallback = () => {
    frameCallback_()
    frame = requestAnimationFrame(frameCallback)
  }

  return {
    resume () {
      frame = requestAnimationFrame(frameCallback)
      return this
    },
    pause () {
      cancelAnimationFrame(frame)
      return this
    }
  }
}
