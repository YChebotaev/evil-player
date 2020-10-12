import { RangeOpts, Range } from '../typings.d'

export const addRange = (
  video: HTMLVideoElement,
  { from, to, onEnter, onExit, onTimeupdate }: RangeOpts
): Range => {
  let isEntered = false
  let isExited = false

  const check = (): void => {
    const { currentTime } = video
    if (!isEntered && !isExited && currentTime >= from) {
      isEntered = true
      onEnter()
    } else if (isEntered && !isExited && currentTime >= to) {
      isExited = true
      onExit()
    }
  }

  const ontimeupdate = () => {
    if (!isExited) {
      check()
      if (isEntered) {
        onTimeupdate(to - video.currentTime)
      }
    } else {
      video.removeEventListener('timeupdate', ontimeupdate)
    }
  }

  video.addEventListener('timeupdate', ontimeupdate, {
    passive: true
  })

  return {
    remove () {
      video.removeEventListener('timeupdate', ontimeupdate)
      return this
    }
  }
}
