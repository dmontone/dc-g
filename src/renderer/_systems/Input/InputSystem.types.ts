import { KeyboardState, MouseCoord, MouseDelta, MouseButtons } from '@/components/input'

export type InputQueryName = 'keyboardState' | 'mouseCoord' | 'mouseDelta' | 'mouseButtons'

export type InputComponentType<T extends InputQueryName> = 
  T extends 'keyboardState' ? KeyboardState :
  T extends 'mouseCoord' ? MouseCoord :
  T extends 'mouseDelta' ? MouseDelta :
  T extends 'mouseButtons' ? MouseButtons : never

export const InputComponentClass = {
  keyboardState: KeyboardState,
  mouseCoord: MouseCoord,
  mouseDelta: MouseDelta,
  mouseButtons: MouseButtons
} as const

export type ComponentConstructor = typeof KeyboardState | typeof MouseCoord | typeof MouseDelta | typeof MouseButtons
