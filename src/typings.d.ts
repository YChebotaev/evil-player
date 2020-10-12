/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string
  const svgComponent: SvgrComponent
  export default svgUrl
  export { svgComponent as ReactComponent }
}

export interface RangeOpts {
  from: number
  to: number
  onEnter: Function
  onExit: Function
  onTimeupdate: Function
}

export interface EvilPlayerProps {
  src: string
  poster: string
  width: number
  height: number
  ranges: RangeOpts[]
}
export interface Range {
  remove(): Range
}

export interface RenderLoop {
  resume(): RenderLoop
  pause(): RenderLoop
}
