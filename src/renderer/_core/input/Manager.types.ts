export type Callback = (...args: any[]) => void

export type Rebinder = (callback: Callback) => void
export type RebindFactory = (target: EventTarget, event: string, factory: Function) => Rebinder

export type EventConfig = {
  target: EventTarget
  name: string
  factory: Function
  propName: string
}
