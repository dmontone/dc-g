// src/renderer/input.ts

export const InputState = {
  mouse: { x: 0, y: 0 },
  buttons: new Set<number>(),
  keys: new Set<string>(),
  wheel: 0,

  initialize() {
    window.addEventListener('pointermove', e => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    })
    window.addEventListener('pointerdown', e => this.buttons.add(e.button))
    window.addEventListener('pointerup', e => this.buttons.delete(e.button))
    window.addEventListener('keydown', e => (!e.repeat) && this.keys.add(e.code))
    window.addEventListener('keyup', e => this.keys.delete(e.code))
    window.addEventListener('wheel', e => { this.wheel = e.deltaY }, { passive: true })
  },

  isKeyDown(code: string): boolean { return this.keys.has(code) },
  isMouseButtonDown(button: number): boolean { return this.buttons.has(button) },

  reset() { this.wheel = 0 }
}
