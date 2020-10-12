import * as React from 'react'
import {
  create2dContextGetter,
  rangesToHash,
  createRenderLoop,
  addRange,
  tryPlay
} from './helpers'

import { EvilPlayerProps, RenderLoop, Range } from './typings'

const get2dContext = create2dContextGetter()

export const EvilPlayer: React.FC<EvilPlayerProps> = ({
  src,
  poster,
  width,
  height,
  ranges: ranges_,
  playOnClick,
  ...props
}) => {
  const ref = React.useRef<HTMLCanvasElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const posterRef = React.useRef<HTMLImageElement>(null)

  const loop: RenderLoop = React.useMemo(() => {
    return createRenderLoop(() =>
      get2dContext(ref.current as HTMLCanvasElement).drawImage(
        videoRef.current as HTMLVideoElement,
        0,
        0,
        width,
        height
      )
    )
  }, [width, height])

  const handlePause = React.useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
      tryPlay(event.target as HTMLVideoElement)
    },
    []
  )

  const handleLoadPoster = React.useCallback(
    (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const canvas = ref.current
      const poster = event.target as HTMLImageElement
      get2dContext(canvas as HTMLCanvasElement).drawImage(
        poster,
        0,
        0,
        width,
        height
      )
    },
    [videoRef.current]
  )

  React.useLayoutEffect(() => {
    const video = videoRef.current
    const ranges: Range[] = []
    let onclick: (this: Document, ev: MouseEvent) => any

    for (let range_ of ranges_) {
      const range = addRange(video as HTMLVideoElement, range_)
      ranges.push(range)
    }

    if (playOnClick) {
      onclick = () => {
        tryPlay(video as HTMLVideoElement).then(loop.resume)
        document.removeEventListener('click', onclick)
      }

      document.addEventListener('click', onclick, { passive: true })
    }

    return () => {
      loop.pause()
      for (let range of ranges) {
        range.remove()
      }

      if (playOnClick) {
        document.removeEventListener('click', onclick)
      }
    }
  }, [src, poster, width, height, rangesToHash(ranges_)])

  return (
    <canvas ref={ref} width={width} height={height} {...props}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        width={width}
        height={height}
        controls={false}
        onPause={handlePause}
      />
      <img
        ref={posterRef}
        src={poster}
        width={width}
        alt=''
        height={height}
        onLoad={handleLoadPoster}
      />
    </canvas>
  )
}

export default EvilPlayer
