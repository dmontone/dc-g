import { System, World } from 'ecsy'
import { Manager } from '@/core/input'
import { KeyboardState, MouseCoord, MouseDelta, MouseButtons, MouseWheel } from '@/components/input'
import type { InputQueryName, InputComponentType } from './InputSystem.types'
import { InputComponentClass } from './InputSystem.types'

export class InputSystem extends System {
  private inputManager: Manager
  private previousMouseX = 0
  private previousMouseY = 0

  constructor(world: World) {
    super(world)
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    if (!canvas) throw new Error('Canvas element not found for InputSystem')

    this.inputManager = new Manager(canvas)
    this.setupInputCallbacks()
  }

  private setupInputCallbacks(): void {
    this.inputManager.onKeyDown = key => {
      const keyboardState = this.getKeyboardState()
      if (!keyboardState.keys?.get(key)) (keyboardState.keys.set(key, true), keyboardState.justPressed?.add(key))
    }

    this.inputManager.onKeyUp = key => {
      const keyboardState = this.getKeyboardState()
      keyboardState.keys?.set(key, false)
      keyboardState.justReleased?.add(key)
    }

    this.inputManager.onMouseMove = ([x, y]) => {
      const mouseCoord = this.getMouseCoord()
      const mouseDelta = this.getMouseDelta()
      if (!mouseCoord || !mouseDelta) return

      mouseDelta.x = x - this.previousMouseX
      mouseDelta.y = y - this.previousMouseY
      mouseCoord.x = x
      mouseCoord.y = y
      this.previousMouseX = x
      this.previousMouseY = y
    }

    this.inputManager.onMouseDown = button => {
      const mouseButtons = this.getMouseButtons()
      mouseButtons?.buttons && !mouseButtons.buttons.get(button) && 
        (mouseButtons.buttons.set(button, true), mouseButtons.justPressed?.add(button))
    }

    this.inputManager.onMouseUp = button => {
      const mouseButtons = this.getMouseButtons()
      mouseButtons?.buttons && 
        (mouseButtons.buttons.set(button, false), mouseButtons.justReleased?.add(button))
    }

    this.inputManager.onWheel = (delta) => {
      this.getMouseWheel() && (this.getMouseWheel()!.delta = delta)
    }
  }

  private getInputComponent<T extends InputQueryName>(queryName: T): InputComponentType<T> | null {
    const query = this.queries[queryName as keyof typeof this.queries]
    const componentClass = InputComponentClass[queryName]
    return query.results[0]?.getMutableComponent(componentClass as any) as InputComponentType<T> ?? null
  }

  private getKeyboardState(): KeyboardState | null {
    return this.getInputComponent('keyboardState')
  }

  private getMouseCoord(): MouseCoord | null {
    return this.getInputComponent('mouseCoord')
  }

  private getMouseDelta(): MouseDelta | null {
    return this.getInputComponent('mouseDelta')
  }

  private getMouseButtons(): MouseButtons | null {
    return this.getInputComponent('mouseButtons')
  }

  private getMouseWheel(): MouseWheel | null {
    return this.getInputComponent('mouseWheel')
  }

  execute(): void {
    const keyboardState = this.getKeyboardState()
    const mouseButtons = this.getMouseButtons()
    const mouseDelta = this.getMouseDelta()
    const mouseWheel = this.getMouseWheel()

    keyboardState?.justPressed?.clear()
    keyboardState?.justReleased?.clear()
    mouseButtons?.justPressed?.clear()
    mouseButtons?.justReleased?.clear()
    mouseDelta && (mouseDelta.x = mouseDelta.y = 0)
    mouseWheel && (mouseWheel.delta = 0)
  }

  static queries = {
    keyboardState: { components: [KeyboardState], listen: { added: true, removed: true } },
    mouseCoord: { components: [MouseCoord] },
    mouseDelta: { components: [MouseDelta] },
    mouseButtons: { components: [MouseButtons] },
    mouseWheel: { components: [MouseWheel] }
  }

  public dispose(): void {
    this.inputManager.dispose()
  }
}
