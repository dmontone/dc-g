import type { KeyHandlerFactory, MouseHandlerFactory, MouseMoveHandlerFactory, WheelHandlerFactory } from './'

export const createKeyHandler: KeyHandlerFactory = cb => e => (e.preventDefault(), cb?.(e.code))

export const createMouseHandler: MouseHandlerFactory = cb => e => (e.preventDefault(), cb?.(e.button))
export const createMouseMoveHandler: MouseMoveHandlerFactory = cb => ({ target, clientX, clientY }) => 
  (cb?.([clientX - target.getBoundingClientRect().left, clientY - target.getBoundingClientRect().top]))
export const createWheelHandler: WheelHandlerFactory = cb => e => (e.preventDefault(), cb?.(e.deltaY))
