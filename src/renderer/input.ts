// src/renderer/input.ts

export const InputState = {
  mouse: { x: 0, y: 0 },
  delta: { x: 0, y: 0 },
  dragStart: { x: -1, y: -1 },
  buttons: new Set<number>(),
  keys: new Set<string>(),
  wheel: 0,

  initialize() {
    window.addEventListener('pointermove', e => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      this.delta.x = e.movementX
      this.delta.y = e.movementY
    })
    window.addEventListener('pointerdown', ({ button, clientX: x, clientY: y }) => {
      this.buttons.add(button)
      this.dragStart = { x, y }
    })
    window.addEventListener('pointerup', ({ button }) => {
      this.buttons.delete(button)
      this.dragStart = { x: -1, y: -1 }
    })
    window.addEventListener('keydown', ({ repeat, code }) => !repeat && this.keys.add(code))
    window.addEventListener('keyup', ({ code }) => this.keys.delete(code))
    window.addEventListener('wheel', ({ deltaY }) => (this.wheel = deltaY), { passive: true })
  },

  isMouseMoving(): boolean { return this.delta.x !== 0 || this.delta.y !== 0 },
  isKeyDown(code?: string): boolean { return code ? this.keys.has(code) : this.keys.size > 0 },
  isMouseButtonDown(button?: number): boolean { return button ? this.buttons.has(button) : this.buttons.size > 0 },

  reset() {
    this.wheel = 0
  }
}
