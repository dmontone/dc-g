import { EventBinder } from './Binder'
import { createKeyHandler, createMouseHandler, createMouseMoveHandler, createWheelHandler } from './Handlers'
import type { Callback, RebindFactory, EventConfig } from './Manager.types'

export class Manager {
  private element: HTMLElement
  private binder = new EventBinder()
  private callbacks = new Map<string, Callback>()

  onKeyDown?: Callback
  onKeyUp?: Callback
  onMouseMove?: Callback
  onMouseDown?: Callback
  onMouseUp?: Callback
  onWheel?: Callback

  constructor(element: HTMLElement) {
    this.element = element
    this.setupFocus()
    this.setupEventListeners()
  }

  private setupFocus(): void {
    this.element.tabIndex = 0
    this.element.addEventListener('click', () => this.element.focus())
    setTimeout(() => this.element.focus(), 1)
  }

  private setupEventListeners(): void {
    const rebind: RebindFactory = (target, event, factory) => (cb) => (this.callbacks.set(event, cb), this.binder.bind(target, event, factory(cb)))

    const events: EventConfig[] = [
      { target: document, name: 'keydown', factory: createKeyHandler, propName: 'onKeyDown' },
      { target: document, name: 'keyup', factory: createKeyHandler, propName: 'onKeyUp' },
      { target: this.element, name: 'mousemove', factory: createMouseMoveHandler, propName: 'onMouseMove' },
      { target: this.element, name: 'mousedown', factory: createMouseHandler, propName: 'onMouseDown' },
      { target: this.element, name: 'mouseup', factory: createMouseHandler, propName: 'onMouseUp' },
      { target: this.element, name: 'wheel', factory: createWheelHandler, propName: 'onWheel' }
    ]

    events.forEach(({ target, name, factory }) => this.binder.bind(target, name, factory()))
    this.binder.bind(this.element, 'contextmenu', (e) => e.preventDefault())

    events.forEach(({ target, name, factory, propName }) =>
      Object.defineProperty(this, propName, {
        get: () => this.callbacks.get(name),
        set: rebind(target, name, factory)
      })
    )
  }

  public dispose(): void {
    this.binder.dispose(document, ['keydown', 'keyup'])
    this.binder.dispose(this.element)
  }
}
