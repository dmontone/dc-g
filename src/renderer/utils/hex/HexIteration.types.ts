import { HexCoordinates } from './'

export type HexIterationCallback<T = void> = (hex: HexCoordinates, q: number, r: number) => T

export interface HexIterationParams {
  width: number
  height: number
  callback: HexIterationCallback
}
