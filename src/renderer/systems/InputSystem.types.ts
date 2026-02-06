import { KeyboardState, MouseCoord, MouseDelta, MouseButtons, MouseWheel } from '@/components/input'

export type InputQueryName = 'keyboardState' | 'mouseCoord' | 'mouseDelta' | 'mouseButtons' | 'mouseWheel'

export type InputComponentType<T extends InputQueryName> = 
  T extends 'keyboardState' ? KeyboardState :
  T extends 'mouseCoord' ? MouseCoord :
  T extends 'mouseDelta' ? MouseDelta :
  T extends 'mouseButtons' ? MouseButtons :
  T extends 'mouseWheel' ? MouseWheel : never

export const InputComponentClass = {
  keyboardState: KeyboardState,
  mouseCoord: MouseCoord,
  mouseDelta: MouseDelta,
  mouseButtons: MouseButtons,
  mouseWheel: MouseWheel
} as const

export type ComponentConstructor = typeof KeyboardState | typeof MouseCoord | typeof MouseDelta | typeof MouseButtons | typeof MouseWheel
