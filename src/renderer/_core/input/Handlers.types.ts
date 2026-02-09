export type InputCallback<T> = (...args: T[]) => void

export type KeyHandler = (event: KeyboardEvent) => void
export type MouseHandler = (event: MouseEvent) => void
export type MouseMoveHandler = (event: MouseEvent & { target: HTMLElement }) => void
export type WheelHandler = (event: WheelEvent) => void

export type KeyHandlerFactory = (callback?: InputCallback<string>) => KeyHandler
export type MouseHandlerFactory = (callback?: InputCallback<number>) => MouseHandler
export type MouseMoveHandlerFactory = (callback?: InputCallback<[number, number]>) => MouseMoveHandler
export type WheelHandlerFactory = (callback?: InputCallback<number>) => WheelHandler
