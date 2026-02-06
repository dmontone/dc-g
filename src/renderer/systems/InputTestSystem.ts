import { System } from 'ecsy'
import { KeyboardState, MouseCoord, MouseDelta, MouseButtons, MouseWheel } from '@/components/input'

export class InputTestSystem extends System {
  private consoleElement: HTMLElement | null = null

  constructor(world: any) {
    super(world)
    this.createConsoleOverlay()
  }

  private createConsoleOverlay(): void {
    this.consoleElement = document.createElement('div')
    this.consoleElement.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      font-family: monospace;
      font-size: 12px;
      border-radius: 5px;
      z-index: 1000;
      max-width: 300px;
      pointer-events: none;
    `
    document.body.appendChild(this.consoleElement)
  }

  execute(deltaTime: number): void {
    const keyboardState = this.getKeyboardState()
    const mouseCoord = this.getMouseCoord()
    const mouseDelta = this.getMouseDelta()
    const mouseButtons = this.getMouseButtons()
    const mouseWheel = this.getMouseWheel()
    
    if (!keyboardState || !mouseCoord || !mouseDelta || !mouseButtons || !mouseWheel || !this.consoleElement) return

    // Get input information
    const pressedKeys = Array.from(keyboardState.keys.keys()).filter(key => keyboardState.keys.get(key))
    const justPressedKeys = Array.from(keyboardState.justPressed)
    const justReleasedKeys = Array.from(keyboardState.justReleased)
    
    const pressedButtons = Array.from(mouseButtons.buttons.keys()).filter(button => mouseButtons.buttons.get(button))
    const justPressedButtons = Array.from(mouseButtons.justPressed)
    const justReleasedButtons = Array.from(mouseButtons.justReleased)

    // Update console display
    this.consoleElement.innerHTML = `
      <div style="color: #0f0; font-weight: bold;">INPUT STATE</div>
      <div style="margin-top: 5px;">
        <div style="color: #ff0;">Keyboard:</div>
        <div>Pressed: [${pressedKeys.join(', ')}]</div>
        ${justPressedKeys.length > 0 ? `<div style="color: #0f0;">Just Pressed: [${justPressedKeys.join(', ')}]</div>` : ''}
        ${justReleasedKeys.length > 0 ? `<div style="color: #f00;">Just Released: [${justReleasedKeys.join(', ')}]</div>` : ''}
      </div>
      <div style="margin-top: 5px;">
        <div style="color: #ff0;">Mouse:</div>
        <div>Position: (${Math.round(mouseCoord.x)}, ${Math.round(mouseCoord.y)})</div>
        <div>Delta: (${Math.round(mouseDelta.x)}, ${Math.round(mouseDelta.y)})</div>
        <div>Buttons: [${pressedButtons.join(', ')}]</div>
        ${justPressedButtons.length > 0 ? `<div style="color: #0f0;">Just Pressed: [${justPressedButtons.join(', ')}]</div>` : ''}
        ${justReleasedButtons.length > 0 ? `<div style="color: #f00;">Just Released: [${justReleasedButtons.join(', ')}]</div>` : ''}
        ${mouseWheel.delta !== 0 ? `<div style="color: #00f;">Wheel: ${mouseWheel.delta}</div>` : ''}
      </div>
      <div style="margin-top: 5px; font-size: 10px; color: #888;">
        WASD to move • Click to test • Scroll to test wheel
      </div>
    `
  }

  private getKeyboardState(): KeyboardState | null {
    const entities = this.queries.keyboardState.results
    return entities.length > 0 ? entities[0].getComponent(KeyboardState) : null
  }

  private getMouseCoord(): MouseCoord | null {
    const entities = this.queries.mouseCoord.results
    return entities.length > 0 ? entities[0].getComponent(MouseCoord) : null
  }

  private getMouseDelta(): MouseDelta | null {
    const entities = this.queries.mouseDelta.results
    return entities.length > 0 ? entities[0].getComponent(MouseDelta) : null
  }

  private getMouseButtons(): MouseButtons | null {
    const entities = this.queries.mouseButtons.results
    return entities.length > 0 ? entities[0].getComponent(MouseButtons) : null
  }

  private getMouseWheel(): MouseWheel | null {
    const entities = this.queries.mouseWheel.results
    return entities.length > 0 ? entities[0].getComponent(MouseWheel) : null
  }

  static queries = {
    keyboardState: {
      components: [KeyboardState]
    },
    mouseCoord: {
      components: [MouseCoord]
    },
    mouseDelta: {
      components: [MouseDelta]
    },
    mouseButtons: {
      components: [MouseButtons]
    },
    mouseWheel: {
      components: [MouseWheel]
    }
  }

  public dispose(): void {
    if (this.consoleElement) {
      document.body.removeChild(this.consoleElement)
      this.consoleElement = null
    }
  }
}
